import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const isolatedRuntimeRoot = path.resolve(workspace, "tmp", "openclaw-v023");
const gatewayPort = Number(process.env.OPENCLAW_SMOKE_GATEWAY_PORT || 19123);
const gatewayToken = String(process.env.OPENCLAW_GATEWAY_TOKEN || "").trim();
const openclawEntry = String(process.env.OPENCLAW_ENTRY || "").trim();
const lobsterStateDir = String(process.env.LOBSTER_STATE_DIR || "").trim();

if (!gatewayToken || !openclawEntry || !lobsterStateDir) {
  throw new Error("OPENCLAW_ENTRY, OPENCLAW_GATEWAY_TOKEN and LOBSTER_STATE_DIR are required");
}

const resolvedLobsterStateDir = path.resolve(lobsterStateDir);
if (
  resolvedLobsterStateDir !== isolatedRuntimeRoot
  && !resolvedLobsterStateDir.startsWith(`${isolatedRuntimeRoot}${path.sep}`)
) {
  throw new Error("LOBSTER_STATE_DIR must remain under tmp/openclaw-v023 for isolated validation");
}

async function invokeLobster(args) {
  const response = await fetch(`http://127.0.0.1:${gatewayPort}/tools/invoke`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${gatewayToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ tool: "lobster", action: args.action, args }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Lobster invoke failed (${response.status}): ${body.error?.message || body.error || "unknown error"}`);
  }
  return body.result.details;
}

async function waitForGateway(child, output) {
  for (let attempt = 0; attempt < 240; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`OpenClaw Gateway exited before becoming ready:\n${output.value}`);
    }
    try {
      const response = await fetch(`http://127.0.0.1:${gatewayPort}/tools/invoke`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${gatewayToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ tool: "lobster_runtime_readiness_probe", args: {} }),
      });
      if (response.status === 404 || response.status === 400) {
        await new Promise((resolve) => setTimeout(resolve, 3500));
        return;
      }
    } catch {
      // The HTTP listener can appear before Gateway plugin startup completes.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for OpenClaw Gateway:\n${output.value}`);
}

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
  await waitForGateway(gateway, gatewayOutput);
  const paused = await invokeLobster({
    action: "run",
    pipeline: "approve --prompt 'Confirm isolated v0.23 approval checkpoint?'",
    timeoutMs: 10000,
  });

  assert.equal(paused.ok, true);
  assert.equal(paused.status, "needs_approval");
  assert.equal(paused.requiresApproval.type, "approval_request");
  assert.ok(paused.requiresApproval.resumeToken, "Lobster must return a resume token");

  const resumed = await invokeLobster({
    action: "resume",
    token: paused.requiresApproval.resumeToken,
    approve: true,
    timeoutMs: 10000,
  });

  assert.equal(resumed.ok, true);
  assert.equal(resumed.status, "ok");
  assert.equal(resumed.requiresApproval, null);

  console.log(JSON.stringify({
    pausedStatus: paused.status,
    returnedResumeToken: Boolean(paused.requiresApproval.resumeToken),
    resumedStatus: resumed.status,
    approvalDecision: "approved",
    lobsterStateDir: "isolated",
    touchedDomainRecords: false,
  }));
} catch (error) {
  error.message = `${error.message}\nOpenClaw Gateway output:\n${gatewayOutput.value}`;
  throw error;
} finally {
  gateway.kill();
  await Promise.race([once(gateway, "exit"), new Promise((resolve) => setTimeout(resolve, 3000))]);
}
