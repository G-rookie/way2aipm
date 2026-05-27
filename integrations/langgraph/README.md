# LangGraph 对照验证

本目录仅用于 `v0.25` 的 Runtime 对照实验，不替换当前应用工作流。

## 安装

```powershell
npm.cmd install --prefix D:\code\way2aipm\integrations\langgraph
```

## 运行

```powershell
npm.cmd run smoke --prefix D:\code\way2aipm\integrations\langgraph
```

烟测会启动一个临时本地服务，创建一组明确追踪的临时领域记录，并在结束时逐个清理。验证路径只使用受控读取与候选校验 API，不写入 AI 留痕、缺陷或训练任务。

## 边界

- `orchestrator` 节点没有注入领域工具。
- `review_specialist` 节点只获得读取复盘上下文和校验诊断候选两个方法。
- `approval_gate` 使用 LangGraph `interrupt` 在人工采纳前暂停。
- `MemorySaver` 仅适合本地实验；正式恢复路径仍需验证持久化 checkpointer。
