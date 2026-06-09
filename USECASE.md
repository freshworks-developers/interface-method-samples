# Use Cases — TechServe Global (Interface Method Sample)

**Sample repo:** [freshworks-developers/interface-method-samples](https://github.com/freshworks-developers/interface-method-samples)  
**Features demonstrated:** `client.interface.trigger()` across Freshdesk, Freshservice, CTI, and CRM placeholders

## Company Overview

**TechServe Global** is a B2B SaaS company using **Freshdesk** for customer support, **Freshservice** for internal IT, and **Freshworks CRM** for sales follow-ups. Agents and admins need to **drive the product UI programmatically** — open tickets, populate dropdowns, show toasts, control CTI widgets, and launch CRM records — without custom browser extensions.

## Use Case Scenarios

### 1. Guided Ticket Updates Without Leaving the Sidebar

**Scenario**: Tier-2 agents must restrict priority choices and clear stale status values before escalation.

**Use Case**: From the ticket sidebar **Ticket fields** tab, `setOptions` narrows the priority dropdown and `clearValue` resets status. `showToast` confirms the action without blocking the page.

---

### 2. Cross-Ticket Navigation for Swarm Support

**Scenario**: Incident commanders jump between related tickets and requester profiles during outages.

**Use Case**: The **Navigation** tab calls `openTicket`, `openRequester`, and `click` with IDs from the input row — no manual URL construction.

---

### 3. Timer Control for Billable Work

**Scenario**: Consultants must start and stop ticket timers consistently across Freshdesk and Freshservice.

**Use Case**: The **Timer** tab triggers `start`, `stop`, and `toggle` on `id=timer` from the sidebar playground.

---

### 4. Freshservice Reply Guardrails

**Scenario**: HR tickets should not allow agents to change the outbound mailbox on replies.

**Use Case**: On Freshservice, open Reply then use **Reply editor** → `disableElement` on the reply window `from` field.

---

### 5. CTI Softphone and Missed-Call Badge

**Scenario**: Contact-center leads hide the dialer during training and surface missed-call counts on the CTI widget.

**Use Case**: In `cti_global_sidebar`, the **CTI** tab calls `show`/`hide` on `softphone` and `missedCall`.

---

### 6. CRM Handoff from Support

**Scenario**: Support qualifies upsell opportunities and opens CRM records without switching tabs manually.

**Use Case**: From CRM entity menus, the **CRM** tab opens add-record windows (`open` lead/contact/account/deal/calllog) or navigates to detail pages (`show` with record ID).

---

### 7. Modal Variants for Lightweight Workflows

**Scenario**: Agents need inline forms that do not dim the ticket — with optional doc links and tinted backgrounds.

**Use Case**: The **Modals** tab demonstrates `showModal` with `nobackdrop`, `linkText` + `linkUrl`, and `bgColor`.

---

## Surfaces

| Surface | File |
|---------|------|
| Ticket sidebar (Freshdesk / Freshservice) | `app/views/playground.html` + `playground.js` |
| CTI global sidebar (Freshdesk) | Same view on `common.cti_global_sidebar` |
| CRM entity menus | Same view on `deal` / `contact` modules |

```sh
fdk run
```
