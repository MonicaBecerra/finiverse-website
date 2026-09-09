/* Cookie consent + conditional Google Analytics */
(function () {
  var KEY = 'fv_analytics';
  var GA  = 'G-K25B6JP5S6';

  function loadGA() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA, {
      page_title:    document.title,
      page_location: window.location.href,
      page_path:     window.location.pathname,
      anonymize_ip:  true
    });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
    document.head.appendChild(s);
  }

  function removeBanner() {
    var b = document.getElementById('fv-cb');
    if (b) b.remove();
  }

  function showBanner() {
    if (document.getElementById('fv-cb')) return;
    var b = document.createElement('div');
    b.id = 'fv-cb';
    /* Resolve cookies.html path relative to current page (all pages sit at root) */
    var cookieLink = 'cookies.html';
    b.innerHTML =
      '<style>' +
      '#fv-cb{position:fixed;bottom:0;left:0;right:0;background:#1a1a2e;color:#e2e8f0;' +
        'padding:14px 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;' +
        'z-index:9999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
        'font-size:13px;line-height:1.5;box-shadow:0 -2px 12px rgba(0,0,0,.3)}' +
      '#fv-cb p{margin:0;flex:1;min-width:220px}' +
      '#fv-cb a{color:#a5b4fc;text-decoration:underline}' +
      '.fv-cb-btns{display:flex;gap:8px;flex-shrink:0}' +
      '.fv-cb-btns button{border:none;border-radius:8px;padding:8px 18px;' +
        'font-size:13px;font-weight:600;cursor:pointer;line-height:1}' +
      '#fv-cb-ok{background:#6366f1;color:#fff}' +
      '#fv-cb-ok:hover{background:#4f46e5}' +
      '#fv-cb-no{background:transparent;color:#94a3b8;border:1px solid #475569!important}' +
      '#fv-cb-no:hover{color:#e2e8f0}' +
      '</style>' +
      '<p>We use Google Analytics to understand how people find and use this site — no advertising, ' +
        'no personal data sold. <a href="' + cookieLink + '">Cookie policy</a></p>' +
      '<div class="fv-cb-btns">' +
        '<button id="fv-cb-no">Reject</button>' +
        '<button id="fv-cb-ok">Accept analytics</button>' +
      '</div>';
    document.body.appendChild(b);

    document.getElementById('fv-cb-ok').onclick = function () {
      localStorage.setItem(KEY, '1');
      removeBanner();
      loadGA();
    };
    document.getElementById('fv-cb-no').onclick = function () {
      localStorage.setItem(KEY, '0');
      removeBanner();
    };
  }

  /* Public API: reset and re-show (called from cookies.html) */
  window.fvCookiePrefs = function () {
    localStorage.removeItem(KEY);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  };

  var stored = localStorage.getItem(KEY);
  if (stored === '1') {
    /* Consent given — load GA immediately */
    loadGA();
  } else if (stored === null) {
    /* No decision yet — show banner after DOM is ready */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
  /* stored === '0' → rejected, GA stays off */
})();
