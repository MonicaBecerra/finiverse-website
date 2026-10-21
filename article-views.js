/* article-views.js — read counter for blog articles.
   Reads are recorded by the recordArticleView Cloud Function (it validates every
   field; Firestore rules don't let browsers write the counters) and the total is
   read from Firestore article_views/{slug}. Besides the total, it keeps an anonymous breakdown per article (no cookies,
   no IP, nothing personal): where the reader came from (src), approximate
   region from the browser time zone (tz), language (lang), device (dev),
   reads per day (day) and first-time readers on this browser (uniques).
   A read is counted once per browser session, only on finiverseapp.com.
   Open any page once with ?fvowner=1 to stop counting your own visits on
   that browser (?fvowner=0 undoes it). */
(function () {
  var PROJ   = 'fintrack-6948a';
  var KEY    = 'AIzaSyDqeIpLSJ3yc0kA2l9rhDmOvNiAmDPoAks';
  var slug   = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  var docPath = 'projects/' + PROJ + '/databases/(default)/documents/article_views/' + slug;
  var readUrl  = 'https://firestore.googleapis.com/v1/' + docPath + '?key=' + KEY;
  var recordUrl = 'https://us-central1-' + PROJ + '.cloudfunctions.net/recordArticleView';

  function store(kind) {
    try { return window[kind]; } catch (_) { return null; }
  }
  function get(kind, k) {
    try { var s = store(kind); return s ? s.getItem(k) : null; } catch (_) { return null; }
  }
  function set(kind, k, v) {
    try { var s = store(kind); if (s) s.setItem(k, v); } catch (_) {}
  }
  function del(kind, k) {
    try { var s = store(kind); if (s) s.removeItem(k); } catch (_) {}
  }

  var params = new URLSearchParams(window.location.search);
  if (params.get('fvowner') === '1') set('localStorage', 'fv_owner', '1');
  if (params.get('fvowner') === '0') del('localStorage', 'fv_owner');

  /* Firestore map key: letters, digits and underscores, not starting with a digit */
  function key(s) {
    var k = String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 60);
    if (!k) return 'other';
    return /^[0-9]/.test(k) ? 'n' + k : k;
  }

  var REFERRERS = [
    [/(^|\.)(chatgpt\.com|openai\.com)$/, 'chatgpt'],
    [/(^|\.)perplexity\.ai$/, 'perplexity'],
    [/(^|\.)claude\.ai$/, 'claude'],
    [/^gemini\.google\.com$/, 'gemini'],
    [/(^|\.)copilot\.microsoft\.com$/, 'copilot'],
    [/(^|\.)google\.[a-z.]+$|googlequicksearchbox/, 'google'],
    [/(^|\.)bing\.com$/, 'bing'],
    [/(^|\.)duckduckgo\.com$/, 'duckduckgo'],
    [/(^|\.)yahoo\.[a-z.]+$/, 'yahoo'],
    [/(^|\.)ecosia\.org$/, 'ecosia'],
    [/(^|\.)instagram\.com$|com\.instagram/, 'instagram'],
    [/(^|\.)(facebook\.com|fb\.me)$|com\.facebook/, 'facebook'],
    [/(^|\.)tiktok\.com$|musically|com\.zhiliaoapp/, 'tiktok'],
    [/(^|\.)(t\.co|twitter\.com|x\.com)$/, 'x'],
    [/(^|\.)(linkedin\.com|lnkd\.in)$/, 'linkedin'],
    [/(^|\.)(whatsapp\.com|wa\.me)$|com\.whatsapp/, 'whatsapp'],
    [/(^|\.)reddit\.com$/, 'reddit'],
    [/(^|\.)youtube\.com$/, 'youtube'],
    [/(^|\.)pinterest\.[a-z.]+$/, 'pinterest'],
    [/(^|\.)threads\.(net|com)$/, 'threads'],
    [/mail\.|outlook\.|com\.google\.android\.gm/, 'email']
  ];

  function source() {
    var utm = params.get('utm_source') || params.get('src');
    if (utm) return key(utm.replace(/\.(com|ai|net|org)$/i, ''));
    var ua = navigator.userAgent || '';
    if (/Instagram/.test(ua)) return 'instagram';
    if (/FBAN|FBAV|FB_IAB/.test(ua)) return 'facebook';
    if (/musical_ly|BytedanceWebview|TikTok/i.test(ua)) return 'tiktok';
    if (/LinkedInApp/.test(ua)) return 'linkedin';
    var ref = document.referrer;
    if (!ref) return 'direct';
    var host;
    try { host = new URL(ref).hostname.replace(/^www\./, ''); } catch (_) { return 'other'; }
    if (!host) return 'other';
    if (host === window.location.hostname.replace(/^www\./, '')) return 'internal';
    for (var i = 0; i < REFERRERS.length; i++) {
      if (REFERRERS[i][0].test(host)) return REFERRERS[i][1];
    }
    return 'site_' + key(host);
  }

  function device() {
    var ua = navigator.userAgent || '';
    if (/iPad|Tablet/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'tablet';
    if (/Mobi|iPhone|Android/i.test(ua)) return 'mobile';
    return 'desktop';
  }

  function shouldCount() {
    var host = window.location.hostname;
    if (host !== 'finiverseapp.com' && host !== 'www.finiverseapp.com') return false;
    if (get('localStorage', 'fv_owner') === '1') return false;
    if (navigator.webdriver) return false;
    if (/bot|crawl|spider|slurp|headless|lighthouse|preview/i.test(navigator.userAgent || '')) return false;
    if (get('sessionStorage', 'fv_read_' + slug)) return false;
    return true;
  }

  function payload() {
    var tz = 'unknown';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown'; } catch (_) {}
    return {
      slug: slug,
      src: source(),
      tz: tz,
      lang: (navigator.language || 'unknown').slice(0, 2),
      dev: device(),
      first: !get('localStorage', 'fv_seen_' + slug)
    };
  }

  async function run() {
    /* 1. Record the read (text/plain avoids a CORS preflight) */
    var count = null;
    if (shouldCount()) {
      try {
        var res0 = await fetch(recordUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload())
        });
        if (res0.ok) {
          set('sessionStorage', 'fv_read_' + slug, '1');
          set('localStorage', 'fv_seen_' + slug, '1');
          var out = await res0.json();
          if (typeof out.views === 'number') count = out.views;
        }
      } catch (_) { /* silently ignore — network error */ }
    }

    /* 2. Render the count (read it if the function didn't return it) */
    try {
      if (count === null) {
        var res = await fetch(readUrl + '&mask.fieldPaths=views');
        if (!res.ok) return;
        var data = await res.json();
        if (!data.fields || !data.fields.views) return;
        count = parseInt(data.fields.views.integerValue || 0, 10);
      }
      var el = document.getElementById('article-view-count');
      if (!el || count < 1) return;
      el.dataset.count = count;
      var lang = document.documentElement.getAttribute('data-lang') || 'en';
      el.textContent = lang === 'es'
        ? count.toLocaleString('es') + ' lecturas'
        : count.toLocaleString('en') + ' reads';
    } catch (_) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  /* Re-run label when language toggles */
  document.addEventListener('langchange', function () {
    var el = document.getElementById('article-view-count');
    if (!el || !el.dataset.count) return;
    var lang = document.documentElement.getAttribute('data-lang') || 'en';
    var count = parseInt(el.dataset.count, 10);
    el.textContent = lang === 'es'
      ? count.toLocaleString('es') + ' lecturas'
      : count.toLocaleString('en') + ' reads';
  });
})();
