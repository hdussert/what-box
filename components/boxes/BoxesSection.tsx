'use client'

import BoxesHeader from '@/components/boxes/BoxesHeader'
import BoxesList from '@/components/boxes/BoxesList'
import BoxesListEmpty from '@/components/boxes/BoxesListEmpty'
import BoxesToolbar from '@/components/boxes/BoxesToolbar'
import UnprintedLabelsNotice from '@/components/boxes/labels/UnprintedLabelsNotice'
import { BoxWithRelations } from '@/lib/box'

type BoxesSectionProps = {
  boxes: BoxWithRelations[]
}

const BoxesSection = ({ boxes }: BoxesSectionProps) => {
  const isEmpty = boxes.length === 0
  const unprintedIds = boxes
    .filter((box) => !box.labelPrinted)
    .map(({ id }) => id)

  return (
    <div className="flex gap-2 flex-col">
      <BoxesHeader total={boxes.length} />
      <UnprintedLabelsNotice boxIds={unprintedIds} />
      <BoxesToolbar boxIds={boxes.map(({ id }) => id)} />
      {isEmpty ? <BoxesListEmpty /> : <BoxesList boxes={boxes} />}
    </div>
  )
}

export default BoxesSection
