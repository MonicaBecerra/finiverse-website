/* ── inapp-notice.js — detecta navegadores integrados (WhatsApp, Instagram, etc.)
   y sugiere abrir en el navegador real, donde la página carga más rápido y completa ── */
(function () {
  function isLikelyInAppBrowser() {
    var ua = navigator.userAgent || '';
    var isIOS = /iPhone|iPad|iPod/.test(ua);
    var isIOSWebViewNoSafari = isIOS && /WebKit/.test(ua) && !/Safari/.test(ua);
    var isAndroidWebView = /Android/.test(ua) && /; ?wv\)/.test(ua);
    var hasKnownAppToken = /FBAN|FBAV|Instagram|Line\/|MicroMessenger/.test(ua);
    return isIOSWebViewNoSafari || isAndroidWebView || hasKnownAppToken;
  }

  if (!isLikelyInAppBrowser()) return;
  if (sessionStorage.getItem('finiverse-inapp-dismissed')) return;

  function init() {
    var lang = document.documentElement.getAttribute('data-lang') || localStorage.getItem('finiverse-lang') || 'en';
    var text = lang === 'es'
      ? 'Para la mejor experiencia, toca ⋯ y elige "Abrir en el navegador".'
      : 'For the best experience, tap ⋯ and choose "Open in browser".';

    var bar = document.createElement('div');
    bar.className = 'inapp-notice';
    var span = document.createElement('span');
    span.textContent = text;
    var btn = document.createElement('button');
    btn.className = 'inapp-notice-close';
    btn.setAttribute('aria-label', 'Close');
    btn.textContent = '✕';
    bar.appendChild(span);
    bar.appendChild(btn);
    document.body.insertBefore(bar, document.body.firstChild);

    btn.addEventListener('click', function () {
      bar.remove();
      try { sessionStorage.setItem('finiverse-inapp-dismissed', '1'); } catch (e) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
