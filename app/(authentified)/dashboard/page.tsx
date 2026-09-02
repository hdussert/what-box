import Boxes from '@/app/components/box/table/Boxes'
import { getBoxes } from '@/lib/box'
import { DEFAULT_BOXES_SORT_OPTION, SORT_OPTIONS_VALUES } from '@/lib/box/const'
import z from 'zod'

export const dynamic = 'force-dynamic' // ← Force Next.js à re-render à chaque requête

type DashboardPageProps = {
  searchParams?: Promise<{ search?: string; sort?: string }>
}

const searchParamsSchema = z.object({
  search: z.string().trim().default(''),
  sort: z.enum(SORT_OPTIONS_VALUES).catch(DEFAULT_BOXES_SORT_OPTION),
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

  return <Boxes {...result} />
}
