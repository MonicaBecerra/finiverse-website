/* ── firebase-contact.js ── */
/* Sends contact form submissions to Firestore via REST API.
   Collection: contact_submissions
   Firestore rules required:
     match /contact_submissions/{doc} {
       allow create: if true;
       allow read, update, delete: if false;
     }
*/
(function () {
  var PROJ = 'fintrack-6948a';
  var KEY  = 'AIzaSyDqeIpLSJ3yc0kA2l9rhDmOvNiAmDPoAks';
  var URL  = 'https://firestore.googleapis.com/v1/projects/' + PROJ +
             '/databases/(default)/documents/contact_submissions?key=' + KEY;

  function str(v) { return { stringValue: String(v || '') }; }
  function ts(v)  { return { timestampValue: v }; }

  function generateTicketId() {
    var t = Date.now().toString(36).toUpperCase();
    var r = Math.random().toString(36).substring(2, 5).toUpperCase();
    return 'FNV-' + t.slice(-4) + r;
  }

  async function submit(formData) {
    var ticketId = generateTicketId();
    var doc = {
      fields: {
        ticketId:    str(ticketId),
        firstName:   str(formData.get('firstName')),
        lastName:    str(formData.get('lastName')),
        email:       str(formData.get('email')),
        subject:     str(formData.get('subject')),
        message:     str(formData.get('message')),
        category:    str(formData.get('category')),
        source:      str('website'),
        submittedAt: ts(new Date().toISOString())
      }
    };
    var res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc)
    });
    if (!res.ok) throw new Error('Firestore ' + res.status);
    return ticketId;
  }

  window.FiniverseContact = { submit: submit, generateTicketId: generateTicketId };
})();
