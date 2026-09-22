# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Gotchas

- Package manager is **yarn** (v1, `yarn.lock` is committed). Don't use npm, or it'll create a `package-lock.json`.
- Every `db:*` script has a `:prod` variant that runs against the **production** database.
- There is no test runner.
- TypeScript is pinned to 6: typescript-eslint doesn't support TS 7 yet. Don't upgrade it, and don't use a TS 6/7 side-by-side alias either: Next 16 then decides TypeScript is missing and auto-installs TS 7 over it (see `BACKLOG.md`).

## Invariants

- Authorization lives in the data layer, not in route guards (there is no middleware). Every `lib/*` query or mutation must call `getCurrentUser()` and scope its `where` by `userId`.
- Deleting a box or item cascades in the DB but not in Vercel Blob. Remove image files through `lib/image`.

## Workflow

Every task follows these steps. `/start` and `/finish` run them.

1. **Start**: branch from an up-to-date `main` (`feat/…`, `fix/…`, `refactor/…`, `docs/…`), push it and open a draft PR right away.
2. **Plan**: for non-trivial tasks (several files, a new feature, a schema change, anything ambiguous), propose a plan and wait for approval. Trivial fixes skip this step.
3. **Implement**: small conventional commits. Stay on the task: log side issues (see below) instead of fixing them.
4. **Verify**: `yarn lint` and `yarn tsc --noEmit`. Errors under `.next/types/` come from stale generated files, not your change; only errors in source files count. For UI changes, run the app and check the change in the browser.
5. **Self-review**: run `/code-review` on the diff and fix the findings that hold up.
6. **Finish**: update the PR title and description, mark the PR ready and report back. Never merge; the user reviews and merges.

### Side issues

When you notice something worth addressing that is unrelated to the current task (a bug, tech debt, a missing feature, a doc gap), don't fix it or stop to discuss it. Add a short entry to `BACKLOG.md` under the right priority, tagged with an effort, as the file's legend describes: what it is, where (`file:line`), why it matters, and the likely fix. Mention it in one line at the end of your turn.

## Design principles

Global guidelines to aim for, not rules to apply blindly. When one conflicts with clarity or the task at hand, use judgment.

- **KISS** (keep it stupid simple): pick the simplest solution that works. No speculative abstractions, options or generality for cases that don't exist yet.
- **SRP** (single responsibility): each function, component and module does one thing and has one reason to change.
- **DRY** (don't repeat yourself): don't duplicate knowledge or logic. Wait for the third occurrence before extracting, and don't merge code that only looks alike but changes for different reasons.
- **YAGNI** (you aren't gonna need it): build what the task needs now, not what it might need later.
- **Fail fast**: validate at boundaries and return errors early instead of letting bad state travel deeper.
- **Least astonishment**: names, signatures and behavior should match what a reader would expect.

## Coding conventions

- Booleans start with a verb: `isOpen`, `hasImage`, `canDelete`.
- Always wrap early returns in braces: `if (...) { return }`, never `if (...) return`. Older code doesn't follow this; apply it to new and edited code.
- Use XState state machines for complex logic (`xstate` and `@xstate/react` are installed).
- Comments are JSDoc on exported functions/types, or inline only where the code's behavior or a subtlety isn't obvious from reading it (a non-obvious edge case, a workaround, a "why" a reader couldn't infer). Don't narrate what self-explanatory code already says.

### Components

- Server-first: pages, layouts and data fetching stay on the server. Put `'use client'` on the smallest interactive component (leaves), and never fetch data in client components.
- Reuse `components/ui` primitives before writing custom markup.

### Naming and layout

- One PascalCase component per file; hooks are `useXxx.ts`.
- Colocate by feature: `components/<feature>/`, `lib/<feature>/`, `actions/<feature>/`. Types go in `types.ts`, constants in `const.ts`.
- Prefix files shared by a feature with its name (`ItemCard`, `ItemsList`, `NewItemDialog`). Don't repeat the folder or feature name elsewhere in the name; prefer short, explicit names.

### Actions and forms

- Every mutation is a `'use server'` action, validated with a zod schema and consumed through `useActionState`.
- Actions return errors (`ActionResponse` with `errors`/`message` and echoed `values`) instead of throwing.
- Actions call `lib/<domain>` and never touch `db` directly.
- Call `revalidatePath` after every mutation for the pages it affects.

### Styling

- Tailwind only, merging class names with `cn()`.
- The app is dark-only (root layout hardcodes `dark`): no light-mode variants.
- Mobile-first: base styles for mobile, `sm:`/`md:` for larger screens.

## Git

- Conventional commits (`feat:`, `fix:`, `refactor:`, ...).
- Never commit to or push `main` directly, and never force-push.
- Keep PR titles and descriptions concise: cut filler and repetition, but keep every piece of information a reviewer needs (what changed, why, caveats, how to verify).

## Next.js

@AGENTS.md
