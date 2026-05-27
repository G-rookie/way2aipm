import assert from "node:assert/strict";

import { Annotation, Command, END, START, StateGraph, interrupt } from "@langchain/langgraph";

const PilotState = Annotation.Root({
  workflowRunId: Annotation,
  aiAnalysisNoteId: Annotation,
  diagnosis: Annotation,
  decision: Annotation,
  approvalDecisions: Annotation,
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
  async function applyDecisions(aiAnalysisNoteId, decisions) {
    let { aiAnalysisNote: note } = await requestJson(
      baseUrl,
      `/api/ai-analysis-notes/${encodeURIComponent(aiAnalysisNoteId)}`,
    );
    const committedIds = { weaknesses: [], tasks: [], ignored: [] };
    for (const decision of decisions.filter((item) => item.candidateType === "weakness")) {
      const result = await postJson(
        baseUrl,
        `/api/ai-analysis-notes/${encodeURIComponent(aiAnalysisNoteId)}/candidate-actions`,
        decision,
      );
      note = result.aiAnalysisNote;
      if (result.weakness?.id) committedIds.weaknesses.push(result.weakness.id);
      if (decision.action === "ignore") committedIds.ignored.push(`weakness:${decision.candidateId}`);
    }
    for (const decision of decisions.filter((item) => item.candidateType === "training_task")) {
      const result = await postJson(
        baseUrl,
        `/api/ai-analysis-notes/${encodeURIComponent(aiAnalysisNoteId)}/candidate-actions`,
        decision,
      );
      note = result.aiAnalysisNote;
      if (result.task?.id) committedIds.tasks.push(result.task.id);
      if (decision.action === "ignore") committedIds.ignored.push(`training_task:${decision.candidateId}`);
    }
    return committedIds;
  }

  return Object.freeze({
    applyDecisions,
    async acceptAll(aiAnalysisNoteId) {
      const { aiAnalysisNote: note } = await requestJson(
        baseUrl,
        `/api/ai-analysis-notes/${encodeURIComponent(aiAnalysisNoteId)}`,
      );
      const decisions = [
        ...(note.weaknessCandidates || []).map((candidate) => ({
          candidateType: "weakness",
          candidateId: candidate.id,
          action: "accept",
        })),
        ...(note.trainingTaskCandidates || []).map((candidate) => ({
          candidateType: "training_task",
          candidateId: candidate.id,
          action: "accept",
        })),
      ];
      return applyDecisions(aiAnalysisNoteId, decisions);
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

function allCandidateKeys(diagnosis) {
  return [
    ...(diagnosis.weaknessCandidates || []).map((candidate) => `weakness:${candidate.id}`),
    ...(diagnosis.trainingTaskCandidates || []).map((candidate) => `training_task:${candidate.id}`),
  ];
}

function allAcceptedDecisions(diagnosis) {
  return [
    ...(diagnosis.weaknessCandidates || []).map((candidate) => ({
      candidateType: "weakness",
      candidateId: candidate.id,
      action: "accept",
    })),
    ...(diagnosis.trainingTaskCandidates || []).map((candidate) => ({
      candidateType: "training_task",
      candidateId: candidate.id,
      action: "accept",
    })),
  ];
}

function validateApprovalDecisions(diagnosis, decisions) {
  if (!Array.isArray(decisions)) throw new Error("审批决定必须覆盖全部候选");
  const expected = allCandidateKeys(diagnosis);
  const normalized = decisions.map((decision) => ({
    candidateType: String(decision?.candidateType || ""),
    candidateId: String(decision?.candidateId || ""),
    action: String(decision?.action || ""),
  }));
  const supplied = normalized.map((decision) => `${decision.candidateType}:${decision.candidateId}`);
  if (
    supplied.length !== expected.length ||
    new Set(supplied).size !== supplied.length ||
    expected.some((key) => !supplied.includes(key)) ||
    normalized.some((decision) => !["accept", "ignore"].includes(decision.action))
  ) {
    throw new Error("请为每条诊断候选明确选择采纳或忽略");
  }
  const weaknessActions = new Map(
    normalized
      .filter((decision) => decision.candidateType === "weakness")
      .map((decision) => [decision.candidateId, decision.action]),
  );
  for (const candidate of diagnosis.trainingTaskCandidates || []) {
    const action = normalized.find(
      (decision) => decision.candidateType === "training_task" && decision.candidateId === candidate.id,
    )?.action;
    if (
      action === "accept" &&
      candidate.weaknessCandidateId &&
      weaknessActions.get(candidate.weaknessCandidateId) !== "accept"
    ) {
      throw new Error("采纳训练任务前，请同时采纳其关联的能力缺陷");
    }
  }
  return normalized;
}

function approvalGate(state) {
  const approval = interrupt({
    type: "review_diagnosis_approval",
    workflowRunId: state.workflowRunId,
    aiAnalysisNoteId: state.aiAnalysisNoteId,
    diagnosis: state.diagnosis,
    acceptedActions: ["commit", "accept_all", "defer"],
  });
  if (approval.action === "defer") {
    return { decision: "defer", approvalDecisions: [], trace: ["approval_gate:defer"] };
  }
  if (approval.action === "accept_all") {
    return {
      decision: "accept_all",
      approvalDecisions: allAcceptedDecisions(state.diagnosis),
      trace: ["approval_gate:accept_all"],
    };
  }
  if (approval.action !== "commit") {
    throw new Error("Unsupported approval action");
  }
  return {
    decision: "commit",
    approvalDecisions: validateApprovalDecisions(state.diagnosis, approval.decisions),
    trace: ["approval_gate:commit"],
  };
}

function createApprovalCommitNode(commitTools) {
  assert.deepEqual(Object.keys(commitTools), ["applyDecisions", "acceptAll"]);
  return async (state) => {
    if (state.decision === "defer") {
      return { committedIds: { weaknesses: [], tasks: [], ignored: [] }, trace: ["approval_commit:deferred"] };
    }
    return {
      committedIds: await commitTools.applyDecisions(state.aiAnalysisNoteId, state.approvalDecisions),
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
    new Command({ resume: typeof action === "string" ? { action } : action }),
    { configurable: { thread_id: workflowRunId } },
  );
}

export async function readReviewPilotSummary(graph, workflowRunId) {
  const snapshot = await graph.getState({ configurable: { thread_id: workflowRunId } });
  const values = snapshot.values || {};
  if (!values.workflowRunId) {
    return {
      workflowRunId,
      status: "not_started",
      aiAnalysisNoteId: "",
      diagnosis: null,
      decision: "",
      committedIds: { weaknesses: [], tasks: [], ignored: [] },
      trace: [],
    };
  }
  return {
    workflowRunId,
    status: values.decision ? "completed" : values.diagnosis ? "waiting_for_approval" : "running",
    aiAnalysisNoteId: values.aiAnalysisNoteId || "",
    diagnosis: values.diagnosis || null,
    decision: values.decision || "",
    committedIds: values.committedIds || { weaknesses: [], tasks: [], ignored: [] },
    trace: values.trace || [],
  };
}
