'use client'

import BoxesHeader from '@/app/components/box/dashboard/BoxesHeader'
import BoxesList from '@/app/components/box/list/BoxesList'
import BoxesToolbar from '@/app/components/box/list/BoxesToolbar'
import NoBoxes from '@/app/components/box/list/NoBoxes'
import { BoxesPaginated } from '@/lib/box'

const Boxes = (props: BoxesPaginated) => {
  const { items: boxes, total } = props
  const isEmpty = total === 0

  return (
    <div className="flex gap-2 flex-col">
      <BoxesHeader total={total} />
      <BoxesToolbar />
      {isEmpty ? <NoBoxes /> : <BoxesList boxes={boxes} />}
    </div>
  )
}

export default Boxes
