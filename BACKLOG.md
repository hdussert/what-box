# Backlog

Side issues noticed during other tasks. Pick one up as its own task, then delete its entry.

Entries are grouped by **priority** and tagged with **effort**. Within a group, do the smallest first.

- **Priority**: 🔴 **High**: breaks or silently weakens something we rely on (deploys, checks). 🟡 **Medium**: slows us down or hides problems. 🟢 **Low**: cleanup or ideas.
- **Effort**: `S` < 1h, mechanical. `M` a few hours or needs a decision. `L` a day or more.

## 🔴 High

_Nothing right now._

## 🟡 Medium

- `S` **Server actions swallow the signed-out redirect.** `actions/boxes/create-box.ts:43` calls `getCurrentUser()` inside `try`, and the `catch` turns Next's redirect error into `{ success: false, message: 'NEXT_REDIRECT' }`, so a signed-out user sees that as an error toast instead of being sent to sign-in. Other actions likely share the pattern. Fix: call `unstable_rethrow(error)` first in each `catch`, or move `getCurrentUser()` above the `try`.
- `M` **9 React hook lint warnings to refactor.** `eslint.config.mjs` downgrades `react-hooks/set-state-in-effect` and `react-hooks/purity` to warnings so CI could start linting. Each warning needs a component change and a browser check:
  - `setState` inside `useEffect`: `NewBoxForm.tsx:48`, `NewItemForm.tsx:50` (reset the image on success; do it in the submit flow instead), `ImageInputPreview.tsx:18` (derive the preview URL with `useMemo`, clean up in an effect), `ItemCard.tsx:22`, `ItemsList.tsx:19` (derive instead of syncing state), `hooks/useIsMobile.ts:14` (use `useSyncExternalStore`).
  - `Math.random` during render: `components/ui/sidebar.tsx:612` (generated shadcn skeleton).
  - Missing hook dependencies: `NewBoxForm.tsx:54` (`onSuccess`), `EditableImage.tsx:44` (`boxId`, `itemId`, `router`).
  - Then restore both rules to errors (delete the override).

- `S` **CI isn't required to merge.** The GitHub ruleset on `main` requires a PR, but a PR with a failing `check` job can still be merged. Fix (needs you, in GitHub → Settings → Rules → "main"): enable "Require status checks to pass" and add `check`.
- `S` **Leftover `apps/` and `packages/` folders** (untracked, probably from the mobile work). tsc's `**/*.ts` include picks up `apps/mobile/src`, so leftovers can cause type errors that have nothing to do with the app. Check with you first: `apps/mobile/src` may hold uncommitted work. Then delete the folders or move the work to a branch.
- `M` **No test runner.** "Verify" is only type-checking and manual checks. Add Vitest and start with the risky pure logic: zod schemas and the `userId` scoping in `lib/*`.

## 🟢 Low

- `S` **19 source files aren't prettier-formatted**, mostly shadcn `components/ui/*`, plus `hooks/useIsMobile.ts`, `lib/user.ts` and `lib/utils.ts`. The prettier hook will reformat each one the first time it's edited, which adds noise to that diff. Format them all in one commit.
- `S` **Move back to TypeScript 7** once typescript-eslint supports it (tracking: typescript-eslint#10940). Set `"typescript"` to `^7` in `package.json`, check that `yarn lint` and `next dev` both work, then remove the gotcha from `CLAUDE.md`.
- `S` **Parallel sessions with worktrees** (an idea, not a problem). Once reviewing PRs feels routine, run several tasks at once in separate worktrees (`claude --worktree`).
