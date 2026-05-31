import assert from "node:assert/strict";
import { startServer } from "../server.mjs";

const port = Number(process.env.WAY2AIPM_AI_RUNTIME_STATUS_PORT || 4373);
const savedEnvironment = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: process.env.OPENAI_MODEL,
};

async function requestStatus(baseUrl) {
  const response = await fetch(`${baseUrl}/api/ai-runtime-status`);
  assert.equal(response.status, 200);
  return response.json();
}

function close(server) {
  return new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

delete process.env.OPENAI_API_KEY;
delete process.env.OPENAI_MODEL;

const server = await startServer(port, "127.0.0.1");
const baseUrl = `http://127.0.0.1:${port}`;

try {
  const missing = await requestStatus(baseUrl);
  assert.equal(missing.aiRuntime.configured, false);
  assert.equal(missing.aiRuntime.apiKeyConfigured, false);
  assert.equal(missing.aiRuntime.modelConfigured, false);
  assert.equal(JSON.stringify(missing).includes("sk-test-secret"), false);

  process.env.OPENAI_API_KEY = "sk-test-secret";
  process.env.OPENAI_MODEL = "test-model";
  const configured = await requestStatus(baseUrl);
  assert.equal(configured.aiRuntime.configured, true);
  assert.equal(configured.aiRuntime.apiKeyConfigured, true);
  assert.equal(configured.aiRuntime.modelConfigured, true);
  assert.equal(JSON.stringify(configured).includes("sk-test-secret"), false);
  assert.equal(JSON.stringify(configured).includes("test-model"), false);

  const invalid = await fetch(`${baseUrl}/api/ai-runtime-status`, { method: "POST" });
  assert.equal(invalid.status, 405);

  console.log(JSON.stringify({
    api: "ai-runtime-status",
    missingConfigDetected: true,
    configuredDetected: true,
    secretsExcluded: true,
    readOnly: true,
  }));
} finally {
  await close(server);
  for (const [key, value] of Object.entries(savedEnvironment)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}
