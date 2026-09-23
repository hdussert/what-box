#!/bin/sh
# Vercel runs this instead of `build` (via the `vercel-build` script).
# Production deploys apply pending migrations first, so a failed migration
# fails the deploy. Previews share the dev database, so they never migrate.
set -e

if [ "$VERCEL_ENV" = "production" ]; then
  echo "Applying database migrations..."
  drizzle-kit migrate
fi

next build --turbo
