'use client'

import BoxCard from '@/app/components/box/dashboard/BoxCard'
import { useSelectionContext } from '@/app/components/common/selection/SelectionContext'
import { BoxWithAll } from '@/lib/box'
import { useRouter } from 'next/navigation'

type BoxesListProps = {
  boxes: BoxWithAll[]
}

const BoxesList = ({ boxes }: BoxesListProps) => {
  const router = useRouter()
  const { isSelecting, isSelected, toggleSelect } = useSelectionContext()
  const navigateToBoxPage = (boxId: string) => router.push(`/boxes/${boxId}`)
  const onClick = isSelecting ? toggleSelect : navigateToBoxPage

  return (
    <div className="flex gap-2 flex-col">
      {boxes.map((box, index) => (
        <BoxCard
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
