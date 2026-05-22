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

const MODULES = [
  ["dashboard", "总控台", "00"],
  ["pipeline", "求职中台", "01"],
  ["preInterview", "面试前作战室", "02"],
  ["postInterview", "面试后复盘室", "03"],
  ["weakness", "缺陷与训练中心", "04"],
  ["projectAmmo", "项目弹药库", "05"],
  ["portfolio", "作品集产品线", "06"],
  ["aiAnalysis", "AI 辅助分析", "07"],
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
  humanDecision: "",
  nextAction: "",
  status: "prompt_ready",
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
  portfolioProfile: { ...EMPTY_PORTFOLIO_PROFILE },
  portfolioProjects: [],
  portfolioPreviewMode: false,
  aiAnalysisNotes: [],
  selectedId: null,
  selectedInterviewId: null,
  selectedBriefId: null,
  selectedReviewId: null,
  selectedWeaknessId: null,
  selectedTrainingTaskId: null,
  selectedProjectAmmoId: null,
  selectedFollowUpQuestionId: null,
  selectedExpressionDrillId: null,
  selectedPortfolioProjectId: null,
  selectedAiAnalysisNoteId: null,
  draft: null,
  interviewDraft: null,
  briefDraft: null,
  reviewDraft: null,
  weaknessDraft: null,
  trainingTaskDraft: null,
  projectAmmoDraft: null,
  followUpQuestionDraft: null,
  expressionDrillDraft: null,
  portfolioProjectDraft: null,
  aiAnalysisNoteDraft: null,
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
  savingPortfolioProfile: false,
  savingPortfolioProject: false,
  savingAiAnalysisNote: false,
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

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
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
  const response = await fetch(path, {
    headers: { "content-type": "application/json" },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "请求失败");
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
      portfolioProfilePayload,
      portfolioProjectsPayload,
      aiAnalysisNotesPayload,
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
      api("/api/portfolio-profile"),
      api("/api/portfolio-projects"),
      api("/api/ai-analysis-notes"),
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
    state.portfolioProfile = portfolioProfilePayload.profile || { ...EMPTY_PORTFOLIO_PROFILE };
    state.portfolioProjects = portfolioProjectsPayload.portfolioProjects || [];
    state.aiAnalysisNotes = aiAnalysisNotesPayload.aiAnalysisNotes || [];
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
  } catch (error) {
    showToast(error.message);
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
  state.selectedTrainingTaskId = id;
  state.trainingTaskDraft = null;
  state.expressionDrillDraft = null;
  state.selectedExpressionDrillId = drillsForSource("training_task", id)[0]?.id || null;
  render();
}

function beginTrainingTaskForSelectedWeakness() {
  const weakness = selectedWeakness();
  if (!weakness?.id) {
    showToast("请先选择或保存一个能力缺陷");
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

function selectedPortfolioProject() {
  if (state.portfolioProjectDraft) return state.portfolioProjectDraft;
  return state.portfolioProjects.find((item) => item.id === state.selectedPortfolioProjectId) || null;
}

function selectedAiAnalysisNote() {
  if (state.aiAnalysisNoteDraft) return state.aiAnalysisNoteDraft;
  return state.aiAnalysisNotes.find((item) => item.id === state.selectedAiAnalysisNoteId) || null;
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

function openAiAnalysisNote(id) {
  state.activeModule = "aiAnalysis";
  selectAiAnalysisNote(id);
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

function beginPortfolioProjectFromAmmo(ammoId) {
  const ammo = state.projectAmmos.find((item) => item.id === ammoId);
  if (!ammo) {
    showToast("没有找到项目弹药");
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
    showToast("请先保存项目弹药，再添加追问");
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
    showToast("请先保存项目追问，再创建表达训练");
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
    showToast("请先保存能力缺陷，再创建表达训练");
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
    showToast("请先保存训练任务，再创建表达训练");
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

function beginWeaknessFromSelectedReview() {
  const review = selectedReview();
  if (!review?.id) {
    showToast("请先保存一份复盘");
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
    showToast("请先选择或保存一个岗位");
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
  state.activeModule = "weakness";
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
      state.activeModule = "weakness";
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

function openPreInterviewForInterview(id) {
  selectInterviewForBrief(id);
  state.activeModule = "preInterview";
  render();
}

function beginBriefForSelectedInterview() {
  const interview = selectedInterview();
  if (!interview?.id) {
    showToast("请先选择一轮面试");
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
    showToast("请先选择一轮面试");
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

function groupByStage() {
  const groups = Object.fromEntries(STAGES.map(([stage]) => [stage, []]));
  for (const opportunity of state.opportunities) {
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

function weaknessMetrics() {
  return {
    total: state.weaknesses.length,
    open: state.weaknesses.filter((weakness) => weakness.status === "open").length,
    training: state.weaknesses.filter((weakness) => weakness.status === "training").length,
    high: state.weaknesses.filter((weakness) => weakness.severity === "high").length,
  };
}

function trainingTaskMetrics() {
  return {
    total: state.trainingTasks.length,
    active: state.trainingTasks.filter((task) => ["todo", "doing", "reviewing"].includes(task.status)).length,
    validated: state.trainingTasks.filter((task) => task.status === "validated").length,
  };
}

function projectAmmoMetrics() {
  return {
    total: state.projectAmmos.length,
    usable: state.projectAmmos.filter((item) => item.status === "usable").length,
    needsDeepening: state.projectAmmos.filter((item) => item.status === "needs_deepening").length,
  };
}

function renderShell(content) {
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">A</div>
          <div>
            <h1 class="brand-title">way2AIPM OS</h1>
            <p class="brand-subtitle">v0.2 Markdown 工作台</p>
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
      <main class="main">${content}</main>
    </div>
  `;

  document.querySelectorAll("[data-module]").forEach((button) => {
    button.addEventListener("click", () => switchModule(button.dataset.module));
  });
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
  const nextAction = opportunity.nextAction
    ? `<p class="next-action">下一步：${escapeHtml(opportunity.nextAction)}</p>`
    : "";
  const interviewLine = nextInterview
    ? `<p class="next-action">面试：${escapeHtml(nextInterview.roundName)}${nextInterview.scheduledAt ? ` · ${escapeHtml(formatDateTime(nextInterview.scheduledAt))}` : ""} · ${escapeHtml(briefStatusForInterview(nextInterview.id))}</p>`
    : "";
  return `
    <button class="opp-card ${active ? "active" : ""}" data-select-id="${escapeHtml(opportunity.id)}" type="button">
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
  `;
}

function renderPipelineBoard() {
  const groups = groupByStage();
  if (state.loading) {
    return `<div class="empty">正在读取 Markdown 记录...</div>`;
  }

  if (!state.opportunities.length) {
    return `
      <div class="empty">
        还没有岗位机会。先创建第一个岗位，Pipeline 就会开始运转。
      </div>
    `;
  }

  return `
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
          <button class="btn primary" type="submit">${state.savingInterview ? "保存中..." : "保存面试轮次"}</button>
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
              <button class="btn primary" type="submit">${state.saving ? "保存中..." : "保存 Markdown"}</button>
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
  document.querySelector("#opportunity-form")?.addEventListener("submit", submitOpportunity);
  document.querySelector("#interview-form")?.addEventListener("submit", submitInterview);
  document.querySelector("#brief-form")?.addEventListener("submit", submitBrief);
  document.querySelector("#review-form")?.addEventListener("submit", submitReview);
  document.querySelector("#weakness-form")?.addEventListener("submit", submitWeakness);
  document.querySelector("#training-task-form")?.addEventListener("submit", submitTrainingTask);
  document.querySelector("#project-ammo-form")?.addEventListener("submit", submitProjectAmmo);
  document.querySelector("#follow-up-question-form")?.addEventListener("submit", submitFollowUpQuestion);
  document.querySelector("#expression-drill-form")?.addEventListener("submit", submitExpressionDrill);
  document.querySelector("#portfolio-profile-form")?.addEventListener("submit", submitPortfolioProfile);
  document.querySelector("#portfolio-project-form")?.addEventListener("submit", submitPortfolioProject);
  document.querySelector("#ai-analysis-form")?.addEventListener("submit", submitAiAnalysisNote);
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
    showToast(error.message);
  } finally {
    state.saving = false;
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
    showToast(error.message);
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
    showToast(error.message);
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
    showToast(error.message);
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
    showToast(error.message);
  } finally {
    state.savingWeakness = false;
    render();
  }
}

function formToTrainingTask(form) {
  const formData = new FormData(form);
  const weakness = selectedWeakness();
  return {
    weaknessId: formData.get("weaknessId") || weakness?.id,
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
    state.trainingTaskDraft = null;
    showToast("训练任务已保存");
    const [taskList, weaknessList] = await Promise.all([
      api("/api/training-tasks"),
      api("/api/weaknesses"),
    ]);
    state.trainingTasks = taskList.tasks || [];
    state.weaknesses = weaknessList.weaknesses || [];
  } catch (error) {
    showToast(error.message);
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
    showToast(error.message);
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
    showToast(error.message);
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
    showToast(error.message);
  } finally {
    state.savingExpressionDrill = false;
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
    showToast(error.message);
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
    showToast(error.message);
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
    showToast(error.message);
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
    showToast(error.message);
  } finally {
    state.savingAiAnalysisNote = false;
    render();
  }
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

  return `
    ${topbar}
    ${renderMetricGrid()}
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
              <button class="btn primary" type="submit">${state.savingBrief ? "保存中..." : "保存作战 Brief"}</button>
            </div>
            <div class="status-line">${brief.updatedAt ? `上次更新：${escapeHtml(brief.updatedAt)}` : "保存后会写入 content/pre-interview-briefs。"}</div>
          </div>
        </form>
      </div>
    </section>
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
            <button class="btn" id="create-weakness-from-review-btn" type="button">从本轮复盘创建缺陷</button>
          </div>
          <div class="form-field full">
            <div class="actions">
              ${isNew ? `<button class="btn" id="cancel-review-btn" type="button">取消</button>` : ""}
              <button class="btn primary" type="submit">${state.savingReview ? "保存中..." : "保存面试复盘"}</button>
            </div>
            <div class="status-line">${review.updatedAt ? `上次更新：${escapeHtml(review.updatedAt)}` : "保存后会写入 content/interview-reviews。"}</div>
          </div>
        </form>
      </div>
    </section>
  `;
}

function renderWeakness() {
  const data = weaknessMetrics();
  const taskData = trainingTaskMetrics();
  const weakness = selectedWeakness();
  return `
    ${renderTopbar("缺陷与训练中心", "这里会承接复盘中的弱回答，沉淀成能力缺陷和训练任务。", "04 Weakness & Training")}
    <section class="grid metrics compact-metrics">
      <div class="metric"><div class="metric-label">缺陷总数</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">待处理</div><div class="metric-value">${data.open}</div></div>
      <div class="metric"><div class="metric-label">进行中训练</div><div class="metric-value">${taskData.active}</div></div>
      <div class="metric"><div class="metric-label">已验证训练</div><div class="metric-value">${taskData.validated}</div></div>
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
              <button class="btn primary" type="submit">${state.savingWeakness ? "保存中..." : "保存能力缺陷"}</button>
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
    ${renderTopbar("项目弹药库", "沉淀项目故事、关键证据、AI 相关性、可证明能力和高风险追问。", "05 Project Ammo")}
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
              <button class="btn primary" type="submit">${state.savingProjectAmmo ? "保存中..." : "保存项目弹药"}</button>
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
          <button class="btn primary" type="submit">${state.savingFollowUpQuestion ? "保存中..." : "保存项目追问"}</button>
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
          <button class="btn primary" type="submit">${state.savingExpressionDrill ? "保存中..." : "保存表达训练"}</button>
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
        <input value="${escapeHtml(weakness.title)}" disabled />
      </div>
      ${renderBriefField("targetAbility", "目标能力", task.targetAbility, "这次训练要修复什么能力问题")}
      ${renderBriefField("practiceOutput", "练习产物", task.practiceOutput, "写下重写后的回答、模拟面试记录或练习结果")}
      ${renderBriefField("acceptanceCriteria", "验收标准", task.acceptanceCriteria, "怎样才算完成，最好可检查、可复盘")}
      ${renderBriefField("validationNote", "验证记录", task.validationNote, "后续面试或复盘中如何证明改善了")}
      <input name="weaknessId" type="hidden" value="${escapeHtml(weakness.id)}" />
      <input name="relatedReviewId" type="hidden" value="${escapeHtml(task.relatedReviewId)}" />
      <input name="relatedInterviewRoundId" type="hidden" value="${escapeHtml(task.relatedInterviewRoundId)}" />
      <div class="form-field full">
        <div class="actions">
          ${isNew ? `<button class="btn" id="cancel-training-task-btn" type="button">取消</button>` : ""}
          <button class="btn primary" type="submit">${state.savingTrainingTask ? "保存中..." : "保存训练任务"}</button>
        </div>
        <div class="status-line">${task.updatedAt ? `上次更新：${escapeHtml(task.updatedAt)}` : "保存后会写入 content/training-tasks。"}</div>
      </div>
    </form>
  `;
}

function renderPortfolio() {
  const data = portfolioMetrics();

  return `
    ${renderTopbar("作品集产品线", "把成熟项目弹药整理成未来可公开展示的作品集素材。", "06 Portfolio Line")}
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
          <button class="btn primary" type="submit">${state.savingPortfolioProfile ? "保存中..." : "保存作品集资料"}</button>
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
              <button class="btn primary" type="submit">${state.savingPortfolioProject ? "保存中..." : "保存项目卡"}</button>
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
    ${renderTopbar("AI 辅助分析", "生成可审查的上下文快照和可复制提示词，粘贴 AI 输出后记录你的人工决策。", "07 AI Assist")}
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
              <button class="btn" id="generate-ai-context-btn" type="button">${state.generatingAiContext ? "生成中..." : "生成上下文与提示词"}</button>
              <button class="btn primary" type="submit">${state.savingAiAnalysisNote ? "保存中..." : "保存分析记录"}</button>
            </div>
            <div class="status-line">${note.updatedAt ? `上次更新：${escapeHtml(note.updatedAt)}` : "保存后会写入 content/ai-analysis-notes。"}</div>
          </div>
        </form>
      </div>
    </section>
  `;
}

function render() {
  let content;
  if (state.activeModule === "dashboard") content = renderDashboard();
  if (state.activeModule === "pipeline") content = renderPipeline();
  if (state.activeModule === "preInterview") content = renderPreInterview();
  if (state.activeModule === "postInterview") content = renderPostInterview();
  if (state.activeModule === "weakness") content = renderWeakness();
  if (state.activeModule === "projectAmmo") content = renderProjectAmmo();
  if (state.activeModule === "portfolio") content = renderPortfolio();
  if (state.activeModule === "aiAnalysis") content = renderAiAnalysis();

  renderShell(content);
  attachCommonEvents();
}

loadOpportunities();
