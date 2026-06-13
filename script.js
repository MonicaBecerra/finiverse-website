// ===== LANGUAGE TOGGLE =====
const translations = {
  en: {
    'html-lang': 'en',
    'html-title': 'Finiverse — Your Financial + Emotional Health',
  },
  es: {
    'html-lang': 'es',
    'html-title': 'Finiverse — Tu Salud Financiera + Emocional',
  }
};

let currentLang = localStorage.getItem('finiverse-lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('finiverse-lang', lang);
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.title = translations[lang]['html-title'];

  // Swap all data-en / data-es attributes
  document.querySelectorAll('[data-en][data-es]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.es;
  });

  // Update active state on all lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// Apply on load
applyLang(currentLang);

// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close mobile menu on link click
navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ===== NAV SCROLL =====
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.background = 'rgba(10,10,20,0.97)';
  } else {
    nav.style.background = 'rgba(10,10,20,0.8)';
  }
}, { passive: true });

// ===== FADE IN ANIMATIONS =====
const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.feature-card, .inclusive-card, .screenshot-item, .contact-card').forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// ===== SCREENSHOT DRAG SCROLL =====
const track = document.getElementById('screenshotTrack');
const scrollContainer = track?.parentElement;

if (scrollContainer) {
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.cursor = 'grabbing';
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.style.cursor = '';
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.style.cursor = '';
  });

  scrollContainer.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
}
