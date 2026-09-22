import { db } from '@/db'
import { boxes, items } from '@/db/schema'
import { getCurrentUser } from '@/lib/user'
import { and, eq, inArray, isNotNull } from 'drizzle-orm'
import 'server-only'

/** Pathnames of the boxes' images and of the images of the items they contain */
export async function getImagePathnamesByBoxIds(
  boxIds: string[],
): Promise<string[]> {
  const user = await getCurrentUser()

  const [boxRows, itemRows] = await Promise.all([
    db
      .select({ pathname: boxes.imagePathname })
      .from(boxes)
      .where(
        and(
          eq(boxes.userId, user.id),
          inArray(boxes.id, boxIds),
          isNotNull(boxes.imagePathname),
        ),
      ),
    db
      .select({ pathname: items.imagePathname })
      .from(items)
      .where(
        and(
          eq(items.userId, user.id),
          inArray(items.boxId, boxIds),
          isNotNull(items.imagePathname),
        ),
      ),
  ])

  return [...boxRows, ...itemRows].flatMap(({ pathname }) =>
    pathname ? [pathname] : [],
  )
}

export async function getImagePathnamesByItemIds(
  itemIds: string[],
): Promise<string[]> {
  const user = await getCurrentUser()

  const rows = await db
    .select({ pathname: items.imagePathname })
    .from(items)
    .where(
      and(
        eq(items.userId, user.id),
        inArray(items.id, itemIds),
        isNotNull(items.imagePathname),
      ),
    )

  return rows.flatMap(({ pathname }) => (pathname ? [pathname] : []))
}
