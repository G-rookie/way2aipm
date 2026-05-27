import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(directory, "..", "..");
const fixturePath = path.resolve(directory, "..", "openclaw", "fixtures", "review-diagnosis-proposal.example.json");
const runtimeRoot = path.join(workspace, "tmp", "langgraph-v027");
const checkpointPath = path.join(runtimeRoot, "checkpoints.json");
const appPort = Number(process.env.WAY2AIPM_LANGGRAPH_RUNTIME_API_PORT || 4363);
const modelPort = Number(process.env.WAY2AIPM_LANGGRAPH_RUNTIME_MODEL_PORT || 4364);
const createdFiles = [];
const recordedPaths = new Set();
const modelRequests = [];
const savedEnvironment = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: process.env.OPENAI_MODEL,
  OPENAI_RESPONSES_URL: process.env.OPENAI_RESPONSES_URL,
  WAY2AIPM_LANGGRAPH_CHECKPOINT_PATH: process.env.WAY2AIPM_LANGGRAPH_CHECKPOINT_PATH,
};
let failedResponsesRemaining = 0;

function trackRecord(directoryName, id) {
  const root = path.resolve(workspace, "content", directoryName);
  const filePath = path.resolve(root, `${id}.md`);
  if (path.dirname(filePath) !== root) throw new Error(`Unsafe smoke-test record path: ${filePath}`);
  if (!recordedPaths.has(filePath)) {
    createdFiles.push(filePath);
    recordedPaths.add(filePath);
  }
}

async function removeOwnRecords() {
  for (const filePath of createdFiles.reverse()) {
    try {
      await unlink(filePath);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
}

async function removeOwnCheckpoint() {
  for (const filePath of [checkpointPath, `${checkpointPath}.tmp`]) {
    try {
      await unlink(filePath);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
}

async function responseJson(url, options = {}) {
  const response = await fetch(url, options);
  return { response, payload: await response.json().catch(() => ({})) };
}

async function requestJson(url, options = {}) {
  const { response, payload } = await responseJson(url, options);
  if (!response.ok) throw new Error(`${url} failed (${response.status}): ${payload.error || "unknown error"}`);
  return payload;
}

function postJson(url, payload) {
  return requestJson(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

async function createTemporaryWorkflow(baseUrl, title) {
  const { opportunity } = await postJson(`${baseUrl}/api/opportunities`, {
    companyName: title,
    roleTitle: "AI Product Manager",
    stage: "interviewed",
    notes: "Temporary Runtime API validation record.",
  });
  trackRecord("opportunities", opportunity.id);
  const { interview } = await postJson(`${baseUrl}/api/interviews`, {
    opportunityId: opportunity.id,
    roundName: "一面",
    roundType: "first",
    status: "completed",
  });
  trackRecord("interviews", interview.id);
  const { review } = await postJson(`${baseUrl}/api/interview-reviews`, {
    opportunityId: opportunity.id,
    interviewRoundId: interview.id,
    status: "completed",
    summary: "Temporary review for Runtime API validation.",
    weakAnswers: "No measurable product outcome was described.",
    failurePoints: "Validation evidence was missing.",
  });
  trackRecord("interview-reviews", review.id);
  const { workflowRun } = await postJson(`${baseUrl}/api/workflow-runs`, { reviewId: review.id });
  trackRecord("workflow-runs", workflowRun.id);
  return workflowRun;
}

async function counts(baseUrl) {
  const [notes, weaknesses, tasks] = await Promise.all([
    requestJson(`${baseUrl}/api/ai-analysis-notes`),
    requestJson(`${baseUrl}/api/weaknesses`),
    requestJson(`${baseUrl}/api/training-tasks`),
  ]);
  return {
    notes: notes.aiAnalysisNotes.length,
    weaknesses: weaknesses.weaknesses.length,
    tasks: tasks.tasks.length,
  };
}

function createMockResponsesServer(fixture) {
  return createServer(async (req, res) => {
    if (req.method !== "POST" || req.url !== "/v1/responses") {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: { message: "not_found" } }));
      return;
    }
    let raw = "";
    for await (const chunk of req) raw += chunk.toString();
    const body = JSON.parse(raw);
    modelRequests.push(body);
    assert.equal(req.headers.authorization, "Bearer local-runtime-api-key");
    assert.equal(body.model, "local-runtime-api-model");
    if (failedResponsesRemaining > 0) {
      failedResponsesRemaining -= 1;
      res.writeHead(503, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: { message: "temporary_model_failure" } }));
      return;
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ output_text: JSON.stringify(fixture) }));
  });
}

async function listen(server, port) {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });
}

async function close(server) {
  if (!server?.listening) return;
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

let appServer;
let modelServer;
try {
  await mkdir(runtimeRoot, { recursive: true });
  await removeOwnCheckpoint();
  const fixture = JSON.parse(await readFile(fixturePath, "utf8"));
  process.env.OPENAI_API_KEY = "local-runtime-api-key";
  process.env.OPENAI_MODEL = "local-runtime-api-model";
  process.env.OPENAI_RESPONSES_URL = `http://127.0.0.1:${modelPort}/v1/responses`;
  process.env.WAY2AIPM_LANGGRAPH_CHECKPOINT_PATH = checkpointPath;
  const { startServer } = await import("../../server.mjs");
  modelServer = createMockResponsesServer(fixture);
  await listen(modelServer, modelPort);
  appServer = await startServer(appPort, "127.0.0.1");
  const baseUrl = `http://127.0.0.1:${appPort}`;

  const workflowRun = await createTemporaryWorkflow(baseUrl, "v027 Runtime API");
  const before = await counts(baseUrl);
  const initial = await requestJson(`${baseUrl}/api/workflow-runs/${workflowRun.id}/runtime`);
  assert.equal(initial.runtime.status, "not_started");

  const started = await postJson(`${baseUrl}/api/workflow-runs/${workflowRun.id}/runtime/start`, {});
  assert.equal(started.runtime.status, "waiting_for_approval");
  assert.equal(started.runtime.diagnosis.weaknessCandidates.length, 1);
  assert.equal(started.runtime.diagnosis.trainingTaskCandidates.length, 1);
  trackRecord("ai-analysis-notes", started.runtime.aiAnalysisNoteId);
  const waitingCounts = await counts(baseUrl);
  assert.deepEqual(waitingCounts, { notes: before.notes + 1, weaknesses: before.weaknesses, tasks: before.tasks });

  const invalid = await responseJson(`${baseUrl}/api/workflow-runs/${workflowRun.id}/runtime/resume`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      action: "commit",
      decisions: [
        { candidateType: "weakness", candidateId: "weakness_candidate_1", action: "ignore" },
        { candidateType: "training_task", candidateId: "training_candidate_1", action: "accept" },
      ],
    }),
  });
  assert.equal(invalid.response.status, 400);
  assert.match(invalid.payload.error, /关联的能力缺陷/);
  const stillWaiting = await requestJson(`${baseUrl}/api/workflow-runs/${workflowRun.id}/runtime`);
  assert.equal(stillWaiting.runtime.status, "waiting_for_approval");

  const completed = await postJson(`${baseUrl}/api/workflow-runs/${workflowRun.id}/runtime/resume`, {
    action: "commit",
    decisions: [
      { candidateType: "weakness", candidateId: "weakness_candidate_1", action: "accept" },
      { candidateType: "training_task", candidateId: "training_candidate_1", action: "ignore" },
    ],
  });
  assert.equal(completed.runtime.status, "completed");
  assert.equal(completed.runtime.decision, "commit");
  assert.equal(completed.runtime.committedIds.weaknesses.length, 1);
  assert.equal(completed.runtime.committedIds.tasks.length, 0);
  assert.equal(completed.runtime.committedIds.ignored.length, 1);
  trackRecord("weaknesses", completed.runtime.committedIds.weaknesses[0]);
  const acceptedCounts = await counts(baseUrl);
  assert.deepEqual(acceptedCounts, { notes: before.notes + 1, weaknesses: before.weaknesses + 1, tasks: before.tasks });

  const repeated = await postJson(`${baseUrl}/api/workflow-runs/${workflowRun.id}/runtime/resume`, {
    action: "commit",
    decisions: [],
  });
  assert.equal(repeated.runtime.status, "completed");
  assert.deepEqual(await counts(baseUrl), acceptedCounts);

  const retryWorkflow = await createTemporaryWorkflow(baseUrl, "v027 Runtime Retry");
  failedResponsesRemaining = 1;
  const failedStart = await responseJson(`${baseUrl}/api/workflow-runs/${retryWorkflow.id}/runtime/start`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}",
  });
  assert.equal(failedStart.response.status, 400);
  const notesAfterFailure = (await requestJson(`${baseUrl}/api/ai-analysis-notes`)).aiAnalysisNotes;
  const retryNote = notesAfterFailure.find((note) => note.workflowRunId === retryWorkflow.id);
  assert.ok(retryNote);
  trackRecord("ai-analysis-notes", retryNote.id);
  const retriedStart = await postJson(`${baseUrl}/api/workflow-runs/${retryWorkflow.id}/runtime/start`, {});
  assert.equal(retriedStart.runtime.status, "waiting_for_approval");
  assert.equal(retriedStart.runtime.aiAnalysisNoteId, retryNote.id);

  console.log(JSON.stringify({
    runtime: "langgraph-ui-api",
    states: ["not_started", "waiting_for_approval", "completed"],
    granularApproval: true,
    dependencyGuard: true,
    writesBeforeApproval: 0,
    committedWeaknesses: completed.runtime.committedIds.weaknesses.length,
    committedTasks: completed.runtime.committedIds.tasks.length,
    idempotentCompletedResume: true,
    retryAfterModelFailure: true,
    modelRequests: modelRequests.length,
  }));
} finally {
  await close(appServer);
  await close(modelServer);
  await removeOwnRecords();
  await removeOwnCheckpoint();
  for (const [key, value] of Object.entries(savedEnvironment)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}
