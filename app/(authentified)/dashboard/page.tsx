import Boxes from '@/app/components/box/dashboard/Boxes'
import ListParamsProvider from '@/app/components/common/list/ListParamsContext'
import { SelectionContextProvider } from '@/app/components/common/selection/SelectionContext'
import { getBoxes } from '@/lib/box'
import { BOXES_DEFAULT_SORT_OPTION, BOXES_SORT_OPTIONS } from '@/lib/box/const'
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
    .catch(BOXES_DEFAULT_SORT_OPTION),
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
    <ListParamsProvider
      sortOptions={BOXES_SORT_OPTIONS}
      defaultSortOption={BOXES_DEFAULT_SORT_OPTION}
    >
      <SelectionContextProvider>
        <Boxes {...result} />
      </SelectionContextProvider>
    </ListParamsProvider>
  )
}
