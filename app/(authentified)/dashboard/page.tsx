import Boxes from '@/app/components/box/dashboard/Boxes'
import { getBoxes } from '@/lib/box'
import { BOXES_DEFAULT_SORT_OPTION, BOXES_SORT_OPTIONS } from '@/lib/box/const'
import z from 'zod'

export const dynamic = 'force-dynamic' // ← Force Next.js à re-render à chaque requête

type DashboardPageProps = {
  searchParams?: Promise<{ search?: string; sort?: string }>
}

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

  return <Boxes {...result} />
}
