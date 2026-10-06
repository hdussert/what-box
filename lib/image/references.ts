import { db } from '@/db'
import { boxes, items } from '@/db/schema'
import { inArray } from 'drizzle-orm'
import 'server-only'

/**
 * Which of these pathnames a box or an item still points to, across every
 * user: the image cleanup deletes a file only if it's not in this set.
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
