import ToolbarButton from '@/app/components/common/list/ToolbarButton'
import { useSelectionContext } from '@/app/components/common/selection/SelectionContext'
import SelectionCount from '@/app/components/common/selection/SelectionCount'

type SelectionActions = {
  selectedIds: string[]
  clearSelection: () => void
}

type SelectionToolbarProps = {
  actions?: (actions: SelectionActions) => React.ReactNode
}

const SelectionToolbar = ({ actions }: SelectionToolbarProps) => {
  const {
    isSelecting,
    stopSelecting,
    startSelecting,
    selectedIds,
    clearSelection,
  } = useSelectionContext()

  if (!isSelecting) {
    return (
      <div className="flex justify-end">
        <ToolbarButton onClick={startSelecting}>Select</ToolbarButton>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        {actions?.({
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
