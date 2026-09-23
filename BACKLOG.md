# Backlog

Side issues noticed during other tasks. Pick one up as its own task, then delete its entry.

Entries are grouped by **priority** and tagged with **effort**. Within a group, do the smallest first.

- **Priority**: 🔴 **High**: breaks or silently weakens something we rely on (deploys, checks). 🟡 **Medium**: slows us down or hides problems. 🟢 **Low**: cleanup or ideas.
- **Effort**: `S` < 1h, mechanical. `M` a few hours or needs a decision. `L` a day or more.

## 🔴 High

- `S` **Photos keep their GPS location.** `uploadImageFile` (`lib/image/storage.ts:20`) stores the file as uploaded, EXIF metadata included, and the blob is public: a phone photo usually carries the GPS coordinates of where it was taken (often the user's home), readable by anyone with the link. Fix: re-encode on upload with `sharp` (`.rotate()` to apply the orientation, then output without metadata) before `put`. Existing photos keep their EXIF until re-uploaded or migrated.

## 🟡 Medium

- `M` **Photos are public to anyone with the link.** Blobs use `access: 'public'` (`lib/image/storage.ts:20`); the random suffix makes URLs unguessable, but a leaked link (forwarded, history, logs) opens the photo without signing in, and the path exposes the user/box IDs and original file name. Fix: check whether Vercel Blob offers private access now, otherwise serve photos through a route handler that checks the session and ownership. Then drop the "Photos" caveat from `app/(marketing)/privacy/page.tsx`.
- `M` **No way to delete your account.** The privacy policy (`app/(marketing)/privacy/page.tsx`) promises deletion on request by email, so today it's a manual job: delete the user row (boxes and items cascade) *and* their photos in Vercel Blob, which don't cascade (see the `lib/image` invariant in `CLAUDE.md`). A self-serve "Delete account" action (confirm dialog, re-enter password) would honor the GDPR right to erasure without manual work. Likely fix: `lib/user` `deleteUser()` that removes Blob files through `lib/image` first, a `'use server'` action, then `deleteSession()` and redirect to `/`.
- `M` **9 React hook lint warnings to refactor.** `eslint.config.mjs` downgrades `react-hooks/set-state-in-effect` and `react-hooks/purity` to warnings so CI could start linting. Each warning needs a component change and a browser check:
  - `setState` inside `useEffect`: `NewBoxForm.tsx:48`, `NewItemForm.tsx:50` (reset the image on success; do it in the submit flow instead), `ImageInputPreview.tsx:18` (derive the preview URL with `useMemo`, clean up in an effect), `ItemCard.tsx:22`, `ItemsList.tsx:19` (derive instead of syncing state), `hooks/useIsMobile.ts:14` (use `useSyncExternalStore`).
  - `Math.random` during render: `components/ui/sidebar.tsx:612` (generated shadcn skeleton).
  - Missing hook dependencies: `NewBoxForm.tsx:54` (`onSuccess`), `EditableImage.tsx:44` (`boxId`, `itemId`, `router`).
  - Then restore both rules to errors (delete the override).

- `S` **CI isn't required to merge.** The GitHub ruleset on `main` requires a PR, but a PR with a failing `check` job can still be merged. Fix (needs you, in GitHub → Settings → Rules → "main"): enable "Require status checks to pass" and add `check`.
- `S` **Leftover `apps/` and `packages/` folders** (untracked, probably from the mobile work). tsc's `**/*.ts` include picks up `apps/mobile/src`, so leftovers can cause type errors that have nothing to do with the app. Check with you first: `apps/mobile/src` may hold uncommitted work. Then delete the folders or move the work to a branch.
- `M` **No test runner.** "Verify" is only type-checking and manual checks. Add Vitest and start with the risky pure logic: zod schemas and the `userId` scoping in `lib/*`.

## 🟢 Low

- `S` **19 source files aren't prettier-formatted**, mostly shadcn `components/ui/*`, plus `hooks/useIsMobile.ts`, `lib/user.ts` and `lib/utils.ts`. The prettier hook will reformat each one the first time it's edited, which adds noise to that diff. Format them all in one commit.
- `S` **Move back to TypeScript 7** once typescript-eslint supports it (tracking: typescript-eslint#10940). Set `"typescript"` to `^7` in `package.json`, check that `yarn lint` and `next dev` both work, then remove the gotcha from `CLAUDE.md`.
- `S` **Parallel sessions with worktrees** (an idea, not a problem). Once reviewing PRs feels routine, run several tasks at once in separate worktrees (`claude --worktree`).
- `M` **SEO for the public pages.** Only the root layout has metadata (`app/layout.tsx:18`, a generic title and description); there's no `robots`, `sitemap`, Open Graph image or canonical URL. Add `app/robots.ts` and `app/sitemap.ts` (public pages only: `/`, `/sign-in`, `/sign-up`, `/legal`, `/privacy`), a title template and `metadataBase` from `NEXT_PUBLIC_APP_URL`, per-page descriptions, an `opengraph-image`, and `noindex` on the signed-in pages and previews.
- `L` **Translate the site (French first).** Everything is hard-coded English and `<html lang="en">` is fixed (`app/layout.tsx:25`). Needs a decision on routing (`/fr/...` prefix vs. cookie/`Accept-Language`) and a library (e.g. `next-intl`, check it supports Next 16's `proxy.ts`), then extracting strings from components, emails (`components/auth/ForgotPasswordEmailTemplate.tsx`) and the legal pages. French legal pages would also suit French users (loi Toubon). Pairs with SEO: `hreflang` alternates per language.
