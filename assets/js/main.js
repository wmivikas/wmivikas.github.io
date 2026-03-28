const sectionFiles = [
  "sections/01-hero.html",
  "sections/05-highlights.html",
  "sections/04-publications.html",
  "sections/06-contact.html",
];

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
    icon.textContent = "🌞";
    toggle.setAttribute("aria-label", "Switch to light mode");
    toggle.setAttribute("title", "Switch to light mode");
  } else {
    icon.textContent = "🌙";
    toggle.setAttribute("aria-label", "Switch to dark mode");
    toggle.setAttribute("title", "Switch to dark mode");
  }
}

function setDynamicFavicon(theme) {
  const baseA = theme === "dark" ? "#0a1a2b" : "#113d6d";
  const baseB = theme === "dark" ? "#1d5ea8" : "#1f75d1";
  const fg = "#f4f8ff";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="VK favicon">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${baseA}"/>
          <stop offset="100%" stop-color="${baseB}"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#bg)"/>
      <path d="M16 48V16h7l9 18 9-18h7v32h-7V30l-7.8 15.6h-2.4L23 30v18z" fill="${fg}"/>
    </svg>
  `;
  const url = `data:image/svg+xml,${encodeURIComponent(svg)}`;

  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement("link");
    favicon.setAttribute("rel", "icon");
    document.head.appendChild(favicon);
  }

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

async function loadSections() {
  const root = document.getElementById("profile-content");

  if (!root) {
    return;
  }

  const loadedFromData = await loadFromDataFile(root);
  if (loadedFromData) {
    initSectionSpy();
    initPanelReveal();
    return;
  }

  for (const path of sectionFiles) {
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
        `<section class="panel"><h2>Section Load Error</h2><p>${String(error)}</p></section>`,
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
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
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

function applySiteMeta(site = {}) {
  if (site.title) {
    document.title = site.title;
  }

  const desc = document.querySelector('meta[name="description"]');
  if (desc && site.description) {
    desc.setAttribute("content", site.description);
  }

  const brand = document.querySelector(".brand-name");
  if (brand && site.brandName) {
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

    if (updatedValue) {
      const parsedDate = new Date(updatedValue);
      displayValue = Number.isNaN(parsedDate.getTime()) ? updatedValue : parsedDate.toLocaleString();
    } else {
      displayValue = new Date().toLocaleString();
    }

    footerLastUpdated.textContent = `Updated ${displayValue}`;
    footerLastUpdated.hidden = false;
  }
}

function renderHeroSection(hero = {}, contact = {}) {
  const paragraphs = Array.isArray(hero.paragraphs) ? hero.paragraphs : [];
  const paragraphsHtmlRaw = Array.isArray(hero.paragraphsHtml)
    ? hero.paragraphsHtml.filter((text) => typeof text === "string" && text.trim())
    : [];
  const paragraphsHtml = paragraphsHtmlRaw.length
    ? paragraphsHtmlRaw.map((text) => `<p>${text}</p>`).join("")
    : paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join("");
  const cvUrl = contact.cv ? safeUrl(contact.cv) : "";
  const cvLabel = contact.cvLabel || "Download CV";
  const cvAction = cvUrl && cvUrl !== "#"
    ? `<p class="hero-actions"><a class="hero-action-link" href="${escapeHtml(cvUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(cvLabel)}</a></p>`
    : "";
  const signatureTitle = hero.signatureTitle || "Research Signature";
  const signatureLead = hero.signatureLead || "Intelligent Systems";
  const signatureMeta = hero.signatureMeta || "Applied AI • Real-world Deployment • Collaboration-ready";
  const signatureStrip = `
    <div class="hero-signature" aria-label="Professional signature">
      <p class="hero-signature-title">${escapeHtml(signatureTitle)}</p>
      <p class="hero-signature-lead">${escapeHtml(signatureLead)}</p>
      <p class="hero-signature-meta">${escapeHtml(signatureMeta)}</p>
    </div>
  `;

  return `
    <section class="panel hero" id="about">
      <div class="hero-grid">
        <div>
          <p class="kicker">${escapeHtml(hero.kicker || "About")}</p>
          <h1>${escapeHtml(hero.name || "Your Name")}</h1>
          <p class="meta-line">${escapeHtml(hero.metaLine || "Add your role and affiliation")}</p>
          ${signatureStrip}
          <div class="hero-copy">${paragraphsHtml}</div>
          ${cvAction}
        </div>
        <aside class="hero-media">
          <img
            src="${escapeHtml(hero.imageSrc || "assets/images/profile-photo.svg")}" 
            alt="${escapeHtml(hero.imageAlt || "Profile photo")}" 
            class="hero-image"
          />
        </aside>
      </div>
    </section>
  `;
}

function renderHighlightsSection(items = [], heading = {}) {
  const listItems = items
    .map((item) => {
      const links = Array.isArray(item.links)
        ? item.links
            .map(
              (link) =>
                `<a href="${escapeHtml(safeUrl(link.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label || "Link")}</a>`,
            )
            .join(" ")
        : "";

      return `
        <li>
          <span class="announcement-date">[${escapeHtml(item.date || "Date")}]</span>
          ${escapeHtml(item.text || "Add an update here.")}
          ${links}
        </li>
      `;
    })
    .join("");

  return `
    <section class="panel" id="highlights">
      <p class="kicker">${escapeHtml(heading.kicker || "Highlights")}</p>
      <h2>${escapeHtml(heading.title || "Updates & Announcements")}</h2>
      <ul class="announcement-list">
        ${listItems}
      </ul>
    </section>
  `;
}

function renderPublicationsSection(publications = [], heading = {}) {
  const publicationCards = publications
    .map((pub) => {
      const links = Array.isArray(pub.links)
        ? pub.links
            .map(
              (link) => `<a href="${escapeHtml(safeUrl(link.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label || "Link")}</a>`,
            )
            .join("")
        : "";

      return `
        <article class="publication-item pub-row">
          <img src="${escapeHtml(pub.thumbnail || "assets/images/paper-thumb-1.svg")}" alt="${escapeHtml(pub.thumbnailAlt || "Publication thumbnail")}" class="pub-thumb" />
          <div>
            <h3>${escapeHtml(pub.title || "Paper Title")}</h3>
            <p class="pub-meta">${escapeHtml(pub.meta || "Authors | Venue (Year)")}</p>
            <p>${escapeHtml(pub.summary || "Add a one-line publication summary.")}</p>
            <p class="pub-links">${links}</p>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <section class="panel" id="publications">
      <p class="kicker">${escapeHtml(heading.kicker || "Publications")}</p>
      <h2>${escapeHtml(heading.title || "Selected Publications")}</h2>
      ${publicationCards}
    </section>
  `;
}

function renderContactSection(contact = {}) {
  const iconMetaByLabel = {
    Email: {
      className: "contact-icon--email",
      svg: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.217L8 8.917.001 4.217V4zm0 1.383v6.617a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.383L8.4 9.8a1 1 0 0 1-1.2 0L0 5.383z"/></svg>',
    },
    LinkedIn: {
      className: "contact-icon--linkedin",
      svg: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175A1.16 1.16 0 0 1 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zM3.743 5.18c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.358.54-1.358 1.248 0 .694.52 1.248 1.327 1.248h.015zm3.758 8.214h2.4V9.359c0-.216.016-.432.08-.586.174-.432.57-.88 1.234-.88.87 0 1.219.664 1.219 1.635v3.866h2.4V9.25c0-2.22-1.184-3.252-2.764-3.252-1.275 0-1.845.709-2.16 1.2h.015v-1.03h-2.4c.032.663 0 7.225 0 7.225z"/></svg>',
    },
    GitHub: {
      className: "contact-icon--github",
      svg: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8a8.01 8.01 0 0 0 5.47 7.59c.4.08.55-.17.55-.38 0-.2-.01-.83-.01-1.5-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.47 7.47 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    },
    "Google Scholar": {
      className: "contact-icon--scholar",
      svg: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1 0 5l8 4 6.5-3.25V11h1V5L8 1zm-4 8.4V12c0 1.1 1.8 2 4 2s4-.9 4-2V9.4L8 11 4 9.4z"/></svg>',
    },
    CV: {
      className: "contact-icon--cv",
      svg: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9.293 0H3.5A1.5 1.5 0 0 0 2 1.5v13A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5V4.707L9.293 0zM9.5 1.5 12.5 4.5h-2A1 1 0 0 1 9.5 3.5v-2zM4.75 7h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5zm0 3h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5z"/></svg>',
    },
    ORCID: {
      className: "contact-icon--orcid",
      svg: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm-2.06 3.5a.94.94 0 1 1 0 1.88.94.94 0 0 1 0-1.88zM4.9 6h2.05v5.25H4.9V6zm3.1 0h2.3c2 0 3.2 1.05 3.2 2.62 0 1.6-1.2 2.63-3.2 2.63H8V6zm2.15 4.05c1.05 0 1.7-.5 1.7-1.43 0-.92-.65-1.42-1.7-1.42h-.65v2.85h.65z"/></svg>',
    },
    "X/Twitter": {
      className: "contact-icon--x",
      svg: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9.2 6.8 14.2 1h-1.2L8.7 6 5.3 1H1.2l5.3 7.7L1.2 15h1.2l4.7-5.5 3.8 5.5H15L9.2 6.8zM7.7 8.5l-.5-.7L3.6 2.6h1.9L8.3 6.6l.5.7 3.8 5.3h-1.9L7.7 8.5z"/></svg>',
    },
  };

  const iconMetaFor = (label) => {
    const meta = iconMetaByLabel[label];
    if (meta) {
      return meta;
    }

    return {
      className: "contact-icon--default",
      svg: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 3a.5.5 0 0 1 .5.5v2h6.793L9.146 2.854a.5.5 0 1 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 1 1-.708-.708L11.793 6.5H5v2a.5.5 0 0 1-1 0v-5A.5.5 0 0 1 4.5 3z"/></svg>',
    };
  };

  const items = [];

  if (contact.email) {
    items.push({ label: "Email", value: contact.email, url: `mailto:${contact.email}` });
  }
  if (contact.linkedin) {
    items.push({ label: "LinkedIn", value: contact.linkedin, url: contact.linkedinUrl || contact.linkedin });
  }
  if (contact.github) {
    items.push({ label: "GitHub", value: contact.github, url: contact.githubUrl || contact.github });
  }
  if (contact.googleScholar) {
    items.push({ label: "Google Scholar", value: contact.googleScholarLabel || "Profile", url: contact.googleScholar });
  }
  if (contact.cv) {
    items.push({ label: "CV", value: contact.cvLabel || "Download CV", url: contact.cv });
  }
  if (contact.orcid) {
    items.push({ label: "ORCID", value: contact.orcidLabel || contact.orcid, url: contact.orcid });
  }
  if (contact.twitter) {
    items.push({ label: "X/Twitter", value: contact.twitterLabel || contact.twitter, url: contact.twitterUrl || contact.twitter });
  }

  if (Array.isArray(contact.items)) {
    items.push(...contact.items);
  }

  const itemList = items
    .map((item) => {
      const prefix = `${escapeHtml(item.label || "Label")}: `;
      const value = escapeHtml(item.value || "Value");
      const iconMeta = iconMetaFor(item.label || "");

      if (item.url) {
        return `
          <li class="contact-item contact-item--linked">
            <a class="contact-row-link" href="${escapeHtml(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(item.label || "Contact")}: ${value}">
              <span class="contact-icon ${iconMeta.className}" aria-hidden="true">${iconMeta.svg}</span>
              <span class="contact-label">${prefix}</span>
              <span class="contact-value">${value}</span>
            </a>
          </li>
        `;
      }

      return `
        <li class="contact-item">
          <span class="contact-icon ${iconMeta.className}" aria-hidden="true">${iconMeta.svg}</span>
          <span class="contact-label">${prefix}</span>
          <span class="contact-value">${value}</span>
        </li>
      `;
    })
    .join("");

  return `
    <section class="panel" id="contact">
      <p class="kicker">${escapeHtml(contact.kicker || "Contact")}</p>
      <h2>${escapeHtml(contact.title || "Get In Touch")}</h2>
      <p>${escapeHtml(contact.intro || "Add your contact invitation text.")}</p>
      <ul class="contact-list">
        ${itemList}
      </ul>
    </section>
  `;
}

async function loadFromDataFile(root) {
  try {
    const response = await fetch(`${dataFile}?v=${assetVersion}`);
    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    applySiteMeta(data.site || {});

    root.innerHTML = [
      renderHeroSection(data.hero || {}, data.contact || {}),
      renderHighlightsSection(data.highlights || [], data.highlightsHeading || {}),
      renderPublicationsSection(data.publications || [], data.publicationsHeading || {}),
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
      second: "2-digit",
      hour12: true,
      timeZone,
      timeZoneName: "short",
    }).format(now);

    clockNode.textContent = `${dateText} ${timeText} (${timeZone})`;
    clockNode.hidden = false;
  };

  renderClock();
  window.setInterval(renderClock, 1000);
}

initTheme();
setYear();
initLocalClock();
loadSections();
