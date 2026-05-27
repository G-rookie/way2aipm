# way2AIPM OS

一个面向 AI PM 求职与成长的本地 Markdown 工作台。

## 当前版本：v0.27

当前版本已经覆盖：

- 本地 Node 小服务
- 单页 OS 工作台
- 求职 Pipeline 看板
- Pipeline 筛选与快速编辑
- 岗位详情表单
- 面试轮次创建与编辑
- 面试前作战 Brief
- 面试前作战态势
- 面试后复盘
- 面试复盘评审委员会
- 能力缺陷档案
- 能力缺陷画像
- 训练任务追踪
- 训练计划中心视图切换
- 项目弹药库基础记录
- 项目追问与稳定回答记录
- 表达稳定性训练室
- 表达练习记录
- 作品集产品线
- 本地作品集预览
- AI 辅助分析工作台
- AI 结构化候选与人工确认
- AI 面试复盘正式模型调用
- WorkflowRun 修复流程与阶段追踪
- 复盘到诊断、训练、验证的受控闭环
- 流程人工暂停、恢复与完成确认
- AI 前沿思维框架
- 个人节奏运营官
- 总控调度队列
- 后端规则快照
- 今日行动入口
- OS 结构校准
- 全局检索与快速跳转
- 总控台闭环待办与状态联动
- Markdown 文件存储
- OpenClaw 受控 Tool Plugin 与审批底座验证
- 总控/复盘专项 Agent 委派实验与 Runtime 限制结论
- LangGraph 节点工具隔离与审批中断/恢复对照验证
- LangGraph 持久 checkpoint 与受控复盘闭环试点
- Workflow 页面内的 LangGraph Runtime 启动、逐条审批与失败重试

暂不实现登录、云同步、公开发布、删除能力和自动采纳 AI 建议。v0.27 已将 LangGraph 受控复盘闭环接入 Workflow 页面：诊断在候选生成后暂停等待你逐条决定，只有明确采纳项会写入缺陷与训练任务；模型调用临时失败时可以从页面重试。

项目后续路线见 [Roadmap](docs/roadmap.zh.md)。
Agent 与 Workflow 架构见 [Agent + Workflow Architecture](docs/agent-workflow-architecture.zh.md)，Agent Runtime 选型决策见 [Agent Runtime 技术决策](docs/agent-runtime-decision.zh.md)，对照实验见 [v0.23 OpenClaw 验证记录](docs/v0.23-openclaw-validation.zh.md)、[v0.24 OpenClaw Agent 验证记录](docs/v0.24-openclaw-agent-validation.zh.md)、[v0.25 LangGraph 验证记录](docs/v0.25-langgraph-validation.zh.md)、[v0.26 LangGraph 试点验证记录](docs/v0.26-langgraph-pilot-validation.zh.md) 与 [v0.27 Runtime 页面验证记录](docs/v0.27-langgraph-runtime-ui-validation.zh.md)。

## 版本状态

- `v0.1`：本地 Markdown 工作台、总控台、求职 Pipeline、岗位详情
- `v0.2`：面试轮次、面试前作战 Brief、面试准备工作流体验补强
- `v0.3`：面试后复盘、能力缺陷、训练任务、闭环待办与状态联动
- `v0.4`：项目弹药库、项目追问、稳定回答、表达训练、状态联动与面试前候选项目素材
- `v0.5`：作品集资料、作品集项目卡、本地作品集预览与发布准备清单
- `v0.6`：AI 辅助分析、上下文快照、可复制提示词、AI 输出粘贴与人工决策留痕
- `v0.7`：总控调度队列、跨模块待办汇总、优先级提示与模块跳转
- `v0.8`：AI 前沿知识卡、前沿总结、产品启发、面试迁移与作品集迁移
- `v0.9`：个人节奏记录、精力负荷恢复管理、恢复风险进入总控调度
- `v0.10`：表达稳定性训练室、表达练习记录、返工项进入总控调度
- `v0.11`：全局检索、类型筛选、跨模块结果跳转
- `v0.12`：OS 模块编号校准、训练计划中心独立入口、辅助模块不占用主编号
- `v0.13`：训练计划中心视图切换、本周任务、待验收视图、训练闭环摘要
- `v0.14`：面试复盘评审委员会、复盘完整度、回答评级概览、挂点分类建议
- `v0.15`：面试前作战态势、准备完整度、清单进度、JD/项目/问题/风险统计
- `v0.16`：能力缺陷画像、档案完整度、训练闭环统计、表达稳定性与修复建议
- `v0.17`：前端交互体验收口、今日行动入口、首次使用引导、Toast 状态与保存按钮防重复提交
- `v0.18`：Pipeline 筛选、卡片快速编辑、阶段/优先级/风险/下一步动作快速保存
- `v0.19`：后端规则快照、总控调度服务端计算、Markdown 存储适配雏形
- `v0.20`：复盘诊断 schema、结构化 AI 候选解析、缺陷/训练人工采纳流程
- `v0.21`：Responses API 面试复盘诊断、正式模型调用、候选人工确认与调用留痕
- `v0.22`：WorkflowRun、面试后修复闭环、总控流程状态、人工审批边界与流程控制
- `v0.23`：OpenClaw 受控工具插件、Gateway 调用与 Lobster 独立审批验证
- `v0.24`：总控/复盘专项 Agent 委派验证、无业务写入检查与 Runtime 限制结论
- `v0.25`：LangGraph 节点工具隔离、interrupt/resume 审批与 WorkflowRun 线程映射验证
- `v0.26`：LangGraph 磁盘 checkpoint、真实诊断 API 路径与批准后幂等写回试点
- `v0.27`：Workflow 页面 Runtime 入口、候选逐条审批、依赖校验与失败重试

## 启动

```bash
node server.mjs
```

然后访问：

```text
http://localhost:4173
```

如果需要换端口，可在本地 `.env.local` 中增加配置后重启服务：

```dotenv
PORT=4300
```

开发时修改代码后，需要停止当前服务并重新运行：

```powershell
node server.mjs
```

如果端口 `4173` 已经被占用，服务会打印提示并退出，不会自动切换端口。优先停止旧服务后重新启动；如果确实需要临时使用其他端口，可以设置 `PORT`。

## AI 配置

面试复盘诊断的正式 AI 调用只在本地 Node 服务端读取配置。项目根目录提供了 [.env.example](.env.example) 模板，实际配置请放在 `.env.local`；该文件已被 Git 忽略，不会提交到远程仓库。

```dotenv
OPENAI_API_KEY=你的_API_Key
OPENAI_MODEL=你要使用的模型_ID
```

服务执行 `node server.mjs` 时会自动加载 `.env.local`。具体模型由本地配置决定；模型切换只需修改 `OPENAI_MODEL` 并重启服务，不需要每次在 PowerShell 中输入配置。调用前请在页面中检查上下文是否包含不希望发送到模型服务的敏感信息；API Key 不会写入 Markdown 或发送到浏览器。

本地协议调试时可配置可信的 Responses endpoint；该地址会接收你的 API key 与分析上下文，因此只应配置为你信任的服务：

```dotenv
# OPENAI_RESPONSES_URL=http://127.0.0.1:4362/v1/responses
```

## LangGraph Runtime

v0.27 已在 Workflow 页面中提供受控诊断入口。进入一条修复流程后，点击“生成受控诊断”，页面会在候选生成后显示待审批状态；逐条选择采纳或忽略并提交后，才会将采纳项写入 Markdown 业务记录。

运行 checkpoint 默认保存在被 Git 忽略的 `runtime/langgraph/checkpoints.json`。如需为本地环境指定明确文件位置，可在 `.env.local` 设置：

```dotenv
WAY2AIPM_LANGGRAPH_CHECKPOINT_PATH=D:\code\way2aipm\runtime\langgraph\checkpoints.json
```

命令行 runner 仍保留用于回归排查；它不会替代页面审批，也不会让 checkpoint 取代 Markdown 业务记录。

## 数据存储

岗位机会会保存到：

```text
content/opportunities/{id}.md
```

面试轮次会保存到：

```text
content/interviews/{id}.md
```

面试前作战 Brief 会保存到：

```text
content/pre-interview-briefs/{id}.md
```

面试复盘会保存到：

```text
content/interview-reviews/{id}.md
```

能力缺陷会保存到：

```text
content/weaknesses/{id}.md
```

训练任务会保存到：

```text
content/training-tasks/{id}.md
```

项目弹药会保存到：

```text
content/project-ammos/{id}.md
```

项目追问会保存到：

```text
content/follow-up-questions/{id}.md
```

表达训练题会保存到：

```text
content/expression-drills/{id}.md
```

表达练习记录会保存到：

```text
content/expression-sessions/{id}.md
```

作品集资料会保存到：

```text
content/portfolio/profile.md
```

作品集项目卡会保存到：

```text
content/portfolio-projects/{id}.md
```

AI 辅助分析记录会保存到：

```text
content/ai-analysis-notes/{id}.md
```

AI 前沿知识卡会保存到：

```text
content/ai-frontier-cards/{id}.md
```

个人节奏记录会保存到：

```text
content/rhythm-logs/{id}.md
```

每个文件使用 JSON front matter 保存结构化字段，正文保留 Markdown 阅读区。

当前版本只提供新增和更新，不提供删除接口。
