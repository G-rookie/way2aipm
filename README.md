# way2AIPM OS

一个面向 AI PM 求职与成长的本地 Markdown 工作台。

## 当前版本：v0.11

当前版本已经覆盖：

- 本地 Node 小服务
- 单页 OS 工作台
- 求职 Pipeline 看板
- 岗位详情表单
- 面试轮次创建与编辑
- 面试前作战 Brief
- 面试后复盘
- 能力缺陷档案
- 训练任务追踪
- 项目弹药库基础记录
- 项目追问与稳定回答记录
- 表达稳定性训练室
- 表达练习记录
- 作品集产品线
- 本地作品集预览
- AI 辅助分析工作台
- AI 前沿思维框架
- 个人节奏运营官
- 总控调度队列
- 全局检索与快速跳转
- 总控台闭环待办与状态联动
- Markdown 文件存储

暂不实现登录、云同步、公开发布、删除能力和外部 AI 自动调用。v0.11 的全局检索基于前端已加载的本地 Markdown 数据，不引入数据库或后端搜索索引。

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

## 启动

```bash
node server.mjs
```

然后访问：

```text
http://localhost:4173
```

如果需要换端口：

```bash
PORT=4300 node server.mjs
```

在 PowerShell 中可以使用：

```powershell
$env:PORT=4300
node server.mjs
```

开发时修改代码后，需要停止当前服务并重新运行：

```powershell
node server.mjs
```

如果端口 `4173` 已经被占用，服务会打印提示并退出，不会自动切换端口。优先停止旧服务后重新启动；如果确实需要临时使用其他端口，可以设置 `PORT`。

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
