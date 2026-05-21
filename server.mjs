import { createServer } from "node:http";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 4173);
const PUBLIC_DIR = path.join(__dirname, "public");
const CONTENT_DIR = path.join(__dirname, "content");
const OPPORTUNITIES_DIR = path.join(CONTENT_DIR, "opportunities");
const INTERVIEWS_DIR = path.join(CONTENT_DIR, "interviews");

const STAGES = new Set([
  "collected",
  "applied",
  "invited",
  "preparing",
  "interviewed",
  "reviewed",
  "rejected",
  "offer",
  "paused",
]);

const PRIORITIES = new Set(["low", "medium", "high"]);
const RISK_LEVELS = new Set(["unknown", "low", "medium", "high"]);
const ROUND_TYPES = new Set(["first", "second", "third", "hr", "final", "other"]);
const INTERVIEW_STATUSES = new Set(["scheduled", "preparing", "completed", "reviewed", "cancelled"]);
const PREPARATION_STATUSES = new Set(["not_started", "drafting", "ready", "needs_rework"]);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
  });
  res.end(body);
}

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, { "content-type": "text/plain; charset=utf-8" });
  res.end(text);
}

function notFound(res) {
  sendJson(res, 404, { error: "Not found" });
}

function methodNotAllowed(res) {
  sendJson(res, 405, { error: "Method not allowed" });
}

async function ensureContentDirs() {
  await mkdir(OPPORTUNITIES_DIR, { recursive: true });
  await mkdir(INTERVIEWS_DIR, { recursive: true });
}

function slugify(value) {
  const cleaned = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "opportunity";
}

function createOpportunityId(companyName, roleTitle) {
  const seed = slugify(`${companyName}-${roleTitle}`);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `opp_${stamp}_${seed}_${random}`;
}

function createInterviewId(companyName, roundName) {
  const seed = slugify(`${companyName}-${roundName}`);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `int_${stamp}_${seed}_${random}`;
}

function sanitizeId(id, prefix) {
  const value = String(id || "");
  const pattern = new RegExp(`^${prefix}_[a-zA-Z0-9_\\-\\u4e00-\\u9fa5]+$`);
  if (!pattern.test(value)) {
    return null;
  }
  return value;
}

function opportunityPath(id) {
  const safeId = sanitizeId(id, "opp");
  if (!safeId) return null;
  return path.join(OPPORTUNITIES_DIR, `${safeId}.md`);
}

function interviewPath(id) {
  const safeId = sanitizeId(id, "int");
  if (!safeId) return null;
  return path.join(INTERVIEWS_DIR, `${safeId}.md`);
}

function normalizeOpportunity(input, existing = {}) {
  const now = new Date().toISOString();
  const companyName = String(input.companyName ?? existing.companyName ?? "").trim();
  const roleTitle = String(input.roleTitle ?? existing.roleTitle ?? "").trim();

  if (!companyName) {
    throw new Error("companyName is required");
  }
  if (!roleTitle) {
    throw new Error("roleTitle is required");
  }

  const stage = STAGES.has(input.stage) ? input.stage : existing.stage || "collected";
  const priority = PRIORITIES.has(input.priority) ? input.priority : existing.priority || "medium";
  const riskLevel = RISK_LEVELS.has(input.riskLevel)
    ? input.riskLevel
    : existing.riskLevel || "unknown";

  return {
    id: existing.id || input.id || createOpportunityId(companyName, roleTitle),
    type: "opportunity",
    companyName,
    roleTitle,
    jdUrl: String(input.jdUrl ?? existing.jdUrl ?? "").trim(),
    jdText: String(input.jdText ?? existing.jdText ?? ""),
    source: String(input.source ?? existing.source ?? "").trim(),
    stage,
    priority,
    riskLevel,
    nextAction: String(input.nextAction ?? existing.nextAction ?? "").trim(),
    nextActionDueAt: String(input.nextActionDueAt ?? existing.nextActionDueAt ?? "").trim(),
    notes: String(input.notes ?? existing.notes ?? ""),
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function normalizeInterview(input, existing = {}, opportunity) {
  const now = new Date().toISOString();
  const opportunityId = String(
    input.opportunityId ?? existing.opportunityId ?? opportunity?.id ?? "",
  ).trim();
  const companyName = String(
    input.companyName ?? existing.companyName ?? opportunity?.companyName ?? "",
  ).trim();
  const roleTitle = String(input.roleTitle ?? existing.roleTitle ?? opportunity?.roleTitle ?? "").trim();
  const roundName = String(input.roundName ?? existing.roundName ?? "").trim();

  if (!opportunityId) {
    throw new Error("opportunityId is required");
  }
  if (!companyName) {
    throw new Error("companyName is required");
  }
  if (!roleTitle) {
    throw new Error("roleTitle is required");
  }
  if (!roundName) {
    throw new Error("roundName is required");
  }

  const roundType = ROUND_TYPES.has(input.roundType)
    ? input.roundType
    : existing.roundType || "first";
  const status = INTERVIEW_STATUSES.has(input.status)
    ? input.status
    : existing.status || "scheduled";
  const preparationStatus = PREPARATION_STATUSES.has(input.preparationStatus)
    ? input.preparationStatus
    : existing.preparationStatus || "not_started";

  return {
    id: existing.id || input.id || createInterviewId(companyName, roundName),
    type: "interviewRound",
    opportunityId,
    companyName,
    roleTitle,
    roundName,
    roundType,
    scheduledAt: String(input.scheduledAt ?? existing.scheduledAt ?? "").trim(),
    interviewer: String(input.interviewer ?? existing.interviewer ?? "").trim(),
    location: String(input.location ?? existing.location ?? "").trim(),
    status,
    preparationStatus,
    nextAction: String(input.nextAction ?? existing.nextAction ?? "").trim(),
    notes: String(input.notes ?? existing.notes ?? ""),
    createdAt: existing.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

function markdownEscapeTitle(value) {
  return String(value || "").replace(/\r?\n/g, " ").trim();
}

function opportunityToMarkdown(opportunity) {
  const frontMatter = JSON.stringify(opportunity, null, 2);
  const title = markdownEscapeTitle(`${opportunity.companyName} - ${opportunity.roleTitle}`);
  const jdText = opportunity.jdText?.trim() || "";
  const notes = opportunity.notes?.trim() || "";

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## JD 摘要\n\n${jdText}\n\n## 快速笔记\n\n${notes}\n`;
}

function interviewToMarkdown(interview) {
  const frontMatter = JSON.stringify(interview, null, 2);
  const title = markdownEscapeTitle(
    `${interview.companyName} - ${interview.roleTitle} - ${interview.roundName}`,
  );
  const notes = interview.notes?.trim() || "";

  return `---\n${frontMatter}\n---\n\n# ${title}\n\n## 面试备注\n\n${notes}\n`;
}

function parseMarkdown(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    throw new Error("Missing JSON front matter");
  }
  const frontMatter = JSON.parse(match[1]);
  return { frontMatter, body: raw.slice(match[0].length) };
}

async function readOpportunityFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function readInterviewFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const { frontMatter } = parseMarkdown(raw);
  return frontMatter;
}

async function listOpportunities() {
  await ensureContentDirs();
  const entries = await readdir(OPPORTUNITIES_DIR, { withFileTypes: true });
  const opportunities = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readOpportunityFile(path.join(OPPORTUNITIES_DIR, entry.name));
      if (item.type === "opportunity") {
        opportunities.push(item);
      }
    } catch (error) {
      opportunities.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "opportunity",
        companyName: "读取失败",
        roleTitle: entry.name,
        stage: "paused",
        priority: "low",
        riskLevel: "high",
        nextAction: error.message,
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  opportunities.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
  return opportunities;
}

async function listInterviews(filters = {}) {
  await ensureContentDirs();
  const entries = await readdir(INTERVIEWS_DIR, { withFileTypes: true });
  const interviews = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    try {
      const item = await readInterviewFile(path.join(INTERVIEWS_DIR, entry.name));
      if (item.type === "interviewRound") {
        interviews.push(item);
      }
    } catch (error) {
      interviews.push({
        id: entry.name.replace(/\.md$/, ""),
        type: "interviewRound",
        companyName: "读取失败",
        roleTitle: entry.name,
        roundName: "未知轮次",
        roundType: "other",
        status: "cancelled",
        preparationStatus: "needs_rework",
        nextAction: error.message,
        updatedAt: "",
        readError: error.message,
      });
    }
  }

  const filtered = filters.opportunityId
    ? interviews.filter((interview) => interview.opportunityId === filters.opportunityId)
    : interviews;

  filtered.sort((a, b) => {
    const scheduleOrder = String(a.scheduledAt || "").localeCompare(String(b.scheduledAt || ""));
    if (scheduleOrder) return scheduleOrder;
    return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
  });
  return filtered;
}

async function getOpportunity(id) {
  const filePath = opportunityPath(id);
  if (!filePath) return null;

  try {
    return await readOpportunityFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function getInterview(id) {
  const filePath = interviewPath(id);
  if (!filePath) return null;

  try {
    return await readInterviewFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function saveOpportunity(opportunity) {
  await ensureContentDirs();
  const filePath = opportunityPath(opportunity.id);
  if (!filePath) {
    throw new Error("Invalid opportunity id");
  }
  await writeFile(filePath, opportunityToMarkdown(opportunity), "utf8");
  return opportunity;
}

async function saveInterview(interview) {
  await ensureContentDirs();
  const filePath = interviewPath(interview.id);
  if (!filePath) {
    throw new Error("Invalid interview id");
  }
  await writeFile(filePath, interviewToMarkdown(interview), "utf8");
  return interview;
}

async function readRequestBody(req) {
  const chunks = [];
  let total = 0;

  for await (const chunk of req) {
    total += chunk.length;
    if (total > 2_000_000) {
      throw new Error("Request body is too large");
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function handleApi(req, res, url) {
  if (url.pathname === "/api/opportunities") {
    if (req.method === "GET") {
      const opportunities = await listOpportunities();
      return sendJson(res, 200, { opportunities });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const opportunity = normalizeOpportunity(body);
      await saveOpportunity(opportunity);
      return sendJson(res, 201, { opportunity });
    }

    return methodNotAllowed(res);
  }

  const opportunityMatch = url.pathname.match(/^\/api\/opportunities\/([^/]+)$/);
  if (opportunityMatch) {
    const id = decodeURIComponent(opportunityMatch[1]);

    if (req.method === "GET") {
      const opportunity = await getOpportunity(id);
      if (!opportunity) return notFound(res);
      return sendJson(res, 200, { opportunity });
    }

    if (req.method === "PUT") {
      const existing = await getOpportunity(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const opportunity = normalizeOpportunity({ ...body, id }, existing);
      await saveOpportunity(opportunity);
      return sendJson(res, 200, { opportunity });
    }

    return methodNotAllowed(res);
  }

  if (url.pathname === "/api/interviews") {
    if (req.method === "GET") {
      const opportunityId = url.searchParams.get("opportunityId") || "";
      const interviews = await listInterviews({ opportunityId });
      return sendJson(res, 200, { interviews });
    }

    if (req.method === "POST") {
      const body = await readRequestBody(req);
      const opportunity = await getOpportunity(body.opportunityId);
      if (!opportunity) {
        return sendJson(res, 400, { error: "Related opportunity not found" });
      }
      const interview = normalizeInterview(body, {}, opportunity);
      await saveInterview(interview);
      return sendJson(res, 201, { interview });
    }

    return methodNotAllowed(res);
  }

  const interviewMatch = url.pathname.match(/^\/api\/interviews\/([^/]+)$/);
  if (interviewMatch) {
    const id = decodeURIComponent(interviewMatch[1]);

    if (req.method === "GET") {
      const interview = await getInterview(id);
      if (!interview) return notFound(res);
      return sendJson(res, 200, { interview });
    }

    if (req.method === "PUT") {
      const existing = await getInterview(id);
      if (!existing) return notFound(res);
      const body = await readRequestBody(req);
      const opportunity = await getOpportunity(body.opportunityId || existing.opportunityId);
      if (!opportunity) {
        return sendJson(res, 400, { error: "Related opportunity not found" });
      }
      const interview = normalizeInterview({ ...body, id }, existing, opportunity);
      await saveInterview(interview);
      return sendJson(res, 200, { interview });
    }

    return methodNotAllowed(res);
  }

  return notFound(res);
}

function safeStaticPath(urlPathname) {
  const decoded = decodeURIComponent(urlPathname);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const normalized = path.normalize(requested).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, normalized);
  const relative = path.relative(PUBLIC_DIR, filePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }
  return filePath;
}

async function serveStatic(req, res, url) {
  const filePath = safeStaticPath(url.pathname);
  if (!filePath) {
    return sendText(res, 403, "Forbidden");
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) return notFound(res);

    const ext = path.extname(filePath);
    res.writeHead(200, {
      "content-type": MIME_TYPES[ext] || "application/octet-stream",
      "content-length": fileStat.size,
    });
    createReadStream(filePath).pipe(res);
  } catch (error) {
    if (error.code === "ENOENT") return notFound(res);
    throw error;
  }
}

export async function route(req, res) {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (url.pathname.startsWith("/api/")) {
      return await handleApi(req, res, url);
    }

    return await serveStatic(req, res, url);
  } catch (error) {
    const statusCode = error instanceof SyntaxError ? 400 : 500;
    return sendJson(res, statusCode, { error: error.message || "Internal server error" });
  }
}

export async function startServer(port = PORT, host) {
  await ensureContentDirs();
  const server = createServer(route);
  await new Promise((resolve) => {
    server.listen(port, host, resolve);
  });
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = await startServer(PORT);
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : PORT;
  console.log(`way2AIPM OS is running at http://localhost:${port}`);
}
