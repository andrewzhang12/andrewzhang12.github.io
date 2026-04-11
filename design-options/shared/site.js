document.documentElement.classList.add("js-ready");

const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const sections = Array.from(document.querySelectorAll("[data-section]"));
const progress = document.querySelector(".scroll-progress span");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const open = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    body.classList.remove("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealItems = Array.from(document.querySelectorAll(".reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const updateScrollState = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${total > 0 ? (scrollTop / total) * 100 : 0}%`;

  let current = sections[0]?.id;
  sections.forEach((section) => {
    if (section.offsetTop <= scrollTop + 140) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
updateScrollState();
