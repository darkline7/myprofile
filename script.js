/* ============================================
   SCRIPT.JS — Pham Thanh Binh Portfolio
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     1. THÊM CLASS .js VÀO <HTML>
        → Kích hoạt reveal animation trong CSS
     ------------------------------------------ */
  document.documentElement.classList.add('js');

  /* ------------------------------------------
     2. DARK / LIGHT MODE
     ------------------------------------------ */
  const themeBtn  = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  const html      = document.documentElement;

  // Đọc preference từ localStorage nếu có
  const saved = localStorage.getItem('theme');
  if (saved) {
    html.setAttribute('data-theme', saved);
    updateIcon(saved);
  }

  themeBtn && themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'dark';
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    updateIcon(next);
  });

  function updateIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === 'dark'
      ? 'fa-solid fa-moon'
      : 'fa-solid fa-sun';
  }

  /* ------------------------------------------
     3. MOBILE MENU
     ------------------------------------------ */
  const menuBtn = document.getElementById('menuBtn');
  const nav     = document.getElementById('nav');

  menuBtn && menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Đóng menu khi bấm link
  nav && nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  /* ------------------------------------------
     4. ACTIVE NAV LINK KHI SCROLL
     ------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function setActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ------------------------------------------
     5. REVEAL ON SCROLL (IntersectionObserver)
     ------------------------------------------ */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach((el, i) => {
      // Delay nhẹ theo thứ tự
      el.style.transitionDelay = (i % 4) * 80 + 'ms';
      observer.observe(el);
    });
  } else {
    // Fallback: hiện tất cả nếu không hỗ trợ IntersectionObserver
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ------------------------------------------
     6. HEADER SCROLL EFFECT
     ------------------------------------------ */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header && header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ------------------------------------------
     7. CONTACT FORM
     ------------------------------------------ */
  const form     = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showNote('Vui lòng điền đầy đủ thông tin.', 'error');
      return;
    }

    // Giả lập gửi form (thay bằng fetch API thực nếu có backend)
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Đang gửi...';

    setTimeout(() => {
      showNote('✅ Tin nhắn đã được gửi! Tôi sẽ phản hồi sớm nhất.', 'success');
      form.reset();
      btn.disabled = false;
      btn.innerHTML = 'Gửi tin nhắn <i class="fa-solid fa-paper-plane"></i>';
    }, 1200);
  });

  function showNote(msg, type) {
    if (!formNote) return;
    formNote.textContent = msg;
    formNote.className = 'form-note ' + type;
    setTimeout(() => {
      formNote.textContent = '';
      formNote.className = 'form-note';
    }, 5000);
  }

})();
