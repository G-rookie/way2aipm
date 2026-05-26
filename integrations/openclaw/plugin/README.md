# way2AIPM Controlled Tools Plugin

This package is the v0.23 OpenClaw tool-plugin experiment. It exposes two optional tools:

- `way2aipm_review_context`: reads a single post-interview repair workflow context.
- `way2aipm_propose_review_diagnosis`: validates proposed candidates and returns an approval-required response.

Neither tool writes Markdown records or advances a `WorkflowRun`. The proposal tool deliberately stops before the existing human confirmation step in the way2AIPM workbench.

## Configuration

The plugin accepts an optional token and local service URL at installation time.
Tool execution fails closed until a token is configured. Put the secret in
the Gateway environment, then reference it through OpenClaw config substitution:

```json
{
  "apiToken": "${WAY2AIPM_AGENT_TOOL_TOKEN}",
  "baseUrl": "http://127.0.0.1:4173"
}
```

Only loopback HTTP URLs are accepted. The resolved bearer token must never be stored in this package or a tracked OpenClaw configuration file.

## Develop And Validate

```powershell
cd integrations/openclaw/plugin
npm.cmd install
npm.cmd run plugin:build
npm.cmd run plugin:validate
```

The generated `dist/` directory is local build output. Install or link the built package into an isolated OpenClaw configuration for validation.

## Runtime Policy

Both tools are optional. An experimental Agent must explicitly enable only these tool names, and the Runtime must not receive shell, general filesystem, arbitrary HTTP, or domain commit-write tools for this workflow.
