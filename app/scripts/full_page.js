(function () {
  const H = window.CatalogHelpers;

  function buildCatalog() {
    let html = '';

    html += H.section(
      'Modals & dialogs',
      'Common · full_page_app',
      'Interface methods available from any placement, including this full-page app.',
      H.row(
        H.btn('Modal + backdrop', 'InterfaceKit.modalWithBackdrop()') +
        H.btn('Modal no backdrop', 'InterfaceKit.modalNoBackdrop()') +
        H.btn('showDialog', 'InterfaceKit.dialogDefault()') +
        H.btn('showConfirm', 'InterfaceKit.confirmDefault()') +
        H.btn('Custom confirm', 'InterfaceKit.confirmCustomLabels()') +
        H.btn('All notify types', 'InterfaceKit.notifyAllTypes()')
      )
    );

    html += H.section(
      'Navigation',
      'Common · click',
      'Open ticket or contact details pages by id (configure demo ids in app settings).',
      H.row(
        H.btn('Open ticket', 'FullPageDemo.openDemoTicket()') +
        H.btn('Open contact', 'FullPageDemo.openDemoContact()')
      )
    );

    html += H.section(
      'Other placements',
      'Reference',
      'Ticket, editor, log-time, and CTI interface methods only work from their matching placement. Use the ticket sidebar, conversation editor, time entry background, or CTI sidebar surfaces for those demos.',
      '<p class="hint">Ticket details → <strong>ticket_sidebar</strong> · Editor → <strong>ticket_conversation_editor</strong> · Log time → <strong>time_entry_background</strong> · CTI → <strong>cti_global_sidebar</strong></p>'
    );

    return html;
  }

  window.FullPageDemo = {
    openDemoTicket: async function () {
      const ids = await InterfaceKit.getDemoIds();
      return InterfaceKit.openTicket(ids.ticketId);
    },
    openDemoContact: async function () {
      const ids = await InterfaceKit.getDemoIds();
      return InterfaceKit.openContact(ids.contactId);
    }
  };

  document.addEventListener('interface-kit:ready', function () {
    const root = document.getElementById('catalog');
    if (root) {
      root.innerHTML = buildCatalog();
    }
  });
})();
