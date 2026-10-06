import { db } from '@/db'
import { boxes, imageCleanupQueue, items } from '@/db/schema'
import { del } from '@vercel/blob'
import { and, asc, inArray, lt } from 'drizzle-orm'
import 'server-only'

// An upload is enqueued before its row exists: give it time to be saved
const GRACE_PERIOD_MS = 24 * 60 * 60 * 1000
const BATCH_SIZE = 500
// Under the function's 300 s limit, so a run ends cleanly
const TIME_BUDGET_MS = 250 * 1000

/**
 * Delete the queued image files that no box or item references, once their
 * grace period has passed, and empty the queue of those it checked. Safe to
 * run again or concurrently: a file left by a failed run stays queued.
 *
 * A system job with no signed-in user: it reads every user's rows by design.
 * Only the cron route, authenticated by `CRON_SECRET`, calls it.
 */
export async function processImageCleanupQueue() {
  const startedAt = Date.now()
  const cutoff = new Date(startedAt - GRACE_PERIOD_MS)
  let checked = 0
  let deleted = 0

  while (Date.now() - startedAt < TIME_BUDGET_MS) {
    const batch = await getDueCandidates(cutoff)
    if (!batch.length) {
      break
    }

    const referenced = await getReferencedPathnames(batch)
    const unreferenced = batch.filter((pathname) => !referenced.has(pathname))
    // A due candidate can't become referenced now: rows only ever point to
    // fresh uploads, which are still in their grace period
    if (unreferenced.length) {
      await del(unreferenced)
    }

    // A candidate enqueued again during the run has a newer queuedAt: keep it
    await db
      .delete(imageCleanupQueue)
      .where(
        and(
          inArray(imageCleanupQueue.pathname, batch),
          lt(imageCleanupQueue.queuedAt, cutoff),
        ),
      )

    checked += batch.length
    deleted += unreferenced.length
  }

  return { checked, deleted }
}

async function getDueCandidates(cutoff: Date) {
  const rows = await db
    .select({ pathname: imageCleanupQueue.pathname })
    .from(imageCleanupQueue)
    .where(lt(imageCleanupQueue.queuedAt, cutoff))
    .orderBy(asc(imageCleanupQueue.queuedAt))
    .limit(BATCH_SIZE)

  return rows.map(({ pathname }) => pathname)
}

async function getReferencedPathnames(pathnames: string[]) {
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

  return new Set([...boxRows, ...itemRows].map(({ pathname }) => pathname))
}
