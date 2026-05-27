import { createServer } from "node:http";
import { timingSafeEqual } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { loadEnvFile } from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_ENV_PATH = path.join(__dirname, ".env.local");

try {
  loadEnvFile(LOCAL_ENV_PATH);
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }
}

const PORT = Number(process.env.PORT || 4173);
const OPENAI_RESPONSES_URL = String(
  process.env.OPENAI_RESPONSES_URL || "https://api.openai.com/v1/responses",
).trim();
const PUBLIC_DIR = path.join(__dirname, "public");
const CONTENT_DIR = path.join(__dirname, "content");
const OPPORTUNITIES_DIR = path.join(CONTENT_DIR, "opportunities");
const INTERVIEWS_DIR = path.join(CONTENT_DIR, "interviews");
const PRE_INTERVIEW_BRIEFS_DIR = path.join(CONTENT_DIR, "pre-interview-briefs");
const INTERVIEW_REVIEWS_DIR = path.join(CONTENT_DIR, "interview-reviews");
const WEAKNESSES_DIR = path.join(CONTENT_DIR, "weaknesses");
const TRAINING_TASKS_DIR = path.join(CONTENT_DIR, "training-tasks");
const PROJECT_AMMOS_DIR = path.join(CONTENT_DIR, "project-ammos");
const FOLLOW_UP_QUESTIONS_DIR = path.join(CONTENT_DIR, "follow-up-questions");
const EXPRESSION_DRILLS_DIR = path.join(CONTENT_DIR, "expression-drills");
const EXPRESSION_SESSIONS_DIR = path.join(CONTENT_DIR, "expression-sessions");
const PORTFOLIO_DIR = path.join(CONTENT_DIR, "portfolio");
const PORTFOLIO_PROJECTS_DIR = path.join(CONTENT_DIR, "portfolio-projects");
const AI_ANALYSIS_NOTES_DIR = path.join(CONTENT_DIR, "ai-analysis-notes");
const AI_FRONTIER_CARDS_DIR = path.join(CONTENT_DIR, "ai-frontier-cards");
const RHYTHM_LOGS_DIR = path.join(CONTENT_DIR, "rhythm-logs");
const WORKFLOW_RUNS_DIR = path.join(CONTENT_DIR, "workflow-runs");
const LANGGRAPH_CHECKPOINT_PATH = path.resolve(
  String(process.env.WAY2AIPM_LANGGRAPH_CHECKPOINT_PATH || path.join(__dirname, "runtime", "langgraph", "checkpoints.json")),
);
const PORTFOLIO_PROFILE_ID = "portfolio_profile";

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
const PROJECT_TYPES = new Set([
  "ai_product",
  "data_product",
  "growth",
  "platform",
  "operation",
  "coursework",
  "personal",
  "other",
]);
const PROJECT_AMMO_STATUSES = new Set(["draft", "usable", "needs_deepening", "archived"]);
const FOLLOW_UP_QUESTION_TYPES = new Set([
  "role_depth",
  "decision_logic",
  "metric_result",
  "tradeoff",
  "failure_reflection",
  "ai_understanding",
  "business_value",
  "other",
]);
const FOLLOW_UP_QUESTION_STATUSES = new Set(["unanswered", "drafted", "stable", "needs_drill"]);
const EXPRESSION_DRILL_SOURCE_TYPES = new Set([
  "follow_up_question",
  "weakness",
  "training_task",
  "interview_review",
]);
const EXPRESSION_DRILL_SCORES = new Set(["unstable", "usable", "stable"]);
const EXPRESSION_DRILL_STATUSES = new Set(["todo", "practicing", "reviewing", "stable", "archived"]);
const EXPRESSION_SESSION_ATTEMPT_TYPES = new Set([
  "read_aloud",
  "mock_interview",
  "structured_rewrite",
  "fast_recall",
  "review",
]);
const EXPRESSION_SESSION_STATUSES = new Set(["draft", "practiced", "needs_rework", "stable", "archived"]);
const PORTFOLIO_STATUSES = new Set(["draft", "reviewing", "ready", "published_ready"]);
const PORTFOLIO_VISIBILITIES = new Set(["private", "portfolio", "hidden"]);
const PORTFOLIO_READINESS = new Set(["draft", "needs_sanitizing", "needs_evidence", "ready"]);
const AI_ANALYSIS_TYPES = new Set([
  "review_diagnosis",
  "jd_breakdown",
  "company_research",
  "project_match",
  "follow_up_questions",
  "answer_structure",
  "portfolio_polish",
  "weakness_repair",
  "other",
]);
const AI_ANALYSIS_SOURCE_TYPES = new Set([
  "opportunity",
  "project_ammo",
  "follow_up_question",
  "interview_review",
  "weakness",
  "training_task",
  "portfolio_project",
  "freeform",
]);
const AI_ANALYSIS_STATUSES = new Set(["draft", "prompt_ready", "ai_responded", "decided", "archived"]);
const AI_RUN_STATUSES = new Set(["not_run", "completed", "failed"]);
const AI_FRONTIER_CATEGORIES = new Set([
  "model_capability",
  "ai_product",
  "agent_workflow",
  "industry_case",
  "research_paper",
  "market_signal",
  "pm_framework",
  "other",
]);
const AI_FRONTIER_STATUSES = new Set(["inbox", "summarized", "mapped", "applied", "archived"]);
const RHYTHM_LEVELS = new Set(["low", "medium", "high"]);
const RHYTHM_STATUSES = new Set(["planned", "active", "recovery_needed", "closed", "archived"]);
const WORKFLOW_DEFINITIONS = new Set(["post_interview_repair_loop"]);
const WORKFLOW_STATUSES = new Set([
  "diagnosis_pending",
  "candidate_confirmation",
  "training_pending",
  "training_in_progress",
  "validation_pending",
  "completed",
  "paused",
]);
const WORKFLOW_WAITING_FOR = new Set(["human_action", "ai_generation", "training", "validation", "none"]);
const AGENT_TOOL_ADAPTER_VERSION = "review_runtime_v1";

const REVIEW_DIAGNOSIS_JSON_SCHEMA = {
  type: "object",
  properties: {
    summary: { type: "string" },
    failurePoints: {
      type: "array",
      items: { type: "string" },
    },
    weaknessCandidates: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          category: {
            type: "string",
            enum: [
              "project_depth",
              "product_thinking",
              "ai_understanding",
              "business_sense",
              "communication",
              "case_analysis",
              "motivation",
              "other",
            ],
          },
          severity: { type: "string", enum: ["low", "medium", "high"] },
          evidence: { type: "string" },
          description: { type: "string" },
        },
        required: ["title", "category", "severity", "evidence", "description"],
        additionalProperties: false,
      },
    },
    trainingTaskCandidates: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          weaknessCandidateIndex: { type: ["integer", "null"] },
          taskType: {
            type: "string",
            enum: [
              "answer_rewrite",
              "mock_interview",
              "project_deep_dive",
              "case_practice",
              "knowledge_patch",
              "expression_drill",
              "other",
            ],
          },
          targetAbility: { type: "string" },
          practiceOutput: { type: "string" },
          acceptanceCriteria: { type: "string" },
        },
        required: [
          "title",
          "weaknessCandidateIndex",
          "taskType",
          "targetAbility",
          "practiceOutput",
          "acceptanceCriteria",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["summary", "failurePoints", "weaknessCandidates", "trainingTaskCandidates"],
  additionalProperties: false,
};

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

function agentToolRequestAuthorized(req, res) {
  const expected = String(process.env.WAY2AIPM_AGENT_TOOL_TOKEN || "").trim();
  if (!expected) {
    sendJson(res, 503, { error: "Agent tool access is not configured" });
    return false;
  }
  const authorization = String(req.headers.authorization || "");
  const provided = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  if (
    expectedBuffer.length !== providedBuffer.length ||
    !timingSafeEqual(expectedBuffer, providedBuffer)
  ) {
    sendJson(res, 401, { error: "Unauthorized agent tool request" });
    return false;
  }
  return true;
}

async function ensureContentDirs() {
  await mkdir(OPPORTUNITIES_DIR, { recursive: true });
  await mkdir(INTERVIEWS_DIR, { recursive: true });
  await mkdir(PRE_INTERVIEW_BRIEFS_DIR, { recursive: true });
  await mkdir(INTERVIEW_REVIEWS_DIR, { recursive: true });
  await mkdir(WEAKNESSES_DIR, { recursive: true });
  await mkdir(TRAINING_TASKS_DIR, { recursive: true });
  await mkdir(PROJECT_AMMOS_DIR, { recursive: true });
  await mkdir(FOLLOW_UP_QUESTIONS_DIR, { recursive: true });
  await mkdir(EXPRESSION_DRILLS_DIR, { recursive: true });
  await mkdir(EXPRESSION_SESSIONS_DIR, { recursive: true });
  await mkdir(PORTFOLIO_DIR, { recursive: true });
  await mkdir(PORTFOLIO_PROJECTS_DIR, { recursive: true });
  await mkdir(AI_ANALYSIS_NOTES_DIR, { recursive: true });
  await mkdir(AI_FRONTIER_CARDS_DIR, { recursive: true });
  await mkdir(RHYTHM_LOGS_DIR, { recursive: true });
  await mkdir(WORKFLOW_RUNS_DIR, { recursive: true });
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

function createAcceptedCandidateRecordId(prefix, noteId, candidateId) {
  return `${prefix}_candidate_${noteId}_${candidateId}`;
}

function createProjectAmmoId(projectName) {
  const seed = slugify(projectName);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `ammo_${stamp}_${seed}_${random}`;
}

function createFollowUpQuestionId(question) {
  const seed = slugify(question);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `follow_${stamp}_${seed}_${random}`;
}

function createExpressionDrillId(question) {
  const seed = slugify(question);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `drill_${stamp}_${seed}_${random}`;
}

function createExpressionSessionId(question) {
  const seed = slugify(question);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `exprsess_${stamp}_${seed}_${random}`;
}

function createPortfolioProjectId(title) {
  const seed = slugify(title);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `pfproj_${stamp}_${seed}_${random}`;
}

function createAiAnalysisNoteId(title) {
  const seed = slugify(title);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `ainote_${stamp}_${seed}_${random}`;
}

function createAiFrontierCardId(topic) {
  const seed = slugify(topic);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `aifront_${stamp}_${seed}_${random}`;
}

function createRhythmLogId(title, date) {
  const seed = slugify(`${date}-${title}`);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `rhythm_${stamp}_${seed}_${random}`;
}

function createWorkflowRunId(title) {
  const seed = slugify(title);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `flow_${stamp}_${seed}_${random}`;
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

function projectAmmoPath(id) {
  const safeId = sanitizeId(id, "ammo");
  if (!safeId) return null;
  return path.join(PROJECT_AMMOS_DIR, `${safeId}.md`);
}

function followUpQuestionPath(id) {
  const safeId = sanitizeId(id, "follow");
  if (!safeId) return null;
  return path.join(FOLLOW_UP_QUESTIONS_DIR, `${safeId}.md`);
}

function expressionDrillPath(id) {
  const safeId = sanitizeId(id, "drill");
  if (!safeId) return null;
  return path.join(EXPRESSION_DRILLS_DIR, `${safeId}.md`);
}

function expressionSessionPath(id) {
  const safeId = sanitizeId(id, "exprsess");
  if (!safeId) return null;
  return path.join(EXPRESSION_SESSIONS_DIR, `${safeId}.md`);
}

function portfolioProfilePath() {
  return path.join(PORTFOLIO_DIR, "profile.md");
}

function portfolioProjectPath(id) {
  const safeId = sanitizeId(id, "pfproj");
  if (!safeId) return null;
  return path.join(PORTFOLIO_PROJECTS_DIR, `${safeId}.md`);
}

function aiAnalysisNotePath(id) {
  const safeId = sanitizeId(id, "ainote");
  if (!safeId) return null;
  return path.join(AI_ANALYSIS_NOTES_DIR, `${safeId}.md`);
}

function aiFrontierCardPath(id) {
  const safeId = sanitizeId(id, "aifront");
  if (!safeId) return null;
  return path.join(AI_FRONTIER_CARDS_DIR, `${safeId}.md`);
}

function rhythmLogPath(id) {
  const safeId = sanitizeId(id, "rhythm");
  if (!safeId) return null;
  return path.join(RHYTHM_LOGS_DIR, `${safeId}.md`);
}

function workflowRunPath(id) {
  const safeId = sanitizeId(id, "flow");
  if (!safeId) return null;
  return path.join(WORKFLOW_RUNS_DIR, `${safeId}.md`);
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

function normalizeProjectAmmo(input, existing = {}) {
  const now = new Date().toISOString();
  const projectName = String(input.projectName ?? existing.projectName ?? "").trim();

  if (!projectName) {
    throw new Error("projectName is required");
  }

  const projectType = PROJECT_TYPES.has(input.projectType)
    ? input.projectType
    : existing.projectType || "personal";
  const status = PROJECT_AMMO_STATUSES.has(input.status) ? input.status : existing.status || "draft";

  return {
    id: existing.id || input.id || createProjectAmmoId(projectName),
    type: "projectAmmo",
    projectName,
    projectType,
    role: String(input.role ?? existing.role ?? "").trim(),
    period: String(input.period ?? existing.period ?? "").trim(),
    background: String(input.background ?? existing.background ?? ""),
    goal: String(input.goal ?? existing.goal ?? ""),
    actions: String(input.actions ?? existing.actions ?? ""),
    result: String(input.result ?? existing.result ?? ""),
    metrics: String(input.metrics ?? existing.metrics ?? ""),
    evidence: String(input.evidence ?? existing.evidence ?? ""),
    aiRelevance: String(input.aiRelevance ?? existing.aiRelevance ?? ""),
    pmCompetencies: String(input.pmCompetencies ?? existing.pmCompetencies ?? ""),
    riskQuestions: String(input.riskQuestions ?? existing.riskQuestions ?? ""),
    linkedWeaknessIds: unique([
      ...asArray(existing.linkedWeaknessIds),
      ...asArray(input.linkedWeaknessIds),
      ...asArray(input.linkedWeaknessId),
    ]),
    linkedTrainingTaskIds: unique([
      ...asArray(existing.linkedTrainingTaskIds),
      ...asArray(input.linkedTrainingTaskIds),
      ...asArray(input.linkedTrainingTaskId),
    ]),
    status,
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizeFollowUpQuestion(input, existing = {}, projectAmmo) {
  const now = new Date().toISOString();
  const projectAmmoId = String(input.projectAmmoId ?? existing.projectAmmoId ?? projectAmmo?.id ?? "").trim();
  const question = String(input.question ?? existing.question ?? "").trim();

  if (!projectAmmoId) {
    throw new Error("projectAmmoId is required");
  }
  if (!question) {
    throw new Error("question is required");
  }

  const questionType = FOLLOW_UP_QUESTION_TYPES.has(input.questionType)
    ? input.questionType
    : existing.questionType || "other";
  const riskLevel = RISK_LEVELS.has(input.riskLevel) ? input.riskLevel : existing.riskLevel || "unknown";
  const status = FOLLOW_UP_QUESTION_STATUSES.has(input.status)
    ? input.status
    : existing.status || "unanswered";

  return {
    id: existing.id || input.id || createFollowUpQuestionId(question),
    type: "followUpQuestion",
    projectAmmoId,
    question,
    questionType,
    riskLevel,
    answerDraft: String(input.answerDraft ?? existing.answerDraft ?? ""),
    stableAnswer: String(input.stableAnswer ?? existing.stableAnswer ?? ""),
    evidence: String(input.evidence ?? existing.evidence ?? ""),
    status,
    linkedWeaknessIds: unique([
      ...asArray(existing.linkedWeaknessIds),
      ...asArray(input.linkedWeaknessIds),
      ...asArray(input.linkedWeaknessId),
    ]),
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizeExpressionDrill(input, existing = {}) {
  const now = new Date().toISOString();
  const sourceType = EXPRESSION_DRILL_SOURCE_TYPES.has(input.sourceType)
    ? input.sourceType
    : existing.sourceType || "follow_up_question";
  const sourceId = String(input.sourceId ?? existing.sourceId ?? "").trim();
  const question = String(input.question ?? existing.question ?? "").trim();

  if (!sourceId) {
    throw new Error("sourceId is required");
  }
  if (!question) {
    throw new Error("question is required");
  }

  const score = EXPRESSION_DRILL_SCORES.has(input.score) ? input.score : existing.score || "unstable";
  const status = EXPRESSION_DRILL_STATUSES.has(input.status) ? input.status : existing.status || "todo";

  return {
    id: existing.id || input.id || createExpressionDrillId(question),
    type: "expressionDrill",
    sourceType,
    sourceId,
    question,
    targetAnswer: String(input.targetAnswer ?? existing.targetAnswer ?? ""),
    practiceRecord: String(input.practiceRecord ?? existing.practiceRecord ?? ""),
    score,
    status,
    nextAction: String(input.nextAction ?? existing.nextAction ?? "").trim(),
    linkedTrainingTaskId: String(input.linkedTrainingTaskId ?? existing.linkedTrainingTaskId ?? "").trim(),
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizeExpressionSession(input, existing = {}, drill) {
  const now = new Date().toISOString();
  const drillId = String(input.drillId ?? existing.drillId ?? drill?.id ?? "").trim();
  const question = String(input.question ?? existing.question ?? drill?.question ?? "").trim();
  const attemptType = EXPRESSION_SESSION_ATTEMPT_TYPES.has(input.attemptType)
    ? input.attemptType
    : existing.attemptType || "read_aloud";
  const selfRating = EXPRESSION_DRILL_SCORES.has(input.selfRating)
    ? input.selfRating
    : existing.selfRating || "unstable";
  const status = EXPRESSION_SESSION_STATUSES.has(input.status) ? input.status : existing.status || "draft";

  if (!drillId) {
    throw new Error("drillId is required");
  }
  if (!question) {
    throw new Error("question is required");
  }

  return {
    id: existing.id || input.id || createExpressionSessionId(question),
    type: "expressionSession",
    drillId,
    question,
    practicedAt: String(input.practicedAt ?? existing.practicedAt ?? "").trim(),
    attemptType,
    durationMinutes: String(input.durationMinutes ?? existing.durationMinutes ?? "").trim(),
    selfRating,
    blockers: String(input.blockers ?? existing.blockers ?? ""),
    improvedAnswer: String(input.improvedAnswer ?? existing.improvedAnswer ?? ""),
    reviewerNote: String(input.reviewerNote ?? existing.reviewerNote ?? ""),
    stabilityEvidence: String(input.stabilityEvidence ?? existing.stabilityEvidence ?? ""),
    nextAction: String(input.nextAction ?? existing.nextAction ?? "").trim(),
    status,
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizePortfolioProfile(input = {}, existing = {}, options = {}) {
  const now = new Date().toISOString();
  const portfolioStatus = PORTFOLIO_STATUSES.has(input.portfolioStatus)
    ? input.portfolioStatus
    : existing.portfolioStatus || "draft";
  const updatedAt = options.touch === false ? existing.updatedAt || input.updatedAt || now : now;

  return {
    id: PORTFOLIO_PROFILE_ID,
    type: "portfolioProfile",
    displayName: String(input.displayName ?? existing.displayName ?? "").trim(),
    headline: String(input.headline ?? existing.headline ?? "").trim(),
    targetRole: String(input.targetRole ?? existing.targetRole ?? "").trim(),
    location: String(input.location ?? existing.location ?? "").trim(),
    summary: String(input.summary ?? existing.summary ?? ""),
    coreSkills: String(input.coreSkills ?? existing.coreSkills ?? ""),
    contactNote: String(input.contactNote ?? existing.contactNote ?? ""),
    portfolioStatus,
    publishChecklist: String(input.publishChecklist ?? existing.publishChecklist ?? ""),
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt,
  };
}

function normalizePortfolioProject(input, existing = {}, projectAmmo) {
  const now = new Date().toISOString();
  const projectAmmoId = String(input.projectAmmoId ?? existing.projectAmmoId ?? projectAmmo?.id ?? "").trim();
  const projectName = String(
    input.projectName ?? existing.projectName ?? projectAmmo?.projectName ?? "",
  ).trim();
  const displayTitle = String(
    input.displayTitle ?? existing.displayTitle ?? projectAmmo?.projectName ?? projectName,
  ).trim();

  if (!projectName) {
    throw new Error("projectName is required");
  }
  if (!displayTitle) {
    throw new Error("displayTitle is required");
  }

  const visibility = PORTFOLIO_VISIBILITIES.has(input.visibility)
    ? input.visibility
    : existing.visibility || "private";
  const readiness = PORTFOLIO_READINESS.has(input.readiness)
    ? input.readiness
    : existing.readiness || "draft";

  return {
    id: existing.id || input.id || createPortfolioProjectId(displayTitle),
    type: "portfolioProject",
    projectAmmoId,
    projectName,
    displayTitle,
    subtitle: String(input.subtitle ?? existing.subtitle ?? projectAmmo?.aiRelevance ?? "").trim(),
    summary: String(input.summary ?? existing.summary ?? projectAmmo?.result ?? ""),
    role: String(input.role ?? existing.role ?? projectAmmo?.role ?? "").trim(),
    period: String(input.period ?? existing.period ?? projectAmmo?.period ?? "").trim(),
    problem: String(input.problem ?? existing.problem ?? projectAmmo?.background ?? ""),
    solution: String(input.solution ?? existing.solution ?? projectAmmo?.actions ?? ""),
    impact: String(input.impact ?? existing.impact ?? projectAmmo?.result ?? ""),
    metrics: String(input.metrics ?? existing.metrics ?? projectAmmo?.metrics ?? ""),
    skills: String(input.skills ?? existing.skills ?? projectAmmo?.pmCompetencies ?? ""),
    evidence: String(input.evidence ?? existing.evidence ?? projectAmmo?.evidence ?? ""),
    privacyNote: String(input.privacyNote ?? existing.privacyNote ?? ""),
    sortOrder: Number(input.sortOrder ?? existing.sortOrder ?? 100) || 100,
    visibility,
    readiness,
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizeAiAnalysisNote(input, existing = {}) {
  const now = new Date().toISOString();
  const analysisType = AI_ANALYSIS_TYPES.has(input.analysisType)
    ? input.analysisType
    : existing.analysisType || "other";
  const sourceType = AI_ANALYSIS_SOURCE_TYPES.has(input.sourceType)
    ? input.sourceType
    : existing.sourceType || "freeform";
  const sourceId = String(input.sourceId ?? existing.sourceId ?? "").trim();
  const sourceTitle = String(input.sourceTitle ?? existing.sourceTitle ?? "").trim();
  const title = String(input.title ?? existing.title ?? sourceTitle ?? "").trim();
  const status = AI_ANALYSIS_STATUSES.has(input.status) ? input.status : existing.status || "prompt_ready";
  const aiRunStatus = AI_RUN_STATUSES.has(input.aiRunStatus)
    ? input.aiRunStatus
    : existing.aiRunStatus || "not_run";

  if (!title) {
    throw new Error("title is required");
  }

  return {
    id: existing.id || input.id || createAiAnalysisNoteId(title),
    type: "aiAnalysisNote",
    analysisType,
    sourceType,
    sourceId,
    sourceTitle,
    title,
    workflowRunId: String(input.workflowRunId ?? existing.workflowRunId ?? "").trim(),
    contextSnapshot: String(input.contextSnapshot ?? existing.contextSnapshot ?? ""),
    promptDraft: String(input.promptDraft ?? existing.promptDraft ?? ""),
    aiResponse: String(input.aiResponse ?? existing.aiResponse ?? ""),
    aiProvider: String(input.aiProvider ?? existing.aiProvider ?? "").trim(),
    aiModel: String(input.aiModel ?? existing.aiModel ?? "").trim(),
    aiRunStatus,
    aiLastRunAt: String(input.aiLastRunAt ?? existing.aiLastRunAt ?? "").trim(),
    aiError: String(input.aiError ?? existing.aiError ?? "").trim(),
    candidateSchemaVersion: String(input.candidateSchemaVersion ?? existing.candidateSchemaVersion ?? "").trim(),
    structuredResponse: String(input.structuredResponse ?? existing.structuredResponse ?? ""),
    analysisSummary: String(input.analysisSummary ?? existing.analysisSummary ?? ""),
    failurePointCandidates: Array.isArray(input.failurePointCandidates)
      ? input.failurePointCandidates
      : existing.failurePointCandidates || [],
    weaknessCandidates: Array.isArray(input.weaknessCandidates)
      ? input.weaknessCandidates
      : existing.weaknessCandidates || [],
    trainingTaskCandidates: Array.isArray(input.trainingTaskCandidates)
      ? input.trainingTaskCandidates
      : existing.trainingTaskCandidates || [],
    humanDecision: String(input.humanDecision ?? existing.humanDecision ?? ""),
    nextAction: String(input.nextAction ?? existing.nextAction ?? "").trim(),
    status,
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizeWorkflowRun(input, existing = {}, review = {}) {
  const now = new Date().toISOString();
  const reviewId = String(input.reviewId ?? existing.reviewId ?? review.id ?? "").trim();
  const opportunityId = String(input.opportunityId ?? existing.opportunityId ?? review.opportunityId ?? "").trim();
  const interviewRoundId = String(
    input.interviewRoundId ?? existing.interviewRoundId ?? review.interviewRoundId ?? "",
  ).trim();
  const definitionKey = WORKFLOW_DEFINITIONS.has(input.definitionKey)
    ? input.definitionKey
    : existing.definitionKey || "post_interview_repair_loop";
  const title = String(
    input.title ?? existing.title ?? `${review.companyName || "面试"} - ${review.roundName || "复盘"}修复闭环`,
  ).trim();
  const status = WORKFLOW_STATUSES.has(input.status)
    ? input.status
    : existing.status || "diagnosis_pending";
  const waitingFor = WORKFLOW_WAITING_FOR.has(input.waitingFor)
    ? input.waitingFor
    : existing.waitingFor || "ai_generation";

  if (!reviewId) throw new Error("reviewId is required");
  if (!opportunityId) throw new Error("opportunityId is required");
  if (!interviewRoundId) throw new Error("interviewRoundId is required");

  return {
    id: existing.id || input.id || createWorkflowRunId(title),
    type: "workflowRun",
    definitionKey,
    title,
    status,
    opportunityId,
    interviewRoundId,
    reviewId,
    aiAnalysisNoteId: String(input.aiAnalysisNoteId ?? existing.aiAnalysisNoteId ?? "").trim(),
    weaknessIds: unique(asArray(input.weaknessIds, existing.weaknessIds || [])),
    trainingTaskIds: unique(asArray(input.trainingTaskIds, existing.trainingTaskIds || [])),
    currentStep: String(input.currentStep ?? existing.currentStep ?? "generate_diagnosis").trim(),
    waitingFor,
    events: Array.isArray(input.events) ? input.events : existing.events || [],
    summary: String(input.summary ?? existing.summary ?? ""),
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizeAiFrontierCard(input, existing = {}) {
  const now = new Date().toISOString();
  const topic = String(input.topic ?? existing.topic ?? "").trim();
  const category = AI_FRONTIER_CATEGORIES.has(input.category)
    ? input.category
    : existing.category || "other";
  const status = AI_FRONTIER_STATUSES.has(input.status) ? input.status : existing.status || "inbox";
  const priority = PRIORITIES.has(input.priority) ? input.priority : existing.priority || "medium";

  if (!topic) {
    throw new Error("topic is required");
  }

  return {
    id: existing.id || input.id || createAiFrontierCardId(topic),
    type: "aiFrontierCard",
    topic,
    category,
    sourceName: String(input.sourceName ?? existing.sourceName ?? "").trim(),
    sourceUrl: String(input.sourceUrl ?? existing.sourceUrl ?? "").trim(),
    sourceDate: String(input.sourceDate ?? existing.sourceDate ?? "").trim(),
    summary: String(input.summary ?? existing.summary ?? ""),
    keyInsights: String(input.keyInsights ?? existing.keyInsights ?? ""),
    productImplications: String(input.productImplications ?? existing.productImplications ?? ""),
    interviewTransfer: String(input.interviewTransfer ?? existing.interviewTransfer ?? ""),
    portfolioTransfer: String(input.portfolioTransfer ?? existing.portfolioTransfer ?? ""),
    openQuestions: String(input.openQuestions ?? existing.openQuestions ?? ""),
    tags: String(input.tags ?? existing.tags ?? "").trim(),
    status,
    priority,
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizeRhythmLog(input, existing = {}) {
  const now = new Date().toISOString();
  const date = String(input.date ?? existing.date ?? new Date().toISOString().slice(0, 10)).trim();
  const title = String(input.title ?? existing.title ?? date).trim();
  const energyLevel = RHYTHM_LEVELS.has(input.energyLevel) ? input.energyLevel : existing.energyLevel || "medium";
  const focusLevel = RHYTHM_LEVELS.has(input.focusLevel) ? input.focusLevel : existing.focusLevel || "medium";
  const loadLevel = RHYTHM_LEVELS.has(input.loadLevel) ? input.loadLevel : existing.loadLevel || "medium";
  const recoveryLevel = RHYTHM_LEVELS.has(input.recoveryLevel)
    ? input.recoveryLevel
    : existing.recoveryLevel || "medium";
  const rhythmRisk = RHYTHM_LEVELS.has(input.rhythmRisk) ? input.rhythmRisk : existing.rhythmRisk || "medium";
  const status = RHYTHM_STATUSES.has(input.status) ? input.status : existing.status || "active";

  if (!title) {
    throw new Error("title is required");
  }
  if (!date) {
    throw new Error("date is required");
  }

  return {
    id: existing.id || input.id || createRhythmLogId(title, date),
    type: "rhythmLog",
    date,
    title,
    energyLevel,
    focusLevel,
    loadLevel,
    recoveryLevel,
    sleepHours: String(input.sleepHours ?? existing.sleepHours ?? "").trim(),
    interviewLoad: String(input.interviewLoad ?? existing.interviewLoad ?? "").trim(),
    trainingLoad: String(input.trainingLoad ?? existing.trainingLoad ?? "").trim(),
    plannedFocus: String(input.plannedFocus ?? existing.plannedFocus ?? ""),
    recoveryAction: String(input.recoveryAction ?? existing.recoveryAction ?? ""),
    rhythmRisk,
    nextAdjustment: String(input.nextAdjustment ?? existing.nextAdjustment ?? ""),
    notes: String(input.notes ?? existing.notes ?? ""),
    status,
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

function projectAmmoToMarkdown(ammo) {
  const frontMatter = JSON.stringify(ammo, null, 2);
  const title = markdownEscapeTitle(ammo.projectName);

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 背景\n\n${ammo.background}\n\n## 目标\n\n${ammo.goal}\n\n## 我的角色\n\n${ammo.role}\n\n## 关键动作\n\n${ammo.actions}\n\n## 结果与指标\n\n${ammo.result}\n\n${ammo.metrics}\n\n## 证据\n\n${ammo.evidence}\n\n## AI 相关性\n\n${ammo.aiRelevance}\n\n## 可证明能力\n\n${ammo.pmCompetencies}\n\n## 高风险追问\n\n${ammo.riskQuestions}\n`;
}

function followUpQuestionToMarkdown(question) {
  const frontMatter = JSON.stringify(question, null, 2);
  const title = markdownEscapeTitle(question.question || "项目追问");

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 回答草稿\n\n${question.answerDraft}\n\n## 稳定回答\n\n${question.stableAnswer}\n\n## 证据\n\n${question.evidence}\n`;
}

function expressionDrillToMarkdown(drill) {
  const frontMatter = JSON.stringify(drill, null, 2);
  const title = markdownEscapeTitle(drill.question || "表达训练");

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 问题\n\n${drill.question}\n\n## 目标回答\n\n${drill.targetAnswer}\n\n## 练习记录\n\n${drill.practiceRecord}\n\n## 下一步动作\n\n${drill.nextAction}\n`;
}

function expressionSessionToMarkdown(session) {
  const frontMatter = JSON.stringify(session, null, 2);
  const title = markdownEscapeTitle(session.question || "表达练习");

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 卡点\n\n${session.blockers}\n\n## 改进回答\n\n${session.improvedAnswer}\n\n## 复核记录\n\n${session.reviewerNote}\n\n## 稳定性证据\n\n${session.stabilityEvidence}\n\n## 下一步动作\n\n${session.nextAction}\n`;
}

function portfolioProfileToMarkdown(profile) {
  const frontMatter = JSON.stringify(profile, null, 2);

  return `---\n${frontMatter}\n---\n\n# 作品集个人资料\n\n## 个人简介\n\n${profile.summary}\n\n## 核心能力\n\n${profile.coreSkills}\n\n## 联系方式说明\n\n${profile.contactNote}\n\n## 发布检查清单\n\n${profile.publishChecklist}\n`;
}

function portfolioProjectToMarkdown(project) {
  const frontMatter = JSON.stringify(project, null, 2);
  const title = markdownEscapeTitle(project.displayTitle);

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 项目摘要\n\n${project.summary}\n\n## 问题与场景\n\n${project.problem}\n\n## 解决方案\n\n${project.solution}\n\n## 结果与影响\n\n${project.impact}\n\n## 指标\n\n${project.metrics}\n\n## 能力标签\n\n${project.skills}\n\n## 证据与风险\n\n${project.evidence}\n\n${project.privacyNote}\n`;
}

function aiAnalysisNoteToMarkdown(note) {
  const frontMatter = JSON.stringify(note, null, 2);
  const title = markdownEscapeTitle(note.title);

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 上下文快照\n\n${note.contextSnapshot}\n\n## 提示词草稿\n\n${note.promptDraft}\n\n## AI 输出\n\n${note.aiResponse}\n\n## 结构化 AI 输出\n\n${note.structuredResponse}\n\n## 人工决策\n\n${note.humanDecision}\n\n## 下一步动作\n\n${note.nextAction}\n`;
}

function aiFrontierCardToMarkdown(card) {
  const frontMatter = JSON.stringify(card, null, 2);
  const title = markdownEscapeTitle(card.topic);

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 前沿摘要\n\n${card.summary}\n\n## 关键洞察\n\n${card.keyInsights}\n\n## 产品启发\n\n${card.productImplications}\n\n## 面试迁移\n\n${card.interviewTransfer}\n\n## 作品集迁移\n\n${card.portfolioTransfer}\n\n## 开放问题\n\n${card.openQuestions}\n\n## 标签\n\n${card.tags}\n`;
}

function rhythmLogToMarkdown(log) {
  const frontMatter = JSON.stringify(log, null, 2);
  const title = markdownEscapeTitle(log.title);

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 当天重点\n\n${log.plannedFocus}\n\n## 恢复动作\n\n${log.recoveryAction}\n\n## 下一步调整\n\n${log.nextAdjustment}\n\n## 备注\n\n${log.notes}\n`;
}

function workflowRunToMarkdown(run) {
  const frontMatter = JSON.stringify(run, null, 2);
  const title = markdownEscapeTitle(run.title);
  const timeline = (run.events || [])
    .map((event) => `- ${event.at || ""} | ${event.type}${event.note ? ` | ${event.note}` : ""}`)
    .join("\n") || "- 暂无事件";

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 当前状态\n\n${run.status} / ${run.currentStep}\n\n## 时间线\n\n${timeline}\n\n## 闭环总结\n\n${run.summary}\n`;
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

async function readProjectAmmoFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readFollowUpQuestionFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readExpressionDrillFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readExpressionSessionFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readPortfolioProfileFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readPortfolioProjectFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readAiAnalysisNoteFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readAiFrontierCardFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readRhythmLogFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readWorkflowRunFile(filePath) {
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

async function listProjectAmmos(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(PROJECT_AMMOS_DIR, { withFileTypes: true });
  const ammos = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readProjectAmmoFile(path.join(PROJECT_AMMOS_DIR, entry.name));
      if (item.type === "projectAmmo") {
        ammos.push(item);
      }
    } catch (error) {
      ammos.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "projectAmmo",
        projectName: "读取失败",
        projectType: "other",
        status: "needs_deepening",
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = ammos.filter((ammo) => {
    if (filters.status && ammo.status !== filters.status) return false;
    if (filters.projectType && ammo.projectType !== filters.projectType) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const statusOrder = { needs_deepening: 0, draft: 1, usable: 2, archived: 3 };
    const statusDiff = (statusOrder[a.status] ?? 4) - (statusOrder[b.status] ?? 4);
    if (statusDiff) return statusDiff;
    return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
  });
  return filtered;
}

async function listFollowUpQuestions(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(FOLLOW_UP_QUESTIONS_DIR, { withFileTypes: true });
  const questions = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readFollowUpQuestionFile(path.join(FOLLOW_UP_QUESTIONS_DIR, entry.name));
      if (item.type === "followUpQuestion") {
        questions.push(item);
      }
    } catch (error) {
      questions.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "followUpQuestion",
        projectAmmoId: "",
        question: "读取失败",
        questionType: "other",
        riskLevel: "high",
        status: "needs_drill",
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = questions.filter((question) => {
    if (filters.projectAmmoId && question.projectAmmoId !== filters.projectAmmoId) return false;
    if (filters.status && question.status !== filters.status) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const statusOrder = { needs_drill: 0, unanswered: 1, drafted: 2, stable: 3 };
    const statusDiff = (statusOrder[a.status] ?? 4) - (statusOrder[b.status] ?? 4);
    if (statusDiff) return statusDiff;
    const riskOrder = { high: 0, medium: 1, low: 2, unknown: 3 };
    const riskDiff = (riskOrder[a.riskLevel] ?? 4) - (riskOrder[b.riskLevel] ?? 4);
    if (riskDiff) return riskDiff;
    return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
  });
  return filtered;
}

async function listExpressionDrills(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(EXPRESSION_DRILLS_DIR, { withFileTypes: true });
  const drills = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readExpressionDrillFile(path.join(EXPRESSION_DRILLS_DIR, entry.name));
      if (item.type === "expressionDrill") {
        drills.push(item);
      }
    } catch (error) {
      drills.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "expressionDrill",
        sourceType: "follow_up_question",
        sourceId: "",
        question: "读取失败",
        score: "unstable",
        status: "todo",
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = drills.filter((drill) => {
    if (filters.sourceType && drill.sourceType !== filters.sourceType) return false;
    if (filters.sourceId && drill.sourceId !== filters.sourceId) return false;
    if (filters.status && drill.status !== filters.status) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const statusOrder = { todo: 0, practicing: 1, reviewing: 2, stable: 3, archived: 4 };
    const statusDiff = (statusOrder[a.status] ?? 5) - (statusOrder[b.status] ?? 5);
    if (statusDiff) return statusDiff;
    const scoreOrder = { unstable: 0, usable: 1, stable: 2 };
    const scoreDiff = (scoreOrder[a.score] ?? 3) - (scoreOrder[b.score] ?? 3);
    if (scoreDiff) return scoreDiff;
    return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
  });
  return filtered;
}

async function listExpressionSessions(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(EXPRESSION_SESSIONS_DIR, { withFileTypes: true });
  const sessions = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readExpressionSessionFile(path.join(EXPRESSION_SESSIONS_DIR, entry.name));
      if (item.type === "expressionSession") {
        sessions.push(item);
      }
    } catch (error) {
      sessions.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "expressionSession",
        drillId: "",
        question: "读取失败",
        selfRating: "unstable",
        status: "draft",
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = sessions.filter((session) => {
    if (filters.drillId && session.drillId !== filters.drillId) return false;
    if (filters.status && session.status !== filters.status) return false;
    if (filters.selfRating && session.selfRating !== filters.selfRating) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const statusOrder = { needs_rework: 0, practiced: 1, draft: 2, stable: 3, archived: 4 };
    const statusDiff = (statusOrder[a.status] ?? 5) - (statusOrder[b.status] ?? 5);
    if (statusDiff) return statusDiff;
    return String(b.practicedAt || b.updatedAt || "").localeCompare(String(a.practicedAt || a.updatedAt || ""));
  });
  return filtered;
}

async function getPortfolioProfile() {
  await ensureContentDirs();
  try {
    const existing = await readPortfolioProfileFile(portfolioProfilePath());
    return normalizePortfolioProfile({}, existing, { touch: false });
  } catch (error) {
    if (error.code === "ENOENT") return normalizePortfolioProfile({}, {}, { touch: false });
    throw error;
  }
}

async function listPortfolioProjects(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(PORTFOLIO_PROJECTS_DIR, { withFileTypes: true });
  const projects = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readPortfolioProjectFile(path.join(PORTFOLIO_PROJECTS_DIR, entry.name));
      if (item.type === "portfolioProject") {
        projects.push(item);
      }
    } catch (error) {
      projects.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "portfolioProject",
        projectName: "读取失败",
        displayTitle: "读取失败",
        visibility: "private",
        readiness: "needs_evidence",
        sortOrder: 999,
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = projects.filter((project) => {
    if (filters.visibility && project.visibility !== filters.visibility) return false;
    if (filters.readiness && project.readiness !== filters.readiness) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const orderDiff = (Number(a.sortOrder) || 100) - (Number(b.sortOrder) || 100);
    if (orderDiff) return orderDiff;
    return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
  });
  return filtered;
}

async function listAiAnalysisNotes(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(AI_ANALYSIS_NOTES_DIR, { withFileTypes: true });
  const notes = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readAiAnalysisNoteFile(path.join(AI_ANALYSIS_NOTES_DIR, entry.name));
      if (item.type === "aiAnalysisNote") {
        notes.push(item);
      }
    } catch (error) {
      notes.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "aiAnalysisNote",
        title: "读取失败",
        analysisType: "other",
        sourceType: "freeform",
        status: "draft",
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = notes.filter((note) => {
    if (filters.analysisType && note.analysisType !== filters.analysisType) return false;
    if (filters.sourceType && note.sourceType !== filters.sourceType) return false;
    if (filters.status && note.status !== filters.status) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const statusOrder = { ai_responded: 0, prompt_ready: 1, draft: 2, decided: 3, archived: 4 };
    const statusDiff = (statusOrder[a.status] ?? 5) - (statusOrder[b.status] ?? 5);
    if (statusDiff) return statusDiff;
    return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
  });
  return filtered;
}

async function listAiFrontierCards(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(AI_FRONTIER_CARDS_DIR, { withFileTypes: true });
  const cards = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readAiFrontierCardFile(path.join(AI_FRONTIER_CARDS_DIR, entry.name));
      if (item.type === "aiFrontierCard") {
        cards.push(item);
      }
    } catch (error) {
      cards.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "aiFrontierCard",
        topic: "读取失败",
        category: "other",
        status: "inbox",
        priority: "medium",
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = cards.filter((card) => {
    if (filters.category && card.category !== filters.category) return false;
    if (filters.status && card.status !== filters.status) return false;
    if (filters.priority && card.priority !== filters.priority) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const statusOrder = { inbox: 0, summarized: 1, mapped: 2, applied: 3, archived: 4 };
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const statusDiff = (statusOrder[a.status] ?? 5) - (statusOrder[b.status] ?? 5);
    if (statusDiff) return statusDiff;
    const priorityDiff = (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3);
    if (priorityDiff) return priorityDiff;
    return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
  });
  return filtered;
}

async function listRhythmLogs(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(RHYTHM_LOGS_DIR, { withFileTypes: true });
  const logs = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readRhythmLogFile(path.join(RHYTHM_LOGS_DIR, entry.name));
      if (item.type === "rhythmLog") {
        logs.push(item);
      }
    } catch (error) {
      logs.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "rhythmLog",
        title: "读取失败",
        date: "",
        energyLevel: "medium",
        loadLevel: "medium",
        rhythmRisk: "medium",
        status: "active",
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = logs.filter((log) => {
    if (filters.status && log.status !== filters.status) return false;
    if (filters.rhythmRisk && log.rhythmRisk !== filters.rhythmRisk) return false;
    if (filters.date && log.date !== filters.date) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const statusOrder = { recovery_needed: 0, active: 1, planned: 2, closed: 3, archived: 4 };
    const riskOrder = { high: 0, medium: 1, low: 2 };
    const statusDiff = (statusOrder[a.status] ?? 5) - (statusOrder[b.status] ?? 5);
    if (statusDiff) return statusDiff;
    const riskDiff = (riskOrder[a.rhythmRisk] ?? 3) - (riskOrder[b.rhythmRisk] ?? 3);
    if (riskDiff) return riskDiff;
    return String(b.date || b.updatedAt || "").localeCompare(String(a.date || a.updatedAt || ""));
  });
  return filtered;
}

async function listWorkflowRuns(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(WORKFLOW_RUNS_DIR, { withFileTypes: true });
  const runs = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readWorkflowRunFile(path.join(WORKFLOW_RUNS_DIR, entry.name));
      if (item.type === "workflowRun") {
        runs.push(item);
      }
    } catch (error) {
      runs.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "workflowRun",
        title: "读取失败",
        status: "paused",
        reviewId: "",
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = runs.filter((run) => {
    if (filters.status && run.status !== filters.status) return false;
    if (filters.reviewId && run.reviewId !== filters.reviewId) return false;
    if (filters.definitionKey && run.definitionKey !== filters.definitionKey) return false;
    return true;
  });

  filtered.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
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

async function getProjectAmmo(id) {
  const filePath = projectAmmoPath(id);
  if (!filePath) return null;

  try {
    return await readProjectAmmoFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getFollowUpQuestion(id) {
  const filePath = followUpQuestionPath(id);
  if (!filePath) return null;

  try {
    return await readFollowUpQuestionFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getExpressionDrill(id) {
  const filePath = expressionDrillPath(id);
  if (!filePath) return null;

  try {
    return await readExpressionDrillFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getExpressionSession(id) {
  const filePath = expressionSessionPath(id);
  if (!filePath) return null;

  try {
    return await readExpressionSessionFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getPortfolioProject(id) {
  const filePath = portfolioProjectPath(id);
  if (!filePath) return null;

  try {
    return await readPortfolioProjectFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getAiAnalysisNote(id) {
  const filePath = aiAnalysisNotePath(id);
  if (!filePath) return null;

  try {
    return await readAiAnalysisNoteFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getAiFrontierCard(id) {
  const filePath = aiFrontierCardPath(id);
  if (!filePath) return null;

  try {
    return await readAiFrontierCardFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getRhythmLog(id) {
  const filePath = rhythmLogPath(id);
  if (!filePath) return null;

  try {
    return await readRhythmLogFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getWorkflowRun(id) {
  const filePath = workflowRunPath(id);
  if (!filePath) return null;

  try {
    return await readWorkflowRunFile(filePath);
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

async function saveProjectAmmo(ammo) {
  await ensureContentDirs();
  const filePath = projectAmmoPath(ammo.id);
  if (!filePath) {
    throw new Error("Invalid project ammo id");
  }
  await writeFile(filePath, projectAmmoToMarkdown(ammo), "utf8");
  return ammo;
}

async function saveFollowUpQuestion(question) {
  await ensureContentDirs();
  const filePath = followUpQuestionPath(question.id);
  if (!filePath) {
    throw new Error("Invalid follow-up question id");
  }
  await writeFile(filePath, followUpQuestionToMarkdown(question), "utf8");
  return question;
}

async function saveExpressionDrill(drill) {
  await ensureContentDirs();
  const filePath = expressionDrillPath(drill.id);
  if (!filePath) {
    throw new Error("Invalid expression drill id");
  }
  await writeFile(filePath, expressionDrillToMarkdown(drill), "utf8");
  return drill;
}

async function saveExpressionSession(session) {
  await ensureContentDirs();
  const filePath = expressionSessionPath(session.id);
  if (!filePath) {
    throw new Error("Invalid expression session id");
  }
  await writeFile(filePath, expressionSessionToMarkdown(session), "utf8");
  return session;
}

async function savePortfolioProfile(profile) {
  await ensureContentDirs();
  await writeFile(portfolioProfilePath(), portfolioProfileToMarkdown(profile), "utf8");
  return profile;
}

async function savePortfolioProject(project) {
  await ensureContentDirs();
  const filePath = portfolioProjectPath(project.id);
  if (!filePath) {
    throw new Error("Invalid portfolio project id");
  }
  await writeFile(filePath, portfolioProjectToMarkdown(project), "utf8");
  return project;
}

async function saveAiAnalysisNote(note) {
  await ensureContentDirs();
  const filePath = aiAnalysisNotePath(note.id);
  if (!filePath) {
    throw new Error("Invalid AI analysis note id");
  }
  await writeFile(filePath, aiAnalysisNoteToMarkdown(note), "utf8");
  return note;
}

async function saveAiFrontierCard(card) {
  await ensureContentDirs();
  const filePath = aiFrontierCardPath(card.id);
  if (!filePath) {
    throw new Error("Invalid AI frontier card id");
  }
  await writeFile(filePath, aiFrontierCardToMarkdown(card), "utf8");
  return card;
}

async function saveRhythmLog(log) {
  await ensureContentDirs();
  const filePath = rhythmLogPath(log.id);
  if (!filePath) {
    throw new Error("Invalid rhythm log id");
  }
  await writeFile(filePath, rhythmLogToMarkdown(log), "utf8");
  return log;
}

async function saveWorkflowRun(run) {
  await ensureContentDirs();
  const filePath = workflowRunPath(run.id);
  if (!filePath) {
    throw new Error("Invalid workflow run id");
  }
  await writeFile(filePath, workflowRunToMarkdown(run), "utf8");
  return run;
}

const storage = {
  listOpportunities,
  listInterviews,
  listBriefs,
  listReviews,
  listWeaknesses,
  listTrainingTasks,
  listProjectAmmos,
  listFollowUpQuestions,
  listExpressionDrills,
  listExpressionSessions,
  getPortfolioProfile,
  listPortfolioProjects,
  listAiAnalysisNotes,
  listAiFrontierCards,
  listRhythmLogs,
  listWorkflowRuns,
  getOpportunity,
  getInterview,
  getBrief,
  getReview,
  getWeakness,
  getTrainingTask,
  getProjectAmmo,
  getFollowUpQuestion,
  getExpressionDrill,
  getExpressionSession,
  getPortfolioProject,
  getAiAnalysisNote,
  getAiFrontierCard,
  getRhythmLog,
  getWorkflowRun,
  saveOpportunity,
  saveInterview,
  saveBrief,
  saveReview,
  saveWeakness,
  saveTrainingTask,
  saveProjectAmmo,
  saveFollowUpQuestion,
  saveExpressionDrill,
  saveExpressionSession,
  savePortfolioProfile,
  savePortfolioProject,
  saveAiAnalysisNote,
  saveAiFrontierCard,
  saveRhythmLog,
  saveWorkflowRun,
};

function ruleDateBucket(value) {
  if (!value) return "none";
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return "none";
  const due = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((due.getTime() - today.getTime()) / 86400000);
  if (days < 0) return "overdue";
  if (days === 0) return "today";
  if (days <= 7) return "soon";
  return "future";
}

function dispatchPriorityFromDue(defaultPriority, dueAt) {
  const bucket = ruleDateBucket(dueAt);
  if (bucket === "overdue" || bucket === "today") return "critical";
  if (bucket === "soon" && defaultPriority === "medium") return "high";
  return defaultPriority;
}

function createDispatchItem(seed) {
  return {
    id: seed.id,
    type: seed.type,
    title: seed.title || "未命名事项",
    meta: seed.meta || "",
    module: seed.module,
    targetId: seed.targetId || "",
    priority: dispatchPriorityFromDue(seed.priority || "medium", seed.dueAt),
    dueAt: seed.dueAt || "",
    reason: seed.reason || "",
    actionLabel: seed.actionLabel || "处理",
  };
}

function buildDispatchQueue(data) {
  const items = [];
  const reviewedInterviewIds = new Set(data.reviews.map((review) => review.interviewRoundId));
  const existingPortfolioProjectAmmoIds = new Set(
    data.portfolioProjects.map((project) => project.projectAmmoId).filter(Boolean),
  );

  data.interviews
    .filter((item) => !["completed", "reviewed", "cancelled"].includes(item.status))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `interview-prep-${item.id}`,
          type: "interview-prep",
          title: `${item.companyName} · ${item.roundName}`,
          meta: `${item.roleTitle} · ${item.roundType}`,
          module: "preInterview",
          targetId: item.id,
          dueAt: item.scheduledAt,
          priority: item.preparationStatus === "needs_rework" ? "high" : "medium",
          reason: `准备状态：${item.preparationStatus}`,
          actionLabel: "进入作战室",
        }),
      );
    });

  data.interviews
    .filter((item) => item.status === "completed" && !reviewedInterviewIds.has(item.id))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `interview-review-${item.id}`,
          type: "interview-review",
          title: `${item.companyName} · ${item.roundName}`,
          meta: `${item.roleTitle} · 面试后复盘`,
          module: "postInterview",
          targetId: item.id,
          priority: "critical",
          reason: "已完成面试但还没有复盘记录",
          actionLabel: "去复盘",
        }),
      );
    });

  data.opportunities
    .filter((item) => item.riskLevel === "high")
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `opportunity-risk-${item.id}`,
          type: "opportunity-risk",
          title: `${item.companyName} · ${item.roleTitle}`,
          meta: `阶段：${item.stage}`,
          module: "pipeline",
          targetId: item.id,
          priority: "critical",
          reason: "岗位风险等级为高",
          actionLabel: "查看岗位",
        }),
      );
    });

  data.opportunities
    .filter((item) => item.nextAction)
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `opportunity-action-${item.id}`,
          type: "opportunity-action",
          title: `${item.companyName} · ${item.roleTitle}`,
          meta: item.nextAction,
          module: "pipeline",
          targetId: item.id,
          dueAt: item.nextActionDueAt,
          priority: item.priority === "high" ? "high" : "medium",
          reason: "Pipeline 中有下一步动作",
          actionLabel: "推进岗位",
        }),
      );
    });

  data.weaknesses
    .filter((item) => ["open", "training", "validating"].includes(item.status))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `weakness-${item.id}`,
          type: "weakness",
          title: item.title,
          meta: item.category,
          module: "weakness",
          targetId: item.id,
          priority: item.severity === "high" ? "high" : "medium",
          reason: `缺陷状态：${item.status}`,
          actionLabel: "修复缺陷",
        }),
      );
    });

  data.trainingTasks
    .filter((item) => ["todo", "doing", "reviewing"].includes(item.status))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `training-task-${item.id}`,
          type: "training-task",
          title: item.title,
          meta: item.taskType,
          module: "trainingTask",
          targetId: item.id,
          dueAt: item.dueAt,
          priority: item.status === "reviewing" ? "high" : "medium",
          reason: `训练状态：${item.status}`,
          actionLabel: "处理训练",
        }),
      );
    });

  data.projectAmmos
    .filter((item) => item.status === "needs_deepening" || (item.status === "usable" && !existingPortfolioProjectAmmoIds.has(item.id)))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `project-ammo-${item.id}`,
          type: "project-ammo",
          title: item.projectName,
          meta: item.projectType,
          module: "projectAmmo",
          targetId: item.id,
          priority: item.status === "needs_deepening" ? "high" : "low",
          reason: item.status === "needs_deepening" ? "项目弹药需要继续深挖" : "可生成作品集项目卡",
          actionLabel: "查看项目",
        }),
      );
    });

  data.followUpQuestions
    .filter((item) => ["needs_drill", "unanswered", "drafted"].includes(item.status))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `follow-up-${item.id}`,
          type: "follow-up",
          title: item.question,
          meta: item.questionType,
          module: "followUpQuestion",
          targetId: item.id,
          priority: item.status === "needs_drill" ? "high" : "medium",
          reason: `追问状态：${item.status}`,
          actionLabel: "稳定回答",
        }),
      );
    });

  data.expressionDrills
    .filter((item) => ["todo", "practicing", "reviewing"].includes(item.status) || item.score !== "stable")
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `expression-drill-${item.id}`,
          type: "expression-drill",
          title: item.question,
          meta: item.sourceType,
          module: "expressionDrill",
          targetId: item.id,
          priority: item.score === "unstable" ? "high" : "medium",
          reason: `表达评分：${item.score}`,
          actionLabel: "继续训练",
        }),
      );
    });

  data.expressionSessions
    .filter((item) => item.status === "needs_rework" || (item.nextAction && item.status !== "stable"))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `expression-session-${item.id}`,
          type: "expression-session",
          title: item.question,
          meta: `${item.attemptType} · ${item.selfRating}`,
          module: "expressionSession",
          targetId: item.id,
          priority: item.status === "needs_rework" ? "high" : "medium",
          reason: item.nextAction || "练习记录需要返工",
          actionLabel: "复盘练习",
        }),
      );
    });

  data.portfolioProjects
    .filter((item) => item.visibility === "portfolio" && item.readiness !== "ready")
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `portfolio-project-${item.id}`,
          type: "portfolio-project",
          title: item.displayTitle,
          meta: item.readiness,
          module: "portfolio",
          targetId: item.id,
          priority: item.readiness === "needs_sanitizing" ? "high" : "medium",
          reason: "作品集项目已进入展示区但还没准备好",
          actionLabel: "整理作品集",
        }),
      );
    });

  data.aiAnalysisNotes
    .filter((item) => item.status === "ai_responded")
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `ai-analysis-${item.id}`,
          type: "ai-analysis",
          title: item.title,
          meta: item.analysisType,
          module: "aiAnalysis",
          targetId: item.id,
          priority: "critical",
          reason: "AI 输出已粘贴，等待人工决策",
          actionLabel: "做决策",
        }),
      );
    });

  data.aiFrontierCards
    .filter((item) =>
      item.status === "inbox" ||
      (item.status === "summarized" && !String(item.interviewTransfer || "").trim()) ||
      (item.priority === "high" && !["mapped", "applied", "archived"].includes(item.status)),
    )
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `ai-frontier-${item.id}`,
          type: "ai-frontier",
          title: item.topic,
          meta: item.category,
          module: "aiFrontier",
          targetId: item.id,
          priority: item.priority === "high" || item.status === "inbox" ? "high" : "medium",
          reason: item.status === "summarized" ? "已总结，等待面试迁移" : `前沿卡片状态：${item.status}`,
          actionLabel: "消化前沿",
        }),
      );
    });

  data.rhythmLogs
    .filter((item) =>
      item.status === "recovery_needed" ||
      (item.loadLevel === "high" && item.energyLevel === "low") ||
      (item.nextAdjustment && !["closed", "archived"].includes(item.status)),
    )
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `rhythm-${item.id}`,
          type: "rhythm",
          title: item.title,
          meta: `${item.date} · 负荷 ${item.loadLevel} · 精力 ${item.energyLevel}`,
          module: "rhythm",
          targetId: item.id,
          priority: item.status === "recovery_needed" || item.rhythmRisk === "high" ? "critical" : "high",
          reason: item.status === "recovery_needed" ? "当前节奏需要恢复" : item.nextAdjustment || "高负荷且低精力",
          actionLabel: "调整节奏",
        }),
      );
    });

  data.workflowRuns
    .filter((item) => !["completed", "paused"].includes(item.status))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `workflow-${item.id}`,
          type: "workflow",
          title: item.title,
          meta: item.status,
          module: "workflow",
          targetId: item.id,
          priority: item.status === "candidate_confirmation" ? "critical" : "high",
          reason: `流程等待：${item.waitingFor}`,
          actionLabel: "查看流程",
        }),
      );
    });

  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return items.sort((a, b) => {
    const priorityDiff = (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9);
    if (priorityDiff) return priorityDiff;
    const bucketOrder = { overdue: 0, today: 1, soon: 2, later: 3, none: 4 };
    const dueDiff = (bucketOrder[ruleDateBucket(a.dueAt)] ?? 4) - (bucketOrder[ruleDateBucket(b.dueAt)] ?? 4);
    if (dueDiff) return dueDiff;
    return String(a.title).localeCompare(String(b.title));
  });
}

function buildDispatchMetrics(queue) {
  return {
    total: queue.length,
    critical: queue.filter((item) => item.priority === "critical").length,
    dueNow: queue.filter((item) => ["overdue", "today"].includes(ruleDateBucket(item.dueAt))).length,
    decisions: queue.filter((item) => item.type === "ai-analysis" || item.type === "interview-review").length,
  };
}

async function readSystemData() {
  const [
    opportunities,
    interviews,
    briefs,
    reviews,
    weaknesses,
    trainingTasks,
    projectAmmos,
    followUpQuestions,
    expressionDrills,
    expressionSessions,
    portfolioProfile,
    portfolioProjects,
    aiAnalysisNotes,
    aiFrontierCards,
    rhythmLogs,
    workflowRuns,
  ] = await Promise.all([
    storage.listOpportunities(),
    storage.listInterviews(),
    storage.listBriefs(),
    storage.listReviews(),
    storage.listWeaknesses(),
    storage.listTrainingTasks(),
    storage.listProjectAmmos(),
    storage.listFollowUpQuestions(),
    storage.listExpressionDrills(),
    storage.listExpressionSessions(),
    storage.getPortfolioProfile(),
    storage.listPortfolioProjects(),
    storage.listAiAnalysisNotes(),
    storage.listAiFrontierCards(),
    storage.listRhythmLogs(),
    storage.listWorkflowRuns(),
  ]);

  return {
    opportunities,
    interviews,
    briefs,
    reviews,
    weaknesses,
    trainingTasks,
    projectAmmos,
    followUpQuestions,
    expressionDrills,
    expressionSessions,
    portfolioProfile,
    portfolioProjects,
    aiAnalysisNotes,
    aiFrontierCards,
    rhythmLogs,
    workflowRuns,
  };
}

function buildSystemSnapshot(data) {
  const activeOpportunities = data.opportunities.filter(
    (item) => !["rejected", "offer", "paused"].includes(item.stage),
  );
  const reviewedInterviewIds = new Set(data.reviews.map((review) => review.interviewRoundId));
  const dispatchQueue = buildDispatchQueue(data);
  const portfolioReady = data.portfolioProjects.filter((project) => project.readiness === "ready").length;

  return {
    generatedAt: new Date().toISOString(),
    dispatchQueue,
    dispatchMetrics: buildDispatchMetrics(dispatchQueue),
    pipelineMetrics: {
      total: data.opportunities.length,
      active: activeOpportunities.length,
      withNextAction: data.opportunities.filter((item) => item.nextAction).length,
      highRisk: data.opportunities.filter((item) => item.riskLevel === "high").length,
    },
    interviewMetrics: {
      total: data.interviews.length,
      needsPrep: data.interviews.filter((item) =>
        ["not_started", "drafting", "needs_rework"].includes(item.preparationStatus),
      ).length,
      open: data.interviews.filter((item) => !["completed", "reviewed", "cancelled"].includes(item.status)).length,
    },
    reviewMetrics: {
      total: data.reviews.length,
      needsReview: data.interviews.filter((item) => item.status === "completed" && !reviewedInterviewIds.has(item.id)).length,
      needsFollowup: data.reviews.filter((item) => item.status === "needs_followup").length,
    },
    weaknessMetrics: {
      total: data.weaknesses.length,
      open: data.weaknesses.filter((item) => item.status === "open").length,
      training: data.weaknesses.filter((item) => item.status === "training").length,
      high: data.weaknesses.filter((item) => item.severity === "high").length,
    },
    trainingTaskMetrics: {
      total: data.trainingTasks.length,
      active: data.trainingTasks.filter((item) => ["todo", "doing", "reviewing"].includes(item.status)).length,
      reviewing: data.trainingTasks.filter((item) => item.status === "reviewing").length,
      validated: data.trainingTasks.filter((item) => item.status === "validated").length,
    },
    portfolioMetrics: {
      total: data.portfolioProjects.length,
      visible: data.portfolioProjects.filter((item) => item.visibility === "portfolio").length,
      ready: portfolioReady,
      needsWork: data.portfolioProjects.length - portfolioReady,
      portfolioStatus: data.portfolioProfile.portfolioStatus,
    },
    rhythmMetrics: {
      total: data.rhythmLogs.length,
      recoveryNeeded: data.rhythmLogs.filter((item) => item.status === "recovery_needed").length,
      highRisk: data.rhythmLogs.filter((item) => item.rhythmRisk === "high").length,
    },
    workflowMetrics: {
      total: data.workflowRuns.length,
      active: data.workflowRuns.filter((item) => !["completed", "paused"].includes(item.status)).length,
      waitingApproval: data.workflowRuns.filter((item) => item.status === "candidate_confirmation").length,
      validationPending: data.workflowRuns.filter((item) => item.status === "validation_pending").length,
    },
  };
}

async function systemSnapshot() {
  return buildSystemSnapshot(await readSystemData());
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

function workflowEvent(type, sourceId = "", note = "") {
  return {
    type,
    at: new Date().toISOString(),
    sourceId: String(sourceId || ""),
    note: String(note || ""),
  };
}

function appendWorkflowEvent(run, event) {
  const events = [...(run.events || [])];
  if (event.sourceId && events.some((item) => item.type === event.type && item.sourceId === event.sourceId)) {
    return events;
  }
  events.push(event);
  return events;
}

function workflowProgressFromRecords(run, aiNote, tasks) {
  if (run.status === "paused" || run.status === "completed") {
    return { status: run.status, currentStep: run.currentStep, waitingFor: run.waitingFor };
  }
  if (tasks.length) {
    if (tasks.every((task) => task.status === "validated")) {
      return { status: "validation_pending", currentStep: "verify_in_interview", waitingFor: "validation" };
    }
    if (tasks.some((task) => ["doing", "reviewing", "done"].includes(task.status))) {
      return { status: "training_in_progress", currentStep: "execute_training", waitingFor: "training" };
    }
    return { status: "training_pending", currentStep: "start_training", waitingFor: "training" };
  }
  const hasCandidates = (aiNote?.weaknessCandidates || []).length || (aiNote?.trainingTaskCandidates || []).length;
  if (hasCandidates) {
    return { status: "candidate_confirmation", currentStep: "confirm_candidates", waitingFor: "human_action" };
  }
  return { status: "diagnosis_pending", currentStep: "generate_diagnosis", waitingFor: "ai_generation" };
}

async function refreshWorkflowRun(run, event = null, { forceProgress = false } = {}) {
  const [analysisNotes, weaknesses, tasks] = await Promise.all([
    storage.listAiAnalysisNotes({ analysisType: "review_diagnosis", sourceType: "interview_review" }),
    storage.listWeaknesses(),
    storage.listTrainingTasks(),
  ]);
  const aiNote = analysisNotes.find((note) => note.id === run.aiAnalysisNoteId)
    || analysisNotes.find((note) => note.workflowRunId === run.id)
    || analysisNotes.find((note) => note.sourceId === run.reviewId)
    || null;
  const relatedWeaknesses = weaknesses.filter((weakness) => (weakness.relatedReviewIds || []).includes(run.reviewId));
  const weaknessIds = relatedWeaknesses.map((weakness) => weakness.id);
  const relatedTasks = tasks.filter(
    (task) => task.status !== "cancelled" && (task.relatedReviewId === run.reviewId || weaknessIds.includes(task.weaknessId)),
  );
  const statusSeed = forceProgress && ["paused", "completed"].includes(run.status)
    ? { ...run, status: "diagnosis_pending" }
    : run;
  const progress = workflowProgressFromRecords(statusSeed, aiNote, relatedTasks);
  let events = run.events || [];
  if (event) {
    events = appendWorkflowEvent(run, event);
  }
  if (progress.status !== run.status && !["paused", "completed"].includes(progress.status)) {
    events = appendWorkflowEvent(
      { ...run, events },
      workflowEvent("status_changed", progress.status, `流程进入 ${progress.status}`),
    );
  }
  const nextRun = normalizeWorkflowRun(
    {
      ...run,
      ...progress,
      aiAnalysisNoteId: aiNote?.id || run.aiAnalysisNoteId,
      weaknessIds,
      trainingTaskIds: relatedTasks.map((task) => task.id),
      events,
    },
    run,
  );
  await storage.saveWorkflowRun(nextRun);
  return nextRun;
}

async function syncWorkflowRunsForReview(reviewId, event = null) {
  if (!reviewId) return [];
  const runs = await storage.listWorkflowRuns({ reviewId });
  const updated = [];
  for (const run of runs.filter((item) => item.status !== "completed")) {
    updated.push(await refreshWorkflowRun(run, event));
  }
  return updated;
}

async function syncWorkflowRunsForTask(task, event = null) {
  const weakness = await storage.getWeakness(task.weaknessId);
  const reviewIds = unique([
    task.relatedReviewId,
    ...(weakness?.relatedReviewIds || []),
  ].filter(Boolean));
  const updated = [];
  for (const reviewId of reviewIds) {
    updated.push(...await syncWorkflowRunsForReview(reviewId, event));
  }
  return updated;
}

async function startWorkflowRunForReview(reviewId) {
  const review = await storage.getReview(reviewId);
  if (!review) throw new Error("Related interview review not found");
  const existing = (await storage.listWorkflowRuns({ reviewId })).find((run) => run.status !== "completed");
  if (existing) return { workflowRun: await refreshWorkflowRun(existing), created: false };

  const run = normalizeWorkflowRun({
    reviewId: review.id,
    opportunityId: review.opportunityId,
    interviewRoundId: review.interviewRoundId,
    title: `${review.companyName} - ${review.roundName}修复闭环`,
    events: [workflowEvent("workflow_started", review.id, "从面试复盘开启修复流程")],
  }, {}, review);
  await storage.saveWorkflowRun(run);
  return { workflowRun: await refreshWorkflowRun(run), created: true };
}

async function updateWorkflowRunAction(existing, input) {
  const action = String(input.action || "");
  const summary = String(input.summary ?? existing.summary ?? "");
  if (action === "pause") {
    const next = normalizeWorkflowRun({
      ...existing,
      status: "paused",
      waitingFor: "human_action",
      summary,
      events: appendWorkflowEvent(existing, workflowEvent("workflow_paused", existing.id, "用户暂停流程")),
    }, existing);
    await storage.saveWorkflowRun(next);
    return next;
  }
  if (action === "complete") {
    const next = normalizeWorkflowRun({
      ...existing,
      status: "completed",
      currentStep: "closed",
      waitingFor: "none",
      summary,
      events: appendWorkflowEvent(existing, workflowEvent("workflow_completed", existing.id, "用户关闭闭环")),
    }, existing);
    await storage.saveWorkflowRun(next);
    return next;
  }
  if (action === "resume") {
    const next = normalizeWorkflowRun({
      ...existing,
      status: "diagnosis_pending",
      waitingFor: "ai_generation",
      summary,
      events: appendWorkflowEvent(existing, workflowEvent("workflow_resumed", existing.id, "用户恢复流程")),
    }, existing);
    await storage.saveWorkflowRun(next);
    return refreshWorkflowRun(next, null, { forceProgress: true });
  }
  throw new Error("Unsupported workflow action");
}

function localRuntimeApiBaseUrl(url) {
  const port = String(url.port || PORT);
  if (!/^\d+$/.test(port)) throw new Error("Invalid runtime request port");
  return `http://127.0.0.1:${port}`;
}

async function createWorkflowRuntimeGraph(baseUrl) {
  const [{ JsonFileCheckpointSaver }, runtime] = await Promise.all([
    import("./integrations/langgraph/json-file-checkpoint-saver.mjs"),
    import("./integrations/langgraph/review-pilot-graph.mjs"),
  ]);
  const graph = runtime.createReviewPilotGraph({
    checkpointer: new JsonFileCheckpointSaver(LANGGRAPH_CHECKPOINT_PATH),
    diagnosisTools: runtime.createDiagnosisTools(baseUrl),
    commitTools: runtime.createApprovalCommitTools(baseUrl),
  });
  return { graph, runtime };
}

async function readWorkflowRuntimeSummary(workflowRunId, baseUrl) {
  const { graph, runtime } = await createWorkflowRuntimeGraph(baseUrl);
  return runtime.readReviewPilotSummary(graph, workflowRunId);
}

async function getExpressionDrillSource(sourceType, sourceId) {
  if (sourceType === "follow_up_question") return getFollowUpQuestion(sourceId);
  if (sourceType === "weakness") return getWeakness(sourceId);
  if (sourceType === "training_task") return getTrainingTask(sourceId);
  if (sourceType === "interview_review") return getReview(sourceId);
  return null;
}

async function syncExpressionDrillSource(drill) {
  if (drill.sourceType !== "follow_up_question" || drill.status !== "stable") {
    return null;
  }

  const question = await getFollowUpQuestion(drill.sourceId);
  if (!question) return null;
  const projectAmmo = await getProjectAmmo(question.projectAmmoId);
  if (!projectAmmo) return null;

  const nextQuestion = normalizeFollowUpQuestion(
    {
      ...question,
      status: "stable",
      stableAnswer: drill.targetAnswer || question.stableAnswer,
    },
    question,
    projectAmmo,
  );
  await saveFollowUpQuestion(nextQuestion);
  return nextQuestion;
}

async function portfolioPreviewData() {
  const [profile, projects] = await Promise.all([
    getPortfolioProfile(),
    listPortfolioProjects({ visibility: "portfolio" }),
  ]);
  const readyCount = projects.filter((project) => project.readiness === "ready").length;

  return {
    profile,
    projects,
    stats: {
      totalProjects: projects.length,
      readyProjects: readyCount,
      needsWork: projects.length - readyCount,
      portfolioStatus: profile.portfolioStatus,
    },
  };
}

function compactBlock(title, entries) {
  const lines = entries
    .filter(([, value]) => String(value ?? "").trim())
    .map(([label, value]) => `- ${label}: ${String(value).trim()}`);
  return lines.length ? `## ${title}\n\n${lines.join("\n")}` : `## ${title}\n\n暂无内容`;
}

function analysisTypeLabel(type) {
  const labels = {
    review_diagnosis: "面试复盘诊断",
    jd_breakdown: "JD 拆解",
    company_research: "公司/业务调研",
    project_match: "项目匹配",
    follow_up_questions: "追问生成",
    answer_structure: "回答结构建议",
    portfolio_polish: "作品集文案打磨",
    weakness_repair: "缺陷修复建议",
    other: "其他分析",
  };
  return labels[type] || labels.other;
}

async function sourceContext(sourceType, sourceId, freeformContext = "") {
  if (sourceType === "freeform") {
    return {
      sourceTitle: "自由输入",
      contextSnapshot: String(freeformContext || "").trim() || "暂无自由输入上下文",
    };
  }

  if (sourceType === "opportunity") {
    const item = await getOpportunity(sourceId);
    if (!item) throw new Error("Related opportunity not found");
    return {
      sourceTitle: `${item.companyName} - ${item.roleTitle}`,
      contextSnapshot: compactBlock("岗位机会", [
        ["公司", item.companyName],
        ["岗位", item.roleTitle],
        ["阶段", item.stage],
        ["风险", item.riskLevel],
        ["下一步", item.nextAction],
        ["JD", item.jdText],
        ["笔记", item.notes],
      ]),
    };
  }

  if (sourceType === "project_ammo") {
    const item = await getProjectAmmo(sourceId);
    if (!item) throw new Error("Related project ammo not found");
    return {
      sourceTitle: item.projectName,
      contextSnapshot: compactBlock("项目弹药", [
        ["项目", item.projectName],
        ["角色", item.role],
        ["周期", item.period],
        ["背景", item.background],
        ["目标", item.goal],
        ["关键动作", item.actions],
        ["结果", item.result],
        ["指标", item.metrics],
        ["AI 相关性", item.aiRelevance],
        ["可证明能力", item.pmCompetencies],
        ["高风险追问", item.riskQuestions],
      ]),
    };
  }

  if (sourceType === "follow_up_question") {
    const item = await getFollowUpQuestion(sourceId);
    if (!item) throw new Error("Related follow-up question not found");
    return {
      sourceTitle: item.question,
      contextSnapshot: compactBlock("项目追问", [
        ["问题", item.question],
        ["类型", item.questionType],
        ["风险", item.riskLevel],
        ["回答草稿", item.answerDraft],
        ["稳定回答", item.stableAnswer],
        ["证据", item.evidence],
      ]),
    };
  }

  if (sourceType === "interview_review") {
    const item = await getReview(sourceId);
    if (!item) throw new Error("Related interview review not found");
    return {
      sourceTitle: `${item.companyName} - ${item.roundName}复盘`,
      contextSnapshot: compactBlock("面试复盘", [
        ["公司", item.companyName],
        ["岗位", item.roleTitle],
        ["轮次", item.roundName],
        ["实际问题", item.actualQuestions],
        ["强回答", item.strongAnswers],
        ["弱回答", item.weakAnswers],
        ["挂点分析", item.failurePoints],
        ["总结", item.summary],
      ]),
    };
  }

  if (sourceType === "weakness") {
    const item = await getWeakness(sourceId);
    if (!item) throw new Error("Related weakness not found");
    return {
      sourceTitle: item.title,
      contextSnapshot: compactBlock("能力缺陷", [
        ["标题", item.title],
        ["类型", item.category],
        ["严重程度", item.severity],
        ["证据", item.evidence],
        ["描述", item.description],
        ["状态", item.status],
      ]),
    };
  }

  if (sourceType === "training_task") {
    const item = await getTrainingTask(sourceId);
    if (!item) throw new Error("Related training task not found");
    return {
      sourceTitle: item.title,
      contextSnapshot: compactBlock("训练任务", [
        ["标题", item.title],
        ["类型", item.taskType],
        ["目标能力", item.targetAbility],
        ["练习产物", item.practiceOutput],
        ["验收标准", item.acceptanceCriteria],
        ["验证记录", item.validationNote],
      ]),
    };
  }

  if (sourceType === "portfolio_project") {
    const item = await getPortfolioProject(sourceId);
    if (!item) throw new Error("Related portfolio project not found");
    return {
      sourceTitle: item.displayTitle,
      contextSnapshot: compactBlock("作品集项目", [
        ["公开标题", item.displayTitle],
        ["摘要", item.summary],
        ["问题", item.problem],
        ["方案", item.solution],
        ["结果", item.impact],
        ["指标", item.metrics],
        ["能力", item.skills],
        ["脱敏风险", item.privacyNote],
      ]),
    };
  }

  throw new Error("Unsupported analysis source type");
}

function reviewDiagnosisSchemaInstruction() {
  return `

本次需要返回可供系统解析的 JSON。只输出 JSON，不要使用 Markdown 代码块，结构如下：
{
  "summary": "本次面试整体诊断",
  "failurePoints": ["具体挂点"],
  "weaknessCandidates": [
    {
      "title": "缺陷标题",
      "category": "project_depth | product_thinking | ai_understanding | business_sense | communication | case_analysis | motivation | other",
      "severity": "low | medium | high",
      "evidence": "来自复盘的事实依据",
      "description": "缺陷解释"
    }
  ],
  "trainingTaskCandidates": [
    {
      "title": "训练任务标题",
      "weaknessCandidateIndex": 0,
      "taskType": "answer_rewrite | mock_interview | project_deep_dive | case_practice | knowledge_patch | expression_drill | other",
      "targetAbility": "目标能力",
      "practiceOutput": "练习产物",
      "acceptanceCriteria": "验收标准"
    }
  ]
}

候选只作为建议，最终是否写入系统将由用户人工确认。`;
}

function buildPromptDraft({ analysisType, sourceType, sourceTitle, contextSnapshot }) {
  const label = analysisTypeLabel(analysisType);
  const isReviewDiagnosis = analysisType === "review_diagnosis" && sourceType === "interview_review";
  const outputInstruction = isReviewDiagnosis
    ? reviewDiagnosisSchemaInstruction()
    : `

请按以下格式输出：
1. 关键信息摘要
2. 主要机会点
3. 主要风险点
4. 建议我追问或补充的信息
5. 可执行的下一步建议`;
  return `你是一名严谨的 AI 产品经理面试与作品集顾问。请基于以下上下文，完成「${label}」。

限制条件：
- 只给建议，不替我做最终决策。
- 不编造上下文里没有的事实。
- 明确标注哪些判断是推断。
- 输出应便于我人工筛选、改写和落地。

上下文：
${contextSnapshot}

分析对象：${sourceTitle || "未命名对象"}${outputInstruction}`;
}

async function buildAiAnalysisContext(input = {}) {
  const analysisType = AI_ANALYSIS_TYPES.has(input.analysisType) ? input.analysisType : "other";
  const sourceType = AI_ANALYSIS_SOURCE_TYPES.has(input.sourceType) ? input.sourceType : "freeform";
  const { sourceTitle, contextSnapshot } = await sourceContext(
    sourceType,
    String(input.sourceId || "").trim(),
    input.freeformContext ?? input.contextSnapshot,
  );
  return {
    sourceTitle,
    contextSnapshot,
    promptDraft: buildPromptDraft({ analysisType, sourceType, sourceTitle, contextSnapshot }),
  };
}

function ensureReviewDiagnosisNote(note) {
  if (note.analysisType !== "review_diagnosis" || note.sourceType !== "interview_review" || !note.sourceId) {
    throw new Error("Structured candidates require a review diagnosis linked to an interview review");
  }
}

function candidateDecision(existing) {
  return ["pending", "accepted", "ignored"].includes(existing?.decision) ? existing.decision : "pending";
}

function parseReviewDiagnosisCandidates(note, structuredResponse) {
  ensureReviewDiagnosisNote(note);
  let result;
  try {
    result = JSON.parse(String(structuredResponse || "").trim());
  } catch {
    throw new Error("结构化 AI 输出必须是有效 JSON");
  }

  if (!result || typeof result !== "object" || Array.isArray(result)) {
    throw new Error("结构化 AI 输出必须是 JSON 对象");
  }

  const existingWeaknesses = new Map((note.weaknessCandidates || []).map((item) => [item.id, item]));
  const existingTasks = new Map((note.trainingTaskCandidates || []).map((item) => [item.id, item]));
  const weaknessCandidates = (Array.isArray(result.weaknessCandidates) ? result.weaknessCandidates : [])
    .map((candidate, index) => {
      const title = String(candidate?.title || "").trim();
      if (!title) return null;
      const id = `weakness_candidate_${index + 1}`;
      const existing = existingWeaknesses.get(id);
      return {
        id,
        title,
        category: WEAKNESS_CATEGORIES.has(candidate.category) ? candidate.category : "other",
        severity: SEVERITIES.has(candidate.severity) ? candidate.severity : "medium",
        evidence: String(candidate.evidence || "").trim(),
        description: String(candidate.description || "").trim(),
        decision: candidateDecision(existing),
        createdWeaknessId: String(existing?.createdWeaknessId || ""),
      };
    })
    .filter(Boolean);
  const trainingTaskCandidates = (Array.isArray(result.trainingTaskCandidates) ? result.trainingTaskCandidates : [])
    .map((candidate, index) => {
      const title = String(candidate?.title || "").trim();
      if (!title) return null;
      const id = `training_candidate_${index + 1}`;
      const hasWeaknessIndex = candidate.weaknessCandidateIndex !== null && candidate.weaknessCandidateIndex !== undefined;
      const weaknessIndex = Number(candidate.weaknessCandidateIndex);
      const weaknessCandidateId = hasWeaknessIndex && Number.isInteger(weaknessIndex) && weaknessCandidates[weaknessIndex]
        ? weaknessCandidates[weaknessIndex].id
        : "";
      const existing = existingTasks.get(id);
      return {
        id,
        title,
        weaknessCandidateId,
        taskType: TRAINING_TASK_TYPES.has(candidate.taskType) ? candidate.taskType : "other",
        targetAbility: String(candidate.targetAbility || "").trim(),
        practiceOutput: String(candidate.practiceOutput || "").trim(),
        acceptanceCriteria: String(candidate.acceptanceCriteria || "").trim(),
        decision: candidateDecision(existing),
        createdTrainingTaskId: String(existing?.createdTrainingTaskId || ""),
      };
    })
    .filter(Boolean);

  if (!weaknessCandidates.length && !trainingTaskCandidates.length) {
    throw new Error("结构化 AI 输出没有可解析的缺陷或训练候选");
  }

  return {
    candidateSchemaVersion: "review_diagnosis_v1",
    structuredResponse: String(structuredResponse || ""),
    analysisSummary: String(result.summary || "").trim(),
    failurePointCandidates: Array.isArray(result.failurePoints)
      ? result.failurePoints.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
    weaknessCandidates,
    trainingTaskCandidates,
  };
}

function agentToolManifest() {
  return {
    adapterVersion: AGENT_TOOL_ADAPTER_VERSION,
    runtimeCandidate: "langgraph",
    policy: {
      storageAccess: "api_only",
      directMarkdownWrite: false,
      commitWriteToolsExposed: false,
      approvalRequiredFor: ["create_weakness", "create_training_task", "complete_workflow"],
      forbiddenRuntimeTools: ["arbitrary_http", "shell", "filesystem_write"],
    },
    tools: [
      {
        name: "get_workflow_review_context",
        method: "GET",
        pathTemplate: "/api/agent-tools/workflow-runs/{workflowRunId}/review-context",
        permission: "read",
      },
      {
        name: "propose_review_diagnosis",
        method: "POST",
        pathTemplate: "/api/agent-tools/review-diagnosis-proposals/validate",
        permission: "propose_write",
      },
    ],
  };
}

function agentWorkflowView(run) {
  return {
    id: run.id,
    definitionKey: run.definitionKey,
    title: run.title,
    status: run.status,
    currentStep: run.currentStep,
    waitingFor: run.waitingFor,
    opportunityId: run.opportunityId,
    interviewRoundId: run.interviewRoundId,
    reviewId: run.reviewId,
    aiAnalysisNoteId: run.aiAnalysisNoteId,
    weaknessIds: run.weaknessIds || [],
    trainingTaskIds: run.trainingTaskIds || [],
    updatedAt: run.updatedAt,
  };
}

function agentReviewView(review) {
  return {
    id: review.id,
    companyName: review.companyName,
    roleTitle: review.roleTitle,
    roundName: review.roundName,
    actualQuestions: review.actualQuestions,
    strongAnswers: review.strongAnswers,
    weakAnswers: review.weakAnswers,
    failurePoints: review.failurePoints,
    interviewerSignals: review.interviewerSignals,
    summary: review.summary,
    selfRating: review.selfRating,
    result: review.result,
    status: review.status,
  };
}

async function buildAgentReviewContext(workflowRunId) {
  const run = await storage.getWorkflowRun(workflowRunId);
  if (!run) throw new Error("Workflow run not found");
  if (run.definitionKey !== "post_interview_repair_loop") {
    throw new Error("Unsupported workflow definition");
  }
  const review = await storage.getReview(run.reviewId);
  if (!review) throw new Error("Related interview review not found");
  const analysis = await buildAiAnalysisContext({
    analysisType: "review_diagnosis",
    sourceType: "interview_review",
    sourceId: review.id,
  });

  return {
    adapterVersion: AGENT_TOOL_ADAPTER_VERSION,
    tool: "get_workflow_review_context",
    permission: "read",
    workflowRun: agentWorkflowView(run),
    interviewReview: agentReviewView(review),
    diagnosisRequest: {
      analysisType: "review_diagnosis",
      sourceType: "interview_review",
      sourceId: review.id,
      sourceTitle: analysis.sourceTitle,
      contextSnapshot: analysis.contextSnapshot,
      promptDraft: analysis.promptDraft,
      outputSchema: REVIEW_DIAGNOSIS_JSON_SCHEMA,
    },
    nextTool: {
      name: "propose_review_diagnosis",
      method: "POST",
      path: "/api/agent-tools/review-diagnosis-proposals/validate",
    },
  };
}

async function validateAgentReviewDiagnosisProposal(input = {}) {
  const workflowRunId = String(input.workflowRunId || "").trim();
  if (!workflowRunId) throw new Error("workflowRunId is required");
  const run = await storage.getWorkflowRun(workflowRunId);
  if (!run) throw new Error("Workflow run not found");
  if (["completed", "paused"].includes(run.status)) {
    throw new Error("Workflow run is not accepting diagnosis proposals");
  }
  const review = await storage.getReview(run.reviewId);
  if (!review) throw new Error("Related interview review not found");
  const structuredResponse = typeof input.proposal === "object" && input.proposal !== null
    ? JSON.stringify(input.proposal)
    : String(input.structuredResponse || "");
  const parsed = parseReviewDiagnosisCandidates(
    {
      analysisType: "review_diagnosis",
      sourceType: "interview_review",
      sourceId: review.id,
      weaknessCandidates: [],
      trainingTaskCandidates: [],
    },
    structuredResponse,
  );

  return {
    adapterVersion: AGENT_TOOL_ADAPTER_VERSION,
    tool: "propose_review_diagnosis",
    permission: "propose_write",
    workflowRunId: run.id,
    reviewId: review.id,
    candidateSchemaVersion: parsed.candidateSchemaVersion,
    proposal: {
      analysisSummary: parsed.analysisSummary,
      failurePointCandidates: parsed.failurePointCandidates,
      weaknessCandidates: parsed.weaknessCandidates,
      trainingTaskCandidates: parsed.trainingTaskCandidates,
    },
    approval: {
      status: "required",
      waitingFor: "human_action",
      commitWriteToolsExposed: false,
      instruction: "请在 way2AIPM 工作台中人工确认候选，确认前不会写入缺陷或训练任务。",
    },
    persistence: {
      written: false,
      workflowAdvanced: false,
    },
  };
}

async function parseAiAnalysisCandidates(note, structuredResponse) {
  const parsed = parseReviewDiagnosisCandidates(note, structuredResponse);
  const nextNote = normalizeAiAnalysisNote(
    { ...note, ...parsed, status: "ai_responded" },
    note,
  );
  await storage.saveAiAnalysisNote(nextNote);
  await syncWorkflowRunsForReview(
    nextNote.sourceId,
    workflowEvent("diagnosis_generated", nextNote.id, "诊断候选已生成，等待人工确认"),
  );
  return nextNote;
}

function serviceError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function outputTextFromResponse(payload) {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  for (const item of payload?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === "output_text" && typeof content.text === "string" && content.text.trim()) {
        return content.text.trim();
      }
    }
  }

  throw serviceError("模型未返回可解析的结构化结果，请稍后重试或使用手动粘贴流程", 502);
}

async function requestReviewDiagnosisFromOpenAi(promptDraft) {
  const apiKey = String(process.env.OPENAI_API_KEY || "").trim();
  const model = String(process.env.OPENAI_MODEL || "").trim();
  if (!apiKey || !model) {
    throw serviceError("AI 配置不完整，请在 .env.local 中填写 OPENAI_API_KEY 与 OPENAI_MODEL 后重启服务", 503);
  }
  let response;
  try {
    response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: promptDraft,
        text: {
          format: {
            type: "json_schema",
            name: "review_diagnosis_v1",
            strict: true,
            schema: REVIEW_DIAGNOSIS_JSON_SCHEMA,
          },
        },
      }),
    });
  } catch {
    throw serviceError("无法连接模型服务，请检查网络后重试，或继续使用手动粘贴流程", 502);
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = String(payload?.error?.message || "").trim();
    throw serviceError(
      `模型服务请求失败（${response.status}）${message ? `：${message}` : ""}`,
      502,
    );
  }

  return { model, structuredResponse: outputTextFromResponse(payload) };
}

async function runAiReviewDiagnosis(note) {
  ensureReviewDiagnosisNote(note);
  const context = await buildAiAnalysisContext(note);
  const promptDraft = String(note.promptDraft || context.promptDraft).trim();
  const preparedNote = normalizeAiAnalysisNote(
    {
      ...note,
      sourceTitle: note.sourceTitle || context.sourceTitle,
      contextSnapshot: note.contextSnapshot || context.contextSnapshot,
      promptDraft,
      aiProvider: "openai",
      aiRunStatus: "not_run",
      aiError: "",
    },
    note,
  );

  try {
    const result = await requestReviewDiagnosisFromOpenAi(promptDraft);
    const completedNote = normalizeAiAnalysisNote(
      {
        ...preparedNote,
        aiResponse: result.structuredResponse,
        structuredResponse: result.structuredResponse,
        aiProvider: "openai",
        aiModel: result.model,
        aiRunStatus: "completed",
        aiLastRunAt: new Date().toISOString(),
        aiError: "",
      },
      note,
    );
    return await parseAiAnalysisCandidates(completedNote, result.structuredResponse);
  } catch (error) {
    if (error.statusCode !== 503) {
      const failedNote = normalizeAiAnalysisNote(
        {
          ...preparedNote,
          aiProvider: "openai",
          aiModel: String(process.env.OPENAI_MODEL || "").trim(),
          aiRunStatus: "failed",
          aiLastRunAt: new Date().toISOString(),
          aiError: error.message,
        },
        note,
      );
      await storage.saveAiAnalysisNote(failedNote);
    }
    throw error;
  }
}

async function actOnAiCandidate(note, input) {
  ensureReviewDiagnosisNote(note);
  const action = String(input.action || "");
  const candidateType = String(input.candidateType || "");
  const candidateId = String(input.candidateId || "");
  if (!["accept", "ignore"].includes(action)) {
    throw new Error("Unsupported candidate action");
  }

  if (candidateType === "weakness") {
    const candidates = [...(note.weaknessCandidates || [])];
    const index = candidates.findIndex((candidate) => candidate.id === candidateId);
    if (index < 0) throw new Error("Weakness candidate not found");
    const candidate = candidates[index];
    let weakness = null;
    if (action === "accept") {
      if (candidate.decision === "accepted" && candidate.createdWeaknessId) {
        weakness = await storage.getWeakness(candidate.createdWeaknessId);
      }
      const acceptedRecordId = createAcceptedCandidateRecordId("weak", note.id, candidate.id);
      if (!weakness) {
        weakness = await storage.getWeakness(acceptedRecordId);
      }
      if (!weakness) {
        const review = await storage.getReview(note.sourceId);
        if (!review) throw new Error("Related interview review not found");
        weakness = normalizeWeakness({
          id: acceptedRecordId,
          title: candidate.title,
          category: candidate.category,
          severity: candidate.severity,
          evidence: candidate.evidence,
          description: candidate.description,
          status: "open",
          relatedOpportunityIds: [review.opportunityId],
          relatedInterviewRoundIds: [review.interviewRoundId],
          relatedReviewIds: [review.id],
        });
        await storage.saveWeakness(weakness);
        await linkWeaknessToReviews(weakness);
      }
      candidates[index] = { ...candidate, decision: "accepted", createdWeaknessId: weakness.id };
    } else {
      candidates[index] = { ...candidate, decision: "ignored" };
    }
    const nextNote = normalizeAiAnalysisNote({ ...note, weaknessCandidates: candidates }, note);
    await storage.saveAiAnalysisNote(nextNote);
    if (action === "accept") {
      await syncWorkflowRunsForReview(
        note.sourceId,
        workflowEvent("candidate_accepted", `weakness:${candidate.id}`, "已采纳能力缺陷候选"),
      );
    }
    return { aiAnalysisNote: nextNote, weakness };
  }

  if (candidateType === "training_task") {
    const candidates = [...(note.trainingTaskCandidates || [])];
    const index = candidates.findIndex((candidate) => candidate.id === candidateId);
    if (index < 0) throw new Error("Training candidate not found");
    const candidate = candidates[index];
    let task = null;
    let weakness = null;
    if (action === "accept") {
      const weaknessCandidate = (note.weaknessCandidates || []).find(
        (item) => item.id === candidate.weaknessCandidateId,
      );
      if (!weaknessCandidate?.createdWeaknessId || weaknessCandidate.decision !== "accepted") {
        throw new Error("请先采纳关联的能力缺陷候选");
      }
      weakness = await storage.getWeakness(weaknessCandidate.createdWeaknessId);
      if (!weakness) throw new Error("Related weakness not found");
      if (candidate.decision === "accepted" && candidate.createdTrainingTaskId) {
        task = await storage.getTrainingTask(candidate.createdTrainingTaskId);
      }
      const acceptedRecordId = createAcceptedCandidateRecordId("task", note.id, candidate.id);
      if (!task) {
        task = await storage.getTrainingTask(acceptedRecordId);
      }
      if (!task) {
        task = normalizeTrainingTask({
          id: acceptedRecordId,
          weaknessId: weakness.id,
          title: candidate.title,
          taskType: candidate.taskType,
          targetAbility: candidate.targetAbility,
          practiceOutput: candidate.practiceOutput,
          acceptanceCriteria: candidate.acceptanceCriteria,
          status: "todo",
          relatedReviewId: note.sourceId,
        }, {}, weakness);
        await storage.saveTrainingTask(task);
        weakness = await linkTaskToWeakness(task);
      }
      candidates[index] = { ...candidate, decision: "accepted", createdTrainingTaskId: task.id };
    } else {
      candidates[index] = { ...candidate, decision: "ignored" };
    }
    const nextNote = normalizeAiAnalysisNote({ ...note, trainingTaskCandidates: candidates }, note);
    await storage.saveAiAnalysisNote(nextNote);
    if (action === "accept") {
      await syncWorkflowRunsForReview(
        note.sourceId,
        workflowEvent("candidate_accepted", `training_task:${candidate.id}`, "已采纳训练任务候选"),
      );
    }
    return { aiAnalysisNote: nextNote, task, weakness };
  }

  throw new Error("Unsupported candidate type");
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
  if (url.pathname === "/api/system-snapshot") {
    if (req.method === "GET") {
      return sendJson(res, 200, { snapshot: await systemSnapshot() });
    }

    return methodNotAllowed(res);
  }

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
      for (const reviewId of weakness.relatedReviewIds || []) {
        await syncWorkflowRunsForReview(reviewId);
      }
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
      for (const reviewId of weakness.relatedReviewIds || []) {
        await syncWorkflowRunsForReview(reviewId);
      }
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
      await syncWorkflowRunsForTask(
        task,
        workflowEvent("training_available", task.id, "已创建训练任务"),
      );
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
      const eventType = task.status === "validated" ? "training_validated" : "training_started";
      await syncWorkflowRunsForTask(
        task,
        workflowEvent(eventType, `${task.id}:${task.status}`, `训练状态更新为 ${task.status}`),
      );
      return sendJson(res, 200, { task, weakness: updatedWeakness });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/project-ammos") {
    if (req.method === "GET") {
      const status = url.searchParams.get("status") || "";
      const projectType = url.searchParams.get("projectType") || "";
      const projectAmmos = await listProjectAmmos({ status, projectType });
      return sendJson(res, 200, { projectAmmos });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const projectAmmo = normalizeProjectAmmo(body);
      await saveProjectAmmo(projectAmmo);
      return sendJson(res, 201, { projectAmmo });
    }

    return methodNotAllowed(res);
  }

  const projectAmmoMatch = url.pathname.match(/^\/api\/project-ammos\/([^/]+)$/);
  if (projectAmmoMatch) {
    const id = decodeURIComponent(projectAmmoMatch[1]);

    if (req.method === "GET") {
      const projectAmmo = await getProjectAmmo(id);
      if (!projectAmmo) return notFound(res);
      return sendJson(res, 200, { projectAmmo });
    }

    if (req.method === "PUT") {
      const existing = await getProjectAmmo(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const projectAmmo = normalizeProjectAmmo({ ...body, id }, existing);
      await saveProjectAmmo(projectAmmo);
      return sendJson(res, 200, { projectAmmo });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/follow-up-questions") {
    if (req.method === "GET") {
      const projectAmmoId = url.searchParams.get("projectAmmoId") || "";
      const status = url.searchParams.get("status") || "";
      const followUpQuestions = await listFollowUpQuestions({ projectAmmoId, status });
      return sendJson(res, 200, { followUpQuestions });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const projectAmmo = await getProjectAmmo(body.projectAmmoId);
      if (!projectAmmo) {
        return sendJson(res, 400, { error: "Related project ammo not found" });
      }
      const followUpQuestion = normalizeFollowUpQuestion(body, {}, projectAmmo);
      await saveFollowUpQuestion(followUpQuestion);
      return sendJson(res, 201, { followUpQuestion });
    }

    return methodNotAllowed(res);
  }

  const followUpQuestionMatch = url.pathname.match(/^\/api\/follow-up-questions\/([^/]+)$/);
  if (followUpQuestionMatch) {
    const id = decodeURIComponent(followUpQuestionMatch[1]);

    if (req.method === "GET") {
      const followUpQuestion = await getFollowUpQuestion(id);
      if (!followUpQuestion) return notFound(res);
      return sendJson(res, 200, { followUpQuestion });
    }

    if (req.method === "PUT") {
      const existing = await getFollowUpQuestion(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const projectAmmo = await getProjectAmmo(body.projectAmmoId || existing.projectAmmoId);
      if (!projectAmmo) {
        return sendJson(res, 400, { error: "Related project ammo not found" });
      }
      const followUpQuestion = normalizeFollowUpQuestion({ ...body, id }, existing, projectAmmo);
      await saveFollowUpQuestion(followUpQuestion);
      return sendJson(res, 200, { followUpQuestion });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/expression-drills") {
    if (req.method === "GET") {
      const sourceType = url.searchParams.get("sourceType") || "";
      const sourceId = url.searchParams.get("sourceId") || "";
      const status = url.searchParams.get("status") || "";
      const expressionDrills = await listExpressionDrills({ sourceType, sourceId, status });
      return sendJson(res, 200, { expressionDrills });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const sourceType = EXPRESSION_DRILL_SOURCE_TYPES.has(body.sourceType)
        ? body.sourceType
        : "follow_up_question";
      const source = await getExpressionDrillSource(sourceType, body.sourceId);
      if (!source) {
        return sendJson(res, 400, { error: "Related expression source not found" });
      }
      const expressionDrill = normalizeExpressionDrill({ ...body, sourceType });
      await saveExpressionDrill(expressionDrill);
      const followUpQuestion = await syncExpressionDrillSource(expressionDrill);
      return sendJson(res, 201, { expressionDrill, followUpQuestion });
    }

    return methodNotAllowed(res);
  }

  const expressionDrillMatch = url.pathname.match(/^\/api\/expression-drills\/([^/]+)$/);
  if (expressionDrillMatch) {
    const id = decodeURIComponent(expressionDrillMatch[1]);

    if (req.method === "GET") {
      const expressionDrill = await getExpressionDrill(id);
      if (!expressionDrill) return notFound(res);
      return sendJson(res, 200, { expressionDrill });
    }

    if (req.method === "PUT") {
      const existing = await getExpressionDrill(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const sourceType = EXPRESSION_DRILL_SOURCE_TYPES.has(body.sourceType)
        ? body.sourceType
        : existing.sourceType;
      const sourceId = body.sourceId || existing.sourceId;
      const source = await getExpressionDrillSource(sourceType, sourceId);
      if (!source) {
        return sendJson(res, 400, { error: "Related expression source not found" });
      }
      const expressionDrill = normalizeExpressionDrill({ ...body, id, sourceType, sourceId }, existing);
      await saveExpressionDrill(expressionDrill);
      const followUpQuestion = await syncExpressionDrillSource(expressionDrill);
      return sendJson(res, 200, { expressionDrill, followUpQuestion });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/expression-sessions") {
    if (req.method === "GET") {
      const drillId = url.searchParams.get("drillId") || "";
      const status = url.searchParams.get("status") || "";
      const selfRating = url.searchParams.get("selfRating") || "";
      const expressionSessions = await listExpressionSessions({ drillId, status, selfRating });
      return sendJson(res, 200, { expressionSessions });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const drill = await getExpressionDrill(body.drillId);
      if (!drill) {
        return sendJson(res, 400, { error: "Related expression drill not found" });
      }
      const expressionSession = normalizeExpressionSession(body, {}, drill);
      await saveExpressionSession(expressionSession);
      return sendJson(res, 201, { expressionSession });
    }

    return methodNotAllowed(res);
  }

  const expressionSessionMatch = url.pathname.match(/^\/api\/expression-sessions\/([^/]+)$/);
  if (expressionSessionMatch) {
    const id = decodeURIComponent(expressionSessionMatch[1]);

    if (req.method === "GET") {
      const expressionSession = await getExpressionSession(id);
      if (!expressionSession) return notFound(res);
      return sendJson(res, 200, { expressionSession });
    }

    if (req.method === "PUT") {
      const existing = await getExpressionSession(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const drill = await getExpressionDrill(body.drillId || existing.drillId);
      if (!drill) {
        return sendJson(res, 400, { error: "Related expression drill not found" });
      }
      const expressionSession = normalizeExpressionSession({ ...body, id }, existing, drill);
      await saveExpressionSession(expressionSession);
      return sendJson(res, 200, { expressionSession });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/portfolio-profile") {
    if (req.method === "GET") {
      const profile = await getPortfolioProfile();
      return sendJson(res, 200, { profile });
    }

    if (req.method === "PUT") {
      const existing = await getPortfolioProfile();
      const body = await readRequestBody(req);
      const profile = normalizePortfolioProfile(body, existing);
      await savePortfolioProfile(profile);
      return sendJson(res, 200, { profile });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/portfolio-projects") {
    if (req.method === "GET") {
      const visibility = url.searchParams.get("visibility") || "";
      const readiness = url.searchParams.get("readiness") || "";
      const portfolioProjects = await listPortfolioProjects({ visibility, readiness });
      return sendJson(res, 200, { portfolioProjects });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const projectAmmo = body.projectAmmoId ? await getProjectAmmo(body.projectAmmoId) : null;
      if (body.projectAmmoId && !projectAmmo) {
        return sendJson(res, 400, { error: "Related project ammo not found" });
      }
      const portfolioProject = normalizePortfolioProject(body, {}, projectAmmo);
      await savePortfolioProject(portfolioProject);
      return sendJson(res, 201, { portfolioProject });
    }

    return methodNotAllowed(res);
  }

  const portfolioProjectMatch = url.pathname.match(/^\/api\/portfolio-projects\/([^/]+)$/);
  if (portfolioProjectMatch) {
    const id = decodeURIComponent(portfolioProjectMatch[1]);

    if (req.method === "GET") {
      const portfolioProject = await getPortfolioProject(id);
      if (!portfolioProject) return notFound(res);
      return sendJson(res, 200, { portfolioProject });
    }

    if (req.method === "PUT") {
      const existing = await getPortfolioProject(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const projectAmmo = (body.projectAmmoId || existing.projectAmmoId)
        ? await getProjectAmmo(body.projectAmmoId || existing.projectAmmoId)
        : null;
      if ((body.projectAmmoId || existing.projectAmmoId) && !projectAmmo) {
        return sendJson(res, 400, { error: "Related project ammo not found" });
      }
      const portfolioProject = normalizePortfolioProject({ ...body, id }, existing, projectAmmo);
      await savePortfolioProject(portfolioProject);
      return sendJson(res, 200, { portfolioProject });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/portfolio-preview") {
    if (req.method === "GET") {
      return sendJson(res, 200, await portfolioPreviewData());
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/ai-analysis-context") {
    if (req.method === "POST") {
      const body = await readRequestBody(req);
      return sendJson(res, 200, await buildAiAnalysisContext(body));
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/ai-frontier-cards") {
    if (req.method === "GET") {
      const category = url.searchParams.get("category") || "";
      const status = url.searchParams.get("status") || "";
      const priority = url.searchParams.get("priority") || "";
      const aiFrontierCards = await listAiFrontierCards({ category, status, priority });
      return sendJson(res, 200, { aiFrontierCards });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const card = normalizeAiFrontierCard(body);
      await saveAiFrontierCard(card);
      return sendJson(res, 201, { aiFrontierCard: card });
    }

    return methodNotAllowed(res);
  }

  const aiFrontierCardMatch = url.pathname.match(/^\/api\/ai-frontier-cards\/([^/]+)$/);
  if (aiFrontierCardMatch) {
    const id = decodeURIComponent(aiFrontierCardMatch[1]);

    if (req.method === "GET") {
      const card = await getAiFrontierCard(id);
      if (!card) return notFound(res);
      return sendJson(res, 200, { aiFrontierCard: card });
    }

    if (req.method === "PUT") {
      const existing = await getAiFrontierCard(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const card = normalizeAiFrontierCard({ ...body, id }, existing);
      await saveAiFrontierCard(card);
      return sendJson(res, 200, { aiFrontierCard: card });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/rhythm-logs") {
    if (req.method === "GET") {
      const status = url.searchParams.get("status") || "";
      const rhythmRisk = url.searchParams.get("rhythmRisk") || "";
      const date = url.searchParams.get("date") || "";
      const rhythmLogs = await listRhythmLogs({ status, rhythmRisk, date });
      return sendJson(res, 200, { rhythmLogs });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const rhythmLog = normalizeRhythmLog(body);
      await saveRhythmLog(rhythmLog);
      return sendJson(res, 201, { rhythmLog });
    }

    return methodNotAllowed(res);
  }

  const rhythmLogMatch = url.pathname.match(/^\/api\/rhythm-logs\/([^/]+)$/);
  if (rhythmLogMatch) {
    const id = decodeURIComponent(rhythmLogMatch[1]);

    if (req.method === "GET") {
      const rhythmLog = await getRhythmLog(id);
      if (!rhythmLog) return notFound(res);
      return sendJson(res, 200, { rhythmLog });
    }

    if (req.method === "PUT") {
      const existing = await getRhythmLog(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const rhythmLog = normalizeRhythmLog({ ...body, id }, existing);
      await saveRhythmLog(rhythmLog);
      return sendJson(res, 200, { rhythmLog });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/workflow-runs") {
    if (req.method === "GET") {
      const status = url.searchParams.get("status") || "";
      const reviewId = url.searchParams.get("reviewId") || "";
      const workflowRuns = await storage.listWorkflowRuns({ status, reviewId });
      return sendJson(res, 200, { workflowRuns });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      try {
        const result = await startWorkflowRunForReview(String(body.reviewId || "").trim());
        return sendJson(res, result.created ? 201 : 200, result);
      } catch (error) {
        return sendJson(res, 400, { error: error.message });
      }
    }

    return methodNotAllowed(res);
  }

  const workflowRunMatch = url.pathname.match(/^\/api\/workflow-runs\/([^/]+)$/);
  if (workflowRunMatch) {
    const id = decodeURIComponent(workflowRunMatch[1]);
    if (req.method === "GET") {
      const workflowRun = await storage.getWorkflowRun(id);
      if (!workflowRun) return notFound(res);
      return sendJson(res, 200, { workflowRun });
    }
    if (req.method === "PUT") {
      const existing = await storage.getWorkflowRun(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      try {
        const workflowRun = await updateWorkflowRunAction(existing, body);
        return sendJson(res, 200, { workflowRun });
      } catch (error) {
        return sendJson(res, 400, { error: error.message });
      }
    }
    return methodNotAllowed(res);
  }

  const workflowRuntimeMatch = url.pathname.match(/^\/api\/workflow-runs\/([^/]+)\/runtime$/);
  if (workflowRuntimeMatch) {
    const id = decodeURIComponent(workflowRuntimeMatch[1]);
    if (req.method === "GET") {
      const workflowRun = await storage.getWorkflowRun(id);
      if (!workflowRun) return notFound(res);
      try {
        const runtime = await readWorkflowRuntimeSummary(id, localRuntimeApiBaseUrl(url));
        return sendJson(res, 200, { runtime });
      } catch (error) {
        return sendJson(res, 503, { error: `Runtime 暂不可用：${error.message}` });
      }
    }
    return methodNotAllowed(res);
  }

  const workflowRuntimeStartMatch = url.pathname.match(/^\/api\/workflow-runs\/([^/]+)\/runtime\/start$/);
  if (workflowRuntimeStartMatch) {
    const id = decodeURIComponent(workflowRuntimeStartMatch[1]);
    if (req.method === "POST") {
      const workflowRun = await storage.getWorkflowRun(id);
      if (!workflowRun) return notFound(res);
      if (workflowRun.status === "completed") {
        return sendJson(res, 400, { error: "已完成的流程不能启动新的 Runtime" });
      }
      try {
        const { graph, runtime } = await createWorkflowRuntimeGraph(localRuntimeApiBaseUrl(url));
        const existing = await runtime.readReviewPilotSummary(graph, id);
        if (["not_started", "running"].includes(existing.status)) {
          await runtime.startReviewPilot(graph, id);
        }
        return sendJson(res, 200, { runtime: await runtime.readReviewPilotSummary(graph, id) });
      } catch (error) {
        return sendJson(res, 400, { error: `受控诊断启动失败：${error.message}` });
      }
    }
    return methodNotAllowed(res);
  }

  const workflowRuntimeResumeMatch = url.pathname.match(/^\/api\/workflow-runs\/([^/]+)\/runtime\/resume$/);
  if (workflowRuntimeResumeMatch) {
    const id = decodeURIComponent(workflowRuntimeResumeMatch[1]);
    if (req.method === "POST") {
      const workflowRun = await storage.getWorkflowRun(id);
      if (!workflowRun) return notFound(res);
      const body = await readRequestBody(req);
      try {
        const { graph, runtime } = await createWorkflowRuntimeGraph(localRuntimeApiBaseUrl(url));
        const existing = await runtime.readReviewPilotSummary(graph, id);
        if (existing.status === "completed") {
          return sendJson(res, 200, { runtime: existing });
        }
        if (existing.status !== "waiting_for_approval") {
          return sendJson(res, 400, { error: "当前 Runtime 没有等待审批的诊断候选" });
        }
        await runtime.resumeReviewPilot(graph, id, {
          action: String(body.action || ""),
          decisions: Array.isArray(body.decisions) ? body.decisions : [],
        });
        return sendJson(res, 200, { runtime: await runtime.readReviewPilotSummary(graph, id) });
      } catch (error) {
        return sendJson(res, 400, { error: `审批提交失败：${error.message}` });
      }
    }
    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/agent-tools/manifest") {
    if (!agentToolRequestAuthorized(req, res)) return;
    if (req.method === "GET") {
      return sendJson(res, 200, agentToolManifest());
    }
    return methodNotAllowed(res);
  }

  const agentWorkflowContextMatch = url.pathname.match(/^\/api\/agent-tools\/workflow-runs\/([^/]+)\/review-context$/);
  if (agentWorkflowContextMatch) {
    if (!agentToolRequestAuthorized(req, res)) return;
    if (req.method === "GET") {
      try {
        const context = await buildAgentReviewContext(decodeURIComponent(agentWorkflowContextMatch[1]));
        return sendJson(res, 200, context);
      } catch (error) {
        return sendJson(res, 400, { error: error.message });
      }
    }
    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/agent-tools/review-diagnosis-proposals/validate") {
    if (!agentToolRequestAuthorized(req, res)) return;
    if (req.method === "POST") {
      try {
        const body = await readRequestBody(req);
        const result = await validateAgentReviewDiagnosisProposal(body);
        return sendJson(res, 200, result);
      } catch (error) {
        return sendJson(res, 400, { error: error.message });
      }
    }
    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/ai-analysis-notes") {
    if (req.method === "GET") {
      const analysisType = url.searchParams.get("analysisType") || "";
      const sourceType = url.searchParams.get("sourceType") || "";
      const status = url.searchParams.get("status") || "";
      const aiAnalysisNotes = await listAiAnalysisNotes({ analysisType, sourceType, status });
      return sendJson(res, 200, { aiAnalysisNotes });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const note = normalizeAiAnalysisNote(body);
      await saveAiAnalysisNote(note);
      if (note.sourceType === "interview_review") {
        await syncWorkflowRunsForReview(note.sourceId);
      }
      return sendJson(res, 201, { aiAnalysisNote: note });
    }

    return methodNotAllowed(res);
  }

  const aiCandidateParseMatch = url.pathname.match(/^\/api\/ai-analysis-notes\/([^/]+)\/parse-candidates$/);
  if (aiCandidateParseMatch) {
    const id = decodeURIComponent(aiCandidateParseMatch[1]);
    if (req.method === "POST") {
      const note = await storage.getAiAnalysisNote(id);
      if (!note) return notFound(res);
      const body = await readRequestBody(req);
      try {
        const aiAnalysisNote = await parseAiAnalysisCandidates(note, body.structuredResponse);
        return sendJson(res, 200, { aiAnalysisNote });
      } catch (error) {
        return sendJson(res, 400, { error: error.message });
      }
    }
    return methodNotAllowed(res);
  }

  const aiCandidateActionMatch = url.pathname.match(/^\/api\/ai-analysis-notes\/([^/]+)\/candidate-actions$/);
  if (aiCandidateActionMatch) {
    const id = decodeURIComponent(aiCandidateActionMatch[1]);
    if (req.method === "POST") {
      const note = await storage.getAiAnalysisNote(id);
      if (!note) return notFound(res);
      const body = await readRequestBody(req);
      try {
        return sendJson(res, 200, await actOnAiCandidate(note, body));
      } catch (error) {
        return sendJson(res, 400, { error: error.message });
      }
    }
    return methodNotAllowed(res);
  }

  const aiRunMatch = url.pathname.match(/^\/api\/ai-analysis-notes\/([^/]+)\/run-ai$/);
  if (aiRunMatch) {
    const id = decodeURIComponent(aiRunMatch[1]);
    if (req.method === "POST") {
      const note = await storage.getAiAnalysisNote(id);
      if (!note) return notFound(res);
      try {
        const aiAnalysisNote = await runAiReviewDiagnosis(note);
        return sendJson(res, 200, { aiAnalysisNote });
      } catch (error) {
        return sendJson(res, error.statusCode || 400, { error: error.message });
      }
    }
    return methodNotAllowed(res);
  }

  const aiAnalysisNoteMatch = url.pathname.match(/^\/api\/ai-analysis-notes\/([^/]+)$/);
  if (aiAnalysisNoteMatch) {
    const id = decodeURIComponent(aiAnalysisNoteMatch[1]);

    if (req.method === "GET") {
      const note = await getAiAnalysisNote(id);
      if (!note) return notFound(res);
      return sendJson(res, 200, { aiAnalysisNote: note });
    }

    if (req.method === "PUT") {
      const existing = await getAiAnalysisNote(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const note = normalizeAiAnalysisNote({ ...body, id }, existing);
      await saveAiAnalysisNote(note);
      if (note.sourceType === "interview_review") {
        await syncWorkflowRunsForReview(note.sourceId);
      }
      return sendJson(res, 200, { aiAnalysisNote: note });
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
    console.error("也可以在 .env.local 中配置 PORT=4300 后重新启动服务。");
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
