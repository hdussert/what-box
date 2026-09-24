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
  const [isEditing, setIsEditing] = useState(false)
  // No item is open while selecting
  const openItemId = isSelecting ? undefined : itemFocused

  const toggleFocused = (itemId: string) => {
    // Opening or closing an item ends any edit in progress
    setIsEditing(false)
    setItemFocused(itemId === itemFocused ? undefined : itemId)
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
            isFocused={openItemId === item.id}
            isEditing={openItemId === item.id && isEditing}
            onEdit={() => setIsEditing(true)}
            onEditEnd={() => setIsEditing(false)}
          />
        </SelectableRow>
      ))}
    </div>
  )
}

export default ItemsList
