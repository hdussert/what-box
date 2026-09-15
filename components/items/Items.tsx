import ItemsList from '@/components/items/ItemsList'
import ItemsToolbar from '@/components/items/ItemTableToolbar'
import NoItems from '@/components/items/NoItems'

import { ItemsPaginated } from '@/lib/item/types'

type ItemsProps = ItemsPaginated & {
  boxId: string
}

const Items = (props: ItemsProps) => {
  const { total, items, boxId } = props
  const isEmpty = total === 0

  return (
    <div>
      <ItemsToolbar boxId={boxId} />
      {isEmpty ? <NoItems /> : <ItemsList items={items} />}
    </div>
  )
}

export default Items
