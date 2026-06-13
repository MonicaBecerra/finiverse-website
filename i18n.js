/* ── i18n.js — shared language toggle ── */
(function () {
  const STORAGE_KEY = 'finiverse-lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);

    const titleEl = document.querySelector('[data-title-en]');
    if (titleEl) {
      document.title = titleEl.getAttribute(lang === 'en' ? 'data-title-en' : 'data-title-es') || document.title;
    }

    document.querySelectorAll('[data-en][data-es]').forEach(el => {
      const val = el.getAttribute(lang === 'en' ? 'data-en' : 'data-es');
      if (val !== null) el.innerHTML = val;
    });

    document.querySelectorAll('[data-ph-en][data-ph-es]').forEach(el => {
      el.placeholder = el.getAttribute(lang === 'en' ? 'data-ph-en' : 'data-ph-es') || '';
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  function init() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
    });
    applyLang(currentLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
