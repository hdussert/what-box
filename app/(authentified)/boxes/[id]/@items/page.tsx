import ItemTable from '@/app/components/box/item/ItemTable'
import { getUserBoxItems } from '@/lib/item'
import { DEFAULT_ITEMS_SORT_OPTION, ITEMS_SORT_OPTIONS } from '@/lib/item/const'
import { z } from 'zod'

type ItemsSlotProps = {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ search?: string; sort?: string; page?: string }>
}

const searchParamsSchema = z.object({
  search: z.string().trim().default(''),
  sort: z.enum(ITEMS_SORT_OPTIONS).catch(DEFAULT_ITEMS_SORT_OPTION),
  page: z.coerce.number().min(1).catch(1),
})

const ItemsSlot = async ({ params, searchParams }: ItemsSlotProps) => {
  const { id } = await params
  const queryParams = await searchParams
  const { search, sort, page } = searchParamsSchema.parse(queryParams)

  const result = await getUserBoxItems(id, {
    search,
    sort,
    page,
    pageSize: 100,
  })

  return <ItemTable boxId={id} {...result} />
}

export default ItemsSlot
