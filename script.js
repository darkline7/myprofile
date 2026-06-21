// Enable JS-only enhancements without hiding content when JavaScript fails.
document.documentElement.classList.add("js-enabled");

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = themeToggle?.querySelector("i");
const yearEl = document.querySelector("[data-year]");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".site-nav a[href^='#']");

// Footer year.
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Sticky header state.
const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

// Mobile navigation.
navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  }
});

// Optional light mode toggle. Dark is the default brand direction.
let savedTheme = null;
try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch {
  savedTheme = null;
}

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeIcon?.classList.replace("fa-sun", "fa-moon");
}

themeToggle?.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");
  themeIcon?.classList.toggle("fa-moon", isLight);
  themeIcon?.classList.toggle("fa-sun", !isLight);
  themeToggle.setAttribute("aria-label", isLight ? "Toggle dark mode" : "Toggle light mode");

  try {
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  } catch {
    // The current session still updates even when browser storage is blocked.
  }
});

// Reveal-on-scroll animation.
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
  window.setTimeout(() => {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }, 900);
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Active navbar state while scrolling.
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isCurrent);
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

// Contact form demo: opens the visitor's email app with a prefilled message.
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  window.location.href = `mailto:binh25820500016@hutech.edu.vn?subject=${subject}&body=${body}`;

  if (formNote) {
    formNote.textContent = "Opening your email app with the message prepared.";
  }
});
