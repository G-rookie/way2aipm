import path from "node:path";
import { fileURLToPath } from "node:url";

import { JsonFileCheckpointSaver } from "./json-file-checkpoint-saver.mjs";
import {
  createApprovalCommitTools,
  createDiagnosisTools,
  createReviewPilotGraph,
  resumeReviewPilot,
  startReviewPilot,
} from "./review-pilot-graph.mjs";

const directory = path.dirname(fileURLToPath(import.meta.url));
const defaultCheckpointPath = path.resolve(directory, "..", "..", "runtime", "langgraph", "checkpoints.json");
const baseUrl = String(process.env.WAY2AIPM_BASE_URL || "http://localhost:4173").replace(/\/+$/, "");
const checkpointPath = String(process.env.WAY2AIPM_LANGGRAPH_CHECKPOINT_PATH || defaultCheckpointPath);

function usage() {
  return "Usage: node integrations/langgraph/review-pilot-runner.mjs <start|resume> <workflowRunId> [accept_all|defer]";
}

function resultSummary(result) {
  const interrupted = Array.isArray(result.__interrupt__) && result.__interrupt__.length > 0;
  return {
    workflowRunId: result.workflowRunId,
    aiAnalysisNoteId: result.aiAnalysisNoteId || "",
    status: interrupted ? "waiting_for_approval" : "completed",
    interrupt: interrupted ? result.__interrupt__[0].value : null,
    decision: result.decision || "",
    committedIds: result.committedIds || { weaknesses: [], tasks: [] },
    trace: result.trace || [],
  };
}

async function main() {
  const [, , command, workflowRunId, action] = process.argv;
  if (!["start", "resume"].includes(command) || !workflowRunId) throw new Error(usage());
  if (command === "resume" && !["accept_all", "defer"].includes(action)) throw new Error(usage());
  const graph = createReviewPilotGraph({
    checkpointer: new JsonFileCheckpointSaver(checkpointPath),
    diagnosisTools: createDiagnosisTools(baseUrl),
    commitTools: createApprovalCommitTools(baseUrl),
  });
  const result = command === "start"
    ? await startReviewPilot(graph, workflowRunId)
    : await resumeReviewPilot(graph, workflowRunId, action);
  process.stdout.write(`${JSON.stringify(resultSummary(result))}\n`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
