# Lazo Clinic

Web app for a solo pediatric clinic in Vigan, Philippines: digitized patient records first, then queue visibility and payment tracking. Read [docs/brief.md](docs/brief.md) for the product.

## Start of every session

1. Read [docs/README.md](docs/README.md) (index of all docs) and [docs/roadmap.md](docs/roadmap.md).
2. Find the session marked **Next** in the roadmap and confirm its scope with the user before doing anything.
3. Read only the docs that session needs.

## End of every session

1. Update the session's entry in [docs/roadmap.md](docs/roadmap.md): status, what was done, handoff notes for the next session.
2. Log any decision in [docs/decisions.md](docs/decisions.md).
3. Update [docs/README.md](docs/README.md) if docs were added or moved.

## Rules

- **Docs go in files, not comments.** Specs, rationale, how-things-work and decisions belong in `docs/`. Code comments only where the code alone would mislead. No JSDoc essays, no "this function does X" comments.
- **Test-driven.** Write a failing test first, make it pass, then refactor. Never weaken or delete a test to make it pass without asking the user.
- **Fake data only.** No real patient data anywhere: not in code, fixtures, seeds, screenshots, Penpot files or prompts. Use generated data. Real data waits for the privacy plan and hosting session (see roadmap).
- **Tenant-ready.** Every clinic-owned record carries `clinic_id`.
- **Module boundaries.** Feature modules (`records`, `queue`, `payments`) don't import each other's internals; they share code through public entry points only.
- **Light and accessible.** Target low-end Android phones on prepaid data, and WCAG 2.2 AA. Prefer server rendering and minimal client JavaScript. Every new dependency needs a reason in `docs/decisions.md`.
- **Design tokens only.** No hard-coded colours, spacing or font sizes once the design system exists.

## Working with the user

- They are a senior front-end engineer (React/Next) who is learning backend, infrastructure, CI/CD, compliance and agentic tooling on this project. Explain non-obvious choices in those areas briefly, and skip React basics.
- When something must be done manually by them (accounts, secrets, auth, hardware), give numbered steps, each with a short *why*.
- Each roadmap session is its own Claude Code session. Don't drift into the next session's scope.

## Git

- Branch per session (`session/<nn>-<slug>`); never commit directly to `main`.
- Conventional commits (`feat:`, `fix:`, `docs:`, `test:`, `chore:`).

## Commands

| Command | What |
|---|---|
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

Test commands get added in session 02.

## Environment

WSL2 (Linux). Node is currently broken (`libatomic.so.1` missing). The fix is listed under session 02 → Prerequisites in the roadmap.
