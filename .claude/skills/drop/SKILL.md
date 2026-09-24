---
name: drop
description: Abandon the current what-box task cleanly. Shows what would be lost, then closes its PR, deletes the branch (remote and local) and returns to dev. Use when the user wants to stop, drop, abandon or cancel the current task or its PR, or types /drop.
argument-hint: <why it's dropped (optional)>
---

# Drop a task

Reason: $ARGUMENTS

Deleting a branch with work that isn't on GitHub can't be undone, so nothing is deleted before the user confirms.

## 1. Show what would be lost

1. `git branch --show-current`. If it's `main` or `dev`, stop: there's no task to drop.
2. `git status --short`: uncommitted changes.
3. `git fetch -q` then `git log --oneline origin/<branch>..HEAD`: commits that were never pushed.
4. `gh pr view --json number,title,url,state`: the PR, if any.
5. `git log --oneline <base>..HEAD` (`<base>` is `dev`, or `main` for a `hotfix/…` branch): all the work on the branch.

Summarize it in a few lines: the branch, the PR, and what exists only on this machine (uncommitted changes, unpushed commits), which will be **lost for good**. Pushed commits stay reachable through the closed PR.

## 2. Confirm

Ask the user to confirm the drop. If part of the work is worth keeping as an idea, offer to log it in `BACKLOG.md`. If there's no reason in `$ARGUMENTS`, ask for one line to put on the PR.

Stop here unless the user confirms.

## 3. Drop

```bash
gh pr close <number> --comment "Dropped: <reason>" --delete-branch
git switch dev && git pull
git branch -D <branch>
```

`--delete-branch` also deletes the remote branch; if the branch had no PR, run `git push origin --delete <branch>` instead (skip it if the branch was never pushed). Discard uncommitted changes only because the user confirmed losing them: `git switch --discard-changes dev`.

## 4. Report

One or two lines: the closed PR's link, that the branch is gone (remote and local), and that the PR can be reopened and its branch restored from GitHub if needed. If an idea was worth keeping, give its backlog entry text: it goes into the next task's PR, since this branch is gone and `dev` only takes PRs.
