# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Gotchas

- Package manager is **yarn**. `package-lock.json` is stale; ignore it.
- Every `db:*` script has a `:prod` variant that runs against the **production** database.
- There is no test runner.
- Image uploads in dev only work through a public URL (Vercel Blob calls back to the server): run `ngrok http 3000` and update `LOCAL_PUBLIC_URL` in `.env.development.local` each time ngrok restarts.

## Invariants

- Authorization lives in the data layer, not in route guards (there is no middleware). Every `lib/*` query or mutation must call `getCurrentUser()` and scope its `where` by `userId`.
- Deleting a box or item cascades in the DB but not in Vercel Blob. Remove image files through `lib/image`.

## Before finishing a task

Run `yarn lint` and `yarn tsc --noEmit`. Errors under `.next/types/` come from stale generated files, not your change; only errors in source files count.

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
