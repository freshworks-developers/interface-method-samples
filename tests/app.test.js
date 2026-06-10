import { describe, test, expect, vi, beforeEach } from 'vitest';

const mockClient = {
  interface: {
    trigger: vi.fn(() => Promise.resolve({}))
  },
  iparams: {
    get: vi.fn(() => Promise.resolve({
      demo_ticket_id: 42,
      demo_contact_id: 7,
      custom_field_name: 'cf_demo'
    }))
  },
  data: {
    get: vi.fn(() => Promise.resolve({ loggedInUser: { id: 99 } }))
  }
};

global.app = {
  initialized: vi.fn(() => Promise.resolve(mockClient))
};

describe('interface-kit.js', function () {
  beforeEach(function () {
    vi.clearAllMocks();
    vi.resetModules();
    delete global.InterfaceKit;
    delete global.client;
  });

  test('InterfaceKit initializes and triggers showModal', async function () {
    await import('../app/scripts/interface-kit.js');
    InterfaceKit.setClient(mockClient);

    await InterfaceKit.modalWithBackdrop();

    expect(mockClient.interface.trigger).toHaveBeenCalledWith('showModal', expect.objectContaining({
      template: './views/modal.html',
      backdrop: true
    }));
  });

  test('InterfaceKit showNotify uses mandatory type and message', async function () {
    await import('../app/scripts/interface-kit.js');
    InterfaceKit.setClient(mockClient);

    await InterfaceKit.showNotify('warning', 'Title', 'Message body');

    expect(mockClient.interface.trigger).toHaveBeenCalledWith('showNotify', {
      type: 'warning',
      title: 'Title',
      message: 'Message body'
    });
  });

  test('getDemoIds reads iparams', async function () {
    await import('../app/scripts/interface-kit.js');
    InterfaceKit.setClient(mockClient);

    const ids = await InterfaceKit.getDemoIds();
    expect(ids.ticketId).toBe(42);
    expect(ids.customField).toBe('cf_demo');
  });
});
