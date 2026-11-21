/* Inline SVG icons (16x16, currentColor) used by the sidebar. */
const icons = {
  location:
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0a5.5 5.5 0 0 0-5.5 5.5C2.5 9.6 8 16 8 16s5.5-6.4 5.5-10.5A5.5 5.5 0 0 0 8 0zm0 8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>',
  institution:
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0 .5 3.5V5h15V3.5L8 0zM1.5 6v6h2V6h-2zm4 0v6h2V6h-2zm3 0v6h2V6h-2zm4 0v6h2V6h-2zM.5 13v1.5h15V13H.5zM0 15.5V16h16v-.5H0z"/></svg>',
  email:
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.217L8 8.917.001 4.217V4zm0 1.383v6.617a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.383L8.4 9.8a1 1 0 0 1-1.2 0L0 5.383z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175A1.16 1.16 0 0 1 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zM3.743 5.18c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.358.54-1.358 1.248 0 .694.52 1.248 1.327 1.248h.015zm3.758 8.214h2.4V9.359c0-.216.016-.432.08-.586.174-.432.57-.88 1.234-.88.87 0 1.219.664 1.219 1.635v3.866h2.4V9.25c0-2.22-1.184-3.252-2.764-3.252-1.275 0-1.845.709-2.16 1.2h.015v-1.03h-2.4c.032.663 0 7.225 0 7.225z"/></svg>',
  github:
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8a8.01 8.01 0 0 0 5.47 7.59c.4.08.55-.17.55-.38 0-.2-.01-.83-.01-1.5-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.47 7.47 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
  scholar:
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1 0 5l8 4 6.5-3.25V11h1V5L8 1zm-4 8.4V12c0 1.1 1.8 2 4 2s4-.9 4-2V9.4L8 11 4 9.4z"/></svg>',
  cv: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9.293 0H3.5A1.5 1.5 0 0 0 2 1.5v13A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5V4.707L9.293 0zM9.5 1.5l3 3h-2a1 1 0 0 1-1-1v-2zM4.75 7h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5zm0 3h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5z"/></svg>',
  orcid:
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM5.94 3.5a.94.94 0 1 1 0 1.88.94.94 0 0 1 0-1.88zM4.9 6h2.05v5.25H4.9V6zm3.1 0h2.3c2 0 3.2 1.05 3.2 2.62 0 1.6-1.2 2.63-3.2 2.63H8V6zm2.15 4.05c1.05 0 1.7-.5 1.7-1.43 0-.92-.65-1.42-1.7-1.42H9.5v2.85h.65z"/></svg>',
  twitter:
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9.2 6.8 14.2 1h-1.2L8.7 6 5.3 1H1.2l5.3 7.7L1.2 15h1.2l4.7-5.5 3.8 5.5H15L9.2 6.8zM7.7 8.5l-.5-.7L3.6 2.6h1.9L8.3 6.6l.5.7 3.8 5.3h-1.9L7.7 8.5z"/></svg>',
  link: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 3a.5.5 0 0 1 .5.5v2h6.793L9.146 2.854a.5.5 0 1 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 1 1-.708-.708L11.793 6.5H5v2a.5.5 0 0 1-1 0v-5A.5.5 0 0 1 4.5 3z"/></svg>',
};
const dataFile = "assets/data/site-content.json";
const themeStorageKey = "site-theme";

/* ---------------- theme ---------------- */

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-toggle-icon");
  if (!toggle || !icon) {
    return;
  }

  const next = theme === "dark" ? "light" : "dark";
  icon.textContent = theme === "dark" ? "☀" : "☾";
  toggle.setAttribute("aria-label", `Switch to ${next} mode`);
  toggle.setAttribute("title", `Switch to ${next} mode`);
}

function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(themeStorageKey);
  } catch {
    saved = null;
  }
  applyTheme(saved === "light" || saved === "dark" ? saved : getSystemTheme());

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {
      /* private mode: the choice just won't persist */
    }
    applyTheme(next);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    let saved = null;
    try {
      saved = localStorage.getItem(themeStorageKey);
    } catch {
      saved = null;
    }
    if (!saved) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
}

/* ---------------- helpers ---------------- */

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeUrl(value) {
  const url = String(value ?? "").trim();
  return /^(https?:|mailto:|tel:|#|\/|[\w.-]+\.html)/i.test(url) ? url : "";
}

function externalLink(url, label) {
  const href = safeUrl(url);
  if (!href) {
    return "";
  }
  const isExternal = /^https?:/i.test(href);
  const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a href="${escapeHtml(href)}"${target}>${escapeHtml(label)}</a>`;
}

function hasItems(value) {
  return Array.isArray(value) && value.length > 0;
}

/* Section heading with an optional emoji, matching the reference layout. */
function sectionTitle(section = {}, fallback) {
  const emoji = section.emoji ? `<span class="emoji" aria-hidden="true">${escapeHtml(section.emoji)}</span>` : "";
  return `<h2 class="section-title">${emoji}${escapeHtml(section.title || fallback)}</h2>`;
}

/* `html` fields are trusted author content from the JSON file; plain fields are escaped. */
function paragraphs(list = []) {
  return list
    .filter((text) => typeof text === "string" && text.trim())
    .map((text) => `<p>${text}</p>`)
    .join("");
}

/* ---------------- sidebar ---------------- */

function renderSidebar(profile = {}, contact = {}) {
  const rows = [];

  if (profile.location) {
    rows.push(`<li>${icons.location}<span>${escapeHtml(profile.location)}</span></li>`);
  }
  if (profile.institution) {
    const label = profile.institutionUrl
      ? externalLink(profile.institutionUrl, profile.institution)
      : `<span>${escapeHtml(profile.institution)}</span>`;
    rows.push(`<li>${icons.institution}${label}</li>`);
  }

  const linkRows = [
    ["email", contact.email ? `mailto:${contact.email}` : "", "Email"],
    ["scholar", contact.googleScholar, "Google Scholar"],
    ["github", contact.githubUrl, "GitHub"],
    ["linkedin", contact.linkedinUrl, "LinkedIn"],
    ["orcid", contact.orcid, "ORCID"],
    ["twitter", contact.twitterUrl, "X / Twitter"],
    ["cv", contact.cv, "CV"],
  ];
  linkRows.forEach(([icon, url, label]) => {
    const link = externalLink(url, label);
    if (link) {
      rows.push(`<li>${icons[icon]}${link}</li>`);
    }
  });

  return `
    <img class="avatar" src="${escapeHtml(profile.avatar || "")}" alt="${escapeHtml(profile.avatarAlt || profile.name || "")}" />
    <h1 class="author-name">${escapeHtml(profile.name || "")}</h1>
    ${profile.bio ? `<p class="author-bio">${escapeHtml(profile.bio)}</p>` : ""}
    <ul class="author-links">${rows.join("")}</ul>
  `;
}

/* ---------------- sections ---------------- */

function renderAbout(about = {}) {
  return `
    <section id="about">
      <h2 class="page-title">${escapeHtml(about.title || "")}</h2>
      <div class="prose">${paragraphs(about.paragraphsHtml)}</div>
    </section>
  `;
}

function renderNews(news = {}) {
  if (!hasItems(news.items)) {
    return "";
  }

  const items = news.items
    .map((item) => {
      const links = (item.links || []).map((link) => externalLink(link.url, link.label)).filter(Boolean);
      return `
        <li>
          <span class="news-date">${escapeHtml(item.date || "")}</span>
          <span>${escapeHtml(item.text || "")}${links.length ? ` ${links.join(" · ")}` : ""}</span>
        </li>
      `;
    })
    .join("");

  return `
    <section id="news">
      ${sectionTitle(news, "News")}
      <ul class="news-list">${items}</ul>
    </section>
  `;
}

function renderResearch(research = {}) {
  if (!hasItems(research.paragraphsHtml)) {
    return "";
  }
  return `
    <section id="research">
      ${sectionTitle(research, "Research")}
      <div class="prose">${paragraphs(research.paragraphsHtml)}</div>
    </section>
  `;
}

/* Bold the site owner's name wherever it appears in an author list. */
function renderAuthors(authors, meName) {
  const escaped = escapeHtml(authors || "");
  if (!meName) {
    return escaped;
  }
  const me = escapeHtml(meName);
  return escaped.split(me).join(`<span class="me">${me}</span>`);
}

function paperHeading(paper) {
  const links = (paper.links || [])
    .map((link) => externalLink(link.url, `[${link.label}]`))
    .filter(Boolean)
    .join("");
  return `
    <h3 class="paper-title">
      ${escapeHtml(paper.title || "")}${links ? ` <span class="paper-links">${links}</span>` : ""}
    </h3>
  `;
}

function paperVenue(paper) {
  const venue = [paper.venue, paper.year].filter(Boolean).join(" ");
  return venue ? `<p class="paper-venue">${escapeHtml(venue)}</p>` : "";
}

function renderPaperCard(paper, meName) {
  const badge = paper.badge ? `<span class="badge">${escapeHtml(paper.badge)}</span>` : "";
  const figure = paper.image
    ? `<figure class="paper-figure">
         ${badge}
         <img src="${escapeHtml(paper.image)}" alt="${escapeHtml(paper.imageAlt || paper.title || "")}" loading="lazy" />
       </figure>`
    : "";

  return `
    <article class="paper-card">
      ${figure}
      <div>
        ${paperHeading(paper)}
        <p class="paper-authors">${renderAuthors(paper.authors, meName)}</p>
        ${paperVenue(paper)}
        ${paper.summary ? `<p class="paper-summary">${escapeHtml(paper.summary)}</p>` : ""}
      </div>
    </article>
  `;
}

function renderPaperListItem(paper, meName) {
  return `
    <li>
      ${paperHeading(paper)}
      <p class="paper-authors">${renderAuthors(paper.authors, meName)}</p>
      ${paperVenue(paper)}
    </li>
  `;
}

/* Selected papers render as image cards; everything else is listed once,
   under its category (conference papers, journal papers, preprints, ...). */
function renderPublications(publications = {}, meName = "") {
  const items = publications.items || [];
  if (!items.length) {
    return "";
  }

  const parts = [];
  const selected = items.filter((paper) => paper.selected);
  if (selected.length) {
    parts.push(`
      <section id="publications">
        ${sectionTitle(publications.selectedHeading, "Selected Publications")}
        ${selected.map((paper) => renderPaperCard(paper, meName)).join("")}
      </section>
    `);
  }

  (publications.groups || []).forEach((group, index) => {
    const papers = items.filter((paper) => !paper.selected && paper.category === group.key);
    if (!papers.length) {
      return;
    }
    // The first visible publication block carries the nav anchor.
    const id = !selected.length && index === 0 ? ' id="publications"' : "";
    parts.push(`
      <section${id}>
        ${sectionTitle(group, group.key)}
        <ul class="paper-list">${papers.map((paper) => renderPaperListItem(paper, meName)).join("")}</ul>
      </section>
    `);
  });

  return parts.join("");
}

function renderTimeline(block = {}, id, fallback) {
  if (!hasItems(block.items)) {
    return "";
  }

  const items = block.items
    .map((item) => {
      const place = item.url ? externalLink(item.url, item.place) : escapeHtml(item.place || "");
      const details = (item.details || []).map((line) => `<p class="detail">${escapeHtml(line)}</p>`).join("");
      return `
        <li>
          <span class="when">${escapeHtml(item.when || "")}</span>
          <div>
            <p class="where">${place}</p>
            ${details}
          </div>
        </li>
      `;
    })
    .join("");

  return `
    <section id="${id}">
      ${sectionTitle(block, fallback)}
      <ul class="timeline">${items}</ul>
    </section>
  `;
}

function renderContact(contactSection = {}) {
  if (!hasItems(contactSection.paragraphsHtml)) {
    return "";
  }
  return `
    <section id="contact">
      ${sectionTitle(contactSection, "Contact")}
      <div class="prose">${paragraphs(contactSection.paragraphsHtml)}</div>
    </section>
  `;
}

/* ---------------- page assembly ---------------- */

function applySiteMeta(site = {}) {
  if (site.title) {
    document.title = site.title;
  }

  const owner = document.getElementById("footer-owner");
  if (owner && site.footerName) {
    owner.textContent = site.footerName;
  }

  const updated = document.getElementById("footer-last-updated");
  const value = typeof site.lastUpdated === "string" ? site.lastUpdated.trim() : "";
  if (updated && value) {
    const date = new Date(value);
    const label = Number.isNaN(date.getTime())
      ? value
      : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
    updated.textContent = `Last updated ${label}.`;
    updated.hidden = false;
  }
}

/* Hide nav links whose section is empty and therefore not rendered. */
function pruneNav() {
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
    const target = document.getElementById(link.getAttribute("href").slice(1));
    link.hidden = !target;
  });
}

function initSectionSpy() {
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]')).filter((link) => !link.hidden);
  const sections = links
    .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
    .filter(Boolean);
  if (!sections.length) {
    return;
  }

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const update = () => {
    const header = document.querySelector(".site-header");
    const marker = (header ? header.getBoundingClientRect().height : 0) + 40;
    let active = sections[0].id;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) {
        active = section.id;
      }
    });
    // Scrolled to the very bottom, the last section is the one being read. Only
    // when the page actually scrolls; otherwise this would fire at the top.
    const scrollable = document.documentElement.scrollHeight - window.innerHeight > 2;
    if (scrollable && window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      active = sections[sections.length - 1].id;
    }
    setActive(active);
  };

  let queued = false;
  const onScroll = () => {
    if (queued) {
      return;
    }
    queued = true;
    window.requestAnimationFrame(() => {
      update();
      queued = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

async function loadPage() {
  const content = document.getElementById("profile-content");
  const sidebar = document.getElementById("sidebar");
  if (!content || !sidebar) {
    return;
  }

  let data;
  try {
    const response = await fetch(`${dataFile}?v=${Date.now()}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    data = await response.json();
  } catch (error) {
    content.innerHTML = `<p>Could not load the page content (${escapeHtml(error.message)}). Please refresh.</p>`;
    return;
  }

  applySiteMeta(data.site);
  const meName = data.site?.authorName || data.profile?.name || "";

  sidebar.innerHTML = renderSidebar(data.profile, data.contact);
  content.innerHTML = [
    renderAbout(data.about),
    renderResearch(data.research),
    renderNews(data.news),
    renderPublications(data.publications, meName),
    renderTimeline(data.education, "education", "Education"),
    renderTimeline(data.experience, "experience", "Experience"),
    renderContact(data.contactSection),
  ].join("");

  pruneNav();
  initSectionSpy();

  // The browser tried to jump to #hash before the sections existed.
  if (window.location.hash) {
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }
}

document.getElementById("year").textContent = String(new Date().getFullYear());
initTheme();
loadPage();
