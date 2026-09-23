// Vercel "Ignored Build Step" (`ignoreCommand` in vercel.json): exit 0 skips
// the build, exit 1 builds. Production always builds. Previews only build
// for a branch with an open, non-draft PR; drafts and branches without a PR
// are skipped. Marking a draft ready doesn't push, so
// .github/workflows/preview-on-ready.yml asks Vercel to deploy it then.
const BUILD = 1
const SKIP = 0

const {
  VERCEL_ENV,
  VERCEL_GIT_COMMIT_REF: branch,
  VERCEL_GIT_REPO_OWNER: owner,
  VERCEL_GIT_REPO_SLUG: repo,
} = process.env

if (VERCEL_ENV === 'production') {
  console.log('Production deployment: building.')
  process.exit(BUILD)
}

try {
  // The repo is public, so reading its PRs needs no token
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&head=${owner}:${encodeURIComponent(branch)}`
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!response.ok) {
    throw new Error(`GitHub API responded ${response.status}`)
  }

  const pulls = await response.json()
  if (pulls.some((pull) => !pull.draft)) {
    console.log(`${branch} has an open PR ready for review: building.`)
    process.exit(BUILD)
  }

  const reason = pulls.length ? 'only a draft PR' : 'no open PR'
  console.log(`${branch} has ${reason}: skipping the preview.`)
  process.exit(SKIP)
} catch (error) {
  // Fail open: a wasted build beats a silently missing preview
  console.log(`Couldn't check the PR status (${error.message}): building.`)
  process.exit(BUILD)
}
