'use client'

import { useSelectionContext } from '@/app/components/common/selection/SelectionContext'
import ItemCard from '@/app/components/item/ItemsCard'
import { ItemWithAll } from '@/lib/item'
import { useRouter } from 'next/navigation'

type BoxesListProps = {
  items: ItemWithAll[]
}

const ItemsList = ({ items }: BoxesListProps) => {
  const router = useRouter()
  const { isSelecting, isSelected, toggleSelect } = useSelectionContext()
  //   const navigateToItemPage = (boxId: string) => router.push(`/boxes/${boxId}`) // TODO : Open Item card / edit
  const onClick = isSelecting ? toggleSelect : () => null // navigateToItemPage

  return (
    <div className="flex gap-2 flex-col">
      {items.map((box, index) => (
        <ItemCard
          key={index}
          item={box}
          onClick={() => onClick(box.id)}
          selected={isSelected(box.id)}
          isSelecting={isSelecting}
        />
      ))}
    </div>
  )
}

export default ItemsList
