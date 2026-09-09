import { boxes, images, items, users } from '@/db/schema'
import { defineRelations } from 'drizzle-orm'

export const relations = defineRelations(
  { users, boxes, images, items },
  (r) => ({
    users: {
      boxes: r.many.boxes(),
      items: r.many.items(),
      images: r.many.images(),
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
    images: {
      owner: r.one.users({
        from: r.images.userId,
        to: r.users.id,
        optional: false,
      }),
      box: r.one.boxes({
        from: r.images.boxId,
        to: r.boxes.id,
        optional: true,
      }),
      item: r.one.items({
        from: r.images.itemId,
        to: r.items.id,
        optional: true,
      }),
    },

    items: {
      images: r.many.images(),
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
  }),
)
