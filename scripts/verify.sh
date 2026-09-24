#!/bin/sh
# The Verify step in one command, for local use, /finish and CI.
# Stops at the first failing step.
set -e

echo "▸ Type check"
# Refresh Next's generated route types first, so stale ones in .next/ can't fail tsc
next typegen >/dev/null
tsc --noEmit --pretty false

echo "▸ Lint"
eslint

echo "▸ Build"
# env.ts validates these at build time; the build itself never uses them.
# Placeholders make the build the same everywhere (they override .env files).
JWT_SECRET=check-placeholder-secret-at-least-32-characters \
DATABASE_URL=postgresql://check:check@localhost:5432/check \
BLOB_READ_WRITE_TOKEN=check-placeholder \
RESEND_API_KEY=check-placeholder \
NEXT_PUBLIC_APP_URL=http://localhost:3000 \
next build --turbo

echo "✓ All checks passed"
