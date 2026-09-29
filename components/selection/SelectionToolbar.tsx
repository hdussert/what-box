import ToolbarButton from '@/components/ToolbarButton'
import { useSelection } from '@/components/selection/SelectionProvider'
import { ReactNode } from 'react'

type SelectionActions = {
  selectedIds: string[]
  /** Ends selection mode */
  done: () => void
}

type SelectionToolbarProps = {
  /** Ids of the listed rows, for Select all */
  ids: string[]
  /** Idle buttons that enter selection mode */
  startActions: ReactNode
  selectionActions: (actions: SelectionActions) => ReactNode
  actions?: ReactNode
}

const SelectionToolbar = ({
  ids,
  startActions,
  selectionActions,
  actions,
}: SelectionToolbarProps) => {
  const { isSelecting, stopSelecting, selectedIds, selectAll } = useSelection()

  if (!isSelecting) {
    return (
      <div className="flex justify-between">
        <div>{actions}</div>
        <div>{startActions}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-between gap-y-1">
      <div>
        <ToolbarButton onClick={() => selectAll(ids)}>Select all</ToolbarButton>
        <ToolbarButton onClick={stopSelecting}>Cancel</ToolbarButton>
      </div>
      <div className="ml-auto flex gap-1">
        {selectionActions({ selectedIds, done: stopSelecting })}
      </div>
    </div>
  )
}

export default SelectionToolbar
