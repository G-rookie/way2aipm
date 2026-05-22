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

const MODULES = [
  ["dashboard", "总控台", "00"],
  ["pipeline", "求职中台", "01"],
  ["preInterview", "面试前作战室", "02"],
  ["postInterview", "面试后复盘室", "03"],
  ["weakness", "缺陷与训练中心", "04"],
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

const state = {
  activeModule: "dashboard",
  opportunities: [],
  interviews: [],
  briefs: [],
  selectedId: null,
  selectedInterviewId: null,
  selectedBriefId: null,
  draft: null,
  interviewDraft: null,
  briefDraft: null,
  loading: true,
  saving: false,
  savingInterview: false,
  savingBrief: false,
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
    const [opportunitiesPayload, interviewsPayload, briefsPayload] = await Promise.all([
      api("/api/opportunities"),
      api("/api/interviews"),
      api("/api/pre-interview-briefs"),
    ]);
    state.opportunities = opportunitiesPayload.opportunities || [];
    state.interviews = interviewsPayload.interviews || [];
    state.briefs = briefsPayload.briefs || [];
    if (!state.selectedId && state.opportunities.length) {
      state.selectedId = state.opportunities[0].id;
    }
    if (!state.selectedInterviewId && state.selectedId) {
      state.selectedInterviewId = interviewsForOpportunity(state.selectedId)[0]?.id || null;
    }
    if (!state.selectedBriefId && state.selectedInterviewId) {
      state.selectedBriefId = briefForInterview(state.selectedInterviewId)?.id || null;
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

function selectedBrief() {
  if (state.briefDraft) return state.briefDraft;
  return state.briefs.find((item) => item.id === state.selectedBriefId) || null;
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
  const currentInterview = state.interviews.find((item) => item.id === state.selectedInterviewId);
  if (currentInterview?.opportunityId !== id) {
    state.selectedInterviewId = interviewsForOpportunity(id)[0]?.id || null;
    state.selectedBriefId = state.selectedInterviewId ? briefForInterview(state.selectedInterviewId)?.id || null : null;
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
  state.selectedBriefId = briefForInterview(id)?.id || null;
  render();
}

function selectInterviewForBrief(id) {
  const interview = state.interviews.find((item) => item.id === id);
  if (!interview) return;
  state.selectedInterviewId = id;
  state.selectedId = interview.opportunityId;
  state.interviewDraft = null;
  state.briefDraft = null;
  state.selectedBriefId = briefForInterview(id)?.id || null;
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
  return `
    <section class="grid metrics">
      <div class="metric"><div class="metric-label">全部机会</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">进行中</div><div class="metric-value">${data.active}</div></div>
      <div class="metric"><div class="metric-label">待准备面试</div><div class="metric-value">${interviewData.needsPrep}</div></div>
      <div class="metric"><div class="metric-label">高风险</div><div class="metric-value">${data.highRisk}</div></div>
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
    ? `<p class="next-action">面试：${escapeHtml(nextInterview.roundName)}${nextInterview.scheduledAt ? ` · ${escapeHtml(formatDateTime(nextInterview.scheduledAt))}` : ""}</p>`
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
        state.activeModule = "pipeline";
        state.selectedInterviewId = button.dataset.interviewId;
        render();
      }
    });
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
  document.querySelector("#pre-interview-selector")?.addEventListener("change", (event) => {
    selectInterviewForBrief(event.target.value);
  });
  document.querySelector("#create-brief-btn")?.addEventListener("click", beginBriefForSelectedInterview);
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
  document.querySelector("#opportunity-form")?.addEventListener("submit", submitOpportunity);
  document.querySelector("#interview-form")?.addEventListener("submit", submitInterview);
  document.querySelector("#brief-form")?.addEventListener("submit", submitBrief);
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
    const [opportunityList, interviewList] = await Promise.all([
      api("/api/opportunities"),
      api("/api/interviews"),
    ]);
    state.opportunities = opportunityList.opportunities || [];
    state.interviews = interviewList.interviews || [];
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
    const [interviewList, briefList] = await Promise.all([
      api("/api/interviews"),
      api("/api/pre-interview-briefs"),
    ]);
    state.interviews = interviewList.interviews || [];
    state.briefs = briefList.briefs || [];
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

  return `
    ${topbar}
    ${renderMetricGrid()}
    <div class="workspace dashboard-workspace">
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
            <h2 class="panel-title">高风险机会</h2>
            <p class="panel-subtitle">优先处理可能影响面试表现的岗位。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="work-list">
            ${
              highRisk.length
                ? highRisk.map(renderOpportunityCard).join("")
                : `<div class="empty">当前没有高风险岗位。</div>`
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
    <div class="pre-interview-layout">
      ${renderPreInterviewSelector()}
      ${renderBriefForm(interview)}
    </div>
  `;
}

function renderPostInterview() {
  return `
    ${renderTopbar("面试后复盘室", "先预留真实问题、回答评分、挂点分析和训练任务入口。", "03 Post-Interview Review")}
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">复盘工作流占位</h2>
          <p class="panel-subtitle">下一阶段从 Pipeline 的已面试机会进入这里。</p>
        </div>
      </div>
      <div class="panel-body placeholder-grid">
        <div class="placeholder-card"><h3>实际问题记录</h3><p>面试结束后尽快记录真实问题和追问路径。</p></div>
        <div class="placeholder-card"><h3>回答评级</h3><p>区分强回答、弱回答和没有证据支撑的回答。</p></div>
        <div class="placeholder-card"><h3>挂点分析</h3><p>把一次失败回答关联到具体能力缺陷，而不是停留在情绪判断。</p></div>
      </div>
    </section>
  `;
}

function renderWeakness() {
  return `
    ${renderTopbar("缺陷与训练中心", "这里会承接复盘中的弱回答，沉淀成能力缺陷和训练任务。", "04 Weakness & Training")}
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">能力修复闭环占位</h2>
          <p class="panel-subtitle">先跑通 Pipeline，再把复盘结果流入这里。</p>
        </div>
      </div>
      <div class="panel-body placeholder-grid">
        <div class="placeholder-card"><h3>能力缺陷</h3><p>记录被真实面试反复暴露的问题和证据。</p></div>
        <div class="placeholder-card"><h3>训练任务</h3><p>把缺陷变成有产物、有验收标准的练习。</p></div>
        <div class="placeholder-card"><h3>下一轮验证</h3><p>在后续面试中验证缺陷是否真的被修复。</p></div>
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

  renderShell(content);
  attachCommonEvents();
}

loadOpportunities();
