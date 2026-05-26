# OpenClaw Runtime Validation Adapter

This directory contains the narrow local bridge intended for the `v0.23` OpenClaw feasibility test. It is not a full Runtime integration and does not grant an Agent direct access to `content/`.

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

The bridge is designed to be wrapped as OpenClaw plugin tools after the isolated Runtime installation has been validated. Until then it remains a testable API boundary, not a claim that OpenClaw has been connected.

## Runtime Safety Requirements

- Use isolated `OPENCLAW_HOME`, `OPENCLAW_STATE_DIR`, and `OPENCLAW_CONFIG_PATH` paths for the experiment.
- Expose only the bridge commands or equivalent HTTP calls as tools.
- Enable sandboxing and explicit tool allow/deny controls before using real interview data.
- Do not grant the Runtime arbitrary HTTP, shell, browser automation, or general-purpose file tools while it can access this local service.
- Never grant an Agent direct filesystem write access to the project or `content/`.
- Keep all domain writes and workflow completion inside the existing human-confirmed UI/API path.
