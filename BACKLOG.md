# Backlog

Side issues noticed during other tasks. Pick one up as its own task, then delete its entry.

- **`yarn lint` crashes.** `typescript-eslint` doesn't support TypeScript 7 (`package.json` pins `typescript@^7`). No file gets linted, locally or in CI. Fix: run `typescript-eslint` against the TS 6 API side by side (see the link in the error), or pin TypeScript 6. Then add `yarn lint` to `.github/workflows/ci.yml`.
- **Vercel preview deploys always fail** (PRs #28, #29, #31): `Invalid environment variables` while loading `next.config.ts`, because the Preview environment is missing variables that `env.ts` requires. Production deploys from `main` succeed. Fix: add the variables to Vercel's Preview environment. This gives every PR a live preview URL to test.
- **No test runner.** "Verify" is only type-checking and manual checks. Add Vitest once there's logic worth testing (`lib/*` queries, zod schemas).
- **The wrong lockfile is committed.** `.gitignore:4` (`*.lock`) ignores `yarn.lock`, and the stale `package-lock.json` is tracked. CI installs without a lockfile, and Vercel may be installing with npm from the stale file. Fix: un-ignore and commit `yarn.lock`, delete `package-lock.json`, check the next Vercel deploy, then switch CI to `yarn install --frozen-lockfile` with `cache: yarn`.
- **Leftover `apps/` and `packages/` folders** (untracked, only `node_modules` and a few files), probably from the mobile work. tsc's `**/*.ts` include still picks up `apps/mobile/src`. Delete them or move the work to a branch.
- **19 source files aren't prettier-formatted**, mostly shadcn `components/ui/*`, plus `hooks/useIsMobile.ts`, `lib/user.ts` and `lib/utils.ts`. The prettier hook will reformat each one the first time it's edited, which adds noise to that diff. Format them all in one commit.
- **Parallel sessions with worktrees.** Once reviewing PRs feels routine, run several tasks at once in separate worktrees (`claude --worktree`).
