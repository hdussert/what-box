'use client'

import ItemCard from '@/components/items/ItemCard'
import SelectableRow from '@/components/selection/SelectableRow'
import { useSelection } from '@/components/selection/SelectionProvider'
import { Item } from '@/db/schema'
import { useState } from 'react'

type ItemsListProps = {
  items: Item[]
}

const ItemsList = ({ items }: ItemsListProps) => {
  const { isSelecting, isSelected, toggleSelect } = useSelection()
  const [itemFocused, setItemFocused] = useState<string>()

  // Entering selection mode closes the open item. Adjusted during render
  // instead of in an effect; it only runs while an item is still open.
  if (isSelecting && itemFocused) {
    setItemFocused(undefined)
  }

  const toggleFocused = (itemId: string) => {
    if (itemId === itemFocused) {
      setItemFocused(undefined)
      return
    }
    setItemFocused(itemId)
  }

  const onClick = (item: Item) => {
    return isSelecting ? toggleSelect(item.id) : toggleFocused(item.id) // navigateToItemPage
  }

  return (
    <div className="flex gap-2 flex-col py-2">
      {items.map((item, index) => (
        <SelectableRow
          key={index}
          isSelecting={isSelecting}
          isSelected={isSelected(item.id)}
          onClick={() => onClick(item)}
        >
          <ItemCard
            item={item}
            isSelected={isSelected(item.id)}
            isFocused={itemFocused === item.id}
          />
        </SelectableRow>
      ))}
    </div>
  )
}

export default ItemsList
