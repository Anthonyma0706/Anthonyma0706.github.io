// ============================================
// Mingyang Ma — Interactions + i18n
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // ---- i18n: language toggle ----
  const body = document.body;
  const langBtn = document.getElementById('langBtn');
  let currentLang = 'en';

  function setLang(lang) {
    currentLang = lang;
    body.setAttribute('data-lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // Update all i18n spans
    document.querySelectorAll('.i18n').forEach((el) => {
      el.textContent = el.dataset[lang];
    });

    // Update toggle button text
    langBtn.textContent = lang === 'en' ? '中文' : 'EN';
  }

  langBtn.addEventListener('click', () => {
    setLang(currentLang === 'en' ? 'zh' : 'en');
  });

  // Init
  setLang('en');

  // ---- Scroll fade-in ----
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach((el) => observer.observe(el));

  // ---- Mobile nav toggle ----
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // ---- Nav shadow on scroll ----
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 1px 12px rgba(0,0,0,0.06)'
      : 'none';
  }, { passive: true });

  // ---- Smooth scroll ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = nav ? nav.offsetHeight : 0;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });
});
