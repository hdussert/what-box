'use client'

import {
  BoxesContextProvider,
  useBoxesContext,
} from '@/app/components/box/table/BoxesContext'
import BoxesHeader from '@/app/components/box/table/BoxesHeader'
import BoxesList from '@/app/components/box/table/BoxesList'
import NoBoxes from '@/app/components/box/table/table/NoBoxes'
import BoxesSearchBar from '@/app/components/box/table/toolbar/BoxesSearchBar'
import BoxesToolbar from '@/app/components/box/table/toolbar/BoxesToolbar'
import { BoxesPaginated } from '@/lib/box/types'

type BoxesProps = BoxesPaginated

const _Boxes = () => {
  const { boxes, total } = useBoxesContext()

  const isEmpty = total === 0

  return (
    <div className="flex gap-2 flex-col">
      <BoxesHeader />
      <BoxesSearchBar />
      <BoxesToolbar />
      {isEmpty ? <NoBoxes /> : <BoxesList boxes={boxes} />}
    </div>
  )
}

const Boxes = (props: BoxesProps) => {
  return (
    <BoxesContextProvider {...props}>
      <_Boxes />
    </BoxesContextProvider>
  )
}

export default Boxes
