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
    progress.style.width = total > 0 ? `${(doc.scrollTop / total) * 100}%` : "0%";
  };
  addEventListener("scroll", update, { passive: true });
  update();
}
