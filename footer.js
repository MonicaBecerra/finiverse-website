/* ── footer.js — shared site footer ── */
(function () {
  var el = document.getElementById('site-footer');
  if (!el) return;

  el.innerHTML = [
    '<div class="footer-inner">',

    '  <!-- top row: brand + download -->',
    '  <div class="footer-header">',
    '    <div class="footer-header-brand">',
    '      <a href="index.html" class="footer-logo-link">',
    '        <img src="images/app-icon.png" alt="Finiverse" width="32" height="32" style="border-radius:9px;object-fit:cover">',
    '        <span class="footer-logo-text">Finiverse</span>',
    '      </a>',
    '      <p class="footer-tagline" data-en="Personal finance for every mind." data-es="Finanzas personales para toda mente.">Personal finance for every mind.</p>',
    '    </div>',
    '    <div class="footer-header-right">',
    '      <div class="footer-socials">',
    '        <a href="https://instagram.com/hello.finiverse" class="footer-social-link" target="_blank" rel="noopener" aria-label="Instagram">',
    '          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    '        </a>',
    '        <a href="https://linkedin.com/company/FiniverseApp" class="footer-social-link" target="_blank" rel="noopener" aria-label="LinkedIn">',
    '          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    '        </a>',
    '        <a href="mailto:hello.finiverse@outlook.com" class="footer-social-link" aria-label="Email">',
    '          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    '        </a>',
    '      </div>',
    '      <a href="https://apps.apple.com/app/finiverse/id6648789225" class="footer-appstore-btn" target="_blank" rel="noopener">',
    '        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>',
    '        <span data-en="Download on App Store" data-es="Descargar en App Store">Download on App Store</span>',
    '      </a>',
    '    </div>',
    '  </div>',

    '  <div class="footer-rule"></div>',

    '  <!-- nav columns -->',
    '  <div class="footer-nav">',

    '    <nav class="footer-col" aria-label="Product">',
    '      <h4 data-en="Product" data-es="Producto">Product</h4>',
    '      <ul>',
    '        <li><a href="features.html" data-en="Features" data-es="Funciones">Features</a></li>',
    '        <li><a href="features.html#sam-ai" data-en="Sam AI" data-es="Sam IA">Sam AI</a></li>',
    '        <li><a href="pricing.html" data-en="Pricing" data-es="Planes">Pricing</a></li>',
    '        <li><a href="waitlist.html" data-en="Waitlist" data-es="Lista de espera">Waitlist</a></li>',
    '      </ul>',
    '    </nav>',

    '    <nav class="footer-col" aria-label="Resources">',
    '      <h4 data-en="Resources" data-es="Recursos">Resources</h4>',
    '      <ul>',
    '        <li><a href="help.html" data-en="Help Center" data-es="Centro de Ayuda">Help Center</a></li>',
    '        <li><a href="faq.html" data-en="FAQ" data-es="Preguntas frecuentes">FAQ</a></li>',
    '        <li><a href="resources.html" data-en="Guides &amp; Articles" data-es="Guías y Artículos">Guides &amp; Articles</a></li>',
    '        <li><a href="press.html" data-en="Press Kit" data-es="Kit de Prensa">Press Kit</a></li>',
    '        <li><a href="waitlist.html" data-en="Waitlist" data-es="Lista de espera">Waitlist</a></li>',
    '      </ul>',
    '    </nav>',

    '    <nav class="footer-col" aria-label="Company">',
    '      <h4 data-en="Company" data-es="Empresa">Company</h4>',
    '      <ul>',
    '        <li><a href="about.html" data-en="About" data-es="Nosotros">About</a></li>',
    '        <li><a href="investors.html" data-en="Investors" data-es="Inversionistas">Investors</a></li>',
    '        <li><a href="careers.html" data-en="Careers" data-es="Trabaja con nosotros">Careers</a></li>',
    '      </ul>',
    '    </nav>',

    '    <nav class="footer-col" aria-label="Legal">',
    '      <h4 data-en="Legal" data-es="Legal">Legal</h4>',
    '      <ul>',
    '        <li><a href="privacy.html" data-en="Privacy Policy" data-es="Privacidad">Privacy Policy</a></li>',
    '        <li><a href="terms.html" data-en="Terms of Service" data-es="Términos">Terms of Service</a></li>',
    '        <li><a href="cookies.html" data-en="Cookie Policy" data-es="Cookies">Cookie Policy</a></li>',
    '      </ul>',
    '    </nav>',

    '  </div>',

    '  <!-- bottom bar -->',
    '  <div class="footer-bottom">',
    '    <span data-en="© 2026 Finiverse · BeGoTech" data-es="© 2026 Finiverse · BeGoTech">© 2026 Finiverse · BeGoTech</span>',
    '    <div class="lang-toggle" style="flex-shrink:0">',
    '      <button class="lang-btn" data-lang="en">EN</button>',
    '      <button class="lang-btn" data-lang="es">ES</button>',
    '    </div>',
    '  </div>',

    '</div>'
  ].join('\n');
})();
