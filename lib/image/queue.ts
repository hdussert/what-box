import { db } from '@/db'
import { imageCleanupQueue } from '@/db/schema'
import { userImagePrefix } from '@/lib/image/utils'
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
  const user = await getCurrentUser()
  const list = Array.isArray(pathnames) ? pathnames : [pathnames]
  if (!list.length) {
    return
  }

  // The table has no userId: scope by the user's storage prefix instead
  const prefix = userImagePrefix(user.id)
  if (list.some((pathname) => !pathname.startsWith(prefix))) {
    throw new Error('Cannot enqueue another user’s image files')
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
