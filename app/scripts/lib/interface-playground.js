/* Shared helpers for client.interface.trigger() playground */
window.TechServeInterfacePlayground = (function () {
  const METHOD_CATALOG = [
    {
      id: 'notifications',
      label: 'Notifications',
      intro: 'Platform 3.0 toast and legacy notify banners.',
      actions: [
        { label: 'showToast success', method: 'showToast', payload: { type: 'success', message: 'Toast: action saved.' } },
        { label: 'showToast error', method: 'showToast', payload: { type: 'error', message: 'Toast: something failed.' } },
        { label: 'showNotify success', method: 'showNotify', payload: { type: 'success', message: 'Notify: success message' } },
        { label: 'showNotify warning', method: 'showNotify', payload: { type: 'warning', message: 'Notify: warning message' } }
      ]
    },
    {
      id: 'modals',
      label: 'Modals',
      intro: 'showModal variants, dialog, and confirm.',
      actions: [
        {
          label: 'showModal (default)',
          method: 'showModal',
          payload: { title: 'Sample modal', template: 'modal.html' }
        },
        {
          label: 'showModal nobackdrop',
          method: 'showModal',
          payload: { title: 'No backdrop', nobackdrop: true, template: 'modal.html' }
        },
        {
          label: 'showModal linkText',
          method: 'showModal',
          payload: {
            title: 'Linked modal',
            nobackdrop: true,
            linkText: 'Freshworks docs',
            linkUrl: 'https://developers.freshworks.com',
            template: 'modal.html'
          }
        },
        {
          label: 'showModal bgColor',
          method: 'showModal',
          payload: {
            title: 'Tinted modal',
            nobackdrop: true,
            bgColor: 'rgb(237, 233, 254)',
            template: 'modal.html'
          }
        },
        { label: 'showDialog', method: 'showDialog', payload: { title: 'Sample dialog', template: 'modal.html' } },
        { label: 'showConfirm', method: 'showConfirm', payload: { title: 'Confirm', message: 'Select OK or Cancel' } }
      ]
    },
    {
      id: 'navigation',
      label: 'Navigation',
      intro: 'Open ticket, requester, or contact pages by ID.',
      actions: [
        { label: 'openTicket', method: 'openTicket', inputId: 'ticket-id' },
        { label: 'openRequester', method: 'openRequester', inputId: 'requester-id' },
        { label: 'click ticket', method: 'click', clickId: 'ticket', inputId: 'ticket-id' },
        { label: 'click contact', method: 'click', clickId: 'contact', inputId: 'contact-id' }
      ]
    },
    {
      id: 'fields',
      label: 'Ticket fields',
      intro: 'Hide, show, enable, set, clear, and populate dropdowns.',
      actions: [
        { label: 'setOptions priority', method: 'setOptions', payload: { id: 'priority', value: [1, 2, 3, 4] } },
        { label: 'clearValue status', method: 'clearValue', payload: { id: 'status' } },
        { label: 'clearValue contact email', method: 'clearValue', payload: { id: 'email' } },
        { label: 'clearValue company name', method: 'clearValue', payload: { id: 'name' } },
        { label: 'hide status', method: 'hide', payload: { id: 'status' } },
        { label: 'show status', method: 'show', payload: { id: 'status' } },
        { label: 'disable status', method: 'disable', payload: { id: 'status' } },
        { label: 'enable status', method: 'enable', payload: { id: 'status' } },
        { label: 'setValue status=2', method: 'setValue', payload: { id: 'status', value: 2 } }
      ]
    },
    {
      id: 'timer',
      label: 'Timer',
      intro: 'Start, stop, or toggle the ticket timer (Freshdesk & Freshservice).',
      actions: [
        { label: 'start timer', method: 'start', payload: { id: 'timer' } },
        { label: 'stop timer', method: 'stop', payload: { id: 'timer' } },
        { label: 'toggle timer', method: 'toggle', payload: { id: 'timer' } }
      ]
    },
    {
      id: 'editor',
      label: 'Reply editor',
      intro: 'Freshservice reply window — enable/disable the from field.',
      actions: [
        { label: 'disableElement from', method: 'disableElement', payload: { id: 'reply', field: 'from' } },
        { label: 'enableElement from', method: 'enableElement', payload: { id: 'reply', field: 'from' } }
      ]
    },
    {
      id: 'cti',
      label: 'CTI',
      intro: 'Softphone and missed-call badge (cti_global_sidebar).',
      actions: [
        { label: 'show softphone', method: 'show', payload: { id: 'softphone' } },
        { label: 'hide softphone', method: 'hide', payload: { id: 'softphone' } },
        { label: 'show missedCall', method: 'show', payload: { id: 'missedCall' } },
        { label: 'hide missedCall', method: 'hide', payload: { id: 'missedCall' } }
      ]
    },
    {
      id: 'crm',
      label: 'CRM',
      intro: 'Open add-record windows or show entity detail pages.',
      actions: [
        { label: 'open lead', method: 'open', payload: { id: 'lead' } },
        { label: 'open contact', method: 'open', payload: { id: 'contact' } },
        { label: 'open account', method: 'open', payload: { id: 'account' } },
        { label: 'open deal', method: 'open', payload: { id: 'deal' } },
        { label: 'open calllog', method: 'open', payload: { id: 'calllog' } },
        { label: 'show lead', method: 'show', showId: 'lead', inputId: 'crm-record-id' },
        { label: 'show contact', method: 'show', showId: 'contact', inputId: 'crm-record-id' },
        { label: 'show account', method: 'show', showId: 'account', inputId: 'crm-record-id' },
        { label: 'show deal', method: 'show', showId: 'deal', inputId: 'crm-record-id' }
      ]
    }
  ];

  function formatJson(value) {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }

  function formatError(error) {
    if (!error) {
      return 'Unknown error';
    }
    if (typeof error === 'string') {
      return error;
    }
    return error.message || formatJson(error);
  }

  function getInputValue(inputId) {
    const el = document.getElementById(inputId);
    if (!el) {
      return '';
    }
    return String(el.value || '').trim();
  }

  const NAV_PAYLOAD_BUILDERS = {
    openTicket: (rawId) => ({ id: rawId || '1' }),
    openRequester: (rawId) => ({ id: rawId || '1' })
  };

  function buildDynamicPayload(action, rawId) {
    const navBuilder = NAV_PAYLOAD_BUILDERS[action.method];
    if (navBuilder) {
      return navBuilder(rawId);
    }
    if (action.method === 'click') {
      return { id: action.clickId, value: rawId || '1' };
    }
    if (action.method === 'show' && action.showId) {
      return { id: action.showId, value: Number(rawId) || 1 };
    }
    return {};
  }

  function buildPayload(action) {
    if (action.payload) {
      return { ...action.payload };
    }
    const rawId = action.inputId ? getInputValue(action.inputId) : '';
    return buildDynamicPayload(action, rawId);
  }

  function triggerInterface(client, method, payload) {
    return client.interface.trigger(method, payload);
  }

  function renderResult(container, method, payload, data, error) {
    container.hidden = false;
    container.innerHTML = '';

    const label = document.createElement('span');
    label.className = 'ip-result__label';
    label.textContent = error ? `Error — ${method}` : `Success — ${method}`;
    container.appendChild(label);

    const meta = document.createElement('p');
    meta.className = 'ip-result__meta';
    meta.textContent = 'Payload: ' + formatJson(payload);
    container.appendChild(meta);

    const pre = document.createElement('pre');
    pre.className = 'ip-result' + (error ? ' ip-result--error' : '');
    pre.textContent = error ? formatError(error) : formatJson(data);
    container.appendChild(pre);
  }

  function buildActionButton(action, client, resultEl, activeEl) {
    const button = document.createElement('fw-button');
    button.setAttribute('color', 'secondary');
    button.setAttribute('size', 'small');
    button.textContent = action.label;

    button.addEventListener('fwClick', async () => {
      const payload = buildPayload(action);
      activeEl.innerHTML = 'Calling <code>' + action.method + '</code>…';
      try {
        const data = await triggerInterface(client, action.method, payload);
        activeEl.innerHTML = 'Last action: <code>' + action.method + '</code> — ' + action.label;
        renderResult(resultEl, action.method, payload, data, null);
      } catch (error) {
        activeEl.innerHTML = 'Failed: <code>' + action.method + '</code> — ' + action.label;
        renderResult(resultEl, action.method, payload, null, error);
      }
    });

    return button;
  }

  function buildTabs(client) {
    const tabsEl = document.getElementById('interface-tabs');
    const resultEl = document.getElementById('action-result');
    const activeEl = document.getElementById('active-action');
    if (!tabsEl) {
      return;
    }

    tabsEl.innerHTML = '';

    METHOD_CATALOG.forEach((section) => {
      const tab = document.createElement('fw-tab');
      tab.setAttribute('slot', 'tab');
      tab.textContent = section.label;

      const panel = document.createElement('fw-tab-panel');
      panel.setAttribute('slot', 'tab-panel');

      const intro = document.createElement('p');
      intro.className = 'ip-panel-intro';
      intro.textContent = section.intro;
      panel.appendChild(intro);

      const grid = document.createElement('div');
      grid.className = 'ip-action-grid';
      section.actions.forEach((action) => {
        grid.appendChild(buildActionButton(action, client, resultEl, activeEl));
      });
      panel.appendChild(grid);

      tabsEl.appendChild(tab);
      tabsEl.appendChild(panel);
    });
  }

  async function detectSurface(client) {
    const meta = document.getElementById('surface-meta');
    if (!meta) {
      return 'unknown';
    }
    try {
      const context = await client.instance.context();
      const loc = context?.location || 'ticket_sidebar';
      meta.textContent = 'Surface: ' + loc;
      return loc;
    } catch {
      meta.textContent = 'Surface: ticket_sidebar (default)';
      return 'ticket_sidebar';
    }
  }

  const ID_PREFILL_MAP = [
    { dataKey: 'ticket', field: 'id', inputId: 'ticket-id' },
    { dataKey: 'requester', field: 'id', inputId: 'requester-id' },
    { dataKey: 'contact', field: 'id', inputId: 'contact-id' }
  ];

  async function prefillOne(client, entry) {
    try {
      const data = await client.data.get(entry.dataKey);
      const record = data?.[entry.dataKey];
      if (record?.[entry.field]) {
        const el = document.getElementById(entry.inputId);
        if (el) {
          el.value = String(record[entry.field]);
        }
      }
    } catch {
      /* key unavailable on this surface */
    }
  }

  async function prefillIds(client) {
    await Promise.all(ID_PREFILL_MAP.map((entry) => prefillOne(client, entry)));
  }

  function init(client) {
    buildTabs(client);
    return detectSurface(client);
  }

  return {
    init,
    prefillIds,
    METHOD_CATALOG
  };
})();
