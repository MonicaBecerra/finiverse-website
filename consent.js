/* Cookie consent + conditional Google Analytics
   GA only loads after the visitor allows it. Changing the choice later works
   in both directions: allowing loads GA right away; rejecting stops GA on the
   current page and deletes the _ga cookies it set.

   Public API (used by footer.js "Cookie settings" and the panel on cookies.html):
     window.fvConsent.get()        → 'granted' | 'denied' | null (no choice yet)
     window.fvConsent.set(bool)    → save the choice and apply it now
     window.fvConsent.open()       → show the choice again (banner, or the panel on cookies.html)
     window.fvCookiePrefs()        → same as open(), kept for older callers
   Every change fires a 'fv:consent' event on document with detail.state. */
(function () {
  var KEY = 'fv_analytics';
  var GA  = 'G-K25B6JP5S6';
  var gaLoaded = false;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }
  function state() {
    var v = read();
    return v === '1' ? 'granted' : v === '0' ? 'denied' : null;
  }
  function lang() {
    var l = null;
    try { l = localStorage.getItem('finiverse-lang'); } catch (e) {}
    l = l || document.documentElement.getAttribute('data-lang');
    return l === 'es' ? 'es' : 'en';
  }

  function loadGA() {
    window['ga-disable-' + GA] = false;
    if (gaLoaded) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      return;
    }
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    gtag('js', new Date());
    gtag('config', GA, {
      page_title:    document.title,
      page_location: window.location.href,
      page_path:     window.location.pathname,
      anonymize_ip:  true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
    document.head.appendChild(s);
  }

  /* Delete every _ga / _ga_* / _gid cookie, whichever domain GA wrote it on. */
  function clearGACookies() {
    var host = window.location.hostname;
    var parts = host.split('.');
    var domains = ['', host, '.' + host];
    for (var i = 1; i < parts.length - 1; i++) {
      var d = parts.slice(i).join('.');
      domains.push(d, '.' + d);
    }
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat)/.test(name)) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function stopGA() {
    window['ga-disable-' + GA] = true;
    if (gaLoaded && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    clearGACookies();
  }

  function set(granted) {
    write(granted ? '1' : '0');
    if (granted) loadGA(); else stopGA();
    removeBanner();
    try {
      document.dispatchEvent(new CustomEvent('fv:consent', { detail: { state: granted ? 'granted' : 'denied' } }));
    } catch (e) {}
  }

  var TEXT = {
    en: {
      label: 'Cookie choice',
      body: 'We use Google Analytics to see how people find and use this site. No advertising, and nothing is sold. It stays off unless you allow it.',
      current: { granted: 'Right now: analytics allowed.', denied: 'Right now: analytics off.' },
      link: 'Cookie policy',
      no: 'Reject',
      ok: 'Allow analytics'
    },
    es: {
      label: 'Elección de cookies',
      body: 'Usamos Google Analytics para ver cómo la gente encuentra y usa este sitio. Sin publicidad y sin vender nada. Queda apagado a menos que lo permitas.',
      current: { granted: 'Ahora: analítica permitida.', denied: 'Ahora: analítica desactivada.' },
      link: 'Política de cookies',
      no: 'Rechazar',
      ok: 'Permitir analítica'
    }
  };

  function removeBanner() {
    var b = document.getElementById('fv-cb');
    if (b) b.remove();
  }

  function showBanner(focus) {
    removeBanner();
    var t = TEXT[lang()];
    var cur = state();
    var b = document.createElement('div');
    b.id = 'fv-cb';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', t.label);
    b.innerHTML =
      '<style>' +
      '#fv-cb{position:fixed;left:16px;right:16px;bottom:16px;max-width:760px;margin:0 auto;' +
        'background:#1a1a2e;color:#e2e8f0;padding:16px 18px;border-radius:14px;' +
        'display:flex;align-items:center;gap:14px;flex-wrap:wrap;z-index:9999;' +
        'font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
        'font-size:14px;line-height:1.5;box-shadow:0 8px 32px rgba(0,0,0,.35)}' +
      '#fv-cb p{margin:0;flex:1 1 260px}' +
      '#fv-cb .fv-cb-cur{display:block;margin-top:4px;color:#a5b4fc;font-weight:600}' +
      '#fv-cb a{color:#a5b4fc;text-decoration:underline}' +
      '#fv-cb .fv-cb-btns{display:flex;gap:8px;flex:0 0 auto;flex-wrap:wrap}' +
      '#fv-cb button{border:1px solid transparent;border-radius:10px;padding:10px 18px;' +
        'font:inherit;font-weight:600;cursor:pointer;line-height:1;min-height:40px}' +
      '#fv-cb #fv-cb-ok{background:#6366f1;color:#fff}' +
      '#fv-cb #fv-cb-ok:hover{background:#4f46e5}' +
      '#fv-cb #fv-cb-no{background:transparent;color:#e2e8f0;border-color:#64748b}' +
      '#fv-cb #fv-cb-no:hover{border-color:#e2e8f0}' +
      '#fv-cb button:focus-visible{outline:2px solid #a5b4fc;outline-offset:2px}' +
      '@media (max-width:520px){#fv-cb{left:8px;right:8px;bottom:8px}#fv-cb .fv-cb-btns{width:100%}#fv-cb button{flex:1}}' +
      '</style>' +
      '<p>' + t.body + ' <a href="cookies.html">' + t.link + '</a>' +
        (cur ? '<span class="fv-cb-cur">' + t.current[cur] + '</span>' : '') + '</p>' +
      '<div class="fv-cb-btns">' +
        '<button type="button" id="fv-cb-no">' + t.no + '</button>' +
        '<button type="button" id="fv-cb-ok">' + t.ok + '</button>' +
      '</div>';
    document.body.appendChild(b);
    document.getElementById('fv-cb-ok').onclick = function () { set(true); };
    document.getElementById('fv-cb-no').onclick = function () { set(false); };
    if (focus) document.getElementById(cur === 'granted' ? 'fv-cb-no' : 'fv-cb-ok').focus();
  }

  function whenReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function open() {
    whenReady(function () {
      /* On cookies.html the settings panel is the better place: take the visitor there. */
      var panel = document.getElementById('cookie-settings');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        panel.classList.add('is-flash');
        setTimeout(function () { panel.classList.remove('is-flash'); }, 1200);
        var btn = panel.querySelector(state() === 'granted' ? '[data-consent="deny"]' : '[data-consent="allow"]');
        if (btn) btn.focus({ preventScroll: true });
        return;
      }
      showBanner(true);
    });
  }

  window.fvConsent = { get: state, set: set, open: open };
  window.fvCookiePrefs = open;

  var s = state();
  if (s === 'granted') {
    loadGA();
  } else if (s === 'denied') {
    whenReady(clearGACookies);
  } else {
    whenReady(function () {
      /* The cookies page shows its own panel, so no banner on top of it. */
      if (!document.getElementById('cookie-settings')) showBanner(false);
    });
  }
})();
