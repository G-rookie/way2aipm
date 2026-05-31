import assert from "node:assert/strict";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { startServer } from "../server.mjs";

const directory = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(directory, "..");
const port = Number(process.env.WAY2AIPM_AGENT_ROUTER_API_PORT || 4375);
let createdRoutePath = null;

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  return { response, payload };
}

async function postJson(url, payload) {
  return requestJson(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function close(server) {
  return new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

async function removeCreatedRoute() {
  if (!createdRoutePath) return;
  try {
    await unlink(createdRoutePath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

const server = await startServer(port, "127.0.0.1");
const baseUrl = `http://127.0.0.1:${port}`;

try {
  const beforeRuns = (await requestJson(`${baseUrl}/api/workflow-runs`)).payload.workflowRuns || [];
  const created = await postJson(`${baseUrl}/api/agent-router-runs`, {
    intentText: "我想复盘刚才的一面，找出挂点并生成训练任务",
  });
  assert.equal(created.response.status, 201);
  const run = created.payload.agentRouterRun;
  assert.equal(run.type, "agentRouterRun");
  assert.equal(run.selectedAgent, "review_specialist");
  assert.equal(run.routeType, "review_diagnosis");
  assert.equal(run.targetModule, "postInterview");
  assert.equal(run.status, "routed");
  assert.ok(run.reason.includes("复盘"));
  createdRoutePath = path.join(workspace, "content", "agent-router-runs", `${run.id}.md`);

  const listed = await requestJson(`${baseUrl}/api/agent-router-runs`);
  assert.equal(listed.response.status, 200);
  assert.ok((listed.payload.agentRouterRuns || []).some((item) => item.id === run.id));

  const afterRuns = (await requestJson(`${baseUrl}/api/workflow-runs`)).payload.workflowRuns || [];
  assert.deepEqual(afterRuns.map((item) => item.id), beforeRuns.map((item) => item.id));

  const invalid = await requestJson(`${baseUrl}/api/agent-router-runs`, { method: "PUT" });
  assert.equal(invalid.response.status, 405);

  console.log(JSON.stringify({
    api: "agent-router-runs",
    selectedAgent: run.selectedAgent,
    routeRecorded: true,
    workflowNotStarted: true,
    readOnlyExceptRecord: true,
  }));
} finally {
  await close(server);
  await removeCreatedRoute();
}
