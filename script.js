const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const year = document.querySelector('[data-year]');
const copyButton = document.querySelector('[data-copy]');

year.textContent = new Date().getFullYear();

const updateHeader = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
});

nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Mở menu');
  }
});

copyButton.addEventListener('click', async () => {
  const email = copyButton.dataset.copy;
  try {
    await navigator.clipboard.writeText(email);
    copyButton.textContent = 'Đã copy';
    setTimeout(() => {
      copyButton.textContent = 'Copy email';
    }, 1600);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});
