'use client'

import BoxCard from '@/components/boxes/BoxCard'
import { useList } from '@/components/list/ListProvider'
import SelectableRow from '@/components/selection/SelectableRow'
import { useSelection } from '@/components/selection/SelectionProvider'
import { BoxWithRelations } from '@/lib/box'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type BoxesListProps = {
  boxes: BoxWithRelations[]
}

const BoxesList = ({ boxes }: BoxesListProps) => {
  const router = useRouter()
  const { isSelecting, isSelected, toggleSelect } = useSelection()
  const { isPending } = useList()
  const navigateToBoxPage = (boxId: string) => router.push(`/boxes/${boxId}`)
  const onClick = isSelecting ? toggleSelect : navigateToBoxPage

  return (
    <div
      className={cn(
        'flex gap-2 flex-col transition-opacity',
        isPending && 'opacity-60',
      )}
    >
      {boxes.map((box, index) => (
        <SelectableRow
          key={index}
          onClick={() => onClick(box.id)}
          isSelected={isSelected(box.id)}
          isSelecting={isSelecting}
        >
          <BoxCard box={box} isSelected={isSelected(box.id)} />
        </SelectableRow>
      ))}
    </div>
  )
}

export default BoxesList
