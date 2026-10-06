import { db } from '@/db'
import { boxes, items } from '@/db/schema'
import { inArray } from 'drizzle-orm'

// No 'server-only': scripts/image-cleanup-backfill.ts runs it outside Next.

/**
 * Which of these pathnames a box or an item still points to, across every
 * user. The single test of "in use" for the image cleanup: a file is deleted
 * only if it's not in this set.
 */
export async function getReferencedImagePathnames(pathnames: string[]) {
  if (!pathnames.length) {
    return new Set<string>()
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

  return new Set(
    [...boxRows, ...itemRows].flatMap(({ pathname }) =>
      pathname ? [pathname] : [],
    ),
  )
}
