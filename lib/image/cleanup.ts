import { db } from '@/db'
import { boxes, items } from '@/db/schema'
import { del, list } from '@vercel/blob'
import { inArray } from 'drizzle-orm'
import 'server-only'

// Every upload happens before the row pointing to it is written
// (createWithImage, saveImage): the grace period must outlast that gap
const GRACE_PERIOD_MS = 24 * 60 * 60 * 1000
// Under the function's 300 s limit, so a run ends cleanly
const TIME_BUDGET_MS = 250 * 1000

/**
 * Delete the files in the Blob store that no box or item references. The
 * store must hold only box and item images: anything else would be deleted.
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
    const unreferenced = await getUnreferenced(pathnames)

    if (unreferenced.length) {
      await del(unreferenced)
    }

    scanned += page.blobs.length
    deleted += unreferenced.length
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor && Date.now() - startedAt < TIME_BUDGET_MS)

  return { scanned, deleted, isComplete: !cursor }
}

/** The pathnames no box or item points to, across every user */
async function getUnreferenced(pathnames: string[]) {
  if (!pathnames.length) {
    return []
  }

  const [boxRows, itemRows] = await Promise.all([
    db
      .select({ pathname: boxes.imagePathname })
      .from(boxes)
      .where(inArray(boxes.imagePathname, pathnames)),
    db
      .select({ pathname: items.imagePathname })
      .from(items)
      .where(inArray(items.imagePathname, pathnames)),
  ])
  const referenced = new Set(
    [...boxRows, ...itemRows].map(({ pathname }) => pathname),
  )

  return pathnames.filter((pathname) => !referenced.has(pathname))
}
