#!/bin/sh
# PreToolUse hook: blocks `git push` while on main or when main is the target.
# Permission deny rules only match command text, so they miss a bare `git push` on main.

cmd=$(jq -r '.tool_input.command // empty')

# Only the arguments of each `git push`, up to the next shell separator, so other
# commands in the same line that mention main don't trigger a false positive.
push_args=$(printf '%s\n' "$cmd" | grep -oE '(^|[^[:alnum:]_-])git push[^;&|]*')

if [ -z "$push_args" ]; then
  exit 0
fi

branch=$(git -C "$CLAUDE_PROJECT_DIR" branch --show-current 2>/dev/null)

if [ "$branch" = main ] || printf '%s\n' "$push_args" | grep -qE '[ :]main( |$)'; then
  echo "Pushing to main is blocked. Work on a branch and open a PR (see the Workflow section of CLAUDE.md)." >&2
  exit 2
fi
