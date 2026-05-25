const APP_VERSION = "v0.20";

const STAGES = [
  ["collected", "已收集"],
  ["applied", "已投递"],
  ["invited", "已邀约"],
  ["preparing", "准备中"],
  ["interviewed", "已面试"],
  ["reviewed", "已复盘"],
  ["rejected", "已挂"],
  ["offer", "Offer"],
  ["paused", "暂停"],
];

const PRIORITIES = [
  ["low", "低"],
  ["medium", "中"],
  ["high", "高"],
];

const RISK_LEVELS = [
  ["unknown", "未知"],
  ["low", "低"],
  ["medium", "中"],
  ["high", "高"],
];

const ROUND_TYPES = [
  ["first", "一面"],
  ["second", "二面"],
  ["third", "三面"],
  ["hr", "HR 面"],
  ["final", "终面"],
  ["other", "其他"],
];

const INTERVIEW_STATUSES = [
  ["scheduled", "已排期"],
  ["preparing", "准备中"],
  ["completed", "已完成"],
  ["reviewed", "已复盘"],
  ["cancelled", "已取消"],
];

const PREPARATION_STATUSES = [
  ["not_started", "未开始"],
  ["drafting", "整理中"],
  ["ready", "已准备"],
  ["needs_rework", "需要补强"],
];

const BRIEF_STATUSES = [
  ["draft", "草稿"],
  ["ready", "已准备"],
  ["needs_rework", "需要补强"],
];

const REVIEW_SELF_RATINGS = [
  ["great", "表现很好"],
  ["good", "整体不错"],
  ["mixed", "有好有坏"],
  ["weak", "明显偏弱"],
  ["failed", "严重失误"],
];

const REVIEW_RESULTS = [
  ["unknown", "未知"],
  ["passed", "通过"],
  ["failed", "未通过"],
  ["pending", "等待结果"],
  ["withdrawn", "主动放弃"],
];

const REVIEW_STATUSES = [
  ["draft", "草稿"],
  ["reviewed", "已复盘"],
  ["needs_followup", "需要追踪"],
];

const WEAKNESS_CATEGORIES = [
  ["project_depth", "项目深挖不足"],
  ["product_thinking", "产品判断不足"],
  ["ai_understanding", "AI 理解不足"],
  ["business_sense", "业务理解不足"],
  ["communication", "表达结构不稳"],
  ["case_analysis", "案例分析不足"],
  ["motivation", "动机与匹配度不足"],
  ["other", "其他"],
];

const SEVERITIES = [
  ["low", "低"],
  ["medium", "中"],
  ["high", "高"],
];

const WEAKNESS_STATUSES = [
  ["open", "待处理"],
  ["training", "训练中"],
  ["validating", "验证中"],
  ["repaired", "已修复"],
  ["archived", "已归档"],
];

const TRAINING_TASK_TYPES = [
  ["answer_rewrite", "重写回答"],
  ["mock_interview", "模拟面试"],
  ["project_deep_dive", "项目深挖"],
  ["case_practice", "案例练习"],
  ["knowledge_patch", "知识补齐"],
  ["expression_drill", "表达训练"],
  ["other", "其他"],
];

const TRAINING_TASK_STATUSES = [
  ["todo", "待做"],
  ["doing", "进行中"],
  ["reviewing", "待验收"],
  ["done", "已完成"],
  ["validated", "已验证"],
  ["cancelled", "已取消"],
];

const PROJECT_TYPES = [
  ["ai_product", "AI 产品项目"],
  ["data_product", "数据产品项目"],
  ["growth", "增长项目"],
  ["platform", "平台项目"],
  ["operation", "运营项目"],
  ["coursework", "课程 / 练习项目"],
  ["personal", "个人作品项目"],
  ["other", "其他"],
];

const PROJECT_AMMO_STATUSES = [
  ["draft", "草稿"],
  ["usable", "可用于面试"],
  ["needs_deepening", "需要深挖"],
  ["archived", "已归档"],
];

const FOLLOW_UP_QUESTION_TYPES = [
  ["role_depth", "你具体做了什么"],
  ["decision_logic", "为什么这么决策"],
  ["metric_result", "结果和指标"],
  ["tradeoff", "取舍判断"],
  ["failure_reflection", "失败与复盘"],
  ["ai_understanding", "AI 理解"],
  ["business_value", "业务价值"],
  ["other", "其他"],
];

const FOLLOW_UP_QUESTION_STATUSES = [
  ["unanswered", "未回答"],
  ["drafted", "已有草稿"],
  ["stable", "表达稳定"],
  ["needs_drill", "需要训练"],
];

const EXPRESSION_DRILL_SOURCE_TYPES = [
  ["follow_up_question", "项目追问"],
  ["weakness", "能力缺陷"],
  ["training_task", "训练任务"],
  ["interview_review", "面试复盘"],
];

const EXPRESSION_DRILL_SCORES = [
  ["unstable", "不稳定"],
  ["usable", "可用"],
  ["stable", "稳定"],
];

const EXPRESSION_DRILL_STATUSES = [
  ["todo", "待练"],
  ["practicing", "练习中"],
  ["reviewing", "待复核"],
  ["stable", "已稳定"],
  ["archived", "已归档"],
];

const EXPRESSION_SESSION_ATTEMPT_TYPES = [
  ["read_aloud", "朗读复述"],
  ["mock_interview", "模拟面试"],
  ["structured_rewrite", "结构重写"],
  ["fast_recall", "快速回忆"],
  ["review", "复核"],
];

const EXPRESSION_SESSION_STATUSES = [
  ["draft", "草稿"],
  ["practiced", "已练习"],
  ["needs_rework", "需要返工"],
  ["stable", "已稳定"],
  ["archived", "已归档"],
];

const PORTFOLIO_STATUSES = [
  ["draft", "草稿"],
  ["reviewing", "整理中"],
  ["ready", "可预览"],
  ["published_ready", "具备公开准备"],
];

const PORTFOLIO_VISIBILITIES = [
  ["private", "仅自己可见"],
  ["portfolio", "进入作品集"],
  ["hidden", "暂时隐藏"],
];

const PORTFOLIO_READINESS = [
  ["draft", "草稿"],
  ["needs_sanitizing", "需要脱敏"],
  ["needs_evidence", "需要补证据"],
  ["ready", "可展示"],
];

const AI_ANALYSIS_TYPES = [
  ["review_diagnosis", "面试复盘诊断"],
  ["jd_breakdown", "JD 拆解"],
  ["company_research", "公司/业务调研"],
  ["project_match", "项目匹配"],
  ["follow_up_questions", "追问生成"],
  ["answer_structure", "回答结构建议"],
  ["portfolio_polish", "作品集文案打磨"],
  ["weakness_repair", "缺陷修复建议"],
  ["other", "其他"],
];

const AI_ANALYSIS_SOURCE_TYPES = [
  ["opportunity", "岗位机会"],
  ["project_ammo", "项目弹药"],
  ["follow_up_question", "项目追问"],
  ["interview_review", "面试复盘"],
  ["weakness", "能力缺陷"],
  ["training_task", "训练任务"],
  ["portfolio_project", "作品集项目"],
  ["freeform", "自由输入"],
];

const AI_ANALYSIS_STATUSES = [
  ["draft", "草稿"],
  ["prompt_ready", "提示词已就绪"],
  ["ai_responded", "已粘贴 AI 输出"],
  ["decided", "已人工决策"],
  ["archived", "已归档"],
];

const AI_FRONTIER_CATEGORIES = [
  ["model_capability", "模型能力"],
  ["ai_product", "AI 产品"],
  ["agent_workflow", "Agent 工作流"],
  ["industry_case", "行业案例"],
  ["research_paper", "研究论文"],
  ["market_signal", "市场信号"],
  ["pm_framework", "PM 框架"],
  ["other", "其他"],
];

const AI_FRONTIER_STATUSES = [
  ["inbox", "待消化"],
  ["summarized", "已总结"],
  ["mapped", "已迁移"],
  ["applied", "已应用"],
  ["archived", "已归档"],
];

const RHYTHM_LEVELS = [
  ["low", "低"],
  ["medium", "中"],
  ["high", "高"],
];

const RHYTHM_STATUSES = [
  ["planned", "计划中"],
  ["active", "执行中"],
  ["recovery_needed", "需要恢复"],
  ["closed", "已收尾"],
  ["archived", "已归档"],
];

const MODULES = [
  ["dashboard", "总控调度器", "00"],
  ["pipeline", "求职中台", "01"],
  ["preInterview", "面试前作战室", "02"],
  ["postInterview", "面试后复盘室", "03"],
  ["projectAmmo", "项目弹药库", "04"],
  ["weakness", "能力缺陷档案", "05"],
  ["trainingPlan", "训练计划中心", "06"],
  ["aiFrontier", "AI 前沿框架", "07"],
  ["portfolio", "作品集产品线", "08"],
  ["rhythm", "节奏运营官", "09"],
  ["expressionLab", "表达训练室", "10"],
  ["aiAnalysis", "AI 辅助分析", "AI"],
  ["globalSearch", "全局检索", "⌕"],
];

const GLOBAL_SEARCH_FILTERS = [
  ["all", "全部内容"],
  ["opportunity", "岗位机会"],
  ["interview", "面试轮次"],
  ["brief", "面试前 Brief"],
  ["review", "面试复盘"],
  ["weakness", "能力缺陷"],
  ["trainingTask", "训练任务"],
  ["projectAmmo", "项目弹药"],
  ["followUpQuestion", "项目追问"],
  ["expressionDrill", "表达训练"],
  ["expressionSession", "练习记录"],
  ["portfolioProject", "作品集项目"],
  ["aiAnalysis", "AI 分析"],
  ["aiFrontier", "AI 前沿"],
  ["rhythm", "个人节奏"],
];

const TRAINING_PLAN_VIEWS = [
  ["overview", "总览"],
  ["week", "本周"],
  ["reviewing", "待验收"],
  ["validated", "已验证"],
];

const DUE_BUCKET_LABELS = [
  ["overdue", "已逾期"],
  ["today", "今天到期"],
  ["soon", "7 天内"],
  ["future", "未来"],
  ["none", "未设截止"],
];

const EMPTY_OPPORTUNITY = {
  companyName: "",
  roleTitle: "",
  jdUrl: "",
  jdText: "",
  source: "",
  stage: "collected",
  priority: "medium",
  riskLevel: "unknown",
  nextAction: "",
  nextActionDueAt: "",
  notes: "",
};

const EMPTY_INTERVIEW = {
  opportunityId: "",
  companyName: "",
  roleTitle: "",
  roundName: "",
  roundType: "first",
  scheduledAt: "",
  interviewer: "",
  location: "",
  status: "scheduled",
  preparationStatus: "not_started",
  nextAction: "",
  notes: "",
};

const EMPTY_BRIEF = {
  opportunityId: "",
  interviewRoundId: "",
  companyResearch: "",
  businessSummary: "",
  productSummary: "",
  jdRequirements: "",
  hiddenExpectations: "",
  matchingEvidence: "",
  riskGaps: "",
  projectMapping: "",
  questionPredictions: "",
  highRiskQuestions: "",
  prepChecklist: "",
  status: "draft",
};

const EMPTY_REVIEW = {
  opportunityId: "",
  interviewRoundId: "",
  companyName: "",
  roleTitle: "",
  roundName: "",
  actualQuestions: "",
  strongAnswers: "",
  weakAnswers: "",
  failurePoints: "",
  interviewerSignals: "",
  selfRating: "mixed",
  result: "unknown",
  summary: "",
  linkedWeaknessIds: [],
  linkedTrainingTaskIds: [],
  status: "draft",
};

const EMPTY_WEAKNESS = {
  title: "",
  category: "other",
  description: "",
  evidence: "",
  severity: "medium",
  frequency: 1,
  status: "open",
  relatedOpportunityIds: [],
  relatedInterviewRoundIds: [],
  relatedReviewIds: [],
  linkedTrainingTaskIds: [],
};

const EMPTY_TRAINING_TASK = {
  weaknessId: "",
  title: "",
  taskType: "answer_rewrite",
  targetAbility: "",
  practiceOutput: "",
  acceptanceCriteria: "",
  status: "todo",
  dueAt: "",
  validationNote: "",
  relatedReviewId: "",
  relatedInterviewRoundId: "",
};

const EMPTY_PROJECT_AMMO = {
  projectName: "",
  projectType: "personal",
  role: "",
  period: "",
  background: "",
  goal: "",
  actions: "",
  result: "",
  metrics: "",
  evidence: "",
  aiRelevance: "",
  pmCompetencies: "",
  riskQuestions: "",
  linkedWeaknessIds: [],
  linkedTrainingTaskIds: [],
  status: "draft",
};

const EMPTY_FOLLOW_UP_QUESTION = {
  projectAmmoId: "",
  question: "",
  questionType: "other",
  riskLevel: "unknown",
  answerDraft: "",
  stableAnswer: "",
  evidence: "",
  status: "unanswered",
  linkedWeaknessIds: [],
};

const EMPTY_EXPRESSION_DRILL = {
  sourceType: "follow_up_question",
  sourceId: "",
  question: "",
  targetAnswer: "",
  practiceRecord: "",
  score: "unstable",
  status: "todo",
  nextAction: "",
  linkedTrainingTaskId: "",
};

const EMPTY_EXPRESSION_SESSION = {
  drillId: "",
  question: "",
  practicedAt: "",
  attemptType: "read_aloud",
  durationMinutes: "",
  selfRating: "unstable",
  blockers: "",
  improvedAnswer: "",
  reviewerNote: "",
  stabilityEvidence: "",
  nextAction: "",
  status: "draft",
};

const EMPTY_PORTFOLIO_PROFILE = {
  displayName: "",
  headline: "",
  targetRole: "",
  location: "",
  summary: "",
  coreSkills: "",
  contactNote: "",
  portfolioStatus: "draft",
  publishChecklist:
    "隐藏敏感公司、业务、数据\n保留足够证据但不泄露隐私\n项目结果真实、可解释\n项目角色表述准确\n至少 2 个可展示项目\n联系方式适合公开",
};

const EMPTY_PORTFOLIO_PROJECT = {
  projectAmmoId: "",
  projectName: "",
  displayTitle: "",
  subtitle: "",
  summary: "",
  role: "",
  period: "",
  problem: "",
  solution: "",
  impact: "",
  metrics: "",
  skills: "",
  evidence: "",
  privacyNote: "",
  sortOrder: 100,
  visibility: "private",
  readiness: "draft",
};

const EMPTY_AI_ANALYSIS_NOTE = {
  analysisType: "project_match",
  sourceType: "freeform",
  sourceId: "",
  sourceTitle: "",
  title: "",
  contextSnapshot: "",
  promptDraft: "",
  aiResponse: "",
  candidateSchemaVersion: "",
  structuredResponse: "",
  analysisSummary: "",
  failurePointCandidates: [],
  weaknessCandidates: [],
  trainingTaskCandidates: [],
  humanDecision: "",
  nextAction: "",
  status: "prompt_ready",
};

const EMPTY_AI_FRONTIER_CARD = {
  topic: "",
  category: "ai_product",
  sourceName: "",
  sourceUrl: "",
  sourceDate: "",
  summary: "",
  keyInsights: "",
  productImplications: "",
  interviewTransfer: "",
  portfolioTransfer: "",
  openQuestions: "",
  tags: "",
  status: "inbox",
  priority: "medium",
};

const EMPTY_RHYTHM_LOG = {
  date: "",
  title: "",
  energyLevel: "medium",
  focusLevel: "medium",
  loadLevel: "medium",
  recoveryLevel: "medium",
  sleepHours: "",
  interviewLoad: "",
  trainingLoad: "",
  plannedFocus: "",
  recoveryAction: "",
  rhythmRisk: "medium",
  nextAdjustment: "",
  notes: "",
  status: "active",
};

const state = {
  activeModule: "dashboard",
  opportunities: [],
  interviews: [],
  briefs: [],
  reviews: [],
  weaknesses: [],
  trainingTasks: [],
  projectAmmos: [],
  followUpQuestions: [],
  expressionDrills: [],
  expressionSessions: [],
  portfolioProfile: { ...EMPTY_PORTFOLIO_PROFILE },
  portfolioProjects: [],
  portfolioPreviewMode: false,
  aiAnalysisNotes: [],
  aiFrontierCards: [],
  rhythmLogs: [],
  systemSnapshot: null,
  selectedId: null,
  selectedInterviewId: null,
  selectedBriefId: null,
  selectedReviewId: null,
  selectedWeaknessId: null,
  selectedTrainingTaskId: null,
  selectedProjectAmmoId: null,
  selectedFollowUpQuestionId: null,
  selectedExpressionDrillId: null,
  selectedExpressionSessionId: null,
  globalSearchQuery: "",
  globalSearchFilter: "all",
  pipelineFilters: {
    stage: "all",
    priority: "all",
    riskLevel: "all",
    nextAction: "all",
    interview: "all",
  },
  trainingPlanView: "overview",
  selectedPortfolioProjectId: null,
  selectedAiAnalysisNoteId: null,
  selectedAiFrontierCardId: null,
  selectedRhythmLogId: null,
  draft: null,
  interviewDraft: null,
  briefDraft: null,
  reviewDraft: null,
  weaknessDraft: null,
  trainingTaskDraft: null,
  projectAmmoDraft: null,
  followUpQuestionDraft: null,
  expressionDrillDraft: null,
  expressionSessionDraft: null,
  portfolioProjectDraft: null,
  aiAnalysisNoteDraft: null,
  aiFrontierCardDraft: null,
  rhythmLogDraft: null,
  loading: true,
  saving: false,
  savingInterview: false,
  savingBrief: false,
  savingReview: false,
  savingWeakness: false,
  savingTrainingTask: false,
  savingProjectAmmo: false,
  savingFollowUpQuestion: false,
  savingExpressionDrill: false,
  savingExpressionSession: false,
  savingPortfolioProfile: false,
  savingPortfolioProject: false,
  savingAiAnalysisNote: false,
  parsingAiCandidates: false,
  actingAiCandidateId: null,
  savingAiFrontierCard: false,
  savingRhythmLog: false,
  quickSavingOpportunityId: null,
  generatingAiContext: false,
};

const app = document.querySelector("#app");
const toast = document.createElement("div");
toast.className = "toast";
document.body.appendChild(toast);

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function optionLabel(options, value) {
  return options.find(([key]) => key === value)?.[1] || value || "-";
}

function showToast(message, type = "success") {
  toast.textContent = message;
  toast.classList.remove("success", "error", "info");
  toast.classList.add(type);
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function showInfo(message) {
  showToast(message, "info");
}

function showError(message) {
  showToast(message, "error");
}

function disabledAttr(value) {
  return value ? " disabled" : "";
}

function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function api(path, options = {}) {
  const method = String(options.method || "GET").toUpperCase();
  const response = await fetch(path, {
    headers: { "content-type": "application/json" },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "请求失败");
  }
  if (method !== "GET") {
    state.systemSnapshot = null;
  }
  return payload;
}

async function loadData() {
  state.loading = true;
  render();
  try {
    const [
      opportunitiesPayload,
      interviewsPayload,
      briefsPayload,
      reviewsPayload,
      weaknessesPayload,
      trainingTasksPayload,
      projectAmmosPayload,
      followUpQuestionsPayload,
      expressionDrillsPayload,
      expressionSessionsPayload,
      portfolioProfilePayload,
      portfolioProjectsPayload,
      aiAnalysisNotesPayload,
      aiFrontierCardsPayload,
      rhythmLogsPayload,
      systemSnapshotPayload,
    ] = await Promise.all([
      api("/api/opportunities"),
      api("/api/interviews"),
      api("/api/pre-interview-briefs"),
      api("/api/interview-reviews"),
      api("/api/weaknesses"),
      api("/api/training-tasks"),
      api("/api/project-ammos"),
      api("/api/follow-up-questions"),
      api("/api/expression-drills"),
      api("/api/expression-sessions"),
      api("/api/portfolio-profile"),
      api("/api/portfolio-projects"),
      api("/api/ai-analysis-notes"),
      api("/api/ai-frontier-cards"),
      api("/api/rhythm-logs"),
      api("/api/system-snapshot").catch(() => null),
    ]);
    state.opportunities = opportunitiesPayload.opportunities || [];
    state.interviews = interviewsPayload.interviews || [];
    state.briefs = briefsPayload.briefs || [];
    state.reviews = reviewsPayload.reviews || [];
    state.weaknesses = weaknessesPayload.weaknesses || [];
    state.trainingTasks = trainingTasksPayload.tasks || [];
    state.projectAmmos = projectAmmosPayload.projectAmmos || [];
    state.followUpQuestions = followUpQuestionsPayload.followUpQuestions || [];
    state.expressionDrills = expressionDrillsPayload.expressionDrills || [];
    state.expressionSessions = expressionSessionsPayload.expressionSessions || [];
    state.portfolioProfile = portfolioProfilePayload.profile || { ...EMPTY_PORTFOLIO_PROFILE };
    state.portfolioProjects = portfolioProjectsPayload.portfolioProjects || [];
    state.aiAnalysisNotes = aiAnalysisNotesPayload.aiAnalysisNotes || [];
    state.aiFrontierCards = aiFrontierCardsPayload.aiFrontierCards || [];
    state.rhythmLogs = rhythmLogsPayload.rhythmLogs || [];
    state.systemSnapshot = systemSnapshotPayload?.snapshot || null;
    if (!state.selectedId && state.opportunities.length) {
      state.selectedId = state.opportunities[0].id;
    }
    if (!state.selectedInterviewId && state.selectedId) {
      state.selectedInterviewId = interviewsForOpportunity(state.selectedId)[0]?.id || null;
    }
    if (!state.selectedBriefId && state.selectedInterviewId) {
      state.selectedBriefId = briefForInterview(state.selectedInterviewId)?.id || null;
    }
    if (!state.selectedReviewId && state.selectedInterviewId) {
      state.selectedReviewId = reviewForInterview(state.selectedInterviewId)?.id || null;
    }
    if (!state.selectedWeaknessId && state.weaknesses.length) {
      state.selectedWeaknessId = state.weaknesses[0].id;
    }
    if (!state.selectedTrainingTaskId && state.selectedWeaknessId) {
      state.selectedTrainingTaskId = tasksForWeakness(state.selectedWeaknessId)[0]?.id || null;
    }
    if (!state.selectedProjectAmmoId && state.projectAmmos.length) {
      state.selectedProjectAmmoId = state.projectAmmos[0].id;
    }
    if (state.selectedProjectAmmoId) {
      const questions = questionsForProjectAmmo(state.selectedProjectAmmoId);
      const stillSelected = questions.some((item) => item.id === state.selectedFollowUpQuestionId);
      state.selectedFollowUpQuestionId = stillSelected
        ? state.selectedFollowUpQuestionId
        : questions[0]?.id || null;
    }
    if (state.selectedFollowUpQuestionId) {
      const drills = drillsForFollowUpQuestion(state.selectedFollowUpQuestionId);
      const stillSelected = drills.some((item) => item.id === state.selectedExpressionDrillId);
      state.selectedExpressionDrillId = stillSelected ? state.selectedExpressionDrillId : drills[0]?.id || null;
    }
    if (!state.selectedPortfolioProjectId && state.portfolioProjects.length) {
      state.selectedPortfolioProjectId = state.portfolioProjects[0].id;
    }
    if (!state.selectedAiAnalysisNoteId && state.aiAnalysisNotes.length) {
      state.selectedAiAnalysisNoteId = state.aiAnalysisNotes[0].id;
    }
    if (!state.selectedAiFrontierCardId && state.aiFrontierCards.length) {
      state.selectedAiFrontierCardId = state.aiFrontierCards[0].id;
    }
    if (!state.selectedRhythmLogId && state.rhythmLogs.length) {
      state.selectedRhythmLogId = state.rhythmLogs[0].id;
    }
    if (!state.selectedExpressionSessionId && state.expressionSessions.length) {
      state.selectedExpressionSessionId = state.expressionSessions[0].id;
    }
  } catch (error) {
    showError(error.message);
  } finally {
    state.loading = false;
    render();
  }
}

const loadOpportunities = loadData;

function selectedOpportunity() {
  if (state.draft) return state.draft;
  return state.opportunities.find((item) => item.id === state.selectedId) || null;
}

function interviewsForOpportunity(opportunityId) {
  return state.interviews
    .filter((interview) => interview.opportunityId === opportunityId)
    .sort((a, b) => {
      const scheduled = String(a.scheduledAt || "").localeCompare(String(b.scheduledAt || ""));
      if (scheduled) return scheduled;
      return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
    });
}

function nextInterviewForOpportunity(opportunityId) {
  const interviews = interviewsForOpportunity(opportunityId).filter(
    (interview) => !["completed", "reviewed", "cancelled"].includes(interview.status),
  );
  return interviews[0] || null;
}

function selectedInterview() {
  if (state.interviewDraft) return state.interviewDraft;
  return state.interviews.find((item) => item.id === state.selectedInterviewId) || null;
}

function briefForInterview(interviewRoundId) {
  return state.briefs
    .filter((brief) => brief.interviewRoundId === interviewRoundId)
    .sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")))[0] || null;
}

function briefStatusForInterview(interviewRoundId) {
  const brief = briefForInterview(interviewRoundId);
  return brief ? optionLabel(BRIEF_STATUSES, brief.status) : "未创建 Brief";
}

function selectedBrief() {
  if (state.briefDraft) return state.briefDraft;
  return state.briefs.find((item) => item.id === state.selectedBriefId) || null;
}

function reviewForInterview(interviewRoundId) {
  return state.reviews
    .filter((review) => review.interviewRoundId === interviewRoundId)
    .sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")))[0] || null;
}

function selectedReview() {
  if (state.reviewDraft) return state.reviewDraft;
  return state.reviews.find((item) => item.id === state.selectedReviewId) || null;
}

function selectedWeakness() {
  if (state.weaknessDraft) return state.weaknessDraft;
  return state.weaknesses.find((item) => item.id === state.selectedWeaknessId) || null;
}

function selectWeakness(id) {
  state.selectedWeaknessId = id;
  state.weaknessDraft = null;
  state.trainingTaskDraft = null;
  state.selectedTrainingTaskId = tasksForWeakness(id)[0]?.id || null;
  state.expressionDrillDraft = null;
  state.selectedExpressionDrillId =
    drillsForSource("weakness", id)[0]?.id ||
    (state.selectedTrainingTaskId ? drillsForSource("training_task", state.selectedTrainingTaskId)[0]?.id : null) ||
    null;
  render();
}

function beginNewWeakness(seed = {}) {
  state.activeModule = "weakness";
  state.weaknessDraft = { ...EMPTY_WEAKNESS, ...seed };
  state.selectedWeaknessId = null;
  state.selectedTrainingTaskId = null;
  state.trainingTaskDraft = null;
  state.expressionDrillDraft = null;
  state.selectedExpressionDrillId = null;
  render();
}

function tasksForWeakness(weaknessId) {
  return state.trainingTasks.filter((task) => task.weaknessId === weaknessId);
}

function selectedTrainingTask() {
  if (state.trainingTaskDraft) return state.trainingTaskDraft;
  return state.trainingTasks.find((item) => item.id === state.selectedTrainingTaskId) || null;
}

function selectTrainingTask(id) {
  const task = state.trainingTasks.find((item) => item.id === id);
  state.selectedTrainingTaskId = id;
  if (task?.weaknessId) {
    state.selectedWeaknessId = task.weaknessId;
  }
  state.trainingTaskDraft = null;
  state.expressionDrillDraft = null;
  state.selectedExpressionDrillId = drillsForSource("training_task", id)[0]?.id || null;
  render();
}

function beginTrainingTaskForSelectedWeakness() {
  const weakness = selectedWeakness();
  if (!weakness?.id) {
    showInfo("请先选择或保存一个能力缺陷");
    return;
  }

  state.trainingTaskDraft = {
    ...EMPTY_TRAINING_TASK,
    weaknessId: weakness.id,
    title: `修复：${weakness.title}`,
    targetAbility: weakness.description,
    practiceOutput: "",
    acceptanceCriteria: "能用结构化回答清楚说明，并经复盘确认可用。",
    relatedReviewId: weakness.relatedReviewIds?.[0] || "",
    relatedInterviewRoundId: weakness.relatedInterviewRoundIds?.[0] || "",
  };
  state.selectedTrainingTaskId = null;
  render();
}

function selectedProjectAmmo() {
  if (state.projectAmmoDraft) return state.projectAmmoDraft;
  return state.projectAmmos.find((item) => item.id === state.selectedProjectAmmoId) || null;
}

function questionsForProjectAmmo(projectAmmoId) {
  return state.followUpQuestions.filter((item) => item.projectAmmoId === projectAmmoId);
}

function selectedFollowUpQuestion() {
  if (state.followUpQuestionDraft) return state.followUpQuestionDraft;
  return state.followUpQuestions.find((item) => item.id === state.selectedFollowUpQuestionId) || null;
}

function drillsForSource(sourceType, sourceId) {
  return state.expressionDrills.filter((item) => item.sourceType === sourceType && item.sourceId === sourceId);
}

function drillsForFollowUpQuestion(questionId) {
  return drillsForSource("follow_up_question", questionId);
}

function selectedExpressionDrill() {
  if (state.expressionDrillDraft) return state.expressionDrillDraft;
  return state.expressionDrills.find((item) => item.id === state.selectedExpressionDrillId) || null;
}

function sessionsForDrill(drillId) {
  return state.expressionSessions.filter((item) => item.drillId === drillId);
}

function selectedExpressionSession() {
  if (state.expressionSessionDraft) return state.expressionSessionDraft;
  return state.expressionSessions.find((item) => item.id === state.selectedExpressionSessionId) || null;
}

function selectedPortfolioProject() {
  if (state.portfolioProjectDraft) return state.portfolioProjectDraft;
  return state.portfolioProjects.find((item) => item.id === state.selectedPortfolioProjectId) || null;
}

function selectedAiAnalysisNote() {
  if (state.aiAnalysisNoteDraft) return state.aiAnalysisNoteDraft;
  return state.aiAnalysisNotes.find((item) => item.id === state.selectedAiAnalysisNoteId) || null;
}

function selectedAiFrontierCard() {
  if (state.aiFrontierCardDraft) return state.aiFrontierCardDraft;
  return state.aiFrontierCards.find((item) => item.id === state.selectedAiFrontierCardId) || null;
}

function selectedRhythmLog() {
  if (state.rhythmLogDraft) return state.rhythmLogDraft;
  return state.rhythmLogs.find((item) => item.id === state.selectedRhythmLogId) || null;
}

function portfolioProjectsInPreview() {
  return state.portfolioProjects
    .filter((item) => item.visibility === "portfolio")
    .sort((a, b) => (Number(a.sortOrder) || 100) - (Number(b.sortOrder) || 100));
}

function portfolioMetrics() {
  const inPreview = portfolioProjectsInPreview();
  return {
    total: state.portfolioProjects.length,
    inPreview: inPreview.length,
    ready: state.portfolioProjects.filter((item) => item.readiness === "ready").length,
    needsWork: state.portfolioProjects.filter((item) => item.readiness !== "ready").length,
  };
}

function aiAnalysisMetrics() {
  return {
    total: state.aiAnalysisNotes.length,
    promptReady: state.aiAnalysisNotes.filter((item) => item.status === "prompt_ready").length,
    responded: state.aiAnalysisNotes.filter((item) => item.status === "ai_responded").length,
    decided: state.aiAnalysisNotes.filter((item) => item.status === "decided").length,
  };
}

function aiFrontierMetrics() {
  return {
    total: state.aiFrontierCards.length,
    inbox: state.aiFrontierCards.filter((item) => item.status === "inbox").length,
    mapped: state.aiFrontierCards.filter((item) => ["mapped", "applied"].includes(item.status)).length,
    high: state.aiFrontierCards.filter((item) => item.priority === "high").length,
  };
}

function rhythmMetrics() {
  return {
    total: state.rhythmLogs.length,
    recoveryNeeded: state.rhythmLogs.filter((item) => item.status === "recovery_needed").length,
    highLoad: state.rhythmLogs.filter((item) => item.loadLevel === "high").length,
    lowEnergy: state.rhythmLogs.filter((item) => item.energyLevel === "low").length,
  };
}

function expressionLabMetrics() {
  return {
    total: state.expressionDrills.length,
    unstable: state.expressionDrills.filter((item) => item.score !== "stable" || item.status !== "stable").length,
    sessions: state.expressionSessions.length,
    stableSessions: state.expressionSessions.filter((item) => item.status === "stable" || item.selfRating === "stable").length,
  };
}

function searchText(parts) {
  return parts
    .filter((part) => part !== undefined && part !== null)
    .map((part) => String(part))
    .join(" ")
    .toLowerCase();
}

function matchesSearchQuery(text, query) {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);
  if (!terms.length) return true;
  return terms.every((term) => text.includes(term));
}

function createSearchResult(type, id, title, meta, content, updatedAt, badges = []) {
  const typeLabel = optionLabel(GLOBAL_SEARCH_FILTERS, type);
  return {
    key: `${type}:${id}`,
    type,
    id,
    title: title || "未命名记录",
    meta,
    content,
    updatedAt,
    badges: badges.filter(Boolean),
    searchable: searchText([type, typeLabel, title, meta, content, updatedAt, ...badges]),
  };
}

function createGlobalSearchResults() {
  const query = state.globalSearchQuery.trim();
  const filter = state.globalSearchFilter || "all";
  const results = [];

  state.opportunities.forEach((item) => {
    results.push(
      createSearchResult(
        "opportunity",
        item.id,
        `${item.companyName} - ${item.roleTitle}`,
        "求职中台",
        [item.source, item.nextAction, item.jdUrl, item.jdText, item.notes].join(" "),
        item.updatedAt,
        [optionLabel(STAGES, item.stage), optionLabel(PRIORITIES, item.priority), optionLabel(RISK_LEVELS, item.riskLevel)],
      ),
    );
  });

  state.interviews.forEach((item) => {
    results.push(
      createSearchResult(
        "interview",
        item.id,
        `${item.companyName || "未知公司"} - ${item.roundName || optionLabel(ROUND_TYPES, item.roundType)}`,
        "面试轮次",
        [item.roleTitle, item.interviewer, item.location, item.nextAction, item.notes].join(" "),
        item.updatedAt,
        [optionLabel(ROUND_TYPES, item.roundType), optionLabel(INTERVIEW_STATUSES, item.status)],
      ),
    );
  });

  state.briefs.forEach((item) => {
    results.push(
      createSearchResult(
        "brief",
        item.id,
        item.companyName ? `${item.companyName} - 面试前 Brief` : "面试前 Brief",
        "面试前作战室",
        [item.roleTitle, item.companyResearch, item.jdBreakdown, item.questionPrediction, item.projectMapping, item.riskChecklist, item.prepNotes].join(" "),
        item.updatedAt,
        [optionLabel(BRIEF_STATUSES, item.status)],
      ),
    );
  });

  state.reviews.forEach((item) => {
    results.push(
      createSearchResult(
        "review",
        item.id,
        item.companyName ? `${item.companyName} - 面试复盘` : "面试复盘",
        "面试后复盘室",
        [item.roleTitle, item.overallSummary, item.questionLog, item.stuckPoints, item.answerRating, item.nextFixPlan, item.notes].join(" "),
        item.updatedAt,
        [optionLabel(REVIEW_STATUSES, item.status), optionLabel(REVIEW_SELF_RATINGS, item.selfRating)],
      ),
    );
  });

  state.weaknesses.forEach((item) => {
    results.push(
      createSearchResult(
        "weakness",
        item.id,
        item.title,
        "缺陷与训练中心",
        [item.description, item.evidence, item.fixPlan, item.validationSignal, item.notes].join(" "),
        item.updatedAt,
        [optionLabel(WEAKNESS_CATEGORIES, item.category), optionLabel(WEAKNESS_STATUSES, item.status)],
      ),
    );
  });

  state.trainingTasks.forEach((item) => {
    results.push(
      createSearchResult(
        "trainingTask",
        item.id,
        item.title,
        "训练任务",
        [item.targetAbility, item.practiceOutput, item.acceptanceCriteria, item.validationNote, item.dueAt].join(" "),
        item.updatedAt,
        [optionLabel(TRAINING_TASK_TYPES, item.taskType), optionLabel(TRAINING_TASK_STATUSES, item.status)],
      ),
    );
  });

  state.projectAmmos.forEach((item) => {
    results.push(
      createSearchResult(
        "projectAmmo",
        item.id,
        item.projectName,
        "项目弹药库",
        [item.role, item.period, item.background, item.goal, item.actions, item.result, item.metrics, item.evidence, item.reflection, item.highlights, item.risks].join(" "),
        item.updatedAt,
        [optionLabel(PROJECT_TYPES, item.projectType), optionLabel(PROJECT_AMMO_STATUSES, item.status)],
      ),
    );
  });

  state.followUpQuestions.forEach((item) => {
    results.push(
      createSearchResult(
        "followUpQuestion",
        item.id,
        item.question,
        "项目追问",
        [item.answerDraft, item.stableAnswer, item.riskPoint, item.nextAction].join(" "),
        item.updatedAt,
        [optionLabel(FOLLOW_UP_QUESTION_TYPES, item.questionType), optionLabel(FOLLOW_UP_QUESTION_STATUSES, item.status)],
      ),
    );
  });

  state.expressionDrills.forEach((item) => {
    results.push(
      createSearchResult(
        "expressionDrill",
        item.id,
        item.question,
        "表达训练",
        [item.targetAnswer, item.practiceRecord, item.feedback, item.nextAction].join(" "),
        item.updatedAt,
        [optionLabel(EXPRESSION_DRILL_SOURCE_TYPES, item.sourceType), optionLabel(EXPRESSION_DRILL_STATUSES, item.status), optionLabel(EXPRESSION_DRILL_SCORES, item.score)],
      ),
    );
  });

  state.expressionSessions.forEach((item) => {
    results.push(
      createSearchResult(
        "expressionSession",
        item.id,
        item.question,
        "表达练习记录",
        [item.blockers, item.improvedAnswer, item.reviewerNote, item.stabilityEvidence, item.nextAction].join(" "),
        item.updatedAt || item.practicedAt,
        [optionLabel(EXPRESSION_SESSION_ATTEMPT_TYPES, item.attemptType), optionLabel(EXPRESSION_SESSION_STATUSES, item.status), optionLabel(EXPRESSION_DRILL_SCORES, item.selfRating)],
      ),
    );
  });

  state.portfolioProjects.forEach((item) => {
    results.push(
      createSearchResult(
        "portfolioProject",
        item.id,
        item.displayTitle || item.projectName,
        "作品集项目",
        [item.subtitle, item.summary, item.problem, item.solution, item.impact, item.metrics, item.skills, item.evidence, item.privacyNote].join(" "),
        item.updatedAt,
        [item.visibility, item.readiness],
      ),
    );
  });

  state.aiAnalysisNotes.forEach((item) => {
    results.push(
      createSearchResult(
        "aiAnalysis",
        item.id,
        item.title,
        "AI 辅助分析",
        [item.sourceTitle, item.contextSnapshot, item.promptDraft, item.aiResponse, item.humanDecision, item.nextAction].join(" "),
        item.updatedAt,
        [optionLabel(AI_ANALYSIS_TYPES, item.analysisType), optionLabel(AI_ANALYSIS_STATUSES, item.status)],
      ),
    );
  });

  state.aiFrontierCards.forEach((item) => {
    results.push(
      createSearchResult(
        "aiFrontier",
        item.id,
        item.topic,
        "AI 前沿思维框架",
        [item.sourceName, item.sourceUrl, item.summary, item.keyInsights, item.productImplications, item.interviewTransfer, item.portfolioTransfer, item.openQuestions, item.tags].join(" "),
        item.updatedAt,
        [optionLabel(AI_FRONTIER_CATEGORIES, item.category), optionLabel(AI_FRONTIER_STATUSES, item.status), optionLabel(PRIORITIES, item.priority)],
      ),
    );
  });

  state.rhythmLogs.forEach((item) => {
    results.push(
      createSearchResult(
        "rhythm",
        item.id,
        item.title || item.date || "个人节奏记录",
        "个人节奏运营官",
        [item.plannedFocus, item.recoveryAction, item.nextAdjustment, item.notes].join(" "),
        item.updatedAt || item.date,
        [optionLabel(RHYTHM_STATUSES, item.status), `风险 ${optionLabel(RHYTHM_LEVELS, item.rhythmRisk)}`],
      ),
    );
  });

  return results
    .filter((item) => (filter === "all" || item.type === filter) && matchesSearchQuery(item.searchable, query))
    .sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")))
    .slice(0, query ? 80 : 24);
}

function globalSearchMetrics() {
  const allResults = createGlobalSearchResults();
  const totalRecords =
    state.opportunities.length +
    state.interviews.length +
    state.briefs.length +
    state.reviews.length +
    state.weaknesses.length +
    state.trainingTasks.length +
    state.projectAmmos.length +
    state.followUpQuestions.length +
    state.expressionDrills.length +
    state.expressionSessions.length +
    state.portfolioProjects.length +
    state.aiAnalysisNotes.length +
    state.aiFrontierCards.length +
    state.rhythmLogs.length;

  return {
    totalRecords,
    visibleResults: allResults.length,
    activeFilter: optionLabel(GLOBAL_SEARCH_FILTERS, state.globalSearchFilter),
  };
}

function selectProjectAmmo(id) {
  state.selectedProjectAmmoId = id;
  state.projectAmmoDraft = null;
  state.followUpQuestionDraft = null;
  state.expressionDrillDraft = null;
  state.selectedFollowUpQuestionId = questionsForProjectAmmo(id)[0]?.id || null;
  state.selectedExpressionDrillId = state.selectedFollowUpQuestionId
    ? drillsForFollowUpQuestion(state.selectedFollowUpQuestionId)[0]?.id || null
    : null;
  render();
}

function selectPortfolioProject(id) {
  state.selectedPortfolioProjectId = id;
  state.portfolioProjectDraft = null;
  render();
}

function selectAiAnalysisNote(id) {
  state.selectedAiAnalysisNoteId = id;
  state.aiAnalysisNoteDraft = null;
  render();
}

function selectAiFrontierCard(id) {
  state.selectedAiFrontierCardId = id;
  state.aiFrontierCardDraft = null;
  render();
}

function selectRhythmLog(id) {
  state.selectedRhythmLogId = id;
  state.rhythmLogDraft = null;
  render();
}

function openAiAnalysisNote(id) {
  state.activeModule = "aiAnalysis";
  selectAiAnalysisNote(id);
}

function openAiFrontierCard(id) {
  state.activeModule = "aiFrontier";
  selectAiFrontierCard(id);
}

function openRhythmLog(id) {
  state.activeModule = "rhythm";
  selectRhythmLog(id);
}

function openGlobalSearchResult(key) {
  const [type, ...idParts] = key.split(":");
  const id = idParts.join(":");

  if (type === "opportunity") {
    state.activeModule = "pipeline";
    selectOpportunity(id);
    return;
  }
  if (type === "interview") {
    const interview = state.interviews.find((item) => item.id === id);
    if (interview?.opportunityId) {
      state.selectedId = interview.opportunityId;
    }
    state.activeModule = "pipeline";
    selectInterview(id);
    return;
  }
  if (type === "brief") {
    const brief = state.briefs.find((item) => item.id === id);
    if (brief?.interviewRoundId) openPreInterviewForInterview(brief.interviewRoundId);
    return;
  }
  if (type === "review") {
    const review = state.reviews.find((item) => item.id === id);
    if (review?.interviewRoundId) openReviewForInterview(review.interviewRoundId);
    return;
  }
  if (type === "weakness") {
    openWeakness(id);
    return;
  }
  if (type === "trainingTask") {
    openTrainingTask(id);
    return;
  }
  if (type === "projectAmmo") {
    openProjectAmmo(id);
    return;
  }
  if (type === "followUpQuestion") {
    openFollowUpQuestion(id);
    return;
  }
  if (type === "expressionDrill") {
    state.activeModule = "expressionLab";
    openExpressionDrill(id);
    return;
  }
  if (type === "expressionSession") {
    openExpressionSession(id);
    return;
  }
  if (type === "portfolioProject") {
    state.activeModule = "portfolio";
    state.portfolioPreviewMode = false;
    selectPortfolioProject(id);
    return;
  }
  if (type === "aiAnalysis") {
    openAiAnalysisNote(id);
    return;
  }
  if (type === "aiFrontier") {
    openAiFrontierCard(id);
    return;
  }
  if (type === "rhythm") {
    openRhythmLog(id);
  }
}

function openDispatchItem(id) {
  const item = createDispatchQueue().find((entry) => entry.id === id);
  if (!item) return;

  if (item.module === "pipeline") {
    state.activeModule = "pipeline";
    selectOpportunity(item.targetId);
    return;
  }
  if (item.module === "preInterview") {
    openPreInterviewForInterview(item.targetId);
    return;
  }
  if (item.module === "postInterview") {
    openReviewForInterview(item.targetId);
    return;
  }
  if (item.module === "weakness") {
    openWeakness(item.targetId);
    return;
  }
  if (item.module === "trainingTask") {
    openTrainingTask(item.targetId);
    return;
  }
  if (item.module === "projectAmmo") {
    openProjectAmmo(item.targetId);
    return;
  }
  if (item.module === "followUpQuestion") {
    openFollowUpQuestion(item.targetId);
    return;
  }
  if (item.module === "expressionDrill") {
    state.activeModule = "expressionLab";
    openExpressionDrill(item.targetId);
    return;
  }
  if (item.module === "expressionSession") {
    openExpressionSession(item.targetId);
    return;
  }
  if (item.module === "portfolio") {
    state.activeModule = "portfolio";
    state.portfolioPreviewMode = false;
    selectPortfolioProject(item.targetId);
    return;
  }
  if (item.module === "aiAnalysis") {
    openAiAnalysisNote(item.targetId);
    return;
  }
  if (item.module === "aiFrontier") {
    openAiFrontierCard(item.targetId);
    return;
  }
  if (item.module === "rhythm") {
    openRhythmLog(item.targetId);
  }
}

function sourceOptionsForType(sourceType) {
  const maps = {
    opportunity: state.opportunities.map((item) => [item.id, `${item.companyName} - ${item.roleTitle}`]),
    project_ammo: state.projectAmmos.map((item) => [item.id, item.projectName]),
    follow_up_question: state.followUpQuestions.map((item) => [item.id, item.question]),
    interview_review: state.reviews.map((item) => [item.id, `${item.companyName} - ${item.roundName}复盘`]),
    weakness: state.weaknesses.map((item) => [item.id, item.title]),
    training_task: state.trainingTasks.map((item) => [item.id, item.title]),
    portfolio_project: state.portfolioProjects.map((item) => [item.id, item.displayTitle]),
  };
  return maps[sourceType] || [];
}

async function beginNewAiAnalysisNote() {
  state.activeModule = "aiAnalysis";
  state.aiAnalysisNoteDraft = { ...EMPTY_AI_ANALYSIS_NOTE, title: "新的 AI 辅助分析" };
  state.selectedAiAnalysisNoteId = null;
  render();
}

function beginNewAiFrontierCard() {
  state.activeModule = "aiFrontier";
  state.aiFrontierCardDraft = { ...EMPTY_AI_FRONTIER_CARD, topic: "新的 AI 前沿卡片" };
  state.selectedAiFrontierCardId = null;
  render();
}

function beginNewRhythmLog() {
  const today = new Date().toISOString().slice(0, 10);
  state.activeModule = "rhythm";
  state.rhythmLogDraft = { ...EMPTY_RHYTHM_LOG, date: today, title: `${today} 节奏记录` };
  state.selectedRhythmLogId = null;
  render();
}

function beginPortfolioProjectFromAmmo(ammoId) {
  const ammo = state.projectAmmos.find((item) => item.id === ammoId);
  if (!ammo) {
    showInfo("没有找到项目弹药");
    return;
  }

  state.activeModule = "portfolio";
  state.portfolioPreviewMode = false;
  state.portfolioProjectDraft = {
    ...EMPTY_PORTFOLIO_PROJECT,
    projectAmmoId: ammo.id,
    projectName: ammo.projectName,
    displayTitle: ammo.projectName,
    subtitle: ammo.aiRelevance,
    summary: ammo.result,
    role: ammo.role,
    period: ammo.period,
    problem: ammo.background,
    solution: ammo.actions,
    impact: ammo.result,
    metrics: ammo.metrics,
    skills: ammo.pmCompetencies,
    evidence: ammo.evidence,
    sortOrder: state.portfolioProjects.length * 10 + 10,
  };
  state.selectedPortfolioProjectId = null;
  render();
}

function selectFollowUpQuestion(id) {
  state.selectedFollowUpQuestionId = id;
  state.followUpQuestionDraft = null;
  state.expressionDrillDraft = null;
  state.selectedExpressionDrillId = drillsForFollowUpQuestion(id)[0]?.id || null;
  render();
}

function selectExpressionDrill(id) {
  state.selectedExpressionDrillId = id;
  state.expressionDrillDraft = null;
  state.expressionSessionDraft = null;
  state.selectedExpressionSessionId = sessionsForDrill(id)[0]?.id || null;
  render();
}

function selectExpressionSession(id) {
  const session = state.expressionSessions.find((item) => item.id === id);
  state.selectedExpressionSessionId = id;
  state.expressionSessionDraft = null;
  if (session?.drillId) {
    state.selectedExpressionDrillId = session.drillId;
    state.expressionDrillDraft = null;
  }
  render();
}

function beginNewProjectAmmo(seed = {}) {
  state.activeModule = "projectAmmo";
  state.projectAmmoDraft = { ...EMPTY_PROJECT_AMMO, ...seed };
  state.selectedProjectAmmoId = null;
  state.followUpQuestionDraft = null;
  state.expressionDrillDraft = null;
  state.selectedFollowUpQuestionId = null;
  state.selectedExpressionDrillId = null;
  render();
}

function beginNewFollowUpQuestion() {
  const ammo = selectedProjectAmmo();
  if (!ammo?.id || state.projectAmmoDraft) {
    showInfo("请先保存项目弹药，再添加追问");
    return;
  }
  state.followUpQuestionDraft = { ...EMPTY_FOLLOW_UP_QUESTION, projectAmmoId: ammo.id };
  state.selectedFollowUpQuestionId = null;
  state.expressionDrillDraft = null;
  state.selectedExpressionDrillId = null;
  render();
}

function beginExpressionDrillForSelectedQuestion() {
  const question = selectedFollowUpQuestion();
  if (!question?.id || state.followUpQuestionDraft) {
    showInfo("请先保存项目追问，再创建表达训练");
    return;
  }
  state.expressionDrillDraft = {
    ...EMPTY_EXPRESSION_DRILL,
    sourceType: "follow_up_question",
    sourceId: question.id,
    question: question.question,
    targetAnswer: question.stableAnswer || question.answerDraft,
  };
  state.selectedExpressionDrillId = null;
  render();
}

function beginExpressionDrillForSelectedWeakness() {
  const weakness = selectedWeakness();
  if (!weakness?.id || state.weaknessDraft) {
    showInfo("请先保存能力缺陷，再创建表达训练");
    return;
  }
  state.expressionDrillDraft = {
    ...EMPTY_EXPRESSION_DRILL,
    sourceType: "weakness",
    sourceId: weakness.id,
    question: weakness.title,
    targetAnswer: weakness.description,
  };
  state.selectedExpressionDrillId = null;
  render();
}

function beginExpressionDrillForSelectedTrainingTask() {
  const task = selectedTrainingTask();
  if (!task?.id || state.trainingTaskDraft) {
    showInfo("请先保存训练任务，再创建表达训练");
    return;
  }
  state.expressionDrillDraft = {
    ...EMPTY_EXPRESSION_DRILL,
    sourceType: "training_task",
    sourceId: task.id,
    question: task.title,
    targetAnswer: task.practiceOutput || task.targetAbility,
    linkedTrainingTaskId: task.id,
  };
  state.selectedExpressionDrillId = null;
  render();
}

function beginExpressionSessionForSelectedDrill() {
  const drill = selectedExpressionDrill();
  if (!drill?.id || state.expressionDrillDraft) {
    showInfo("请先选择或保存一条表达训练");
    return;
  }
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  state.expressionSessionDraft = {
    ...EMPTY_EXPRESSION_SESSION,
    drillId: drill.id,
    question: drill.question,
    improvedAnswer: drill.targetAnswer,
    practicedAt: now.toISOString().slice(0, 16),
  };
  state.selectedExpressionSessionId = null;
  render();
}

function beginWeaknessFromSelectedReview() {
  const review = selectedReview();
  if (!review?.id) {
    showInfo("请先保存一份复盘");
    return;
  }

  beginNewWeakness({
    title: review.failurePoints ? review.failurePoints.split(/\r?\n/)[0].slice(0, 42) : "来自面试复盘的能力缺陷",
    description: review.failurePoints || review.weakAnswers || "",
    evidence: review.weakAnswers || review.actualQuestions || "",
    severity: review.selfRating === "failed" || review.selfRating === "weak" ? "high" : "medium",
    relatedOpportunityIds: [review.opportunityId],
    relatedInterviewRoundIds: [review.interviewRoundId],
    relatedReviewIds: [review.id],
  });
}

function beginAiDiagnosisFromSelectedReview() {
  const review = selectedReview();
  if (!review?.id) {
    showInfo("请先保存一份复盘");
    return;
  }
  state.activeModule = "aiAnalysis";
  state.aiAnalysisNoteDraft = {
    ...EMPTY_AI_ANALYSIS_NOTE,
    analysisType: "review_diagnosis",
    sourceType: "interview_review",
    sourceId: review.id,
    sourceTitle: `${review.companyName} - ${review.roundName}复盘`,
    title: `${review.companyName} ${review.roundName}复盘诊断`,
  };
  state.selectedAiAnalysisNoteId = null;
  render();
}

function beginNewOpportunity() {
  state.activeModule = "pipeline";
  state.selectedId = null;
  state.selectedInterviewId = null;
  state.draft = { ...EMPTY_OPPORTUNITY };
  state.interviewDraft = null;
  render();
}

function selectOpportunity(id) {
  state.selectedId = id;
  state.draft = null;
  state.interviewDraft = null;
  state.briefDraft = null;
  state.reviewDraft = null;
  const currentInterview = state.interviews.find((item) => item.id === state.selectedInterviewId);
  if (currentInterview?.opportunityId !== id) {
    state.selectedInterviewId = interviewsForOpportunity(id)[0]?.id || null;
    state.selectedBriefId = state.selectedInterviewId ? briefForInterview(state.selectedInterviewId)?.id || null : null;
    state.selectedReviewId = state.selectedInterviewId ? reviewForInterview(state.selectedInterviewId)?.id || null : null;
  }
  render();
}

function beginNewInterview() {
  const opportunity = selectedOpportunity();
  if (!opportunity?.id) {
    showInfo("请先选择或保存一个岗位");
    return;
  }

  state.interviewDraft = {
    ...EMPTY_INTERVIEW,
    opportunityId: opportunity.id,
    companyName: opportunity.companyName,
    roleTitle: opportunity.roleTitle,
  };
  state.selectedInterviewId = null;
  render();
}

function selectInterview(id) {
  state.selectedInterviewId = id;
  state.interviewDraft = null;
  state.briefDraft = null;
  state.reviewDraft = null;
  state.selectedBriefId = briefForInterview(id)?.id || null;
  state.selectedReviewId = reviewForInterview(id)?.id || null;
  render();
}

function selectInterviewForBrief(id) {
  const interview = state.interviews.find((item) => item.id === id);
  if (!interview) return;
  state.selectedInterviewId = id;
  state.selectedId = interview.opportunityId;
  state.interviewDraft = null;
  state.briefDraft = null;
  state.reviewDraft = null;
  state.selectedBriefId = briefForInterview(id)?.id || null;
  state.selectedReviewId = reviewForInterview(id)?.id || null;
  render();
}

function openReviewForInterview(id) {
  selectInterviewForBrief(id);
  state.activeModule = "postInterview";
  render();
}

function openWeakness(id) {
  state.activeModule = "weakness";
  selectWeakness(id);
}

function openTrainingTask(taskId) {
  const task = state.trainingTasks.find((item) => item.id === taskId);
  if (!task) return;
  state.activeModule = "trainingPlan";
  state.selectedWeaknessId = task.weaknessId;
  state.selectedTrainingTaskId = task.id;
  state.weaknessDraft = null;
  state.trainingTaskDraft = null;
  render();
}

function openFollowUpQuestion(questionId) {
  const question = state.followUpQuestions.find((item) => item.id === questionId);
  if (!question) return;
  state.activeModule = "projectAmmo";
  state.selectedProjectAmmoId = question.projectAmmoId;
  state.selectedFollowUpQuestionId = question.id;
  state.selectedExpressionDrillId = drillsForFollowUpQuestion(question.id)[0]?.id || null;
  state.projectAmmoDraft = null;
  state.followUpQuestionDraft = null;
  state.expressionDrillDraft = null;
  render();
}

function openProjectAmmo(ammoId) {
  const ammo = state.projectAmmos.find((item) => item.id === ammoId);
  if (!ammo) return;
  state.activeModule = "projectAmmo";
  state.selectedProjectAmmoId = ammo.id;
  state.selectedFollowUpQuestionId = questionsForProjectAmmo(ammo.id)[0]?.id || null;
  state.selectedExpressionDrillId = state.selectedFollowUpQuestionId
    ? drillsForFollowUpQuestion(state.selectedFollowUpQuestionId)[0]?.id || null
    : null;
  state.projectAmmoDraft = null;
  state.followUpQuestionDraft = null;
  state.expressionDrillDraft = null;
  render();
}

function openExpressionDrill(drillId) {
  const drill = state.expressionDrills.find((item) => item.id === drillId);
  if (!drill) return;
  if (state.activeModule === "expressionLab") {
    state.selectedExpressionDrillId = drill.id;
    state.selectedExpressionSessionId = sessionsForDrill(drill.id)[0]?.id || null;
    state.expressionDrillDraft = null;
    state.expressionSessionDraft = null;
    render();
    return;
  }
  if (drill.sourceType === "follow_up_question") {
    const question = state.followUpQuestions.find((item) => item.id === drill.sourceId);
    if (question) {
      state.activeModule = "projectAmmo";
      state.selectedProjectAmmoId = question.projectAmmoId;
      state.selectedFollowUpQuestionId = question.id;
    }
  } else if (drill.sourceType === "weakness") {
    state.activeModule = "weakness";
    state.selectedWeaknessId = drill.sourceId;
    state.selectedTrainingTaskId = tasksForWeakness(drill.sourceId)[0]?.id || null;
  } else if (drill.sourceType === "training_task") {
    const task = state.trainingTasks.find((item) => item.id === drill.sourceId);
    if (task) {
      state.activeModule = "trainingPlan";
      state.selectedWeaknessId = task.weaknessId;
      state.selectedTrainingTaskId = task.id;
    }
  } else if (drill.sourceType === "interview_review") {
    const review = state.reviews.find((item) => item.id === drill.sourceId);
    if (review) {
      state.activeModule = "postInterview";
      state.selectedInterviewId = review.interviewRoundId;
      state.selectedReviewId = review.id;
    }
  }
  state.selectedExpressionDrillId = drill.id;
  state.projectAmmoDraft = null;
  state.followUpQuestionDraft = null;
  state.expressionDrillDraft = null;
  render();
}

function openExpressionSession(sessionId) {
  const session = state.expressionSessions.find((item) => item.id === sessionId);
  if (!session) return;
  state.activeModule = "expressionLab";
  state.selectedExpressionDrillId = session.drillId;
  state.selectedExpressionSessionId = session.id;
  state.expressionDrillDraft = null;
  state.expressionSessionDraft = null;
  render();
}

function openPreInterviewForInterview(id) {
  selectInterviewForBrief(id);
  state.activeModule = "preInterview";
  render();
}

function beginBriefForSelectedInterview() {
  const interview = selectedInterview();
  if (!interview?.id) {
    showInfo("请先选择一轮面试");
    return;
  }
  state.briefDraft = {
    ...EMPTY_BRIEF,
    opportunityId: interview.opportunityId,
    interviewRoundId: interview.id,
  };
  state.selectedBriefId = null;
  render();
}

function beginReviewForSelectedInterview() {
  const interview = selectedInterview();
  if (!interview?.id) {
    showInfo("请先选择一轮面试");
    return;
  }
  state.reviewDraft = {
    ...EMPTY_REVIEW,
    opportunityId: interview.opportunityId,
    interviewRoundId: interview.id,
    companyName: interview.companyName,
    roleTitle: interview.roleTitle,
    roundName: interview.roundName,
  };
  state.selectedReviewId = null;
  render();
}

function switchModule(module) {
  state.activeModule = module;
  render();
}

function hasOpenInterview(opportunityId) {
  return interviewsForOpportunity(opportunityId).some(
    (interview) => !["completed", "reviewed", "cancelled"].includes(interview.status),
  );
}

function filteredPipelineOpportunities() {
  const filters = state.pipelineFilters;
  return state.opportunities.filter((opportunity) => {
    if (filters.stage !== "all" && opportunity.stage !== filters.stage) return false;
    if (filters.priority !== "all" && opportunity.priority !== filters.priority) return false;
    if (filters.riskLevel !== "all" && opportunity.riskLevel !== filters.riskLevel) return false;
    if (filters.nextAction === "with" && !opportunity.nextAction) return false;
    if (filters.nextAction === "without" && opportunity.nextAction) return false;
    if (filters.interview === "open" && !hasOpenInterview(opportunity.id)) return false;
    if (filters.interview === "none" && hasOpenInterview(opportunity.id)) return false;
    return true;
  });
}

function pipelineFilterMetrics(opportunities = filteredPipelineOpportunities()) {
  return {
    visible: opportunities.length,
    withNextAction: opportunities.filter((item) => item.nextAction).length,
    highRisk: opportunities.filter((item) => item.riskLevel === "high").length,
    withOpenInterview: opportunities.filter((item) => hasOpenInterview(item.id)).length,
  };
}

function groupByStage(opportunities = state.opportunities) {
  const groups = Object.fromEntries(STAGES.map(([stage]) => [stage, []]));
  for (const opportunity of opportunities) {
    const stage = groups[opportunity.stage] ? opportunity.stage : "collected";
    groups[stage].push(opportunity);
  }
  return groups;
}

function metrics() {
  const active = state.opportunities.filter(
    (item) => !["rejected", "offer", "paused"].includes(item.stage),
  );
  return {
    total: state.opportunities.length,
    active: active.length,
    pending: state.opportunities.filter((item) => item.nextAction).length,
    highRisk: state.opportunities.filter((item) => item.riskLevel === "high").length,
  };
}

function interviewMetrics() {
  const openInterviews = state.interviews.filter(
    (item) => !["completed", "reviewed", "cancelled"].includes(item.status),
  );
  return {
    upcoming: openInterviews.length,
    preparing: state.interviews.filter((item) => item.status === "preparing").length,
    needsPrep: state.interviews.filter((item) =>
      ["not_started", "drafting", "needs_rework"].includes(item.preparationStatus),
    ).length,
  };
}

function reviewMetrics() {
  const reviewInterviewIds = new Set(state.reviews.map((review) => review.interviewRoundId));
  const needsReview = state.interviews.filter(
    (item) => ["completed"].includes(item.status) && !reviewInterviewIds.has(item.id),
  ).length;
  return {
    total: state.reviews.length,
    needsReview,
    followup: state.reviews.filter((review) => review.status === "needs_followup").length,
  };
}

function briefCompletionItems(brief) {
  return [
    ["companyResearch", "公司调研", brief.companyResearch],
    ["businessSummary", "业务理解", brief.businessSummary],
    ["productSummary", "产品理解", brief.productSummary],
    ["jdRequirements", "JD 拆解", brief.jdRequirements],
    ["hiddenExpectations", "隐性期待", brief.hiddenExpectations],
    ["matchingEvidence", "匹配证据", brief.matchingEvidence],
    ["riskGaps", "风险缺口", brief.riskGaps],
    ["projectMapping", "项目映射", brief.projectMapping],
    ["questionPredictions", "题目预测", brief.questionPredictions],
    ["highRiskQuestions", "高风险问题", brief.highRiskQuestions],
    ["prepChecklist", "准备清单", brief.prepChecklist],
  ].map(([key, label, value]) => ({
    key,
    label,
    done: Boolean(String(value || "").trim()),
  }));
}

function checklistStats(value) {
  const lines = nonEmptyLines(value);
  const checked = lines.filter((line) => /^[-*]\s+\[[xX]\]/.test(line)).length;
  const unchecked = lines.filter((line) => /^[-*]\s+\[\s\]/.test(line)).length;
  const total = checked + unchecked;
  return {
    total,
    checked,
    unchecked,
    rawItems: total || lines.length,
  };
}

function briefWarRoomStats(brief) {
  const completionItems = briefCompletionItems(brief);
  const completed = completionItems.filter((item) => item.done).length;
  const checklist = checklistStats(brief.prepChecklist);
  return {
    completionItems,
    completed,
    total: completionItems.length,
    completionRate: Math.round((completed / completionItems.length) * 100),
    checklist,
    jdCount: nonEmptyLines(brief.jdRequirements).length,
    evidenceCount: nonEmptyLines(brief.matchingEvidence).length + nonEmptyLines(brief.projectMapping).length,
    predictionCount: nonEmptyLines(brief.questionPredictions).length,
    riskCount: nonEmptyLines(brief.riskGaps).length + nonEmptyLines(brief.highRiskQuestions).length,
  };
}

function briefWarRoomAdvice(brief) {
  const stats = briefWarRoomStats(brief);
  if (brief.status !== "ready" || stats.completionRate < 75) {
    return {
      tone: "attention",
      title: "先补齐作战关键区",
      body: "建议优先补齐 JD 拆解、匹配证据、风险缺口和高风险问题，再进入面试。",
    };
  }
  if (stats.riskCount > 0 && !String(brief.highRiskQuestions || "").trim()) {
    return {
      tone: "attention",
      title: "风险问题还缺预案",
      body: "已经识别出风险缺口，但高风险问题还没有形成回答方向，建议先补上。",
    };
  }
  if (stats.checklist.total && stats.checklist.unchecked > 0) {
    return {
      tone: "attention",
      title: "准备清单还有未完成项",
      body: `当前还有 ${stats.checklist.unchecked} 项准备动作未完成，面试前最好逐项处理。`,
    };
  }
  return {
    tone: "done",
    title: "作战准备较完整",
    body: "当前 Brief 已具备面试执行条件，面试后记得回到复盘室记录真实问题。",
  };
}

function nonEmptyLines(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function reviewCompletionItems(review) {
  return [
    ["actualQuestions", "实际问题", review.actualQuestions],
    ["strongAnswers", "强回答", review.strongAnswers],
    ["weakAnswers", "弱回答", review.weakAnswers],
    ["failurePoints", "挂点分析", review.failurePoints],
    ["interviewerSignals", "面试官信号", review.interviewerSignals],
    ["summary", "总结", review.summary],
  ].map(([key, label, value]) => ({
    key,
    label,
    done: Boolean(String(value || "").trim()),
  }));
}

function reviewCommitteeStats(review) {
  const completionItems = reviewCompletionItems(review);
  const completed = completionItems.filter((item) => item.done).length;
  const strongCount = nonEmptyLines(review.strongAnswers).length;
  const weakCount = nonEmptyLines(review.weakAnswers).length;
  const failureCount = nonEmptyLines(review.failurePoints).length;
  const questionCount = nonEmptyLines(review.actualQuestions).length;
  const hasWeakSignal = weakCount > 0 || failureCount > 0 || ["weak", "failed"].includes(review.selfRating);

  return {
    completionItems,
    completed,
    total: completionItems.length,
    completionRate: Math.round((completed / completionItems.length) * 100),
    strongCount,
    weakCount,
    failureCount,
    questionCount,
    hasWeakSignal,
  };
}

function reviewFailureCategories(review) {
  const text = searchText([review.weakAnswers, review.failurePoints, review.summary]);
  const categories = [
    {
      key: "project_depth",
      label: "项目深挖不足",
      terms: ["项目", "细节", "数据", "指标", "证据", "追问", "落地", "过程"],
    },
    {
      key: "product_thinking",
      label: "产品判断不足",
      terms: ["产品", "需求", "用户", "优先级", "取舍", "方案", "价值", "体验"],
    },
    {
      key: "ai_understanding",
      label: "AI 理解不足",
      terms: ["ai", "模型", "算法", "llm", "agent", "rag", "prompt", "大模型", "智能体"],
    },
    {
      key: "business_sense",
      label: "业务判断不足",
      terms: ["业务", "商业", "增长", "收入", "成本", "市场", "行业", "转化"],
    },
    {
      key: "communication",
      label: "表达稳定性不足",
      terms: ["表达", "结构", "卡", "紧张", "啰嗦", "混乱", "不稳", "说不清"],
    },
  ];

  const matched = categories
    .map((category) => ({
      ...category,
      score: category.terms.filter((term) => text.includes(term)).length,
    }))
    .filter((category) => category.score > 0)
    .sort((a, b) => b.score - a.score);

  return matched.length ? matched : [{ key: "other", label: "其他待判断", score: 0 }];
}

function reviewClosureAdvice(review) {
  const stats = reviewCommitteeStats(review);
  const linkedWeaknessCount = (review.linkedWeaknessIds || []).length;

  if (review.status === "draft" || stats.completionRate < 70) {
    return {
      tone: "attention",
      title: "先补齐复盘证据",
      body: "建议先把实际问题、弱回答和挂点分析补完整，再沉淀缺陷。",
    };
  }
  if (stats.hasWeakSignal && linkedWeaknessCount === 0) {
    return {
      tone: "attention",
      title: "建议创建能力缺陷",
      body: "本轮已经出现弱回答或挂点，但还没有关联缺陷，可以从这轮复盘生成修复对象。",
    };
  }
  if (linkedWeaknessCount > 0) {
    return {
      tone: "done",
      title: "已经进入缺陷闭环",
      body: `本轮已关联 ${linkedWeaknessCount} 个能力缺陷，下一步应进入训练计划中心安排修复。`,
    };
  }
  return {
    tone: "done",
    title: "复盘记录较完整",
    body: "当前没有明显待闭环挂点，可以继续观察后续面试验证结果。",
  };
}

function weaknessMetrics() {
  return {
    total: state.weaknesses.length,
    open: state.weaknesses.filter((weakness) => weakness.status === "open").length,
    training: state.weaknesses.filter((weakness) => weakness.status === "training").length,
    high: state.weaknesses.filter((weakness) => weakness.severity === "high").length,
  };
}

function weaknessExpressionDrills(weakness) {
  if (!weakness?.id) return [];
  const taskIds = new Set(tasksForWeakness(weakness.id).map((task) => task.id));
  return state.expressionDrills.filter(
    (drill) => (drill.sourceType === "weakness" && drill.sourceId === weakness.id) ||
      (drill.sourceType === "training_task" && taskIds.has(drill.sourceId)),
  );
}

function weaknessProfileStats(weakness) {
  const tasks = tasksForWeakness(weakness?.id);
  const drills = weaknessExpressionDrills(weakness);
  const completionItems = [
    ["evidence", "证据", weakness?.evidence],
    ["description", "缺陷描述", weakness?.description],
    ["severity", "严重程度", weakness?.severity],
    ["frequency", "出现频率", weakness?.frequency],
    ["reviews", "关联复盘", (weakness?.relatedReviewIds || []).length],
    ["tasks", "训练任务", tasks.length],
    ["drills", "表达训练", drills.length],
  ].map(([key, label, value]) => ({
    key,
    label,
    done: Array.isArray(value) ? value.length > 0 : Boolean(String(value ?? "").trim()) && value !== 0,
  }));
  const completed = completionItems.filter((item) => item.done).length;

  return {
    completionItems,
    completed,
    total: completionItems.length,
    completionRate: Math.round((completed / completionItems.length) * 100),
    tasks,
    drills,
    activeTasks: tasks.filter((task) => ["todo", "doing"].includes(task.status)).length,
    reviewingTasks: tasks.filter((task) => task.status === "reviewing").length,
    validatedTasks: tasks.filter((task) => task.status === "validated").length,
    stableDrills: drills.filter((drill) => drill.status === "stable" || drill.score === "stable").length,
  };
}

function weaknessClosureAdvice(weakness) {
  const stats = weaknessProfileStats(weakness);
  const hasEvidence = Boolean(String(weakness?.evidence || "").trim()) || (weakness?.relatedReviewIds || []).length > 0;

  if (!hasEvidence) {
    return {
      tone: "attention",
      title: "先补证据来源",
      body: "建议从面试复盘中补充真实问题、弱回答或面试官信号，避免缺陷只停留在感觉层。",
    };
  }
  if (!stats.tasks.length) {
    return {
      tone: "attention",
      title: "需要创建训练任务",
      body: "这个缺陷还没有进入训练计划中心，建议拆成一个可验收的修复任务。",
    };
  }
  if (stats.reviewingTasks || stats.activeTasks) {
    return {
      tone: "attention",
      title: "训练还在闭环中",
      body: "已有训练任务，但仍需完成产物、验收标准和验证记录，建议进入训练计划中心处理。",
    };
  }
  if (weakness.status === "repaired" || stats.validatedTasks > 0) {
    return {
      tone: "done",
      title: "具备修复证据",
      body: "当前缺陷已有已验证训练，下一步可以在真实面试中观察是否稳定复现改善。",
    };
  }
  return {
    tone: "attention",
    title: "等待验证信号",
    body: "训练任务已经推进，但还缺少明确验证记录，建议补一次表达训练或下一轮面试验证。",
  };
}

function trainingTaskMetrics() {
  const weekBuckets = new Set(["overdue", "today", "soon"]);
  return {
    total: state.trainingTasks.length,
    active: state.trainingTasks.filter((task) => ["todo", "doing", "reviewing"].includes(task.status)).length,
    reviewing: state.trainingTasks.filter((task) => task.status === "reviewing").length,
    validated: state.trainingTasks.filter((task) => task.status === "validated").length,
    overdue: state.trainingTasks.filter((task) => dateBucket(task.dueAt) === "overdue").length,
    week: state.trainingTasks.filter((task) => weekBuckets.has(dateBucket(task.dueAt))).length,
  };
}

function taskDueBucket(task) {
  return dateBucket(task?.dueAt);
}

function trainingTaskWeakness(task) {
  return state.weaknesses.find((item) => item.id === task?.weaknessId) || null;
}

function trainingTaskReadiness(task) {
  return {
    hasPracticeOutput: Boolean(String(task?.practiceOutput || "").trim()),
    hasAcceptanceCriteria: Boolean(String(task?.acceptanceCriteria || "").trim()),
    hasValidationNote: Boolean(String(task?.validationNote || "").trim()),
  };
}

function filteredTrainingTasks() {
  const view = state.trainingPlanView || "overview";
  const weekBuckets = new Set(["overdue", "today", "soon"]);

  return state.trainingTasks
    .filter((task) => {
      if (view === "week") return weekBuckets.has(taskDueBucket(task));
      if (view === "reviewing") return task.status === "reviewing";
      if (view === "validated") return task.status === "validated";
      return true;
    })
    .sort((a, b) => {
      const statusOrder = { reviewing: 0, doing: 1, todo: 2, validated: 3, done: 4, cancelled: 5 };
      const bucketOrder = { overdue: 0, today: 1, soon: 2, future: 3, none: 4 };
      const statusDiff = (statusOrder[a.status] ?? 6) - (statusOrder[b.status] ?? 6);
      if (statusDiff) return statusDiff;
      const bucketDiff = (bucketOrder[taskDueBucket(a)] ?? 5) - (bucketOrder[taskDueBucket(b)] ?? 5);
      if (bucketDiff) return bucketDiff;
      return String(a.dueAt || a.updatedAt || "").localeCompare(String(b.dueAt || b.updatedAt || ""));
    });
}

function projectAmmoMetrics() {
  return {
    total: state.projectAmmos.length,
    usable: state.projectAmmos.filter((item) => item.status === "usable").length,
    needsDeepening: state.projectAmmos.filter((item) => item.status === "needs_deepening").length,
  };
}

function dateBucket(value) {
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

function dueLabel(value) {
  if (!value) return "";
  const bucket = dateBucket(value);
  const dateText = String(value).includes("T") ? formatDateTime(value) : value;
  const suffixes = {
    overdue: "已逾期",
    today: "今天",
    soon: "7 天内",
    future: "计划中",
    none: "未设截止",
  };
  return `${dateText} · ${suffixes[bucket] || "计划中"}`;
}

function dispatchPriorityFromDue(defaultPriority, dueAt) {
  const bucket = dateBucket(dueAt);
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

function createDispatchQueue() {
  if (Array.isArray(state.systemSnapshot?.dispatchQueue)) {
    return state.systemSnapshot.dispatchQueue;
  }

  const items = [];
  const reviewedInterviewIds = new Set(state.reviews.map((review) => review.interviewRoundId));
  const existingPortfolioProjectAmmoIds = new Set(state.portfolioProjects.map((project) => project.projectAmmoId).filter(Boolean));

  state.interviews
    .filter((item) => !["completed", "reviewed", "cancelled"].includes(item.status))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `interview-prep-${item.id}`,
          type: "interview-prep",
          title: `${item.companyName} · ${item.roundName}`,
          meta: `${item.roleTitle} · ${optionLabel(ROUND_TYPES, item.roundType)}`,
          module: "preInterview",
          targetId: item.id,
          dueAt: item.scheduledAt,
          priority: item.preparationStatus === "needs_rework" ? "high" : "medium",
          reason: `准备状态：${optionLabel(PREPARATION_STATUSES, item.preparationStatus)}`,
          actionLabel: "进入作战室",
        }),
      );
    });

  state.interviews
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

  state.opportunities
    .filter((item) => item.riskLevel === "high")
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `opportunity-risk-${item.id}`,
          type: "opportunity-risk",
          title: `${item.companyName} · ${item.roleTitle}`,
          meta: `阶段：${optionLabel(STAGES, item.stage)}`,
          module: "pipeline",
          targetId: item.id,
          priority: "critical",
          reason: "岗位风险等级为高",
          actionLabel: "查看岗位",
        }),
      );
    });

  state.opportunities
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

  state.weaknesses
    .filter((item) => ["open", "training", "validating"].includes(item.status))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `weakness-${item.id}`,
          type: "weakness",
          title: item.title,
          meta: optionLabel(WEAKNESS_CATEGORIES, item.category),
          module: "weakness",
          targetId: item.id,
          priority: item.severity === "high" ? "high" : "medium",
          reason: `缺陷状态：${optionLabel(WEAKNESS_STATUSES, item.status)}`,
          actionLabel: "修复缺陷",
        }),
      );
    });

  state.trainingTasks
    .filter((item) => ["todo", "doing", "reviewing"].includes(item.status))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `training-task-${item.id}`,
          type: "training-task",
          title: item.title,
          meta: optionLabel(TRAINING_TASK_TYPES, item.taskType),
          module: "trainingTask",
          targetId: item.id,
          dueAt: item.dueAt,
          priority: item.status === "reviewing" ? "high" : "medium",
          reason: `训练状态：${optionLabel(TRAINING_TASK_STATUSES, item.status)}`,
          actionLabel: "处理训练",
        }),
      );
    });

  state.projectAmmos
    .filter((item) => item.status === "needs_deepening" || (item.status === "usable" && !existingPortfolioProjectAmmoIds.has(item.id)))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `project-ammo-${item.id}`,
          type: "project-ammo",
          title: item.projectName,
          meta: optionLabel(PROJECT_TYPES, item.projectType),
          module: "projectAmmo",
          targetId: item.id,
          priority: item.status === "needs_deepening" ? "high" : "low",
          reason: item.status === "needs_deepening" ? "项目弹药需要继续深挖" : "可生成作品集项目卡",
          actionLabel: "查看项目",
        }),
      );
    });

  state.followUpQuestions
    .filter((item) => ["needs_drill", "unanswered", "drafted"].includes(item.status))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `follow-up-${item.id}`,
          type: "follow-up",
          title: item.question,
          meta: optionLabel(FOLLOW_UP_QUESTION_TYPES, item.questionType),
          module: "followUpQuestion",
          targetId: item.id,
          priority: item.status === "needs_drill" ? "high" : "medium",
          reason: `追问状态：${optionLabel(FOLLOW_UP_QUESTION_STATUSES, item.status)}`,
          actionLabel: "稳定回答",
        }),
      );
    });

  state.expressionDrills
    .filter((item) => ["todo", "practicing", "reviewing"].includes(item.status) || item.score !== "stable")
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `expression-drill-${item.id}`,
          type: "expression-drill",
          title: item.question,
          meta: optionLabel(EXPRESSION_DRILL_SOURCE_TYPES, item.sourceType),
          module: "expressionDrill",
          targetId: item.id,
          priority: item.score === "unstable" ? "high" : "medium",
          reason: `表达评分：${optionLabel(EXPRESSION_DRILL_SCORES, item.score)}`,
          actionLabel: "继续训练",
        }),
      );
    });

  state.expressionSessions
    .filter((item) => item.status === "needs_rework" || (item.nextAction && item.status !== "stable"))
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `expression-session-${item.id}`,
          type: "expression-session",
          title: item.question,
          meta: `${optionLabel(EXPRESSION_SESSION_ATTEMPT_TYPES, item.attemptType)} · ${optionLabel(EXPRESSION_DRILL_SCORES, item.selfRating)}`,
          module: "expressionSession",
          targetId: item.id,
          priority: item.status === "needs_rework" ? "high" : "medium",
          reason: item.nextAction || "练习记录需要返工",
          actionLabel: "复盘练习",
        }),
      );
    });

  state.portfolioProjects
    .filter((item) => item.visibility === "portfolio" && item.readiness !== "ready")
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `portfolio-project-${item.id}`,
          type: "portfolio-project",
          title: item.displayTitle,
          meta: optionLabel(PORTFOLIO_READINESS, item.readiness),
          module: "portfolio",
          targetId: item.id,
          priority: item.readiness === "needs_sanitizing" ? "high" : "medium",
          reason: "作品集项目已进入展示区但还没准备好",
          actionLabel: "整理作品集",
        }),
      );
    });

  state.aiAnalysisNotes
    .filter((item) => item.status === "ai_responded")
    .forEach((item) => {
      items.push(
        createDispatchItem({
          id: `ai-analysis-${item.id}`,
          type: "ai-analysis",
          title: item.title,
          meta: optionLabel(AI_ANALYSIS_TYPES, item.analysisType),
          module: "aiAnalysis",
          targetId: item.id,
          priority: "critical",
          reason: "AI 输出已粘贴，等待人工决策",
          actionLabel: "做决策",
        }),
      );
    });

  state.aiFrontierCards
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
          meta: optionLabel(AI_FRONTIER_CATEGORIES, item.category),
          module: "aiFrontier",
          targetId: item.id,
          priority: item.priority === "high" || item.status === "inbox" ? "high" : "medium",
          reason: item.status === "summarized" ? "已总结，等待面试迁移" : `前沿卡片状态：${optionLabel(AI_FRONTIER_STATUSES, item.status)}`,
          actionLabel: "消化前沿",
        }),
      );
    });

  state.rhythmLogs
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
          meta: `${item.date} · 负荷 ${optionLabel(RHYTHM_LEVELS, item.loadLevel)} · 精力 ${optionLabel(RHYTHM_LEVELS, item.energyLevel)}`,
          module: "rhythm",
          targetId: item.id,
          priority: item.status === "recovery_needed" || item.rhythmRisk === "high" ? "critical" : "high",
          reason: item.status === "recovery_needed" ? "当前节奏需要恢复" : item.nextAdjustment || "高负荷且低精力",
          actionLabel: "调整节奏",
        }),
      );
    });

  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return items.sort((a, b) => {
    const priorityDiff = (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9);
    if (priorityDiff) return priorityDiff;
    const bucketOrder = { overdue: 0, today: 1, soon: 2, later: 3, none: 4 };
    const dueDiff = (bucketOrder[dateBucket(a.dueAt)] ?? 4) - (bucketOrder[dateBucket(b.dueAt)] ?? 4);
    if (dueDiff) return dueDiff;
    return String(a.title).localeCompare(String(b.title));
  });
}

function dispatchMetrics(queue) {
  return {
    total: queue.length,
    critical: queue.filter((item) => item.priority === "critical").length,
    dueNow: queue.filter((item) => ["overdue", "today"].includes(dateBucket(item.dueAt))).length,
    decisions: queue.filter((item) => item.type === "ai-analysis" || item.type === "interview-review").length,
  };
}

function workbenchStatus() {
  const queue = createDispatchQueue();
  const dueNow = queue.filter((item) => ["overdue", "today"].includes(dateBucket(item.dueAt))).length;
  return {
    queueTotal: queue.length,
    dueNow,
    loadingLabel: state.loading ? "读取中" : "已同步",
  };
}

function renderWorkbenchStatus() {
  const status = workbenchStatus();
  return `
    <div class="workspace-status">
      <span class="status-pill ${state.loading ? "loading" : "ready"}">${status.loadingLabel}</span>
      <span>总控待办 ${status.queueTotal}</span>
      <span>今日/逾期 ${status.dueNow}</span>
      <span>Markdown 本地保存</span>
    </div>
  `;
}

function renderShell(content) {
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">A</div>
          <div>
            <h1 class="brand-title">way2AIPM OS</h1>
            <p class="brand-subtitle">${APP_VERSION} Markdown 工作台</p>
          </div>
        </div>
        <nav class="nav">
          ${MODULES.map(
            ([key, label, icon]) => `
              <button class="nav-button ${state.activeModule === key ? "active" : ""}" data-module="${key}">
                <span class="nav-icon">${icon}</span>
                <span>${label}</span>
              </button>
            `,
          ).join("")}
        </nav>
        <div class="sidebar-note">
          本地私用优先。岗位数据保存为 Markdown 文件，后续可以迁移到轻量数据库。
        </div>
      </aside>
      <main class="main">
        ${renderWorkbenchStatus()}
        ${content}
      </main>
    </div>
  `;

  document.querySelectorAll("[data-module]").forEach((button) => {
    button.addEventListener("click", () => switchModule(button.dataset.module));
  });
  document.querySelectorAll("[data-quick-action]").forEach((button) => {
    button.addEventListener("click", () => handleQuickAction(button.dataset.quickAction));
  });
}

function handleQuickAction(action) {
  if (action === "new-opportunity") {
    beginNewOpportunity();
    return;
  }
  if (action === "global-search") {
    state.activeModule = "globalSearch";
    state.globalSearchQuery = "";
    state.globalSearchFilter = "all";
    render();
    return;
  }
  if (action === "new-ai-analysis") {
    beginNewAiAnalysisNote();
    return;
  }
  if (action === "new-rhythm-log") {
    beginNewRhythmLog();
    return;
  }
  if (action === "training-plan") {
    state.activeModule = "trainingPlan";
    render();
  }
}

function renderTopbar(title, subtitle, eyebrow = "way2AIPM OS") {
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </div>
      <div class="actions">
        <button class="btn subtle" id="refresh-btn" type="button">刷新</button>
        <button class="btn primary" id="new-opp-btn" type="button">新增岗位</button>
      </div>
    </div>
  `;
}

function renderMetricGrid() {
  const data = metrics();
  const interviewData = interviewMetrics();
  const reviewData = reviewMetrics();
  return `
    <section class="grid metrics">
      <div class="metric"><div class="metric-label">全部机会</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">进行中</div><div class="metric-value">${data.active}</div></div>
      <div class="metric"><div class="metric-label">待准备面试</div><div class="metric-value">${interviewData.needsPrep}</div></div>
      <div class="metric"><div class="metric-label">待复盘面试</div><div class="metric-value">${reviewData.needsReview}</div></div>
    </section>
  `;
}

function renderOpportunityCard(opportunity) {
  const active = state.selectedId === opportunity.id;
  const nextInterview = nextInterviewForOpportunity(opportunity.id);
  const isSaving = state.quickSavingOpportunityId === opportunity.id;
  const nextAction = opportunity.nextAction
    ? `<p class="next-action">下一步：${escapeHtml(opportunity.nextAction)}</p>`
    : "";
  const interviewLine = nextInterview
    ? `<p class="next-action">面试：${escapeHtml(nextInterview.roundName)}${nextInterview.scheduledAt ? ` · ${escapeHtml(formatDateTime(nextInterview.scheduledAt))}` : ""} · ${escapeHtml(briefStatusForInterview(nextInterview.id))}</p>`
    : "";
  return `
    <article class="opp-card ${active ? "active" : ""}">
      <button class="opp-card-main" data-select-id="${escapeHtml(opportunity.id)}" type="button">
        <p class="opp-company">${escapeHtml(opportunity.companyName)}</p>
        <p class="opp-role">${escapeHtml(opportunity.roleTitle)}</p>
        <div class="tag-row">
          <span class="tag stage">${optionLabel(STAGES, opportunity.stage)}</span>
          <span class="tag priority-${opportunity.priority}">P ${optionLabel(PRIORITIES, opportunity.priority)}</span>
          <span class="tag risk-${opportunity.riskLevel}">风险 ${optionLabel(RISK_LEVELS, opportunity.riskLevel)}</span>
        </div>
        ${nextAction}
        ${interviewLine}
      </button>
      <form class="pipeline-quick-form" data-pipeline-quick-form="${escapeHtml(opportunity.id)}">
        <div class="quick-field">
          <label>阶段</label>
          ${renderSelect("stage", STAGES, opportunity.stage)}
        </div>
        <div class="quick-field">
          <label>优先级</label>
          ${renderSelect("priority", PRIORITIES, opportunity.priority)}
        </div>
        <div class="quick-field">
          <label>风险</label>
          ${renderSelect("riskLevel", RISK_LEVELS, opportunity.riskLevel)}
        </div>
        <div class="quick-field full">
          <label>下一步</label>
          <input name="nextAction" value="${escapeHtml(opportunity.nextAction)}" placeholder="例如：补 JD 拆解" />
        </div>
        <button class="btn compact" type="submit"${disabledAttr(isSaving)}>${isSaving ? "保存中..." : "快速保存"}</button>
      </form>
    </article>
  `;
}

function renderPipelineBoard() {
  const visibleOpportunities = filteredPipelineOpportunities();
  const groups = groupByStage(visibleOpportunities);
  if (state.loading) {
    return `<div class="empty">正在读取 Markdown 记录...</div>`;
  }

  if (!state.opportunities.length) {
    return `
      <div class="empty empty-onboarding">
        <h3>从第一条岗位机会开始</h3>
        <p>先把岗位保存下来，后续就能串起面试轮次、作战 Brief、复盘、缺陷和训练。</p>
        <ol>
          <li>创建第一个岗位机会</li>
          <li>粘贴 JD 或记录来源</li>
          <li>收到邀约后创建一面、二面或 HR 面</li>
          <li>面试前写 Brief，面试后做复盘</li>
          <li>从复盘沉淀缺陷和训练任务</li>
        </ol>
        <button class="btn primary" data-quick-action="new-opportunity" type="button">创建第一个岗位</button>
      </div>
    `;
  }

  if (!visibleOpportunities.length) {
    return `
      ${renderPipelineControls(visibleOpportunities)}
      <div class="empty">当前筛选下没有岗位机会。可以清空筛选，或新增一个更匹配当前条件的岗位。</div>
    `;
  }

  return `
    ${renderPipelineControls(visibleOpportunities)}
    <div class="pipeline">
      ${STAGES.map(
        ([stage, label]) => `
          <section class="column">
            <div class="column-header">
              <span class="column-title">${label}</span>
              <span class="count">${groups[stage].length}</span>
            </div>
            <div class="cards">
              ${groups[stage].map(renderOpportunityCard).join("") || `<div class="empty">暂无</div>`}
            </div>
          </section>
        `,
      ).join("")}
    </div>
  `;
}

function renderPipelineControls(opportunities) {
  const filters = state.pipelineFilters;
  const data = pipelineFilterMetrics(opportunities);
  return `
    <section class="pipeline-controls">
      <form id="pipeline-filter-form" class="pipeline-filter-form">
        <div class="quick-field">
          <label>阶段</label>
          ${renderSelect("stage", [["all", "全部阶段"], ...STAGES], filters.stage)}
        </div>
        <div class="quick-field">
          <label>优先级</label>
          ${renderSelect("priority", [["all", "全部优先级"], ...PRIORITIES], filters.priority)}
        </div>
        <div class="quick-field">
          <label>风险</label>
          ${renderSelect("riskLevel", [["all", "全部风险"], ...RISK_LEVELS], filters.riskLevel)}
        </div>
        <div class="quick-field">
          <label>下一步</label>
          ${renderSelect("nextAction", [["all", "全部"], ["with", "有下一步"], ["without", "无下一步"]], filters.nextAction)}
        </div>
        <div class="quick-field">
          <label>面试</label>
          ${renderSelect("interview", [["all", "全部"], ["open", "有未完成面试"], ["none", "暂无未完成面试"]], filters.interview)}
        </div>
        <button class="btn" id="clear-pipeline-filters-btn" type="button">清空</button>
      </form>
      <div class="pipeline-filter-metrics">
        <span>可见 ${data.visible}</span>
        <span>下一步 ${data.withNextAction}</span>
        <span>高风险 ${data.highRisk}</span>
        <span>面试中 ${data.withOpenInterview}</span>
      </div>
    </section>
  `;
}

function renderSelect(name, options, selected) {
  return `
    <select name="${name}">
      ${options
        .map(([value, label]) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label}</option>`)
        .join("")}
    </select>
  `;
}

function renderInterviewList(opportunity) {
  const interviews = interviewsForOpportunity(opportunity.id);

  if (!interviews.length) {
    return `<div class="empty">还没有面试轮次。收到邀约后，可以在这里创建一面、二面或 HR 面。</div>`;
  }

  return `
    <div class="interview-list">
      ${interviews
        .map(
          (interview) => `
            <button class="interview-item ${state.selectedInterviewId === interview.id ? "active" : ""}" data-interview-id="${escapeHtml(interview.id)}" type="button">
              <div>
                <p class="work-item-title">${escapeHtml(interview.roundName)} · ${optionLabel(ROUND_TYPES, interview.roundType)}</p>
                <p class="work-item-meta">
                  ${interview.scheduledAt ? escapeHtml(formatDateTime(interview.scheduledAt)) : "未设置时间"}
                  ${interview.interviewer ? ` · ${escapeHtml(interview.interviewer)}` : ""}
                </p>
              </div>
              <div class="tag-row">
                <span class="tag stage">${optionLabel(INTERVIEW_STATUSES, interview.status)}</span>
                <span class="tag prep-${interview.preparationStatus}">${optionLabel(PREPARATION_STATUSES, interview.preparationStatus)}</span>
              </div>
              <div class="interview-actions">
                <span class="mini-meta">${escapeHtml(briefStatusForInterview(interview.id))}</span>
                <span class="mini-link" data-open-brief-id="${escapeHtml(interview.id)}">作战室</span>
              </div>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderInterviewForm(opportunity) {
  const interview = selectedInterview();
  const isNew = Boolean(state.interviewDraft);

  if (!interview) {
    return `<div class="empty">选择一个面试轮次进行编辑，或创建新的面试轮次。</div>`;
  }

  return `
    <form id="interview-form" class="form-grid compact-form">
      <div class="form-field">
        <label>轮次名称</label>
        <input name="roundName" value="${escapeHtml(interview.roundName)}" placeholder="一面 / 二面 / HR 面" required />
      </div>
      <div class="form-field">
        <label>轮次类型</label>
        ${renderSelect("roundType", ROUND_TYPES, interview.roundType)}
      </div>
      <div class="form-field">
        <label>面试时间</label>
        <input name="scheduledAt" type="datetime-local" value="${escapeHtml(interview.scheduledAt)}" />
      </div>
      <div class="form-field">
        <label>面试官</label>
        <input name="interviewer" value="${escapeHtml(interview.interviewer)}" placeholder="HR / 业务负责人 / 产品负责人" />
      </div>
      <div class="form-field">
        <label>地点或链接</label>
        <input name="location" value="${escapeHtml(interview.location)}" placeholder="线上会议链接 / 现场地址" />
      </div>
      <div class="form-field">
        <label>面试状态</label>
        ${renderSelect("status", INTERVIEW_STATUSES, interview.status)}
      </div>
      <div class="form-field">
        <label>准备状态</label>
        ${renderSelect("preparationStatus", PREPARATION_STATUSES, interview.preparationStatus)}
      </div>
      <div class="form-field">
        <label>下一步动作</label>
        <input name="nextAction" value="${escapeHtml(interview.nextAction)}" placeholder="例如：补公司调研、准备项目追问" />
      </div>
      <div class="form-field full">
        <label>备注</label>
        <textarea name="notes">${escapeHtml(interview.notes)}</textarea>
      </div>
      <input name="opportunityId" type="hidden" value="${escapeHtml(opportunity.id)}" />
      <div class="form-field full">
        <div class="actions">
          ${isNew ? `<button class="btn" id="cancel-interview-btn" type="button">取消</button>` : ""}
          <button class="btn primary" type="submit"${disabledAttr(state.savingInterview)}>${state.savingInterview ? "保存中..." : "保存面试轮次"}</button>
        </div>
        <div class="status-line">${interview.updatedAt ? `上次更新：${escapeHtml(interview.updatedAt)}` : ""}</div>
      </div>
    </form>
  `;
}

function renderInterviewSection(opportunity, isNewOpportunity) {
  if (isNewOpportunity) {
    return "";
  }

  return `
    <div class="detail-divider"></div>
    <section class="stack">
      <div class="section-heading">
        <div>
          <h3>面试轮次</h3>
          <p>为该岗位创建一面、二面、HR 面等轮次，后续面试前作战室会基于这里展开。</p>
        </div>
        <button class="btn" id="new-interview-btn" type="button">新增轮次</button>
      </div>
      ${renderInterviewList(opportunity)}
      ${renderInterviewForm(opportunity)}
    </section>
  `;
}

function renderDetailPanel() {
  const opportunity = selectedOpportunity();
  const isNew = Boolean(state.draft);

  if (!opportunity) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">岗位详情</h2>
            <p class="panel-subtitle">选择一个岗位，或新增第一条记录。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="empty">当前没有选中的岗位。</div>
        </div>
      </section>
    `;
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">${isNew ? "新增岗位机会" : "岗位详情"}</h2>
          <p class="panel-subtitle">保存后会写入 content/opportunities 下的 Markdown 文件。</p>
        </div>
      </div>
      <div class="panel-body">
        <form id="opportunity-form" class="form-grid">
          <div class="form-field">
            <label>公司名称</label>
            <input name="companyName" value="${escapeHtml(opportunity.companyName)}" required />
          </div>
          <div class="form-field">
            <label>岗位名称</label>
            <input name="roleTitle" value="${escapeHtml(opportunity.roleTitle)}" required />
          </div>
          <div class="form-field">
            <label>阶段</label>
            ${renderSelect("stage", STAGES, opportunity.stage)}
          </div>
          <div class="form-field">
            <label>优先级</label>
            ${renderSelect("priority", PRIORITIES, opportunity.priority)}
          </div>
          <div class="form-field">
            <label>风险等级</label>
            ${renderSelect("riskLevel", RISK_LEVELS, opportunity.riskLevel)}
          </div>
          <div class="form-field">
            <label>下一步截止</label>
            <input name="nextActionDueAt" type="date" value="${escapeHtml(opportunity.nextActionDueAt)}" />
          </div>
          <div class="form-field">
            <label>来源</label>
            <input name="source" value="${escapeHtml(opportunity.source)}" placeholder="Boss / 猎头 / 内推 / 官网" />
          </div>
          <div class="form-field">
            <label>JD 链接</label>
            <input name="jdUrl" value="${escapeHtml(opportunity.jdUrl)}" placeholder="https://..." />
          </div>
          <div class="form-field full">
            <label>下一步动作</label>
            <input name="nextAction" value="${escapeHtml(opportunity.nextAction)}" placeholder="例如：拆 JD、补项目表达、约面试时间" />
          </div>
          <div class="form-field full">
            <label>JD 原文 / 摘要</label>
            <textarea name="jdText">${escapeHtml(opportunity.jdText)}</textarea>
          </div>
          <div class="form-field full">
            <label>快速笔记</label>
            <textarea name="notes">${escapeHtml(opportunity.notes)}</textarea>
          </div>
          <div class="form-field full">
            <div class="actions">
              ${isNew ? `<button class="btn" id="cancel-new-btn" type="button">取消</button>` : ""}
              <button class="btn primary" type="submit"${disabledAttr(state.saving)}>${state.saving ? "保存中..." : "保存 Markdown"}</button>
            </div>
            <div class="status-line">${opportunity.updatedAt ? `上次更新：${escapeHtml(opportunity.updatedAt)}` : ""}</div>
          </div>
        </form>
        ${renderInterviewSection(opportunity, isNew)}
      </div>
    </section>
  `;
}

function attachCommonEvents() {
  document.querySelector("#pipeline-filter-form")?.addEventListener("change", (event) => {
    const formData = new FormData(event.currentTarget);
    state.pipelineFilters = {
      stage: String(formData.get("stage") || "all"),
      priority: String(formData.get("priority") || "all"),
      riskLevel: String(formData.get("riskLevel") || "all"),
      nextAction: String(formData.get("nextAction") || "all"),
      interview: String(formData.get("interview") || "all"),
    };
    render();
  });
  document.querySelector("#clear-pipeline-filters-btn")?.addEventListener("click", () => {
    state.pipelineFilters = {
      stage: "all",
      priority: "all",
      riskLevel: "all",
      nextAction: "all",
      interview: "all",
    };
    render();
  });
  document.querySelectorAll("[data-pipeline-quick-form]").forEach((form) => {
    form.addEventListener("submit", submitPipelineQuickUpdate);
  });
  document.querySelector("#global-search-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    state.globalSearchQuery = String(formData.get("query") || "").trim();
    state.globalSearchFilter = String(formData.get("filter") || "all");
    render();
  });
  document.querySelector("#clear-global-search-btn")?.addEventListener("click", () => {
    state.globalSearchQuery = "";
    state.globalSearchFilter = "all";
    render();
  });
  document.querySelectorAll("[data-training-plan-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.trainingPlanView = button.dataset.trainingPlanView;
      const tasks = filteredTrainingTasks();
      if (!tasks.some((task) => task.id === state.selectedTrainingTaskId)) {
        state.selectedTrainingTaskId = tasks[0]?.id || null;
        if (state.selectedTrainingTaskId) {
          const task = state.trainingTasks.find((item) => item.id === state.selectedTrainingTaskId);
          state.selectedWeaknessId = task?.weaknessId || state.selectedWeaknessId;
        }
      }
      state.trainingTaskDraft = null;
      state.expressionDrillDraft = null;
      render();
    });
  });
  document.querySelectorAll("[data-global-search-result]").forEach((button) => {
    button.addEventListener("click", () => openGlobalSearchResult(button.dataset.globalSearchResult));
  });
  document.querySelector("#new-opp-btn")?.addEventListener("click", beginNewOpportunity);
  document.querySelector("#refresh-btn")?.addEventListener("click", loadOpportunities);
  document.querySelectorAll("[data-select-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectOpportunity(button.dataset.selectId);
      if (button.dataset.interviewId) {
        state.activeModule = "preInterview";
        state.selectedInterviewId = button.dataset.interviewId;
        state.selectedBriefId = briefForInterview(button.dataset.interviewId)?.id || null;
        render();
      }
      if (button.dataset.reviewInterviewId) {
        openReviewForInterview(button.dataset.reviewInterviewId);
      }
    });
  });
  document.querySelectorAll("[data-dashboard-weakness-id]").forEach((button) => {
    button.addEventListener("click", () => openWeakness(button.dataset.dashboardWeaknessId));
  });
  document.querySelectorAll("[data-dashboard-task-id]").forEach((button) => {
    button.addEventListener("click", () => openTrainingTask(button.dataset.dashboardTaskId));
  });
  document.querySelectorAll("[data-dashboard-follow-up-id]").forEach((button) => {
    button.addEventListener("click", () => openFollowUpQuestion(button.dataset.dashboardFollowUpId));
  });
  document.querySelectorAll("[data-dashboard-drill-id]").forEach((button) => {
    button.addEventListener("click", () => openExpressionDrill(button.dataset.dashboardDrillId));
  });
  document.querySelectorAll("[data-dashboard-ai-note-id]").forEach((button) => {
    button.addEventListener("click", () => openAiAnalysisNote(button.dataset.dashboardAiNoteId));
  });
  document.querySelectorAll("[data-dispatch-id]").forEach((button) => {
    button.addEventListener("click", () => openDispatchItem(button.dataset.dispatchId));
  });
  document.querySelectorAll("[data-brief-project-id]").forEach((button) => {
    button.addEventListener("click", () => openProjectAmmo(button.dataset.briefProjectId));
  });
  document.querySelectorAll("[data-module-shortcut]").forEach((button) => {
    button.addEventListener("click", () => switchModule(button.dataset.moduleShortcut));
  });
  document.querySelectorAll("[data-portfolio-project-id]").forEach((button) => {
    button.addEventListener("click", () => selectPortfolioProject(button.dataset.portfolioProjectId));
  });
  document.querySelectorAll("[data-create-portfolio-project]").forEach((button) => {
    button.addEventListener("click", () => beginPortfolioProjectFromAmmo(button.dataset.createPortfolioProject));
  });
  document.querySelector("#portfolio-preview-toggle")?.addEventListener("click", () => {
    state.portfolioPreviewMode = !state.portfolioPreviewMode;
    render();
  });
  document.querySelector("#new-ai-analysis-btn")?.addEventListener("click", beginNewAiAnalysisNote);
  document.querySelectorAll("[data-ai-analysis-note-id]").forEach((button) => {
    button.addEventListener("click", () => selectAiAnalysisNote(button.dataset.aiAnalysisNoteId));
  });
  document.querySelector("#ai-analysis-form select[name='sourceType']")?.addEventListener("change", (event) => {
    const form = event.target.closest("form");
    const next = {
      ...selectedAiAnalysisNote(),
      ...formToAiAnalysisNote(form),
      sourceType: event.target.value,
      sourceId: "",
    };
    if (state.aiAnalysisNoteDraft) {
      state.aiAnalysisNoteDraft = next;
    } else {
      state.aiAnalysisNotes = state.aiAnalysisNotes.map((item) =>
        item.id === state.selectedAiAnalysisNoteId ? { ...item, ...next } : item,
      );
    }
    render();
  });
  document.querySelector("#generate-ai-context-btn")?.addEventListener("click", generateAiAnalysisContext);
  document.querySelector("#parse-ai-candidates-btn")?.addEventListener("click", parseAiAnalysisCandidates);
  document.querySelectorAll("[data-ai-candidate-action]").forEach((button) => {
    button.addEventListener("click", () => handleAiCandidateAction(button));
  });
  document.querySelector("#new-ai-frontier-card-btn")?.addEventListener("click", beginNewAiFrontierCard);
  document.querySelectorAll("[data-ai-frontier-card-id]").forEach((button) => {
    button.addEventListener("click", () => selectAiFrontierCard(button.dataset.aiFrontierCardId));
  });
  document.querySelector("#new-rhythm-log-btn")?.addEventListener("click", beginNewRhythmLog);
  document.querySelectorAll("[data-rhythm-log-id]").forEach((button) => {
    button.addEventListener("click", () => selectRhythmLog(button.dataset.rhythmLogId));
  });
  document.querySelector("#cancel-new-btn")?.addEventListener("click", () => {
    state.draft = null;
    state.selectedId = state.opportunities[0]?.id || null;
    render();
  });
  document.querySelector("#new-interview-btn")?.addEventListener("click", beginNewInterview);
  document.querySelectorAll("[data-interview-id]").forEach((button) => {
    button.addEventListener("click", () => selectInterview(button.dataset.interviewId));
  });
  document.querySelectorAll("[data-open-brief-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openPreInterviewForInterview(button.dataset.openBriefId);
    });
  });
  document.querySelector("#pre-interview-selector")?.addEventListener("change", (event) => {
    selectInterviewForBrief(event.target.value);
  });
  document.querySelector("#review-selector")?.addEventListener("change", (event) => {
    selectInterviewForBrief(event.target.value);
  });
  document.querySelector("#create-brief-btn")?.addEventListener("click", beginBriefForSelectedInterview);
  document.querySelector("#create-review-btn")?.addEventListener("click", beginReviewForSelectedInterview);
  document.querySelector("#create-weakness-from-review-btn")?.addEventListener("click", beginWeaknessFromSelectedReview);
  document.querySelector("#create-ai-diagnosis-from-review-btn")?.addEventListener("click", beginAiDiagnosisFromSelectedReview);
  document.querySelector("#new-weakness-btn")?.addEventListener("click", () => beginNewWeakness());
  document.querySelectorAll(".new-training-task-btn").forEach((button) => {
    button.addEventListener("click", beginTrainingTaskForSelectedWeakness);
  });
  document.querySelectorAll("[data-weakness-id]").forEach((button) => {
    button.addEventListener("click", () => selectWeakness(button.dataset.weaknessId));
  });
  document.querySelectorAll("[data-training-task-id]").forEach((button) => {
    button.addEventListener("click", () => selectTrainingTask(button.dataset.trainingTaskId));
  });
  document.querySelector("#new-project-ammo-btn")?.addEventListener("click", () => beginNewProjectAmmo());
  document.querySelectorAll("[data-project-ammo-id]").forEach((button) => {
    button.addEventListener("click", () => selectProjectAmmo(button.dataset.projectAmmoId));
  });
  document.querySelectorAll(".new-follow-up-question-btn").forEach((button) => {
    button.addEventListener("click", beginNewFollowUpQuestion);
  });
  document.querySelectorAll("[data-follow-up-question-id]").forEach((button) => {
    button.addEventListener("click", () => selectFollowUpQuestion(button.dataset.followUpQuestionId));
  });
  document.querySelectorAll(".new-expression-drill-btn").forEach((button) => {
    button.addEventListener("click", beginExpressionDrillForSelectedQuestion);
  });
  document.querySelectorAll(".new-weakness-expression-drill-btn").forEach((button) => {
    button.addEventListener("click", beginExpressionDrillForSelectedWeakness);
  });
  document.querySelectorAll(".new-task-expression-drill-btn").forEach((button) => {
    button.addEventListener("click", beginExpressionDrillForSelectedTrainingTask);
  });
  document.querySelectorAll("[data-expression-drill-id]").forEach((button) => {
    button.addEventListener("click", () => selectExpressionDrill(button.dataset.expressionDrillId));
  });
  document.querySelector("#new-expression-session-btn")?.addEventListener("click", beginExpressionSessionForSelectedDrill);
  document.querySelectorAll("[data-expression-session-id]").forEach((button) => {
    button.addEventListener("click", () => selectExpressionSession(button.dataset.expressionSessionId));
  });
  document.querySelector("#cancel-interview-btn")?.addEventListener("click", () => {
    state.interviewDraft = null;
    state.selectedInterviewId = interviewsForOpportunity(state.selectedId)[0]?.id || null;
    render();
  });
  document.querySelector("#cancel-brief-btn")?.addEventListener("click", () => {
    state.briefDraft = null;
    state.selectedBriefId = state.selectedInterviewId ? briefForInterview(state.selectedInterviewId)?.id || null : null;
    render();
  });
  document.querySelector("#cancel-review-btn")?.addEventListener("click", () => {
    state.reviewDraft = null;
    state.selectedReviewId = state.selectedInterviewId ? reviewForInterview(state.selectedInterviewId)?.id || null : null;
    render();
  });
  document.querySelector("#cancel-weakness-btn")?.addEventListener("click", () => {
    state.weaknessDraft = null;
    state.selectedWeaknessId = state.weaknesses[0]?.id || null;
    state.expressionDrillDraft = null;
    state.selectedExpressionDrillId = state.selectedWeaknessId
      ? drillsForSource("weakness", state.selectedWeaknessId)[0]?.id || null
      : null;
    render();
  });
  document.querySelector("#cancel-training-task-btn")?.addEventListener("click", () => {
    state.trainingTaskDraft = null;
    state.selectedTrainingTaskId = state.selectedWeaknessId ? tasksForWeakness(state.selectedWeaknessId)[0]?.id || null : null;
    state.expressionDrillDraft = null;
    state.selectedExpressionDrillId = state.selectedTrainingTaskId
      ? drillsForSource("training_task", state.selectedTrainingTaskId)[0]?.id || null
      : null;
    render();
  });
  document.querySelector("#cancel-project-ammo-btn")?.addEventListener("click", () => {
    state.projectAmmoDraft = null;
    state.selectedProjectAmmoId = state.projectAmmos[0]?.id || null;
    state.followUpQuestionDraft = null;
    state.expressionDrillDraft = null;
    state.selectedFollowUpQuestionId = state.selectedProjectAmmoId
      ? questionsForProjectAmmo(state.selectedProjectAmmoId)[0]?.id || null
      : null;
    state.selectedExpressionDrillId = state.selectedFollowUpQuestionId
      ? drillsForFollowUpQuestion(state.selectedFollowUpQuestionId)[0]?.id || null
      : null;
    render();
  });
  document.querySelector("#cancel-follow-up-question-btn")?.addEventListener("click", () => {
    state.followUpQuestionDraft = null;
    state.expressionDrillDraft = null;
    state.selectedFollowUpQuestionId = state.selectedProjectAmmoId
      ? questionsForProjectAmmo(state.selectedProjectAmmoId)[0]?.id || null
      : null;
    state.selectedExpressionDrillId = state.selectedFollowUpQuestionId
      ? drillsForFollowUpQuestion(state.selectedFollowUpQuestionId)[0]?.id || null
      : null;
    render();
  });
  document.querySelector("#cancel-expression-drill-btn")?.addEventListener("click", () => {
    state.expressionDrillDraft = null;
    state.selectedExpressionDrillId = state.selectedFollowUpQuestionId
      ? drillsForFollowUpQuestion(state.selectedFollowUpQuestionId)[0]?.id || null
      : null;
    render();
  });
  document.querySelector("#cancel-expression-session-btn")?.addEventListener("click", () => {
    state.expressionSessionDraft = null;
    state.selectedExpressionSessionId = state.selectedExpressionDrillId
      ? sessionsForDrill(state.selectedExpressionDrillId)[0]?.id || null
      : null;
    render();
  });
  document.querySelector("#cancel-portfolio-project-btn")?.addEventListener("click", () => {
    state.portfolioProjectDraft = null;
    state.selectedPortfolioProjectId = state.portfolioProjects[0]?.id || null;
    render();
  });
  document.querySelector("#cancel-ai-analysis-btn")?.addEventListener("click", () => {
    state.aiAnalysisNoteDraft = null;
    state.selectedAiAnalysisNoteId = state.aiAnalysisNotes[0]?.id || null;
    render();
  });
  document.querySelector("#cancel-ai-frontier-card-btn")?.addEventListener("click", () => {
    state.aiFrontierCardDraft = null;
    state.selectedAiFrontierCardId = state.aiFrontierCards[0]?.id || null;
    render();
  });
  document.querySelector("#cancel-rhythm-log-btn")?.addEventListener("click", () => {
    state.rhythmLogDraft = null;
    state.selectedRhythmLogId = state.rhythmLogs[0]?.id || null;
    render();
  });
  document.querySelector("#opportunity-form")?.addEventListener("submit", submitOpportunity);
  document.querySelector("#interview-form")?.addEventListener("submit", submitInterview);
  document.querySelector("#brief-form")?.addEventListener("submit", submitBrief);
  document.querySelector("#review-form")?.addEventListener("submit", submitReview);
  document.querySelector("#weakness-form")?.addEventListener("submit", submitWeakness);
  document.querySelector("#training-task-form")?.addEventListener("submit", submitTrainingTask);
  document.querySelector("#project-ammo-form")?.addEventListener("submit", submitProjectAmmo);
  document.querySelector("#follow-up-question-form")?.addEventListener("submit", submitFollowUpQuestion);
  document.querySelector("#expression-drill-form")?.addEventListener("submit", submitExpressionDrill);
  document.querySelector("#expression-session-form")?.addEventListener("submit", submitExpressionSession);
  document.querySelector("#portfolio-profile-form")?.addEventListener("submit", submitPortfolioProfile);
  document.querySelector("#portfolio-project-form")?.addEventListener("submit", submitPortfolioProject);
  document.querySelector("#ai-analysis-form")?.addEventListener("submit", submitAiAnalysisNote);
  document.querySelector("#ai-frontier-card-form")?.addEventListener("submit", submitAiFrontierCard);
  document.querySelector("#rhythm-log-form")?.addEventListener("submit", submitRhythmLog);
}

function formToOpportunity(form) {
  const formData = new FormData(form);
  return {
    companyName: formData.get("companyName"),
    roleTitle: formData.get("roleTitle"),
    jdUrl: formData.get("jdUrl"),
    jdText: formData.get("jdText"),
    source: formData.get("source"),
    stage: formData.get("stage"),
    priority: formData.get("priority"),
    riskLevel: formData.get("riskLevel"),
    nextAction: formData.get("nextAction"),
    nextActionDueAt: formData.get("nextActionDueAt"),
    notes: formData.get("notes"),
  };
}

function formToInterview(form) {
  const formData = new FormData(form);
  const opportunity = selectedOpportunity();
  return {
    opportunityId: formData.get("opportunityId") || opportunity?.id,
    companyName: opportunity?.companyName,
    roleTitle: opportunity?.roleTitle,
    roundName: formData.get("roundName"),
    roundType: formData.get("roundType"),
    scheduledAt: formData.get("scheduledAt"),
    interviewer: formData.get("interviewer"),
    location: formData.get("location"),
    status: formData.get("status"),
    preparationStatus: formData.get("preparationStatus"),
    nextAction: formData.get("nextAction"),
    notes: formData.get("notes"),
  };
}

async function submitOpportunity(event) {
  event.preventDefault();
  if (state.saving) return;

  const form = event.currentTarget;
  const payload = formToOpportunity(form);
  if (state.draft) {
    state.draft = { ...state.draft, ...payload };
  } else {
    state.opportunities = state.opportunities.map((item) =>
      item.id === state.selectedId ? { ...item, ...payload } : item,
    );
  }
  state.saving = true;
  render();

  try {
    const isNew = Boolean(state.draft);
    const path = isNew ? "/api/opportunities" : `/api/opportunities/${encodeURIComponent(state.selectedId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedId = result.opportunity.id;
    state.draft = null;
    showToast("已保存到 Markdown");
    const [opportunityList, interviewList, reviewList] = await Promise.all([
      api("/api/opportunities"),
      api("/api/interviews"),
      api("/api/interview-reviews"),
    ]);
    state.opportunities = opportunityList.opportunities || [];
    state.interviews = interviewList.interviews || [];
    state.reviews = reviewList.reviews || [];
    const briefList = await api("/api/pre-interview-briefs");
    state.briefs = briefList.briefs || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.saving = false;
    render();
  }
}

async function submitPipelineQuickUpdate(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.dataset.pipelineQuickForm;
  const opportunity = state.opportunities.find((item) => item.id === id);
  if (!opportunity || state.quickSavingOpportunityId) return;

  const formData = new FormData(form);
  const payload = {
    stage: String(formData.get("stage") || opportunity.stage),
    priority: String(formData.get("priority") || opportunity.priority),
    riskLevel: String(formData.get("riskLevel") || opportunity.riskLevel),
    nextAction: String(formData.get("nextAction") || "").trim(),
  };

  state.quickSavingOpportunityId = id;
  state.opportunities = state.opportunities.map((item) => (item.id === id ? { ...item, ...payload } : item));
  render();

  try {
    const result = await api(`/api/opportunities/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    state.opportunities = state.opportunities.map((item) => (item.id === id ? result.opportunity : item));
    state.selectedId = result.opportunity.id;
    showToast("Pipeline 已更新");
  } catch (error) {
    showError(error.message);
    const list = await api("/api/opportunities").catch(() => null);
    if (list?.opportunities) {
      state.opportunities = list.opportunities;
    }
  } finally {
    state.quickSavingOpportunityId = null;
    render();
  }
}

async function submitInterview(event) {
  event.preventDefault();
  if (state.savingInterview) return;

  const form = event.currentTarget;
  const payload = formToInterview(form);
  if (state.interviewDraft) {
    state.interviewDraft = { ...state.interviewDraft, ...payload };
  } else {
    state.interviews = state.interviews.map((item) =>
      item.id === state.selectedInterviewId ? { ...item, ...payload } : item,
    );
  }
  state.savingInterview = true;
  render();

  try {
    const isNew = Boolean(state.interviewDraft);
    const path = isNew ? "/api/interviews" : `/api/interviews/${encodeURIComponent(state.selectedInterviewId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedInterviewId = result.interview.id;
    state.interviewDraft = null;
    showToast("面试轮次已保存");
    const [interviewList, briefList, reviewList] = await Promise.all([
      api("/api/interviews"),
      api("/api/pre-interview-briefs"),
      api("/api/interview-reviews"),
    ]);
    state.interviews = interviewList.interviews || [];
    state.briefs = briefList.briefs || [];
    state.reviews = reviewList.reviews || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingInterview = false;
    render();
  }
}

function formToBrief(form) {
  const formData = new FormData(form);
  const interview = selectedInterview();
  return {
    opportunityId: formData.get("opportunityId") || interview?.opportunityId,
    interviewRoundId: formData.get("interviewRoundId") || interview?.id,
    companyResearch: formData.get("companyResearch"),
    businessSummary: formData.get("businessSummary"),
    productSummary: formData.get("productSummary"),
    jdRequirements: formData.get("jdRequirements"),
    hiddenExpectations: formData.get("hiddenExpectations"),
    matchingEvidence: formData.get("matchingEvidence"),
    riskGaps: formData.get("riskGaps"),
    projectMapping: formData.get("projectMapping"),
    questionPredictions: formData.get("questionPredictions"),
    highRiskQuestions: formData.get("highRiskQuestions"),
    prepChecklist: formData.get("prepChecklist"),
    status: formData.get("status"),
  };
}

async function submitBrief(event) {
  event.preventDefault();
  if (state.savingBrief) return;

  const form = event.currentTarget;
  const payload = formToBrief(form);
  if (state.briefDraft) {
    state.briefDraft = { ...state.briefDraft, ...payload };
  } else {
    state.briefs = state.briefs.map((item) =>
      item.id === state.selectedBriefId ? { ...item, ...payload } : item,
    );
  }
  state.savingBrief = true;
  render();

  try {
    const isNew = Boolean(state.briefDraft);
    const path = isNew
      ? "/api/pre-interview-briefs"
      : `/api/pre-interview-briefs/${encodeURIComponent(state.selectedBriefId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedBriefId = result.brief.id;
    state.briefDraft = null;
    showToast("作战 Brief 已保存");
    const [briefList, interviewList] = await Promise.all([
      api("/api/pre-interview-briefs"),
      api("/api/interviews"),
    ]);
    state.briefs = briefList.briefs || [];
    state.interviews = interviewList.interviews || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingBrief = false;
    render();
  }
}

function formToReview(form) {
  const formData = new FormData(form);
  const interview = selectedInterview();
  return {
    opportunityId: formData.get("opportunityId") || interview?.opportunityId,
    interviewRoundId: formData.get("interviewRoundId") || interview?.id,
    companyName: interview?.companyName,
    roleTitle: interview?.roleTitle,
    roundName: interview?.roundName,
    actualQuestions: formData.get("actualQuestions"),
    strongAnswers: formData.get("strongAnswers"),
    weakAnswers: formData.get("weakAnswers"),
    failurePoints: formData.get("failurePoints"),
    interviewerSignals: formData.get("interviewerSignals"),
    selfRating: formData.get("selfRating"),
    result: formData.get("result"),
    summary: formData.get("summary"),
    status: formData.get("status"),
  };
}

async function submitReview(event) {
  event.preventDefault();
  if (state.savingReview) return;

  const form = event.currentTarget;
  const payload = formToReview(form);
  if (state.reviewDraft) {
    state.reviewDraft = { ...state.reviewDraft, ...payload };
  } else {
    state.reviews = state.reviews.map((item) =>
      item.id === state.selectedReviewId ? { ...item, ...payload } : item,
    );
  }
  state.savingReview = true;
  render();

  try {
    const isNew = Boolean(state.reviewDraft);
    const path = isNew
      ? "/api/interview-reviews"
      : `/api/interview-reviews/${encodeURIComponent(state.selectedReviewId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedReviewId = result.review.id;
    state.reviewDraft = null;
    showToast("面试复盘已保存");
    const [reviewList, interviewList, weaknessList] = await Promise.all([
      api("/api/interview-reviews"),
      api("/api/interviews"),
      api("/api/weaknesses"),
    ]);
    state.reviews = reviewList.reviews || [];
    state.interviews = interviewList.interviews || [];
    state.weaknesses = weaknessList.weaknesses || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingReview = false;
    render();
  }
}

function formToWeakness(form) {
  const formData = new FormData(form);
  const existing = selectedWeakness();
  return {
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    evidence: formData.get("evidence"),
    severity: formData.get("severity"),
    frequency: formData.get("frequency"),
    status: formData.get("status"),
    relatedOpportunityIds: existing?.relatedOpportunityIds || [],
    relatedInterviewRoundIds: existing?.relatedInterviewRoundIds || [],
    relatedReviewIds: existing?.relatedReviewIds || [],
    linkedTrainingTaskIds: existing?.linkedTrainingTaskIds || [],
  };
}

async function submitWeakness(event) {
  event.preventDefault();
  if (state.savingWeakness) return;

  const form = event.currentTarget;
  const payload = formToWeakness(form);
  if (state.weaknessDraft) {
    state.weaknessDraft = { ...state.weaknessDraft, ...payload };
  } else {
    state.weaknesses = state.weaknesses.map((item) =>
      item.id === state.selectedWeaknessId ? { ...item, ...payload } : item,
    );
  }
  state.savingWeakness = true;
  render();

  try {
    const isNew = Boolean(state.weaknessDraft);
    const path = isNew ? "/api/weaknesses" : `/api/weaknesses/${encodeURIComponent(state.selectedWeaknessId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedWeaknessId = result.weakness.id;
    state.weaknessDraft = null;
    showToast("能力缺陷已保存");
    const [weaknessList, reviewList, trainingTaskList] = await Promise.all([
      api("/api/weaknesses"),
      api("/api/interview-reviews"),
      api("/api/training-tasks"),
    ]);
    state.weaknesses = weaknessList.weaknesses || [];
    state.reviews = reviewList.reviews || [];
    state.trainingTasks = trainingTaskList.tasks || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingWeakness = false;
    render();
  }
}

function formToTrainingTask(form) {
  const formData = new FormData(form);
  const weakness = selectedWeakness();
  return {
    weaknessId: formData.get("weaknessId") || weakness?.id || selectedTrainingTask()?.weaknessId,
    title: formData.get("title"),
    taskType: formData.get("taskType"),
    targetAbility: formData.get("targetAbility"),
    practiceOutput: formData.get("practiceOutput"),
    acceptanceCriteria: formData.get("acceptanceCriteria"),
    status: formData.get("status"),
    dueAt: formData.get("dueAt"),
    validationNote: formData.get("validationNote"),
    relatedReviewId: formData.get("relatedReviewId"),
    relatedInterviewRoundId: formData.get("relatedInterviewRoundId"),
  };
}

async function submitTrainingTask(event) {
  event.preventDefault();
  if (state.savingTrainingTask) return;

  const form = event.currentTarget;
  const payload = formToTrainingTask(form);
  if (state.trainingTaskDraft) {
    state.trainingTaskDraft = { ...state.trainingTaskDraft, ...payload };
  } else {
    state.trainingTasks = state.trainingTasks.map((item) =>
      item.id === state.selectedTrainingTaskId ? { ...item, ...payload } : item,
    );
  }
  state.savingTrainingTask = true;
  render();

  try {
    const isNew = Boolean(state.trainingTaskDraft);
    const path = isNew
      ? "/api/training-tasks"
      : `/api/training-tasks/${encodeURIComponent(state.selectedTrainingTaskId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedTrainingTaskId = result.task.id;
    state.selectedWeaknessId = result.task.weaknessId;
    state.trainingTaskDraft = null;
    showToast("训练任务已保存");
    const [taskList, weaknessList] = await Promise.all([
      api("/api/training-tasks"),
      api("/api/weaknesses"),
    ]);
    state.trainingTasks = taskList.tasks || [];
    state.weaknesses = weaknessList.weaknesses || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingTrainingTask = false;
    render();
  }
}

function formToProjectAmmo(form) {
  const formData = new FormData(form);
  const existing = selectedProjectAmmo();
  return {
    projectName: formData.get("projectName"),
    projectType: formData.get("projectType"),
    role: formData.get("role"),
    period: formData.get("period"),
    background: formData.get("background"),
    goal: formData.get("goal"),
    actions: formData.get("actions"),
    result: formData.get("result"),
    metrics: formData.get("metrics"),
    evidence: formData.get("evidence"),
    aiRelevance: formData.get("aiRelevance"),
    pmCompetencies: formData.get("pmCompetencies"),
    riskQuestions: formData.get("riskQuestions"),
    linkedWeaknessIds: existing?.linkedWeaknessIds || [],
    linkedTrainingTaskIds: existing?.linkedTrainingTaskIds || [],
    status: formData.get("status"),
  };
}

async function submitProjectAmmo(event) {
  event.preventDefault();
  if (state.savingProjectAmmo) return;

  const form = event.currentTarget;
  const payload = formToProjectAmmo(form);
  if (state.projectAmmoDraft) {
    state.projectAmmoDraft = { ...state.projectAmmoDraft, ...payload };
  } else {
    state.projectAmmos = state.projectAmmos.map((item) =>
      item.id === state.selectedProjectAmmoId ? { ...item, ...payload } : item,
    );
  }
  state.savingProjectAmmo = true;
  render();

  try {
    const isNew = Boolean(state.projectAmmoDraft);
    const path = isNew ? "/api/project-ammos" : `/api/project-ammos/${encodeURIComponent(state.selectedProjectAmmoId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedProjectAmmoId = result.projectAmmo.id;
    state.projectAmmoDraft = null;
    showToast("项目弹药已保存");
    const list = await api("/api/project-ammos");
    state.projectAmmos = list.projectAmmos || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingProjectAmmo = false;
    render();
  }
}

function formToFollowUpQuestion(form) {
  const formData = new FormData(form);
  const existing = selectedFollowUpQuestion();
  return {
    projectAmmoId: formData.get("projectAmmoId") || state.selectedProjectAmmoId,
    question: formData.get("question"),
    questionType: formData.get("questionType"),
    riskLevel: formData.get("riskLevel"),
    answerDraft: formData.get("answerDraft"),
    stableAnswer: formData.get("stableAnswer"),
    evidence: formData.get("evidence"),
    status: formData.get("status"),
    linkedWeaknessIds: existing?.linkedWeaknessIds || [],
  };
}

async function submitFollowUpQuestion(event) {
  event.preventDefault();
  if (state.savingFollowUpQuestion) return;

  const form = event.currentTarget;
  const payload = formToFollowUpQuestion(form);
  if (state.followUpQuestionDraft) {
    state.followUpQuestionDraft = { ...state.followUpQuestionDraft, ...payload };
  } else {
    state.followUpQuestions = state.followUpQuestions.map((item) =>
      item.id === state.selectedFollowUpQuestionId ? { ...item, ...payload } : item,
    );
  }
  state.savingFollowUpQuestion = true;
  render();

  try {
    const isNew = Boolean(state.followUpQuestionDraft);
    const path = isNew
      ? "/api/follow-up-questions"
      : `/api/follow-up-questions/${encodeURIComponent(state.selectedFollowUpQuestionId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedFollowUpQuestionId = result.followUpQuestion.id;
    state.followUpQuestionDraft = null;
    showToast("项目追问已保存");
    const list = await api("/api/follow-up-questions");
    state.followUpQuestions = list.followUpQuestions || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingFollowUpQuestion = false;
    render();
  }
}

function formToExpressionDrill(form) {
  const formData = new FormData(form);
  return {
    sourceType: formData.get("sourceType"),
    sourceId: formData.get("sourceId"),
    question: formData.get("question"),
    targetAnswer: formData.get("targetAnswer"),
    practiceRecord: formData.get("practiceRecord"),
    score: formData.get("score"),
    status: formData.get("status"),
    nextAction: formData.get("nextAction"),
    linkedTrainingTaskId: formData.get("linkedTrainingTaskId"),
  };
}

async function submitExpressionDrill(event) {
  event.preventDefault();
  if (state.savingExpressionDrill) return;

  const form = event.currentTarget;
  const payload = formToExpressionDrill(form);
  if (state.expressionDrillDraft) {
    state.expressionDrillDraft = { ...state.expressionDrillDraft, ...payload };
  } else {
    state.expressionDrills = state.expressionDrills.map((item) =>
      item.id === state.selectedExpressionDrillId ? { ...item, ...payload } : item,
    );
  }
  state.savingExpressionDrill = true;
  render();

  try {
    const isNew = Boolean(state.expressionDrillDraft);
    const path = isNew
      ? "/api/expression-drills"
      : `/api/expression-drills/${encodeURIComponent(state.selectedExpressionDrillId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedExpressionDrillId = result.expressionDrill.id;
    state.expressionDrillDraft = null;
    showToast(result.followUpQuestion ? "表达训练已保存，追问已同步稳定" : "表达训练已保存");
    const [drillList, questionList] = await Promise.all([
      api("/api/expression-drills"),
      api("/api/follow-up-questions"),
    ]);
    state.expressionDrills = drillList.expressionDrills || [];
    state.followUpQuestions = questionList.followUpQuestions || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingExpressionDrill = false;
    render();
  }
}

function formToExpressionSession(form) {
  const formData = new FormData(form);
  return {
    drillId: formData.get("drillId"),
    question: formData.get("question"),
    practicedAt: formData.get("practicedAt"),
    attemptType: formData.get("attemptType"),
    durationMinutes: formData.get("durationMinutes"),
    selfRating: formData.get("selfRating"),
    blockers: formData.get("blockers"),
    improvedAnswer: formData.get("improvedAnswer"),
    reviewerNote: formData.get("reviewerNote"),
    stabilityEvidence: formData.get("stabilityEvidence"),
    nextAction: formData.get("nextAction"),
    status: formData.get("status"),
  };
}

async function submitExpressionSession(event) {
  event.preventDefault();
  if (state.savingExpressionSession) return;

  const payload = formToExpressionSession(event.currentTarget);
  if (state.expressionSessionDraft) {
    state.expressionSessionDraft = { ...state.expressionSessionDraft, ...payload };
  } else {
    state.expressionSessions = state.expressionSessions.map((item) =>
      item.id === state.selectedExpressionSessionId ? { ...item, ...payload } : item,
    );
  }
  state.savingExpressionSession = true;
  render();

  try {
    const isNew = Boolean(state.expressionSessionDraft);
    const path = isNew
      ? "/api/expression-sessions"
      : `/api/expression-sessions/${encodeURIComponent(state.selectedExpressionSessionId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedExpressionSessionId = result.expressionSession.id;
    state.selectedExpressionDrillId = result.expressionSession.drillId;
    state.expressionSessionDraft = null;
    showToast("练习记录已保存");
    const list = await api("/api/expression-sessions");
    state.expressionSessions = list.expressionSessions || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingExpressionSession = false;
    render();
  }
}

function formToPortfolioProfile(form) {
  const formData = new FormData(form);
  return {
    displayName: formData.get("displayName"),
    headline: formData.get("headline"),
    targetRole: formData.get("targetRole"),
    location: formData.get("location"),
    summary: formData.get("summary"),
    coreSkills: formData.get("coreSkills"),
    contactNote: formData.get("contactNote"),
    portfolioStatus: formData.get("portfolioStatus"),
    publishChecklist: formData.get("publishChecklist"),
  };
}

async function submitPortfolioProfile(event) {
  event.preventDefault();
  if (state.savingPortfolioProfile) return;

  const payload = formToPortfolioProfile(event.currentTarget);
  state.portfolioProfile = { ...state.portfolioProfile, ...payload };
  state.savingPortfolioProfile = true;
  render();

  try {
    const result = await api("/api/portfolio-profile", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    state.portfolioProfile = result.profile;
    showToast("作品集资料已保存");
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingPortfolioProfile = false;
    render();
  }
}

function formToPortfolioProject(form) {
  const formData = new FormData(form);
  return {
    projectAmmoId: formData.get("projectAmmoId"),
    projectName: formData.get("projectName"),
    displayTitle: formData.get("displayTitle"),
    subtitle: formData.get("subtitle"),
    summary: formData.get("summary"),
    role: formData.get("role"),
    period: formData.get("period"),
    problem: formData.get("problem"),
    solution: formData.get("solution"),
    impact: formData.get("impact"),
    metrics: formData.get("metrics"),
    skills: formData.get("skills"),
    evidence: formData.get("evidence"),
    privacyNote: formData.get("privacyNote"),
    sortOrder: formData.get("sortOrder"),
    visibility: formData.get("visibility"),
    readiness: formData.get("readiness"),
  };
}

async function submitPortfolioProject(event) {
  event.preventDefault();
  if (state.savingPortfolioProject) return;

  const payload = formToPortfolioProject(event.currentTarget);
  if (state.portfolioProjectDraft) {
    state.portfolioProjectDraft = { ...state.portfolioProjectDraft, ...payload };
  } else {
    state.portfolioProjects = state.portfolioProjects.map((item) =>
      item.id === state.selectedPortfolioProjectId ? { ...item, ...payload } : item,
    );
  }
  state.savingPortfolioProject = true;
  render();

  try {
    const isNew = Boolean(state.portfolioProjectDraft);
    const path = isNew
      ? "/api/portfolio-projects"
      : `/api/portfolio-projects/${encodeURIComponent(state.selectedPortfolioProjectId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedPortfolioProjectId = result.portfolioProject.id;
    state.portfolioProjectDraft = null;
    showToast("作品集项目已保存");
    const list = await api("/api/portfolio-projects");
    state.portfolioProjects = list.portfolioProjects || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingPortfolioProject = false;
    render();
  }
}

function formToAiAnalysisNote(form) {
  const formData = new FormData(form);
  return {
    analysisType: formData.get("analysisType"),
    sourceType: formData.get("sourceType"),
    sourceId: formData.get("sourceId"),
    sourceTitle: formData.get("sourceTitle"),
    title: formData.get("title"),
    contextSnapshot: formData.get("contextSnapshot"),
    promptDraft: formData.get("promptDraft"),
    aiResponse: formData.get("aiResponse"),
    structuredResponse: formData.get("structuredResponse"),
    humanDecision: formData.get("humanDecision"),
    nextAction: formData.get("nextAction"),
    status: formData.get("status"),
  };
}

async function generateAiAnalysisContext() {
  const form = document.querySelector("#ai-analysis-form");
  if (!form || state.generatingAiContext) return;

  const payload = formToAiAnalysisNote(form);
  state.generatingAiContext = true;
  render();

  try {
    const result = await api("/api/ai-analysis-context", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const next = {
      ...selectedAiAnalysisNote(),
      ...payload,
      sourceTitle: result.sourceTitle,
      contextSnapshot: result.contextSnapshot,
      promptDraft: result.promptDraft,
      title: payload.title || `${optionLabel(AI_ANALYSIS_TYPES, payload.analysisType)} - ${result.sourceTitle}`,
      status: payload.status === "draft" ? "prompt_ready" : payload.status,
    };
    if (state.aiAnalysisNoteDraft) {
      state.aiAnalysisNoteDraft = next;
    } else {
      state.aiAnalysisNotes = state.aiAnalysisNotes.map((item) =>
        item.id === state.selectedAiAnalysisNoteId ? { ...item, ...next } : item,
      );
    }
    showToast("上下文和提示词已生成");
  } catch (error) {
    showError(error.message);
  } finally {
    state.generatingAiContext = false;
    render();
  }
}

async function submitAiAnalysisNote(event) {
  event.preventDefault();
  if (state.savingAiAnalysisNote) return;

  const payload = formToAiAnalysisNote(event.currentTarget);
  if (state.aiAnalysisNoteDraft) {
    state.aiAnalysisNoteDraft = { ...state.aiAnalysisNoteDraft, ...payload };
  } else {
    state.aiAnalysisNotes = state.aiAnalysisNotes.map((item) =>
      item.id === state.selectedAiAnalysisNoteId ? { ...item, ...payload } : item,
    );
  }
  state.savingAiAnalysisNote = true;
  render();

  try {
    const isNew = Boolean(state.aiAnalysisNoteDraft);
    const path = isNew ? "/api/ai-analysis-notes" : `/api/ai-analysis-notes/${encodeURIComponent(state.selectedAiAnalysisNoteId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedAiAnalysisNoteId = result.aiAnalysisNote.id;
    state.aiAnalysisNoteDraft = null;
    showToast("AI 分析记录已保存");
    const list = await api("/api/ai-analysis-notes");
    state.aiAnalysisNotes = list.aiAnalysisNotes || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingAiAnalysisNote = false;
    render();
  }
}

async function parseAiAnalysisCandidates() {
  const note = selectedAiAnalysisNote();
  const form = document.querySelector("#ai-analysis-form");
  if (!note?.id || !form || state.parsingAiCandidates) {
    showInfo("请先保存复盘诊断记录，再解析结构化候选");
    return;
  }
  const payload = formToAiAnalysisNote(form);
  state.parsingAiCandidates = true;
  render();
  try {
    await api(`/api/ai-analysis-notes/${encodeURIComponent(note.id)}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const result = await api(`/api/ai-analysis-notes/${encodeURIComponent(note.id)}/parse-candidates`, {
      method: "POST",
      body: JSON.stringify({ structuredResponse: payload.structuredResponse }),
    });
    state.aiAnalysisNotes = state.aiAnalysisNotes.map((item) =>
      item.id === note.id ? result.aiAnalysisNote : item,
    );
    showToast("结构化候选已解析并保存");
  } catch (error) {
    showError(error.message);
  } finally {
    state.parsingAiCandidates = false;
    render();
  }
}

async function handleAiCandidateAction(button) {
  const note = selectedAiAnalysisNote();
  if (!note?.id || state.actingAiCandidateId) return;
  const candidateId = button.dataset.aiCandidateId;
  const candidateType = button.dataset.aiCandidateType;
  const action = button.dataset.aiCandidateAction;
  state.actingAiCandidateId = candidateId;
  render();
  try {
    const result = await api(`/api/ai-analysis-notes/${encodeURIComponent(note.id)}/candidate-actions`, {
      method: "POST",
      body: JSON.stringify({ candidateId, candidateType, action }),
    });
    state.aiAnalysisNotes = state.aiAnalysisNotes.map((item) =>
      item.id === note.id ? result.aiAnalysisNote : item,
    );
    if (action === "accept") {
      const [weaknessList, taskList, reviewList] = await Promise.all([
        api("/api/weaknesses"),
        api("/api/training-tasks"),
        api("/api/interview-reviews"),
      ]);
      state.weaknesses = weaknessList.weaknesses || [];
      state.trainingTasks = taskList.tasks || [];
      state.reviews = reviewList.reviews || [];
      showToast(candidateType === "weakness" ? "已采纳为能力缺陷" : "已采纳为训练任务");
    } else {
      showToast("候选已忽略");
    }
  } catch (error) {
    showError(error.message);
  } finally {
    state.actingAiCandidateId = null;
    render();
  }
}

function formToAiFrontierCard(form) {
  const formData = new FormData(form);
  return {
    topic: formData.get("topic"),
    category: formData.get("category"),
    sourceName: formData.get("sourceName"),
    sourceUrl: formData.get("sourceUrl"),
    sourceDate: formData.get("sourceDate"),
    summary: formData.get("summary"),
    keyInsights: formData.get("keyInsights"),
    productImplications: formData.get("productImplications"),
    interviewTransfer: formData.get("interviewTransfer"),
    portfolioTransfer: formData.get("portfolioTransfer"),
    openQuestions: formData.get("openQuestions"),
    tags: formData.get("tags"),
    status: formData.get("status"),
    priority: formData.get("priority"),
  };
}

async function submitAiFrontierCard(event) {
  event.preventDefault();
  if (state.savingAiFrontierCard) return;

  const payload = formToAiFrontierCard(event.currentTarget);
  if (state.aiFrontierCardDraft) {
    state.aiFrontierCardDraft = { ...state.aiFrontierCardDraft, ...payload };
  } else {
    state.aiFrontierCards = state.aiFrontierCards.map((item) =>
      item.id === state.selectedAiFrontierCardId ? { ...item, ...payload } : item,
    );
  }
  state.savingAiFrontierCard = true;
  render();

  try {
    const isNew = Boolean(state.aiFrontierCardDraft);
    const path = isNew ? "/api/ai-frontier-cards" : `/api/ai-frontier-cards/${encodeURIComponent(state.selectedAiFrontierCardId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedAiFrontierCardId = result.aiFrontierCard.id;
    state.aiFrontierCardDraft = null;
    showToast("AI 前沿卡片已保存");
    const list = await api("/api/ai-frontier-cards");
    state.aiFrontierCards = list.aiFrontierCards || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingAiFrontierCard = false;
    render();
  }
}

function formToRhythmLog(form) {
  const formData = new FormData(form);
  return {
    date: formData.get("date"),
    title: formData.get("title"),
    energyLevel: formData.get("energyLevel"),
    focusLevel: formData.get("focusLevel"),
    loadLevel: formData.get("loadLevel"),
    recoveryLevel: formData.get("recoveryLevel"),
    sleepHours: formData.get("sleepHours"),
    interviewLoad: formData.get("interviewLoad"),
    trainingLoad: formData.get("trainingLoad"),
    plannedFocus: formData.get("plannedFocus"),
    recoveryAction: formData.get("recoveryAction"),
    rhythmRisk: formData.get("rhythmRisk"),
    nextAdjustment: formData.get("nextAdjustment"),
    notes: formData.get("notes"),
    status: formData.get("status"),
  };
}

async function submitRhythmLog(event) {
  event.preventDefault();
  if (state.savingRhythmLog) return;

  const payload = formToRhythmLog(event.currentTarget);
  if (state.rhythmLogDraft) {
    state.rhythmLogDraft = { ...state.rhythmLogDraft, ...payload };
  } else {
    state.rhythmLogs = state.rhythmLogs.map((item) =>
      item.id === state.selectedRhythmLogId ? { ...item, ...payload } : item,
    );
  }
  state.savingRhythmLog = true;
  render();

  try {
    const isNew = Boolean(state.rhythmLogDraft);
    const path = isNew ? "/api/rhythm-logs" : `/api/rhythm-logs/${encodeURIComponent(state.selectedRhythmLogId)}`;
    const method = isNew ? "POST" : "PUT";
    const result = await api(path, {
      method,
      body: JSON.stringify(payload),
    });
    state.selectedRhythmLogId = result.rhythmLog.id;
    state.rhythmLogDraft = null;
    showToast("节奏记录已保存");
    const list = await api("/api/rhythm-logs");
    state.rhythmLogs = list.rhythmLogs || [];
  } catch (error) {
    showError(error.message);
  } finally {
    state.savingRhythmLog = false;
    render();
  }
}

function renderDispatchQueue(queue) {
  const topItems = queue.slice(0, 12);
  if (!topItems.length) {
    return `<div class="empty">当前没有需要调度的事项。下一步动作、面试、缺陷、训练和 AI 待决策都会汇总到这里。</div>`;
  }

  return `
    <div class="dispatch-list">
      ${topItems
        .map(
          (item) => `
            <button class="dispatch-item" data-dispatch-id="${escapeHtml(item.id)}" type="button">
              <div class="dispatch-main">
                <div class="dispatch-title-row">
                  <span class="tag dispatch-${item.priority}">${item.priority === "critical" ? "关键" : item.priority === "high" ? "高" : item.priority === "medium" ? "中" : "低"}</span>
                  <p class="work-item-title">${escapeHtml(item.title)}</p>
                </div>
                <p class="work-item-meta">${escapeHtml(item.meta)}</p>
                <p class="dispatch-reason">${escapeHtml(item.reason)}${item.dueAt ? ` · ${escapeHtml(dueLabel(item.dueAt))}` : ""}</p>
              </div>
              <span class="dispatch-action">${escapeHtml(item.actionLabel)}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderDispatchOverview(queue) {
  const data = dispatchMetrics(queue);
  return `
    <section class="panel dispatch-panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">总控调度队列</h2>
          <p class="panel-subtitle">从各模块实时汇总，优先处理关键项、逾期项和待人工决策事项。</p>
        </div>
      </div>
      <div class="panel-body">
        <section class="grid metrics compact-metrics dispatch-metrics">
          <div class="metric"><div class="metric-label">待调度</div><div class="metric-value">${data.total}</div></div>
          <div class="metric"><div class="metric-label">关键项</div><div class="metric-value">${data.critical}</div></div>
          <div class="metric"><div class="metric-label">今日/逾期</div><div class="metric-value">${data.dueNow}</div></div>
          <div class="metric"><div class="metric-label">待决策</div><div class="metric-value">${data.decisions}</div></div>
        </section>
        ${renderDispatchQueue(queue)}
      </div>
    </section>
  `;
}

function renderGlobalSearch() {
  const results = createGlobalSearchResults();
  const data = globalSearchMetrics();
  const query = state.globalSearchQuery.trim();

  return `
    ${renderTopbar("全局检索", "跨模块查找岗位、面试、复盘、训练、项目、作品集和节奏记录，并直接跳回原工作区。", "Global Search")}
    <section class="grid metrics compact-metrics">
      <div class="metric"><div class="metric-label">可检索记录</div><div class="metric-value">${data.totalRecords}</div></div>
      <div class="metric"><div class="metric-label">当前结果</div><div class="metric-value">${data.visibleResults}</div></div>
      <div class="metric"><div class="metric-label">筛选范围</div><div class="metric-value small">${escapeHtml(data.activeFilter)}</div></div>
      <div class="metric"><div class="metric-label">当前关键词</div><div class="metric-value small">${query ? escapeHtml(query) : "最近更新"}</div></div>
    </section>
    <div class="search-layout">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">检索条件</h2>
            <p class="panel-subtitle">支持多个关键词，用空格分隔；不输入关键词时显示最近更新的记录。</p>
          </div>
        </div>
        <div class="panel-body">
          <form id="global-search-form" class="search-form">
            <div class="form-field">
              <label>关键词</label>
              <input name="query" value="${escapeHtml(state.globalSearchQuery)}" placeholder="公司、项目、卡点、下一步动作..." autofocus />
            </div>
            <div class="form-field">
              <label>范围</label>
              ${renderSelect("filter", GLOBAL_SEARCH_FILTERS, state.globalSearchFilter)}
            </div>
            <div class="actions">
              <button class="btn primary" type="submit">检索</button>
              <button class="btn" id="clear-global-search-btn" type="button">清空</button>
            </div>
          </form>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">结果</h2>
            <p class="panel-subtitle">${query ? "按关键词匹配标题、状态、正文和下一步动作。" : "展示最近更新的跨模块记录。"}</p>
          </div>
        </div>
        <div class="panel-body">
          ${renderGlobalSearchResults(results)}
        </div>
      </section>
    </div>
  `;
}

function renderGlobalSearchResults(results) {
  if (!results.length) {
    return `<div class="empty">没有匹配结果。可以减少关键词，或切换到“全部内容”。</div>`;
  }

  return `
    <div class="work-list search-results">
      ${results
        .map(
          (item) => `
            <button class="work-item search-result" data-global-search-result="${escapeHtml(item.key)}" type="button">
              <div class="search-result-main">
                <p class="work-item-title">${escapeHtml(item.title)}</p>
                <p class="work-item-meta">${escapeHtml(item.meta)}${item.updatedAt ? ` · ${escapeHtml(formatDateTime(item.updatedAt))}` : ""}</p>
                ${item.content ? `<p class="search-result-content">${escapeHtml(item.content).slice(0, 180)}</p>` : ""}
              </div>
              <div class="search-result-tags">
                <span class="tag search-kind">${optionLabel(GLOBAL_SEARCH_FILTERS, item.type)}</span>
                ${item.badges
                  .slice(0, 3)
                  .map((badge) => `<span class="tag muted">${escapeHtml(badge)}</span>`)
                  .join("")}
              </div>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderTodayActions(queue) {
  const dueNow = queue.filter((item) => ["overdue", "today"].includes(dateBucket(item.dueAt))).length;
  const openTraining = state.trainingTasks.filter((item) => ["todo", "doing", "reviewing"].includes(item.status)).length;
  return `
    <section class="daily-actions">
      <div>
        <p class="eyebrow">Today Actions</p>
        <h2>今天先处理这些入口</h2>
        <p>${dueNow ? `有 ${dueNow} 个今日/逾期事项需要关注。` : "当前没有今日到期压力，可以补记录或推进训练。"}</p>
      </div>
      <div class="daily-action-grid">
        <button class="quick-action" data-quick-action="new-opportunity" type="button">
          <span>新增岗位</span>
          <strong>记录新机会</strong>
        </button>
        <button class="quick-action" data-quick-action="global-search" type="button">
          <span>全局检索</span>
          <strong>快速找材料</strong>
        </button>
        <button class="quick-action" data-quick-action="new-ai-analysis" type="button">
          <span>AI 分析</span>
          <strong>生成上下文</strong>
        </button>
        <button class="quick-action" data-quick-action="new-rhythm-log" type="button">
          <span>今日节奏</span>
          <strong>记录负荷</strong>
        </button>
        <button class="quick-action" data-quick-action="training-plan" type="button">
          <span>训练计划</span>
          <strong>${openTraining} 个进行中</strong>
        </button>
      </div>
    </section>
  `;
}

function renderDashboard() {
  const topbar = renderTopbar(
    "总控台",
    "先看整体态势：哪些机会在推进，哪些事项需要下一步动作，哪里有面试风险。",
    "00 Control Center",
  );
  const pending = state.opportunities.filter((item) => item.nextAction).slice(0, 6);
  const highRisk = state.opportunities.filter((item) => item.riskLevel === "high").slice(0, 4);
  const pendingInterviews = state.interviews
    .filter((item) => !["completed", "reviewed", "cancelled"].includes(item.status))
    .slice(0, 6);
  const reviewedInterviewIds = new Set(state.reviews.map((review) => review.interviewRoundId));
  const pendingReviews = state.interviews
    .filter((item) => item.status === "completed" && !reviewedInterviewIds.has(item.id))
    .slice(0, 6);
  const openWeaknesses = state.weaknesses
    .filter((item) => ["open", "training", "validating"].includes(item.status))
    .slice(0, 6);
  const activeTrainingTasks = state.trainingTasks
    .filter((item) => ["todo", "doing", "reviewing"].includes(item.status))
    .slice(0, 6);
  const pendingFollowUps = state.followUpQuestions
    .filter((item) => ["needs_drill", "unanswered", "drafted"].includes(item.status))
    .slice(0, 6);
  const unstableDrills = state.expressionDrills
    .filter((item) => ["todo", "practicing", "reviewing"].includes(item.status) || item.score !== "stable")
    .slice(0, 6);
  const projectAmmo = projectAmmoMetrics();
  const portfolio = portfolioMetrics();
  const pendingAiDecisions = state.aiAnalysisNotes
    .filter((item) => item.status === "ai_responded")
    .slice(0, 6);
  const dispatchQueue = createDispatchQueue();

  return `
    ${topbar}
    ${renderMetricGrid()}
    ${renderTodayActions(dispatchQueue)}
    ${renderDispatchOverview(dispatchQueue)}
    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">待准备面试</h2>
            <p class="panel-subtitle">从面试轮次中汇总未完成的准备事项。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="work-list">
            ${
              pendingInterviews.length
                ? pendingInterviews
                    .map(
                      (item) => `
                        <button class="work-item" data-select-id="${escapeHtml(item.opportunityId)}" data-interview-id="${escapeHtml(item.id)}" type="button">
                          <div>
                            <p class="work-item-title">${escapeHtml(item.companyName)} · ${escapeHtml(item.roleTitle)}</p>
                            <p class="work-item-meta">${escapeHtml(item.roundName)} · ${optionLabel(ROUND_TYPES, item.roundType)}${item.scheduledAt ? ` · ${escapeHtml(formatDateTime(item.scheduledAt))}` : ""}</p>
                          </div>
                          <span class="tag prep-${item.preparationStatus}">${optionLabel(PREPARATION_STATUSES, item.preparationStatus)}</span>
                        </button>
                      `,
                    )
                    .join("")
                : `<div class="empty">暂无待准备面试。收到邀约后，在岗位详情中创建面试轮次。</div>`
            }
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">待复盘面试</h2>
            <p class="panel-subtitle">标记为已完成、但还没有复盘的面试。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="work-list">
            ${
              pendingReviews.length
                ? pendingReviews
                    .map(
                      (item) => `
                        <button class="work-item" data-select-id="${escapeHtml(item.opportunityId)}" data-review-interview-id="${escapeHtml(item.id)}" type="button">
                          <div>
                            <p class="work-item-title">${escapeHtml(item.companyName)} · ${escapeHtml(item.roleTitle)}</p>
                            <p class="work-item-meta">${escapeHtml(item.roundName)} · ${optionLabel(ROUND_TYPES, item.roundType)}${item.scheduledAt ? ` · ${escapeHtml(formatDateTime(item.scheduledAt))}` : ""}</p>
                          </div>
                          <span class="tag stage">待复盘</span>
                        </button>
                      `,
                    )
                    .join("")
                : `<div class="empty">暂无待复盘面试。</div>`
            }
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">岗位下一步</h2>
            <p class="panel-subtitle">从 Pipeline 的 nextAction 字段汇总。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="work-list">
            ${
              pending.length
                ? pending
                    .map(
                      (item) => `
                        <button class="work-item" data-select-id="${escapeHtml(item.id)}" type="button">
                          <div>
                            <p class="work-item-title">${escapeHtml(item.companyName)} · ${escapeHtml(item.roleTitle)}</p>
                            <p class="work-item-meta">${escapeHtml(item.nextAction)}${item.nextActionDueAt ? ` · ${escapeHtml(item.nextActionDueAt)}` : ""}</p>
                          </div>
                          <span class="tag stage">${optionLabel(STAGES, item.stage)}</span>
                        </button>
                      `,
                    )
                    .join("")
                : `<div class="empty">暂无岗位下一步动作。</div>`
            }
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">开放缺陷</h2>
            <p class="panel-subtitle">还没有被修复或归档的能力短板。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="work-list">
            ${
              openWeaknesses.length
                ? openWeaknesses
                    .map(
                      (item) => `
                        <button class="work-item" data-dashboard-weakness-id="${escapeHtml(item.id)}" type="button">
                          <div>
                            <p class="work-item-title">${escapeHtml(item.title)}</p>
                            <p class="work-item-meta">${optionLabel(WEAKNESS_CATEGORIES, item.category)} · 证据 ${(item.relatedReviewIds || []).length} 条</p>
                          </div>
                          <span class="tag severity-${item.severity}">${optionLabel(SEVERITIES, item.severity)}</span>
                        </button>
                      `,
                    )
                    .join("")
                : `<div class="empty">暂无开放缺陷。</div>`
            }
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">训练任务</h2>
            <p class="panel-subtitle">待做、进行中和待验收的修复动作。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="work-list">
            ${
              activeTrainingTasks.length
                ? activeTrainingTasks
                    .map(
                      (item) => `
                        <button class="work-item" data-dashboard-task-id="${escapeHtml(item.id)}" type="button">
                          <div>
                            <p class="work-item-title">${escapeHtml(item.title)}</p>
                            <p class="work-item-meta">${optionLabel(TRAINING_TASK_TYPES, item.taskType)}${item.dueAt ? ` · ${escapeHtml(item.dueAt)}` : ""}</p>
                          </div>
                          <span class="tag task-${item.status}">${optionLabel(TRAINING_TASK_STATUSES, item.status)}</span>
                        </button>
                      `,
                    )
                    .join("")
                : `<div class="empty">暂无进行中的训练任务。</div>`
            }
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">项目弹药</h2>
            <p class="panel-subtitle">可用于面试的项目素材与待深挖项目。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="work-list">
            <button class="work-item" data-module-shortcut="projectAmmo" type="button">
              <div>
                <p class="work-item-title">可用项目：${projectAmmo.usable}</p>
                <p class="work-item-meta">待深挖：${projectAmmo.needsDeepening} · 总数：${projectAmmo.total}</p>
              </div>
              <span class="tag stage">进入弹药库</span>
            </button>
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">待稳定追问</h2>
            <p class="panel-subtitle">还没有稳定回答的项目追问。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="work-list">
            ${
              pendingFollowUps.length
                ? pendingFollowUps
                    .map(
                      (item) => `
                        <button class="work-item" data-dashboard-follow-up-id="${escapeHtml(item.id)}" type="button">
                          <div>
                            <p class="work-item-title">${escapeHtml(item.question)}</p>
                            <p class="work-item-meta">${optionLabel(FOLLOW_UP_QUESTION_TYPES, item.questionType)} · ${optionLabel(RISK_LEVELS, item.riskLevel)}</p>
                          </div>
                          <span class="tag follow-${item.status}">${optionLabel(FOLLOW_UP_QUESTION_STATUSES, item.status)}</span>
                        </button>
                      `,
                    )
                    .join("")
                : `<div class="empty">暂无待稳定项目追问。</div>`
            }
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">表达训练</h2>
            <p class="panel-subtitle">待练、练习中、待复核或评分未稳定的表达训练。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="work-list">
            ${
              unstableDrills.length
                ? unstableDrills
                    .map(
                      (item) => `
                        <button class="work-item" data-dashboard-drill-id="${escapeHtml(item.id)}" type="button">
                          <div>
                            <p class="work-item-title">${escapeHtml(item.question)}</p>
                            <p class="work-item-meta">${optionLabel(EXPRESSION_DRILL_SOURCE_TYPES, item.sourceType)} · ${optionLabel(EXPRESSION_DRILL_SCORES, item.score)}</p>
                          </div>
                          <span class="tag drill-${item.status}">${optionLabel(EXPRESSION_DRILL_STATUSES, item.status)}</span>
                        </button>
                      `,
                    )
                    .join("")
                : `<div class="empty">暂无不稳定表达训练。</div>`
            }
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">作品集准备</h2>
            <p class="panel-subtitle">未来公开展示前的项目卡和发布状态。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="work-list">
            <button class="work-item" data-module-shortcut="portfolio" type="button">
              <div>
                <p class="work-item-title">预览项目：${portfolio.inPreview}</p>
                <p class="work-item-meta">可展示：${portfolio.ready} · 待处理：${portfolio.needsWork} · ${optionLabel(PORTFOLIO_STATUSES, state.portfolioProfile?.portfolioStatus)}</p>
              </div>
              <span class="tag portfolio-${state.portfolioProfile?.portfolioStatus || "draft"}">进入作品集</span>
            </button>
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">AI 待决策</h2>
            <p class="panel-subtitle">已经粘贴 AI 输出，但还没有形成你的人工判断。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="work-list">
            ${
              pendingAiDecisions.length
                ? pendingAiDecisions
                    .map(
                      (item) => `
                        <button class="work-item" data-dashboard-ai-note-id="${escapeHtml(item.id)}" type="button">
                          <div>
                            <p class="work-item-title">${escapeHtml(item.title)}</p>
                            <p class="work-item-meta">${optionLabel(AI_ANALYSIS_TYPES, item.analysisType)} · ${escapeHtml(item.sourceTitle || optionLabel(AI_ANALYSIS_SOURCE_TYPES, item.sourceType))}</p>
                          </div>
                          <span class="tag ai-${item.status}">${optionLabel(AI_ANALYSIS_STATUSES, item.status)}</span>
                        </button>
                      `,
                    )
                    .join("")
                : `<div class="empty">暂无 AI 待决策记录。可以在 AI 辅助分析里生成提示词并粘贴输出。</div>`
            }
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderPipeline() {
  return `
    ${renderTopbar("求职项目管理中台", "用 Pipeline 管理岗位机会、阶段、优先级、风险和下一步动作。", "01 Job Pipeline")}
    ${renderMetricGrid()}
    <div class="workspace">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Pipeline 看板</h2>
            <p class="panel-subtitle">按岗位阶段横向展示，第一版用于快速记录和调整状态。</p>
          </div>
        </div>
        <div class="panel-body">${renderPipelineBoard()}</div>
      </section>
      ${renderDetailPanel()}
    </div>
  `;
}

function renderPreInterviewSelector() {
  if (!state.interviews.length) {
    return `<div class="empty">还没有面试轮次。先到求职中台为岗位创建一面、二面或 HR 面。</div>`;
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">选择面试轮次</h2>
          <p class="panel-subtitle">作战 Brief 会绑定到具体一轮面试。</p>
        </div>
      </div>
      <div class="panel-body">
        <select id="pre-interview-selector">
          ${state.interviews
            .map(
              (interview) => `
                <option value="${escapeHtml(interview.id)}" ${interview.id === state.selectedInterviewId ? "selected" : ""}>
                  ${escapeHtml(interview.companyName)} · ${escapeHtml(interview.roleTitle)} · ${escapeHtml(interview.roundName)}
                </option>
              `,
            )
            .join("")}
        </select>
      </div>
    </section>
  `;
}

function renderBriefProgress() {
  const readyCount = state.briefs.filter((brief) => brief.status === "ready").length;
  const draftCount = state.briefs.filter((brief) => brief.status === "draft").length;
  const reworkCount = state.briefs.filter((brief) => brief.status === "needs_rework").length;
  return `
    <section class="grid metrics compact-metrics">
      <div class="metric"><div class="metric-label">Brief 总数</div><div class="metric-value">${state.briefs.length}</div></div>
      <div class="metric"><div class="metric-label">草稿</div><div class="metric-value">${draftCount}</div></div>
      <div class="metric"><div class="metric-label">已准备</div><div class="metric-value">${readyCount}</div></div>
      <div class="metric"><div class="metric-label">需补强</div><div class="metric-value">${reworkCount}</div></div>
    </section>
  `;
}

function renderBriefField(name, label, value, placeholder = "") {
  return `
    <div class="form-field full">
      <label>${label}</label>
      <textarea name="${name}" placeholder="${escapeHtml(placeholder)}">${escapeHtml(value)}</textarea>
    </div>
  `;
}

function renderBriefForm(interview) {
  const brief = selectedBrief();
  const opportunity = state.opportunities.find((item) => item.id === interview?.opportunityId);
  const isNew = Boolean(state.briefDraft);

  if (!interview) {
    return `<div class="empty">请选择一轮面试。</div>`;
  }

  if (!brief) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">${escapeHtml(interview.companyName)} · ${escapeHtml(interview.roundName)}</h2>
            <p class="panel-subtitle">还没有作战 Brief，先创建一份准备材料。</p>
          </div>
          <button class="btn primary" id="create-brief-btn" type="button">创建 Brief</button>
        </div>
        <div class="panel-body">
          <div class="empty">创建后可以填写公司调研、JD 拆解、项目映射、高风险问题和准备清单。</div>
        </div>
      </section>
    `;
  }

  return `
    <section class="panel brief-panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">${escapeHtml(interview.companyName)} · ${escapeHtml(interview.roleTitle)}</h2>
          <p class="panel-subtitle">${escapeHtml(interview.roundName)} · ${optionLabel(ROUND_TYPES, interview.roundType)}${interview.scheduledAt ? ` · ${escapeHtml(formatDateTime(interview.scheduledAt))}` : ""}</p>
        </div>
        <div class="tag-row">
          <span class="tag prep-${interview.preparationStatus}">${optionLabel(PREPARATION_STATUSES, interview.preparationStatus)}</span>
        </div>
      </div>
      <div class="panel-body">
        ${renderBriefWarRoom(brief)}
        <form id="brief-form" class="form-grid brief-form">
          <div class="form-field">
            <label>Brief 状态</label>
            ${renderSelect("status", BRIEF_STATUSES, brief.status)}
          </div>
          <div class="form-field">
            <label>关联岗位</label>
            <input value="${escapeHtml(opportunity ? `${opportunity.companyName} · ${opportunity.roleTitle}` : interview.roleTitle)}" disabled />
          </div>
          ${renderBriefField("companyResearch", "公司调研", brief.companyResearch, "业务模式、融资/产品信号、近期动作、面试可切入点")}
          ${renderBriefField("businessSummary", "业务与产品理解", brief.businessSummary, "这家公司解决什么问题，目标用户是谁，核心业务链路是什么")}
          ${renderBriefField("productSummary", "产品理解", brief.productSummary, "产品形态、关键功能、AI 相关能力、可能的产品判断题")}
          ${renderBriefField("jdRequirements", "JD 拆解", brief.jdRequirements, "显性要求、核心职责、能力关键词")}
          ${renderBriefField("hiddenExpectations", "隐性期待", brief.hiddenExpectations, "JD 背后真正想筛什么能力")}
          ${renderBriefField("matchingEvidence", "匹配证据", brief.matchingEvidence, "你的经历里哪些事实能证明匹配")}
          ${renderBriefField("riskGaps", "风险缺口", brief.riskGaps, "哪些地方容易被追问或暴露短板")}
          ${renderBriefField("projectMapping", "项目经历映射", brief.projectMapping, "把岗位要求映射到你的项目案例和表达素材")}
          ${renderBriefField("questionPredictions", "高频问题预测", brief.questionPredictions, "面试官最可能问哪些问题")}
          ${renderBriefField("highRiskQuestions", "高风险问题", brief.highRiskQuestions, "最容易翻车的问题，以及要补强的回答方向")}
          ${renderBriefField("prepChecklist", "准备清单", brief.prepChecklist, "面试前必须完成的动作，可用 Markdown checklist")}
          <input name="opportunityId" type="hidden" value="${escapeHtml(interview.opportunityId)}" />
          <input name="interviewRoundId" type="hidden" value="${escapeHtml(interview.id)}" />
          <div class="form-field full">
            <div class="actions">
              ${isNew ? `<button class="btn" id="cancel-brief-btn" type="button">取消</button>` : ""}
              <button class="btn primary" type="submit"${disabledAttr(state.savingBrief)}>${state.savingBrief ? "保存中..." : "保存作战 Brief"}</button>
            </div>
            <div class="status-line">${brief.updatedAt ? `上次更新：${escapeHtml(brief.updatedAt)}` : "保存后会写入 content/pre-interview-briefs。"}</div>
          </div>
        </form>
      </div>
    </section>
  `;
}

function renderBriefWarRoom(brief) {
  const stats = briefWarRoomStats(brief);
  const advice = briefWarRoomAdvice(brief);

  return `
    <section class="war-room">
      <div class="section-heading">
        <div>
          <h3>作战态势</h3>
          <p>先判断准备完整度，再检查 JD、项目证据、问题预测和高风险预案。</p>
        </div>
        <span class="tag war-score">${stats.completionRate}% 完整</span>
      </div>
      <div class="war-room-grid">
        <div class="war-card">
          <div class="war-card-head">
            <span>准备完整度</span>
            <strong>${stats.completed}/${stats.total}</strong>
          </div>
          <div class="committee-checks">
            ${stats.completionItems
              .map(
                (item) => `
                  <span class="committee-check ${item.done ? "done" : "todo"}">
                    ${item.done ? "已准备" : "待补充"} · ${item.label}
                  </span>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="war-card">
          <div class="war-card-head">
            <span>作战重点</span>
            <strong>${optionLabel(BRIEF_STATUSES, brief.status)}</strong>
          </div>
          <div class="answer-stats">
            <div><span>JD</span><strong>${stats.jdCount}</strong></div>
            <div><span>证据</span><strong>${stats.evidenceCount}</strong></div>
            <div><span>预测</span><strong>${stats.predictionCount}</strong></div>
            <div><span>风险</span><strong>${stats.riskCount}</strong></div>
          </div>
          <p class="mini-meta">按换行统计条目，用来快速判断准备材料是否够密。</p>
        </div>
        <div class="war-card">
          <div class="war-card-head">
            <span>准备清单</span>
            <strong>${stats.checklist.total ? `${stats.checklist.checked}/${stats.checklist.total}` : "未拆项"}</strong>
          </div>
          <div class="answer-stats checklist-stats">
            <div><span>总项</span><strong>${stats.checklist.total || stats.checklist.rawItems}</strong></div>
            <div><span>已完成</span><strong>${stats.checklist.checked}</strong></div>
            <div><span>未完成</span><strong>${stats.checklist.unchecked}</strong></div>
          </div>
          <p class="mini-meta">支持 Markdown checkbox：- [ ] / - [x]。</p>
        </div>
      </div>
      <div class="closure-advice ${advice.tone}">
        <div>
          <strong>${escapeHtml(advice.title)}</strong>
          <p>${escapeHtml(advice.body)}</p>
        </div>
      </div>
    </section>
    <div class="detail-divider"></div>
  `;
}

function renderPreInterview() {
  const interview = selectedInterview();
  return `
    ${renderTopbar("面试前作战室", "围绕具体面试轮次完成公司调研、JD 拆解、项目映射、问题预测和准备清单。", "02 Pre-Interview Room")}
    ${renderBriefProgress()}
    <div class="pre-interview-layout">
      ${renderPreInterviewSelector()}
      ${renderBriefForm(interview)}
    </div>
    ${renderBriefProjectCandidates()}
  `;
}

function renderBriefProjectCandidates() {
  const candidates = state.projectAmmos.filter((item) => item.status === "usable").slice(0, 6);

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">候选项目素材</h2>
          <p class="panel-subtitle">项目弹药状态为“可用于面试”的素材，可以迁移到 Brief 的项目映射里。</p>
        </div>
      </div>
      <div class="panel-body">
        <div class="work-list">
          ${
            candidates.length
              ? candidates
                  .map((ammo) => {
                    const stableCount = questionsForProjectAmmo(ammo.id).filter((item) => item.status === "stable").length;
                    return `
                      <button class="work-item" data-brief-project-id="${escapeHtml(ammo.id)}" type="button">
                        <div>
                          <p class="work-item-title">${escapeHtml(ammo.projectName)}</p>
                          <p class="work-item-meta">${optionLabel(PROJECT_TYPES, ammo.projectType)} · 稳定追问 ${stableCount} 条</p>
                        </div>
                        <span class="tag project-${ammo.status}">${optionLabel(PROJECT_AMMO_STATUSES, ammo.status)}</span>
                      </button>
                    `;
                  })
                  .join("")
              : `<div class="empty">暂无可用于面试的项目素材。先到项目弹药库把成熟项目标记为“可用于面试”。</div>`
          }
        </div>
      </div>
    </section>
  `;
}

function renderPostInterview() {
  const interview = selectedInterview();
  return `
    ${renderTopbar("面试后复盘室", "记录真实问题、回答表现、挂点分析和面试结果，把一次面试变成下一轮的训练资产。", "03 Post-Interview Review")}
    ${renderReviewProgress()}
    <div class="pre-interview-layout">
      ${renderReviewSelector()}
      ${renderReviewForm(interview)}
    </div>
  `;
}

function renderReviewSelector() {
  if (!state.interviews.length) {
    return `<div class="empty">还没有面试轮次。先到求职中台创建面试轮次。</div>`;
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">选择面试轮次</h2>
          <p class="panel-subtitle">优先复盘状态为已完成的面试。</p>
        </div>
      </div>
      <div class="panel-body">
        <select id="review-selector">
          ${state.interviews
            .map(
              (interview) => `
                <option value="${escapeHtml(interview.id)}" ${interview.id === state.selectedInterviewId ? "selected" : ""}>
                  ${escapeHtml(interview.companyName)} · ${escapeHtml(interview.roleTitle)} · ${escapeHtml(interview.roundName)} · ${optionLabel(INTERVIEW_STATUSES, interview.status)}
                </option>
              `,
            )
            .join("")}
        </select>
      </div>
    </section>
  `;
}

function renderReviewProgress() {
  const data = reviewMetrics();
  return `
    <section class="grid metrics compact-metrics">
      <div class="metric"><div class="metric-label">复盘总数</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">待复盘</div><div class="metric-value">${data.needsReview}</div></div>
      <div class="metric"><div class="metric-label">需追踪</div><div class="metric-value">${data.followup}</div></div>
      <div class="metric"><div class="metric-label">已复盘</div><div class="metric-value">${state.reviews.filter((review) => review.status === "reviewed").length}</div></div>
    </section>
  `;
}

function renderReviewForm(interview) {
  const review = selectedReview();
  const isNew = Boolean(state.reviewDraft);

  if (!interview) {
    return `<div class="empty">请选择一轮面试。</div>`;
  }

  if (!review) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">${escapeHtml(interview.companyName)} · ${escapeHtml(interview.roundName)}</h2>
            <p class="panel-subtitle">还没有面试复盘，面试结束后尽快记录真实问题。</p>
          </div>
          <button class="btn primary" id="create-review-btn" type="button">创建复盘</button>
        </div>
        <div class="panel-body">
          <div class="empty">创建后可以记录实际问题、强弱回答、挂点分析和面试官信号。</div>
        </div>
      </section>
    `;
  }

  return `
    <section class="panel brief-panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">${escapeHtml(interview.companyName)} · ${escapeHtml(interview.roleTitle)}</h2>
          <p class="panel-subtitle">${escapeHtml(interview.roundName)} · ${optionLabel(ROUND_TYPES, interview.roundType)}${interview.scheduledAt ? ` · ${escapeHtml(formatDateTime(interview.scheduledAt))}` : ""}</p>
        </div>
        <div class="tag-row">
          <span class="tag stage">${optionLabel(REVIEW_STATUSES, review.status)}</span>
        </div>
      </div>
      <div class="panel-body">
        ${renderReviewCommittee(review)}
        <form id="review-form" class="form-grid brief-form">
          <div class="form-field">
            <label>复盘状态</label>
            ${renderSelect("status", REVIEW_STATUSES, review.status)}
          </div>
          <div class="form-field">
            <label>自我评级</label>
            ${renderSelect("selfRating", REVIEW_SELF_RATINGS, review.selfRating)}
          </div>
          <div class="form-field">
            <label>面试结果</label>
            ${renderSelect("result", REVIEW_RESULTS, review.result)}
          </div>
          <div class="form-field">
            <label>关联面试</label>
            <input value="${escapeHtml(`${interview.companyName} · ${interview.roundName}`)}" disabled />
          </div>
          ${renderBriefField("actualQuestions", "实际问题", review.actualQuestions, "面试官实际问了什么，尽量按顺序记录")}
          ${renderBriefField("strongAnswers", "强回答", review.strongAnswers, "哪些回答有证据、有结构、有说服力")}
          ${renderBriefField("weakAnswers", "弱回答", review.weakAnswers, "哪些回答卡住、泛泛而谈或缺少证据")}
          ${renderBriefField("failurePoints", "挂点分析", review.failurePoints, "弱回答背后的原因是什么，是项目不深、认知不足还是表达不稳")}
          ${renderBriefField("interviewerSignals", "面试官信号", review.interviewerSignals, "追问、打断、认可、质疑、反馈等信号")}
          ${renderBriefField("summary", "总结", review.summary, "本轮最大的收获、风险和下一步动作")}
          <input name="opportunityId" type="hidden" value="${escapeHtml(interview.opportunityId)}" />
          <input name="interviewRoundId" type="hidden" value="${escapeHtml(interview.id)}" />
          <div class="form-field full linked-panel">
            <div>
              <label>关联能力缺陷</label>
              <p class="mini-meta">${(review.linkedWeaknessIds || []).length ? `已关联 ${(review.linkedWeaknessIds || []).length} 个缺陷` : "尚未关联能力缺陷"}</p>
            </div>
            <div class="actions">
              <button class="btn" id="create-ai-diagnosis-from-review-btn" type="button">生成 AI 诊断流程</button>
              <button class="btn" id="create-weakness-from-review-btn" type="button">直接创建缺陷</button>
            </div>
          </div>
          <div class="form-field full">
            <div class="actions">
              ${isNew ? `<button class="btn" id="cancel-review-btn" type="button">取消</button>` : ""}
              <button class="btn primary" type="submit"${disabledAttr(state.savingReview)}>${state.savingReview ? "保存中..." : "保存面试复盘"}</button>
            </div>
            <div class="status-line">${review.updatedAt ? `上次更新：${escapeHtml(review.updatedAt)}` : "保存后会写入 content/interview-reviews。"}</div>
          </div>
        </form>
      </div>
    </section>
  `;
}

function renderReviewCommittee(review) {
  const stats = reviewCommitteeStats(review);
  const categories = reviewFailureCategories(review);
  const advice = reviewClosureAdvice(review);

  return `
    <section class="review-committee">
      <div class="section-heading">
        <div>
          <h3>复盘评审委员会</h3>
          <p>用同一套口径检查复盘完整度、回答表现和缺陷闭环。</p>
        </div>
        <span class="tag review-score">${stats.completionRate}% 完整</span>
      </div>
      <div class="review-committee-grid">
        <div class="committee-card">
          <div class="committee-card-head">
            <span>证据完整度</span>
            <strong>${stats.completed}/${stats.total}</strong>
          </div>
          <div class="committee-checks">
            ${stats.completionItems
              .map(
                (item) => `
                  <span class="committee-check ${item.done ? "done" : "todo"}">
                    ${item.done ? "已记录" : "待补充"} · ${item.label}
                  </span>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="committee-card">
          <div class="committee-card-head">
            <span>回答评级</span>
            <strong>${optionLabel(REVIEW_SELF_RATINGS, review.selfRating)}</strong>
          </div>
          <div class="answer-stats">
            <div><span>实际问题</span><strong>${stats.questionCount}</strong></div>
            <div><span>强回答</span><strong>${stats.strongCount}</strong></div>
            <div><span>弱回答</span><strong>${stats.weakCount}</strong></div>
            <div><span>挂点</span><strong>${stats.failureCount}</strong></div>
          </div>
          <p class="mini-meta">面试结果：${optionLabel(REVIEW_RESULTS, review.result)}</p>
        </div>
        <div class="committee-card">
          <div class="committee-card-head">
            <span>挂点分类建议</span>
            <strong>${categories[0]?.label || "待判断"}</strong>
          </div>
          <div class="tag-row">
            ${categories
              .map((category) => `<span class="tag review-category">${escapeHtml(category.label)}</span>`)
              .join("")}
          </div>
          <p class="mini-meta">根据弱回答、挂点分析和总结中的关键词做启发式判断。</p>
        </div>
      </div>
      <div class="closure-advice ${advice.tone}">
        <div>
          <strong>${escapeHtml(advice.title)}</strong>
          <p>${escapeHtml(advice.body)}</p>
        </div>
      </div>
    </section>
    <div class="detail-divider"></div>
  `;
}

function renderWeaknessProfile(weakness) {
  const stats = weaknessProfileStats(weakness);
  const advice = weaknessClosureAdvice(weakness);

  return `
    <section class="weakness-profile">
      <div class="section-title">
        <div>
          <h3>缺陷画像</h3>
          <p>把证据、训练和表达稳定性串成一条修复闭环。</p>
        </div>
        <span class="tag weakness-score">${stats.completionRate}% 完整</span>
      </div>
      <div class="weakness-profile-grid">
        <div class="weakness-card">
          <div class="weakness-card-head">
            <span>档案完整度</span>
            <strong>${stats.completed}/${stats.total}</strong>
          </div>
          <div class="committee-checks">
            ${stats.completionItems
              .map(
                (item) => `
                  <span class="committee-check ${item.done ? "done" : "todo"}">
                    ${item.done ? "已记录" : "待补充"} · ${item.label}
                  </span>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="weakness-card">
          <div class="weakness-card-head">
            <span>训练闭环</span>
            <strong>${stats.tasks.length ? `${stats.validatedTasks}/${stats.tasks.length}` : "未开始"}</strong>
          </div>
          <div class="answer-stats">
            <div><span>任务</span><strong>${stats.tasks.length}</strong></div>
            <div><span>推进中</span><strong>${stats.activeTasks}</strong></div>
            <div><span>待验收</span><strong>${stats.reviewingTasks}</strong></div>
            <div><span>已验证</span><strong>${stats.validatedTasks}</strong></div>
          </div>
          <p class="mini-meta">当前状态：${optionLabel(WEAKNESS_STATUSES, weakness.status)}</p>
        </div>
        <div class="weakness-card">
          <div class="weakness-card-head">
            <span>表达稳定性</span>
            <strong>${stats.stableDrills}/${stats.drills.length}</strong>
          </div>
          <div class="answer-stats">
            <div><span>表达训练</span><strong>${stats.drills.length}</strong></div>
            <div><span>已稳定</span><strong>${stats.stableDrills}</strong></div>
            <div><span>频率</span><strong>${weakness.frequency || 1}</strong></div>
            <div><span>证据</span><strong>${(weakness.relatedReviewIds || []).length}</strong></div>
          </div>
          <div class="tag-row">
            <span class="tag severity-${weakness.severity}">${optionLabel(SEVERITIES, weakness.severity)}</span>
            <span class="tag weakness-${weakness.status}">${optionLabel(WEAKNESS_STATUSES, weakness.status)}</span>
            <span class="tag review-category">${optionLabel(WEAKNESS_CATEGORIES, weakness.category)}</span>
          </div>
        </div>
      </div>
      <div class="closure-advice ${advice.tone}">
        <div>
          <strong>${escapeHtml(advice.title)}</strong>
          <p>${escapeHtml(advice.body)}</p>
        </div>
      </div>
    </section>
    <div class="detail-divider"></div>
  `;
}

function renderWeakness() {
  const data = weaknessMetrics();
  const taskData = trainingTaskMetrics();
  const weakness = selectedWeakness();
  return `
    ${renderTopbar("能力缺陷档案", "这里会承接复盘中的弱回答，沉淀成可追踪、可修复、可验证的能力缺陷。", "05 Weakness Archive")}
    <section class="grid metrics compact-metrics">
      <div class="metric"><div class="metric-label">缺陷总数</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">待处理</div><div class="metric-value">${data.open}</div></div>
      <div class="metric"><div class="metric-label">修复中</div><div class="metric-value">${data.training}</div></div>
      <div class="metric"><div class="metric-label">关联训练</div><div class="metric-value">${taskData.total}</div></div>
    </section>
    <div class="workspace">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">能力缺陷列表</h2>
            <p class="panel-subtitle">从复盘证据中沉淀，不靠模糊感觉。</p>
          </div>
          <button class="btn primary" id="new-weakness-btn" type="button">新增缺陷</button>
        </div>
        <div class="panel-body">${renderWeaknessList()}</div>
      </section>
      <div class="stack">
        ${renderWeaknessDetail(weakness)}
        ${renderTrainingTaskSection(weakness)}
        ${renderWeaknessExpressionDrillSection(weakness)}
      </div>
    </div>
  `;
}

function renderWeaknessList() {
  if (!state.weaknesses.length) {
    return `<div class="empty">还没有能力缺陷。可以从面试复盘中创建，也可以手动新增。</div>`;
  }

  return `
    <div class="work-list">
      ${state.weaknesses
        .map(
          (weakness) => `
            <button class="work-item weakness-item ${weakness.id === state.selectedWeaknessId ? "active" : ""}" data-weakness-id="${escapeHtml(weakness.id)}" type="button">
              <div>
                <p class="work-item-title">${escapeHtml(weakness.title)}</p>
                <p class="work-item-meta">${optionLabel(WEAKNESS_CATEGORIES, weakness.category)} · 证据 ${(weakness.relatedReviewIds || []).length} 条</p>
              </div>
              <div class="tag-row">
                <span class="tag severity-${weakness.severity}">${optionLabel(SEVERITIES, weakness.severity)}</span>
                <span class="tag weakness-${weakness.status}">${optionLabel(WEAKNESS_STATUSES, weakness.status)}</span>
              </div>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderWeaknessDetail(weakness) {
  const isNew = Boolean(state.weaknessDraft);

  if (!weakness) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">缺陷详情</h2>
            <p class="panel-subtitle">选择一个缺陷，或新增第一条记录。</p>
          </div>
        </div>
        <div class="panel-body"><div class="empty">当前没有选中的能力缺陷。</div></div>
      </section>
    `;
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">${isNew ? "新增能力缺陷" : "能力缺陷详情"}</h2>
          <p class="panel-subtitle">保存后会写入 content/weaknesses 下的 Markdown 文件。</p>
        </div>
      </div>
      <div class="panel-body">
        ${renderWeaknessProfile(weakness)}
        <form id="weakness-form" class="form-grid">
          <div class="form-field full">
            <label>缺陷标题</label>
            <input name="title" value="${escapeHtml(weakness.title)}" required />
          </div>
          <div class="form-field">
            <label>缺陷类型</label>
            ${renderSelect("category", WEAKNESS_CATEGORIES, weakness.category)}
          </div>
          <div class="form-field">
            <label>严重程度</label>
            ${renderSelect("severity", SEVERITIES, weakness.severity)}
          </div>
          <div class="form-field">
            <label>修复状态</label>
            ${renderSelect("status", WEAKNESS_STATUSES, weakness.status)}
          </div>
          <div class="form-field">
            <label>出现频率</label>
            <input name="frequency" type="number" min="1" value="${escapeHtml(weakness.frequency || 1)}" />
          </div>
          ${renderBriefField("evidence", "证据", weakness.evidence, "来自哪些真实问题、弱回答或面试信号")}
          ${renderBriefField("description", "缺陷描述", weakness.description, "这个缺陷的根因是什么，为什么会影响面试表现")}
          <div class="form-field full">
            <div class="linked-panel">
              <div>
                <label>关联复盘</label>
                <p class="mini-meta">${(weakness.relatedReviewIds || []).length ? `已关联 ${(weakness.relatedReviewIds || []).length} 条复盘证据` : "尚未关联复盘"}</p>
              </div>
              <button class="btn new-training-task-btn" type="button">创建训练任务</button>
            </div>
          </div>
          <div class="form-field full">
            <div class="actions">
              ${isNew ? `<button class="btn" id="cancel-weakness-btn" type="button">取消</button>` : ""}
              <button class="btn primary" type="submit"${disabledAttr(state.savingWeakness)}>${state.savingWeakness ? "保存中..." : "保存能力缺陷"}</button>
            </div>
            <div class="status-line">${weakness.updatedAt ? `上次更新：${escapeHtml(weakness.updatedAt)}` : "保存后会写入 content/weaknesses。"}</div>
          </div>
        </form>
      </div>
    </section>
  `;
}

function renderProjectAmmo() {
  const data = projectAmmoMetrics();
  const ammo = selectedProjectAmmo();

  return `
    ${renderTopbar("项目弹药库", "沉淀项目故事、关键证据、AI 相关性、可证明能力和高风险追问。", "04 Project Ammo")}
    <section class="grid metrics compact-metrics">
      <div class="metric"><div class="metric-label">项目总数</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">可用于面试</div><div class="metric-value">${data.usable}</div></div>
      <div class="metric"><div class="metric-label">需要深挖</div><div class="metric-value">${data.needsDeepening}</div></div>
      <div class="metric"><div class="metric-label">草稿</div><div class="metric-value">${state.projectAmmos.filter((item) => item.status === "draft").length}</div></div>
    </section>
    <div class="workspace">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">项目列表</h2>
            <p class="panel-subtitle">先把能证明能力的项目沉淀下来。</p>
          </div>
          <button class="btn primary" id="new-project-ammo-btn" type="button">新增项目</button>
        </div>
        <div class="panel-body">${renderProjectAmmoList()}</div>
      </section>
      ${renderProjectAmmoDetail(ammo)}
    </div>
  `;
}

function renderProjectAmmoList() {
  if (!state.projectAmmos.length) {
    return `<div class="empty">还没有项目弹药。先新增一个你最想在面试中讲清楚的项目。</div>`;
  }

  return `
    <div class="work-list">
      ${state.projectAmmos
        .map(
          (ammo) => `
            <button class="work-item weakness-item ${ammo.id === state.selectedProjectAmmoId ? "active" : ""}" data-project-ammo-id="${escapeHtml(ammo.id)}" type="button">
              <div>
                <p class="work-item-title">${escapeHtml(ammo.projectName)}</p>
                <p class="work-item-meta">${optionLabel(PROJECT_TYPES, ammo.projectType)}${ammo.role ? ` · ${escapeHtml(ammo.role)}` : ""}</p>
              </div>
              <span class="tag project-${ammo.status}">${optionLabel(PROJECT_AMMO_STATUSES, ammo.status)}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderProjectAmmoDetail(ammo) {
  const isNew = Boolean(state.projectAmmoDraft);

  if (!ammo) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">项目详情</h2>
            <p class="panel-subtitle">选择一个项目，或新增第一条项目弹药。</p>
          </div>
        </div>
        <div class="panel-body"><div class="empty">当前没有选中的项目。</div></div>
      </section>
    `;
  }

  return `
    <div class="stack">
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">${isNew ? "新增项目弹药" : "项目弹药详情"}</h2>
          <p class="panel-subtitle">保存后会写入 content/project-ammos 下的 Markdown 文件。</p>
        </div>
      </div>
      <div class="panel-body">
        <form id="project-ammo-form" class="form-grid">
          <div class="form-field full">
            <label>项目名称</label>
            <input name="projectName" value="${escapeHtml(ammo.projectName)}" required />
          </div>
          <div class="form-field">
            <label>项目类型</label>
            ${renderSelect("projectType", PROJECT_TYPES, ammo.projectType)}
          </div>
          <div class="form-field">
            <label>状态</label>
            ${renderSelect("status", PROJECT_AMMO_STATUSES, ammo.status)}
          </div>
          <div class="form-field">
            <label>我的角色</label>
            <input name="role" value="${escapeHtml(ammo.role)}" placeholder="产品设计 / 数据分析 / 项目负责人" />
          </div>
          <div class="form-field">
            <label>项目周期</label>
            <input name="period" value="${escapeHtml(ammo.period)}" placeholder="2026.03 - 2026.05" />
          </div>
          ${renderBriefField("background", "背景", ammo.background, "为什么要做这个项目，业务/用户/场景是什么")}
          ${renderBriefField("goal", "目标", ammo.goal, "项目要解决什么问题，成功标准是什么")}
          ${renderBriefField("actions", "关键动作", ammo.actions, "你具体做了什么，怎么推动，怎么决策")}
          ${renderBriefField("result", "结果", ammo.result, "项目产出、影响、结论")}
          ${renderBriefField("metrics", "指标", ammo.metrics, "量化指标、前后对比、关键数据")}
          ${renderBriefField("evidence", "证据", ammo.evidence, "PRD、原型、数据、截图、复盘、链接等")}
          ${renderBriefField("aiRelevance", "AI 相关性", ammo.aiRelevance, "这个项目和 AI 产品能力的关系")}
          ${renderBriefField("pmCompetencies", "可证明能力", ammo.pmCompetencies, "这个项目能证明哪些 AI PM 能力")}
          ${renderBriefField("riskQuestions", "高风险追问", ammo.riskQuestions, "面试官可能追问什么，哪里容易被深挖")}
          <div class="form-field full">
            <div class="linked-panel">
              <div>
                <label>关联记录</label>
                <p class="mini-meta">缺陷 ${(ammo.linkedWeaknessIds || []).length} 个 · 训练任务 ${(ammo.linkedTrainingTaskIds || []).length} 个 · 追问 ${questionsForProjectAmmo(ammo.id).length} 个</p>
              </div>
              <button class="btn new-follow-up-question-btn" type="button">新增追问</button>
            </div>
          </div>
          <div class="form-field full">
            <div class="actions">
              ${isNew ? `<button class="btn" id="cancel-project-ammo-btn" type="button">取消</button>` : ""}
              <button class="btn primary" type="submit"${disabledAttr(state.savingProjectAmmo)}>${state.savingProjectAmmo ? "保存中..." : "保存项目弹药"}</button>
            </div>
            <div class="status-line">${ammo.updatedAt ? `上次更新：${escapeHtml(ammo.updatedAt)}` : "保存后会写入 content/project-ammos。"}</div>
          </div>
        </form>
      </div>
    </section>
    ${isNew ? "" : renderFollowUpQuestionSection(ammo)}
    </div>
  `;
}

function renderFollowUpQuestionSection(ammo) {
  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">项目追问</h2>
          <p class="panel-subtitle">把面试官可能深挖的问题沉淀成稳定回答。</p>
        </div>
        <button class="btn primary new-follow-up-question-btn" type="button">新增追问</button>
      </div>
      <div class="panel-body stack">
        ${renderFollowUpQuestionList(ammo.id)}
        ${renderFollowUpQuestionForm(ammo)}
        ${renderExpressionDrillSection()}
      </div>
    </section>
  `;
}

function renderFollowUpQuestionList(projectAmmoId) {
  const questions = questionsForProjectAmmo(projectAmmoId);
  if (!questions.length) {
    return `<div class="empty">还没有项目追问。可以先记录一个“你具体做了什么”或“为什么这么决策”。</div>`;
  }

  return `
    <div class="work-list">
      ${questions
        .map(
          (question) => `
            <button class="work-item ${question.id === state.selectedFollowUpQuestionId ? "active" : ""}" data-follow-up-question-id="${escapeHtml(question.id)}" type="button">
              <div>
                <p class="work-item-title">${escapeHtml(question.question)}</p>
                <p class="work-item-meta">${optionLabel(FOLLOW_UP_QUESTION_TYPES, question.questionType)}</p>
              </div>
              <span class="tag follow-${question.status}">${optionLabel(FOLLOW_UP_QUESTION_STATUSES, question.status)}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderFollowUpQuestionForm(ammo) {
  const question = selectedFollowUpQuestion();
  const isNew = Boolean(state.followUpQuestionDraft);

  if (!question || question.projectAmmoId !== ammo.id) {
    return `<div class="empty">选择一条追问进行编辑，或新增一条高频追问。</div>`;
  }

  return `
    <form id="follow-up-question-form" class="form-grid compact-form">
      <input type="hidden" name="projectAmmoId" value="${escapeHtml(ammo.id)}" />
      <div class="form-field full">
        <label>追问问题</label>
        <input name="question" value="${escapeHtml(question.question)}" placeholder="例如：这个项目里你最核心的产品判断是什么？" required />
      </div>
      <div class="form-field">
        <label>问题类型</label>
        ${renderSelect("questionType", FOLLOW_UP_QUESTION_TYPES, question.questionType)}
      </div>
      <div class="form-field">
        <label>风险等级</label>
        ${renderSelect("riskLevel", RISK_LEVELS, question.riskLevel)}
      </div>
      <div class="form-field">
        <label>回答状态</label>
        ${renderSelect("status", FOLLOW_UP_QUESTION_STATUSES, question.status)}
      </div>
      ${renderBriefField("answerDraft", "回答草稿", question.answerDraft, "先快速写下能讲出口的版本，不追求一次完美")}
      ${renderBriefField("stableAnswer", "稳定回答", question.stableAnswer, "沉淀成结构清晰、可以复用的面试回答")}
      ${renderBriefField("evidence", "证据", question.evidence, "支撑这个回答的指标、文档、决策过程或项目产物")}
      <div class="form-field full">
        <div class="linked-panel">
          <div>
            <label>关联缺陷</label>
            <p class="mini-meta">${(question.linkedWeaknessIds || []).length ? `已关联 ${(question.linkedWeaknessIds || []).length} 个缺陷` : "后续可从缺陷或训练任务关联到追问"}</p>
          </div>
          <button class="btn new-expression-drill-btn" type="button">创建表达训练</button>
        </div>
      </div>
      <div class="form-field full">
        <div class="actions">
          ${isNew ? `<button class="btn" id="cancel-follow-up-question-btn" type="button">取消</button>` : ""}
          <button class="btn primary" type="submit"${disabledAttr(state.savingFollowUpQuestion)}>${state.savingFollowUpQuestion ? "保存中..." : "保存项目追问"}</button>
        </div>
        <div class="status-line">${question.updatedAt ? `上次更新：${escapeHtml(question.updatedAt)}` : "保存后会写入 content/follow-up-questions。"}</div>
      </div>
    </form>
  `;
}

function renderExpressionDrillSection() {
  const question = selectedFollowUpQuestion();
  if (!question || state.followUpQuestionDraft) {
    return `<div class="empty">保存并选择追问后，可以为它创建表达训练。</div>`;
  }

  return `
    <div class="detail-divider"></div>
    <div class="section-heading">
      <div>
        <h3>表达训练</h3>
        <p>针对当前追问记录目标回答、练习结果和稳定性评分。</p>
      </div>
      <button class="btn new-expression-drill-btn" type="button">新增训练</button>
    </div>
    ${renderExpressionDrillList(question.id)}
    ${renderExpressionDrillForm(question)}
  `;
}

function renderExpressionDrillList(questionId) {
  return renderExpressionDrillListForSource("follow_up_question", questionId);
}

function renderExpressionDrillListForSource(sourceType, sourceId) {
  const drills = drillsForSource(sourceType, sourceId);
  if (!drills.length) {
    return `<div class="empty">还没有表达训练。先创建一条训练记录，把回答从“知道怎么写”练到“稳定说出口”。</div>`;
  }

  return `
    <div class="work-list">
      ${drills
        .map(
          (drill) => `
            <button class="work-item ${drill.id === state.selectedExpressionDrillId ? "active" : ""}" data-expression-drill-id="${escapeHtml(drill.id)}" type="button">
              <div>
                <p class="work-item-title">${escapeHtml(drill.question)}</p>
                <p class="work-item-meta">${optionLabel(EXPRESSION_DRILL_SCORES, drill.score)}${drill.nextAction ? ` · ${escapeHtml(drill.nextAction)}` : ""}</p>
              </div>
              <span class="tag drill-${drill.status}">${optionLabel(EXPRESSION_DRILL_STATUSES, drill.status)}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderExpressionDrillForm(question) {
  return renderExpressionDrillFormForSource("follow_up_question", question.id);
}

function renderExpressionDrillFormForSource(sourceType, sourceId) {
  const drill = selectedExpressionDrill();
  const isNew = Boolean(state.expressionDrillDraft);

  if (!drill || drill.sourceType !== sourceType || drill.sourceId !== sourceId) {
    return `<div class="empty">选择一条训练记录进行编辑，或从当前追问新增表达训练。</div>`;
  }

  return `
    <form id="expression-drill-form" class="form-grid compact-form">
      <input type="hidden" name="sourceType" value="${escapeHtml(drill.sourceType)}" />
      <input type="hidden" name="sourceId" value="${escapeHtml(drill.sourceId)}" />
      <div class="form-field full">
        <label>训练问题</label>
        <input name="question" value="${escapeHtml(drill.question)}" required />
      </div>
      <div class="form-field">
        <label>稳定性评分</label>
        ${renderSelect("score", EXPRESSION_DRILL_SCORES, drill.score)}
      </div>
      <div class="form-field">
        <label>训练状态</label>
        ${renderSelect("status", EXPRESSION_DRILL_STATUSES, drill.status)}
      </div>
      <div class="form-field">
        <label>关联训练任务 ID</label>
        <input name="linkedTrainingTaskId" value="${escapeHtml(drill.linkedTrainingTaskId)}" placeholder="可选：task_xxx" />
      </div>
      ${renderBriefField("targetAnswer", "目标回答", drill.targetAnswer, "练到可以稳定复述的回答版本")}
      ${renderBriefField("practiceRecord", "练习记录", drill.practiceRecord, "记录本次练习卡点、修改、复核结果")}
      ${renderBriefField("nextAction", "下一步动作", drill.nextAction, "下一次要继续补什么或验证什么")}
      <div class="form-field full">
        <div class="linked-panel">
          <div>
            <label>状态联动</label>
            <p class="mini-meta">训练状态保存为“已稳定”时，会把当前项目追问同步为“表达稳定”。</p>
          </div>
          <span class="tag score-${drill.score}">${optionLabel(EXPRESSION_DRILL_SCORES, drill.score)}</span>
        </div>
      </div>
      <div class="form-field full">
        <div class="actions">
          ${isNew ? `<button class="btn" id="cancel-expression-drill-btn" type="button">取消</button>` : ""}
          <button class="btn primary" type="submit"${disabledAttr(state.savingExpressionDrill)}>${state.savingExpressionDrill ? "保存中..." : "保存表达训练"}</button>
        </div>
        <div class="status-line">${drill.updatedAt ? `上次更新：${escapeHtml(drill.updatedAt)}` : "保存后会写入 content/expression-drills。"}</div>
      </div>
    </form>
  `;
}

function renderWeaknessExpressionDrillSection(weakness) {
  if (!weakness?.id || state.weaknessDraft) {
    return "";
  }

  const task = selectedTrainingTask();
  const sourceType = selectedExpressionDrill()?.sourceType;
  const sourceId = selectedExpressionDrill()?.sourceId;
  const canShowForm =
    (sourceType === "weakness" && sourceId === weakness.id) ||
    (task?.id && sourceType === "training_task" && sourceId === task.id);

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">表达稳定性训练</h2>
          <p class="panel-subtitle">可以直接围绕能力缺陷或当前训练任务创建表达训练。</p>
        </div>
        <div class="actions">
          <button class="btn new-weakness-expression-drill-btn" type="button">从缺陷创建</button>
          ${task?.id && !state.trainingTaskDraft ? `<button class="btn primary new-task-expression-drill-btn" type="button">从任务创建</button>` : ""}
        </div>
      </div>
      <div class="panel-body stack">
        <div class="section-heading">
          <div>
            <h3>缺陷相关训练</h3>
            <p>围绕这个能力缺陷本身沉淀表达训练。</p>
          </div>
        </div>
        ${renderExpressionDrillListForSource("weakness", weakness.id)}
        ${
          task?.id
            ? `
              <div class="detail-divider"></div>
              <div class="section-heading">
                <div>
                  <h3>当前任务相关训练</h3>
                  <p>围绕选中的训练任务沉淀表达训练。</p>
                </div>
              </div>
              ${renderExpressionDrillListForSource("training_task", task.id)}
            `
            : ""
        }
        ${canShowForm ? renderExpressionDrillFormForSource(sourceType, sourceId) : `<div class="empty">选择一条表达训练，或从缺陷/任务创建新的训练记录。</div>`}
      </div>
    </section>
  `;
}

function renderTrainingTaskSection(weakness) {
  if (!weakness?.id) {
    return "";
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">训练任务</h2>
          <p class="panel-subtitle">把缺陷变成有产物、有验收标准的修复任务。</p>
        </div>
        <button class="btn new-training-task-btn" type="button">新增训练任务</button>
      </div>
      <div class="panel-body stack">
        ${renderTrainingTaskList(weakness.id)}
        ${renderTrainingTaskForm(weakness)}
      </div>
    </section>
  `;
}

function renderTrainingPlan() {
  const data = trainingTaskMetrics();
  const task = selectedTrainingTask();
  const weakness = task?.weaknessId ? state.weaknesses.find((item) => item.id === task.weaknessId) : selectedWeakness();
  const filteredTasks = filteredTrainingTasks();

  return `
    ${renderTopbar("训练计划中心", "把缺陷修复拆成可执行、可验收、可回到面试验证的训练任务。", "06 Training Plan")}
    <section class="grid metrics compact-metrics">
      <div class="metric"><div class="metric-label">训练任务</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">本周到期</div><div class="metric-value">${data.week}</div></div>
      <div class="metric"><div class="metric-label">待验收</div><div class="metric-value">${data.reviewing}</div></div>
      <div class="metric"><div class="metric-label">已验证</div><div class="metric-value">${data.validated}</div></div>
    </section>
    ${renderTrainingPlanTabs(data)}
    <div class="workspace">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">${optionLabel(TRAINING_PLAN_VIEWS, state.trainingPlanView)}训练任务</h2>
            <p class="panel-subtitle">当前视图 ${filteredTasks.length} 条，按验收优先级和截止时间排序。</p>
          </div>
        </div>
        <div class="panel-body">${renderTrainingTaskGlobalList(filteredTasks)}</div>
      </section>
      <div class="stack">
        ${renderTrainingPlanDetail(task, weakness)}
        ${task?.id ? renderExpressionDrillSectionForTrainingTask(task) : ""}
      </div>
    </div>
  `;
}

function renderTrainingPlanTabs(data) {
  const counts = {
    overview: data.total,
    week: data.week,
    reviewing: data.reviewing,
    validated: data.validated,
  };

  return `
    <div class="tabs training-tabs">
      ${TRAINING_PLAN_VIEWS.map(
        ([key, label]) => `
          <button class="tab ${state.trainingPlanView === key ? "active" : ""}" data-training-plan-view="${key}" type="button">
            ${label}<span>${counts[key] ?? 0}</span>
          </button>
        `,
      ).join("")}
    </div>
  `;
}

function renderTrainingTaskGlobalList(tasks = filteredTrainingTasks()) {
  if (!state.trainingTasks.length) {
    return `<div class="empty">还没有训练任务。先从能力缺陷档案中选择一个缺陷，并创建可验收的修复任务。</div>`;
  }
  if (!tasks.length) {
    return `<div class="empty">当前视图没有训练任务。可以切换到“总览”，或回到能力缺陷档案创建新任务。</div>`;
  }

  return `
    <div class="work-list">
      ${tasks
        .map((task) => {
          const weakness = trainingTaskWeakness(task);
          const bucket = taskDueBucket(task);
          return `
            <button class="work-item weakness-item ${task.id === state.selectedTrainingTaskId ? "active" : ""}" data-training-task-id="${escapeHtml(task.id)}" type="button">
              <div>
                <p class="work-item-title">${escapeHtml(task.title)}</p>
                <p class="work-item-meta">${escapeHtml(weakness?.title || "未关联缺陷")} · ${optionLabel(TRAINING_TASK_TYPES, task.taskType)}${task.dueAt ? ` · ${escapeHtml(dueLabel(task.dueAt))}` : " · 未设截止"}</p>
              </div>
              <div class="tag-row inline-tags">
                <span class="tag due-${bucket}">${optionLabel(DUE_BUCKET_LABELS, bucket)}</span>
                <span class="tag task-${task.status}">${optionLabel(TRAINING_TASK_STATUSES, task.status)}</span>
              </div>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderTrainingPlanDetail(task, weakness) {
  if (!task) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">训练详情</h2>
            <p class="panel-subtitle">选择一个训练任务，编辑目标能力、练习产物和验收标准。</p>
          </div>
        </div>
        <div class="panel-body"><div class="empty">当前没有选中的训练任务。</div></div>
      </section>
    `;
  }
  const readiness = trainingTaskReadiness(task);
  const bucket = taskDueBucket(task);

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">训练详情</h2>
          <p class="panel-subtitle">训练任务仍保存到 content/training-tasks，不改变现有数据结构。</p>
        </div>
      </div>
      <div class="panel-body stack">
        ${
          weakness
            ? `<div class="linked-panel">
                <div>
                  <label>关联缺陷</label>
                  <p class="mini-meta">${escapeHtml(weakness.title)} · ${optionLabel(WEAKNESS_STATUSES, weakness.status)}</p>
                </div>
                <button class="btn" data-dashboard-weakness-id="${escapeHtml(weakness.id)}" type="button">查看缺陷</button>
              </div>`
            : `<div class="empty">这个训练任务关联的能力缺陷没有读取到，可以检查 Markdown 中的 weaknessId。</div>`
        }
        <div class="training-closure-grid">
          <div class="closure-item ${bucket === "overdue" ? "attention" : ""}">
            <span>截止状态</span>
            <strong>${optionLabel(DUE_BUCKET_LABELS, bucket)}</strong>
          </div>
          <div class="closure-item ${readiness.hasPracticeOutput ? "done" : "attention"}">
            <span>练习产物</span>
            <strong>${readiness.hasPracticeOutput ? "已填写" : "待补充"}</strong>
          </div>
          <div class="closure-item ${readiness.hasAcceptanceCriteria ? "done" : "attention"}">
            <span>验收标准</span>
            <strong>${readiness.hasAcceptanceCriteria ? "已填写" : "待补充"}</strong>
          </div>
          <div class="closure-item ${readiness.hasValidationNote ? "done" : "attention"}">
            <span>验证记录</span>
            <strong>${readiness.hasValidationNote ? "已填写" : "待验证"}</strong>
          </div>
        </div>
        ${renderTrainingTaskForm(weakness)}
      </div>
    </section>
  `;
}

function renderExpressionDrillSectionForTrainingTask(task) {
  const drills = drillsForSource("training_task", task.id);

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">表达训练入口</h2>
          <p class="panel-subtitle">把训练任务继续固化成能稳定说出口的表达练习。</p>
        </div>
        ${!state.trainingTaskDraft ? `<button class="btn primary new-task-expression-drill-btn" type="button">从任务创建</button>` : ""}
      </div>
      <div class="panel-body stack">
        ${
          drills.length
            ? renderExpressionDrillListForSource("training_task", task.id)
            : `<div class="empty">还没有从这个训练任务创建表达训练。</div>`
        }
        ${selectedExpressionDrill()?.sourceType === "training_task" && selectedExpressionDrill()?.sourceId === task.id ? renderExpressionDrillFormForSource("training_task", task.id) : ""}
      </div>
    </section>
  `;
}

function renderTrainingTaskList(weaknessId) {
  const tasks = tasksForWeakness(weaknessId);
  if (!tasks.length) {
    return `<div class="empty">还没有训练任务。先为这个缺陷创建一个可验收的修复动作。</div>`;
  }

  return `
    <div class="work-list">
      ${tasks
        .map(
          (task) => `
            <button class="work-item weakness-item ${task.id === state.selectedTrainingTaskId ? "active" : ""}" data-training-task-id="${escapeHtml(task.id)}" type="button">
              <div>
                <p class="work-item-title">${escapeHtml(task.title)}</p>
                <p class="work-item-meta">${optionLabel(TRAINING_TASK_TYPES, task.taskType)}${task.dueAt ? ` · ${escapeHtml(task.dueAt)}` : ""}</p>
              </div>
              <span class="tag task-${task.status}">${optionLabel(TRAINING_TASK_STATUSES, task.status)}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderTrainingTaskForm(weakness) {
  const task = selectedTrainingTask();
  const isNew = Boolean(state.trainingTaskDraft);
  const weaknessId = weakness?.id || task?.weaknessId || "";
  const weaknessTitle = weakness?.title || "未关联缺陷";

  if (!task) {
    return `<div class="empty">选择一个训练任务进行编辑，或新增第一条训练任务。</div>`;
  }

  return `
    <form id="training-task-form" class="form-grid">
      <div class="form-field full">
        <label>任务标题</label>
        <input name="title" value="${escapeHtml(task.title)}" required />
      </div>
      <div class="form-field">
        <label>任务类型</label>
        ${renderSelect("taskType", TRAINING_TASK_TYPES, task.taskType)}
      </div>
      <div class="form-field">
        <label>任务状态</label>
        ${renderSelect("status", TRAINING_TASK_STATUSES, task.status)}
      </div>
      <div class="form-field">
        <label>截止时间</label>
        <input name="dueAt" type="date" value="${escapeHtml(task.dueAt)}" />
      </div>
      <div class="form-field">
        <label>关联缺陷</label>
        <input value="${escapeHtml(weaknessTitle)}" disabled />
      </div>
      ${renderBriefField("targetAbility", "目标能力", task.targetAbility, "这次训练要修复什么能力问题")}
      ${renderBriefField("practiceOutput", "练习产物", task.practiceOutput, "写下重写后的回答、模拟面试记录或练习结果")}
      ${renderBriefField("acceptanceCriteria", "验收标准", task.acceptanceCriteria, "怎样才算完成，最好可检查、可复盘")}
      ${renderBriefField("validationNote", "验证记录", task.validationNote, "后续面试或复盘中如何证明改善了")}
      <input name="weaknessId" type="hidden" value="${escapeHtml(weaknessId)}" />
      <input name="relatedReviewId" type="hidden" value="${escapeHtml(task.relatedReviewId)}" />
      <input name="relatedInterviewRoundId" type="hidden" value="${escapeHtml(task.relatedInterviewRoundId)}" />
      <div class="form-field full">
        <div class="actions">
          ${isNew ? `<button class="btn" id="cancel-training-task-btn" type="button">取消</button>` : ""}
          <button class="btn primary" type="submit"${disabledAttr(state.savingTrainingTask)}>${state.savingTrainingTask ? "保存中..." : "保存训练任务"}</button>
        </div>
        <div class="status-line">${task.updatedAt ? `上次更新：${escapeHtml(task.updatedAt)}` : "保存后会写入 content/training-tasks。"}</div>
      </div>
    </form>
  `;
}

function renderPortfolio() {
  const data = portfolioMetrics();

  return `
    ${renderTopbar("作品集产品线", "把成熟项目弹药整理成未来可公开展示的作品集素材。", "08 Portfolio Line")}
    <section class="grid metrics compact-metrics">
      <div class="metric"><div class="metric-label">项目卡总数</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">进入预览</div><div class="metric-value">${data.inPreview}</div></div>
      <div class="metric"><div class="metric-label">可展示</div><div class="metric-value">${data.ready}</div></div>
      <div class="metric"><div class="metric-label">待处理</div><div class="metric-value">${data.needsWork}</div></div>
    </section>
    <div class="actions page-actions">
      <button class="btn primary" id="portfolio-preview-toggle" type="button">${state.portfolioPreviewMode ? "返回工作台" : "本地预览"}</button>
    </div>
    ${state.portfolioPreviewMode ? renderPortfolioPreview() : renderPortfolioWorkspace()}
  `;
}

function renderPortfolioWorkspace() {
  return `
    <div class="workspace">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">作品集资料</h2>
            <p class="panel-subtitle">先把个人定位、核心能力和发布检查清单整理清楚。</p>
          </div>
        </div>
        <div class="panel-body stack">
          ${renderPortfolioProfileForm()}
          ${renderPortfolioCandidateList()}
        </div>
      </section>
      <div class="stack">
        <section class="panel">
          <div class="panel-header">
            <div>
              <h2 class="panel-title">项目卡列表</h2>
              <p class="panel-subtitle">从项目弹药生成，编辑为适合公开展示的版本。</p>
            </div>
          </div>
          <div class="panel-body">${renderPortfolioProjectList()}</div>
        </section>
        ${renderPortfolioProjectDetail()}
      </div>
    </div>
  `;
}

function renderPortfolioProfileForm() {
  const profile = state.portfolioProfile || EMPTY_PORTFOLIO_PROFILE;

  return `
    <form id="portfolio-profile-form" class="form-grid compact-form">
      <div class="form-field">
        <label>展示名称</label>
        <input name="displayName" value="${escapeHtml(profile.displayName)}" placeholder="你的名字 / 昵称" />
      </div>
      <div class="form-field">
        <label>一句话定位</label>
        <input name="headline" value="${escapeHtml(profile.headline)}" placeholder="AI Product Manager" />
      </div>
      <div class="form-field">
        <label>目标岗位</label>
        <input name="targetRole" value="${escapeHtml(profile.targetRole)}" placeholder="AI 产品经理" />
      </div>
      <div class="form-field">
        <label>地点</label>
        <input name="location" value="${escapeHtml(profile.location)}" placeholder="城市 / 远程 / 可搬迁" />
      </div>
      <div class="form-field">
        <label>作品集状态</label>
        ${renderSelect("portfolioStatus", PORTFOLIO_STATUSES, profile.portfolioStatus)}
      </div>
      ${renderBriefField("summary", "个人简介", profile.summary, "用 3-5 句话说明你的背景、方向和优势")}
      ${renderBriefField("coreSkills", "核心能力", profile.coreSkills, "AI 产品设计、数据分析、用户研究、增长实验等")}
      ${renderBriefField("contactNote", "联系方式说明", profile.contactNote, "先写占位，不必现在公开真实联系方式")}
      ${renderBriefField("publishChecklist", "发布准备清单", profile.publishChecklist, "逐行记录公开前需要检查的事项")}
      <div class="form-field full">
        <div class="actions">
          <button class="btn primary" type="submit"${disabledAttr(state.savingPortfolioProfile)}>${state.savingPortfolioProfile ? "保存中..." : "保存作品集资料"}</button>
        </div>
        <div class="status-line">${profile.updatedAt ? `上次更新：${escapeHtml(profile.updatedAt)}` : "保存后会写入 content/portfolio/profile.md。"}</div>
      </div>
    </form>
  `;
}

function renderPortfolioCandidateList() {
  const existingAmmoIds = new Set(state.portfolioProjects.map((item) => item.projectAmmoId).filter(Boolean));
  const candidates = state.projectAmmos
    .filter((ammo) => ammo.status === "usable" || !existingAmmoIds.has(ammo.id))
    .slice(0, 8);

  return `
    <div class="detail-divider"></div>
    <div class="section-heading">
      <div>
        <h3>候选项目弹药</h3>
        <p>优先从“可用于面试”的项目弹药生成作品集项目卡。</p>
      </div>
    </div>
    <div class="work-list">
      ${
        candidates.length
          ? candidates
              .map(
                (ammo) => `
                  <button class="work-item" data-create-portfolio-project="${escapeHtml(ammo.id)}" type="button">
                    <div>
                      <p class="work-item-title">${escapeHtml(ammo.projectName)}</p>
                      <p class="work-item-meta">${optionLabel(PROJECT_TYPES, ammo.projectType)}${existingAmmoIds.has(ammo.id) ? " · 已生成项目卡" : ""}</p>
                    </div>
                    <span class="tag project-${ammo.status}">${optionLabel(PROJECT_AMMO_STATUSES, ammo.status)}</span>
                  </button>
                `,
              )
              .join("")
          : `<div class="empty">暂无项目弹药候选。先到项目弹药库把成熟项目标记为“可用于面试”。</div>`
      }
    </div>
  `;
}

function renderPortfolioProjectList() {
  if (!state.portfolioProjects.length) {
    return `<div class="empty">还没有作品集项目卡。先从左侧候选项目弹药生成一张。</div>`;
  }

  return `
    <div class="work-list">
      ${state.portfolioProjects
        .map(
          (project) => `
            <button class="work-item ${project.id === state.selectedPortfolioProjectId ? "active" : ""}" data-portfolio-project-id="${escapeHtml(project.id)}" type="button">
              <div>
                <p class="work-item-title">${escapeHtml(project.displayTitle)}</p>
                <p class="work-item-meta">${optionLabel(PORTFOLIO_VISIBILITIES, project.visibility)} · 排序 ${escapeHtml(project.sortOrder)}</p>
              </div>
              <span class="tag portfolio-${project.readiness}">${optionLabel(PORTFOLIO_READINESS, project.readiness)}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderPortfolioProjectDetail() {
  const project = selectedPortfolioProject();
  const isNew = Boolean(state.portfolioProjectDraft);

  if (!project) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">项目卡详情</h2>
            <p class="panel-subtitle">选择一张项目卡，或从候选项目弹药生成。</p>
          </div>
        </div>
        <div class="panel-body"><div class="empty">当前没有选中的作品集项目。</div></div>
      </section>
    `;
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">${isNew ? "新增作品集项目" : "作品集项目详情"}</h2>
          <p class="panel-subtitle">保存后会写入 content/portfolio-projects 下的 Markdown 文件。</p>
        </div>
      </div>
      <div class="panel-body">
        <form id="portfolio-project-form" class="form-grid compact-form">
          <input type="hidden" name="projectAmmoId" value="${escapeHtml(project.projectAmmoId)}" />
          <input type="hidden" name="projectName" value="${escapeHtml(project.projectName)}" />
          <div class="form-field full">
            <label>公开标题</label>
            <input name="displayTitle" value="${escapeHtml(project.displayTitle)}" required />
          </div>
          <div class="form-field">
            <label>副标题</label>
            <input name="subtitle" value="${escapeHtml(project.subtitle)}" placeholder="项目方向 / 一句话价值" />
          </div>
          <div class="form-field">
            <label>我的角色</label>
            <input name="role" value="${escapeHtml(project.role)}" />
          </div>
          <div class="form-field">
            <label>项目周期</label>
            <input name="period" value="${escapeHtml(project.period)}" />
          </div>
          <div class="form-field">
            <label>展示状态</label>
            ${renderSelect("visibility", PORTFOLIO_VISIBILITIES, project.visibility)}
          </div>
          <div class="form-field">
            <label>准备状态</label>
            ${renderSelect("readiness", PORTFOLIO_READINESS, project.readiness)}
          </div>
          <div class="form-field">
            <label>排序</label>
            <input name="sortOrder" type="number" value="${escapeHtml(project.sortOrder)}" />
          </div>
          ${renderBriefField("summary", "项目摘要", project.summary, "对外展示时第一眼能看懂的项目价值")}
          ${renderBriefField("problem", "问题与场景", project.problem, "为什么做这个项目，场景和用户问题是什么")}
          ${renderBriefField("solution", "解决方案", project.solution, "你如何设计、推动和落地")}
          ${renderBriefField("impact", "结果与影响", project.impact, "项目产出、业务影响、学习结论")}
          ${renderBriefField("metrics", "指标", project.metrics, "可公开的量化结果、前后对比或验证数据")}
          ${renderBriefField("skills", "能力标签", project.skills, "这个项目能证明哪些 AI PM 能力")}
          ${renderBriefField("evidence", "证据", project.evidence, "PRD、原型、数据、截图、链接等可公开证据")}
          ${renderBriefField("privacyNote", "脱敏与风险", project.privacyNote, "哪些内容需要隐藏、替换或谨慎表达")}
          <div class="form-field full">
            <div class="actions">
              ${isNew ? `<button class="btn" id="cancel-portfolio-project-btn" type="button">取消</button>` : ""}
              <button class="btn primary" type="submit"${disabledAttr(state.savingPortfolioProject)}>${state.savingPortfolioProject ? "保存中..." : "保存项目卡"}</button>
            </div>
            <div class="status-line">${project.updatedAt ? `上次更新：${escapeHtml(project.updatedAt)}` : "保存后会写入 content/portfolio-projects。"}</div>
          </div>
        </form>
      </div>
    </section>
  `;
}

function renderPortfolioPreview() {
  const profile = state.portfolioProfile || EMPTY_PORTFOLIO_PROFILE;
  const projects = portfolioProjectsInPreview();

  return `
    <section class="portfolio-preview">
      <div class="portfolio-hero">
        <p class="eyebrow">Local Portfolio Preview</p>
        <h1>${escapeHtml(profile.displayName || "你的名字")}</h1>
        <p class="portfolio-headline">${escapeHtml(profile.headline || profile.targetRole || "AI Product Manager")}</p>
        <p class="portfolio-summary">${escapeHtml(profile.summary || "这里会展示你的个人定位、核心能力和精选项目。")}</p>
        <div class="tag-row">
          ${(profile.coreSkills || "")
            .split(/[、,\n]/)
            .map((skill) => skill.trim())
            .filter(Boolean)
            .slice(0, 8)
            .map((skill) => `<span class="tag stage">${escapeHtml(skill)}</span>`)
            .join("")}
        </div>
      </div>
      <div class="portfolio-preview-grid">
        ${
          projects.length
            ? projects
                .map(
                  (project) => `
                    <article class="portfolio-card">
                      <div class="portfolio-card-header">
                        <div>
                          <p class="eyebrow">${escapeHtml(project.role || project.period || "Project")}</p>
                          <h2>${escapeHtml(project.displayTitle)}</h2>
                        </div>
                        <span class="tag portfolio-${project.readiness}">${optionLabel(PORTFOLIO_READINESS, project.readiness)}</span>
                      </div>
                      <p class="portfolio-card-subtitle">${escapeHtml(project.subtitle)}</p>
                      <p>${escapeHtml(project.summary)}</p>
                      <dl class="portfolio-facts">
                        <div><dt>问题</dt><dd>${escapeHtml(project.problem)}</dd></div>
                        <div><dt>方案</dt><dd>${escapeHtml(project.solution)}</dd></div>
                        <div><dt>结果</dt><dd>${escapeHtml(project.impact)}</dd></div>
                      </dl>
                      <p class="mini-meta">${escapeHtml(project.metrics || project.skills)}</p>
                    </article>
                  `,
                )
                .join("")
            : `<div class="empty">还没有进入作品集预览的项目卡。把项目卡展示状态设为“进入作品集”后会显示在这里。</div>`
        }
      </div>
      <section class="portfolio-contact">
        <h2>联系与说明</h2>
        <p>${escapeHtml(profile.contactNote || "这里先保留联系方式占位，公开前再补齐。")}</p>
      </section>
    </section>
  `;
}

function renderAiAnalysis() {
  const data = aiAnalysisMetrics();
  const note = selectedAiAnalysisNote();

  return `
    ${renderTopbar("AI 辅助分析", "生成可审查的上下文快照和可复制提示词，粘贴 AI 输出后记录你的人工决策。", "AI Assist")}
    <section class="grid metrics compact-metrics">
      <div class="metric"><div class="metric-label">记录总数</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">提示词就绪</div><div class="metric-value">${data.promptReady}</div></div>
      <div class="metric"><div class="metric-label">待人工决策</div><div class="metric-value">${data.responded}</div></div>
      <div class="metric"><div class="metric-label">已决策</div><div class="metric-value">${data.decided}</div></div>
    </section>
    <div class="workspace">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">分析记录</h2>
            <p class="panel-subtitle">每条记录都会保存为独立 Markdown，方便后续复盘和迁移。</p>
          </div>
          <button class="btn primary" id="new-ai-analysis-btn" type="button">新增分析</button>
        </div>
        <div class="panel-body">${renderAiAnalysisList()}</div>
      </section>
      ${renderAiAnalysisDetail(note)}
    </div>
  `;
}

function renderAiAnalysisList() {
  if (!state.aiAnalysisNotes.length) {
    return `<div class="empty">还没有 AI 辅助分析记录。先新增一条，把岗位、项目或复盘内容整理成提示词。</div>`;
  }

  return `
    <div class="work-list">
      ${state.aiAnalysisNotes
        .map(
          (note) => `
            <button class="work-item ${note.id === state.selectedAiAnalysisNoteId ? "active" : ""}" data-ai-analysis-note-id="${escapeHtml(note.id)}" type="button">
              <div>
                <p class="work-item-title">${escapeHtml(note.title)}</p>
                <p class="work-item-meta">${optionLabel(AI_ANALYSIS_TYPES, note.analysisType)} · ${escapeHtml(note.sourceTitle || optionLabel(AI_ANALYSIS_SOURCE_TYPES, note.sourceType))}</p>
              </div>
              <span class="tag ai-${note.status}">${optionLabel(AI_ANALYSIS_STATUSES, note.status)}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderAiSourceField(note) {
  const options = sourceOptionsForType(note.sourceType);
  if (note.sourceType === "freeform") {
    return `<input name="sourceId" value="" placeholder="自由输入不需要关联 ID" />`;
  }

  if (!options.length) {
    return `<input name="sourceId" value="${escapeHtml(note.sourceId)}" placeholder="先在对应模块创建数据，或手动填写 ID" />`;
  }

  return `
    <select name="sourceId">
      <option value="">选择关联对象</option>
      ${options
        .map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === note.sourceId ? "selected" : ""}>${escapeHtml(label)}</option>`)
        .join("")}
    </select>
  `;
}

function aiCandidateDecisionLabel(decision) {
  return {
    pending: "待确认",
    accepted: "已采纳",
    ignored: "已忽略",
  }[decision] || "待确认";
}

function isReviewDiagnosisNote(note) {
  return note.analysisType === "review_diagnosis" && note.sourceType === "interview_review";
}

function renderAiCandidateWorkspace(note, isNew) {
  if (!isReviewDiagnosisNote(note)) return "";
  const weaknesses = note.weaknessCandidates || [];
  const tasks = note.trainingTaskCandidates || [];

  if (isNew) {
    return `<div class="empty">保存复盘诊断记录后，可以解析结构化候选。</div>`;
  }

  return `
    <div class="detail-divider"></div>
    <section class="ai-candidates">
      <div class="section-heading">
        <div>
          <h3>人工确认区</h3>
          <p>候选只有在采纳后才会进入缺陷档案或训练计划。</p>
        </div>
        <span class="tag ai-schema">${escapeHtml(note.candidateSchemaVersion || "待解析")}</span>
      </div>
      ${note.analysisSummary ? `<div class="candidate-summary"><strong>诊断摘要</strong><p>${escapeHtml(note.analysisSummary)}</p></div>` : ""}
      ${
        (note.failurePointCandidates || []).length
          ? `<div class="tag-row">${note.failurePointCandidates.map((item) => `<span class="tag review-category">${escapeHtml(item)}</span>`).join("")}</div>`
          : ""
      }
      <div class="candidate-columns">
        <div class="candidate-group">
          <h4>能力缺陷候选</h4>
          ${
            weaknesses.length
              ? weaknesses.map((candidate) => {
                  const busy = state.actingAiCandidateId === candidate.id;
                  return `
                    <article class="candidate-card ${candidate.decision || "pending"}">
                      <div class="candidate-head">
                        <strong>${escapeHtml(candidate.title)}</strong>
                        <span class="tag candidate-${candidate.decision || "pending"}">${aiCandidateDecisionLabel(candidate.decision)}</span>
                      </div>
                      <p>${escapeHtml(candidate.description || candidate.evidence || "暂无描述")}</p>
                      <div class="tag-row">
                        <span class="tag severity-${candidate.severity}">${optionLabel(SEVERITIES, candidate.severity)}</span>
                        <span class="tag review-category">${optionLabel(WEAKNESS_CATEGORIES, candidate.category)}</span>
                      </div>
                      <div class="actions candidate-actions">
                        <button class="btn primary" type="button" data-ai-candidate-action="accept" data-ai-candidate-type="weakness" data-ai-candidate-id="${escapeHtml(candidate.id)}"${disabledAttr(busy || candidate.decision === "accepted")}>${candidate.decision === "accepted" ? "已创建缺陷" : "采纳为缺陷"}</button>
                        <button class="btn" type="button" data-ai-candidate-action="ignore" data-ai-candidate-type="weakness" data-ai-candidate-id="${escapeHtml(candidate.id)}"${disabledAttr(busy || candidate.decision === "accepted")}>忽略</button>
                      </div>
                    </article>
                  `;
                }).join("")
              : `<div class="empty compact-empty">暂无缺陷候选。</div>`
          }
        </div>
        <div class="candidate-group">
          <h4>训练任务候选</h4>
          ${
            tasks.length
              ? tasks.map((candidate) => {
                  const linkedWeakness = weaknesses.find((item) => item.id === candidate.weaknessCandidateId);
                  const busy = state.actingAiCandidateId === candidate.id;
                  return `
                    <article class="candidate-card ${candidate.decision || "pending"}">
                      <div class="candidate-head">
                        <strong>${escapeHtml(candidate.title)}</strong>
                        <span class="tag candidate-${candidate.decision || "pending"}">${aiCandidateDecisionLabel(candidate.decision)}</span>
                      </div>
                      <p>${escapeHtml(candidate.targetAbility || candidate.practiceOutput || "暂无目标能力")}</p>
                      <p class="mini-meta">关联缺陷：${escapeHtml(linkedWeakness?.title || "未匹配")}</p>
                      <div class="actions candidate-actions">
                        <button class="btn primary" type="button" data-ai-candidate-action="accept" data-ai-candidate-type="training_task" data-ai-candidate-id="${escapeHtml(candidate.id)}"${disabledAttr(busy || candidate.decision === "accepted")}>${candidate.decision === "accepted" ? "已创建任务" : "采纳为任务"}</button>
                        <button class="btn" type="button" data-ai-candidate-action="ignore" data-ai-candidate-type="training_task" data-ai-candidate-id="${escapeHtml(candidate.id)}"${disabledAttr(busy || candidate.decision === "accepted")}>忽略</button>
                      </div>
                    </article>
                  `;
                }).join("")
              : `<div class="empty compact-empty">暂无训练候选。</div>`
          }
        </div>
      </div>
    </section>
  `;
}

function renderAiAnalysisDetail(note) {
  const isNew = Boolean(state.aiAnalysisNoteDraft);

  if (!note) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">分析详情</h2>
            <p class="panel-subtitle">选择一条记录，或新增第一条 AI 辅助分析。</p>
          </div>
        </div>
        <div class="panel-body"><div class="empty">当前没有选中的分析记录。</div></div>
      </section>
    `;
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">${isNew ? "新增 AI 辅助分析" : "AI 分析详情"}</h2>
          <p class="panel-subtitle">先生成上下文和提示词，再把外部 AI 输出粘贴回来，最后写下你的判断。</p>
        </div>
      </div>
      <div class="panel-body">
        <form id="ai-analysis-form" class="form-grid compact-form ai-analysis-form">
          <div class="form-field full">
            <label>标题</label>
            <input name="title" value="${escapeHtml(note.title)}" placeholder="例如：拆解某公司 AI PM JD" required />
          </div>
          <div class="form-field">
            <label>分析类型</label>
            ${renderSelect("analysisType", AI_ANALYSIS_TYPES, note.analysisType)}
          </div>
          <div class="form-field">
            <label>材料来源</label>
            ${renderSelect("sourceType", AI_ANALYSIS_SOURCE_TYPES, note.sourceType)}
          </div>
          <div class="form-field">
            <label>关联对象</label>
            ${renderAiSourceField(note)}
          </div>
          <div class="form-field">
            <label>来源标题</label>
            <input name="sourceTitle" value="${escapeHtml(note.sourceTitle)}" placeholder="可自动生成，也可手动覆盖" />
          </div>
          <div class="form-field">
            <label>状态</label>
            ${renderSelect("status", AI_ANALYSIS_STATUSES, note.status)}
          </div>
          <div class="form-field full">
            <label>上下文快照</label>
            <textarea name="contextSnapshot" class="tall-textarea" placeholder="点击生成后，会汇总关联对象的关键材料。">${escapeHtml(note.contextSnapshot)}</textarea>
          </div>
          <div class="form-field full">
            <label>可复制提示词</label>
            <textarea name="promptDraft" class="tall-textarea" placeholder="这里是准备粘贴给 AI 的提示词。">${escapeHtml(note.promptDraft)}</textarea>
          </div>
          <div class="form-field full">
            <label>AI 输出</label>
            <textarea name="aiResponse" class="tall-textarea" placeholder="把外部 AI 的回答粘贴到这里。">${escapeHtml(note.aiResponse)}</textarea>
          </div>
          ${
            isReviewDiagnosisNote(note)
              ? `
                <div class="form-field full">
                  <label>结构化 AI 输出（JSON）</label>
                  <textarea name="structuredResponse" class="tall-textarea" placeholder="粘贴符合复盘诊断 schema 的 JSON。">${escapeHtml(note.structuredResponse)}</textarea>
                </div>
              `
              : `<input name="structuredResponse" type="hidden" value="${escapeHtml(note.structuredResponse)}" />`
          }
          <div class="form-field full">
            <label>人工决策</label>
            <textarea name="humanDecision" placeholder="记录你采纳什么、否决什么、下一步怎么做。">${escapeHtml(note.humanDecision)}</textarea>
          </div>
          <div class="form-field full">
            <label>下一步动作</label>
            <input name="nextAction" value="${escapeHtml(note.nextAction)}" placeholder="例如：补充项目案例、改写回答、更新 Brief" />
          </div>
          <div class="form-field full">
            <div class="actions">
              ${isNew ? `<button class="btn" id="cancel-ai-analysis-btn" type="button">取消</button>` : ""}
              <button class="btn" id="generate-ai-context-btn" type="button"${disabledAttr(state.generatingAiContext)}>${state.generatingAiContext ? "生成中..." : "生成上下文与提示词"}</button>
              ${isReviewDiagnosisNote(note) ? `<button class="btn" id="parse-ai-candidates-btn" type="button"${disabledAttr(state.parsingAiCandidates)}>${state.parsingAiCandidates ? "解析中..." : "解析结构化候选"}</button>` : ""}
              <button class="btn primary" type="submit"${disabledAttr(state.savingAiAnalysisNote)}>${state.savingAiAnalysisNote ? "保存中..." : "保存分析记录"}</button>
            </div>
            <div class="status-line">${note.updatedAt ? `上次更新：${escapeHtml(note.updatedAt)}` : "保存后会写入 content/ai-analysis-notes。"}</div>
          </div>
        </form>
        ${renderAiCandidateWorkspace(note, isNew)}
      </div>
    </section>
  `;
}

function renderAiFrontier() {
  const data = aiFrontierMetrics();
  const card = selectedAiFrontierCard();

  return `
    ${renderTopbar("AI 前沿思维框架", "把模型、产品、行业和方法论的前沿信号沉淀成可迁移的 AI PM 认知资产。", "07 AI Frontier")}
    <section class="grid metrics compact-metrics">
      <div class="metric"><div class="metric-label">卡片总数</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">待消化</div><div class="metric-value">${data.inbox}</div></div>
      <div class="metric"><div class="metric-label">已迁移</div><div class="metric-value">${data.mapped}</div></div>
      <div class="metric"><div class="metric-label">高优先级</div><div class="metric-value">${data.high}</div></div>
    </section>
    <div class="workspace">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">前沿卡片</h2>
            <p class="panel-subtitle">记录新模型、新产品、新论文、行业案例和产品判断框架。</p>
          </div>
          <button class="btn primary" id="new-ai-frontier-card-btn" type="button">新增卡片</button>
        </div>
        <div class="panel-body">${renderAiFrontierList()}</div>
      </section>
      ${renderAiFrontierDetail(card)}
    </div>
  `;
}

function renderAiFrontierList() {
  if (!state.aiFrontierCards.length) {
    return `<div class="empty">还没有 AI 前沿卡片。先记录一个你最近看到的新模型、新产品或行业案例。</div>`;
  }

  return `
    <div class="work-list">
      ${state.aiFrontierCards
        .map(
          (card) => `
            <button class="work-item ${card.id === state.selectedAiFrontierCardId ? "active" : ""}" data-ai-frontier-card-id="${escapeHtml(card.id)}" type="button">
              <div>
                <p class="work-item-title">${escapeHtml(card.topic)}</p>
                <p class="work-item-meta">${optionLabel(AI_FRONTIER_CATEGORIES, card.category)} · ${escapeHtml(card.sourceName || "未记录来源")}</p>
              </div>
              <span class="tag frontier-${card.status}">${optionLabel(AI_FRONTIER_STATUSES, card.status)}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderAiFrontierDetail(card) {
  const isNew = Boolean(state.aiFrontierCardDraft);

  if (!card) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">卡片详情</h2>
            <p class="panel-subtitle">选择一张卡片，或新增第一张 AI 前沿卡片。</p>
          </div>
        </div>
        <div class="panel-body"><div class="empty">当前没有选中的前沿卡片。</div></div>
      </section>
    `;
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">${isNew ? "新增 AI 前沿卡片" : "AI 前沿卡片详情"}</h2>
          <p class="panel-subtitle">保存后会写入 content/ai-frontier-cards 下的 Markdown 文件。</p>
        </div>
      </div>
      <div class="panel-body">
        <form id="ai-frontier-card-form" class="form-grid compact-form ai-frontier-form">
          <div class="form-field full">
            <label>主题</label>
            <input name="topic" value="${escapeHtml(card.topic)}" placeholder="例如：多模态 Agent 对 AI PM 工作流的影响" required />
          </div>
          <div class="form-field">
            <label>分类</label>
            ${renderSelect("category", AI_FRONTIER_CATEGORIES, card.category)}
          </div>
          <div class="form-field">
            <label>状态</label>
            ${renderSelect("status", AI_FRONTIER_STATUSES, card.status)}
          </div>
          <div class="form-field">
            <label>优先级</label>
            ${renderSelect("priority", PRIORITIES, card.priority)}
          </div>
          <div class="form-field">
            <label>来源日期</label>
            <input name="sourceDate" type="date" value="${escapeHtml(card.sourceDate)}" />
          </div>
          <div class="form-field">
            <label>来源名称</label>
            <input name="sourceName" value="${escapeHtml(card.sourceName)}" placeholder="论文 / 产品 / 公司 / 文章" />
          </div>
          <div class="form-field">
            <label>来源链接</label>
            <input name="sourceUrl" value="${escapeHtml(card.sourceUrl)}" placeholder="https://..." />
          </div>
          <div class="form-field full">
            <label>前沿摘要</label>
            <textarea name="summary">${escapeHtml(card.summary)}</textarea>
          </div>
          <div class="form-field full">
            <label>关键洞察</label>
            <textarea name="keyInsights" class="tall-textarea">${escapeHtml(card.keyInsights)}</textarea>
          </div>
          <div class="form-field full">
            <label>产品启发</label>
            <textarea name="productImplications" class="tall-textarea">${escapeHtml(card.productImplications)}</textarea>
          </div>
          <div class="form-field full">
            <label>面试迁移</label>
            <textarea name="interviewTransfer" class="tall-textarea" placeholder="这张卡能迁移到哪些面试问题、观点或项目表达？">${escapeHtml(card.interviewTransfer)}</textarea>
          </div>
          <div class="form-field full">
            <label>作品集迁移</label>
            <textarea name="portfolioTransfer" placeholder="未来公开展示时，这个前沿认知可以怎样变成作品集内容？">${escapeHtml(card.portfolioTransfer)}</textarea>
          </div>
          <div class="form-field full">
            <label>开放问题</label>
            <textarea name="openQuestions" placeholder="还有哪些没想透的问题？">${escapeHtml(card.openQuestions)}</textarea>
          </div>
          <div class="form-field full">
            <label>标签</label>
            <input name="tags" value="${escapeHtml(card.tags)}" placeholder="Agent, 多模态, AI PM, 商业化" />
          </div>
          <div class="form-field full">
            <div class="actions">
              ${isNew ? `<button class="btn" id="cancel-ai-frontier-card-btn" type="button">取消</button>` : ""}
              <button class="btn primary" type="submit"${disabledAttr(state.savingAiFrontierCard)}>${state.savingAiFrontierCard ? "保存中..." : "保存前沿卡片"}</button>
            </div>
            <div class="status-line">${card.updatedAt ? `上次更新：${escapeHtml(card.updatedAt)}` : "保存后会写入 content/ai-frontier-cards。"}</div>
          </div>
        </form>
      </div>
    </section>
  `;
}

function renderRhythm() {
  const data = rhythmMetrics();
  const log = selectedRhythmLog();

  return `
    ${renderTopbar("个人节奏运营官", "记录精力、负荷、恢复和下一步调整，让求职闭环长期跑得动。", "09 Rhythm Operator")}
    <section class="grid metrics compact-metrics">
      <div class="metric"><div class="metric-label">记录总数</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">需要恢复</div><div class="metric-value">${data.recoveryNeeded}</div></div>
      <div class="metric"><div class="metric-label">高负荷</div><div class="metric-value">${data.highLoad}</div></div>
      <div class="metric"><div class="metric-label">低精力</div><div class="metric-value">${data.lowEnergy}</div></div>
    </section>
    <div class="workspace">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">节奏记录</h2>
            <p class="panel-subtitle">把面试、训练、恢复和日程压力放在同一张运营表里看。</p>
          </div>
          <button class="btn primary" id="new-rhythm-log-btn" type="button">新增记录</button>
        </div>
        <div class="panel-body">${renderRhythmList()}</div>
      </section>
      ${renderRhythmDetail(log)}
    </div>
  `;
}

function renderRhythmList() {
  if (!state.rhythmLogs.length) {
    return `<div class="empty">还没有节奏记录。先记录今天的精力、负荷和恢复动作。</div>`;
  }

  return `
    <div class="work-list">
      ${state.rhythmLogs
        .map(
          (log) => `
            <button class="work-item ${log.id === state.selectedRhythmLogId ? "active" : ""}" data-rhythm-log-id="${escapeHtml(log.id)}" type="button">
              <div>
                <p class="work-item-title">${escapeHtml(log.title)}</p>
                <p class="work-item-meta">${escapeHtml(log.date)} · 负荷 ${optionLabel(RHYTHM_LEVELS, log.loadLevel)} · 精力 ${optionLabel(RHYTHM_LEVELS, log.energyLevel)}</p>
              </div>
              <span class="tag rhythm-${log.status}">${optionLabel(RHYTHM_STATUSES, log.status)}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderRhythmDetail(log) {
  const isNew = Boolean(state.rhythmLogDraft);

  if (!log) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">节奏详情</h2>
            <p class="panel-subtitle">选择一条记录，或新增第一条节奏记录。</p>
          </div>
        </div>
        <div class="panel-body"><div class="empty">当前没有选中的节奏记录。</div></div>
      </section>
    `;
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">${isNew ? "新增节奏记录" : "节奏记录详情"}</h2>
          <p class="panel-subtitle">保存后会写入 content/rhythm-logs 下的 Markdown 文件。</p>
        </div>
      </div>
      <div class="panel-body">
        <form id="rhythm-log-form" class="form-grid compact-form rhythm-form">
          <div class="form-field">
            <label>日期</label>
            <input name="date" type="date" value="${escapeHtml(log.date)}" required />
          </div>
          <div class="form-field">
            <label>标题</label>
            <input name="title" value="${escapeHtml(log.title)}" required />
          </div>
          <div class="form-field">
            <label>状态</label>
            ${renderSelect("status", RHYTHM_STATUSES, log.status)}
          </div>
          <div class="form-field">
            <label>节奏风险</label>
            ${renderSelect("rhythmRisk", RHYTHM_LEVELS, log.rhythmRisk)}
          </div>
          <div class="form-field">
            <label>精力</label>
            ${renderSelect("energyLevel", RHYTHM_LEVELS, log.energyLevel)}
          </div>
          <div class="form-field">
            <label>专注</label>
            ${renderSelect("focusLevel", RHYTHM_LEVELS, log.focusLevel)}
          </div>
          <div class="form-field">
            <label>负荷</label>
            ${renderSelect("loadLevel", RHYTHM_LEVELS, log.loadLevel)}
          </div>
          <div class="form-field">
            <label>恢复</label>
            ${renderSelect("recoveryLevel", RHYTHM_LEVELS, log.recoveryLevel)}
          </div>
          <div class="form-field">
            <label>睡眠小时</label>
            <input name="sleepHours" type="number" step="0.5" min="0" value="${escapeHtml(log.sleepHours)}" />
          </div>
          <div class="form-field">
            <label>面试负荷</label>
            <input name="interviewLoad" value="${escapeHtml(log.interviewLoad)}" placeholder="例如：2 场面试 / 1 个邀约" />
          </div>
          <div class="form-field">
            <label>训练负荷</label>
            <input name="trainingLoad" value="${escapeHtml(log.trainingLoad)}" placeholder="例如：复盘 1 份，表达训练 30 分钟" />
          </div>
          <div class="form-field full">
            <label>当天重点</label>
            <textarea name="plannedFocus">${escapeHtml(log.plannedFocus)}</textarea>
          </div>
          <div class="form-field full">
            <label>恢复动作</label>
            <textarea name="recoveryAction" placeholder="例如：暂停新增投递、早点睡、只做低强度整理。">${escapeHtml(log.recoveryAction)}</textarea>
          </div>
          <div class="form-field full">
            <label>下一步调整</label>
            <textarea name="nextAdjustment" placeholder="需要总控台提醒你调整的事项。">${escapeHtml(log.nextAdjustment)}</textarea>
          </div>
          <div class="form-field full">
            <label>备注</label>
            <textarea name="notes">${escapeHtml(log.notes)}</textarea>
          </div>
          <div class="form-field full">
            <div class="actions">
              ${isNew ? `<button class="btn" id="cancel-rhythm-log-btn" type="button">取消</button>` : ""}
              <button class="btn primary" type="submit"${disabledAttr(state.savingRhythmLog)}>${state.savingRhythmLog ? "保存中..." : "保存节奏记录"}</button>
            </div>
            <div class="status-line">${log.updatedAt ? `上次更新：${escapeHtml(log.updatedAt)}` : "保存后会写入 content/rhythm-logs。"}</div>
          </div>
        </form>
      </div>
    </section>
  `;
}

function renderExpressionLab() {
  const data = expressionLabMetrics();
  const drill = selectedExpressionDrill();

  return `
    ${renderTopbar("表达稳定性训练室", "把分散的表达训练统一收束，记录每一次练习，直到可以稳定说出口。", "10 Expression Lab")}
    <section class="grid metrics compact-metrics">
      <div class="metric"><div class="metric-label">训练总数</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">未稳定</div><div class="metric-value">${data.unstable}</div></div>
      <div class="metric"><div class="metric-label">练习记录</div><div class="metric-value">${data.sessions}</div></div>
      <div class="metric"><div class="metric-label">稳定记录</div><div class="metric-value">${data.stableSessions}</div></div>
    </section>
    <div class="workspace">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">全局表达训练</h2>
            <p class="panel-subtitle">来自项目追问、能力缺陷、训练任务和面试复盘的表达训练都会汇总到这里。</p>
          </div>
        </div>
        <div class="panel-body">${renderExpressionLabDrillList()}</div>
      </section>
      ${renderExpressionLabDetail(drill)}
    </div>
  `;
}

function renderExpressionLabDrillList() {
  if (!state.expressionDrills.length) {
    return `<div class="empty">还没有表达训练。可以先从项目追问、能力缺陷或训练任务里创建训练记录。</div>`;
  }

  return `
    <div class="work-list">
      ${state.expressionDrills
        .map(
          (drill) => `
            <button class="work-item ${drill.id === state.selectedExpressionDrillId ? "active" : ""}" data-expression-drill-id="${escapeHtml(drill.id)}" type="button">
              <div>
                <p class="work-item-title">${escapeHtml(drill.question)}</p>
                <p class="work-item-meta">${optionLabel(EXPRESSION_DRILL_SOURCE_TYPES, drill.sourceType)} · 练习 ${sessionsForDrill(drill.id).length} 次</p>
              </div>
              <span class="tag drill-${drill.status}">${optionLabel(EXPRESSION_DRILL_STATUSES, drill.status)}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderExpressionLabDetail(drill) {
  if (!drill) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">训练详情</h2>
            <p class="panel-subtitle">选择一条表达训练，查看目标回答和练习记录。</p>
          </div>
        </div>
        <div class="panel-body"><div class="empty">当前没有选中的表达训练。</div></div>
      </section>
    `;
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">训练详情</h2>
          <p class="panel-subtitle">保存表达训练本体后，可以持续追加练习 session。</p>
        </div>
      </div>
      <div class="panel-body stack">
        ${renderExpressionDrillFormForSource(drill.sourceType, drill.sourceId)}
        <div class="detail-divider"></div>
        <div class="section-heading">
          <div>
            <h3>练习记录</h3>
            <p>每一次练习都记录卡点、改进回答和稳定性证据。</p>
          </div>
          <button class="btn" id="new-expression-session-btn" type="button">新增练习</button>
        </div>
        ${renderExpressionSessionList(drill.id)}
        ${renderExpressionSessionForm(drill)}
      </div>
    </section>
  `;
}

function renderExpressionSessionList(drillId) {
  const sessions = sessionsForDrill(drillId);
  if (!sessions.length) {
    return `<div class="empty">还没有练习记录。先新增一次练习，把“目标回答”练到能稳定说出口。</div>`;
  }

  return `
    <div class="work-list">
      ${sessions
        .map(
          (session) => `
            <button class="work-item ${session.id === state.selectedExpressionSessionId ? "active" : ""}" data-expression-session-id="${escapeHtml(session.id)}" type="button">
              <div>
                <p class="work-item-title">${optionLabel(EXPRESSION_SESSION_ATTEMPT_TYPES, session.attemptType)}${session.practicedAt ? ` · ${escapeHtml(formatDateTime(session.practicedAt))}` : ""}</p>
                <p class="work-item-meta">${optionLabel(EXPRESSION_DRILL_SCORES, session.selfRating)}${session.nextAction ? ` · ${escapeHtml(session.nextAction)}` : ""}</p>
              </div>
              <span class="tag session-${session.status}">${optionLabel(EXPRESSION_SESSION_STATUSES, session.status)}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderExpressionSessionForm(drill) {
  const session = selectedExpressionSession();
  const isNew = Boolean(state.expressionSessionDraft);

  if (!session || session.drillId !== drill.id) {
    return `<div class="empty">选择一条练习记录进行编辑，或从当前训练新增练习。</div>`;
  }

  return `
    <form id="expression-session-form" class="form-grid compact-form">
      <input type="hidden" name="drillId" value="${escapeHtml(session.drillId)}" />
      <input type="hidden" name="question" value="${escapeHtml(session.question)}" />
      <div class="form-field">
        <label>练习时间</label>
        <input name="practicedAt" type="datetime-local" value="${escapeHtml(session.practicedAt)}" />
      </div>
      <div class="form-field">
        <label>练习方式</label>
        ${renderSelect("attemptType", EXPRESSION_SESSION_ATTEMPT_TYPES, session.attemptType)}
      </div>
      <div class="form-field">
        <label>时长分钟</label>
        <input name="durationMinutes" type="number" min="0" value="${escapeHtml(session.durationMinutes)}" />
      </div>
      <div class="form-field">
        <label>自评分</label>
        ${renderSelect("selfRating", EXPRESSION_DRILL_SCORES, session.selfRating)}
      </div>
      <div class="form-field">
        <label>状态</label>
        ${renderSelect("status", EXPRESSION_SESSION_STATUSES, session.status)}
      </div>
      ${renderBriefField("blockers", "卡点", session.blockers, "这次说不稳、卡住或容易跑偏的地方")}
      ${renderBriefField("improvedAnswer", "改进回答", session.improvedAnswer, "这次练习后更稳定的回答版本")}
      ${renderBriefField("reviewerNote", "复核记录", session.reviewerNote, "自我复核或模拟面试反馈")}
      ${renderBriefField("stabilityEvidence", "稳定性证据", session.stabilityEvidence, "能证明更稳定的证据，例如连续复述、模拟面试通过")}
      ${renderBriefField("nextAction", "下一步动作", session.nextAction, "下一次练习要继续处理什么")}
      <div class="form-field full">
        <div class="actions">
          ${isNew ? `<button class="btn" id="cancel-expression-session-btn" type="button">取消</button>` : ""}
          <button class="btn primary" type="submit"${disabledAttr(state.savingExpressionSession)}>${state.savingExpressionSession ? "保存中..." : "保存练习记录"}</button>
        </div>
        <div class="status-line">${session.updatedAt ? `上次更新：${escapeHtml(session.updatedAt)}` : "保存后会写入 content/expression-sessions。"}</div>
      </div>
    </form>
  `;
}

function render() {
  let content;
  if (state.activeModule === "dashboard") content = renderDashboard();
  if (state.activeModule === "globalSearch") content = renderGlobalSearch();
  if (state.activeModule === "pipeline") content = renderPipeline();
  if (state.activeModule === "preInterview") content = renderPreInterview();
  if (state.activeModule === "postInterview") content = renderPostInterview();
  if (state.activeModule === "weakness") content = renderWeakness();
  if (state.activeModule === "projectAmmo") content = renderProjectAmmo();
  if (state.activeModule === "trainingPlan") content = renderTrainingPlan();
  if (state.activeModule === "portfolio") content = renderPortfolio();
  if (state.activeModule === "aiAnalysis") content = renderAiAnalysis();
  if (state.activeModule === "aiFrontier") content = renderAiFrontier();
  if (state.activeModule === "rhythm") content = renderRhythm();
  if (state.activeModule === "expressionLab") content = renderExpressionLab();

  renderShell(content);
  attachCommonEvents();
}

loadOpportunities();
