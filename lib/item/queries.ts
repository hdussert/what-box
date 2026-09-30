import { db } from '@/db'
import { Item } from '@/db/schema'
import { ITEMS_DEFAULT_SORT } from '@/lib/item/const'
import { toOrderBy } from '@/lib/list/utils'
import { getCurrentUser } from '@/lib/user'
import { escapeLike } from '@/lib/utils'
import 'server-only'
import { ItemsQuery } from './types'

export async function getItemById(itemId: string): Promise<Item | undefined> {
  const user = await getCurrentUser()
  return db.query.items.findFirst({
    where: { id: itemId, userId: user.id },
  })
}

export async function getItems(
  boxId: string,
  query: ItemsQuery = {},
): Promise<Item[]> {
  const user = await getCurrentUser()
  const search = query.search?.trim()
  const pattern = search ? `%${escapeLike(search)}%` : undefined

  return db.query.items.findMany({
    where: {
      userId: user.id,
      boxId,
      ...(pattern ? { name: { ilike: pattern } } : {}),
    },
    orderBy: (table, operators) =>
      toOrderBy(query.sort ?? ITEMS_DEFAULT_SORT, table, operators),
  })
}
