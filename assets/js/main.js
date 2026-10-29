const sectionFilesByPage = {
  home: [
    "sections/01-hero.html",
    "sections/05-highlights.html",
    "sections/04-publications.html",
    "sections/06-contact.html",
  ],
  rejections: ["sections/03-rejections.html"],
};

const dataFile = "assets/data/site-content.json";

const assetVersion = window.__ASSET_VERSION__ || Date.now().toString();

const themeStorageKey = "site-theme";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeToggle(theme) {
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-toggle-icon");

  if (!toggle || !icon) {
    return;
  }

  if (theme === "dark") {
    icon.textContent = "☀";
    toggle.setAttribute("aria-label", "Switch to light mode");
    toggle.setAttribute("title", "Switch to light mode");
  } else {
    icon.textContent = "☾";
    toggle.setAttribute("aria-label", "Switch to dark mode");
    toggle.setAttribute("title", "Switch to dark mode");
  }
}

function setDynamicFavicon(theme) {
  const bg = theme === "dark" ? "#1c1c1d" : "#ffffff";
  const fg = theme === "dark" ? "#2698ba" : "#b509ac";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="VK favicon">
      <rect width="64" height="64" rx="10" fill="${bg}"/>
      <rect x="2" y="2" width="60" height="60" rx="9" fill="none" stroke="${fg}" stroke-width="3"/>
      <path d="M14 18h8l10 22 10-22h8L36 50h-8z" fill="${fg}"/>
    </svg>
  `;
  const url = `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;

  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement("link");
    favicon.setAttribute("rel", "icon");
    document.head.appendChild(favicon);
  }

  favicon.setAttribute("type", "image/svg+xml");
  favicon.setAttribute("href", url);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeToggle(theme);
  setDynamicFavicon(theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : getSystemTheme();

  applyTheme(initialTheme);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = current === "dark" ? "light" : "dark";
      localStorage.setItem(themeStorageKey, nextTheme);
      applyTheme(nextTheme);
    });
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", (event) => {
    if (!localStorage.getItem(themeStorageKey)) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
}

function initProgressBar() {
  const bar = document.getElementById("progress");
  if (!bar) {
    return;
  }

  const render = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
    bar.style.width = `${(ratio * 100).toFixed(2)}%`;
  };

  render();
  window.addEventListener("scroll", render, { passive: true });
  window.addEventListener("resize", render);
}

async function loadSections() {
  const root = document.getElementById("profile-content");

  if (!root) {
    return;
  }

  const page = document.body?.dataset?.page || "home";

  const loadedFromData = await loadFromDataFile(root, page);
  if (loadedFromData) {
    initSectionSpy();
    initPanelReveal();
    return;
  }

  const fallbackFiles = sectionFilesByPage[page] || sectionFilesByPage.home;
  for (const path of fallbackFiles) {
    try {
      const res = await fetch(`${path}?v=${assetVersion}`);
      if (!res.ok) {
        throw new Error(`Failed to load ${path}`);
      }
      const html = await res.text();
      root.insertAdjacentHTML("beforeend", html);
    } catch (error) {
      root.insertAdjacentHTML(
        "beforeend",
        `<section class="panel"><h2 class="section-title">Section Load Error</h2><p>${String(error)}</p></section>`,
      );
    }
  }

  initSectionSpy();
  initPanelReveal();
}

function initPanelReveal() {
  const panels = Array.from(document.querySelectorAll(".panel"));
  if (!panels.length) {
    return;
  }

  panels.forEach((panel, index) => {
    panel.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.05,
    },
  );

  panels.forEach((panel) => observer.observe(panel));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeUrl(value) {
  const url = String(value ?? "").trim();
  if (!url) {
    return "#";
  }

  if (/^(https?:|mailto:|tel:|#|\/)/i.test(url)) {
    return url;
  }

  return "#";
}

function externalLink(url, label, className = "") {
  const classAttr = className ? ` class="${className}"` : "";
  return `<a${classAttr} href="${escapeHtml(safeUrl(url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
}

/* ---------------- shared icon set ---------------- */

const socialIcons = {
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

const iconKeyByLabel = {
  Email: "email",
  LinkedIn: "linkedin",
  GitHub: "github",
  "Google Scholar": "scholar",
  CV: "cv",
  ORCID: "orcid",
  "X/Twitter": "twitter",
};

/* Builds the ordered list of contact entries shared by the social row
   and the contact section, so both stay in sync from one data block. */
function collectContactEntries(contact = {}) {
  const entries = [];

  if (contact.email) {
    entries.push({ label: "Email", value: contact.email, url: `mailto:${contact.email}` });
  }
  if (contact.googleScholar) {
    entries.push({
      label: "Google Scholar",
      value: contact.googleScholarLabel || "Profile",
      url: contact.googleScholar,
    });
  }
  if (contact.github) {
    entries.push({ label: "GitHub", value: contact.github, url: contact.githubUrl || contact.github });
  }
  if (contact.linkedin) {
    entries.push({ label: "LinkedIn", value: contact.linkedin, url: contact.linkedinUrl || contact.linkedin });
  }
  if (contact.orcid) {
    entries.push({ label: "ORCID", value: contact.orcidLabel || contact.orcid, url: contact.orcid });
  }
  if (contact.twitter) {
    entries.push({
      label: "X/Twitter",
      value: contact.twitterLabel || contact.twitter,
      url: contact.twitterUrl || contact.twitter,
    });
  }
  if (contact.cv) {
    entries.push({ label: "CV", value: contact.cvLabel || "Download CV", url: contact.cv });
  }

  if (Array.isArray(contact.items)) {
    entries.push(...contact.items);
  }

  return entries;
}

function iconFor(label) {
  return socialIcons[iconKeyByLabel[label]] || socialIcons.link;
}

function applySiteMeta(site = {}) {
  if (site.title) {
    document.title = site.title;
  }

  const desc = document.querySelector('meta[name="description"]');
  if (desc && site.description) {
    desc.setAttribute("content", site.description);
  }

  const brand = document.querySelector(".brand-name");
  if (brand && site.brandName && document.body?.dataset?.page !== "rejections") {
    brand.textContent = site.brandName;
  }

  const footerOwner = document.getElementById("footer-owner");
  if (footerOwner && site.footerName) {
    footerOwner.textContent = site.footerName;
  }

  const footerVersion = document.getElementById("footer-template-version");
  if (footerVersion) {
    if (site.templateVersion) {
      footerVersion.textContent = `Template ${site.templateVersion}`;
      footerVersion.hidden = false;
    } else {
      footerVersion.textContent = "";
      footerVersion.hidden = true;
    }
  }

  const footerLastUpdated = document.getElementById("footer-last-updated");
  if (footerLastUpdated) {
    const updatedValue = typeof site.lastUpdated === "string" ? site.lastUpdated.trim() : "";
    let displayValue = "";

    const formatDate = (date) =>
      new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);

    if (updatedValue) {
      const parsedDate = new Date(updatedValue);
      displayValue = Number.isNaN(parsedDate.getTime()) ? updatedValue : formatDate(parsedDate);
    } else {
      displayValue = formatDate(new Date());
    }

    footerLastUpdated.textContent = `Updated ${displayValue}`;
    footerLastUpdated.hidden = false;
  }
}

/* ---------------- about ---------------- */

function renderSocialRow(contact = {}) {
  const entries = collectContactEntries(contact).filter((entry) => entry.url);
  if (!entries.length) {
    return "";
  }

  const icons = entries
    .map(
      (entry) =>
        `<a href="${escapeHtml(safeUrl(entry.url))}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(entry.label)}" aria-label="${escapeHtml(entry.label)}">${iconFor(entry.label)}</a>`,
    )
    .join("");

  const emailLine = contact.email
    ? `<p class="email-text">${escapeHtml(contact.email)}</p>`
    : "";

  return `
    <div class="social">
      <div class="social-icons">${icons}</div>
      ${emailLine}
    </div>
  `;
}

function renderHeroSection(hero = {}, contact = {}) {
  const paragraphsHtmlRaw = Array.isArray(hero.paragraphsHtml)
    ? hero.paragraphsHtml.filter((text) => typeof text === "string" && text.trim())
    : [];
  const paragraphs = Array.isArray(hero.paragraphs) ? hero.paragraphs : [];
  const paragraphsHtml = paragraphsHtmlRaw.length
    ? paragraphsHtmlRaw.map((text) => `<p>${text}</p>`).join("")
    : paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join("");

  const subtitle = hero.subtitleHtml || escapeHtml(hero.metaLine || "");
  const caption = hero.imageCaptionHtml
    ? `<div class="profile-caption">${hero.imageCaptionHtml}</div>`
    : "";

  return `
    <section class="panel hero" id="about">
      <h1 class="post-title">${escapeHtml(hero.name || "Your Name")}</h1>
      ${subtitle ? `<p class="post-description">${subtitle}</p>` : ""}
      <div class="about-grid">
        <div class="hero-copy">${paragraphsHtml}</div>
        <div class="profile">
          <img
            src="${escapeHtml(hero.imageSrc || "assets/images/profile-photo.svg")}"
            alt="${escapeHtml(hero.imageAlt || "Profile photo")}"
          />
          ${caption}
        </div>
      </div>
      ${renderSocialRow(contact)}
    </section>
  `;
}

/* ---------------- news / rejections tables ---------------- */

function renderNewsRows(items = [], emptyText = "Nothing here yet.") {
  if (!items.length) {
    return `<tr><td class="news-date">—</td><td class="news-text">${escapeHtml(emptyText)}</td></tr>`;
  }

  return items
    .map((item) => {
      const links = Array.isArray(item.links)
        ? item.links.map((link) => externalLink(link.url, link.label || "Link")).join(" · ")
        : "";

      return `
        <tr>
          <td class="news-date">${escapeHtml(item.date || "")}</td>
          <td class="news-text">${escapeHtml(item.text || "")}${links ? ` ${links}` : ""}</td>
        </tr>
      `;
    })
    .join("");
}

function renderHighlightsSection(items = [], heading = {}) {
  return `
    <section class="panel" id="news">
      <h2 class="section-title">${escapeHtml(heading.title || "news")}</h2>
      <table class="news-table">
        <tbody>${renderNewsRows(items, "No updates yet.")}</tbody>
      </table>
    </section>
  `;
}

function renderRejectionsSection(items = [], heading = {}) {
  const intro = heading.intro ? `<p>${escapeHtml(heading.intro)}</p>` : "";

  return `
    <section class="panel" id="rejections">
      <h2 class="section-title">${escapeHtml(heading.title || "rejections")}</h2>
      ${intro}
      <table class="news-table">
        <tbody>${renderNewsRows(items, "No rejections logged yet.")}</tbody>
      </table>
    </section>
  `;
}

/* ---------------- publications ---------------- */

function renderAuthors(pub = {}, meName = "") {
  const authors = typeof pub.authors === "string" ? pub.authors : "";
  if (!authors) {
    return escapeHtml(pub.meta || "");
  }

  const escaped = escapeHtml(authors);
  if (!meName) {
    return escaped;
  }

  const escapedMe = escapeHtml(meName);
  return escaped.split(escapedMe).join(`<span class="me">${escapedMe}</span>`);
}

function renderPublicationEntry(pub = {}, meName = "") {
  const links = Array.isArray(pub.links)
    ? pub.links
        .filter((link) => link && link.url && safeUrl(link.url) !== "#")
        .map((link) => externalLink(link.url, link.label || "Link", "btn-sm"))
        .join("")
    : "";

  const badge = pub.abbr
    ? `<abbr class="badge" title="${escapeHtml(pub.venue || pub.abbr)}">${escapeHtml(pub.abbr)}</abbr>`
    : "";
  const thumb = pub.thumbnail
    ? `<img class="pub-thumb" src="${escapeHtml(pub.thumbnail)}" alt="${escapeHtml(pub.thumbnailAlt || "Publication thumbnail")}" />`
    : "";

  const periodicalParts = [pub.venue, pub.year].filter(Boolean).map((part) => escapeHtml(part));
  const periodical = periodicalParts.length
    ? `<div class="periodical"><em>${periodicalParts.join(", ")}</em></div>`
    : "";

  const abstract = pub.summary ? `<p class="abstract">${escapeHtml(pub.summary)}</p>` : "";

  return `
    <li>
      <div class="pub-aside">${badge}${thumb}</div>
      <div class="pub-body">
        <div class="title">${escapeHtml(pub.title || "Paper Title")}</div>
        <div class="author">${renderAuthors(pub, meName)}</div>
        ${periodical}
        ${abstract}
        ${links ? `<div class="links">${links}</div>` : ""}
      </div>
    </li>
  `;
}

function renderPublicationsSection(publications = [], heading = {}, meName = "") {
  const byYear = new Map();
  publications.forEach((pub) => {
    const year = String(pub.year || "").trim() || "Preprints";
    if (!byYear.has(year)) {
      byYear.set(year, []);
    }
    byYear.get(year).push(pub);
  });

  const sortedYears = Array.from(byYear.keys()).sort((a, b) => {
    const numA = Number.parseInt(a, 10);
    const numB = Number.parseInt(b, 10);
    if (Number.isNaN(numA) && Number.isNaN(numB)) return a.localeCompare(b);
    if (Number.isNaN(numA)) return -1;
    if (Number.isNaN(numB)) return 1;
    return numB - numA;
  });

  const groups = sortedYears
    .map(
      (year) => `
        <h2 class="year">${escapeHtml(year)}</h2>
        <ol class="bibliography">
          ${byYear
            .get(year)
            .map((pub) => renderPublicationEntry(pub, meName))
            .join("")}
        </ol>
      `,
    )
    .join("");

  return `
    <section class="panel publications" id="publications">
      <h2 class="section-title">${escapeHtml(heading.title || "selected publications")}</h2>
      ${groups}
    </section>
  `;
}

/* ---------------- contact ---------------- */

function renderContactSection(contact = {}) {
  const itemList = collectContactEntries(contact)
    .map((item) => {
      const value = escapeHtml(item.value || "");
      const icon = `<span class="contact-icon" aria-hidden="true">${iconFor(item.label || "")}</span>`;
      const label = `<span class="contact-label">${escapeHtml(item.label || "")}</span>`;

      if (item.url) {
        return `
          <li class="contact-item">
            <a class="contact-row-link" href="${escapeHtml(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer">
              ${icon}${label}<span class="contact-value">${value}</span>
            </a>
          </li>
        `;
      }

      return `<li class="contact-item contact-item--plain">${icon}${label}<span class="contact-value">${value}</span></li>`;
    })
    .join("");

  return `
    <section class="panel" id="contact">
      <h2 class="section-title">${escapeHtml(contact.title || "contact")}</h2>
      <p>${escapeHtml(contact.intro || "")}</p>
      <ul class="contact-list">
        ${itemList}
      </ul>
    </section>
  `;
}

async function loadFromDataFile(root, page = "home") {
  try {
    const response = await fetch(`${dataFile}?v=${assetVersion}`);
    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    applySiteMeta(data.site || {});

    const normalizedPage = typeof page === "string" ? page.trim().toLowerCase() : "home";
    const meName = data.site?.authorName || data.hero?.name || "";

    if (normalizedPage === "rejections") {
      root.innerHTML = renderRejectionsSection(data.rejections || [], data.rejectionsHeading || {});
      return true;
    }

    root.innerHTML = [
      renderHeroSection(data.hero || {}, data.contact || {}),
      renderHighlightsSection(data.highlights || [], data.highlightsHeading || {}),
      renderPublicationsSection(data.publications || [], data.publicationsHeading || {}, meName),
      renderContactSection(data.contact || {}),
    ].join("");

    return true;
  } catch {
    return false;
  }
}

function initSectionSpy() {
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!links.length) {
    return;
  }

  const sectionBadge = document.getElementById("current-section");

  const sectionById = new Map();
  const labelById = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href")?.slice(1);
    if (!id) {
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      sectionById.set(id, section);
      labelById.set(id, (link.textContent || id).trim());
    }
  });

  const sections = Array.from(sectionById.entries()).map(([id, section]) => ({ id, section }));

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (sectionBadge) {
      sectionBadge.textContent = labelById.get(id) || "Section";
    }
  };

  const scrollToSection = (id) => {
    const section = sectionById.get(id);
    if (!section) {
      return;
    }

    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const offset = headerHeight + 18;
    const top = window.scrollY + section.getBoundingClientRect().top - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href")?.slice(1);
      if (!id || !sectionById.has(id)) {
        return;
      }
      event.preventDefault();
      setActive(id);
      scrollToSection(id);
      history.replaceState(null, "", `#${id}`);
    });
  });

  const resolveActiveByScroll = () => {
    if (!sections.length) {
      return;
    }

    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const marker = window.scrollY + headerHeight + 28;

    let activeId = sections[0].id;
    for (const item of sections) {
      const absoluteTop = window.scrollY + item.section.getBoundingClientRect().top;
      if (absoluteTop <= marker) {
        activeId = item.id;
      } else {
        break;
      }
    }

    setActive(activeId);
  };

  let rafToken = 0;
  const onScroll = () => {
    if (rafToken) {
      return;
    }

    rafToken = window.requestAnimationFrame(() => {
      resolveActiveByScroll();
      rafToken = 0;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  if (window.location.hash) {
    const idFromHash = window.location.hash.slice(1);
    if (sectionById.has(idFromHash)) {
      setActive(idFromHash);
      // The browser already tried to jump here before the sections existed,
      // so scroll again now that they do.
      scrollToSection(idFromHash);
      return;
    }
  }

  resolveActiveByScroll();
}

function setYear() {
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}

function initLocalClock() {
  const clockNode = document.getElementById("footer-local-clock");
  if (!clockNode) {
    return;
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";

  const renderClock = () => {
    const now = new Date();
    const dateText = new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      weekday: "short",
      timeZone,
    }).format(now);

    const timeText = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
      hour12: true,
    }).format(now);

    clockNode.textContent = `${dateText}, ${timeText}`;
    clockNode.hidden = false;
  };

  renderClock();
  window.setInterval(renderClock, 30000);
}

initTheme();
initProgressBar();
setYear();
initLocalClock();
loadSections();
