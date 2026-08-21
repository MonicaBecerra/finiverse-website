/* article-views.js — read counter for blog articles using Firestore REST API */
(function () {
  var PROJ   = 'fintrack-6948a';
  var KEY    = 'AIzaSyDqeIpLSJ3yc0kA2l9rhDmOvNiAmDPoAks';
  var slug   = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  var docPath = 'projects/' + PROJ + '/databases/(default)/documents/article_views/' + slug;
  var readUrl  = 'https://firestore.googleapis.com/v1/' + docPath + '?key=' + KEY;
  var commitUrl = 'https://firestore.googleapis.com/v1/projects/' + PROJ +
                  '/databases/(default)/documents:commit?key=' + KEY;

  async function run() {
    /* 1. Increment atomically (create-or-update via FieldTransform) */
    try {
      await fetch(commitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          writes: [{
            transform: {
              document: docPath,
              fieldTransforms: [{ fieldPath: 'views', increment: { integerValue: '1' } }]
            }
          }]
        })
      });
    } catch (_) { /* silently ignore — network or rules error */ }

    /* 2. Read updated count and render */
    try {
      var res = await fetch(readUrl);
      if (!res.ok) return;
      var data = await res.json();
      if (!data.fields || !data.fields.views) return;
      var count = parseInt(data.fields.views.integerValue || 0, 10);
      var el = document.getElementById('article-view-count');
      if (!el || count < 1) return;
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
