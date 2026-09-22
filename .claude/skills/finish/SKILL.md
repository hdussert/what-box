---
name: finish
description: Finish the current what-box task (steps 4–6 of the CLAUDE.md workflow). Verifies, self-reviews, updates the PR description and marks the PR ready for review. Use when implementation is done and the user says finish, wrap up, ship it, ready for review, or types /finish.
---

# Finish a task

Stop and report at the first step that fails instead of papering over it. The user relies on "ready for review" meaning the checks actually passed.

## 1. Sanity check

- `git status`, `git branch --show-current`. You must be on a task branch, not `main`, with an open PR (`gh pr view`).
- Commit any leftover work with conventional commits.

## 2. Verify

- `yarn tsc --noEmit`. Only errors in source files count; `.next/types/` errors come from stale generated files.
- `yarn lint`, unless `CLAUDE.md` still says it's broken.
- If the change touches UI, run the app and check the change in the browser (the `run` skill or Chrome tools). If you can't, say so in the report instead of claiming it works.

Fix anything that fails, commit, and re-run.

## 3. Self-review

Run `/code-review` on the branch diff. Fix the findings that hold up, commit, and re-verify if code changed. Findings unrelated to this task go to `BACKLOG.md`, not into this PR.

## 4. Update the PR

Rewrite the title and description to reflect the final diff (`git diff main...HEAD`), not the original plan. Keep it concise but complete:

- **What** changed and **why** (a few bullets)
- **Caveats**: anything skipped, known limitations, follow-ups logged to `BACKLOG.md`
- **How to verify**: what you ran, plus what the reviewer should check by hand

`git push`, then `gh pr edit --title ... --body ...`, then `gh pr ready`.

## 5. Report

A few lines: the PR link, what was verified and how, and anything the user should look at. Don't merge. The user reviews and merges.
