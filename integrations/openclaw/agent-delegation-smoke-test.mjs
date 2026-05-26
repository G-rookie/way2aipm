import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { once } from "node:events";
import { createServer } from "node:http";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { startServer } from "../../server.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(__dirname, "..", "..");
const fixturePath = path.join(__dirname, "fixtures", "review-diagnosis-proposal.example.json");
const pluginPath = path.join(__dirname, "plugin");
const runtimeRoot = path.join(workspace, "tmp", "openclaw-v024");
const configPath = path.join(runtimeRoot, "state", "openclaw.json");
const stateDir = path.join(runtimeRoot, "state");
const homeDir = path.join(runtimeRoot, "home");
const orchestratorWorkspace = path.join(__dirname, "agents", "orchestrator");
const reviewWorkspace = path.join(__dirname, "agents", "review_specialist");
const appPort = Number(process.env.WAY2AIPM_AGENT_SMOKE_PORT || 4356);
const gatewayPort = Number(process.env.OPENCLAW_AGENT_SMOKE_GATEWAY_PORT || 19124);
const modelPort = Number(process.env.WAY2AIPM_AGENT_MOCK_MODEL_PORT || 4357);
const gatewayToken = String(process.env.OPENCLAW_GATEWAY_TOKEN || randomBytes(32).toString("hex")).trim();
const adapterToken = String(process.env.WAY2AIPM_AGENT_TOOL_TOKEN || randomBytes(32).toString("hex")).trim();
const openclawEntry = String(process.env.OPENCLAW_ENTRY || "").trim();
const createdFiles = [];
const modelRequests = [];
let activeWorkflowRunId = "";
let proposalFixture;

if (!openclawEntry) {
  throw new Error("OPENCLAW_ENTRY is required");
}

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

async function postJson(url, payload, headers = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${url} failed (${response.status}): ${body.error?.message || body.error || "unknown error"}`);
  }
  return body;
}

async function getJson(url, headers = {}) {
  const response = await fetch(url, { headers });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${url} failed (${response.status}): ${body.error?.message || body.error || "unknown error"}`);
  }
  return body;
}

function availableToolNames(body) {
  const encoded = JSON.stringify(body.tools || []);
  return new Set([
    "sessions_spawn",
    "sessions_yield",
    "session_status",
    "way2aipm_review_context",
    "way2aipm_propose_review_diagnosis",
  ].filter((toolName) => encoded.includes(toolName)));
}

function messageText(body) {
  return JSON.stringify(
    (body.messages || []).filter((message) => message.role === "assistant" || message.role === "tool"),
  );
}

function toolCall(name, args) {
  return {
    role: "assistant",
    content: null,
    tool_calls: [{
      id: `call_${name}_${modelRequests.length}`,
      type: "function",
      function: { name, arguments: JSON.stringify(args) },
    }],
  };
}

function textReply(content) {
  return { role: "assistant", content };
}

function chooseMockResponse(body) {
  const tools = availableToolNames(body);
  const transcript = messageText(body);
  const isReviewSpecialist = String(body.model || "").includes("review-specialist");
  if (isReviewSpecialist) {
    if (!transcript.includes("way2aipm_review_context")) {
      return { message: toolCall("way2aipm_review_context", { workflowRunId: activeWorkflowRunId }), finish: "tool_calls" };
    }
    if (!transcript.includes("way2aipm_propose_review_diagnosis")) {
      return {
        message: toolCall("way2aipm_propose_review_diagnosis", {
          workflowRunId: activeWorkflowRunId,
          proposal: proposalFixture,
        }),
        finish: "tool_calls",
      };
    }
    return { message: textReply("Diagnosis proposal validated and waiting for human approval; no records were written."), finish: "stop" };
  }
  if (tools.has("sessions_spawn") && !transcript.includes("sessions_spawn")) {
    return {
      message: toolCall("sessions_spawn", {
        task: `Review workflowRunId ${activeWorkflowRunId}. Read its review context, submit one diagnosis proposal for validation, and report the approval state without writing domain records.`,
        taskName: "review_diagnosis",
        label: "Review diagnosis validation",
        agentId: "review_specialist",
        runtime: "subagent",
        context: "isolated",
        cleanup: "keep",
        runTimeoutSeconds: 60,
      }),
      finish: "tool_calls",
    };
  }
  return { message: textReply("Review diagnosis delegation submitted; specialist completion remains approval-gated."), finish: "stop" };
}

function sendCompletion(res, body, generated) {
  const response = {
    id: `chatcmpl-way2aipm-${modelRequests.length}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: body.model || "way2aipm-agent-stub",
    choices: [{ index: 0, message: generated.message, finish_reason: generated.finish }],
    usage: { prompt_tokens: 32, completion_tokens: 16, total_tokens: 48 },
  };
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(response));
}

function sendStream(res, body, generated) {
  const base = {
    id: `chatcmpl-way2aipm-${modelRequests.length}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model: body.model || "way2aipm-agent-stub",
  };
  const delta = generated.message.tool_calls
    ? { role: "assistant", tool_calls: generated.message.tool_calls }
    : { role: "assistant", content: generated.message.content };
  res.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive",
  });
  res.write(`data: ${JSON.stringify({ ...base, choices: [{ index: 0, delta, finish_reason: null }] })}\n\n`);
  res.write(`data: ${JSON.stringify({ ...base, choices: [{ index: 0, delta: {}, finish_reason: generated.finish }] })}\n\n`);
  res.write("data: [DONE]\n\n");
  res.end();
}

async function readBody(req) {
  let value = "";
  for await (const chunk of req) value += chunk.toString();
  return value ? JSON.parse(value) : {};
}

function createMockModelServer() {
  return createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/v1/models") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({
        object: "list",
        data: [
          { id: "orchestrator", object: "model" },
          { id: "review-specialist", object: "model" },
        ],
      }));
      return;
    }
    if (req.method === "POST" && req.url === "/v1/chat/completions") {
      const body = await readBody(req);
      modelRequests.push(body);
      const generated = chooseMockResponse(body);
      if (body.stream) sendStream(res, body, generated);
      else sendCompletion(res, body, generated);
      return;
    }
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
  });
}

async function listen(server, port) {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });
}

async function closeServer(server) {
  if (!server?.listening) return;
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

function runtimeConfig() {
  const deny = [
    "group:fs",
    "group:runtime",
    "group:web",
    "browser",
    "canvas",
    "nodes",
    "cron",
    "gateway",
    "message",
  ];
  return {
    plugins: {
      allow: ["way2aipm-controlled-tools"],
      load: { paths: [pluginPath] },
      entries: {
        "way2aipm-controlled-tools": {
          enabled: true,
          config: {
            apiToken: "${WAY2AIPM_AGENT_TOOL_TOKEN}",
            baseUrl: `http://127.0.0.1:${appPort}`,
          },
        },
      },
    },
    gateway: {
      port: gatewayPort,
      mode: "local",
      bind: "loopback",
      auth: { mode: "token", token: "${OPENCLAW_GATEWAY_TOKEN}" },
    },
    models: {
      mode: "merge",
      providers: {
        "way2aipm-stub": {
          baseUrl: `http://127.0.0.1:${modelPort}/v1`,
          apiKey: "way2aipm-local-stub",
          api: "openai-completions",
          models: [
            { id: "orchestrator", name: "Orchestrator Stub", reasoning: false, input: ["text"], contextWindow: 32000, maxTokens: 2048 },
            { id: "review-specialist", name: "Review Specialist Stub", reasoning: false, input: ["text"], contextWindow: 32000, maxTokens: 2048 },
          ],
        },
      },
    },
    agents: {
      defaults: {
        skipBootstrap: true,
        skills: [],
        model: { primary: "way2aipm-stub/orchestrator" },
        subagents: { maxSpawnDepth: 1, runTimeoutSeconds: 60, requireAgentId: true },
      },
      list: [
        {
          id: "orchestrator",
          default: true,
          workspace: orchestratorWorkspace,
          model: "way2aipm-stub/orchestrator",
          subagents: { allowAgents: ["review_specialist"], requireAgentId: true },
          tools: {
            allow: [
              "sessions_spawn",
              "sessions_yield",
              "session_status",
              "way2aipm_review_context",
              "way2aipm_propose_review_diagnosis",
            ],
            deny,
          },
        },
        {
          id: "review_specialist",
          workspace: reviewWorkspace,
          model: "way2aipm-stub/review-specialist",
          tools: { allow: ["way2aipm_review_context", "way2aipm_propose_review_diagnosis"], deny },
        },
      ],
    },
    tools: {
      profile: "minimal",
      alsoAllow: [
        "sessions_spawn",
        "sessions_yield",
        "way2aipm_review_context",
        "way2aipm_propose_review_diagnosis",
      ],
      deny,
      sessions: { visibility: "tree" },
      subagents: {
        tools: {
          allow: ["way2aipm_review_context", "way2aipm_propose_review_diagnosis"],
          deny,
        },
      },
    },
  };
}

async function waitForGateway(child, output) {
  for (let attempt = 0; attempt < 240; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`OpenClaw Gateway exited before becoming ready:\n${output.value}`);
    }
    try {
      const response = await fetch(`http://127.0.0.1:${gatewayPort}/readyz`);
      if (response.ok) return;
    } catch {
      // Startup can take several seconds while plugins are initialized.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for OpenClaw Gateway:\n${output.value}`);
}

async function runCli(args, environment) {
  const child = spawn(process.execPath, [openclawEntry, ...args], {
    cwd: workspace,
    env: environment,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk.toString(); });
  child.stderr.on("data", (chunk) => { output += chunk.toString(); });
  const [code] = await once(child, "exit");
  if (code !== 0) throw new Error(`OpenClaw CLI failed (${code}):\n${output}`);
  return output;
}

async function waitForSpecialistApproval() {
  for (let attempt = 0; attempt < 180; attempt += 1) {
    const toolResults = JSON.stringify(
      modelRequests
        .filter((body) => String(body.model || "").includes("review-specialist"))
        .flatMap((body) => (body.messages || []).filter((message) => message.role === "tool")),
    );
    if (toolResults.includes("required") && toolResults.includes("written")) {
      return toolResults;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Timed out waiting for review_specialist approval-gated proposal result");
}

proposalFixture = JSON.parse(await readFile(fixturePath, "utf8"));
await mkdir(stateDir, { recursive: true });
await mkdir(homeDir, { recursive: true });
await writeFile(configPath, `${JSON.stringify(runtimeConfig(), null, 2)}\n`, "utf8");

const environment = {
  ...process.env,
  OPENCLAW_HOME: homeDir,
  OPENCLAW_STATE_DIR: stateDir,
  OPENCLAW_CONFIG_PATH: configPath,
  OPENCLAW_GATEWAY_TOKEN: gatewayToken,
  WAY2AIPM_AGENT_TOOL_TOKEN: adapterToken,
};
process.env.WAY2AIPM_AGENT_TOOL_TOKEN = adapterToken;
const modelServer = createMockModelServer();
const service = await startServer(appPort, "127.0.0.1");
let gateway;
const gatewayOutput = { value: "" };

try {
  await listen(modelServer, modelPort);
  await runCli(["config", "validate"], environment);
  const appBaseUrl = `http://127.0.0.1:${appPort}`;
  const { opportunity } = await postJson(`${appBaseUrl}/api/opportunities`, {
    companyName: "v024 Agent Delegation Smoke",
    roleTitle: "AI Product Manager",
    stage: "interviewed",
    notes: "Temporary controlled-agent validation record.",
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
    summary: "Temporary review for agent delegation validation.",
    weakAnswers: "The answer omitted measurable product outcomes.",
    failurePoints: "No evidence was provided for validation results.",
  });
  trackedRecordPath("interview-reviews", review.id);
  const { workflowRun } = await postJson(`${appBaseUrl}/api/workflow-runs`, { reviewId: review.id });
  trackedRecordPath("workflow-runs", workflowRun.id);
  activeWorkflowRunId = workflowRun.id;

  const before = {
    notes: (await getJson(`${appBaseUrl}/api/ai-analysis-notes`)).aiAnalysisNotes.length,
    weaknesses: (await getJson(`${appBaseUrl}/api/weaknesses`)).weaknesses.length,
    tasks: (await getJson(`${appBaseUrl}/api/training-tasks`)).tasks.length,
  };

  gateway = spawn(
    process.execPath,
    [openclawEntry, "gateway", "run", "--port", String(gatewayPort), "--bind", "loopback"],
    { cwd: workspace, env: environment, stdio: ["ignore", "pipe", "pipe"], windowsHide: true },
  );
  gateway.stdout.on("data", (chunk) => { gatewayOutput.value += chunk.toString(); });
  gateway.stderr.on("data", (chunk) => { gatewayOutput.value += chunk.toString(); });
  await waitForGateway(gateway, gatewayOutput);

  const agentOutput = await runCli([
    "agent",
    "--agent",
    "orchestrator",
    "--session-key",
    `agent:orchestrator:v024-${workflowRun.id}`,
    "--message",
    `Handle diagnosis_pending workflowRunId ${workflowRun.id}. Delegate diagnosis only and report its approval state.`,
    "--json",
    "--timeout",
    "120",
  ], environment);
  const specialistToolResults = await waitForSpecialistApproval();
  const afterRun = (await getJson(`${appBaseUrl}/api/workflow-runs/${workflowRun.id}`)).workflowRun;
  const after = {
    notes: (await getJson(`${appBaseUrl}/api/ai-analysis-notes`)).aiAnalysisNotes.length,
    weaknesses: (await getJson(`${appBaseUrl}/api/weaknesses`)).weaknesses.length,
    tasks: (await getJson(`${appBaseUrl}/api/training-tasks`)).tasks.length,
  };
  const requestedTools = modelRequests.flatMap((body) => [...availableToolNames(body)]);
  const transcript = JSON.stringify(modelRequests);

  assert.match(agentOutput, /delegation submitted/i);
  const disclosedTools = [...new Set(requestedTools)].sort();
  assert.ok(requestedTools.includes("sessions_spawn"), `orchestrator must receive sessions_spawn; disclosed tools: ${disclosedTools.join(", ")}`);
  assert.ok(requestedTools.includes("way2aipm_review_context"), `review specialist must receive context tool; disclosed tools: ${disclosedTools.join(", ")}`);
  assert.ok(requestedTools.includes("way2aipm_propose_review_diagnosis"), `review specialist must receive proposal tool; disclosed tools: ${disclosedTools.join(", ")}`);
  assert.ok(transcript.includes("approval"), "agent exchange must observe approval-gated output");
  assert.match(specialistToolResults, /required/);
  assert.doesNotMatch(specialistToolResults, /not configured|failed/i);
  assert.equal(afterRun.status, "diagnosis_pending");
  assert.deepEqual(after, before);

  console.log(JSON.stringify({
    orchestratorDelegated: true,
    strictRoleToolIsolation: false,
    isolationLimitation: "native subagent inherits parent allow boundary",
    yieldMode: "not_used_due_to_parent_session_lock_contention",
    reviewToolsObserved: ["way2aipm_review_context", "way2aipm_propose_review_diagnosis"],
    workflowStatus: afterRun.status,
    approval: "required",
    written: false,
    deltas: {
      notes: after.notes - before.notes,
      weaknesses: after.weaknesses - before.weaknesses,
      tasks: after.tasks - before.tasks,
    },
    model: "local-deterministic-stub",
  }));
} catch (error) {
  error.message = `${error.message}\nOpenClaw Gateway output:\n${gatewayOutput.value}`;
  throw error;
} finally {
  if (gateway) {
    gateway.kill();
    await Promise.race([once(gateway, "exit"), new Promise((resolve) => setTimeout(resolve, 3000))]);
  }
  await closeServer(modelServer);
  await new Promise((resolve, reject) => service.close((error) => (error ? reject(error) : resolve())));
  await cleanupRecords();
}
