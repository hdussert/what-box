import { getReferencedImagePathnames } from '@/lib/image/references'
import { del, list } from '@vercel/blob'
import 'server-only'

// createWithImage uploads before inserting the row: leave recent files alone
const GRACE_PERIOD_MS = 24 * 60 * 60 * 1000
// Under the function's 300 s limit, so a run ends cleanly
const TIME_BUDGET_MS = 250 * 1000

/**
 * Delete the image files in the Blob store that no box or item references,
 * a page of 1,000 at a time. Files uploaded in the last 24 h are skipped.
 * `isComplete` is false if the time budget ran out before the last page; the
 * next run starts over from the first page.
 *
 * A system job with no signed-in user: it reads every user's rows by design.
 * Only the cron route, authenticated by `CRON_SECRET`, calls it.
 */
export async function deleteUnreferencedImageFiles() {
  const startedAt = Date.now()
  const cutoff = startedAt - GRACE_PERIOD_MS
  let scanned = 0
  let deleted = 0
  let cursor: string | undefined

  do {
    const page = await list({ cursor, limit: 1000 })
    const pathnames = page.blobs
      .filter((blob) => blob.uploadedAt.getTime() < cutoff)
      .map((blob) => blob.pathname)
    const referenced = await getReferencedImagePathnames(pathnames)
    const unreferenced = pathnames.filter(
      (pathname) => !referenced.has(pathname),
    )

    if (unreferenced.length) {
      await del(unreferenced)
    }

    scanned += page.blobs.length
    deleted += unreferenced.length
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor && Date.now() - startedAt < TIME_BUDGET_MS)

  return { scanned, deleted, isComplete: !cursor }
}
