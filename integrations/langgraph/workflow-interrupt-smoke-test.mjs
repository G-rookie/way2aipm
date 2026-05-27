import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  Annotation,
  Command,
  END,
  MemorySaver,
  START,
  StateGraph,
  interrupt,
} from "@langchain/langgraph";

import { startServer } from "../../server.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(__dirname, "..", "..");
const fixturePath = path.join(__dirname, "..", "openclaw", "fixtures", "review-diagnosis-proposal.example.json");
const appPort = Number(process.env.WAY2AIPM_LANGGRAPH_SMOKE_PORT || 4360);
const adapterToken = String(process.env.WAY2AIPM_AGENT_TOOL_TOKEN || randomBytes(32).toString("hex")).trim();
const createdFiles = [];
const previousAdapterToken = process.env.WAY2AIPM_AGENT_TOOL_TOKEN;

function trackedRecordPath(directory, id) {
  const root = path.resolve(workspace, "content", directory);
  const filePath = path.resolve(root, `${id}.md`);
  if (path.dirname(filePath) !== root) {
    throw new Error(`Unsafe smoke-test record path: ${filePath}`);
  }
  createdFiles.push(filePath);
}

async function cleanupRecords() {
  for (const filePath of createdFiles.reverse()) {
    try {
      await unlink(filePath);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${url} failed (${response.status}): ${body.error?.message || body.error || "unknown error"}`);
  }
  return body;
}

async function postJson(url, payload, headers = {}) {
  return requestJson(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(payload),
  });
}

async function createTemporaryWorkflow(appBaseUrl) {
  const { opportunity } = await postJson(`${appBaseUrl}/api/opportunities`, {
    companyName: "v025 LangGraph Smoke",
    roleTitle: "AI Product Manager",
    stage: "interviewed",
    notes: "Temporary LangGraph interrupt validation record.",
  });
  trackedRecordPath("opportunities", opportunity.id);

  const { interview } = await postJson(`${appBaseUrl}/api/interviews`, {
    opportunityId: opportunity.id,
    roundName: "Round 1",
    roundType: "first",
    status: "completed",
  });
  trackedRecordPath("interviews", interview.id);

  const { review } = await postJson(`${appBaseUrl}/api/interview-reviews`, {
    opportunityId: opportunity.id,
    interviewRoundId: interview.id,
    status: "completed",
    summary: "Temporary review for LangGraph validation.",
    weakAnswers: "The answer omitted measurable product outcomes.",
    failurePoints: "No evidence was provided for validation results.",
  });
  trackedRecordPath("interview-reviews", review.id);

  const { workflowRun } = await postJson(`${appBaseUrl}/api/workflow-runs`, { reviewId: review.id });
  trackedRecordPath("workflow-runs", workflowRun.id);
  return workflowRun;
}

async function domainEffectCounts(appBaseUrl) {
  const [notes, weaknesses, tasks] = await Promise.all([
    requestJson(`${appBaseUrl}/api/ai-analysis-notes`),
    requestJson(`${appBaseUrl}/api/weaknesses`),
    requestJson(`${appBaseUrl}/api/training-tasks`),
  ]);
  return {
    notes: notes.aiAnalysisNotes.length,
    weaknesses: weaknesses.weaknesses.length,
    tasks: tasks.tasks.length,
  };
}

function createControlledReviewAdapter(appBaseUrl, trace) {
  const headers = { authorization: `Bearer ${adapterToken}` };
  return Object.freeze({
    async readReviewContext(workflowRunId) {
      trace.push("review_specialist:readReviewContext");
      return requestJson(
        `${appBaseUrl}/api/agent-tools/workflow-runs/${encodeURIComponent(workflowRunId)}/review-context`,
        { headers },
      );
    },
    async proposeReviewDiagnosis(workflowRunId, proposal) {
      trace.push("review_specialist:proposeReviewDiagnosis");
      return postJson(
        `${appBaseUrl}/api/agent-tools/review-diagnosis-proposals/validate`,
        { workflowRunId, proposal },
        headers,
      );
    },
  });
}

const GraphState = Annotation.Root({
  workflowRunId: Annotation,
  proposal: Annotation,
  validation: Annotation,
  approvalDecision: Annotation,
  nodeTrace: Annotation({
    reducer: (left, right) => [...left, ...right],
    default: () => [],
  }),
});

function createOrchestratorNode() {
  return async function orchestrator(state) {
    assert.ok(state.workflowRunId, "orchestrator requires one workflowRunId");
    return { nodeTrace: ["orchestrator:dispatch"] };
  };
}

function createReviewSpecialistNode(adapter, proposalFixture) {
  assert.deepEqual(Object.keys(adapter).sort(), ["proposeReviewDiagnosis", "readReviewContext"]);
  return async function reviewSpecialist(state) {
    const context = await adapter.readReviewContext(state.workflowRunId);
    assert.equal(context.workflowRun.id, state.workflowRunId);
    const validation = await adapter.proposeReviewDiagnosis(state.workflowRunId, proposalFixture);
    assert.equal(validation.approval.status, "required");
    assert.equal(validation.persistence.written, false);
    return {
      proposal: proposalFixture,
      validation,
      nodeTrace: ["review_specialist:proposal_validated"],
    };
  };
}

function approvalGate(state) {
  assert.equal(state.validation.approval.status, "required");
  const resumeInput = interrupt({
    type: "review_diagnosis_approval",
    workflowRunId: state.workflowRunId,
    approval: state.validation.approval,
    proposal: state.proposal,
  });
  assert.equal(resumeInput.decision, "defer");
  return {
    approvalDecision: resumeInput.decision,
    nodeTrace: ["approval_gate:deferred"],
  };
}

function finalizeDeferred(state) {
  assert.equal(state.approvalDecision, "defer");
  return { nodeTrace: ["finalize_deferred:completed"] };
}

function buildGraph(adapter, fixture) {
  return new StateGraph(GraphState)
    .addNode("orchestrator", createOrchestratorNode())
    .addNode("review_specialist", createReviewSpecialistNode(adapter, fixture))
    .addNode("approval_gate", approvalGate)
    .addNode("finalize_deferred", finalizeDeferred)
    .addEdge(START, "orchestrator")
    .addEdge("orchestrator", "review_specialist")
    .addEdge("review_specialist", "approval_gate")
    .addEdge("approval_gate", "finalize_deferred")
    .addEdge("finalize_deferred", END)
    .compile({ checkpointer: new MemorySaver() });
}

let service;
try {
  process.env.WAY2AIPM_AGENT_TOOL_TOKEN = adapterToken;
  service = await startServer(appPort, "127.0.0.1");
  const appBaseUrl = `http://127.0.0.1:${appPort}`;
  const workflowRun = await createTemporaryWorkflow(appBaseUrl);
  const before = await domainEffectCounts(appBaseUrl);
  const adapterTrace = [];
  const fixture = JSON.parse(await readFile(fixturePath, "utf8"));
  const graph = buildGraph(createControlledReviewAdapter(appBaseUrl, adapterTrace), fixture);
  const config = { configurable: { thread_id: workflowRun.id } };

  const paused = await graph.invoke({ workflowRunId: workflowRun.id }, config);
  assert.equal(paused.__interrupt__.length, 1);
  assert.equal(paused.__interrupt__[0].value.workflowRunId, workflowRun.id);
  assert.deepEqual(adapterTrace, [
    "review_specialist:readReviewContext",
    "review_specialist:proposeReviewDiagnosis",
  ]);
  assert.equal(paused.nodeTrace.includes("orchestrator:dispatch"), true);
  assert.equal(paused.nodeTrace.includes("review_specialist:proposal_validated"), true);

  const pausedRun = (await requestJson(`${appBaseUrl}/api/workflow-runs/${workflowRun.id}`)).workflowRun;
  const atInterrupt = await domainEffectCounts(appBaseUrl);
  assert.equal(pausedRun.status, "diagnosis_pending");
  assert.deepEqual(atInterrupt, before);

  const completed = await graph.invoke(new Command({ resume: { decision: "defer" } }), config);
  assert.equal(completed.approvalDecision, "defer");
  assert.equal(completed.nodeTrace.includes("approval_gate:deferred"), true);
  assert.equal(completed.nodeTrace.includes("finalize_deferred:completed"), true);
  assert.deepEqual(adapterTrace, [
    "review_specialist:readReviewContext",
    "review_specialist:proposeReviewDiagnosis",
  ]);

  const afterRun = (await requestJson(`${appBaseUrl}/api/workflow-runs/${workflowRun.id}`)).workflowRun;
  const after = await domainEffectCounts(appBaseUrl);
  assert.equal(afterRun.status, "diagnosis_pending");
  assert.deepEqual(after, before);

  console.log(JSON.stringify({
    runtime: "langgraph",
    strictNodeToolIsolation: true,
    orchestratorTools: [],
    reviewSpecialistTools: ["readReviewContext", "proposeReviewDiagnosis"],
    threadMatchesWorkflowRun: true,
    interrupted: true,
    resumedDecision: completed.approvalDecision,
    workflowStatus: afterRun.status,
    approval: paused.validation.approval.status,
    written: paused.validation.persistence.written,
    deltas: {
      notes: after.notes - before.notes,
      weaknesses: after.weaknesses - before.weaknesses,
      tasks: after.tasks - before.tasks,
    },
    checkpointer: "MemorySaver-local-validation-only",
  }));
} finally {
  if (service) {
    await new Promise((resolve, reject) => service.close((error) => (error ? reject(error) : resolve())));
  }
  await cleanupRecords();
  if (previousAdapterToken === undefined) {
    delete process.env.WAY2AIPM_AGENT_TOOL_TOKEN;
  } else {
    process.env.WAY2AIPM_AGENT_TOOL_TOKEN = previousAdapterToken;
  }
}
