import { createServer } from "node:http";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 4173);
const PUBLIC_DIR = path.join(__dirname, "public");
const CONTENT_DIR = path.join(__dirname, "content");
const OPPORTUNITIES_DIR = path.join(CONTENT_DIR, "opportunities");
const INTERVIEWS_DIR = path.join(CONTENT_DIR, "interviews");
const PRE_INTERVIEW_BRIEFS_DIR = path.join(CONTENT_DIR, "pre-interview-briefs");
const INTERVIEW_REVIEWS_DIR = path.join(CONTENT_DIR, "interview-reviews");
const WEAKNESSES_DIR = path.join(CONTENT_DIR, "weaknesses");
const TRAINING_TASKS_DIR = path.join(CONTENT_DIR, "training-tasks");

const STAGES = new Set([
  "collected",
  "applied",
  "invited",
  "preparing",
  "interviewed",
  "reviewed",
  "rejected",
  "offer",
  "paused",
]);

const PRIORITIES = new Set(["low", "medium", "high"]);
const RISK_LEVELS = new Set(["unknown", "low", "medium", "high"]);
const ROUND_TYPES = new Set(["first", "second", "third", "hr", "final", "other"]);
const INTERVIEW_STATUSES = new Set(["scheduled", "preparing", "completed", "reviewed", "cancelled"]);
const PREPARATION_STATUSES = new Set(["not_started", "drafting", "ready", "needs_rework"]);
const BRIEF_STATUSES = new Set(["draft", "ready", "needs_rework"]);
const REVIEW_SELF_RATINGS = new Set(["great", "good", "mixed", "weak", "failed"]);
const REVIEW_RESULTS = new Set(["unknown", "passed", "failed", "pending", "withdrawn"]);
const REVIEW_STATUSES = new Set(["draft", "reviewed", "needs_followup"]);
const WEAKNESS_CATEGORIES = new Set([
  "project_depth",
  "product_thinking",
  "ai_understanding",
  "business_sense",
  "communication",
  "case_analysis",
  "motivation",
  "other",
]);
const SEVERITIES = new Set(["low", "medium", "high"]);
const WEAKNESS_STATUSES = new Set(["open", "training", "validating", "repaired", "archived"]);
const TRAINING_TASK_TYPES = new Set([
  "answer_rewrite",
  "mock_interview",
  "project_deep_dive",
  "case_practice",
  "knowledge_patch",
  "expression_drill",
  "other",
]);
const TRAINING_TASK_STATUSES = new Set(["todo", "doing", "reviewing", "done", "validated", "cancelled"]);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
  });
  res.end(body);
}

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, { "content-type": "text/plain; charset=utf-8" });
  res.end(text);
}

function notFound(res) {
  sendJson(res, 404, { error: "Not found" });
}

function methodNotAllowed(res) {
  sendJson(res, 405, { error: "Method not allowed" });
}

async function ensureContentDirs() {
  await mkdir(OPPORTUNITIES_DIR, { recursive: true });
  await mkdir(INTERVIEWS_DIR, { recursive: true });
  await mkdir(PRE_INTERVIEW_BRIEFS_DIR, { recursive: true });
  await mkdir(INTERVIEW_REVIEWS_DIR, { recursive: true });
  await mkdir(WEAKNESSES_DIR, { recursive: true });
  await mkdir(TRAINING_TASKS_DIR, { recursive: true });
}

function slugify(value) {
  const cleaned = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "opportunity";
}

function createOpportunityId(companyName, roleTitle) {
  const seed = slugify(`${companyName}-${roleTitle}`);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `opp_${stamp}_${seed}_${random}`;
}

function createInterviewId(companyName, roundName) {
  const seed = slugify(`${companyName}-${roundName}`);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `int_${stamp}_${seed}_${random}`;
}

function createBriefId(companyName, roundName) {
  const seed = slugify(`${companyName}-${roundName}-brief`);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `brief_${stamp}_${seed}_${random}`;
}

function createReviewId(companyName, roundName) {
  const seed = slugify(`${companyName}-${roundName}-review`);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `review_${stamp}_${seed}_${random}`;
}

function createWeaknessId(title) {
  const seed = slugify(title);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `weak_${stamp}_${seed}_${random}`;
}

function createTrainingTaskId(title) {
  const seed = slugify(title);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `task_${stamp}_${seed}_${random}`;
}

function sanitizeId(id, prefix) {
  const value = String(id || "");
  const pattern = new RegExp(`^${prefix}_[a-zA-Z0-9_\\-\\u4e00-\\u9fa5]+$`);
  if (!pattern.test(value)) {
    return null;
  }
  return value;
}

function opportunityPath(id) {
  const safeId = sanitizeId(id, "opp");
  if (!safeId) return null;
  return path.join(OPPORTUNITIES_DIR, `${safeId}.md`);
}

function interviewPath(id) {
  const safeId = sanitizeId(id, "int");
  if (!safeId) return null;
  return path.join(INTERVIEWS_DIR, `${safeId}.md`);
}

function briefPath(id) {
  const safeId = sanitizeId(id, "brief");
  if (!safeId) return null;
  return path.join(PRE_INTERVIEW_BRIEFS_DIR, `${safeId}.md`);
}

function reviewPath(id) {
  const safeId = sanitizeId(id, "review");
  if (!safeId) return null;
  return path.join(INTERVIEW_REVIEWS_DIR, `${safeId}.md`);
}

function weaknessPath(id) {
  const safeId = sanitizeId(id, "weak");
  if (!safeId) return null;
  return path.join(WEAKNESSES_DIR, `${safeId}.md`);
}

function trainingTaskPath(id) {
  const safeId = sanitizeId(id, "task");
  if (!safeId) return null;
  return path.join(TRAINING_TASKS_DIR, `${safeId}.md`);
}

function normalizeOpportunity(input, existing = {}) {
  const now = new Date().toISOString();
  const companyName = String(input.companyName ?? existing.companyName ?? "").trim();
  const roleTitle = String(input.roleTitle ?? existing.roleTitle ?? "").trim();

  if (!companyName) {
    throw new Error("companyName is required");
  }
  if (!roleTitle) {
    throw new Error("roleTitle is required");
  }

  const stage = STAGES.has(input.stage) ? input.stage : existing.stage || "collected";
  const priority = PRIORITIES.has(input.priority) ? input.priority : existing.priority || "medium";
  const riskLevel = RISK_LEVELS.has(input.riskLevel)
    ? input.riskLevel
    : existing.riskLevel || "unknown";

  return {
    id: existing.id || input.id || createOpportunityId(companyName, roleTitle),
    type: "opportunity",
    companyName,
    roleTitle,
    jdUrl: String(input.jdUrl ?? existing.jdUrl ?? "").trim(),
    jdText: String(input.jdText ?? existing.jdText ?? ""),
    source: String(input.source ?? existing.source ?? "").trim(),
    stage,
    priority,
    riskLevel,
    nextAction: String(input.nextAction ?? existing.nextAction ?? "").trim(),
    nextActionDueAt: String(input.nextActionDueAt ?? existing.nextActionDueAt ?? "").trim(),
    notes: String(input.notes ?? existing.notes ?? ""),
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizeInterview(input, existing = {}, opportunity) {
  const now = new Date().toISOString();
  const opportunityId = String(
    input.opportunityId ?? existing.opportunityId ?? opportunity?.id ?? "",
  ).trim();
  const companyName = String(
    input.companyName ?? existing.companyName ?? opportunity?.companyName ?? "",
  ).trim();
  const roleTitle = String(input.roleTitle ?? existing.roleTitle ?? opportunity?.roleTitle ?? "").trim();
  const roundName = String(input.roundName ?? existing.roundName ?? "").trim();

  if (!opportunityId) {
    throw new Error("opportunityId is required");
  }
  if (!companyName) {
    throw new Error("companyName is required");
  }
  if (!roleTitle) {
    throw new Error("roleTitle is required");
  }
  if (!roundName) {
    throw new Error("roundName is required");
  }

  const roundType = ROUND_TYPES.has(input.roundType)
    ? input.roundType
    : existing.roundType || "first";
  const status = INTERVIEW_STATUSES.has(input.status)
    ? input.status
    : existing.status || "scheduled";
  const preparationStatus = PREPARATION_STATUSES.has(input.preparationStatus)
    ? input.preparationStatus
    : existing.preparationStatus || "not_started";

  return {
    id: existing.id || input.id || createInterviewId(companyName, roundName),
    type: "interviewRound",
    opportunityId,
    companyName,
    roleTitle,
    roundName,
    roundType,
    scheduledAt: String(input.scheduledAt ?? existing.scheduledAt ?? "").trim(),
    interviewer: String(input.interviewer ?? existing.interviewer ?? "").trim(),
    location: String(input.location ?? existing.location ?? "").trim(),
    status,
    preparationStatus,
    nextAction: String(input.nextAction ?? existing.nextAction ?? "").trim(),
    notes: String(input.notes ?? existing.notes ?? ""),
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizeBrief(input, existing = {}, opportunity, interview) {
  const now = new Date().toISOString();
  const opportunityId = String(
    input.opportunityId ?? existing.opportunityId ?? opportunity?.id ?? interview?.opportunityId ?? "",
  ).trim();
  const interviewRoundId = String(
    input.interviewRoundId ?? existing.interviewRoundId ?? interview?.id ?? "",
  ).trim();

  if (!opportunityId) {
    throw new Error("opportunityId is required");
  }
  if (!interviewRoundId) {
    throw new Error("interviewRoundId is required");
  }

  const status = BRIEF_STATUSES.has(input.status) ? input.status : existing.status || "draft";

  return {
    id:
      existing.id ||
      input.id ||
      createBriefId(opportunity?.companyName || interview?.companyName || "interview", interview?.roundName || "brief"),
    type: "preInterviewBrief",
    opportunityId,
    interviewRoundId,
    companyResearch: String(input.companyResearch ?? existing.companyResearch ?? ""),
    businessSummary: String(input.businessSummary ?? existing.businessSummary ?? ""),
    productSummary: String(input.productSummary ?? existing.productSummary ?? ""),
    jdRequirements: String(input.jdRequirements ?? existing.jdRequirements ?? ""),
    hiddenExpectations: String(input.hiddenExpectations ?? existing.hiddenExpectations ?? ""),
    matchingEvidence: String(input.matchingEvidence ?? existing.matchingEvidence ?? ""),
    riskGaps: String(input.riskGaps ?? existing.riskGaps ?? ""),
    projectMapping: String(input.projectMapping ?? existing.projectMapping ?? ""),
    questionPredictions: String(input.questionPredictions ?? existing.questionPredictions ?? ""),
    highRiskQuestions: String(input.highRiskQuestions ?? existing.highRiskQuestions ?? ""),
    prepChecklist: String(input.prepChecklist ?? existing.prepChecklist ?? ""),
    status,
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizeReview(input, existing = {}, opportunity, interview) {
  const now = new Date().toISOString();
  const opportunityId = String(
    input.opportunityId ?? existing.opportunityId ?? opportunity?.id ?? interview?.opportunityId ?? "",
  ).trim();
  const interviewRoundId = String(
    input.interviewRoundId ?? existing.interviewRoundId ?? interview?.id ?? "",
  ).trim();
  const companyName = String(
    input.companyName ?? existing.companyName ?? opportunity?.companyName ?? interview?.companyName ?? "",
  ).trim();
  const roleTitle = String(input.roleTitle ?? existing.roleTitle ?? opportunity?.roleTitle ?? interview?.roleTitle ?? "").trim();
  const roundName = String(input.roundName ?? existing.roundName ?? interview?.roundName ?? "").trim();

  if (!opportunityId) throw new Error("opportunityId is required");
  if (!interviewRoundId) throw new Error("interviewRoundId is required");
  if (!companyName) throw new Error("companyName is required");
  if (!roleTitle) throw new Error("roleTitle is required");
  if (!roundName) throw new Error("roundName is required");

  const selfRating = REVIEW_SELF_RATINGS.has(input.selfRating)
    ? input.selfRating
    : existing.selfRating || "mixed";
  const result = REVIEW_RESULTS.has(input.result) ? input.result : existing.result || "unknown";
  const status = REVIEW_STATUSES.has(input.status) ? input.status : existing.status || "draft";

  return {
    id: existing.id || input.id || createReviewId(companyName, roundName),
    type: "interviewReview",
    opportunityId,
    interviewRoundId,
    companyName,
    roleTitle,
    roundName,
    actualQuestions: String(input.actualQuestions ?? existing.actualQuestions ?? ""),
    strongAnswers: String(input.strongAnswers ?? existing.strongAnswers ?? ""),
    weakAnswers: String(input.weakAnswers ?? existing.weakAnswers ?? ""),
    failurePoints: String(input.failurePoints ?? existing.failurePoints ?? ""),
    interviewerSignals: String(input.interviewerSignals ?? existing.interviewerSignals ?? ""),
    selfRating,
    result,
    summary: String(input.summary ?? existing.summary ?? ""),
    linkedWeaknessIds: Array.isArray(input.linkedWeaknessIds)
      ? input.linkedWeaknessIds
      : existing.linkedWeaknessIds || [],
    linkedTrainingTaskIds: Array.isArray(input.linkedTrainingTaskIds)
      ? input.linkedTrainingTaskIds
      : existing.linkedTrainingTaskIds || [],
    status,
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function asArray(value, fallback = []) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return fallback;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeWeakness(input, existing = {}) {
  const now = new Date().toISOString();
  const title = String(input.title ?? existing.title ?? "").trim();

  if (!title) {
    throw new Error("title is required");
  }

  const category = WEAKNESS_CATEGORIES.has(input.category)
    ? input.category
    : existing.category || "other";
  const severity = SEVERITIES.has(input.severity) ? input.severity : existing.severity || "medium";
  const status = WEAKNESS_STATUSES.has(input.status) ? input.status : existing.status || "open";
  const relatedReviewIds = unique([
    ...asArray(existing.relatedReviewIds),
    ...asArray(input.relatedReviewIds),
    ...asArray(input.relatedReviewId),
  ]);

  return {
    id: existing.id || input.id || createWeaknessId(title),
    type: "weakness",
    title,
    category,
    description: String(input.description ?? existing.description ?? ""),
    evidence: String(input.evidence ?? existing.evidence ?? ""),
    severity,
    frequency: Number(input.frequency ?? existing.frequency ?? Math.max(1, relatedReviewIds.length)) || 1,
    status,
    relatedOpportunityIds: unique([
      ...asArray(existing.relatedOpportunityIds),
      ...asArray(input.relatedOpportunityIds),
      ...asArray(input.relatedOpportunityId),
    ]),
    relatedInterviewRoundIds: unique([
      ...asArray(existing.relatedInterviewRoundIds),
      ...asArray(input.relatedInterviewRoundIds),
      ...asArray(input.relatedInterviewRoundId),
    ]),
    relatedReviewIds,
    linkedTrainingTaskIds: unique([
      ...asArray(existing.linkedTrainingTaskIds),
      ...asArray(input.linkedTrainingTaskIds),
    ]),
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizeTrainingTask(input, existing = {}, weakness) {
  const now = new Date().toISOString();
  const title = String(input.title ?? existing.title ?? "").trim();
  const weaknessId = String(input.weaknessId ?? existing.weaknessId ?? weakness?.id ?? "").trim();

  if (!title) {
    throw new Error("title is required");
  }
  if (!weaknessId) {
    throw new Error("weaknessId is required");
  }

  const taskType = TRAINING_TASK_TYPES.has(input.taskType)
    ? input.taskType
    : existing.taskType || "answer_rewrite";
  const status = TRAINING_TASK_STATUSES.has(input.status) ? input.status : existing.status || "todo";

  return {
    id: existing.id || input.id || createTrainingTaskId(title),
    type: "trainingTask",
    weaknessId,
    title,
    taskType,
    targetAbility: String(input.targetAbility ?? existing.targetAbility ?? ""),
    practiceOutput: String(input.practiceOutput ?? existing.practiceOutput ?? ""),
    acceptanceCriteria: String(input.acceptanceCriteria ?? existing.acceptanceCriteria ?? ""),
    status,
    dueAt: String(input.dueAt ?? existing.dueAt ?? "").trim(),
    validationNote: String(input.validationNote ?? existing.validationNote ?? ""),
    relatedReviewId: String(input.relatedReviewId ?? existing.relatedReviewId ?? weakness?.relatedReviewIds?.[0] ?? "").trim(),
    relatedInterviewRoundId: String(
      input.relatedInterviewRoundId ?? existing.relatedInterviewRoundId ?? weakness?.relatedInterviewRoundIds?.[0] ?? "",
    ).trim(),
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function markdownEscapeTitle(value) {
  return String(value || "").replace(/\r?\n/g, " ").trim();
}

function opportunityToMarkdown(opportunity) {
  const frontMatter = JSON.stringify(opportunity, null, 2);
  const title = markdownEscapeTitle(`${opportunity.companyName} - ${opportunity.roleTitle}`);
  const jdText = opportunity.jdText?.trim() || "";
  const notes = opportunity.notes?.trim() || "";

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## JD 摘要\n\n${jdText}\n\n## 快速笔记\n\n${notes}\n`;
}

function interviewToMarkdown(interview) {
  const frontMatter = JSON.stringify(interview, null, 2);
  const title = markdownEscapeTitle(
    `${interview.companyName} - ${interview.roleTitle} - ${interview.roundName}`,
  );
  const notes = interview.notes?.trim() || "";

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 面试备注\n\n${notes}\n`;
}

function briefToMarkdown(brief, opportunity, interview) {
  const frontMatter = JSON.stringify(brief, null, 2);
  const title = markdownEscapeTitle(
    `${opportunity?.companyName || interview?.companyName || "面试"} - ${interview?.roundName || "面试前作战 Brief"}`,
  );

  return `---\n${frontMatter}\n---\n\n# ${title} - 面试前作战 Brief\n\n## 公司调研\n\n${brief.companyResearch}\n\n## 业务与产品理解\n\n${brief.businessSummary}\n\n## 产品理解\n\n${brief.productSummary}\n\n## JD 拆解\n\n${brief.jdRequirements}\n\n## 隐性期待\n\n${brief.hiddenExpectations}\n\n## 匹配证据\n\n${brief.matchingEvidence}\n\n## 风险缺口\n\n${brief.riskGaps}\n\n## 项目经历映射\n\n${brief.projectMapping}\n\n## 高频问题预测\n\n${brief.questionPredictions}\n\n## 高风险问题\n\n${brief.highRiskQuestions}\n\n## 准备清单\n\n${brief.prepChecklist}\n`;
}

function reviewToMarkdown(review) {
  const frontMatter = JSON.stringify(review, null, 2);
  const title = markdownEscapeTitle(`${review.companyName} - ${review.roundName}复盘`);

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 实际问题\n\n${review.actualQuestions}\n\n## 强回答\n\n${review.strongAnswers}\n\n## 弱回答\n\n${review.weakAnswers}\n\n## 挂点分析\n\n${review.failurePoints}\n\n## 面试官信号\n\n${review.interviewerSignals}\n\n## 总结\n\n${review.summary}\n`;
}

function weaknessToMarkdown(weakness) {
  const frontMatter = JSON.stringify(weakness, null, 2);
  const title = markdownEscapeTitle(weakness.title);

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 证据\n\n${weakness.evidence}\n\n## 缺陷描述\n\n${weakness.description}\n`;
}

function trainingTaskToMarkdown(task) {
  const frontMatter = JSON.stringify(task, null, 2);
  const title = markdownEscapeTitle(task.title);

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 目标能力\n\n${task.targetAbility}\n\n## 练习产物\n\n${task.practiceOutput}\n\n## 验收标准\n\n${task.acceptanceCriteria}\n\n## 验证记录\n\n${task.validationNote}\n`;
}

function parseMarkdown(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    throw new Error("Missing JSON front matter");
  }
  const frontMatter = JSON.parse(match[1]);
  return { frontMatter, body: raw.slice(match[0].length) };
}

async function readOpportunityFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readInterviewFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readBriefFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readReviewFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readWeaknessFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readTrainingTaskFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function listOpportunities() {
  await ensureContentDirs();
  const entries = await readdir(OPPORTUNITIES_DIR, { withFileTypes: true });
  const opportunities = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readOpportunityFile(path.join(OPPORTUNITIES_DIR, entry.name));
      if (item.type === "opportunity") {
        opportunities.push(item);
      }
    } catch (error) {
      opportunities.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "opportunity",
        companyName: "读取失败",
        roleTitle: entry.name,
        stage: "paused",
        priority: "low",
        riskLevel: "high",
        nextAction: error.message,
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  opportunities.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
  return opportunities;
}

async function listInterviews(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(INTERVIEWS_DIR, { withFileTypes: true });
  const interviews = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readInterviewFile(path.join(INTERVIEWS_DIR, entry.name));
      if (item.type === "interviewRound") {
        interviews.push(item);
      }
    } catch (error) {
      interviews.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "interviewRound",
        companyName: "读取失败",
        roleTitle: entry.name,
        roundName: "未知轮次",
        roundType: "other",
        status: "cancelled",
        preparationStatus: "needs_rework",
        nextAction: error.message,
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = filters.opportunityId
    ? interviews.filter((interview) => interview.opportunityId === filters.opportunityId)
    : interviews;

  filtered.sort((a, b) => {
    const scheduleOrder = String(a.scheduledAt || "").localeCompare(String(b.scheduledAt || ""));
    if (scheduleOrder) return scheduleOrder;
    return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
  });
  return filtered;
}

async function listBriefs(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(PRE_INTERVIEW_BRIEFS_DIR, { withFileTypes: true });
  const briefs = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readBriefFile(path.join(PRE_INTERVIEW_BRIEFS_DIR, entry.name));
      if (item.type === "preInterviewBrief") {
        briefs.push(item);
      }
    } catch (error) {
      briefs.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "preInterviewBrief",
        opportunityId: "",
        interviewRoundId: "",
        status: "needs_rework",
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = briefs.filter((brief) => {
    if (filters.opportunityId && brief.opportunityId !== filters.opportunityId) return false;
    if (filters.interviewRoundId && brief.interviewRoundId !== filters.interviewRoundId) return false;
    return true;
  });

  filtered.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
  return filtered;
}

async function listReviews(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(INTERVIEW_REVIEWS_DIR, { withFileTypes: true });
  const reviews = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readReviewFile(path.join(INTERVIEW_REVIEWS_DIR, entry.name));
      if (item.type === "interviewReview") {
        reviews.push(item);
      }
    } catch (error) {
      reviews.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "interviewReview",
        companyName: "读取失败",
        roleTitle: entry.name,
        roundName: "未知轮次",
        selfRating: "failed",
        result: "unknown",
        status: "needs_followup",
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = reviews.filter((review) => {
    if (filters.opportunityId && review.opportunityId !== filters.opportunityId) return false;
    if (filters.interviewRoundId && review.interviewRoundId !== filters.interviewRoundId) return false;
    return true;
  });

  filtered.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
  return filtered;
}

async function listWeaknesses(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(WEAKNESSES_DIR, { withFileTypes: true });
  const weaknesses = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readWeaknessFile(path.join(WEAKNESSES_DIR, entry.name));
      if (item.type === "weakness") {
        weaknesses.push(item);
      }
    } catch (error) {
      weaknesses.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "weakness",
        title: "读取失败",
        category: "other",
        severity: "high",
        status: "open",
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = weaknesses.filter((weakness) => {
    if (filters.status && weakness.status !== filters.status) return false;
    if (filters.category && weakness.category !== filters.category) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 };
    const severityDiff = (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3);
    if (severityDiff) return severityDiff;
    return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
  });
  return filtered;
}

async function listTrainingTasks(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(TRAINING_TASKS_DIR, { withFileTypes: true });
  const tasks = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readTrainingTaskFile(path.join(TRAINING_TASKS_DIR, entry.name));
      if (item.type === "trainingTask") {
        tasks.push(item);
      }
    } catch (error) {
      tasks.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "trainingTask",
        weaknessId: "",
        title: "读取失败",
        taskType: "other",
        status: "todo",
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = tasks.filter((task) => {
    if (filters.weaknessId && task.weaknessId !== filters.weaknessId) return false;
    if (filters.status && task.status !== filters.status) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const statusOrder = { todo: 0, doing: 1, reviewing: 2, done: 3, validated: 4, cancelled: 5 };
    const statusDiff = (statusOrder[a.status] ?? 6) - (statusOrder[b.status] ?? 6);
    if (statusDiff) return statusDiff;
    return String(a.dueAt || "9999").localeCompare(String(b.dueAt || "9999"));
  });
  return filtered;
}

async function getOpportunity(id) {
  const filePath = opportunityPath(id);
  if (!filePath) return null;

  try {
    return await readOpportunityFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getInterview(id) {
  const filePath = interviewPath(id);
  if (!filePath) return null;

  try {
    return await readInterviewFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getBrief(id) {
  const filePath = briefPath(id);
  if (!filePath) return null;

  try {
    return await readBriefFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getReview(id) {
  const filePath = reviewPath(id);
  if (!filePath) return null;

  try {
    return await readReviewFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getWeakness(id) {
  const filePath = weaknessPath(id);
  if (!filePath) return null;

  try {
    return await readWeaknessFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getTrainingTask(id) {
  const filePath = trainingTaskPath(id);
  if (!filePath) return null;

  try {
    return await readTrainingTaskFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function saveOpportunity(opportunity) {
  await ensureContentDirs();
  const filePath = opportunityPath(opportunity.id);
  if (!filePath) {
    throw new Error("Invalid opportunity id");
  }
  await writeFile(filePath, opportunityToMarkdown(opportunity), "utf8");
  return opportunity;
}

async function saveInterview(interview) {
  await ensureContentDirs();
  const filePath = interviewPath(interview.id);
  if (!filePath) {
    throw new Error("Invalid interview id");
  }
  await writeFile(filePath, interviewToMarkdown(interview), "utf8");
  return interview;
}

async function saveBrief(brief, opportunity, interview) {
  await ensureContentDirs();
  const filePath = briefPath(brief.id);
  if (!filePath) {
    throw new Error("Invalid brief id");
  }
  await writeFile(filePath, briefToMarkdown(brief, opportunity, interview), "utf8");
  return brief;
}

async function saveReview(review) {
  await ensureContentDirs();
  const filePath = reviewPath(review.id);
  if (!filePath) {
    throw new Error("Invalid review id");
  }
  await writeFile(filePath, reviewToMarkdown(review), "utf8");
  return review;
}

async function saveWeakness(weakness) {
  await ensureContentDirs();
  const filePath = weaknessPath(weakness.id);
  if (!filePath) {
    throw new Error("Invalid weakness id");
  }
  await writeFile(filePath, weaknessToMarkdown(weakness), "utf8");
  return weakness;
}

async function saveTrainingTask(task) {
  await ensureContentDirs();
  const filePath = trainingTaskPath(task.id);
  if (!filePath) {
    throw new Error("Invalid training task id");
  }
  await writeFile(filePath, trainingTaskToMarkdown(task), "utf8");
  return task;
}

function briefStatusToPreparationStatus(status) {
  if (status === "ready") return "ready";
  if (status === "needs_rework") return "needs_rework";
  return "drafting";
}

async function syncInterviewPreparationStatus(interview, briefStatus) {
  const opportunity = await getOpportunity(interview.opportunityId);
  if (!opportunity) return interview;

  const nextInterview = normalizeInterview(
    { ...interview, preparationStatus: briefStatusToPreparationStatus(briefStatus) },
    interview,
    opportunity,
  );
  await saveInterview(nextInterview);
  return nextInterview;
}

async function syncInterviewReviewStatus(interview, reviewStatus) {
  if (reviewStatus !== "reviewed") return interview;
  const opportunity = await getOpportunity(interview.opportunityId);
  if (!opportunity) return interview;

  const nextInterview = normalizeInterview({ ...interview, status: "reviewed" }, interview, opportunity);
  await saveInterview(nextInterview);
  return nextInterview;
}

async function linkWeaknessToReviews(weakness) {
  for (const reviewId of weakness.relatedReviewIds || []) {
    const review = await getReview(reviewId);
    if (!review) continue;
    const linkedWeaknessIds = unique([...(review.linkedWeaknessIds || []), weakness.id]);
    await saveReview({ ...review, linkedWeaknessIds, updatedAt: new Date().toISOString() });
  }
}

async function linkTaskToWeakness(task) {
  const weakness = await getWeakness(task.weaknessId);
  if (!weakness) return null;

  const linkedTrainingTaskIds = unique([...(weakness.linkedTrainingTaskIds || []), task.id]);
  let status = weakness.status;
  if (task.status === "validated" && task.validationNote.trim()) {
    status = "repaired";
  } else if (task.status === "validated") {
    status = "validating";
  } else if (["doing", "reviewing", "done"].includes(task.status) && weakness.status === "open") {
    status = "training";
  }
  const nextWeakness = normalizeWeakness({ ...weakness, linkedTrainingTaskIds, status }, weakness);
  await saveWeakness(nextWeakness);
  return nextWeakness;
}

async function readRequestBody(req) {
  const chunks = [];
  let total = 0;

  for await (const chunk of req) {
    total += chunk.length;
    if (total > 2_000_000) {
      throw new Error("Request body is too large");
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function handleApi(req, res, url) {
  if (url.pathname === "/api/opportunities") {
    if (req.method === "GET") {
      const opportunities = await listOpportunities();
      return sendJson(res, 200, { opportunities });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const opportunity = normalizeOpportunity(body);
      await saveOpportunity(opportunity);
      return sendJson(res, 201, { opportunity });
    }

    return methodNotAllowed(res);
  }

  const opportunityMatch = url.pathname.match(/^\/api\/opportunities\/([^/]+)$/);
  if (opportunityMatch) {
    const id = decodeURIComponent(opportunityMatch[1]);

    if (req.method === "GET") {
      const opportunity = await getOpportunity(id);
      if (!opportunity) return notFound(res);
      return sendJson(res, 200, { opportunity });
    }

    if (req.method === "PUT") {
      const existing = await getOpportunity(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const opportunity = normalizeOpportunity({ ...body, id }, existing);
      await saveOpportunity(opportunity);
      return sendJson(res, 200, { opportunity });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/interviews") {
    if (req.method === "GET") {
      const opportunityId = url.searchParams.get("opportunityId") || "";
      const interviews = await listInterviews({ opportunityId });
      return sendJson(res, 200, { interviews });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const opportunity = await getOpportunity(body.opportunityId);
      if (!opportunity) {
        return sendJson(res, 400, { error: "Related opportunity not found" });
      }
      const interview = normalizeInterview(body, {}, opportunity);
      await saveInterview(interview);
      return sendJson(res, 201, { interview });
    }

    return methodNotAllowed(res);
  }

  const interviewMatch = url.pathname.match(/^\/api\/interviews\/([^/]+)$/);
  if (interviewMatch) {
    const id = decodeURIComponent(interviewMatch[1]);

    if (req.method === "GET") {
      const interview = await getInterview(id);
      if (!interview) return notFound(res);
      return sendJson(res, 200, { interview });
    }

    if (req.method === "PUT") {
      const existing = await getInterview(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const opportunity = await getOpportunity(body.opportunityId || existing.opportunityId);
      if (!opportunity) {
        return sendJson(res, 400, { error: "Related opportunity not found" });
      }
      const interview = normalizeInterview({ ...body, id }, existing, opportunity);
      await saveInterview(interview);
      return sendJson(res, 200, { interview });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/pre-interview-briefs") {
    if (req.method === "GET") {
      const opportunityId = url.searchParams.get("opportunityId") || "";
      const interviewRoundId = url.searchParams.get("interviewRoundId") || "";
      const briefs = await listBriefs({ opportunityId, interviewRoundId });
      return sendJson(res, 200, { briefs });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const opportunity = await getOpportunity(body.opportunityId);
      const interview = await getInterview(body.interviewRoundId);
      if (!opportunity) {
        return sendJson(res, 400, { error: "Related opportunity not found" });
      }
      if (!interview) {
        return sendJson(res, 400, { error: "Related interview not found" });
      }
      const brief = normalizeBrief(body, {}, opportunity, interview);
      await saveBrief(brief, opportunity, interview);
      const updatedInterview = await syncInterviewPreparationStatus(interview, brief.status);
      return sendJson(res, 201, { brief, interview: updatedInterview });
    }

    return methodNotAllowed(res);
  }

  const briefMatch = url.pathname.match(/^\/api\/pre-interview-briefs\/([^/]+)$/);
  if (briefMatch) {
    const id = decodeURIComponent(briefMatch[1]);

    if (req.method === "GET") {
      const brief = await getBrief(id);
      if (!brief) return notFound(res);
      return sendJson(res, 200, { brief });
    }

    if (req.method === "PUT") {
      const existing = await getBrief(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const opportunity = await getOpportunity(body.opportunityId || existing.opportunityId);
      const interview = await getInterview(body.interviewRoundId || existing.interviewRoundId);
      if (!opportunity) {
        return sendJson(res, 400, { error: "Related opportunity not found" });
      }
      if (!interview) {
        return sendJson(res, 400, { error: "Related interview not found" });
      }
      const brief = normalizeBrief({ ...body, id }, existing, opportunity, interview);
      await saveBrief(brief, opportunity, interview);
      const updatedInterview = await syncInterviewPreparationStatus(interview, brief.status);
      return sendJson(res, 200, { brief, interview: updatedInterview });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/interview-reviews") {
    if (req.method === "GET") {
      const opportunityId = url.searchParams.get("opportunityId") || "";
      const interviewRoundId = url.searchParams.get("interviewRoundId") || "";
      const reviews = await listReviews({ opportunityId, interviewRoundId });
      return sendJson(res, 200, { reviews });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const opportunity = await getOpportunity(body.opportunityId);
      const interview = await getInterview(body.interviewRoundId);
      if (!opportunity) {
        return sendJson(res, 400, { error: "Related opportunity not found" });
      }
      if (!interview) {
        return sendJson(res, 400, { error: "Related interview not found" });
      }
      const review = normalizeReview(body, {}, opportunity, interview);
      await saveReview(review);
      const updatedInterview = await syncInterviewReviewStatus(interview, review.status);
      return sendJson(res, 201, { review, interview: updatedInterview });
    }

    return methodNotAllowed(res);
  }

  const reviewMatch = url.pathname.match(/^\/api\/interview-reviews\/([^/]+)$/);
  if (reviewMatch) {
    const id = decodeURIComponent(reviewMatch[1]);

    if (req.method === "GET") {
      const review = await getReview(id);
      if (!review) return notFound(res);
      return sendJson(res, 200, { review });
    }

    if (req.method === "PUT") {
      const existing = await getReview(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const opportunity = await getOpportunity(body.opportunityId || existing.opportunityId);
      const interview = await getInterview(body.interviewRoundId || existing.interviewRoundId);
      if (!opportunity) {
        return sendJson(res, 400, { error: "Related opportunity not found" });
      }
      if (!interview) {
        return sendJson(res, 400, { error: "Related interview not found" });
      }
      const review = normalizeReview({ ...body, id }, existing, opportunity, interview);
      await saveReview(review);
      const updatedInterview = await syncInterviewReviewStatus(interview, review.status);
      return sendJson(res, 200, { review, interview: updatedInterview });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/weaknesses") {
    if (req.method === "GET") {
      const status = url.searchParams.get("status") || "";
      const category = url.searchParams.get("category") || "";
      const weaknesses = await listWeaknesses({ status, category });
      return sendJson(res, 200, { weaknesses });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const weakness = normalizeWeakness(body);
      await saveWeakness(weakness);
      await linkWeaknessToReviews(weakness);
      return sendJson(res, 201, { weakness });
    }

    return methodNotAllowed(res);
  }

  const weaknessMatch = url.pathname.match(/^\/api\/weaknesses\/([^/]+)$/);
  if (weaknessMatch) {
    const id = decodeURIComponent(weaknessMatch[1]);

    if (req.method === "GET") {
      const weakness = await getWeakness(id);
      if (!weakness) return notFound(res);
      return sendJson(res, 200, { weakness });
    }

    if (req.method === "PUT") {
      const existing = await getWeakness(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const weakness = normalizeWeakness({ ...body, id }, existing);
      await saveWeakness(weakness);
      await linkWeaknessToReviews(weakness);
      return sendJson(res, 200, { weakness });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/training-tasks") {
    if (req.method === "GET") {
      const weaknessId = url.searchParams.get("weaknessId") || "";
      const status = url.searchParams.get("status") || "";
      const tasks = await listTrainingTasks({ weaknessId, status });
      return sendJson(res, 200, { tasks });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const weakness = await getWeakness(body.weaknessId);
      if (!weakness) {
        return sendJson(res, 400, { error: "Related weakness not found" });
      }
      const task = normalizeTrainingTask(body, {}, weakness);
      await saveTrainingTask(task);
      const updatedWeakness = await linkTaskToWeakness(task);
      return sendJson(res, 201, { task, weakness: updatedWeakness });
    }

    return methodNotAllowed(res);
  }

  const trainingTaskMatch = url.pathname.match(/^\/api\/training-tasks\/([^/]+)$/);
  if (trainingTaskMatch) {
    const id = decodeURIComponent(trainingTaskMatch[1]);

    if (req.method === "GET") {
      const task = await getTrainingTask(id);
      if (!task) return notFound(res);
      return sendJson(res, 200, { task });
    }

    if (req.method === "PUT") {
      const existing = await getTrainingTask(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const weakness = await getWeakness(body.weaknessId || existing.weaknessId);
      if (!weakness) {
        return sendJson(res, 400, { error: "Related weakness not found" });
      }
      const task = normalizeTrainingTask({ ...body, id }, existing, weakness);
      await saveTrainingTask(task);
      const updatedWeakness = await linkTaskToWeakness(task);
      return sendJson(res, 200, { task, weakness: updatedWeakness });
    }

    return methodNotAllowed(res);
  }

  return notFound(res);
}

function safeStaticPath(urlPathname) {
  const decoded = decodeURIComponent(urlPathname);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const normalized = path.normalize(requested).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, normalized);
  const relative = path.relative(PUBLIC_DIR, filePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }
  return filePath;
}

async function serveStatic(req, res, url) {
  const filePath = safeStaticPath(url.pathname);
  if (!filePath) {
    return sendText(res, 403, "Forbidden");
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) return notFound(res);

    const ext = path.extname(filePath);
    res.writeHead(200, {
      "content-type": MIME_TYPES[ext] || "application/octet-stream",
      "content-length": fileStat.size,
    });
    createReadStream(filePath).pipe(res);
  } catch (error) {
    if (error.code === "ENOENT") return notFound(res);
    throw error;
  }
}

export async function route(req, res) {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (url.pathname.startsWith("/api/")) {
      return await handleApi(req, res, url);
    }

    return await serveStatic(req, res, url);
  } catch (error) {
    const statusCode = error instanceof SyntaxError ? 400 : 500;
    return sendJson(res, statusCode, { error: error.message || "Internal server error" });
  }
}

function listen(server, port, host) {
  return new Promise((resolve, reject) => {
    function cleanup() {
      server.off("error", handleError);
      server.off("listening", handleListening);
    }

    function handleError(error) {
      cleanup();
      reject(error);
    }

    function handleListening() {
      cleanup();
      resolve();
    }

    server.once("error", handleError);
    server.once("listening", handleListening);
    server.listen(port, host);
  });
}

function isPortUnavailable(error) {
  return error.code === "EADDRINUSE" || error.code === "EACCES";
}

export async function startServer(port = PORT, host) {
  await ensureContentDirs();
  const server = createServer(route);
  await listen(server, port, host);
  return server;
}

function logStartupError(error, port) {
  if (isPortUnavailable(error)) {
    console.error(`way2AIPM OS 启动失败：端口 ${port} 已被占用或当前用户无权监听该端口。`);
    console.error("请先停止正在运行的旧服务，然后重新执行：node server.mjs");
    console.error(`也可以临时指定其他端口启动：$env:PORT=4300; node server.mjs`);
    return;
  }

  console.error(`way2AIPM OS 启动失败：${error.message || error}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const server = await startServer(PORT);
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : PORT;
    console.log(`way2AIPM OS is running at http://localhost:${port}`);
  } catch (error) {
    logStartupError(error, PORT);
    process.exitCode = 1;
  }
}
