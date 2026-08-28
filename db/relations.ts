import { boxes, boxImages, itemImages, items, users } from '@/db/schema'
import { defineRelations } from 'drizzle-orm'

export const relations = defineRelations(
  { users, boxes, boxImages, itemImages, items },
  (r) => ({
    users: {
      boxes: r.many.boxes(),
    },
    boxes: {
      images: r.many.boxImages(),
      items: r.many.items(),
      owner: r.one.users({
        from: r.boxes.userId,
        to: r.users.id,
        optional: false,
      }),
    },
    boxImages: {
      box: r.one.boxes({
        from: r.boxImages.boxId,
        to: r.boxes.id,
        optional: false,
      }),
    },
    items: {
      images: r.many.itemImages(),
      box: r.one.boxes({
        from: r.items.boxId,
        to: r.boxes.id,
        optional: false,
      }),
    },
    itemImages: {
      item: r.one.items({
        from: r.itemImages.itemId,
        to: r.items.id,
        optional: false,
      }),
    },
  }),
)
