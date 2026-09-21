'use client'

import ItemCard from '@/components/items/ItemCard'
import ItemRow from '@/components/items/ItemRow'
import { useSelection } from '@/components/selection/SelectionProvider'
import { ItemWithImages } from '@/lib/item'
import { useEffect, useState } from 'react'

type ItemsListProps = {
  items: ItemWithImages[]
}

const ItemsList = ({ items }: ItemsListProps) => {
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

  const onClick = (item: ItemWithImages) => {
    return isSelecting ? toggleSelect(item.id) : toggleFocused(item.id) // navigateToItemPage
  }

  return (
    <div className="flex gap-2 flex-col py-2">
      {items.map((item, index) => (
        <ItemRow
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
        </ItemRow>
      ))}
    </div>
  )
}

export default ItemsList
