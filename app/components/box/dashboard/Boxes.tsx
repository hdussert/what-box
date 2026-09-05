'use client'

import BoxesHeader from '@/app/components/box/dashboard/BoxesHeader'
import BoxesList from '@/app/components/box/dashboard/BoxesList'
import BoxesToolbar from '@/app/components/box/dashboard/BoxesToolbar'
import {
  BoxesPageContextProvider,
  useBoxesPageContext,
} from '@/app/components/box/dashboard/context/BoxesPageContext'
import NoBoxes from '@/app/components/box/dashboard/NoBoxes'
import { SelectionContextProvider } from '@/app/components/common/selection/SelectionContext'
import { BoxesPaginated } from '@/lib/box/types'

type BoxesProps = BoxesPaginated

const _Boxes = () => {
  const { items: boxes, total } = useBoxesPageContext()

  const isEmpty = total === 0

  return (
    <div className="flex gap-2 flex-col">
      <BoxesHeader />
      <BoxesToolbar />
      {isEmpty ? <NoBoxes /> : <BoxesList boxes={boxes} />}
    </div>
  )
}

const Boxes = (props: BoxesProps) => {
  return (
    <BoxesPageContextProvider {...props}>
      <SelectionContextProvider>
        <_Boxes />
      </SelectionContextProvider>
    </BoxesPageContextProvider>
  )
}

export default Boxes
