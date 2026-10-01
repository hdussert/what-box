'use client'

import { DeleteBoxesButton } from '@/components/boxes/DeleteBoxesButton'
import PrintSelectedLabelsButton from '@/components/boxes/labels/PrintSelectedLabelsButton'
import NewBoxButton from '@/components/boxes/NewBoxButton'
import ListControls from '@/components/list/ListControls'
import ActionLabel from '@/components/selection/ActionLabel'
import { useSelection } from '@/components/selection/SelectionProvider'
import SelectionToolbar from '@/components/selection/SelectionToolbar'
import { BulkAction } from '@/components/selection/types'
import { Printer, Trash } from 'lucide-react'

type BoxesToolbarProps = {
  boxIds: string[]
  unprintedIds: string[]
}

const BoxesToolbar = ({ boxIds, unprintedIds }: BoxesToolbarProps) => {
  const { selectedIds, stopSelecting } = useSelection()

  const bulkActions: BulkAction[] = [
    {
      id: 'print',
      label: 'Print',
      icon: Printer,
      presets: [{ label: 'Unprinted', ids: unprintedIds }],
      button: <PrintSelectedLabelsButton />,
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: Trash,
      button: (
        <DeleteBoxesButton boxIds={selectedIds} onSuccess={stopSelecting}>
          <ActionLabel icon={Trash} label="Delete" count={selectedIds.length} />
        </DeleteBoxesButton>
      ),
    },
  ]

  return (
    <div className="sticky top-0 z-20 flex flex-col gap-2 shadow-xl bg-background -mx-2 p-2 border-b">
      <ListControls />
      <SelectionToolbar
        ids={boxIds}
        bulkActions={bulkActions}
        actions={<NewBoxButton label="Add" />}
      />
    </div>
  )
}

export default BoxesToolbar
