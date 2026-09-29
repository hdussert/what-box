'use client'

import { DeleteBoxesButton } from '@/components/boxes/DeleteBoxesButton'
import PrintLabelsButton from '@/components/boxes/labels/PrintLabelsButton'
import NewBoxButton from '@/components/boxes/NewBoxButton'
import ListControls from '@/components/list/ListControls'
import { useSelection } from '@/components/selection/SelectionProvider'
import SelectionToolbar from '@/components/selection/SelectionToolbar'
import ToolbarButton from '@/components/ToolbarButton'
import { Separator } from '@/components/ui/separator'
import { Printer, Trash } from 'lucide-react'

type BoxesToolbarProps = {
  boxIds: string[]
}

const BoxesToolbar = ({ boxIds }: BoxesToolbarProps) => {
  const { startSelecting } = useSelection()

  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 pt-2">
      <ListControls />
      <Separator className="mt-2 mb-1" />
      <SelectionToolbar
        ids={boxIds}
        startActions={
          <>
            <ToolbarButton onClick={startSelecting}>
              <Printer /> Print
            </ToolbarButton>
            <ToolbarButton onClick={startSelecting}>
              <Trash /> Delete
            </ToolbarButton>
          </>
        }
        selectionActions={({ selectedIds, done }) => (
          <>
            <PrintLabelsButton boxIds={selectedIds} onSuccess={done}>
              <Printer />
              <span className="hidden sm:inline-block">Print</span>
              <span className="font-mono">{selectedIds.length || ''}</span>
            </PrintLabelsButton>
            <DeleteBoxesButton boxIds={selectedIds} onSuccess={done}>
              <Trash />
              <span className="hidden sm:inline-block">Delete</span>
              <span className="font-mono">{selectedIds.length || ''}</span>
            </DeleteBoxesButton>
          </>
        )}
        actions={<NewBoxButton label="Add" />}
      />
    </div>
  )
}

export default BoxesToolbar
