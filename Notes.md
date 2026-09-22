# Notes

Things noticed while working on mobile feature parity that should probably
change, but are out of scope for the task at hand. Not a task list — check
back in and decide what's worth turning into a ticket.

## From the production-readiness audit (2026-09-22)

- **No automated tests anywhere** (no jest/vitest/playwright, no CI). Every
  verification in this whole effort has been manual (`tsc`, real bundle
  builds, live curl tests against a throwaway DB user). Works, but there's no
  safety net against regressions as the API surface grows.
- **No CI** (`.github/workflows` doesn't exist). Nothing runs `tsc`/lint
  automatically on push or PR.
- **No error monitoring** (no Sentry/equivalent) and no structured logging -
  just raw `console.log`/`console.error`, landing in Vercel's default stream.
- **`deleteBoxesAction`, `deleteItemsAction`, `getBoxesByIdsAction` have no
  Zod validation** on their `string[]` inputs (`apps/web/actions/boxes/
  delete-boxes.ts`, `apps/web/actions/items/delete-items.ts`,
  `apps/web/actions/boxes/get-boxes-by-ids.ts`). Still `userId`-scoped
  underneath, so not an auth bypass - just an unvalidated shape/no cap on
  array size before it hits a Drizzle `IN (...)`.
- **No rollback of the parent record if image upload fails.**
  `create-box.ts`/`create-item.ts` insert the box/item row, then upload the
  image; if the upload step throws, the action returns `success: false` but
  the row was already committed - an orphaned box/item with no image and no
  visible indication to the user that it exists.
- **No CORS allowlist on `/api/*`.** Currently same-origin-only for browsers
  by Next's default (no explicit `Access-Control-*` headers anywhere), which
  is fine for the mobile app (not a browser, not subject to CORS) - but worth
  an explicit policy if any third-party web client ever needs these routes.
- Already-known minor bugs, still present as of this branch:
  - `apps/web/actions/items/create-item.ts` quantity validation error message
    says "must be 0 or more" but the actual rule is `.min(1)`.
  - `apps/web/actions/items/delete-items.ts` revalidates `/dashboard` instead
    of the specific box's page.
  - `apps/web/actions/auth/forgot-password.ts`: the Resend `.send()` call
    isn't awaited or error-checked (own `// TODO` comment acknowledges it) -
    still true after the auth-hardening pass, which only touched the
    token/cooldown logic around it.
  - `apps/web/db/schema.ts`: `boxes.labelPrinted` column exists but is never
    read or written anywhere in the codebase.

## Mobile-specific

- **Label printing has no mobile equivalent.** The web app prints physical
  labels via `window.print()` + a hidden print-only DOM (`BoxLabelsSheet.tsx`).
  There's no OS "print" on a phone in the same sense - the mobile QR/label
  ticket will need to become "view/share the QR code" (and maybe
  `expo-print` → PDF export) rather than a literal port. Flagged as a design
  decision in `QUESTIONS.md`.
