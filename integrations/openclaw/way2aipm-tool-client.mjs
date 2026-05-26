import { readFile } from "node:fs/promises";
import { loadEnvFile } from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_ENV_PATH = path.resolve(DIRECTORY, "..", "..", ".env.local");

try {
  loadEnvFile(LOCAL_ENV_PATH);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const baseUrl = String(process.env.WAY2AIPM_BASE_URL || "http://localhost:4173").replace(/\/+$/, "");
const token = String(process.env.WAY2AIPM_AGENT_TOOL_TOKEN || "").trim();

function usage() {
  return [
    "Usage:",
    "  node integrations/openclaw/way2aipm-tool-client.mjs manifest",
    "  node integrations/openclaw/way2aipm-tool-client.mjs context <workflowRunId>",
    "  node integrations/openclaw/way2aipm-tool-client.mjs propose <workflowRunId> <proposal.json>",
  ].join("\n");
}

async function request(endpoint, options = {}) {
  if (!token) {
    throw new Error("WAY2AIPM_AGENT_TOOL_TOKEN is required in .env.local");
  }
  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `Agent tool request failed (${response.status})`);
  }
  return payload;
}

async function main() {
  const [, , command, ...args] = process.argv;
  let result;
  if (command === "manifest") {
    result = await request("/api/agent-tools/manifest");
  } else if (command === "context" && args[0]) {
    result = await request(`/api/agent-tools/workflow-runs/${encodeURIComponent(args[0])}/review-context`);
  } else if (command === "propose" && args[0] && args[1]) {
    const raw = await readFile(path.resolve(args[1]), "utf8");
    result = await request("/api/agent-tools/review-diagnosis-proposals/validate", {
      method: "POST",
      body: JSON.stringify({ workflowRunId: args[0], proposal: JSON.parse(raw) }),
    });
  } else {
    throw new Error(usage());
  }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
