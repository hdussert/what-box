import { boxes, items, users } from '@/db/schema'
import { defineRelations } from 'drizzle-orm'

export const relations = defineRelations({ users, boxes, items }, (r) => ({
  users: {
    boxes: r.many.boxes(),
    items: r.many.items(),
  },
  boxes: {
    items: r.many.items(),
    owner: r.one.users({
      from: r.boxes.userId,
      to: r.users.id,
      optional: false,
    }),
  },
  items: {
    owner: r.one.users({
      from: r.items.userId,
      to: r.users.id,
      optional: false,
    }),
    box: r.one.boxes({
      from: r.items.boxId,
      to: r.boxes.id,
      optional: false,
    }),
  },
}))
