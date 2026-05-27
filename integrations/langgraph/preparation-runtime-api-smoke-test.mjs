import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(directory, "..", "..");
const runtimeRoot = path.join(workspace, "tmp", "langgraph-v028");
const checkpointPath = path.join(runtimeRoot, "checkpoints.json");
const appPort = Number(process.env.WAY2AIPM_PREPARATION_RUNTIME_PORT || 4367);
const modelPort = Number(process.env.WAY2AIPM_PREPARATION_MODEL_PORT || 4368);
const createdFiles = [];
const trackedPaths = new Set();
const modelRequests = [];
let failedResponsesRemaining = 0;
const proposal = {
  jdRequirements: "- AI 产品设计\n- 指标分析与落地验证",
  hiddenExpectations: "推断：岗位希望候选人能将模型能力转化为可验证的产品结果。",
  matchingEvidence: "推荐使用「检索增强助手」项目中的留存指标验证经验。",
  riskGaps: "需要补充模型效果评估与成本权衡的具体证据。",
  projectMapping: "- 检索增强助手：对应 AI 功能设计与验证\n- 指标看板：对应数据驱动决策",
  questionPredictions: "- 你如何评估 AI 功能效果？\n- 项目中如何定义成功指标？",
  highRiskQuestions: "- 模型表现下降时如何定位问题？\n- 如何处理成本与体验权衡？",
  prepChecklist: "- [ ] 准备 AI 功能评估案例\n- [ ] 重写指标结果表达\n- [ ] 演练成本权衡回答",
};
const savedEnvironment = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: process.env.OPENAI_MODEL,
  OPENAI_RESPONSES_URL: process.env.OPENAI_RESPONSES_URL,
  WAY2AIPM_LANGGRAPH_CHECKPOINT_PATH: process.env.WAY2AIPM_LANGGRAPH_CHECKPOINT_PATH,
};

function trackRecord(directoryName, id) {
  const root = path.resolve(workspace, "content", directoryName);
  const filePath = path.resolve(root, `${id}.md`);
  if (path.dirname(filePath) !== root) throw new Error(`Unsafe smoke-test record path: ${filePath}`);
  if (!trackedPaths.has(filePath)) {
    createdFiles.push(filePath);
    trackedPaths.add(filePath);
  }
}

async function removeOwnFiles() {
  for (const filePath of createdFiles.reverse()) {
    try {
      await unlink(filePath);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
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

function postJson(url, body) {
  return requestJson(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function createInterview(baseUrl, companyName) {
  const { opportunity } = await postJson(`${baseUrl}/api/opportunities`, {
    companyName,
    roleTitle: "AI 产品经理",
    stage: "preparing",
    jdText: "负责 AI 产品规划、模型效果评估、指标设计与业务落地。",
    notes: "关注应用价值和验证闭环。",
  });
  trackRecord("opportunities", opportunity.id);
  const { interview } = await postJson(`${baseUrl}/api/interviews`, {
    opportunityId: opportunity.id,
    roundName: "二面",
    roundType: "second",
    status: "preparing",
  });
  trackRecord("interviews", interview.id);
  return { opportunity, interview };
}

function decisions(overrides = {}) {
  return Object.keys(proposal).map((field) => ({
    field,
    action: overrides[field] || "keep",
  }));
}

function createMockResponsesServer() {
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
    assert.equal(req.headers.authorization, "Bearer local-preparation-key");
    assert.equal(body.model, "local-preparation-model");
    assert.equal(body.text.format.name, "preparation_brief_v1");
    assert.match(body.input, /检索增强助手/);
    if (failedResponsesRemaining > 0) {
      failedResponsesRemaining -= 1;
      res.writeHead(503, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: { message: "temporary_model_failure" } }));
      return;
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ output_text: JSON.stringify(proposal) }));
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
  await removeOwnFiles();
  process.env.OPENAI_API_KEY = "local-preparation-key";
  process.env.OPENAI_MODEL = "local-preparation-model";
  process.env.OPENAI_RESPONSES_URL = `http://127.0.0.1:${modelPort}/v1/responses`;
  process.env.WAY2AIPM_LANGGRAPH_CHECKPOINT_PATH = checkpointPath;
  const { startServer } = await import("../../server.mjs");
  modelServer = createMockResponsesServer();
  await listen(modelServer, modelPort);
  appServer = await startServer(appPort, "127.0.0.1");
  const baseUrl = `http://127.0.0.1:${appPort}`;

  const { projectAmmo } = await postJson(`${baseUrl}/api/project-ammos`, {
    projectName: "检索增强助手",
    status: "usable",
    role: "产品负责人",
    actions: "定义检索质量与回答可用性验证方案。",
    result: "将问答采纳率提升到可用水平。",
    metrics: "采纳率提升 18%",
    aiRelevance: "RAG 应用",
    pmCompetencies: "AI 效果评估",
  });
  trackRecord("project-ammos", projectAmmo.id);

  const first = await createInterview(baseUrl, "v028 Preparation Create");
  const initial = await requestJson(`${baseUrl}/api/interviews/${first.interview.id}/preparation-runtime`);
  assert.equal(initial.runtime.status, "not_started");
  const started = await postJson(`${baseUrl}/api/interviews/${first.interview.id}/preparation-runtime/start`, {});
  assert.equal(started.runtime.status, "waiting_for_approval");
  assert.equal(started.runtime.proposal.projectAmmoCount, 1);
  assert.equal((await requestJson(`${baseUrl}/api/pre-interview-briefs?interviewRoundId=${first.interview.id}`)).briefs.length, 0);
  const incomplete = await responseJson(`${baseUrl}/api/interviews/${first.interview.id}/preparation-runtime/resume`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "commit", decisions: decisions({ jdRequirements: "accept" }).slice(0, 2) }),
  });
  assert.equal(incomplete.response.status, 400);

  const completed = await postJson(`${baseUrl}/api/interviews/${first.interview.id}/preparation-runtime/resume`, {
    action: "commit",
    decisions: decisions({
      jdRequirements: "accept",
      projectMapping: "accept",
      prepChecklist: "accept",
    }),
  });
  assert.equal(completed.runtime.status, "completed");
  assert.equal(completed.runtime.commitResult.created, true);
  assert.deepEqual(completed.runtime.commitResult.acceptedFields, ["jdRequirements", "projectMapping", "prepChecklist"]);
  trackRecord("pre-interview-briefs", completed.runtime.commitResult.briefId);
  const createdBriefs = (await requestJson(`${baseUrl}/api/pre-interview-briefs?interviewRoundId=${first.interview.id}`)).briefs;
  assert.equal(createdBriefs.length, 1);
  assert.equal(createdBriefs[0].jdRequirements, proposal.jdRequirements);
  assert.equal(createdBriefs[0].riskGaps, "");
  const repeat = await postJson(`${baseUrl}/api/interviews/${first.interview.id}/preparation-runtime/resume`, {
    action: "commit",
    decisions: [],
  });
  assert.equal(repeat.runtime.commitResult.briefId, completed.runtime.commitResult.briefId);
  assert.equal((await requestJson(`${baseUrl}/api/pre-interview-briefs?interviewRoundId=${first.interview.id}`)).briefs.length, 1);

  const second = await createInterview(baseUrl, "v028 Preparation Existing");
  const { brief: existingBrief } = await postJson(`${baseUrl}/api/pre-interview-briefs`, {
    opportunityId: second.opportunity.id,
    interviewRoundId: second.interview.id,
    riskGaps: "保留我的原判断",
    questionPredictions: "原始问题清单",
    status: "draft",
  });
  trackRecord("pre-interview-briefs", existingBrief.id);
  await postJson(`${baseUrl}/api/interviews/${second.interview.id}/preparation-runtime/start`, {});
  const existingCompleted = await postJson(`${baseUrl}/api/interviews/${second.interview.id}/preparation-runtime/resume`, {
    action: "commit",
    decisions: decisions({ questionPredictions: "accept" }),
  });
  assert.equal(existingCompleted.runtime.commitResult.created, false);
  const updatedBrief = (await requestJson(`${baseUrl}/api/pre-interview-briefs/${existingBrief.id}`)).brief;
  assert.equal(updatedBrief.riskGaps, "保留我的原判断");
  assert.equal(updatedBrief.questionPredictions, proposal.questionPredictions);

  const retry = await createInterview(baseUrl, "v028 Preparation Retry");
  failedResponsesRemaining = 1;
  const failed = await responseJson(`${baseUrl}/api/interviews/${retry.interview.id}/preparation-runtime/start`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}",
  });
  assert.equal(failed.response.status, 502);
  assert.equal((await requestJson(`${baseUrl}/api/pre-interview-briefs?interviewRoundId=${retry.interview.id}`)).briefs.length, 0);
  const recovered = await postJson(`${baseUrl}/api/interviews/${retry.interview.id}/preparation-runtime/start`, {});
  assert.equal(recovered.runtime.status, "waiting_for_approval");

  console.log(JSON.stringify({
    runtime: "langgraph-preparation-api",
    granularFieldApproval: true,
    fields: Object.keys(proposal).length,
    writesBeforeApproval: 0,
    partialCreate: true,
    preserveExistingFields: true,
    idempotentCompletedResume: true,
    retryAfterModelFailure: true,
    modelRequests: modelRequests.length,
  }));
} finally {
  await close(appServer);
  await close(modelServer);
  await removeOwnFiles();
  for (const [key, value] of Object.entries(savedEnvironment)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}
