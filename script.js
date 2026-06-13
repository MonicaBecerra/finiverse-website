// ===== LANGUAGE TOGGLE =====
let currentLang = localStorage.getItem('finiverse-lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('finiverse-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);

  document.title = lang === 'en'
    ? 'Finiverse — Your Financial + Emotional Health'
    : 'Finiverse — Tu Salud Financiera + Emocional';

  // Use getAttribute (more reliable than dataset) and innerHTML (handles HTML in values)
  document.querySelectorAll('[data-en][data-es]').forEach(el => {
    const val = el.getAttribute(lang === 'en' ? 'data-en' : 'data-es');
    if (val !== null) el.innerHTML = val;
  });

  // Sync active state on ALL lang buttons across the page
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

// Attach click handlers
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
});

// Apply saved language on load
applyLang(currentLang);

// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu?.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navMenu.classList.remove('open')));

// ===== NAV SCROLL =====
const navEl = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  navEl.style.background = window.scrollY > 20
    ? 'rgba(10,10,20,0.97)'
    : 'rgba(10,10,20,0.8)';
}, { passive: true });

// ===== SCROLL FADE-IN =====
const fadeObs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll('.feature-card, .inclusive-card, .screenshot-item, .contact-card')
  .forEach(el => { el.classList.add('fade-in'); fadeObs.observe(el); });

// ===== SCREENSHOT IMAGES =====
// Hide broken images so placeholder shows through
document.querySelectorAll('.screenshot-frame img').forEach(img => {
  img.addEventListener('error', () => { img.style.display = 'none'; });
  img.addEventListener('load',  () => { img.style.display = 'block'; img.style.zIndex = '1'; });
});

// ===== SCREENSHOT DRAG SCROLL =====
const scrollContainer = document.getElementById('screenshotTrack')?.parentElement;
if (scrollContainer) {
  let down = false, startX, scrollLeft;
  scrollContainer.addEventListener('mousedown', e => {
    down = true; startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft; scrollContainer.style.cursor = 'grabbing';
  });
  scrollContainer.addEventListener('mouseleave', () => { down = false; scrollContainer.style.cursor = ''; });
  scrollContainer.addEventListener('mouseup',    () => { down = false; scrollContainer.style.cursor = ''; });
  scrollContainer.addEventListener('mousemove',  e => {
    if (!down) return; e.preventDefault();
    scrollContainer.scrollLeft = scrollLeft - (e.pageX - scrollContainer.offsetLeft - startX) * 1.5;
  });
}
