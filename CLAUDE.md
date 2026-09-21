# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Gotchas

- Package manager is **yarn**. `package-lock.json` is stale; ignore it.
- Every `db:*` script has a `:prod` variant that runs against the **production** database.
- There is no test runner.

## Invariants

- Authorization lives in the data layer, not in route guards (there is no middleware). Every `lib/*` query or mutation must call `getCurrentUser()` and scope its `where` by `userId`.
- Deleting a box or item cascades in the DB but not in Vercel Blob. Remove image files through `lib/image`.

## Before finishing a task

Run `yarn lint` and `yarn tsc --noEmit`. Errors under `.next/types/` come from stale generated files, not your change; only errors in source files count.

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
- Work on branches and open PRs into `main`.
