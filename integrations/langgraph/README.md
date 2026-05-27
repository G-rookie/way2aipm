# LangGraph 对照验证

本目录包含 `v0.25` 的 Runtime 对照实验、`v0.26` 的受控复盘闭环试点，以及 `v0.27` 的页面 Runtime API 验证。

## 安装

```powershell
npm.cmd install --prefix D:\code\way2aipm\integrations\langgraph
```

## 运行

```powershell
npm.cmd run smoke --prefix D:\code\way2aipm\integrations\langgraph
npm.cmd run smoke:pilot --prefix D:\code\way2aipm\integrations\langgraph
npm.cmd run smoke:runtime-api --prefix D:\code\way2aipm\integrations\langgraph
```

`smoke` 验证审批前的工具隔离与零领域写入；`smoke:pilot` 验证 Responses API 诊断路径、磁盘 checkpoint 恢复以及批准后的幂等写回；`smoke:runtime-api` 验证网页使用的启动、查询、逐条审批、依赖校验和失败重试接口。烟测会创建明确追踪的临时领域记录，并在结束时逐个清理。

## 边界

- `orchestrator` 节点没有注入领域工具。
- `review_specialist` 节点只获得读取复盘上下文和校验诊断候选两个方法。
- `approval_gate` 使用 LangGraph `interrupt` 在人工采纳前暂停。
- v0.25 对照测试使用 `MemorySaver`；v0.26 试点使用本地 JSON checkpoint 验证 runner 重启恢复。
- v0.27 页面只通过服务端 Runtime API 提交显式逐条决定；审批前不会创建缺陷或训练任务。

## 受控试点

启动本地服务后，针对已有流程启动试点：

```powershell
$env:WAY2AIPM_BASE_URL='http://localhost:4173'
$env:WAY2AIPM_LANGGRAPH_CHECKPOINT_PATH='D:\code\way2aipm\runtime\langgraph\checkpoints.json'
node D:\code\way2aipm\integrations\langgraph\review-pilot-runner.mjs start <workflowRunId>
```

审批恢复：

```powershell
node D:\code\way2aipm\integrations\langgraph\review-pilot-runner.mjs resume <workflowRunId> accept_all
node D:\code\way2aipm\integrations\langgraph\review-pilot-runner.mjs resume <workflowRunId> defer
```

`JsonFileCheckpointSaver` 只保存本地运行 checkpoint，适用于单人试点。业务事实仍写入现有 Markdown 目录；并发或公开部署前应切换官方数据库 checkpointer。

v0.27 起，Workflow 页面已经提供上述启动和审批入口；命令行 runner 继续作为排查与回归验证工具保留。
