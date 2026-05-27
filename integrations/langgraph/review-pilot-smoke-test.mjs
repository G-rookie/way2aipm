import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createServer } from "node:http";
import { mkdir, readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const directory = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(directory, "..", "..");
const fixturePath = path.resolve(directory, "..", "openclaw", "fixtures", "review-diagnosis-proposal.example.json");
const runnerPath = path.join(directory, "review-pilot-runner.mjs");
const runtimeRoot = path.join(workspace, "tmp", "langgraph-v026");
const checkpointPath = path.join(runtimeRoot, "checkpoints.json");
const appPort = Number(process.env.WAY2AIPM_LANGGRAPH_PILOT_PORT || 4361);
const modelPort = Number(process.env.WAY2AIPM_LANGGRAPH_MODEL_PORT || 4362);
const createdFiles = [];
const recordedPaths = new Set();
const modelRequests = [];
const savedEnvironment = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: process.env.OPENAI_MODEL,
  OPENAI_RESPONSES_URL: process.env.OPENAI_RESPONSES_URL,
};

function trackRecord(directoryName, id) {
  const root = path.resolve(workspace, "content", directoryName);
  const filePath = path.resolve(root, `${id}.md`);
  if (path.dirname(filePath) !== root) {
    throw new Error(`Unsafe smoke-test record path: ${filePath}`);
  }
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

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${url} failed (${response.status}): ${payload.error || "unknown error"}`);
  }
  return payload;
}

function postJson(url, payload) {
  return requestJson(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

async function createTemporaryWorkflow(baseUrl) {
  const { opportunity } = await postJson(`${baseUrl}/api/opportunities`, {
    companyName: "v026 LangGraph Pilot",
    roleTitle: "AI Product Manager",
    stage: "interviewed",
    notes: "Temporary durable workflow validation record.",
  });
  trackRecord("opportunities", opportunity.id);
  const { interview } = await postJson(`${baseUrl}/api/interviews`, {
    opportunityId: opportunity.id,
    roundName: "Round 1",
    roundType: "first",
    status: "completed",
  });
  trackRecord("interviews", interview.id);
  const { review } = await postJson(`${baseUrl}/api/interview-reviews`, {
    opportunityId: opportunity.id,
    interviewRoundId: interview.id,
    status: "completed",
    summary: "Temporary review for durable LangGraph pilot.",
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

async function runPilot(command, workflowRunId, action = "") {
  const args = [runnerPath, command, workflowRunId];
  if (action) args.push(action);
  const { stdout } = await execFileAsync(process.execPath, args, {
    cwd: workspace,
    env: {
      ...process.env,
      WAY2AIPM_BASE_URL: `http://127.0.0.1:${appPort}`,
      WAY2AIPM_LANGGRAPH_CHECKPOINT_PATH: checkpointPath,
    },
  });
  return JSON.parse(stdout.trim());
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
    assert.equal(req.headers.authorization, "Bearer local-pilot-key");
    assert.equal(body.model, "local-pilot-model");
    assert.equal(body.text.format.name, "review_diagnosis_v1");
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
  process.env.OPENAI_API_KEY = "local-pilot-key";
  process.env.OPENAI_MODEL = "local-pilot-model";
  process.env.OPENAI_RESPONSES_URL = `http://127.0.0.1:${modelPort}/v1/responses`;
  const { startServer } = await import("../../server.mjs");
  modelServer = createMockResponsesServer(fixture);
  await listen(modelServer, modelPort);
  appServer = await startServer(appPort, "127.0.0.1");
  const baseUrl = `http://127.0.0.1:${appPort}`;
  const workflowRun = await createTemporaryWorkflow(baseUrl);
  const before = await counts(baseUrl);

  const paused = await runPilot("start", workflowRun.id);
  assert.equal(paused.status, "waiting_for_approval");
  assert.equal(paused.workflowRunId, workflowRun.id);
  assert.equal(paused.interrupt.workflowRunId, workflowRun.id);
  assert.equal(modelRequests.length, 1);
  const atInterrupt = await counts(baseUrl);
  assert.deepEqual(atInterrupt, { notes: before.notes + 1, weaknesses: before.weaknesses, tasks: before.tasks });
  const notes = (await requestJson(`${baseUrl}/api/ai-analysis-notes`)).aiAnalysisNotes;
  const note = notes.find((item) => item.id === paused.aiAnalysisNoteId);
  assert.ok(note);
  trackRecord("ai-analysis-notes", note.id);
  const pausedRun = (await requestJson(`${baseUrl}/api/workflow-runs/${workflowRun.id}`)).workflowRun;
  assert.equal(pausedRun.status, "candidate_confirmation");

  const resumed = await runPilot("resume", workflowRun.id, "accept_all");
  assert.equal(resumed.status, "completed");
  assert.equal(resumed.decision, "accept_all");
  assert.equal(resumed.committedIds.weaknesses.length, 1);
  assert.equal(resumed.committedIds.tasks.length, 1);
  trackRecord("weaknesses", resumed.committedIds.weaknesses[0]);
  trackRecord("training-tasks", resumed.committedIds.tasks[0]);
  const accepted = await counts(baseUrl);
  assert.deepEqual(accepted, { notes: before.notes + 1, weaknesses: before.weaknesses + 1, tasks: before.tasks + 1 });
  const acceptedRun = (await requestJson(`${baseUrl}/api/workflow-runs/${workflowRun.id}`)).workflowRun;
  assert.equal(acceptedRun.status, "training_pending");

  const repeated = await runPilot("resume", workflowRun.id, "accept_all");
  const afterRepeat = await counts(baseUrl);
  assert.deepEqual(afterRepeat, accepted);
  assert.equal(modelRequests.length, 1);

  await requestJson(`${baseUrl}/api/training-tasks/${encodeURIComponent(resumed.committedIds.tasks[0])}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status: "doing" }),
  });
  const { aiAnalysisNote: committedNote } = await requestJson(
    `${baseUrl}/api/ai-analysis-notes/${encodeURIComponent(note.id)}`,
  );
  const rewoundNote = {
    ...committedNote,
    weaknessCandidates: committedNote.weaknessCandidates.map((candidate) => ({
      ...candidate,
      decision: "pending",
      createdWeaknessId: "",
    })),
    trainingTaskCandidates: committedNote.trainingTaskCandidates.map((candidate) => ({
      ...candidate,
      decision: "pending",
      createdTrainingTaskId: "",
    })),
  };
  await requestJson(`${baseUrl}/api/ai-analysis-notes/${encodeURIComponent(note.id)}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(rewoundNote),
  });
  const weaknessReplay = await postJson(
    `${baseUrl}/api/ai-analysis-notes/${encodeURIComponent(note.id)}/candidate-actions`,
    { candidateType: "weakness", candidateId: "weakness_candidate_1", action: "accept" },
  );
  const taskReplay = await postJson(
    `${baseUrl}/api/ai-analysis-notes/${encodeURIComponent(note.id)}/candidate-actions`,
    { candidateType: "training_task", candidateId: "training_candidate_1", action: "accept" },
  );
  assert.equal(weaknessReplay.weakness.id, resumed.committedIds.weaknesses[0]);
  assert.equal(taskReplay.task.id, resumed.committedIds.tasks[0]);
  assert.equal(taskReplay.task.status, "doing");
  const afterInterruptedWriteReplay = await counts(baseUrl);
  assert.deepEqual(afterInterruptedWriteReplay, accepted);

  console.log(JSON.stringify({
    runtime: "langgraph",
    persistentCheckpoint: true,
    runnerRestartResume: true,
    realDiagnosisApiPath: true,
    modelRequests: modelRequests.length,
    statusAtInterrupt: pausedRun.status,
    statusAfterApproval: acceptedRun.status,
    decision: resumed.decision,
    repeatResumeStatus: repeated.status,
    idempotentWriteback: true,
    interruptedWriteReplayStableIds: true,
    deltasAtInterrupt: {
      notes: atInterrupt.notes - before.notes,
      weaknesses: atInterrupt.weaknesses - before.weaknesses,
      tasks: atInterrupt.tasks - before.tasks,
    },
    deltasAfterApproval: {
      notes: afterInterruptedWriteReplay.notes - before.notes,
      weaknesses: afterInterruptedWriteReplay.weaknesses - before.weaknesses,
      tasks: afterInterruptedWriteReplay.tasks - before.tasks,
    },
    checkpoint: "JsonFileCheckpointSaver-local-pilot",
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
