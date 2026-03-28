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
  const emoji = theme === "dark" ? "🌙" : "🌞";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><text y="50" font-size="50">${emoji}</text></svg>`;
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

  return `
    <section class="panel hero" id="about">
      <div class="hero-grid">
        <div>
          <p class="kicker">${escapeHtml(hero.kicker || "About")}</p>
          <h1>${escapeHtml(hero.name || "Your Name")}</h1>
          <p class="meta-line">${escapeHtml(hero.metaLine || "Add your role and affiliation")}</p>
          ${paragraphsHtml}
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

      if (item.url) {
        return `<li>${prefix}<a href="${escapeHtml(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer">${value}</a></li>`;
      }

      return `<li>${prefix}${value}</li>`;
    })
    .join("");

  return `
    <section class="panel" id="contact">
      <p class="kicker">${escapeHtml(contact.kicker || "Contact")}</p>
      <h2>${escapeHtml(contact.title || "Get In Touch")}</h2>
      <p>${escapeHtml(contact.intro || "Add your contact invitation text.")}</p>
      <ul>
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
      scrollToSection(id);
      history.replaceState(null, "", `#${id}`);
    });
  });

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

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length) {
        setActive(visible[0].target.id);
      }
    },
    { rootMargin: "-20% 0px -60% 0px", threshold: [0.2, 0.4, 0.6] },
  );

  sectionById.forEach((section) => observer.observe(section));

  const first = sectionById.keys().next().value;
  if (first) {
    setActive(first);
  }
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
