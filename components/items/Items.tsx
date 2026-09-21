import ItemsList from '@/components/items/ItemsList'
import ItemsListEmpty from '@/components/items/ItemsListEmpty'
import ItemsToolbar from '@/components/items/ItemsToolbar'

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
      {isEmpty ? <ItemsListEmpty /> : <ItemsList items={items} />}
    </div>
  )
}

export default Items
