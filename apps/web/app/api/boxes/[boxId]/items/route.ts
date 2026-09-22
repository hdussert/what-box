import { apiRoute } from '@/lib/api/response'
import { ITEMS_SORT_OPTIONS } from '@/lib/item/const'
import { getItems } from '@/lib/item/queries'
import { z } from 'zod'

type RouteParams = { params: Promise<{ boxId: string }> }

const SortSchema = z.enum(ITEMS_SORT_OPTIONS.map((option) => option.value))

/**
 * `GET /api/boxes/:boxId/items?search=&sort=` - paginated/searchable, unlike
 * the items bundled into `GET /api/boxes/:boxId` (unpaginated, no search).
 * getItems() already scopes by the current user and the given boxId, so a
 * box that isn't the caller's just comes back empty, same as an empty box.
 */
export async function GET(request: Request, { params }: RouteParams) {
  return apiRoute(async () => {
    const { boxId } = await params
    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search') ?? undefined
    const rawSort = searchParams.get('sort')
    const sort = rawSort ? SortSchema.parse(rawSort) : undefined

    return getItems(boxId, { search, sort })
  })
}
