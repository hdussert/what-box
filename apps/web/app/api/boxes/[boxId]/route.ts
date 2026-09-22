import { apiRoute } from '@/lib/api/response'
import { getBoxById } from '@/lib/box/queries'
import { NextResponse } from 'next/server'

type RouteParams = { params: Promise<{ boxId: string }> }

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
