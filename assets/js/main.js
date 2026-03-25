const sectionFiles = [
  "sections/01-hero.html",
  "sections/02-about.html",
  "sections/03-research.html",
  "sections/04-publications.html",
  "sections/05-projects.html",
  "sections/06-contact.html",
];

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

setYear();
loadSections();
