'use client'

import BoxesHeader from '@/components/boxes/BoxesHeader'
import BoxesList from '@/components/boxes/BoxesList'
import BoxesListEmpty from '@/components/boxes/BoxesListEmpty'
import BoxesToolbar from '@/components/boxes/BoxesToolbar'
import { BoxWithRelations } from '@/lib/box'

type BoxesSectionProps = {
  boxes: BoxWithRelations[]
}

const BoxesSection = ({ boxes }: BoxesSectionProps) => {
  const isEmpty = boxes.length === 0

  return (
    <div className="flex gap-2 flex-col">
      <BoxesHeader total={boxes.length} />
      <BoxesToolbar boxIds={boxes.map(({ id }) => id)} />
      {isEmpty ? <BoxesListEmpty /> : <BoxesList boxes={boxes} />}
    </div>
  )
}

export default BoxesSection
