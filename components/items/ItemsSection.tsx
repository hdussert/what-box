import ItemsList from '@/components/items/ItemsList'
import ItemsListEmpty from '@/components/items/ItemsListEmpty'
import ItemsToolbar from '@/components/items/ItemsToolbar'

import { Item } from '@/db/schema'

type ItemsSectionProps = {
  boxId: string
  items: Item[]
}

const ItemsSection = ({ boxId, items }: ItemsSectionProps) => {
  const isEmpty = items.length === 0

  return (
    <div>
      <ItemsToolbar boxId={boxId} itemIds={items.map(({ id }) => id)} />
      {isEmpty ? <ItemsListEmpty /> : <ItemsList items={items} />}
    </div>
  )
}

export default ItemsSection
