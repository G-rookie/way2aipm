import assert from "node:assert/strict";

import { Annotation, Command, END, START, StateGraph, interrupt } from "@langchain/langgraph";

export const PREPARATION_FIELD_KEYS = Object.freeze([
  "jdRequirements",
  "hiddenExpectations",
  "matchingEvidence",
  "riskGaps",
  "projectMapping",
  "questionPredictions",
  "highRiskQuestions",
  "prepChecklist",
]);

const PreparationState = Annotation.Root({
  interviewRoundId: Annotation,
  proposal: Annotation,
  decision: Annotation,
  approvalDecisions: Annotation,
  commitResult: Annotation,
  trace: Annotation({
    reducer: (left, right) => [...left, ...right],
    default: () => [],
  }),
});

function threadId(interviewRoundId) {
  return `preparation:${interviewRoundId}`;
}

function validateDecisions(decisions) {
  if (!Array.isArray(decisions)) throw new Error("请为每条 Brief 建议选择采纳或保留");
  const normalized = decisions.map((decision) => ({
    field: String(decision?.field || ""),
    action: String(decision?.action || ""),
  }));
  const supplied = normalized.map((decision) => decision.field);
  if (
    supplied.length !== PREPARATION_FIELD_KEYS.length ||
    new Set(supplied).size !== supplied.length ||
    PREPARATION_FIELD_KEYS.some((field) => !supplied.includes(field)) ||
    normalized.some((decision) => !["accept", "keep"].includes(decision.action))
  ) {
    throw new Error("请为每条 Brief 建议选择采纳或保留");
  }
  return normalized;
}

function createOrchestratorNode() {
  return async (state) => {
    assert.ok(state.interviewRoundId, "interviewRoundId is required");
    return { trace: ["orchestrator:dispatch_preparation"] };
  };
}

function createPreparationSpecialistNode(preparationTools) {
  assert.deepEqual(Object.keys(preparationTools), ["generateForInterview"]);
  return async (state) => ({
    proposal: await preparationTools.generateForInterview(state.interviewRoundId),
    trace: ["preparation_specialist:proposal_ready"],
  });
}

function approvalGate(state) {
  const approval = interrupt({
    type: "preparation_brief_approval",
    interviewRoundId: state.interviewRoundId,
    proposal: state.proposal,
    acceptedActions: ["commit", "defer"],
  });
  if (approval.action === "defer") {
    return { decision: "defer", approvalDecisions: [], trace: ["approval_gate:defer"] };
  }
  if (approval.action !== "commit") throw new Error("Unsupported approval action");
  return {
    decision: "commit",
    approvalDecisions: validateDecisions(approval.decisions),
    trace: ["approval_gate:commit"],
  };
}

function createApprovalCommitNode(commitTools) {
  assert.deepEqual(Object.keys(commitTools), ["applyDecisions"]);
  return async (state) => {
    if (state.decision === "defer") {
      return {
        commitResult: { briefId: "", created: false, acceptedFields: [], keptFields: PREPARATION_FIELD_KEYS },
        trace: ["approval_commit:deferred"],
      };
    }
    return {
      commitResult: await commitTools.applyDecisions(
        state.interviewRoundId,
        state.proposal,
        state.approvalDecisions,
      ),
      trace: ["approval_commit:applied"],
    };
  };
}

export function createPreparationPilotGraph({ checkpointer, preparationTools, commitTools }) {
  return new StateGraph(PreparationState)
    .addNode("orchestrator", createOrchestratorNode())
    .addNode("preparation_specialist", createPreparationSpecialistNode(preparationTools))
    .addNode("approval_gate", approvalGate)
    .addNode("approval_commit", createApprovalCommitNode(commitTools))
    .addEdge(START, "orchestrator")
    .addEdge("orchestrator", "preparation_specialist")
    .addEdge("preparation_specialist", "approval_gate")
    .addEdge("approval_gate", "approval_commit")
    .addEdge("approval_commit", END)
    .compile({ checkpointer });
}

export async function startPreparationPilot(graph, interviewRoundId) {
  return graph.invoke({ interviewRoundId }, { configurable: { thread_id: threadId(interviewRoundId) } });
}

export async function resumePreparationPilot(graph, interviewRoundId, approval) {
  return graph.invoke(
    new Command({ resume: approval }),
    { configurable: { thread_id: threadId(interviewRoundId) } },
  );
}

export async function readPreparationPilotSummary(graph, interviewRoundId) {
  const snapshot = await graph.getState({ configurable: { thread_id: threadId(interviewRoundId) } });
  const values = snapshot.values || {};
  if (!values.interviewRoundId) {
    return {
      interviewRoundId,
      status: "not_started",
      proposal: null,
      decision: "",
      commitResult: { briefId: "", created: false, acceptedFields: [], keptFields: [] },
      trace: [],
    };
  }
  return {
    interviewRoundId,
    status: values.decision ? "completed" : values.proposal ? "waiting_for_approval" : "running",
    proposal: values.proposal || null,
    decision: values.decision || "",
    commitResult: values.commitResult || { briefId: "", created: false, acceptedFields: [], keptFields: [] },
    trace: values.trace || [],
  };
}
