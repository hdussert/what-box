'use client'

import ItemCard from '@/components/items/ItemCard'
import ItemListItem from '@/components/items/ItemListItem'
import { useSelection } from '@/components/selection/SelectionProvider'
import { ItemWithAll } from '@/lib/item'
import { useEffect, useState } from 'react'

type BoxesListProps = {
  items: ItemWithAll[]
}

const ItemsList = ({ items }: BoxesListProps) => {
  const { isSelecting, isSelected, toggleSelect } = useSelection()
  const [itemFocused, setItemFocused] = useState<string>()

  useEffect(() => {
    if (isSelecting) {
      setItemFocused(undefined)
    }
  }, [isSelecting])

  const toggleFocused = (itemId: string) => {
    if (itemId === itemFocused) {
      setItemFocused(undefined)
      return
    }
    setItemFocused(itemId)
  }

  const onClick = (item: ItemWithAll) => {
    return isSelecting ? toggleSelect(item.id) : toggleFocused(item.id) // navigateToItemPage
  }

  return (
    <div className="flex gap-2 flex-col py-2">
      {items.map((item, index) => (
        <ItemListItem
          key={index}
          isSelecting={isSelecting}
          selected={isSelected(item.id)}
          onClick={() => onClick(item)}
        >
          <ItemCard
            item={item}
            isSelected={isSelected(item.id)}
            isFocused={itemFocused === item.id}
          />
        </ItemListItem>
      ))}
    </div>
  )
}

export default ItemsList
