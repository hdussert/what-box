#!/bin/sh
# The Verify step in one command, for local use, /finish and CI.
# Stops at the first failing step.
set -e

# env.ts validates these whenever next.config.ts loads (typegen and build);
# nothing here uses them. Placeholders make every step behave the same with
# or without .env files (CI has none), and override them locally.
export JWT_SECRET=verify-placeholder-secret-at-least-32-characters
export DATABASE_URL=postgresql://verify:verify@localhost:5432/verify
export BLOB_READ_WRITE_TOKEN=verify-placeholder
export RESEND_API_KEY=verify-placeholder
export NEXT_PUBLIC_APP_URL=http://localhost:3000

echo "▸ Type check"
# Refresh Next's generated route types first, so stale ones in .next/ can't fail tsc
next typegen >/dev/null
tsc --noEmit --pretty false

echo "▸ Lint"
eslint

echo "▸ Build"
next build --turbo

echo "✓ All checks passed"
