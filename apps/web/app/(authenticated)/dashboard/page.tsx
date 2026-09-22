import BoxesSection from '@/components/boxes/BoxesSection'
import ListProvider from '@/components/list/ListProvider'
import { SelectionProvider } from '@/components/selection/SelectionProvider'
import { getBoxes } from '@/lib/box'
import { BOXES_DEFAULT_SORT, BOXES_SORT_OPTIONS } from '@/lib/box/const'
import z from 'zod'

export const dynamic = 'force-dynamic' // ← Force Next.js à re-render à chaque requête

type DashboardPageProps = {
  searchParams?: Promise<{ search?: string; sort?: string }>
}

// Make sure the SearchParams match with the ListParamsProvider
const searchParamsSchema = z.object({
  search: z.string().trim().default(''),
  sort: z
    .enum(BOXES_SORT_OPTIONS.map((option) => option.value))
    .catch(BOXES_DEFAULT_SORT),
})

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams
  const { search, sort } = searchParamsSchema.parse(params)

  const result = await getBoxes({
    search,
    sort,
  })

  return (
    <ListProvider
      sortOptions={BOXES_SORT_OPTIONS}
      defaultSort={BOXES_DEFAULT_SORT}
    >
      <SelectionProvider>
        <BoxesSection {...result} />
      </SelectionProvider>
    </ListProvider>
  )
}
