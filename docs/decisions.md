# Decisions

Newest first. Each entry: what we decided, why, and what we gave up. Only change a past entry to mark it superseded.

---

### 2026-10-18 · Docs as files; CLAUDE.md is a short index

**Decision:** Context for agents lives in `docs/`; `CLAUDE.md` points to it and holds the rules. Code comments stay minimal.
**Why:** Inline comments drift and are invisible to an agent that hasn't opened the file. Docs in files survive across sessions and agents.

### 2026-10-18 · One Claude Code session per roadmap item

**Decision:** Work is split into scoped sessions in [roadmap.md](roadmap.md), each ending with handoff notes.
**Why:** Small scopes keep context focused and make each step reviewable. The roadmap is the memory between sessions.

### 2026-10-18 · Next.js app + Lit design system + Storybook

**Decision:** The app stays on Next.js (App Router). The design system is built as Lit web components in `packages/ui`, documented in Storybook.
**Why:** The user is fluent in Next.js, so learning effort goes elsewhere. Lit components are framework-agnostic (usable from Angular later) and match the user's interest in web components.
**Trade-off / risk:** Lit components don't render on the server in the Next.js App Router by default: flicker before JavaScript loads, and extra client JS on low-end phones. To evaluate in session 03: `@lit-labs/nextjs` / Lit SSR, keeping Lit components small and mostly visual, or plain React for layout-heavy pieces.

### 2026-10-18 · Modular monolith, tenant-ready

**Decision:** One app and one database, with feature modules behind clear boundaries. Every clinic-owned record has `clinic_id`.
**Why:** One developer, small scale. Microservices would add operational cost with no benefit. `clinic_id` keeps white-labelling for other clinics cheap later.

### 2026-10-18 · Penpot (free tier) for design, via the official MCP server

**Decision:** Design in Penpot, with agents working through `@penpot/mcp`.
**Why:** Penpot's MCP server lets agents *create* designs (its `execute_code` tool runs against the plugin API), not just read them. It's open source and can be self-hosted if patient-adjacent data ever needs to stay in-house.
**Trade-off:** The agent gets write access by default, so keep a separate scratch file for agent experiments.

### 2026-10-18 · Hardware: Chromebook at the desk, document scanner for bulk digitizing

**Decision:** The front desk uses a Chromebook. Paper files are scanned with a document scanner, possibly off-site at home; ad hoc pages are captured with a phone camera.
**Why:** Cheap, low-maintenance, and everything runs in a browser.
**Consequence:** The privacy plan must cover chain of custody for paper files leaving the clinic.

### 2026-10-18 · Register with the National Privacy Commission

**Decision:** Register whether or not it turns out to be mandatory at this clinic's size.
**Why:** The app handles sensitive personal information (health data on minors). Registering shows good faith and sets the clinic up for growth.

### 2026-10-18 · Payment tracker records payments, never issues receipts (for now)

**Decision:** The v2 payment feature records payments and exports them for the bookkeeper. It does not issue official receipts or invoices.
**Why:** Software that issues BIR receipts may need registration or accreditation as a computerized accounting system. Revisit after the accountant answers the open questions in the brief.
