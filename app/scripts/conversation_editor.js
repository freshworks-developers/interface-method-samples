(function () {
  const H = window.CatalogHelpers;

  function buildCatalog() {
    return H.section(
      'Editor window fields',
      'ticket_conversation_editor',
      'from, to, cc, bcc and setValue on an open editor. Enable/disable applies to from, cc, and bcc only.',
      H.elementActions('from', 'from') +
      H.visibilityActions('to', 'to') +
      H.elementActions('cc', 'cc') +
      H.elementActions('bcc', 'bcc') +
      H.row(
        H.btn('setValue to', "InterfaceKit.setValue('to', ['requester@example.com'])") +
        H.btn('setValue cc', "InterfaceKit.setValue('cc', ['cc@example.com'])") +
        H.btn('Append editor text', "InterfaceKit.setEditorContent(false, 'end')") +
        H.btn('Replace editor text', "InterfaceKit.setEditorContent(true, 'start')")
      )
    );
  }

  document.addEventListener('interface-kit:ready', function (event) {
    const client = event.detail && event.detail.client;
    const root = document.getElementById('catalog');
    if (root) {
      root.innerHTML = buildCatalog();
    }
    if (client) {
      try {
        client.instance.resize({ height: '700px' });
      } catch (resizeError) {
        console.info('Could not resize conversation editor', resizeError);
      }
    }
  });
})();
