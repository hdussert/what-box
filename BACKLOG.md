# Backlog

Side issues noticed during other tasks. Pick one up as its own task, then delete its entry.

Entries are grouped by **priority** and tagged with **effort**. Within a group, do the smallest first.

- **Priority**: 🔴 **High**: breaks or silently weakens something we rely on (deploys, checks). 🟡 **Medium**: slows us down or hides problems. 🟢 **Low**: cleanup or ideas.
- **Effort**: `S` < 1h, mechanical. `M` a few hours or needs a decision. `L` a day or more.

## 🔴 High

_Nothing right now._

## 🟡 Medium

- `M` **Photos are public to anyone with the link.** Blobs use `access: 'public'` (`lib/image/storage.ts:20`); the random suffix makes URLs unguessable, but a leaked link (forwarded, history, logs) opens the photo without signing in, and the path exposes the user/box IDs and original file name. Fix: check whether Vercel Blob offers private access now, otherwise serve photos through a route handler that checks the session and ownership. Then drop the "Photos" caveat from `app/(legal)/privacy/page.tsx`.
- `M` **No way to delete your account.** The privacy policy (`app/(legal)/privacy/page.tsx`) promises deletion on request by email, so today it's a manual job: delete the user row (boxes and items cascade) *and* their photos in Vercel Blob, which don't cascade (see the `lib/image` invariant in `CLAUDE.md`). A self-serve "Delete account" action (confirm dialog, re-enter password) would honor the GDPR right to erasure without manual work. Likely fix: `lib/user` `deleteUser()` that removes Blob files through `lib/image` first, a `'use server'` action, then `deleteSession()` and redirect to `/`.
- `M` **9 React hook lint warnings to refactor.** `eslint.config.mjs` downgrades `react-hooks/set-state-in-effect` and `react-hooks/purity` to warnings so CI could start linting. Each warning needs a component change and a browser check:
  - `setState` inside `useEffect`: `NewBoxForm.tsx:48`, `NewItemForm.tsx:50` (reset the image on success; do it in the submit flow instead), `ImageInputPreview.tsx:18` (derive the preview URL with `useMemo`, clean up in an effect), `ItemCard.tsx:22`, `ItemsList.tsx:19` (derive instead of syncing state), `hooks/useIsMobile.ts:14` (use `useSyncExternalStore`).
  - `Math.random` during render: `components/ui/sidebar.tsx:612` (generated shadcn skeleton).
  - Missing hook dependencies: `NewBoxForm.tsx:54` (`onSuccess`), `EditableImage.tsx:44` (`boxId`, `itemId`, `router`).
  - Then restore both rules to errors (delete the override).

- `M` **No test runner.** "Verify" is only type-checking and manual checks. Add Vitest and start with the risky pure logic: zod schemas and the `userId` scoping in `lib/*`.

## 🟢 Low

- `S` **Creating a box or item with a photo isn't atomic.** `create-box.ts` / `create-item.ts` create the row, then upload the photo. If the Blob upload or the image update fails, the action reports an error but the row stays, so a retry creates a duplicate. (Bad image files are rejected before the row since #48; this is about upload/DB failures.) Likely fix: delete the row when `saveImage` throws.
- `S` **19 source files aren't prettier-formatted**, mostly shadcn `components/ui/*`, plus `hooks/useIsMobile.ts`, `lib/user.ts` and `lib/utils.ts`. The prettier hook will reformat each one the first time it's edited, which adds noise to that diff. Format them all in one commit.
- `S` **Move back to TypeScript 7** once typescript-eslint supports it (tracking: typescript-eslint#10940). Set `"typescript"` to `^7` in `package.json`, check that `yarn lint` and `next dev` both work, then remove the gotcha from `CLAUDE.md`.
- `S` **Parallel sessions with worktrees** (an idea, not a problem). Once reviewing PRs feels routine, run several tasks at once in separate worktrees (`claude --worktree`).
- `L` **Translate the site (French first).** Everything is hard-coded English and `<html lang="en">` is fixed (`app/layout.tsx:25`). Needs a decision on routing (`/fr/...` prefix vs. cookie/`Accept-Language`) and a library (e.g. `next-intl`, check it supports Next 16's `proxy.ts`), then extracting strings from components, emails (`components/auth/ForgotPasswordEmailTemplate.tsx`) and the legal pages. French legal pages would also suit French users (loi Toubon). Pairs with SEO: `hreflang` alternates per language.
