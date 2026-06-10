(function () {
  let clientRef = null;

  function getClient() {
    if (!clientRef) {
      throw new Error('App client is not initialized yet.');
    }
    return clientRef;
  }

  function setClient(c) {
    clientRef = c;
    window.client = c;
  }

  async function feedback(label, ok, detail) {
    const type = ok ? 'success' : 'danger';
    const message = label + (detail ? ': ' + detail : '');
    try {
      await getClient().interface.trigger('showNotify', {
        type: type,
        title: 'Interface demo',
        message: message.substring(0, 100)
      });
    } catch (notifyError) {
      console.info(message, notifyError);
    }
  }

  async function run(label, fn) {
    try {
      const result = await fn();
      await feedback(label, true);
      return result;
    } catch (error) {
      const msg = (error && error.message) ? error.message : String(error);
      await feedback(label, false, msg);
      throw error;
    }
  }

  function showModal(options) {
    return run('showModal', function () {
      return getClient().interface.trigger('showModal', options);
    });
  }

  function showDialog(options) {
    return run('showDialog', function () {
      return getClient().interface.trigger('showDialog', options);
    });
  }

  function showConfirm(options) {
    return run('showConfirm', function () {
      return getClient().interface.trigger('showConfirm', options);
    });
  }

  function showNotify(type, title, message) {
    return run('showNotify (' + type + ')', function () {
      return getClient().interface.trigger('showNotify', {
        type: type,
        title: title || 'Interface demo',
        message: message || 'Sample notification.'
      });
    });
  }

  function toggle(action, id) {
    return run(action + ' ' + id, function () {
      return getClient().interface.trigger(action, { id: id });
    });
  }

  function setValue(id, value, extra) {
    const payload = { id: id, value: value };
    if (extra) {
      Object.keys(extra).forEach(function (k) {
        payload[k] = extra[k];
      });
    }
    return run('setValue ' + id, function () {
      return getClient().interface.trigger('setValue', payload);
    });
  }

  function setOptions(id, value) {
    return run('setOptions ' + id, function () {
      return getClient().interface.trigger('setOptions', { id: id, value: value });
    });
  }

  function click(id, extra) {
    const payload = { id: id };
    if (extra) {
      Object.keys(extra).forEach(function (k) {
        payload[k] = extra[k];
      });
    }
    return run('click ' + id, function () {
      return getClient().interface.trigger('click', payload);
    });
  }

  function startTimer(value) {
    return run('start timer', function () {
      return getClient().interface.trigger('start', { id: 'timer', value: value || {} });
    });
  }

  function stopTimer() {
    return run('stop timer', function () {
      return getClient().interface.trigger('stop', { id: 'timer' });
    });
  }

  function openTicket(ticketId) {
    return click('ticket', { value: ticketId });
  }

  function openContact(contactId) {
    return click('contact', { value: contactId });
  }

  async function getDemoIds() {
    try {
      const params = await getClient().iparams.get();
      return {
        ticketId: params.demo_ticket_id || 1,
        contactId: params.demo_contact_id || 1,
        customField: params.custom_field_name || 'cf_custom_field'
      };
    } catch (iparamError) {
      console.info('Using default demo ids', iparamError);
      return { ticketId: 1, contactId: 1, customField: 'cf_custom_field' };
    }
  }

  async function getLoggedInAgentId() {
    try {
      const user = await getClient().data.get('loggedInUser');
      return user.loggedInUser && user.loggedInUser.id;
    } catch (userError) {
      console.info('Could not read loggedInUser', userError);
      return null;
    }
  }

  window.InterfaceKit = {
    setClient: setClient,
    getClient: getClient,
    run: run,
    showModal: showModal,
    showDialog: showDialog,
    showConfirm: showConfirm,
    showNotify: showNotify,
    toggle: toggle,
    setValue: setValue,
    setOptions: setOptions,
    click: click,
    startTimer: startTimer,
    stopTimer: stopTimer,
    openTicket: openTicket,
    openContact: openContact,
    getDemoIds: getDemoIds,
    getLoggedInAgentId: getLoggedInAgentId,

    modalWithBackdrop: function () {
      return showModal({
        title: 'Sample modal (backdrop)',
        template: './views/modal.html',
        backdrop: true
      });
    },

    modalNoBackdrop: function () {
      return showModal({
        title: 'Modal (no backdrop)',
        template: './views/modal.html',
        noBackdrop: true,
        linkText: 'Docs',
        linkUrl: 'https://developers.freshworks.com/docs/app-sdk/v3.0/support_ticket/front-end-apps/interface-methods/'
      });
    },

    dialogDefault: function () {
      return showDialog({
        title: 'Sample dialog',
        template: './views/dialog.html'
      });
    },

    confirmDefault: function () {
      return showConfirm({
        title: 'Confirm action',
        message: 'Save the current demo settings?'
      });
    },

    confirmCustomLabels: function () {
      return showConfirm({
        title: 'Custom labels',
        message: 'Proceed with the interface demo?',
        saveLabel: 'Proceed',
        cancelLabel: 'Back'
      });
    },

    notifyAllTypes: async function () {
      const types = ['info', 'success', 'warning', 'danger', 'alert'];
      for (let i = 0; i < types.length; i += 1) {
        await showNotify(types[i], types[i], 'Demo ' + types[i] + ' notification.');
      }
    },

    expandConversation: function () {
      return click('expandConversation');
    },

    replyWithText: function () {
      return click('reply', { text: 'Sample reply text inserted by interface method.' });
    },

    replyPlain: function () {
      return click('reply');
    },

    deleteQuotedTextThenReply: async function () {
      await click('deleteQuotedText');
      return click('reply');
    },

    noteWithText: function (isPublic) {
      return click('note', {
        text: 'Sample note inserted by interface method.',
        isPublic: !!isPublic
      });
    },

    setNoteType: function (value) {
      return setValue('noteType', value);
    },

    setNoteTypeOptions: function (values) {
      return setOptions('note', values);
    },

    setNoteToAddress: function (addresses) {
      return setValue('note', null, { toAddress: addresses });
    },

    setEditorContent: function (replace, position) {
      return setValue('editor', 'Sample editor text from interface method.', {
        replace: !!replace,
        position: position || 'end'
      });
    },

    showSoftphone: function () { return toggle('show', 'softphone'); },
    hideSoftphone: function () { return toggle('hide', 'softphone'); },
    showMissedCall: function () { return toggle('show', 'missedCall'); },
    hideMissedCall: function () { return toggle('hide', 'missedCall'); }
  };
})();
