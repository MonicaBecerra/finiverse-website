/* Finiverse click event tracking (fires only when GA is loaded via consent.js) */
(function () {
  function track(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  }

  function device() {
    var ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'ios';
    if (/Android/.test(ua)) return 'android';
    return 'desktop';
  }

  function lang() {
    return document.documentElement.getAttribute('lang') === 'es' ? 'es' : 'en';
  }

  var TXT = {
    en: {
      qrTitle: 'Scan with your iPhone',
      qrText: 'Point your phone camera at the code to open Finiverse in the App Store.',
      qrLink: 'Open the App Store here instead',
      anTitle: 'Finiverse for Android is coming',
      anText: 'It is on iPhone today. Join the waitlist and we will tell you when it arrives on Android.',
      anBtn: 'Join the waitlist',
      close: 'Close'
    },
    es: {
      qrTitle: 'Escanéalo con tu iPhone',
      qrText: 'Apunta la cámara de tu teléfono al código para abrir Finiverse en el App Store.',
      qrLink: 'Abrir el App Store aquí',
      anTitle: 'Finiverse para Android ya viene',
      anText: 'Hoy está en iPhone. Únete a la lista de espera y te avisamos cuando llegue a Android.',
      anBtn: 'Unirme a la lista',
      close: 'Cerrar'
    }
  };

  function showDownload(dev, href, pg) {
    var t = TXT[lang()];
    var old = document.getElementById('dl-modal');
    if (old) old.remove();
    var body = dev === 'android'
      ? '<h2 id="dl-modal-h">' + t.anTitle + '</h2><p>' + t.anText + '</p>' +
        '<a class="btn btn-primary" href="waitlist.html" data-track-event="download_android_waitlist">' + t.anBtn + '</a>'
      : '<h2 id="dl-modal-h">' + t.qrTitle + '</h2>' +
        '<img src="images/qr-app-store.svg" width="200" height="200" alt="QR: App Store" />' +
        '<p>' + t.qrText + '</p>' +
        '<a href="' + href + '" target="_blank" rel="noopener" data-dl-direct>' + t.qrLink + '</a>';
    var m = document.createElement('div');
    m.id = 'dl-modal';
    m.setAttribute('role', 'dialog');
    m.setAttribute('aria-modal', 'true');
    m.setAttribute('aria-labelledby', 'dl-modal-h');
    m.innerHTML = '<div class="dl-modal-card"><button type="button" class="dl-modal-x" aria-label="' + t.close + '">×</button>' + body + '</div>';
    m.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,10,40,.55);';
    var c = m.firstChild;
    c.style.cssText = 'position:relative;max-width:360px;width:100%;background:#fff;color:#1f1640;border-radius:20px;padding:28px 24px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.25);font-size:15px;line-height:1.5;';
    var x = c.querySelector('.dl-modal-x');
    x.style.cssText = 'position:absolute;top:8px;right:12px;border:0;background:none;font-size:28px;line-height:1;cursor:pointer;color:#6b6585;padding:8px;';
    var img = c.querySelector('img');
    if (img) img.style.cssText = 'display:block;margin:12px auto;width:200px;height:200px;';
    var h = c.querySelector('h2');
    h.style.cssText = 'margin:0 0 8px;font-size:20px;';
    function close() { m.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(ev) { if (ev.key === 'Escape') close(); }
    m.addEventListener('click', function (ev) { if (ev.target === m || ev.target === x) close(); });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(m);
    x.focus();
    track(dev === 'android' ? 'download_android_shown' : 'download_qr_shown', { page: pg });
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

    /* ── App Store downloads ──
       iPhone/iPad go straight to the App Store. On a computer the App Store
       page is a dead end, so we show a QR to scan with the phone; on Android
       (no Play listing yet) we point to the waitlist. */
    if (href.indexOf('apps.apple.com') !== -1) {
      var dev = device();
      track('download_click', {
        page:        pg,
        device:      dev,
        button_text: (el.textContent || '').trim().slice(0, 60)
      });
      if (dev !== 'ios' && !el.hasAttribute('data-dl-direct')) {
        e.preventDefault();
        showDownload(dev, href, pg);
      }
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
