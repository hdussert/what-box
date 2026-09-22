# Backlog

Side issues noticed during other tasks. Pick one up as its own task, then delete its entry.

- **`yarn lint` crashes.** `typescript-eslint` doesn't support TypeScript 7 (`package.json` pins `typescript@^7`). No file gets linted, locally or in CI. Fix: run `typescript-eslint` against the TS 6 API side by side (see the link in the error), or pin TypeScript 6. Then add `yarn lint` to `.github/workflows/ci.yml`.
- **No test runner.** "Verify" is only type-checking and manual checks. Add Vitest once there's logic worth testing (`lib/*` queries, zod schemas).
- **Stale `package-lock.json`.** Yarn is the package manager. Delete the file so no tool picks it up.
- **Leftover `apps/` and `packages/` folders** (untracked, only `node_modules` and a few files), probably from the mobile work. tsc's `**/*.ts` include still picks up `apps/mobile/src`. Delete them or move the work to a branch.
- **19 source files aren't prettier-formatted**, mostly shadcn `components/ui/*`, plus `hooks/useIsMobile.ts`, `lib/user.ts` and `lib/utils.ts`. The prettier hook will reformat each one the first time it's edited, which adds noise to that diff. Format them all in one commit.
- **Parallel sessions with worktrees.** Once reviewing PRs feels routine, run several tasks at once in separate worktrees (`claude --worktree`).
