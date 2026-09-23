#!/bin/sh
# Vercel runs this instead of `build` (via the `vercel-build` script).
# Production (`main`) and staging (`dev`) apply pending migrations first, each
# to its own database, so a failed migration fails the deploy. They're the
# only deployments that build (see vercel-ignore-build.sh), so no other branch
# can migrate the shared dev database.
set -e

if [ "$VERCEL_ENV" = "production" ] || [ "$VERCEL_GIT_COMMIT_REF" = "dev" ]; then
  echo "Applying database migrations..."
  drizzle-kit migrate
fi

next build --turbo
