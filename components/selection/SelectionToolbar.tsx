import ToolbarButton from '@/components/ToolbarButton'
import SelectionCount from '@/components/selection/SelectionCount'
import { useSelection } from '@/components/selection/SelectionProvider'
import { ReactNode } from 'react'

type SelectionActions = {
  selectedIds: string[]
  clearSelection: () => void
}

type SelectionToolbarProps = {
  selectionActions?: (actions: SelectionActions) => ReactNode
  actions?: ReactNode
}

const SelectionToolbar = ({
  selectionActions,
  actions,
}: SelectionToolbarProps) => {
  const {
    isSelecting,
    stopSelecting,
    startSelecting,
    selectedIds,
    clearSelection,
  } = useSelection()

  if (!isSelecting) {
    return (
      <div className="flex justify-between">
        <div>{actions}</div>
        <ToolbarButton onClick={startSelecting}>Select</ToolbarButton>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        {selectionActions?.({
          selectedIds,
          clearSelection,
        })}
      </div>
      <SelectionCount count={selectedIds.length} />
      <div>
        <ToolbarButton onClick={clearSelection}>Clear</ToolbarButton>
        <ToolbarButton onClick={stopSelecting}>Cancel</ToolbarButton>
      </div>
    </div>
  )
}

export default SelectionToolbar
