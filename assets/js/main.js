const sectionFiles = [
  "sections/01-hero.html",
  "sections/02-about.html",
  "sections/03-research.html",
  "sections/04-publications.html",
  "sections/05-projects.html",
  "sections/06-contact.html",
];

const themeStorageKey = "site-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeToggle(theme);
}

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
    icon.textContent = "Light";
    toggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    icon.textContent = "Dark";
    toggle.setAttribute("aria-label", "Switch to dark mode");
  }
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

  revealOnScroll();
}

function revealOnScroll() {
  const panels = document.querySelectorAll(".panel");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.16 },
  );

  panels.forEach((panel, index) => {
    panel.style.transitionDelay = `${index * 70}ms`;
    observer.observe(panel);
  });
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
