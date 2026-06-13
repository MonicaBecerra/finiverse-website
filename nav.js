/* ── nav.js — mobile nav + scroll behavior ── */
(function () {
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('navMenu');
  const nav    = document.querySelector('.nav');

  burger?.addEventListener('click', () => {
    menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', menu.classList.contains('open'));
  });

  menu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Screenshot drag scroll
  const scrollWrap = document.querySelector('.screenshots-scroll');
  if (scrollWrap) {
    let isDown = false, startX, scrollLeft;
    scrollWrap.addEventListener('mousedown',  e => { isDown = true; scrollWrap.style.cursor = 'grabbing'; startX = e.pageX - scrollWrap.offsetLeft; scrollLeft = scrollWrap.scrollLeft; });
    scrollWrap.addEventListener('mouseleave', () => { isDown = false; scrollWrap.style.cursor = ''; });
    scrollWrap.addEventListener('mouseup',    () => { isDown = false; scrollWrap.style.cursor = ''; });
    scrollWrap.addEventListener('mousemove',  e => { if (!isDown) return; e.preventDefault(); scrollWrap.scrollLeft = scrollLeft - (e.pageX - scrollWrap.offsetLeft - startX) * 1.4; });
  }

  // Screenshot images
  document.querySelectorAll('.screenshot-screen img').forEach(img => {
    img.addEventListener('load',  () => { img.style.display = 'block'; });
    img.addEventListener('error', () => { img.style.display = 'none'; });
  });

  // Fade-in observer
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
})();
