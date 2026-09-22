'use client'

import BoxesHeader from '@/components/boxes/BoxesHeader'
import BoxesList from '@/components/boxes/BoxesList'
import BoxesListEmpty from '@/components/boxes/BoxesListEmpty'
import BoxesToolbar from '@/components/boxes/BoxesToolbar'
import { BoxesPaginated } from '@/lib/box'

const BoxesSection = (props: BoxesPaginated) => {
  const { rows: boxes, total } = props
  const isEmpty = total === 0

  return (
    <div className="flex gap-2 flex-col">
      <BoxesHeader total={total} />
      <BoxesToolbar />
      {isEmpty ? <BoxesListEmpty /> : <BoxesList boxes={boxes} />}
    </div>
  )
}

export default BoxesSection
