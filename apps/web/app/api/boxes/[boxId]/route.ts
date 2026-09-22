import { apiRoute } from '@/lib/api/response'
import { updateBox } from '@/lib/box/mutations'
import { getBoxById } from '@/lib/box/queries'
import { UpdateBoxSchema } from '@what-box/shared'
import { NextResponse } from 'next/server'

type RouteParams = { params: Promise<{ boxId: string }> }

// The box id comes from the URL, not the body - REST convention for
// PATCH /resource/:id - so only `name` is validated from the request body.
const PatchBoxSchema = UpdateBoxSchema.pick({ name: true })

/**
 * `GET /api/boxes/:boxId` - box with its items. `getBoxById()` already scopes
 * by the current user, so a box owned by someone else 404s the same way it
 * does for a signed-in web user hitting the same ID.
 */
export async function GET(request: Request, { params }: RouteParams) {
  return apiRoute(async () => {
    const { boxId } = await params
    const box = await getBoxById(boxId)
    if (!box) {
      return NextResponse.json({ error: 'Box not found' }, { status: 404 })
    }
    return box
  })
}

/** `PATCH /api/boxes/:boxId` - rename. Body `{ name }`. */
export async function PATCH(request: Request, { params }: RouteParams) {
  return apiRoute(async () => {
    const { boxId } = await params
    const body = await request.json().catch(() => null)
    const { name } = PatchBoxSchema.parse(body)

    const box = await updateBox({ id: boxId, name })
    if (!box) {
      return NextResponse.json({ error: 'Box not found' }, { status: 404 })
    }
    return box
  })
}
