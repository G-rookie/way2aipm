# way2AIPM OS Agent Runtime 技术决策

## 决策状态

- 状态：`Controlled specialist expansion integrated`，LangGraph 已承载复盘闭环与面试前建议两条受控页面流程。
- 初始日期：`2026-05-26`；更新日期：`2026-05-27`。
- 决策依据：`v0.23-v0.24` OpenClaw 验证、`v0.25-v0.27` LangGraph 复盘路径验证与 `v0.28` Preparation Specialist 验证。
- 影响范围：`v0.29+` Agent Runtime、工具权限、流程执行与未来技术选型。

## 背景

`way2AIPM OS` 的产品结构容易被描述为“总控 Agent 调度多个模块 Agent”，但这里需要区分两类责任：

- Pipeline、复盘、缺陷、训练、节奏等模块首先是业务记录与工作台，不应为了 Agent 化而改造成自主执行者。
- 总控调度、面试前准备、面试后诊断和训练计划等环节，确实可能受益于具备工具调用能力的专项 Agent。

v0.22 已实现 `WorkflowRun` 与面试后修复闭环。它记录真实业务状态、人工审批结果和时间线。后续需要解决的问题不是重新发明领域流程，而是：是否可以使用成熟的开源 Agent Runtime 承担会话、工具调用、子 Agent 委派和可恢复执行。

## 决策

采取以下技术方向：

1. 保留 v0.22 的 `WorkflowRun`、领域数据与人工审批边界，它们属于 `way2AIPM OS` 的产品事实层。
2. `v0.23-v0.24` 已完成 **OpenClaw** 验证：受控工具层可复用，但原生子 Agent 继承父级工具允许边界，不能作为本项目严格角色隔离的正式编排基础。
3. `v0.25` 已完成 **LangGraph** 针对性对照验证：节点依赖注入实现严格工具隔离，`interrupt` / `Command({ resume })` 跑通审批前暂停与恢复，并保持领域记录零写入。
4. `v0.26` 已通过磁盘 checkpoint、新 runner 恢复、现有诊断 API 调用与幂等采纳写回验证；`v0.27` 已将其接入 Workflow 页面，支持逐条审批与失败重试。
5. `v0.28` 在相同边界下加入 `Preparation Specialist`：读取本地岗位与项目素材、提出 Brief 字段建议，人工审批后才更新准备材料。
5. **OpenClaw** 的 Tool Plugin 与 Lobster 结果保留为协议/审批能力参考；**Hermes Agent** 保留为未来个人记忆与工具生态研究对象，不进入当前主线。

## 模块与 Agent 边界

不是每个 OS 模块都应成为独立 Agent。首阶段采用“领域模块 + 少量专项 Agent”的方式：

| 当前模块 | 首阶段角色 | 说明 |
| --- | --- | --- |
| `00_总控调度器` | `Orchestrator Agent` 候选 | 理解当前待办，选择可调用专项能力，不直接写入事实数据 |
| `01_求职项目管理中台` | 领域服务与工作台 | 管理 Pipeline、风险与进度，不单独自主运行 |
| `02_面试前作战室` | 后续 `Preparation Specialist` 候选 | JD 拆解、问题预测与 Brief 建议 |
| `03_面试后复盘室` | 首个 `Review Specialist` 候选 | 复盘诊断与修复建议 |
| `04_项目弹药库` | 领域资产库 | 供专项 Agent 只读检索并提出引用建议 |
| `05_能力缺陷档案` | 领域事实库 | 写入必须经过人工采纳 |
| `06_训练计划中心` | 领域服务，后续专项能力 | 训练任务提案和推进状态 |
| `07_AI前沿思维框架` | 知识资产库 | 后续作为只读上下文 |
| `08_作品集产品线` | 展示与内容资产 | 暂不交给 Agent 自动发布 |
| `09_个人节奏运营官` | 领域记录，后续提醒能力 | 暂不主动干预工作流 |
| `10_表达稳定性训练室` | 领域服务，后续专项能力 | 承接训练结果与验证 |

## 目标架构边界

```mermaid
flowchart LR
  UI["way2AIPM 工作台"] --> DomainAPI["领域 API / Tool Adapter"]
  DomainAPI --> Records["Markdown 业务记录<br/>后续可迁移数据库"]
  DomainAPI --> Runs["WorkflowRun 审计状态"]
  Runtime["Agent Runtime 试点<br/>LangGraph 受控编排"] --> Orchestrator["总控 Agent"]
  Orchestrator --> Specialist["复盘 Specialist Agent"]
  Specialist --> DomainAPI
  Runtime --> RuntimeState["图执行状态 / checkpoint"]
  Specialist --> Proposal["候选建议"]
  Proposal --> Approval["用户审批"]
  Approval --> DomainAPI
```

边界约束：

- `way2AIPM OS` 持有业务实体与 `WorkflowRun` 的最终事实。
- Runtime 可以持有会话、执行过程、子 Agent 任务和检查点，但不是业务真相来源。
- Agent 只能通过受控工具/API 读取记录或提交候选，不能直接拥有 Markdown 目录写权限。
- 创建缺陷、创建训练任务、完成闭环、公开发布或删除数据等动作，必须保留显式人工批准。

## 候选方案判断

### OpenClaw：已验证，不作为正式闭环编排主线

依据官方文档与 v0.23-v0.24 实验，OpenClaw 已提供并证明部分可用：

- 多 Agent routing，可用独立 workspace、session 和工具配置隔离不同 Agent。
- sub-agents，可从当前执行中派发子任务。
- `Task Flow`，用于持久化多步骤流程，并可跟踪状态、修订和重启后的恢复。
- 通过 `Lobster` 执行确定性流程与 approval gates，使流程在关键动作前暂停等待批准。

它与 `post_interview_repair_loop` 的对应关系如下：

| 当前能力 | OpenClaw 验证点 |
| --- | --- |
| 总控调度入口 | 一个 Orchestrator Agent 是否可以选择复盘专项能力 |
| 复盘诊断 | Review Specialist 是否可以调用只读工具并输出结构化候选 |
| `WorkflowRun` 状态 | 本轮未采纳为正式 Task Flow 映射路线 |
| 候选采纳 | approval gate 是否能停在人工确认前 |
| 恢复执行 | 服务重启或等待后是否能继续同一流程 |

关键结论：

- 受控 Tool Plugin 能读取上下文和校验候选，并证明审批前不写入领域记录。
- Lobster 独立审批暂停/恢复可运行，但尚未成为领域闭环编排。
- 原生子 Agent 继承父 Agent 工具允许边界；若总控不拥有复盘工具，专项 Agent 也无法获得它，因此严格角色隔离不满足。
- `sessions_yield` 实验出现父 session 写锁竞争，不宜继续将该路径作为当前正式编排基础。

### Hermes Agent：候选保留

依据官方仓库与架构文档，Hermes Agent 提供工具调用、Toolsets、`delegate_task` 子 Agent 委派、SQLite 会话/记忆、MCP 与插件扩展等能力。它适合进一步探索：

- 跨会话的个人成长记忆。
- Skills/工具生态对个人 Agent 的支持。
- 主 Agent 向专项任务委派的体验。

当前不将其设为主线集成对象，原因是本阶段核心验证目标是现有 `WorkflowRun` 的严格工具隔离、审批闭环与可恢复流程，而 LangGraph 已对这些关键边界给出更直接的通过结果。

### LangGraph：受控复盘闭环试点方向

v0.25 使用 `@langchain/langgraph@1.3.2` 复用相同复盘候选流程，已验证：

- `orchestrator` 节点不取得领域 adapter，`review_specialist` 节点仅取得读取/提案校验能力。
- `interrupt()` 在人工审批前暂停，`Command({ resume })` 以同一 `WorkflowRun.id` 线程恢复。
- 恢复选择 defer 后，`WorkflowRun` 保持 `diagnosis_pending`，AI note、缺陷和训练任务均无新增。

v0.26 在该基础上以现有 `run-ai` 和 `candidate-actions` API 跑通命令行试点：审批中断可由新 runner 从磁盘 checkpoint 恢复，明确批准后只写入一份缺陷和训练任务，重复恢复不重复创建记录。

v0.27 在 Workflow 页面提供启动和审批入口，并通过服务端 Runtime API 验证逐条决策、关联缺陷依赖校验、失败重试及已完成运行幂等读取。

v0.28 将相同模式应用到面试前准备：独立 `preparation:{interviewRoundId}` 线程输出八项 Brief 建议，逐项采纳后才创建或更新 Markdown Brief，并保留已有内容。

该结果说明专项 Agent 可在严格写回边界下扩展，但不等同于生产发布。并发/部署级 checkpointer、真实模型质量和公开场景下的脱敏策略仍需继续验证。

## 验证结果与试点范围

已完成：

- 建立 OpenClaw 的本地运行方式与安全配置结论。
- 建立一个总控 Agent 和一个面试后复盘专项 Agent 的最小实验。
- 暴露只读工具或模拟 Tool Adapter：读取复盘与当前 `WorkflowRun`。
- 输出缺陷/训练候选提案，但不允许 Runtime 直接写入 Markdown。
- 通过 LangGraph 将一条 `post_interview_repair_loop` 候选路径与 `WorkflowRun.id` 线程对应，验证审批 interrupt/resume 和零业务写入。
- 通过 LangGraph 试点 runner 调用现有正式诊断 API 路径，验证磁盘 checkpoint 恢复和批准后幂等写回。
- 通过 Workflow 页面所依赖的 Runtime API 验证启动、状态查询、逐条审批、失败重试和幂等结果。
- 通过面试前页面 Runtime API 验证建议生成、字段级审批、既有 Brief 保留与失败重试。

试点阶段仍不做：

- 不替换 v0.22 Workflow 领域实现或现有手动 AI 分析入口。
- 不将全部业务模块 Agent 化。
- 不允许 Runtime 自动创建或修改真实业务记录。
- 不将 OpenClaw、Hermes 与 LangGraph 三条 Runtime 路线并行产品化。

## 通过标准

只有继续满足以下标准，才在后续版本将 LangGraph 从试点推进为正式 Runtime：

- 页面可发起和查看持久运行，并能在服务/runner 重启后继续同一条审批中断流程。
- 节点只能访问明确注入的读取/提案工具，不能越过审批修改业务记录。
- 可将一次复盘闭环与唯一 `WorkflowRun` 幂等关联。
- 真实模型调用失败、重复恢复或人工采纳重试不会重复创建领域记录。
- 开发复杂度与本地使用体验可接受。

若无法满足，继续保留现有人工审批流程作为正式路径，不强行扩大 Agent 自动化范围。

## 影响

正面影响：

- 避免在业务闭环尚未充分使用前自行维护通用 Agent 基础设施。
- v0.22 已完成的状态模型仍然有效，不会因运行时替换而返工。
- 后续 Agent 能力由真实验证数据驱动，而不是先决定框架再适配产品。

成本与风险：

- v0.23-v0.26 为验证与命令行试点版本；v0.27 页面入口仍面向本地单用户使用，不是部署级 Runtime。
- 需要处理 Runtime 与本系统之间的双状态关联。
- 外部 Runtime 的安装、安全配置和 Windows 使用体验需要实测确认。

## 官方参考

- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [OpenClaw Multi-Agent Routing](https://docs.openclaw.ai/concepts/multi-agent)
- [OpenClaw Sub-Agents](https://docs.openclaw.ai/tools/subagents)
- [OpenClaw Task Flow](https://docs.openclaw.ai/automation/taskflow)
- [Hermes Agent GitHub](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent Architecture](https://hermes-agent.nousresearch.com/docs/developer-guide/architecture)
- [Hermes Agent Tools and Toolsets](https://hermes-agent.nousresearch.com/docs/user-guide/features/tools)
- [LangGraph Workflows and Agents](https://docs.langchain.com/oss/javascript/langgraph/workflows-agents)
- [LangGraph Interrupts](https://docs.langchain.com/oss/javascript/langgraph/interrupts)
- [LangGraph Persistence](https://docs.langchain.com/oss/javascript/langgraph/persistence)
