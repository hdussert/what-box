import BoxTableClient from '@/app/components/box/table/BoxTableClient'
import { DEFAULT_BOXES_SORT_OPTION, SORT_OPTIONS } from '@/lib/box/const'
import { getUserBoxesPaginated } from '@/lib/box/queries'
import { z } from 'zod'

type BoxTableProps = {
  searchParams?: {
    search?: string
    sort?: string
    page?: string
  }
}

const searchParamsSchema = z.object({
  search: z.string().trim().optional(),
  sort: z.enum(SORT_OPTIONS).optional(),
  page: z.coerce.number().min(1).optional(),
})

const BoxTable = async ({ searchParams }: BoxTableProps) => {
  // Validate and parse search parameters
  const validated = searchParamsSchema.safeParse(searchParams)
  const {
    search = '',
    sort = DEFAULT_BOXES_SORT_OPTION,
    page = 1,
  } = validated.data || {}

  const result = await getUserBoxesPaginated({
    search,
    sort,
    page,
    pageSize: 20,
  })

  return <BoxTableClient {...result} />
}

export default BoxTable
