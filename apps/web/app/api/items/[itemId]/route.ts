import { apiRoute } from '@/lib/api/response'
import { getItemById, updateItem } from '@/lib/item'
import { UpdateItemSchema } from '@what-box/shared'
import { NextResponse } from 'next/server'

type RouteParams = { params: Promise<{ itemId: string }> }

// The item id comes from the URL, not the body - same REST convention as PATCH /api/boxes/:boxId.
const PatchItemSchema = UpdateItemSchema.omit({ id: true })

/** `GET /api/items/:itemId` - a single item. */
export async function GET(request: Request, { params }: RouteParams) {
  return apiRoute(async () => {
    const { itemId } = await params
    const item = await getItemById(itemId)
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    return item
  })
}

/** `PATCH /api/items/:itemId` - body `{ name, quantity }`. */
export async function PATCH(request: Request, { params }: RouteParams) {
  return apiRoute(async () => {
    const { itemId } = await params
    const body = await request.json().catch(() => null)
    const data = PatchItemSchema.parse(body)

    const item = await updateItem({ id: itemId, ...data })
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    return item
  })
}
