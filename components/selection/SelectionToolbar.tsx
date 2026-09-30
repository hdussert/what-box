import ToolbarButton from '@/components/ToolbarButton'
import ActionLabel from '@/components/selection/ActionLabel'
import { useSelection } from '@/components/selection/SelectionProvider'
import { BulkAction } from '@/components/selection/types'
import { ReactNode } from 'react'

type SelectionToolbarProps = {
  /** Ids of the listed rows, for Select all */
  ids: string[]
  bulkActions: BulkAction[]
  actions?: ReactNode
}

const SelectionToolbar = ({
  ids,
  bulkActions,
  actions,
}: SelectionToolbarProps) => {
  const {
    activeAction,
    startSelecting,
    stopSelecting,
    selectedIds,
    selectAll,
  } = useSelection()
  const selectingAction = bulkActions.find(({ id }) => id === activeAction)

  if (!selectingAction) {
    return (
      <div className="flex justify-between">
        <div>{actions}</div>
        <div>
          {bulkActions.map(({ id, label, icon }) => (
            <ToolbarButton key={id} onClick={() => startSelecting(id)}>
              <ActionLabel icon={icon} label={label} />
            </ToolbarButton>
          ))}
        </div>
      </div>
    )
  }

  const { label, icon, presets = [], renderButton } = selectingAction

  return (
    <div className="flex flex-wrap justify-between gap-y-1">
      <div>
        <ToolbarButton onClick={() => selectAll(ids)}>Select all</ToolbarButton>
        {presets.map((preset) => (
          <ToolbarButton
            key={preset.label}
            onClick={() => selectAll(preset.ids)}
            disabled={!preset.ids.length}
          >
            {preset.label}
          </ToolbarButton>
        ))}
        <ToolbarButton onClick={stopSelecting}>Cancel</ToolbarButton>
      </div>
      <div className="ml-auto">
        {renderButton({
          selectedIds,
          done: stopSelecting,
          label: (
            <ActionLabel icon={icon} label={label} count={selectedIds.length} />
          ),
        })}
      </div>
    </div>
  )
}

export default SelectionToolbar
