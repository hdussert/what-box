#!/bin/sh
# Vercel "Ignored Build Step" (`ignoreCommand` in vercel.json): exit 0 skips
# the build, exit 1 builds. Only production (`main`) and staging (`dev`)
# build; feature branches are checked by CI instead. For a one-off preview of
# a feature branch, run `vercel deploy` from it.

if [ "$VERCEL_ENV" = "production" ] || [ "$VERCEL_GIT_COMMIT_REF" = "dev" ]; then
  echo "Building $VERCEL_GIT_COMMIT_REF ($VERCEL_ENV)."
  exit 1
fi

echo "Skipping $VERCEL_GIT_COMMIT_REF: only main and dev deploy."
exit 0
