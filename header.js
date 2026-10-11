/* ── header.js — shared site nav ──
   Every page has <nav class="nav" id="site-nav"></nav> followed by this script,
   so the menu is written once here instead of copied into each page.
   Optional data-cta on the <nav> picks the right-hand button:
     (none)          → "Download" (App Store)
     "download-ios"  → "Download iOS" (waitlist page)
     "contact"       → "Get in touch" (partnerships page)
     "none"          → no button (investors, legal, ticket status) */
(function () {
  var nav = document.getElementById('site-nav');
  if (!nav) return;

  var APP_STORE = 'https://apps.apple.com/app/finiverse/id6648789225';
  var CHEVRON = '<svg class="nav-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

  var ctas = {
    'download':     '<a href="' + APP_STORE + '" class="btn btn-primary btn-sm" target="_blank" rel="noopener" data-en="Download" data-es="Descargar">Download</a>',
    'download-ios': '<a href="' + APP_STORE + '" class="btn btn-primary btn-sm" target="_blank" rel="noopener" data-en="Download iOS" data-es="Descargar iOS">Download iOS</a>',
    'contact':      '<a href="contact.html" class="btn btn-primary btn-sm" data-en="Get in touch" data-es="Contáctanos">Get in touch</a>',
    'none':         ''
  };
  var cta = ctas[nav.getAttribute('data-cta') || 'download'] || ctas['download'];

  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');

  nav.innerHTML = [
    '<div class="nav-inner">',
    '  <a href="/" class="nav-logo">',
    '    <img src="images/app-icon.png" alt="Finiverse" width="32" height="32" style="border-radius:8px;object-fit:cover" />',
    '    <span class="nav-logo-text">Finiverse</span>',
    '  </a>',

    '  <div class="nav-links" id="navMenu">',
    '    <a href="/" data-en="Home" data-es="Inicio">Home</a>',

    '    <div class="nav-dropdown">',
    '      <button class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">',
    '        <span data-en="Product" data-es="Producto">Product</span>' + CHEVRON,
    '      </button>',
    '      <div class="nav-dropdown-panel">',
    '        <a href="features.html" data-en="Features" data-es="Funciones">Features</a>',
    '        <a href="features.html#sam-ai" data-en="Sam AI" data-es="Sam IA">Sam AI</a>',
    '        <a href="waitlist.html" data-en="Waitlist" data-es="Lista de espera">Waitlist</a>',
    '      </div>',
    '    </div>',

    '    <a href="pricing.html" data-en="Pricing" data-es="Planes">Pricing</a>',

    '    <div class="nav-dropdown">',
    '      <button class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">',
    '        <span data-en="Resources" data-es="Recursos">Resources</span>' + CHEVRON,
    '      </button>',
    '      <div class="nav-dropdown-panel">',
    '        <a href="help.html" data-en="Help Center" data-es="Centro de Ayuda">Help Center</a>',
    '        <a href="resources.html" data-en="Guides &amp; Articles" data-es="Guías y Artículos">Guides &amp; Articles</a>',
    '        <a href="press.html" data-en="Press Kit" data-es="Kit de Prensa">Press Kit</a>',
    '      </div>',
    '    </div>',

    '    <a href="about.html" data-en="About" data-es="Nosotros">About</a>',
    '    <a href="investors.html" data-en="Investors" data-es="Inversionistas">Investors</a>',
    '  </div>',

    '  <div class="nav-right">',
    '    <div class="lang-toggle" role="group" aria-label="Language selector">',
    '      <button class="lang-btn active" data-lang="en" aria-label="English">EN</button>',
    '      <button class="lang-btn" data-lang="es" aria-label="Español">ES</button>',
    '    </div>',
    '    <a href="https://finiverse-erp.web.app/landing" target="_blank" rel="noopener" class="nav-erp-badge" data-en="🏢 For Business" data-es="🏢 Para Empresas">🏢 For Business</a>',
    '    ' + cta,
    '    <button class="nav-burger" id="navBurger" aria-label="Toggle menu" aria-expanded="false">',
    '      <span></span><span></span><span></span>',
    '    </button>',
    '  </div>',
    '</div>'
  ].join('\n');
})();
