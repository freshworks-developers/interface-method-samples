(function () {
  const MAX_SIDEBAR_HEIGHT = '760px';

  init();

  async function init() {
    try {
      const client = await app.initialized();
      client.events.on('app.activated', onActivated);
      await onActivated();
    } catch (error) {
      console.error(error);
      const meta = document.getElementById('surface-meta');
      if (meta) {
        meta.textContent = 'Failed to initialize app';
      }
    }
  }

  async function onActivated() {
    const client = await app.initialized();
    await TechServeInterfacePlayground.init(client);
    await TechServeInterfacePlayground.prefillIds(client);
    await resizeIfSidebar(client);
  }

  async function resizeIfSidebar(client) {
    try {
      await client.instance.resize({ height: MAX_SIDEBAR_HEIGHT });
    } catch {
      /* CTI / deal menu may not support resize */
    }
  }
})();
