(function () {
  const H = window.CatalogHelpers;
  const MAX_HEIGHT = '700px';

  function buildCatalog() {
    let html = '';

    html += H.accordion(
      'Common (ticket_sidebar)',
      'Modals, confirm boxes, and notifications.',
      H.buttonGroup('Dialogs', H.row(
        H.btn('Modal + backdrop', 'InterfaceKit.modalWithBackdrop()') +
        H.btn('showDialog', 'InterfaceKit.dialogDefault()') +
        H.btn('showConfirm', 'InterfaceKit.confirmDefault()')
      )) +
      H.buttonGroup('Notifications', H.row(
        H.btn('Notify info', "InterfaceKit.showNotify('info','Notice','Sidebar notify demo.')")
      )),
      true
    );

    html += H.accordion(
      'Ticket chrome',
      'Page-level elements and conversation toolbar. Enable/disable only on ticketEdit, reply, note, and forward.',
      H.visibilityGroup('attachments', 'attachments') +
      H.visibilityGroup('attachmentsDelete', 'attachmentsDelete') +
      H.visibilityGroup('ticketSpam', 'ticketSpam') +
      H.elementGroup('ticketEdit', 'ticketEdit') +
      H.visibilityGroup('ticketDelete', 'ticketDelete') +
      H.visibilityGroup('ticketDueBy', 'ticketDueBy') +
      H.elementGroup('reply', 'reply') +
      H.elementGroup('note', 'note') +
      H.elementGroup('forward', 'forward') +
      H.visibilityGroup('noteEdit', 'noteEdit') +
      H.buttonGroup('Timer and thread', H.row(
        H.btn('expandConversation', 'InterfaceKit.expandConversation()') +
        H.btn('Start timer', 'SidebarDemo.startTimer()') +
        H.btn('Stop timer', 'InterfaceKit.stopTimer()')
      ))
    );

    html += H.accordion(
      'Editor window',
      'Reply and note editor actions via click and setValue.',
      H.buttonGroup('Reply', H.row(
        H.btn('Reply + text', 'InterfaceKit.replyWithText()') +
        H.btn('Reply (plain)', 'InterfaceKit.replyPlain()') +
        H.btn('deleteQuotedText + reply', 'InterfaceKit.deleteQuotedTextThenReply()')
      )) +
      H.buttonGroup('Note', H.row(
        H.btn('Note (private)', 'InterfaceKit.noteWithText(false)') +
        H.btn('Note (public)', 'InterfaceKit.noteWithText(true)')
      )) +
      H.buttonGroup('Note type and notify', H.row(
        H.btn('setValue noteType=private', "InterfaceKit.setNoteType('private')") +
        H.btn('setOptions note', "InterfaceKit.setNoteTypeOptions(['private'])") +
        H.btn('setValue toAddress', "InterfaceKit.setNoteToAddress('agent@example.com')")
      ))
    );

    html += H.accordion(
      'Properties widget',
      'Built-in property fields on the ticket details page.',
      H.elementGroup('status', 'status') +
      H.elementGroup('priority', 'priority') +
      H.elementGroup('ticket_type', 'ticket_type') +
      H.elementGroup('group', 'group') +
      H.elementGroup('product', 'product') +
      H.elementGroup('tag', 'tag') +
      H.buttonGroup('setValue / setOptions', H.row(
        H.btn('setValue status=2', "InterfaceKit.setValue('status', 2)") +
        H.btn('setOptions priority', "InterfaceKit.setOptions('priority', ['Low', 'Medium', 'High'])") +
        H.btn('setValue custom field', 'SidebarDemo.setCustomFieldValue()') +
        H.btn('setOptions custom field', 'SidebarDemo.setCustomFieldOptions()')
      ))
    );

    html += H.accordion(
      'Contact details widget',
      'Contact and company fields (contact.* / company.*).',
      H.groupHeading('Contact fields') +
      H.elementGroup('contact.email', 'contact.email') +
      H.elementGroup('contact.phone', 'contact.phone') +
      H.elementGroup('contact.mobile', 'contact.mobile') +
      H.elementGroup('contact.tags', 'contact.tags') +
      H.elementGroup('contact.language', 'contact.language') +
      H.groupHeading('Company fields') +
      H.elementGroup('company.description', 'company.description') +
      H.elementGroup('company.domains', 'company.domains') +
      H.buttonGroup('setValue', H.row(
        H.btn('setValue contact.email', "InterfaceKit.setValue('contact.email', 'demo@example.com')")
      ))
    );

    return '<div class="accordion-stack">' + html + '</div>';
  }

  function resizeSidebar(client) {
    try {
      client.instance.resize({ height: MAX_HEIGHT });
    } catch (resizeError) {
      console.info('Could not resize sidebar', resizeError);
    }
  }

  window.SidebarDemo = {
    startTimer: async function () {
      const agentId = await InterfaceKit.getLoggedInAgentId();
      return InterfaceKit.startTimer({
        agent: agentId,
        billable: true,
        note: 'Started from sidebar demo.'
      });
    },
    setCustomFieldValue: async function () {
      const ids = await InterfaceKit.getDemoIds();
      return InterfaceKit.setValue(ids.customField, 'demo-value');
    },
    setCustomFieldOptions: async function () {
      const ids = await InterfaceKit.getDemoIds();
      return InterfaceKit.setOptions(ids.customField, ['Option A', 'Option B']);
    }
  };

  document.addEventListener('interface-kit:ready', function (event) {
    const client = event.detail && event.detail.client;
    const root = document.getElementById('catalog');
    if (root) {
      root.innerHTML = buildCatalog();
    }
    if (client) {
      resizeSidebar(client);
      client.events.on('app.activated', function () {
        resizeSidebar(client);
      });
    }
  });
})();
