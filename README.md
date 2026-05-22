# way2AIPM OS

一个面向 AI PM 求职与成长的本地 Markdown 工作台。

## 当前版本：v0.4 Slice 1

当前版本先实现：

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
- 总控台闭环待办与状态联动
- Markdown 文件存储

暂不实现 AI 分析、登录、云同步、公开发布和删除能力。

## 版本状态

- `v0.1`：本地 Markdown 工作台、总控台、求职 Pipeline、岗位详情
- `v0.2`：面试轮次、面试前作战 Brief、面试准备工作流体验补强
- `v0.3`：已覆盖面试后复盘、能力缺陷、训练任务、闭环待办与状态联动
- `v0.4`：进行中，已覆盖项目弹药库基础记录；项目追问与表达训练待补充

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

每个文件使用 JSON front matter 保存结构化字段，正文保留 Markdown 阅读区。

当前版本只提供新增和更新，不提供删除接口。
