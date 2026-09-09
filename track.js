/* Finiverse click event tracking (fires only when GA is loaded via consent.js) */
(function () {
  function track(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  }

  function page() {
    var p = window.location.pathname.replace(/.*\//, '').replace('.html', '');
    return p || 'home';
  }

  document.addEventListener('click', function (e) {
    var el = e.target;
    /* Walk up to find the nearest anchor or button */
    while (el && el !== document.body) {
      if (el.tagName === 'A' || el.tagName === 'BUTTON') break;
      el = el.parentElement;
    }
    if (!el || el === document.body) return;

    var href = el.getAttribute('href') || '';
    var pg   = page();

    /* ── App Store downloads ── */
    if (href.indexOf('apps.apple.com') !== -1) {
      track('download_click', {
        page:        pg,
        button_text: (el.textContent || '').trim().slice(0, 60)
      });
      return;
    }

    /* ── Press inquiry ── */
    if (href.indexOf('subject=Press') !== -1) {
      track('press_contact_click', { page: pg });
      return;
    }

    /* ── Investor inquiry ── */
    if (href.indexOf('subject=Investor') !== -1) {
      track('investor_contact_click', { page: pg });
      return;
    }

    /* ── Pitch deck request buttons ── */
    var id = el.id || '';
    if (id.indexOf('openDeckModalBtn') !== -1 || id === 'deckSubmitBtn') {
      track('deck_request_click', { page: pg, step: id });
      return;
    }

    /* ── data-track-event (pricing plan CTAs, etc.) ── */
    var trackEl = el.dataset && el.dataset.trackEvent
      ? el
      : (el.closest ? el.closest('[data-track-event]') : null);
    if (trackEl && trackEl.dataset.trackEvent) {
      track(trackEl.dataset.trackEvent, {
        label: trackEl.dataset.trackLabel || '',
        page:  pg
      });
    }
  }, true); /* capture phase — fires before navigation */
})();
