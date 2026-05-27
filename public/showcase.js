const showcase = document.querySelector("#showcase");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function tags(items = []) {
  return items.map((item) => `<span class="public-tag">${escapeHtml(item)}</span>`).join("");
}

function projectMarkup(project, index) {
  const facts = [
    ["Challenge", project.problem],
    ["Approach", project.solution],
    ["Outcome", project.impact],
  ].filter(([, value]) => value);

  return `
    <article class="case">
      <div class="case-index">${String(index + 1).padStart(2, "0")}</div>
      <div class="case-body">
        <div class="case-heading">
          <div>
            <p class="overline">${escapeHtml(project.role || project.period || "Case Study")}</p>
            <h2>${escapeHtml(project.displayTitle)}</h2>
          </div>
          <p class="case-period">${escapeHtml(project.period)}</p>
        </div>
        ${project.subtitle ? `<p class="case-subtitle">${escapeHtml(project.subtitle)}</p>` : ""}
        ${project.summary ? `<p class="case-summary">${escapeHtml(project.summary)}</p>` : ""}
        <dl class="case-facts">
          ${facts.map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
        </dl>
        <div class="case-footer">
          ${project.metrics ? `<p class="case-metric">${escapeHtml(project.metrics)}</p>` : ""}
          <div class="tags">${tags(project.skills)}</div>
        </div>
      </div>
    </article>
  `;
}

function renderClosed() {
  document.title = "Portfolio | way2AIPM";
  showcase.innerHTML = `
    <section class="showcase-status">
      <p class="overline">Portfolio</p>
      <h1>Not published yet</h1>
      <p class="status-copy">This portfolio is currently private.</p>
    </section>
  `;
}

function renderPublished(payload) {
  const profile = payload.profile;
  const projectCountLabel = `${payload.stats.publishedProjects} ${
    payload.stats.publishedProjects === 1 ? "project" : "projects"
  }`;
  document.title = `${profile.displayName || "Portfolio"} | way2AIPM`;
  showcase.innerHTML = `
    <section class="public-hero">
      <p class="overline">${escapeHtml(profile.targetRole || "AI Product Manager")}</p>
      <h1>${escapeHtml(profile.displayName || "Portfolio")}</h1>
      <p class="headline">${escapeHtml(profile.headline || profile.targetRole)}</p>
      <p class="summary">${escapeHtml(profile.summary)}</p>
      <div class="hero-meta">
        ${profile.location ? `<span>${escapeHtml(profile.location)}</span>` : ""}
        <div class="tags">${tags(profile.coreSkills)}</div>
      </div>
    </section>
    <section class="projects">
      <div class="section-heading">
        <p class="overline">Selected work</p>
        <h2>Case Studies</h2>
        <span>${projectCountLabel}</span>
      </div>
      ${
        payload.projects.length
          ? payload.projects.map(projectMarkup).join("")
          : `<p class="status-copy">Published case studies are being prepared.</p>`
      }
    </section>
    ${
      profile.contactNote
        ? `<footer class="public-contact"><p class="overline">Contact</p><p>${escapeHtml(profile.contactNote)}</p></footer>`
        : ""
    }
  `;
}

async function loadShowcase() {
  try {
    const response = await fetch("/api/public-portfolio", { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const payload = await response.json();
    if (!payload.published) {
      renderClosed();
      return;
    }
    renderPublished(payload);
  } catch (error) {
    showcase.innerHTML = `
      <section class="showcase-status">
        <p class="overline">Portfolio</p>
        <h1>Unavailable</h1>
        <p class="status-copy">The portfolio could not be loaded.</p>
      </section>
    `;
  }
}

loadShowcase();
