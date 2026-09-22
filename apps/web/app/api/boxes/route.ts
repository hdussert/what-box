import { BOXES_SORT_OPTIONS } from '@/lib/box/const'
import { getBoxes } from '@/lib/box/queries'
import { apiRoute } from '@/lib/api/response'
import { z } from 'zod'

const SortSchema = z.enum(BOXES_SORT_OPTIONS.map((option) => option.value))

/**
 * `GET /api/boxes?search=&sort=` - the same query `getBoxes()` already
 * serves to the dashboard page, returned as JSON instead of rendered.
 */
export async function GET(request: Request) {
  return apiRoute(() => {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search') ?? undefined
    const rawSort = searchParams.get('sort')
    const sort = rawSort ? SortSchema.parse(rawSort) : undefined

    return getBoxes({ search, sort })
  })
}
