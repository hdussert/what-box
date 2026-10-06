import { db } from '@/db'
import { imageCleanupQueue } from '@/db/schema'
import { getCurrentUser } from '@/lib/user'
import 'server-only'

/**
 * Mark the signed-in user's image files as cleanup candidates. Call it before
 * a reference can disappear (before an upload, before a row's image is
 * replaced, removed or deleted): the cleanup job deletes a candidate only if
 * nothing references it once its grace period has passed, so enqueuing a file
 * that stays in use is harmless. Re-enqueuing restarts the grace period.
 */
export async function enqueueImageCleanup(pathnames: string | string[]) {
  // Auth check only. No userId scoping: a queued file is deleted only if no
  // row references it, so enqueuing can't remove anyone's photo in use. Older
  // uploads also aren't under the user's prefix.
  await getCurrentUser()
  const list = Array.isArray(pathnames) ? pathnames : [pathnames]
  if (!list.length) {
    return
  }

  const queuedAt = new Date()
  await db
    .insert(imageCleanupQueue)
    .values(list.map((pathname) => ({ pathname, queuedAt })))
    .onConflictDoUpdate({
      target: imageCleanupQueue.pathname,
      set: { queuedAt },
    })
}
