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
}

function slugify(value) {
  const cleaned = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "opportunity";
}

function createId(companyName, roleTitle) {
  const seed = slugify(`${companyName}-${roleTitle}`);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  return `opp_${stamp}_${seed}_${random}`;
}

function sanitizeId(id) {
  const value = String(id || "");
  if (!/^opp_[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/.test(value)) {
    return null;
  }
  return value;
}

function opportunityPath(id) {
  const safeId = sanitizeId(id);
  if (!safeId) return null;
  return path.join(OPPORTUNITIES_DIR, `${safeId}.md`);
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
    id: existing.id || input.id || createId(companyName, roleTitle),
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

async function saveOpportunity(opportunity) {
  await ensureContentDirs();
  const filePath = opportunityPath(opportunity.id);
  if (!filePath) {
    throw new Error("Invalid opportunity id");
  }
  await writeFile(filePath, opportunityToMarkdown(opportunity), "utf8");
  return opportunity;
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
