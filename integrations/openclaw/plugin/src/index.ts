import { Type } from "typebox";
import { defineToolPlugin } from "openclaw/plugin-sdk/tool-plugin";

const DEFAULT_BASE_URL = "http://127.0.0.1:4173";
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

const configSchema = Type.Object(
  {
    apiToken: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Adapter bearer token. Configure with ${WAY2AIPM_AGENT_TOOL_TOKEN} substitution.",
      }),
    ),
    baseUrl: Type.Optional(
      Type.String({
        description: "Local way2AIPM service URL. Only loopback HTTP URLs are allowed.",
      }),
    ),
  },
  { additionalProperties: false },
);

const diagnosisProposalSchema = Type.Object(
  {
    summary: Type.Optional(Type.String()),
    failurePoints: Type.Optional(Type.Array(Type.String())),
    weaknessCandidates: Type.Optional(
      Type.Array(
        Type.Object({
          title: Type.String(),
          category: Type.Optional(Type.String()),
          severity: Type.Optional(Type.String()),
          evidence: Type.Optional(Type.String()),
          description: Type.Optional(Type.String()),
        }),
      ),
    ),
    trainingTaskCandidates: Type.Optional(
      Type.Array(
        Type.Object({
          title: Type.String(),
          weaknessCandidateIndex: Type.Optional(Type.Number()),
          taskType: Type.Optional(Type.String()),
          targetAbility: Type.Optional(Type.String()),
          practiceOutput: Type.Optional(Type.String()),
          acceptanceCriteria: Type.Optional(Type.String()),
        }),
      ),
    ),
  },
  { additionalProperties: false },
);

type AdapterConfig = { apiToken?: string; baseUrl?: string };

function localBaseUrl(config: AdapterConfig): URL {
  const value = String(config.baseUrl || DEFAULT_BASE_URL).trim();
  const url = new URL(value);
  if (url.protocol !== "http:" || !LOOPBACK_HOSTS.has(url.hostname) || url.username || url.password) {
    throw new Error("way2AIPM tool plugin permits only loopback HTTP baseUrl values");
  }
  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error("way2AIPM tool plugin baseUrl must not contain a path, query, or hash");
  }
  return url;
}

function toolToken(config: AdapterConfig): string {
  const token = String(config.apiToken || "").trim();
  if (!token) {
    throw new Error("way2AIPM adapter apiToken is required before tools can run");
  }
  return token;
}

async function requestAdapter(
  pathname: string,
  config: AdapterConfig,
  signal?: AbortSignal,
  body?: unknown,
): Promise<unknown> {
  const url = new URL(pathname, localBaseUrl(config));
  const response = await fetch(url, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      authorization: `Bearer ${toolToken(config)}`,
      ...(body === undefined ? {} : { "content-type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });
  const payload = await response.json().catch(() => ({})) as { error?: string };
  if (!response.ok) {
    throw new Error(payload.error || `way2AIPM adapter request failed (${response.status})`);
  }
  return payload;
}

export default defineToolPlugin({
  id: "way2aipm-controlled-tools",
  name: "way2AIPM Controlled Tools",
  description: "Reads review workflow context and submits approval-gated diagnosis proposals.",
  configSchema,
  tools: (tool) => [
    tool({
      name: "way2aipm_review_context",
      label: "way2AIPM Review Context",
      description: "Read one post-interview repair workflow and its review diagnosis context.",
      optional: true,
      parameters: Type.Object({
        workflowRunId: Type.String({ description: "The way2AIPM WorkflowRun id to inspect." }),
      }),
      async execute({ workflowRunId }, config, context) {
        return requestAdapter(
          `/api/agent-tools/workflow-runs/${encodeURIComponent(workflowRunId)}/review-context`,
          config,
          context.signal,
        );
      },
    }),
    tool({
      name: "way2aipm_propose_review_diagnosis",
      label: "way2AIPM Diagnosis Proposal",
      description: "Validate diagnosis candidates for human approval without committing domain records.",
      optional: true,
      parameters: Type.Object({
        workflowRunId: Type.String({ description: "The way2AIPM WorkflowRun id awaiting diagnosis." }),
        proposal: diagnosisProposalSchema,
      }),
      async execute({ workflowRunId, proposal }, config, context) {
        return requestAdapter(
          "/api/agent-tools/review-diagnosis-proposals/validate",
          config,
          context.signal,
          { workflowRunId, proposal },
        );
      },
    }),
  ],
});
