import { boxes, images, items, users } from '@/db/schema'
import { defineRelations } from 'drizzle-orm'

export const relations = defineRelations(
  { users, boxes, images, items },
  (r) => ({
    images: {
      box: r.one.boxes({
        from: r.images.boxId,
        to: r.boxes.id,
        optional: false,
      }),
    },
    items: {
      box: r.one.boxes({
        from: r.items.boxId,
        to: r.boxes.id,
        optional: false,
      }),
    },
    boxes: {
      images: r.many.images(),
      items: r.many.items(),
      owner: r.one.users({
        from: r.boxes.userId,
        to: r.users.id,
        optional: false,
      }),
    },
    users: {
      boxes: r.many.boxes(),
    },
  }),
)
