# OpenClaw Runtime Validation Adapter

This directory contains the narrow Runtime boundary for the `v0.23` OpenClaw feasibility test. It includes the direct bridge client, an official OpenClaw Tool Plugin package, and a repeatable Gateway smoke test. It does not grant an Agent direct access to `content/`.

## Boundary

The adapter only exposes:

| Capability | HTTP Endpoint | Permission |
| --- | --- | --- |
| Read tool manifest | `GET /api/agent-tools/manifest` | Read |
| Read review workflow context | `GET /api/agent-tools/workflow-runs/{id}/review-context` | Read |
| Validate a diagnosis proposal | `POST /api/agent-tools/review-diagnosis-proposals/validate` | Propose only |

The proposal endpoint validates candidate JSON in memory and returns `approval.status = "required"`. It does not persist an AI note, create a weakness, create a training task, or advance a workflow.

## Local Configuration

Create the private values in the project root `.env.local`:

```dotenv
WAY2AIPM_AGENT_TOOL_TOKEN=replace_with_a_long_random_local_token
# WAY2AIPM_BASE_URL=http://localhost:4173
```

The Node service loads the token automatically. The bridge client loads the same local file and sends it as a bearer token. Do not store this value in tracked configuration or an OpenClaw workspace committed to Git.

## Bridge Check

With the way2AIPM server running:

```powershell
node integrations/openclaw/way2aipm-tool-client.mjs manifest
node integrations/openclaw/way2aipm-tool-client.mjs context <workflowRunId>
node integrations/openclaw/way2aipm-tool-client.mjs propose <workflowRunId> <proposal.json>
```

## OpenClaw Tool Plugin

The package at `integrations/openclaw/plugin/` uses OpenClaw's `defineToolPlugin` contract and exposes only two optional tools:

| Tool | Behavior |
| --- | --- |
| `way2aipm_review_context` | Reads one review workflow context |
| `way2aipm_propose_review_diagnosis` | Returns validated candidates with human approval required |

Both tools must be explicitly allowlisted. Build and validate the package with:

```powershell
cd integrations/openclaw/plugin
npm.cmd install
npm.cmd run plugin:build
npm.cmd run plugin:validate
```

Use an isolated OpenClaw configuration for local verification. Configure the plugin with an environment substitution rather than a literal secret:

```json
{
  "plugins": {
    "entries": {
      "way2aipm-controlled-tools": {
        "enabled": true,
        "config": {
          "apiToken": "${WAY2AIPM_AGENT_TOOL_TOKEN}",
          "baseUrl": "http://127.0.0.1:4173"
        }
      }
    }
  },
  "tools": {
    "alsoAllow": [
      "way2aipm_review_context",
      "way2aipm_propose_review_diagnosis"
    ]
  }
}
```

OpenClaw's install scanner rejects a plugin that reads an environment value directly and sends it over HTTP. For that reason, the plugin consumes validated plugin configuration while the Runtime config performs `${WAY2AIPM_AGENT_TOOL_TOKEN}` substitution.

## Runtime Smoke Test

After installing/linking the plugin into an isolated Runtime config, run:

```powershell
node integrations/openclaw/runtime-smoke-test.mjs
```

The process needs `OPENCLAW_ENTRY`, `OPENCLAW_HOME`, `OPENCLAW_STATE_DIR`, `OPENCLAW_CONFIG_PATH`, `OPENCLAW_GATEWAY_TOKEN`, and `WAY2AIPM_AGENT_TOOL_TOKEN` in its private environment. It starts temporary local services, calls both registered tools through OpenClaw `/tools/invoke`, asserts that the proposal remains approval-gated and causes no domain writes, then deletes only the records it created.

The regular local app defaults to port `4173`. The smoke test defaults to app port `4355` and Gateway port `19123` to avoid an already running workbench, so its isolated plugin config must use `baseUrl: "http://127.0.0.1:4355"` (or a matching `WAY2AIPM_SMOKE_PORT` override).

## Runtime Safety Requirements

- Use isolated `OPENCLAW_HOME`, `OPENCLAW_STATE_DIR`, and `OPENCLAW_CONFIG_PATH` paths for the experiment.
- Expose only the bridge commands or equivalent HTTP calls as tools.
- Enable sandboxing and explicit tool allow/deny controls before using real interview data.
- Do not grant the Runtime arbitrary HTTP, shell, browser automation, or general-purpose file tools while it can access this local service.
- Never grant an Agent direct filesystem write access to the project or `content/`.
- Keep all domain writes and workflow completion inside the existing human-confirmed UI/API path.

## Task Flow Boundary

OpenClaw `2026.5.22` documents Lobster as the optional approval/resume tool, but it is a separately installable `@openclaw/lobster` plugin and is not present in the current isolated validation Runtime. Its documentation also states that nested `openclaw.invoke` calls are not currently reliable from the embedded Lobster runner. Therefore v0.23 validates controlled tool execution and the way2AIPM approval boundary; it does not claim a native Task Flow/Lobster orchestration integration.
