# Backlog

Side issues noticed during other tasks. Pick one up as its own task, then delete its entry.

Entries are grouped by **priority** and tagged with **effort**. Within a group, do the smallest first.

- **Priority**: 🔴 **High**: breaks or silently weakens something we rely on (deploys, checks). 🟡 **Medium**: slows us down or hides problems. 🟢 **Low**: cleanup or ideas.
- **Effort**: `S` < 1h, mechanical. `M` a few hours or needs a decision. `L` a day or more.

## 🔴 High

- `S` **`yarn lint` crashes.** `typescript-eslint` doesn't support TypeScript 7 (`package.json` pins `typescript@^7`), so no file gets linted, locally or in CI. Fix: pin TypeScript 6 (simplest, if nothing needs 7), or run `typescript-eslint` against the TS 6 API side by side (see the link in the error). Then add `yarn lint` to `.github/workflows/ci.yml` and remove the gotcha from `CLAUDE.md`. Expect some existing lint errors to fix once it runs again.

## 🟡 Medium

- `S` **CI isn't required to merge.** The GitHub ruleset on `main` requires a PR, but a PR with a failing `check` job can still be merged. Fix (needs you, in GitHub → Settings → Rules → "main"): enable "Require status checks to pass" and add `check`.
- `S` **Vercel preview deploys always fail** (PRs #28, #29, #31): `Invalid environment variables` while loading `next.config.ts`, because the Preview environment is missing variables that `env.ts` requires. Production deploys from `main` succeed. Fix (needs you, in the Vercel dashboard): add the variables to the Preview environment, ideally pointing at a non-production database. This gives every PR a live preview URL to test.
- `S` **Leftover `apps/` and `packages/` folders** (untracked, probably from the mobile work). tsc's `**/*.ts` include picks up `apps/mobile/src`, so leftovers can cause type errors that have nothing to do with the app. Check with you first: `apps/mobile/src` may hold uncommitted work. Then delete the folders or move the work to a branch.
- `M` **No test runner.** "Verify" is only type-checking and manual checks. Add Vitest and start with the risky pure logic: zod schemas and the `userId` scoping in `lib/*`.

## 🟢 Low

- `S` **19 source files aren't prettier-formatted**, mostly shadcn `components/ui/*`, plus `hooks/useIsMobile.ts`, `lib/user.ts` and `lib/utils.ts`. The prettier hook will reformat each one the first time it's edited, which adds noise to that diff. Format them all in one commit.
- `S` **Parallel sessions with worktrees** (an idea, not a problem). Once reviewing PRs feels routine, run several tasks at once in separate worktrees (`claude --worktree`).
