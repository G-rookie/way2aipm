import assert from "node:assert/strict";

import { Annotation, Command, END, START, StateGraph, interrupt } from "@langchain/langgraph";

const PilotState = Annotation.Root({
  workflowRunId: Annotation,
  aiAnalysisNoteId: Annotation,
  diagnosis: Annotation,
  decision: Annotation,
  committedIds: Annotation,
  trace: Annotation({
    reducer: (left, right) => [...left, ...right],
    default: () => [],
  }),
});

async function requestJson(baseUrl, endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `Request failed (${response.status}) for ${endpoint}`);
  }
  return payload;
}

async function postJson(baseUrl, endpoint, payload) {
  return requestJson(baseUrl, endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function createDiagnosisTools(baseUrl) {
  return Object.freeze({
    async generateForWorkflow(workflowRunId) {
      const { workflowRun } = await requestJson(baseUrl, `/api/workflow-runs/${encodeURIComponent(workflowRunId)}`);
      const { aiAnalysisNotes } = await requestJson(
        baseUrl,
        "/api/ai-analysis-notes?analysisType=review_diagnosis&sourceType=interview_review",
      );
      let note = aiAnalysisNotes.find((item) => item.workflowRunId === workflowRunId)
        || aiAnalysisNotes.find((item) => item.sourceId === workflowRun.reviewId);
      if (!note) {
        const { review } = await requestJson(baseUrl, `/api/interview-reviews/${encodeURIComponent(workflowRun.reviewId)}`);
        ({ aiAnalysisNote: note } = await postJson(baseUrl, "/api/ai-analysis-notes", {
          analysisType: "review_diagnosis",
          sourceType: "interview_review",
          sourceId: review.id,
          sourceTitle: `${review.companyName} - ${review.roundName}复盘`,
          title: `${review.companyName} ${review.roundName} LangGraph 复盘诊断`,
          workflowRunId,
        }));
      }
      if (!(note.weaknessCandidates || []).length && !(note.trainingTaskCandidates || []).length) {
        ({ aiAnalysisNote: note } = await postJson(
          baseUrl,
          `/api/ai-analysis-notes/${encodeURIComponent(note.id)}/run-ai`,
          {},
        ));
      }
      return note;
    },
  });
}

export function createApprovalCommitTools(baseUrl) {
  return Object.freeze({
    async acceptAll(aiAnalysisNoteId) {
      let { aiAnalysisNote: note } = await requestJson(
        baseUrl,
        `/api/ai-analysis-notes/${encodeURIComponent(aiAnalysisNoteId)}`,
      );
      const committedIds = { weaknesses: [], tasks: [] };
      for (const candidate of note.weaknessCandidates || []) {
        const result = await postJson(
          baseUrl,
          `/api/ai-analysis-notes/${encodeURIComponent(aiAnalysisNoteId)}/candidate-actions`,
          { candidateType: "weakness", candidateId: candidate.id, action: "accept" },
        );
        note = result.aiAnalysisNote;
        if (result.weakness?.id) committedIds.weaknesses.push(result.weakness.id);
      }
      for (const candidate of note.trainingTaskCandidates || []) {
        const result = await postJson(
          baseUrl,
          `/api/ai-analysis-notes/${encodeURIComponent(aiAnalysisNoteId)}/candidate-actions`,
          { candidateType: "training_task", candidateId: candidate.id, action: "accept" },
        );
        note = result.aiAnalysisNote;
        if (result.task?.id) committedIds.tasks.push(result.task.id);
      }
      return committedIds;
    },
  });
}

function createOrchestratorNode() {
  return async (state) => {
    assert.ok(state.workflowRunId, "workflowRunId is required");
    return { trace: ["orchestrator:dispatch_review"] };
  };
}

function createReviewSpecialistNode(diagnosisTools) {
  assert.deepEqual(Object.keys(diagnosisTools), ["generateForWorkflow"]);
  return async (state) => {
    const note = await diagnosisTools.generateForWorkflow(state.workflowRunId);
    assert.ok((note.weaknessCandidates || []).length || (note.trainingTaskCandidates || []).length);
    return {
      aiAnalysisNoteId: note.id,
      diagnosis: {
        summary: note.analysisSummary,
        weaknessCandidates: note.weaknessCandidates,
        trainingTaskCandidates: note.trainingTaskCandidates,
      },
      trace: ["review_specialist:diagnosis_ready"],
    };
  };
}

function approvalGate(state) {
  const decision = interrupt({
    type: "review_diagnosis_approval",
    workflowRunId: state.workflowRunId,
    aiAnalysisNoteId: state.aiAnalysisNoteId,
    diagnosis: state.diagnosis,
    acceptedDecisions: ["accept_all", "defer"],
  });
  if (!["accept_all", "defer"].includes(decision.action)) {
    throw new Error("Unsupported approval action");
  }
  return { decision: decision.action, trace: [`approval_gate:${decision.action}`] };
}

function createApprovalCommitNode(commitTools) {
  assert.deepEqual(Object.keys(commitTools), ["acceptAll"]);
  return async (state) => {
    if (state.decision === "defer") {
      return { committedIds: { weaknesses: [], tasks: [] }, trace: ["approval_commit:deferred"] };
    }
    return {
      committedIds: await commitTools.acceptAll(state.aiAnalysisNoteId),
      trace: ["approval_commit:accepted"],
    };
  };
}

export function createReviewPilotGraph({ checkpointer, diagnosisTools, commitTools }) {
  return new StateGraph(PilotState)
    .addNode("orchestrator", createOrchestratorNode())
    .addNode("review_specialist", createReviewSpecialistNode(diagnosisTools))
    .addNode("approval_gate", approvalGate)
    .addNode("approval_commit", createApprovalCommitNode(commitTools))
    .addEdge(START, "orchestrator")
    .addEdge("orchestrator", "review_specialist")
    .addEdge("review_specialist", "approval_gate")
    .addEdge("approval_gate", "approval_commit")
    .addEdge("approval_commit", END)
    .compile({ checkpointer });
}

export async function startReviewPilot(graph, workflowRunId) {
  return graph.invoke({ workflowRunId }, { configurable: { thread_id: workflowRunId } });
}

export async function resumeReviewPilot(graph, workflowRunId, action) {
  return graph.invoke(
    new Command({ resume: { action } }),
    { configurable: { thread_id: workflowRunId } },
  );
}
