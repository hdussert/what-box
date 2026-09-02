'use client'

import { useBoxesContext } from '@/app/components/box/table/BoxesContext'
import BoxesListItem from '@/app/components/box/table/BoxesListItem'
import { BoxWithAll } from '@/lib/box'
import { useRouter } from 'next/navigation'

type BoxesListProps = {
  boxes: BoxWithAll[]
}
const BoxesList = ({ boxes }: BoxesListProps) => {
  const router = useRouter()
  const { selectedIds, setSelectedIds, isSelecting } = useBoxesContext()

  const navigateToBoxPage = (boxId: string) => router.push(`/boxes/${boxId}`)
  const toggleBoxSelection = (boxId: string) => {
    const index = selectedIds.indexOf(boxId)
    if (index > -1) {
      const array = [...selectedIds]
      array.splice(index, 1)
      setSelectedIds(array)
    } else {
      setSelectedIds([...selectedIds, boxId])
    }
  }
  const onClick = isSelecting ? toggleBoxSelection : navigateToBoxPage

  const isSelected = (boxId: string) => selectedIds.includes(boxId)

  return (
    <div className="flex gap-2 flex-col">
      {boxes.map((box, index) => (
        <BoxesListItem
          key={index}
          box={box}
          onClick={() => onClick(box.id)}
          selected={isSelected(box.id)}
          isSelecting={isSelecting}
        />
      ))}
    </div>
  )
}

export default BoxesList
