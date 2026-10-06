/**
 * One-off: enqueue every image file in the Blob store that no box or item
 * references, so the cleanup job deletes it after its grace period (with the
 * same reference check). Enqueues only, never deletes.
 *
 *   yarn image:backfill [--dry-run]       dev store and DB
 *   yarn image:backfill:prod [--dry-run]  production store and DB
 */
import { db } from '@/db'
import { imageCleanupQueue } from '@/db/schema'
import { getReferencedImagePathnames } from '@/lib/image/references'
import { list } from '@vercel/blob'

const isDryRun = process.argv.includes('--dry-run')

async function main() {
  let scanned = 0
  let orphaned = 0
  let cursor: string | undefined

  do {
    const page = await list({ cursor, limit: 1000 })
    const pathnames = page.blobs.map((blob) => blob.pathname)
    const orphans = await getUnreferenced(pathnames)

    if (orphans.length && !isDryRun) {
      // Keeps the grace period of files already queued
      await db
        .insert(imageCleanupQueue)
        .values(orphans.map((pathname) => ({ pathname })))
        .onConflictDoNothing()
    }

    scanned += pathnames.length
    orphaned += orphans.length
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)

  const verb = isDryRun ? 'would enqueue' : 'enqueued'
  console.log(`Scanned ${scanned} files, ${verb} ${orphaned} unreferenced`)
}

async function getUnreferenced(pathnames: string[]) {
  const referenced = await getReferencedImagePathnames(pathnames)
  return pathnames.filter((pathname) => !referenced.has(pathname))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
