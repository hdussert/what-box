import ListParamsProvider from '@/app/components/common/list/ListParamsContext'
import { SelectionContextProvider } from '@/app/components/common/selection/SelectionContext'
import Items from '@/app/components/item/Items'
import { getItems } from '@/lib/item'
import { ITEMS_DEFAULT_SORT_OPTION, ITEMS_SORT_OPTIONS } from '@/lib/item/const'
import { z } from 'zod'

type ItemsSlotProps = {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ search?: string; sort?: string }>
}

const searchParamsSchema = z.object({
  search: z.string().trim().default(''),
  sort: z
    .enum(ITEMS_SORT_OPTIONS.map((option) => option.value))
    .catch(ITEMS_DEFAULT_SORT_OPTION),
})

const ItemsSlot = async ({ params, searchParams }: ItemsSlotProps) => {
  const { id } = await params
  const queryParams = await searchParams
  const { search, sort } = searchParamsSchema.parse(queryParams)

  const result = await getItems(id, {
    search,
    sort,
  })

  return (
    <ListParamsProvider
      sortOptions={ITEMS_SORT_OPTIONS}
      defaultSortOption={ITEMS_DEFAULT_SORT_OPTION}
    >
      <SelectionContextProvider>
        <Items boxId={id} {...result} />
      </SelectionContextProvider>
    </ListParamsProvider>
  )
}

export default ItemsSlot
