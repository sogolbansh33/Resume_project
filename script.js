"use strict";

const EMAIL = "paulhanstracy22@gmail.com";

const EDUCATION = [
  {
    title: "Bachelor of Science in Information Technology",
    school: "Polytechnic University of the Philippines – Sta. Mesa",
    tag: "Expected July 2028",
    details: [
      { label: "Overall GWA", value: "1.52 (as of 2nd Semester A.Y. 2025-2026)" },
    ],
    coursework: [
      "Computer Programming",
      "Introduction to Computing",
      "Discrete Structures",
      "Data Structures and Algorithms",
      "Operating Systems",
      "Data Communications and Networking",
      "Object Oriented Programming",
      "Information Management",
      "Network Administration",
      "Human Computer Interaction",
      "Quantitative Methods with Modeling and Simulation",
    ],
  },
  {
    title: "Senior High School Diploma",
    school: "University of Makati",
    tag: "June 2024",
    details: [
      { label: "GWA", value: "94.78" },
      { label: "Honors", value: "With Honors" },
    ],
    coursework: [
      "Database Programming",
      "Analytical Programming",
      "Exploratory Data Analysis",
      "Data Visualization and Storytelling",
    ],
  },
  {
    title: "Junior High School Diploma",
    school: "Fort Bonifacio High School",
    tag: "July 2022",
    details: [
      { label: "GWA", value: "95" },
      { label: "Honors", value: "With High Honors" },
    ],
    coursework: [],
  },
];

const SKILLS = [
  {
    title: "Programming Languages",
    category: "code",
    items: ["Java", "Python", "C", "COBOL", "R"],
  },
  {
    title: "Software Development",
    category: "code",
    items: [
      "Object-oriented programming",
      "Java console applications",
      "File handling",
      "Debugging",
      "Software testing",
    ],
  },
  {
    title: "Web Development",
    category: "code",
    items: ["Basic HTML", "Basic CSS", "Basic JavaScript", "Simple responsive web pages"],
  },
  {
    title: "Database Management",
    category: "data",
    items: ["MySQL", "Database design", "CRUD operations", "ERD creation"],
  },
  {
    title: "Microsoft Office",
    category: "data",
    items: ["Word", "Excel", "PowerPoint", "Documents", "Data analysis", "Presentations"],
  },
  {
    title: "Networking",
    category: "net",
    items: [
      "Basic Cisco networking",
      "Router and switch configuration",
      "VLANs",
      "Troubleshooting",
    ],
  },
  {
    title: "UI/UX Design",
    category: "tools",
    items: ["Basic Figma", "Wireframes", "UI prototypes"],
  },
  {
    title: "Tools",
    category: "tools",
    items: [
      "Visual Studio Code",
      "Command line",
      "Git (basic)",
      "Hardware and software troubleshooting",
    ],
  },
  {
    title: "Soft Skills",
    category: "soft",
    items: ["Teamwork", "Adaptability", "Time management", "Communication", "Problem solving"],
  },
];

const FILTERS = [
  { id: "all",   label: "All" },
  { id: "code",  label: "Code" },
  { id: "data",  label: "Data" },
  { id: "net",   label: "Networking" },
  { id: "tools", label: "Tools & Design" },
  { id: "soft",  label: "Soft Skills" },
];

const root = document.documentElement;

const $  = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function chipsHTML(items) {
  const chips = items.map((item) => `<span class="chip">${item}</span>`).join("");
  return `<div class="chips">${chips}</div>`;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function educationCardHTML(entry, index) {
  const isOpen = index === 0;

  const details = entry.details
    .map(({ label, value }) => `<p class="acc-row"><b>${label}:</b> ${value}</p>`)
    .join("");

  const coursework = entry.coursework.length
    ? `<p class="acc-row"><b>Relevant coursework</b></p>${chipsHTML(entry.coursework)}`
    : "";

  return `
    <div class="card rv${isOpen ? " open" : ""}">
      <button class="acc-head" aria-expanded="${isOpen}">
        <span>
          <strong>${entry.title}</strong>
          <small>${entry.school}</small>
        </span>
        <span class="acc-meta">
          <span class="tag">${entry.tag}</span>
          <span class="acc-chevron">▾</span>
        </span>
      </button>
      <div class="acc-panel">
        <div>
          <div class="acc-body">${details}${coursework}</div>
        </div>
      </div>
    </div>`;
}

function renderEducation() {
  $("#edu").innerHTML = EDUCATION.map(educationCardHTML).join("");
}

function renderSkills() {
  $("#sk").innerHTML = SKILLS.map(
    (skill) => `
      <div class="card skill-card rv" data-category="${skill.category}">
        <h3>${skill.title}</h3>
        ${chipsHTML(skill.items)}
      </div>`
  ).join("");
}

function renderFilters() {
  $("#fl").innerHTML = FILTERS.map(
    (filter, index) => `
      <button class="filter-btn" data-filter="${filter.id}" aria-pressed="${index === 0}">
        ${filter.label}
      </button>`
  ).join("");
}

function setupAccordion() {
  $("#edu").addEventListener("click", (event) => {
    const header = event.target.closest(".acc-head");
    if (!header) return;

    const card = header.closest(".card");
    const isOpen = card.classList.toggle("open");
    header.setAttribute("aria-expanded", isOpen);
  });
}

function applyFilter(selected) {
  $$(".filter-btn").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.filter === selected);
  });

  $$(".skill-card").forEach((card) => {
    const isMatch = selected === "all" || card.dataset.category === selected;
    card.hidden = !isMatch;
  });
}

function setupFilters() {
  $("#fl").addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (button) applyFilter(button.dataset.filter);
  });
}

function currentTheme() {
  if (root.dataset.theme) return root.dataset.theme;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function loadSavedTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;
  } catch (error) {
  }
}

function setupThemeToggle() {
  $("#theme").addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;

    try {
      localStorage.setItem("theme", next);
    } catch (error) {
    }
  });
}

function setupContactButtons() {
  $("#copy").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast("Email copied");
    } catch (error) {
      showToast(EMAIL);
    }
  });

  $("#print").addEventListener("click", () => {
    try {
      window.print();
    } catch (error) {
      showToast("Use your browser's Print option");
    }
  });
}

function setupBackToTop() {
  const button = $("#top");

  button.addEventListener("click", () => scrollTo({ top: 0 }));

  addEventListener(
    "scroll",
    () => button.classList.toggle("show", scrollY > 500),
    { passive: true }
  );
}

function countUp(element, duration = 1200) {
  const target = Number(element.dataset.n);
  const decimals = Number(element.dataset.d || 0);
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = (target * eased).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function setupScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("in");
        $$("[data-n]", entry.target).forEach((el) => countUp(el));
        observer.unobserve(entry.target); // Only animate once
      });
    },
    { threshold: 0.15 }
  );

  $$(".rv").forEach((element) => observer.observe(element));
}

function setupNavHighlight() {
  const links = $$("#nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => {
          link.classList.toggle("on", link.hash === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  $$("section").forEach((section) => observer.observe(section));
}

function init() {
  loadSavedTheme();

  renderEducation();
  renderFilters();
  renderSkills();

  setupAccordion();
  setupFilters();
  setupThemeToggle();
  setupContactButtons();
  setupBackToTop();
  setupScrollReveal();
  setupNavHighlight();
}

init();