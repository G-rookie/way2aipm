import assert from "node:assert/strict";
import { readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { startServer } from "../server.mjs";

const directory = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(directory, "..");
const profilePath = path.join(workspace, "content", "portfolio", "profile.md");
const appPort = Number(process.env.WAY2AIPM_PUBLIC_PORTFOLIO_API_PORT || 4371);
let createdProjectFile = null;
let originalProfile = null;
let originalProfileExists = false;

async function readExistingProfile() {
  try {
    originalProfile = await readFile(profilePath, "utf8");
    originalProfileExists = true;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function restoreProfile() {
  if (originalProfileExists) {
    await writeFile(profilePath, originalProfile, "utf8");
    return;
  }
  try {
    await unlink(profilePath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function removeCreatedProject() {
  if (!createdProjectFile) return;
  try {
    await unlink(createdProjectFile);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  return { response, payload };
}

async function saveJson(url, method, payload) {
  const result = await requestJson(url, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  assert.ok(result.response.ok, `${method} ${url} failed: ${result.response.status}`);
  return result.payload;
}

async function createProject(baseUrl, payload) {
  const result = await saveJson(`${baseUrl}/api/portfolio-projects`, "POST", payload);
  const filePath = path.join(workspace, "content", "portfolio-projects", `${result.portfolioProject.id}.md`);
  createdProjectFile = filePath;
  return result.portfolioProject;
}

function close(server) {
  return new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

await readExistingProfile();
const appServer = await startServer(appPort, "127.0.0.1");
const baseUrl = `http://127.0.0.1:${appPort}`;

try {
  await saveJson(`${baseUrl}/api/portfolio-profile`, "PUT", {
    displayName: "Private Candidate",
    summary: "SECRET_PROFILE_TEXT",
    coreSkills: "AI Product, Research",
    contactNote: "secret@example.invalid",
    portfolioStatus: "draft",
  });

  const readyPublic = await createProject(baseUrl, {
    projectName: "INTERNAL_PROJECT_NAME",
    displayTitle: "Published Case",
    subtitle: "Public subtitle",
    summary: "Public summary",
    role: "Product Manager",
    period: "2025",
    problem: "Public challenge",
    solution: "Public approach",
    impact: "Public outcome",
    metrics: "Conversion +12%",
    skills: "Discovery, Experiment",
    evidence: "SECRET_EVIDENCE_TEXT",
    privacyNote: "SECRET_PRIVACY_NOTE",
    visibility: "portfolio",
    readiness: "ready",
    sortOrder: 10,
  });

  const privatePayload = (await requestJson(`${baseUrl}/api/public-portfolio`)).payload;
  assert.equal(privatePayload.contractVersion, "public_portfolio_v1");
  assert.equal(privatePayload.published, false);
  assert.equal(privatePayload.profile, null);
  assert.deepEqual(privatePayload.projects, []);
  assert.doesNotMatch(JSON.stringify(privatePayload), /SECRET_PROFILE_TEXT|Published Case/);

  await saveJson(`${baseUrl}/api/portfolio-profile`, "PUT", {
    displayName: "Public Candidate",
    headline: "AI Product Manager",
    targetRole: "AI 产品经理",
    location: "Shanghai",
    summary: "Public profile summary",
    coreSkills: "AI Product, Research",
    contactNote: "Public contact note",
    portfolioStatus: "published_ready",
  });

  const published = (await requestJson(`${baseUrl}/api/public-portfolio`)).payload;
  assert.equal(published.published, true);
  assert.equal(published.profile.displayName, "Public Candidate");
  assert.deepEqual(published.profile.coreSkills, ["AI Product", "Research"]);
  assert.equal(published.projects.length, 1);
  assert.equal(published.projects[0].displayTitle, readyPublic.displayTitle);
  assert.deepEqual(published.projects[0].skills, ["Discovery", "Experiment"]);
  assert.equal(published.stats.publishedProjects, 1);
  assert.deepEqual(Object.keys(published.projects[0]).sort(), [
    "displayTitle",
    "impact",
    "metrics",
    "period",
    "problem",
    "role",
    "skills",
    "solution",
    "subtitle",
    "summary",
  ]);
  assert.doesNotMatch(
    JSON.stringify(published),
    /INTERNAL_PROJECT_NAME|SECRET_EVIDENCE_TEXT|SECRET_PRIVACY_NOTE|projectAmmoId|privacyNote|readiness|visibility/,
  );

  await saveJson(`${baseUrl}/api/portfolio-projects/${readyPublic.id}`, "PUT", {
    ...readyPublic,
    readiness: "needs_sanitizing",
  });
  assert.deepEqual((await requestJson(`${baseUrl}/api/public-portfolio`)).payload.projects, []);

  await saveJson(`${baseUrl}/api/portfolio-projects/${readyPublic.id}`, "PUT", {
    ...readyPublic,
    visibility: "private",
  });
  assert.deepEqual((await requestJson(`${baseUrl}/api/public-portfolio`)).payload.projects, []);

  const postPublic = await requestJson(`${baseUrl}/api/public-portfolio`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}",
  });
  assert.equal(postPublic.response.status, 405);

  const showcasePage = await fetch(`${baseUrl}/showcase.html`);
  assert.equal(showcasePage.status, 200);
  assert.match(await showcasePage.text(), /showcase\.js/);

  console.log(JSON.stringify({
    contract: "public_portfolio_v1",
    profilePublicationGate: true,
    projectPublicationGate: true,
    publicFieldAllowlist: true,
    internalFieldsExcluded: true,
    publicEndpointReadOnly: true,
    showcaseSurface: true,
    publishedProjects: published.stats.publishedProjects,
  }));
} finally {
  await close(appServer);
  await removeCreatedProject();
  await restoreProfile();
}
