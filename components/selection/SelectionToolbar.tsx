import ToolbarButton from '@/components/ToolbarButton'
import { useSelection } from '@/components/selection/SelectionProvider'
import { ListChecks } from 'lucide-react'
import { ReactNode } from 'react'

type SelectionToolbarProps = {
  /** Ids of the listed rows, for Select all */
  ids: string[]
  /** Shown while not selecting */
  actions?: ReactNode
  /** The bulk action buttons, shown while selecting */
  children: ReactNode
}

const SelectionToolbar = ({
  ids,
  actions,
  children,
}: SelectionToolbarProps) => {
  const { isSelecting, startSelecting, stopSelecting, selectedIds, selectAll } =
    useSelection()

  if (!isSelecting) {
    return (
      <div className="flex justify-between">
        <div>{actions}</div>
        <ToolbarButton onClick={startSelecting}>
          <ListChecks data-icon="inline-start" /> Select
        </ToolbarButton>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center">
      <div className="flex">
        <ToolbarButton onClick={() => selectAll(ids)}>Select all</ToolbarButton>
        <ToolbarButton onClick={stopSelecting}>Cancel</ToolbarButton>
      </div>
      <span className="text-center text-sm text-muted-foreground">
        <span className="font-mono">{selectedIds.length}</span> selected
      </span>
      <div className="flex">{children}</div>
    </div>
  )
}

export default SelectionToolbar
