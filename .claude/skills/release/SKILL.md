---
name: release
description: Prepare a what-box release. Opens (or updates) the PR from dev into main, summarizing what goes live and any migrations. Use when the user wants to ship, go live, release, deploy to production, or types /release.
---

# Release dev to production

`dev` is staging (Vercel preview + dev database); `main` is production. A release is a PR from `dev` into `main`. Never merge it yourself.

## 1. Check the state

1. `git fetch origin` and run `git status`. If there are uncommitted changes, stop and ask.
2. `git log --oneline origin/main..origin/dev`: if it's empty, there's nothing to release; say so and stop.
3. `gh pr list --base main --head dev --state open`: if a release PR is already open, update it in step 3 instead of opening a new one.
4. `gh run list --branch dev --limit 1`: if CI failed on `dev`, stop and report it.

## 2. Summarize what goes live

- The PRs merged into `dev` since the last release: `git log --oneline --merges origin/main..origin/dev` and the squashed `(#NN)` commits.
- **Migrations**: `git diff --stat origin/main...origin/dev -- drizzle/`. List each new migration and flag destructive statements (`DROP`, `RENAME`, `SET NOT NULL`): production applies them automatically on deploy, before the new code is live.
- Anything that needs a manual step in production (env vars, Vercel or GitHub settings).

## 3. Open the release PR

```bash
gh pr create --base main --head dev --title "release: <short summary>" --body "<description>"
```

Body: the list of changes (one line each, with PR links), the migrations section, manual steps, and a reminder of what to check on staging before merging. End with the attribution line from the system prompt, if there is one. If the PR already exists, `gh pr edit` it instead.

## 4. Report

The PR link, the summary, and this reminder: **merge it with a merge commit, never a squash**. Squashing `dev` into `main` makes their histories diverge, and every later release would conflict. If a fix goes straight to `main`, merge `main` back into `dev` afterwards.
