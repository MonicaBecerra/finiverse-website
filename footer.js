/* ── footer.js — shared site footer ──
   Every page has <footer id="site-footer" class="footer"></footer> + this script.
   Pages load it as footer.js?v=YYYYMMDD — bump that date in every page after
   changing it, or browsers keep showing the cached one. */
(function () {
  var el = document.getElementById('site-footer');
  if (!el) return;

  var APP_STORE = 'https://apps.apple.com/app/finiverse/id6648789225';
  var APPLE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>';
  var ANDROID = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.64.64 0 0 0-.83.22l-1.88 3.24a11.46 11.46 0 0 0-8.94 0L5.65 5.67a.64.64 0 0 0-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"/></svg>';
  var ICON = 'width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

  el.innerHTML = [
    '<div class="footer-inner">',

    '  <div class="footer-top">',

    '    <!-- brand: who it is for + where to get it -->',
    '    <div class="footer-brand">',
    '      <a href="index.html" class="footer-logo-link">',
    '        <img src="images/app-icon.png" alt="" width="32" height="32" style="border-radius:9px;object-fit:cover">',
    '        <span>Finiverse</span>',
    '      </a>',
    '      <p class="footer-tagline" data-en="Personal finance for every mind." data-es="Finanzas personales para toda mente.">Personal finance for every mind.</p>',
    '      <p class="footer-for" data-en="Made for ADHD, anxiety, dyscalculia and autism." data-es="Hecha para TDAH, ansiedad, discalculia y autismo.">Made for ADHD, anxiety, dyscalculia and autism.</p>',
    '      <div class="footer-stores">',
    '        <a href="' + APP_STORE + '" class="footer-store" target="_blank" rel="noopener">' + APPLE,
    '          <span><small data-en="Download on the" data-es="Descarga en el">Download on the</small><b>App Store</b></span>',
    '        </a>',
    '        <a href="waitlist.html?p=android-beta" class="footer-store footer-store-android">' + ANDROID,
    '          <span><small>Android · Beta</small><b data-en="Become a tester" data-es="Sé tester">Become a tester</b></span>',
    '        </a>',
    '      </div>',
    '      <div class="footer-socials">',
    '        <a href="https://instagram.com/hello.finiverse" class="footer-social-link" target="_blank" rel="noopener" aria-label="Instagram"><svg ' + ICON + '><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>',
    '        <a href="https://www.tiktok.com/@finiverseapp" class="footer-social-link" target="_blank" rel="noopener" aria-label="TikTok"><svg ' + ICON + '><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>',
    '        <a href="https://facebook.com/hello.finiverse" class="footer-social-link" target="_blank" rel="noopener" aria-label="Facebook"><svg ' + ICON + '><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>',
    '        <a href="https://linkedin.com/company/FiniverseApp" class="footer-social-link" target="_blank" rel="noopener" aria-label="LinkedIn"><svg ' + ICON + '><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>',
    '        <a href="mailto:hello@finiverseapp.com" class="footer-social-link" aria-label="Email"><svg ' + ICON + '><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>',
    '      </div>',
    '    </div>',

    '    <!-- link columns -->',
    '    <div class="footer-nav">',

    '      <nav class="footer-col" aria-label="Product">',
    '        <h4 data-en="Product" data-es="Producto">Product</h4>',
    '        <ul>',
    '          <li><a href="features.html" data-en="Features" data-es="Funciones">Features</a></li>',
    '          <li><a href="pricing.html" data-en="Pricing" data-es="Planes">Pricing</a></li>',
    '          <li><a href="changelog.html" data-en="What\'s New" data-es="Novedades">What\'s New</a></li>',
    '          <li><a href="waitlist.html" data-en="Waitlist" data-es="Lista de espera">Waitlist</a></li>',
    '          <li><a href="research.html" data-en="Research" data-es="Investigación">Research</a></li>',
    '        </ul>',
    '      </nav>',

    '      <nav class="footer-col" aria-label="Help">',
    '        <h4 data-en="Help" data-es="Ayuda">Help</h4>',
    '        <ul>',
    '          <li><a href="help.html" data-en="Help Center" data-es="Centro de Ayuda">Help Center</a></li>',
    '          <li><a href="contact.html" data-en="Contact" data-es="Contacto">Contact</a></li>',
    '          <li><a href="resources.html" data-en="Guides &amp; Articles" data-es="Guías y Artículos">Guides &amp; Articles</a></li>',
    '        </ul>',
    '      </nav>',

    '      <nav class="footer-col" aria-label="Company">',
    '        <h4 data-en="Company" data-es="Empresa">Company</h4>',
    '        <ul>',
    '          <li><a href="about.html" data-en="About" data-es="Nosotros">About</a></li>',
    '          <li><a href="investors.html" data-en="Investors" data-es="Inversionistas">Investors</a></li>',
    '          <li><a href="press.html" data-en="Press Kit" data-es="Kit de Prensa">Press Kit</a></li>',
    '          <li><a href="https://finiverse-erp.web.app/landing" target="_blank" rel="noopener" data-en="For Business <span class=\'footer-ext\'>↗</span>" data-es="Para Empresas <span class=\'footer-ext\'>↗</span>">For Business <span class="footer-ext">↗</span></a></li>',
    '        </ul>',
    '      </nav>',

    '      <nav class="footer-col" aria-label="Legal">',
    '        <h4 data-en="Legal" data-es="Legal">Legal</h4>',
    '        <ul>',
    '          <li><a href="privacy.html" data-en="Privacy Policy" data-es="Privacidad">Privacy Policy</a></li>',
    '          <li><a href="terms.html" data-en="Terms of Service" data-es="Términos">Terms of Service</a></li>',
    '          <li><a href="cookies.html" data-en="Cookie Policy" data-es="Cookies">Cookie Policy</a></li>',
    '          <li><button type="button" class="footer-linkbtn" id="footerCookiePrefs" data-en="Cookie settings" data-es="Ajustes de cookies">Cookie settings</button></li>',
    '        </ul>',
    '      </nav>',

    '    </div>',
    '  </div>',

    '  <!-- bottom: company details + language -->',
    '  <div class="footer-bottom">',
    '    <div class="footer-legal">',
    '      <p>© 2026 <span class="fltd-wm"><span class="fltd-name">Finiverse</span><span class="fltd-rule"></span><span class="fltd-suffix">LTD</span></span> · <span data-en="Registered in England &amp; Wales · Co. no.&nbsp;17440736" data-es="Registrada en Inglaterra y Gales · Co. no.&nbsp;17440736">Registered in England &amp; Wales · Co. no.&nbsp;17440736</span></p>',
    '      <p data-en="71-75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom" data-es="71-75 Shelton Street, Covent Garden, Londres WC2H 9JQ, Reino Unido">71-75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom</p>',
    '    </div>',
    '    <div class="lang-toggle" role="group" aria-label="Language selector" style="flex-shrink:0">',
    '      <button class="lang-btn" data-lang="en" aria-label="English">EN</button>',
    '      <button class="lang-btn" data-lang="es" aria-label="Español">ES</button>',
    '    </div>',
    '  </div>',

    '</div>'
  ].join('\n');

  // Reopen the analytics consent banner (consent.js); hide the button on pages without it
  var prefs = document.getElementById('footerCookiePrefs');
  if (prefs) {
    if (typeof window.fvCookiePrefs === 'function') {
      prefs.addEventListener('click', function () { window.fvCookiePrefs(); });
    } else {
      prefs.parentElement.style.display = 'none';
    }
  }
})();
