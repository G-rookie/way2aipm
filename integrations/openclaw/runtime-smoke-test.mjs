import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { startServer } from "../../server.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(__dirname, "..", "..");
const fixturePath = path.join(__dirname, "fixtures", "review-diagnosis-proposal.example.json");
const appPort = Number(process.env.WAY2AIPM_SMOKE_PORT || 4355);
const gatewayPort = Number(process.env.OPENCLAW_SMOKE_GATEWAY_PORT || 19123);
const gatewayToken = String(process.env.OPENCLAW_GATEWAY_TOKEN || "").trim();
const adapterToken = String(process.env.WAY2AIPM_AGENT_TOOL_TOKEN || "").trim();
const openclawEntry = String(process.env.OPENCLAW_ENTRY || "").trim();
const createdFiles = [];

if (!gatewayToken || !adapterToken || !openclawEntry) {
  throw new Error("OPENCLAW_ENTRY, OPENCLAW_GATEWAY_TOKEN and WAY2AIPM_AGENT_TOOL_TOKEN are required");
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

async function waitForGateway(headers, child, output) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`OpenClaw Gateway exited before becoming ready:\n${output.value}`);
    }
    try {
      const response = await fetch(`http://127.0.0.1:${gatewayPort}/tools/invoke`, {
        method: "POST",
        headers: { "content-type": "application/json", ...headers },
        body: JSON.stringify({ tool: "way2aipm_runtime_readiness_probe", args: {} }),
      });
      if (response.status === 404 || response.status === 400) return;
      if (response.status === 401) throw new Error("OpenClaw Gateway rejected smoke-test authentication");
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error(`Timed out waiting for OpenClaw Gateway:\n${output.value}`);
}

const service = await startServer(appPort, "127.0.0.1");
const gatewayOutput = { value: "" };
const gateway = spawn(
  process.execPath,
  [openclawEntry, "gateway", "run", "--port", String(gatewayPort), "--bind", "loopback"],
  {
    cwd: workspace,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  },
);
gateway.stdout.on("data", (chunk) => {
  gatewayOutput.value += chunk.toString();
});
gateway.stderr.on("data", (chunk) => {
  gatewayOutput.value += chunk.toString();
});

try {
  const gatewayHeaders = { authorization: `Bearer ${gatewayToken}` };
  await waitForGateway(gatewayHeaders, gateway, gatewayOutput);
  // The HTTP socket opens before plugins and sidecars report Gateway readiness.
  await new Promise((resolve) => setTimeout(resolve, 3500));
  const appBaseUrl = `http://127.0.0.1:${appPort}`;

  const { opportunity } = await postJson(`${appBaseUrl}/api/opportunities`, {
    companyName: "v023 Runtime Smoke",
    roleTitle: "AI Product Manager",
    stage: "interviewed",
    notes: "Temporary OpenClaw plugin validation record.",
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
    summary: "Temporary review for Runtime validation.",
    weakAnswers: "The answer omitted measurable product outcomes.",
    failurePoints: "No evidence was provided for validation results.",
  });
  trackedRecordPath("interview-reviews", review.id);

  const { workflowRun } = await postJson(`${appBaseUrl}/api/workflow-runs`, { reviewId: review.id });
  trackedRecordPath("workflow-runs", workflowRun.id);

  const before = {
    notes: (await getJson(`${appBaseUrl}/api/ai-analysis-notes`)).aiAnalysisNotes.length,
    weaknesses: (await getJson(`${appBaseUrl}/api/weaknesses`)).weaknesses.length,
    tasks: (await getJson(`${appBaseUrl}/api/training-tasks`)).tasks.length,
  };
  const context = await postJson(
    `http://127.0.0.1:${gatewayPort}/tools/invoke`,
    { tool: "way2aipm_review_context", action: "json", args: { workflowRunId: workflowRun.id } },
    gatewayHeaders,
  );
  const fixture = JSON.parse(await readFile(fixturePath, "utf8"));
  const proposed = await postJson(
    `http://127.0.0.1:${gatewayPort}/tools/invoke`,
    {
      tool: "way2aipm_propose_review_diagnosis",
      action: "json",
      args: { workflowRunId: workflowRun.id, proposal: fixture },
    },
    gatewayHeaders,
  );
  const afterRun = (await getJson(`${appBaseUrl}/api/workflow-runs/${workflowRun.id}`)).workflowRun;
  const after = {
    notes: (await getJson(`${appBaseUrl}/api/ai-analysis-notes`)).aiAnalysisNotes.length,
    weaknesses: (await getJson(`${appBaseUrl}/api/weaknesses`)).weaknesses.length,
    tasks: (await getJson(`${appBaseUrl}/api/training-tasks`)).tasks.length,
  };

  assert.equal(context.result.details.tool, "get_workflow_review_context");
  assert.equal(proposed.result.details.approval.status, "required");
  assert.equal(proposed.result.details.persistence.written, false);
  assert.equal(afterRun.status, "diagnosis_pending");
  assert.deepEqual(after, before);

  console.log(JSON.stringify({
    tool: context.result.details.tool,
    workflowStatus: afterRun.status,
    approval: proposed.result.details.approval.status,
    written: proposed.result.details.persistence.written,
    deltas: {
      notes: after.notes - before.notes,
      weaknesses: after.weaknesses - before.weaknesses,
      tasks: after.tasks - before.tasks,
    },
  }));
} catch (error) {
  error.message = `${error.message}\nOpenClaw Gateway output:\n${gatewayOutput.value}`;
  throw error;
} finally {
  gateway.kill();
  await Promise.race([once(gateway, "exit"), new Promise((resolve) => setTimeout(resolve, 3000))]);
  await new Promise((resolve, reject) => service.close((error) => (error ? reject(error) : resolve())));
  await cleanupRecords();
}
