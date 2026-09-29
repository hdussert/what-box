import ToolbarButton from '@/components/ToolbarButton'
import SelectionCount from '@/components/selection/SelectionCount'
import { useSelection } from '@/components/selection/SelectionProvider'
import { SelectionMode } from '@/components/selection/types'
import { ReactNode } from 'react'

type SelectionToolbarProps = {
  modes: SelectionMode[]
  /** Ids of the listed rows, for Select all */
  ids: string[]
  actions?: ReactNode
}

/**
 * Shows each bulk action up front; picking one switches to selecting rows
 * for it, ending on that action's confirm button.
 */
const SelectionToolbar = ({ modes, ids, actions }: SelectionToolbarProps) => {
  const { mode, startSelecting, stopSelecting, selectedIds, selectAll } =
    useSelection()
  const activeMode = modes.find(({ name }) => name === mode)

  if (!activeMode) {
    return (
      <div className="flex justify-between">
        <div>{actions}</div>
        <div>
          {modes.map(({ name, label, icon }) => (
            <ToolbarButton key={name} onClick={() => startSelecting(name)}>
              {icon}
              <span className="sr-only sm:not-sr-only">{label}</span>
            </ToolbarButton>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="px-2 text-sm font-medium">{activeMode.hint}</p>
          <SelectionCount count={selectedIds.length} />
        </div>
        <div>
          <ToolbarButton onClick={() => selectAll(ids)}>
            Select all
          </ToolbarButton>
          <ToolbarButton onClick={stopSelecting}>Cancel</ToolbarButton>
        </div>
      </div>
      <div className="flex justify-end">
        {activeMode.confirm({ selectedIds, done: stopSelecting })}
      </div>
    </div>
  )
}

export default SelectionToolbar
