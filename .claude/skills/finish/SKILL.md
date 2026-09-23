---
name: finish
description: Finish the current what-box task (steps 4–6 of the CLAUDE.md workflow). Verifies, self-reviews, then pushes and opens the PR into dev. Use when implementation is done and the user says finish, wrap up, ship it, ready for review, or types /finish.
---

# Finish a task

Stop and report at the first step that fails instead of papering over it. The user relies on "ready for review" meaning the checks actually passed.

## 1. Sanity check

- `git status`, `git branch --show-current`. You must be on a task branch, not `main` or `dev`.
- Commit any leftover work with conventional commits.
- `gh pr view`: if the branch already has a PR (e.g. `/finish` runs again after changes), update it in step 4 instead of opening a new one.

## 2. Verify

- `yarn tsc --noEmit --pretty false`: read the `file(line,col): error TS…` lines. Only errors in source files count; `.next/` errors come from stale generated files. Don't grep the default (colored) output: the color codes hide the errors.
- `yarn lint`. Warnings don't block, but don't add new ones.
- If the change touches UI, run the app and check the change in the browser (the `run` skill or Chrome tools). If you can't, say so in the report instead of claiming it works.

Fix anything that fails, commit, and re-run.

## 3. Self-review

Run `/code-review` on the branch diff (`dev...HEAD`). Fix the findings that hold up, commit, and re-verify if code changed. Findings unrelated to this task go to `BACKLOG.md`, not into this PR.

## 4. Open the PR

Write the title and description from the final diff (`git diff dev...HEAD`), not the original plan. Keep it concise but complete:

- **What** changed and **why** (a few bullets)
- **Caveats**: anything skipped, known limitations, follow-ups logged to `BACKLOG.md`
- **How to verify**: what you ran, plus what the reviewer should check by hand (on staging once merged into `dev`, if it needs a deployed app)

End the body with the attribution line from the system prompt, if there is one.

```bash
git push -u origin HEAD
gh pr create --base dev --title "<type>: <summary>" --body "<description>"
```

If the PR already existed, `git push` then `gh pr edit --title ... --body ...` instead.

## 5. Report

A few lines: the PR link, what was verified and how, and anything the user should look at. Don't merge. The user reviews and merges (squash) into `dev`, tests it on staging, and ships it with `/release`.
