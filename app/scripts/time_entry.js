(function () {
  const H = window.CatalogHelpers;

  function buildCatalog() {
    return H.section(
      'Log time window fields',
      'time_entry_background',
      'Timer form fields — only from this background placement while the Log time window is open.',
      H.elementActions('timerBillable', 'timerBillable') +
      H.elementActions('timerAgentId', 'timerAgentId') +
      H.elementActions('timerNote', 'timerNote') +
      H.elementActions('timerSetTime', 'timerSetTime') +
      H.elementActions('timerExecuteAt', 'timerExecuteAt') +
      H.row(
        H.btn('setValue timerNote', "InterfaceKit.setValue('timerNote', 'Demo time entry note')") +
        H.btn('setValue timerSetTime', "InterfaceKit.setValue('timerSetTime', '1')") +
        H.btn('setValue timerBillable', "InterfaceKit.setValue('timerBillable', true)")
      ) +
      '<p class="hint">Open TIME LOGS → Log time on a ticket. This background app has no visible frame; use browser devtools on this page if buttons are not shown.</p>'
    );
  }

  document.addEventListener('interface-kit:ready', function () {
    const root = document.getElementById('catalog');
    if (root) {
      root.innerHTML = buildCatalog();
    }
  });
})();
