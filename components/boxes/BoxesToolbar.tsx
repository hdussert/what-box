'use client'

import DeleteSelectedBoxesButton from '@/components/boxes/DeleteSelectedBoxesButton'
import PrintSelectedLabelsButton from '@/components/boxes/labels/PrintSelectedLabelsButton'
import NewBoxButton from '@/components/boxes/NewBoxButton'
import ListControls from '@/components/list/ListControls'
import SelectionToolbar from '@/components/selection/SelectionToolbar'

type BoxesToolbarProps = {
  boxIds: string[]
  unprintedIds: string[]
}

const BoxesToolbar = ({ boxIds, unprintedIds }: BoxesToolbarProps) => {
  return (
    <div className="sticky top-0 z-20 flex flex-col gap-2 shadow-xl bg-background -mx-2 p-2 border-b">
      <ListControls />
      <SelectionToolbar
        ids={boxIds}
        presets={[{ label: 'Unprinted', ids: unprintedIds }]}
        actions={<NewBoxButton label="Add" />}
      >
        <PrintSelectedLabelsButton />
        <DeleteSelectedBoxesButton />
      </SelectionToolbar>
    </div>
  )
}

export default BoxesToolbar
