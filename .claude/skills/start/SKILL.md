---
name: start
description: Start a new what-box task (steps 1–2 of the CLAUDE.md workflow). Creates a branch from an up-to-date main, opens a draft PR, then plans if the task is non-trivial. Use when the user begins a new task, feature, fix or refactor, or types /start.
argument-hint: <task description>
---

# Start a task

Task: $ARGUMENTS

If the task is empty or unclear, ask what it is before touching git.

## 1. Branch

1. Run `git status`. If there are uncommitted changes, stop and ask the user what to do with them. Don't stash or discard them yourself.
2. `git switch main && git pull`
3. `git switch -c <type>/<short-kebab-name>`, where `<type>` is `feat`, `fix`, `refactor`, `docs` or `chore` (the conventional-commit type the work will use).

## 2. Draft PR

A PR needs at least one commit, so start with an empty one:

```bash
git commit --allow-empty -m "<type>: <summary>"
git push -u origin HEAD
gh pr create --draft --base main --title "<type>: <summary>" --body "<one or two lines: the goal>"
```

End the body with the attribution line from the system prompt, if there is one. Share the PR link.

## 3. Plan or go

Decide whether the task is non-trivial: several files, a new feature, a schema change, or anything with more than one reasonable approach.

- **Non-trivial**: explore the relevant code, then propose a plan and wait for approval (use plan mode if available). Keep the plan short: context, approach, files touched, how you'll verify.
- **Trivial** (a typo, a one-line fix, a copy change): say so in one line and implement directly.

After that, follow the rest of the workflow in `CLAUDE.md`. When the work is done, the user (or you) runs `/finish`.
