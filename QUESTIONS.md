# Questions / decisions made without asking

Judgment calls made while working autonomously on mobile feature parity, per
your instruction not to stop and ask. Review and override anything here you'd
have decided differently - nothing below is final.

## Auth hardening (fix/auth-hardening)

- **Lockout threshold/window**: 5 failed sign-in attempts locks the account
  for 15 minutes. Picked as a reasonable default, not derived from anything
  specific to this app - adjust if you want it stricter/looser.
- **Forgot-password cooldown**: 5 minutes between requests per email. Same
  reasoning - arbitrary but reasonable default.
- **Reset-token expiry**: shortened from 7 days (same as a session) to 1
  hour. Standard practice for reset links; open to a different value.
- **No new infra for rate limiting** (no Upstash/Redis): used DB-backed
  counters on the `users` table instead. Correct for Vercel's serverless
  model (in-memory counters don't persist reliably across instances) and
  avoids adding a paid external dependency for a personal-scale app - but if
  this app grows meaningfully, a dedicated rate-limiting service would be
  more robust than hand-rolled counters.

## Still to come (will be added here as they happen)

- Mobile label/QR feature: web "prints" labels; mobile has no direct
  equivalent. Planning to build it as "view/share the QR code" (possibly
  `expo-print` → PDF) rather than a literal port - see `Notes.md`. Will note
  the final call here once that ticket is built.
