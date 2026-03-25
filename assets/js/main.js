const sectionFiles = [
  "sections/01-hero.html",
  "sections/05-highlights.html",
  "sections/04-publications.html",
  "sections/06-contact.html",
];

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

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeToggle(theme);
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

  for (const path of sectionFiles) {
    try {
      const res = await fetch(path);
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

function initSectionSpy() {
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!links.length) {
    return;
  }

  const sectionById = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href")?.slice(1);
    if (!id) {
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      sectionById.set(id, section);
    }
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

initTheme();
setYear();
loadSections();
