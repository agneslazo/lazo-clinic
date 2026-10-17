# Roadmap

Each session is one Claude Code session with one clear scope. Status: `Done` · `Next` · `Planned` · `Blocked`.

At the end of a session, fill in **Done** and **Handoff** for it, and mark the next session `Next`.

| # | Session | Status |
|---|---|---|
| 00 | Context dump + product brief | Done |
| 01 | Foundations A: CLAUDE.md, docs layout, roadmap | Done |
| 02 | Foundations B: fix Node, test tooling, basic CI | **Next** |
| 03 | Foundations C: Lit + Storybook `packages/ui`, Penpot account + MCP | Planned |
| 04 | Interviews (user, offline): close the brief's open questions | Planned · can run in parallel |
| 05 | v1 user flows | Planned · uses 04 |
| 06 | v1 screen inventory | Planned |
| 07 | v1 data model + privacy plan | Planned |
| 08 | Hosting + infrastructure | Planned · must be done before real data |
| 09 | Design tokens + base components (Penpot ↔ Lit) | Planned |
| 10 | v1 screen designs in Penpot | Planned |
| 11+ | v1 build, one flow per session, TDD | Planned |
| — | Jev experiments | Ongoing from 02 |
| — | CD + scheduled deployments | After 08 |

---

## 00 · Context dump + product brief

**Done:** Three Q&A rounds, then [brief.md](brief.md) v0.2.
**Handoff:** Open questions in the brief need the doctor, a secretary and the bookkeeper (session 04).

## 01 · Foundations A

**Done:** `CLAUDE.md`, [README.md](README.md) docs index, this roadmap, [decisions.md](decisions.md).
**Handoff:** Node fails to start in WSL (`libatomic.so.1` missing). The user installs `libatomic1` before session 02.

## 02 · Foundations B

**Prerequisites (user, manual):**
1. `sudo apt update && sudo apt install -y libatomic1`. Node v25 (nvm) fails without this library, and Ubuntu 22.04 doesn't ship it by default.
2. `nvm install 24 && nvm alias default 24`. Odd-numbered Node releases (25) are short-lived and never become LTS. Use LTS 24 for a project people rely on; CI and hosting will match it.
3. `node -v` prints `v24.x`.

**Scope:**
- Verify Node works; pin the Node version (`.nvmrc` / `engines`).
- Convert the root into an npm workspace (the app stays at root; `packages/*` reserved for `ui`).
- Vitest + Testing Library for unit and component tests; Playwright for end-to-end tests.
- One example test at each level, written test-first.
- GitHub Actions: lint, typecheck, unit tests, e2e on every PR.
- First Jev experiment idea written in `jev.md` (not wired up yet).
- Write `testing.md` and `ci.md`.

**Done:** —
**Handoff:** —

## 03 · Foundations C

**Scope:**
- `packages/ui`: Lit components, Storybook (web-components framework), Vitest.
- One placeholder component consumed by the Next app, to prove the integration and evaluate the server-rendering risk in [decisions.md](decisions.md).
- Penpot account (free tier) + official MCP server (`@penpot/mcp`), with step-by-step instructions for the user. Write `penpot.md`.

**Done:** —
**Handoff:** —

## 04 · Interviews

**Scope:** The user interviews the doctor, a secretary and the bookkeeper using the brief's open questions, then brings back notes. Claude updates the brief.

## 05–11+

Scopes get written in detail when the previous session hands off.
