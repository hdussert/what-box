'use client'

import { useSelectionContext } from '@/app/components/common/selection/SelectionContext'
import ItemCard from '@/app/components/item/ItemCard'
import { ItemWithAll } from '@/lib/item'

type BoxesListProps = {
  items: ItemWithAll[]
}

const ItemsList = ({ items }: BoxesListProps) => {
  const { isSelecting, isSelected, toggleSelect } = useSelectionContext()
  //   const navigateToItemPage = (boxId: string) => router.push(`/boxes/${boxId}`) // TODO : Open Item card / edit
  const onClick = isSelecting ? toggleSelect : () => null // navigateToItemPage

  return (
    <div className="flex gap-2 flex-col py-2">
      {items.map((item, index) => (
        <ItemCard
          key={index}
          item={item}
          onClick={() => onClick(item.id)}
          selected={isSelected(item.id)}
          isSelecting={isSelecting}
        />
      ))}
    </div>
  )
}

export default ItemsList
