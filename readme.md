# TechServe Global — Interface Method Playground

Drive the Freshworks product UI from your app — open tickets, populate dropdowns, show toasts, control CTI widgets, and launch CRM records — without browser extensions. **TechServe Global** maps each `client.interface.trigger()` capability to a tabbed playground on the surfaces where that API is supported.

**Platform:** 3.0 · **FDK:** 10.1.2 · **Node:** 24.11.0 · **UI:** Crayons v4

---

## Surfaces

| Surface | Module | Placeholder | Tabs |
|---------|--------|-------------|------|
| **Ticket sidebar** | `support_ticket`, `service_ticket` | `ticket_sidebar` | Ticket fields, Navigation, Timer, Modals, Reply editor (Freshservice) |
| **CTI bar** | `common` | `cti_global_sidebar` | CTI — softphone + missed-call badge |
| **CRM menus** | `deal`, `contact` | `deal_entity_menu`, `contact_entity_menu` | CRM — open/show records |

Keys not available on the current page return an error in the result panel — expected when exploring from the wrong placeholder.

---

## Features

### Ticket fields (Freshdesk)

- `setOptions` — narrow priority dropdown choices
- `clearValue` — reset status or other ticket properties
- `showToast` — non-blocking confirmation (Platform 3.0)

### Navigation

- `openTicket`, `openRequester` — jump by ID from the sidebar
- `click` — open ticket or contact detail pages programmatically

### Timer (Freshdesk + Freshservice)

- `start`, `stop`, `toggle` on `id=timer`

### Freshservice reply guardrails

- `enableElement` / `disableElement` on the reply window `from` field

### CTI (Freshdesk only)

- `show` / `hide` on `id=softphone` and `id=missedCall`

### CRM (Freshworks CRM)

- `open` — add lead, contact, account, deal, or call log windows
- `show` — navigate to entity detail pages by ID

### Modals

- `showModal` variants — `nobackdrop`, `linkText` + `linkUrl`, `bgColor`
- `showNotify`, `showDialog`, `showConfirm` (baseline patterns)

Shared library: `app/scripts/lib/interface-playground.js`

---

## Setup

```sh
git clone https://github.com/freshworks-developers/interface-method-samples.git
cd interface-method-samples
fdk run
```

Append `?dev=true` to your Freshdesk, Freshservice, or CRM URL.

### Where to test

1. **Ticket details** → open **TechServe Interface Playground** in the ticket sidebar
2. **Freshdesk CTI bar** (bottom-left) → open the same app in the CTI global sidebar
3. **CRM** → open from deal or contact entity menus

```sh
fdk validate
fdk pack
```

---

## Project structure

```
.
├── manifest.json
├── app/
│   ├── views/playground.html
│   ├── scripts/
│   │   ├── lib/interface-playground.js
│   │   └── playground.js
│   └── styles/
│       ├── common.css
│       ├── playground.css
│       └── images/icon.svg
├── README.md
└── USECASE.md
```

---

## Tech stack

- **Platform:** Freshworks Platform 3.0
- **Runtime:** Node.js 24.11.0 · FDK 10.1.2
- **UI:** Crayons v4

---

## Resources

- [Interface method](https://developers.freshworks.com/docs/app-sdk/v3.0/common/client/interface-method/)
- [USECASE.md](./USECASE.md)
