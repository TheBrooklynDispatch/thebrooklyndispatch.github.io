const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".primary-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

const progress = document.querySelector("[data-reading-progress]");

if (progress) {
  const update = () => {
    const doc = document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;

    progress.style.width =
      total > 0 ? `${(doc.scrollTop / total) * 100}%` : "0%";
  };

  addEventListener("scroll", update, { passive: true });
  update();
}

const readingModeButton = document.querySelector("[data-reading-mode]");

function exitReadingMode() {
  document.body.classList.remove("reading-mode");

  if (readingModeButton) {
    readingModeButton.textContent = "Read";
    readingModeButton.setAttribute("aria-pressed", "false");
  }
}

if (readingModeButton) {
  readingModeButton.setAttribute("aria-pressed", "false");

  readingModeButton.addEventListener("click", () => {
    const active = document.body.classList.toggle("reading-mode");

    readingModeButton.textContent = active ? "Exit" : "Read";
    readingModeButton.setAttribute("aria-pressed", String(active));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      exitReadingMode();
    }
  });
}