import ItemTable from '@/app/components/box/item/ItemTable'
import { getItems } from '@/lib/item'
import { DEFAULT_ITEMS_SORT_OPTION, ITEMS_SORT_OPTIONS } from '@/lib/item/const'
import { z } from 'zod'

type ItemsSlotProps = {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ search?: string; sort?: string }>
}

const searchParamsSchema = z.object({
  search: z.string().trim().default(''),
  sort: z.enum(ITEMS_SORT_OPTIONS).catch(DEFAULT_ITEMS_SORT_OPTION),
})

const ItemsSlot = async ({ params, searchParams }: ItemsSlotProps) => {
  const { id } = await params
  const queryParams = await searchParams
  const { search, sort } = searchParamsSchema.parse(queryParams)

  const result = await getItems(id, {
    search,
    sort,
  })

  return <ItemTable boxId={id} {...result} />
}

export default ItemsSlot
