# CLAUDE.md

## Workflow

`/start`, `/finish` and `/release` run these steps; follow them for every task. `/drop` abandons a task (closes its PR, deletes its branch).

1. **Start**: a `feat/`, `fix/`, `refactor/`, `docs/` or `chore/` branch from `dev` (`hotfix/` from `main`, see Git), with a draft PR opened right away.
2. **Plan**: for non-trivial work (several files, a feature, a schema change, anything ambiguous), propose a plan and wait for approval.
3. **Implement**: small conventional commits. Stay on the task.
4. **Verify**: `yarn verify` (type check, lint and build, as in CI). For UI changes, check the app in the browser, or say you couldn't.
5. **Self-review**: `/code-review` the diff and fix the findings that hold up.
6. **Finish**: update the PR's title and description and mark it ready. Never merge: the user reviews and merges.

**Side issues**: don't fix or stop to discuss unrelated problems you notice (bugs, tech debt, doc gaps). Log them in `BACKLOG.md` (priority and effort per its legend: what, where, why, likely fix) and mention them in one line.

## Git

- Conventional commits. Never commit or push to `main` or `dev` directly, and never force-push.
- `main` is production, `dev` is staging and the default branch.
- Feature PRs target `dev` and are squash-merged.
- A release (`/release`) is a `dev` → `main` PR merged with a **merge commit**, never a squash, or the histories diverge and every later release conflicts.
- A hotfix is a `hotfix/…` branch from `main` with its PR into `main`, then a `main` → `dev` PR, also merged with a merge commit.
- PR titles and descriptions: concise, but with everything a reviewer needs (what, why, caveats, how to verify).

## Invariants

- Authorization lives in the data layer: every `lib/*` query or mutation calls `getCurrentUser()` and scopes its `where` by `userId`. `proxy.ts` never authorizes: it only forwards the request path, and redirects `/` to `/dashboard` for a valid session token (signature and expiry, no revocation check).
- Deleting a box or item cascades in the DB but not in Vercel Blob: remove image files through `lib/image`.

## Code

Principles (use judgment when one conflicts with clarity):

- **KISS** and **YAGNI**: the simplest thing that works for today's need, no speculative options or abstractions.
- **SRP**: one responsibility per function, component and module.
- **DRY**: don't duplicate knowledge. Extract on the third occurrence, and don't merge code that only looks alike.
- **Fail fast**: validate at boundaries and return errors early.
- **Least astonishment**: names and behavior match what a reader expects.

Conventions:

- Booleans start with a verb: `isOpen`, `hasImage`, `canDelete`.
- Early returns always use braces: `if (...) { return }`. Apply to new and edited code (older code doesn't).
- XState (`xstate`, `@xstate/react`) for complex logic.
- Comments: JSDoc on exports, and inline only for what the code can't say (an edge case, a workaround, a why).

Components:

- Server-first: pages, layouts and data fetching stay on the server. `'use client'` goes on the smallest interactive leaf; client components never fetch data.
- Reuse `components/ui` primitives before custom markup.

Naming and layout:

- One PascalCase component per file; hooks are `useXxx.ts`.
- Colocate by feature: `components/<feature>/`, `lib/<feature>/`, `actions/<feature>/`, with types in `types.ts` and constants in `const.ts`.
- Prefix files shared by a feature with its name (`ItemCard`, `NewItemDialog`), but don't repeat the folder name otherwise. Short, explicit names.

Actions and forms:

- Every mutation is a `'use server'` action, validated with zod and consumed with `useActionState`.
- Actions return errors (`ActionResponse` with `errors`/`message` and echoed `values`) instead of throwing.
- Actions call `lib/<domain>`, never `db` directly, and call `revalidatePath` for the pages they affect.

Styling:

- Tailwind only, merging classes with `cn()`.
- Dark-only (the root layout hardcodes `dark`): no light-mode variants.
- Mobile-first: base styles for mobile, `sm:`/`md:` for larger screens.

## Deploys and database

- Vercel deploys only `main` (production) and `dev` (staging, sharing the dev database with local development). Feature branches are skipped (`scripts/vercel-ignore-build.sh`) and built by CI instead; `vercel deploy` makes a one-off preview.
- Both deployments apply pending migrations (`scripts/vercel-build.sh`). Never run `db:migrate:prod` by hand; `yarn db:migrate` locally only to test a migration.
- Migrations run before the new code is live: keep them backward compatible (add first, drop in a later release) and review destructive ones (`DROP`, `SET NOT NULL`) with care.

## Gotchas

- **yarn** v1 only: npm would create a `package-lock.json`.
- Every `db:*` script has a `:prod` variant that hits the **production** database.
- There is no test runner.
- TypeScript is pinned to 6 (typescript-eslint doesn't support 7). Don't upgrade it or add a 6/7 alias: Next 16 would then auto-install TS 7 (see `BACKLOG.md`).

## Next.js

@AGENTS.md
