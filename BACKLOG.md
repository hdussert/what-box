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
- `M` **No test runner.** "Verify" is only type-checking and manual checks. Add Vitest and start with the risky pure logic: zod schemas and the `userId` scoping in `lib/*`.

## 🟢 Low

- `M` **Unused photo files can pile up in Vercel Blob.** A few rare paths leave a file no box or item points to: a cleanup that fails after a failed insert (`createWithImage`) or after a replace (`saveImage`), and two replaces of the same photo at the same moment (both read the same old path in `saveImage`, `lib/image/mutations.ts`; the losing upload is never referenced). It only wastes storage, the app always shows a valid photo. Likely fix: an occasional sweep (script or cron) that lists Blob files and deletes those no row references; making the replace race-free would need the old path read and the new one written in one SQL statement.
- `S` **Move back to TypeScript 7** once typescript-eslint supports it (tracking: typescript-eslint#10940). Set `"typescript"` to `^7` in `package.json`, check that `yarn lint` and `next dev` both work, then remove the gotcha from `CLAUDE.md`.
- `L` **Translate the site (French first).** Everything is hard-coded English and `<html lang="en">` is fixed (`app/layout.tsx:25`). Needs a decision on routing (`/fr/...` prefix vs. cookie/`Accept-Language`) and a library (e.g. `next-intl`, check it supports Next 16's `proxy.ts`), then extracting strings from components, emails (`components/auth/ForgotPasswordEmailTemplate.tsx`) and the legal pages. French legal pages would also suit French users (loi Toubon). Pairs with SEO: `hreflang` alternates per language.
