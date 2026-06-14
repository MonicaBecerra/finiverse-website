/* ── firebase-contact.js ── */
/* Firestore REST API for contact form submissions.
   Uses ticket ID as document ID so status.html can look it up.

   Firestore rule required:
     match /contact_submissions/{docId} {
       allow create: if true;
       allow read:   if true;        ← change this from false
       allow update, delete: if false;
     }
*/
(function () {
  var PROJ = 'fintrack-6948a';
  var KEY  = 'AIzaSyDqeIpLSJ3yc0kA2l9rhDmOvNiAmDPoAks';
  var BASE = 'https://firestore.googleapis.com/v1/projects/' + PROJ +
             '/databases/(default)/documents/contact_submissions/';

  function str(v) { return { stringValue: String(v || '') }; }
  function ts(v)  { return { timestampValue: v }; }

  function generateTicketId() {
    var t = Date.now().toString(36).toUpperCase();
    var r = Math.random().toString(36).substring(2, 6).toUpperCase();
    return 'FNV-' + t.slice(-4) + r;
  }

  function saveLocal(ticketId, subject, category) {
    try {
      var list = JSON.parse(localStorage.getItem('finiverse-tickets') || '[]');
      list.unshift({ id: ticketId, subject: subject, category: category, date: new Date().toISOString() });
      if (list.length > 10) list.pop();
      localStorage.setItem('finiverse-tickets', JSON.stringify(list));
    } catch (_) {}
  }

  /* Create submission. Uses PATCH so ticket ID is the Firestore doc ID. */
  async function submit(formData) {
    var ticketId = generateTicketId();
    var subject  = String(formData.get('subject') || '');
    var category = String(formData.get('category') || 'support');

    var doc = {
      fields: {
        ticketId:    str(ticketId),
        firstName:   str(formData.get('firstName')),
        lastName:    str(formData.get('lastName')),
        email:       str(formData.get('email')),
        subject:     str(subject),
        message:     str(formData.get('message')),
        category:    str(category),
        status:      str('pending'),
        source:      str('website'),
        submittedAt: ts(new Date().toISOString())
      }
    };

    var res = await fetch(BASE + ticketId + '?key=' + KEY, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc)
    });

    if (!res.ok) throw new Error('Firestore ' + res.status);

    saveLocal(ticketId, subject, category);
    return ticketId;
  }

  /* Normalize ERP status values (EN + ES) to the 4 known keys */
  function normalizeStatus(raw) {
    if (!raw) return 'pending';
    var s = raw.toLowerCase().trim().replace(/\s+/g, '_');
    if (s === 'reviewing' || s === 'in_review' || s === 'under_review' || s === 'review' ||
        s === 'en_revision' || s === 'en_revisión' || s === 'revision' || s === 'revisión' ||
        s === 'en_revision' || s === 'en_proceso' || s === 'proceso') return 'reviewing';
    if (s === 'responded' || s === 'replied' || s === 'answered' || s === 'response_sent' ||
        s === 'respondido' || s === 'contestado' || s === 'respuesta_enviada') return 'responded';
    if (s === 'closed' || s === 'done' || s === 'resolved' || s === 'completed' ||
        s === 'cerrado' || s === 'resuelto' || s === 'finalizado' || s === 'completado') return 'closed';
    if (s === 'pending' || s === 'pendiente' || s === 'nuevo' || s === 'new') return 'pending';
    return 'pending';
  }

  /* Fetch ticket status by ID — used by status.html */
  async function fetchTicket(ticketId) {
    var res = await fetch(BASE + ticketId + '?key=' + KEY);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Firestore ' + res.status);
    var data = await res.json();
    if (!data.fields) return null;
    var f = data.fields;
    return {
      id:       ticketId,
      subject:  (f.subject  && f.subject.stringValue)  || '',
      category: (f.category && f.category.stringValue) || '',
      status:   normalizeStatus(f.status && f.status.stringValue),
      response: (f.response && f.response.stringValue) || null
    };
  }

  window.FiniverseContact = {
    submit:           submit,
    fetchTicket:      fetchTicket,
    generateTicketId: generateTicketId
  };
})();
