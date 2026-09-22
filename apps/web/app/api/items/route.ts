import { apiRoute } from '@/lib/api/response'
import { createItem, deleteItemsWithImages } from '@/lib/item/mutations'
import { CreateItemSchema, DeleteItemsSchema } from '@what-box/shared'
import { NextResponse } from 'next/server'

/** `POST /api/items` - body `{ boxId, name, quantity }`. Image upload is a separate step, `POST /api/images`. */
export async function POST(request: Request) {
  return apiRoute(async () => {
    const body = await request.json().catch(() => null)
    const data = CreateItemSchema.parse(body)

    const item = await createItem(data)
    if (!item) {
      return NextResponse.json({ error: 'Box not found' }, { status: 404 })
    }
    return NextResponse.json(item, { status: 201 })
  })
}

/** `DELETE /api/items` - body `{ itemIds }`. Deletes their images too (best-effort). */
export async function DELETE(request: Request) {
  return apiRoute(async () => {
    const body = await request.json().catch(() => null)
    const { itemIds } = DeleteItemsSchema.parse(body)

    const deleted = await deleteItemsWithImages(itemIds)
    return { deleted }
  })
}
