'use client'

import ItemsListRows from '@/components/items/ItemsListRows'
import { useSelection } from '@/components/selection/SelectionProvider'
import { Item } from '@/db/schema'

type ItemsListProps = {
  items: Item[]
}

const ItemsList = ({ items }: ItemsListProps) => {
  const { isSelecting } = useSelection()

  // Entering or leaving selection mode remounts the rows, which closes the
  // open item and ends any edit (React's "reset state with a key")
  return (
    <ItemsListRows key={isSelecting ? 'selecting' : 'browsing'} items={items} />
  )
}

export default ItemsList
