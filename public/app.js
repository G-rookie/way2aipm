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

const state = {
  activeModule: "dashboard",
  opportunities: [],
  selectedId: null,
  draft: null,
  loading: true,
  saving: false,
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

async function loadOpportunities() {
  state.loading = true;
  render();
  try {
    const payload = await api("/api/opportunities");
    state.opportunities = payload.opportunities || [];
    if (!state.selectedId && state.opportunities.length) {
      state.selectedId = state.opportunities[0].id;
    }
  } catch (error) {
    showToast(error.message);
  } finally {
    state.loading = false;
    render();
  }
}

function selectedOpportunity() {
  if (state.draft) return state.draft;
  return state.opportunities.find((item) => item.id === state.selectedId) || null;
}

function beginNewOpportunity() {
  state.activeModule = "pipeline";
  state.selectedId = null;
  state.draft = { ...EMPTY_OPPORTUNITY };
  render();
}

function selectOpportunity(id) {
  state.selectedId = id;
  state.draft = null;
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

function renderShell(content) {
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">A</div>
          <div>
            <h1 class="brand-title">way2AIPM OS</h1>
            <p class="brand-subtitle">v0.1 Markdown 工作台</p>
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
  return `
    <section class="grid metrics">
      <div class="metric"><div class="metric-label">全部机会</div><div class="metric-value">${data.total}</div></div>
      <div class="metric"><div class="metric-label">进行中</div><div class="metric-value">${data.active}</div></div>
      <div class="metric"><div class="metric-label">待动作</div><div class="metric-value">${data.pending}</div></div>
      <div class="metric"><div class="metric-label">高风险</div><div class="metric-value">${data.highRisk}</div></div>
    </section>
  `;
}

function renderOpportunityCard(opportunity) {
  const active = state.selectedId === opportunity.id;
  const nextAction = opportunity.nextAction
    ? `<p class="next-action">下一步：${escapeHtml(opportunity.nextAction)}</p>`
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
      </div>
    </section>
  `;
}

function attachCommonEvents() {
  document.querySelector("#new-opp-btn")?.addEventListener("click", beginNewOpportunity);
  document.querySelector("#refresh-btn")?.addEventListener("click", loadOpportunities);
  document.querySelectorAll("[data-select-id]").forEach((button) => {
    button.addEventListener("click", () => selectOpportunity(button.dataset.selectId));
  });
  document.querySelector("#cancel-new-btn")?.addEventListener("click", () => {
    state.draft = null;
    state.selectedId = state.opportunities[0]?.id || null;
    render();
  });
  document.querySelector("#opportunity-form")?.addEventListener("submit", submitOpportunity);
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
    const list = await api("/api/opportunities");
    state.opportunities = list.opportunities || [];
  } catch (error) {
    showToast(error.message);
  } finally {
    state.saving = false;
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

  return `
    ${topbar}
    ${renderMetricGrid()}
    <div class="workspace">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">下一步动作</h2>
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
                : `<div class="empty">暂无待动作事项。</div>`
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

function renderPreInterview() {
  const opportunity = selectedOpportunity();
  return `
    ${renderTopbar("面试前作战室", "v0.1 先预留作战 Brief 结构，后续接入 JD 拆解、题目预测和项目映射。", "02 Pre-Interview Room")}
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">${opportunity ? `${escapeHtml(opportunity.companyName)} · ${escapeHtml(opportunity.roleTitle)}` : "未选择岗位"}</h2>
          <p class="panel-subtitle">当前版本先从求职中台选择岗位，再逐步补齐准备内容。</p>
        </div>
      </div>
      <div class="panel-body placeholder-grid">
        <div class="placeholder-card"><h3>公司与业务背景</h3><p>记录业务模式、产品形态、AI 相关信号和面试切入角度。</p></div>
        <div class="placeholder-card"><h3>JD 拆解</h3><p>拆出显性要求、隐性期待、匹配证据和风险缺口。</p></div>
        <div class="placeholder-card"><h3>高频问题预测</h3><p>围绕岗位职责、项目经历、AI 认知和业务判断准备回答结构。</p></div>
      </div>
    </section>
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
