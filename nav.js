/* ── nav.js — mobile nav + scroll behavior ── */
(function () {
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('navMenu');
  const nav    = document.querySelector('.nav');

  burger?.addEventListener('click', () => {
    menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', menu.classList.contains('open'));
  });

  // Close mobile menu when plain nav links are clicked
  menu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });

  // Dropdown toggle (click — works on both mobile and keyboard users)
  document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
    const dropdown = trigger.closest('.nav-dropdown');
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      document.querySelectorAll('.nav-dropdown').forEach(d => {
        d.classList.remove('open');
        d.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        dropdown.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns when a panel link is clicked
  document.querySelectorAll('.nav-dropdown-panel a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
      menu?.classList.remove('open');
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
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
