import ItemsSection from '@/components/items/ItemsSection'
import ListProvider from '@/components/list/ListProvider'
import { SelectionProvider } from '@/components/selection/SelectionProvider'
import { getItems } from '@/lib/item'
import { ITEMS_DEFAULT_SORT, ITEMS_SORT_OPTIONS } from '@/lib/item/const'
import { z } from 'zod'

type ItemsSlotProps = {
  params: Promise<{ boxId: string }>
  searchParams?: Promise<{ search?: string; sort?: string }>
}

const searchParamsSchema = z.object({
  search: z.string().trim().default(''),
  sort: z
    .enum(ITEMS_SORT_OPTIONS.map((option) => option.value))
    .catch(ITEMS_DEFAULT_SORT),
})

const ItemsSlot = async ({ params, searchParams }: ItemsSlotProps) => {
  const { boxId } = await params
  const queryParams = await searchParams
  const { search, sort } = searchParamsSchema.parse(queryParams)

  const result = await getItems(boxId, {
    search,
    sort,
  })

  return (
    <ListProvider
      sortOptions={ITEMS_SORT_OPTIONS}
      defaultSort={ITEMS_DEFAULT_SORT}
    >
      <SelectionProvider>
        <ItemsSection boxId={boxId} {...result} />
      </SelectionProvider>
    </ListProvider>
  )
}

export default ItemsSlot
