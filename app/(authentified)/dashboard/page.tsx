import BoxTable from '@/app/components/box/table/BoxTable'
import { getUserBoxesPaginated } from '@/lib/box'
import { DEFAULT_BOXES_SORT_OPTION, SORT_OPTIONS } from '@/lib/box/const'
import z from 'zod'

export const dynamic = 'force-dynamic' // ← Force Next.js à re-render à chaque requête

type DashboardPageProps = {
  searchParams?: Promise<{ search?: string; sort?: string; page?: string }>
}

const searchParamsSchema = z.object({
  search: z.string().trim().default(''),
  sort: z.enum(SORT_OPTIONS).catch(DEFAULT_BOXES_SORT_OPTION),
  page: z.coerce.number().min(1).catch(1),
})

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams
  const { search, sort, page } = searchParamsSchema.parse(params)

  const result = await getUserBoxesPaginated({
    search,
    sort,
    page,
    pageSize: 20,
  })

  return <BoxTable {...result} />
}
