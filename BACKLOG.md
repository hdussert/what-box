# Backlog

Side issues noticed during other tasks. Pick one up as its own task, then delete its entry.

Entries are grouped by **priority** and tagged with **effort**. Within a group, do the smallest first.

- **Priority**: 🔴 **High**: breaks or silently weakens something we rely on (deploys, checks). 🟡 **Medium**: slows us down or hides problems. 🟢 **Low**: cleanup or ideas.
- **Effort**: `S` < 1h, mechanical. `M` a few hours or needs a decision. `L` a day or more.

The last section, **Claude practices**, is different: ideas for working together better and faster (skills, `CLAUDE.md` rules, workflow and communication habits), not bugs. It uses the same effort tags.

## 🔴 High

_Nothing right now._

## 🟡 Medium

- `M` **Photos are public to anyone with the link.** Blobs use `access: 'public'` (`lib/image/storage.ts:20`); the random suffix makes URLs unguessable, but a leaked link (forwarded, history, logs) opens the photo without signing in, and the path exposes the user/box IDs and original file name. Fix: check whether Vercel Blob offers private access now, otherwise serve photos through a route handler that checks the session and ownership. Then drop the "Photos" caveat from `app/(legal)/privacy/page.tsx`.
- `M` **No way to delete your account.** The privacy policy (`app/(legal)/privacy/page.tsx`) promises deletion on request by email, so today it's a manual job: delete the user row (boxes and items cascade) *and* their photos in Vercel Blob, which don't cascade (see the `lib/image` invariant in `CLAUDE.md`). A self-serve "Delete account" action (confirm dialog, re-enter password) would honor the GDPR right to erasure without manual work. Likely fix: `lib/user` `deleteUser()` that removes Blob files through `lib/image` first, a `'use server'` action, then `deleteSession()` and redirect to `/`.
- `M` **No test runner.** "Verify" is only type-checking and manual checks. Add Vitest and start with the risky pure logic: zod schemas and the `userId` scoping in `lib/*`.

## 🟢 Low

- `S` **Move back to TypeScript 7** once typescript-eslint supports it (tracking: typescript-eslint#10940). Set `"typescript"` to `^7` in `package.json`, check that `yarn lint` and `next dev` both work, then remove the gotcha from `CLAUDE.md`.
- `L` **Translate the site (French first).** Everything is hard-coded English and `<html lang="en">` is fixed (`app/layout.tsx:25`). Needs a decision on routing (`/fr/...` prefix vs. cookie/`Accept-Language`) and a library (e.g. `next-intl`, check it supports Next 16's `proxy.ts`), then extracting strings from components, emails (`components/auth/ForgotPasswordEmailTemplate.tsx`) and the legal pages. French legal pages would also suit French users (loi Toubon). Pairs with SEO: `hreflang` alternates per language.

## 🤖 Claude practices

Skills:

- `S` **A `yarn check` script.** Every Verify step runs the same three commands (`tsc --noEmit --pretty false`, `lint`, `build` with placeholder env), typed by hand each time. One script used by `/finish` and CI would keep them identical and shorter to run.
- `S` **A `/staging` skill.** After a merge into `dev`, wait for the Vercel deploy and read its log (migrations applied, build ready). Done by hand several times already (e.g. the first staging deploy's migration failure).
- `M` **Let Claude check the UI in a browser.** Most UI PRs end with "not tested in a browser". A browser tool for Claude (Playwright or the Chrome integration) against `yarn dev` would let `/finish` verify UI changes itself. Needs a test account for sign-in.

`CLAUDE.md` rules:

- `S` **Ask when a review finding is a behavior choice.** Some `/code-review` findings are trade-offs, not bugs (e.g. what selection mode does to the open item). Rule: fix bugs, but ask about behavior choices instead of picking one.

Workflow and communication:

- `S` **Answer each option explicitly.** When a question offers several options and one goes unanswered, Claude has to guess (e.g. "reopen or stay closed" after selection mode, which led to a rework). A one-word answer per open question saves a round trip.
- `S` **Say what you tested before `/finish`.** Claude can't click through the app, so tell it which browser checks you did (or "not yet"); the PR then says so accurately.
- `S` **Close dropped tasks' draft PRs.** `/start` opens a draft PR before the plan is approved, so a rejected plan or abandoned task leaves a draft PR and branch to close.
- `S` **Parallel sessions with worktrees.** Once reviewing PRs feels routine, run several tasks at once in separate worktrees (`claude --worktree`).
