import { apiRoute } from '@/lib/api/response'
import { BOXES_SORT_OPTIONS } from '@/lib/box/const'
import { createBox, deleteBoxesWithImages } from '@/lib/box/mutations'
import { getBoxByShortId, getBoxes } from '@/lib/box/queries'
import { generateShortId } from '@/lib/id'
import { CreateBoxSchema, DeleteBoxesSchema } from '@what-box/shared'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const SortSchema = z.enum(BOXES_SORT_OPTIONS.map((option) => option.value))

/**
 * `GET /api/boxes?search=&sort=` - the same query `getBoxes()` already
 * serves to the dashboard page, returned as JSON instead of rendered.
 */
export async function GET(request: Request) {
  return apiRoute(async () => {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search') ?? undefined
    const rawSort = searchParams.get('sort')
    const sort = rawSort ? SortSchema.parse(rawSort) : undefined
    return getBoxes({ search, sort })
  })
}

/** `POST /api/boxes` - body `{ name }`. Image upload is a separate step, `POST /api/images`. */
export async function POST(request: Request) {
  return apiRoute(async () => {
    const body = await request.json().catch(() => null)
    const { name } = CreateBoxSchema.parse(body)

    // Same uniqueness loop create-box.ts uses.
    let shortId = generateShortId()
    while (await getBoxByShortId(shortId)) {
      shortId = generateShortId()
    }

    const box = await createBox(name, shortId)
    return NextResponse.json(box, { status: 201 })
  })
}

/** `DELETE /api/boxes` - body `{ boxIds }`. Deletes the boxes' and their items' images too (best-effort). */
export async function DELETE(request: Request) {
  return apiRoute(async () => {
    const body = await request.json().catch(() => null)
    const { boxIds } = DeleteBoxesSchema.parse(body)

    const deleted = await deleteBoxesWithImages(boxIds)
    return { deleted }
  })
}
