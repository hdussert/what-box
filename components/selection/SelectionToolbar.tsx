import ToolbarButton from '@/components/ToolbarButton'
import ActionLabel from '@/components/selection/ActionLabel'
import { useSelection } from '@/components/selection/SelectionProvider'
import { SelectionPreset } from '@/components/selection/types'
import { ListChecks } from 'lucide-react'
import { ReactNode } from 'react'

type SelectionToolbarProps = {
  /** Ids of the listed rows, for Select all */
  ids: string[]
  /** Shortcuts shown next to Select all */
  presets?: SelectionPreset[]
  /** Shown while not selecting */
  actions?: ReactNode
  /** The bulk action buttons, shown while selecting */
  children: ReactNode
}

const SelectionToolbar = ({
  ids,
  presets = [],
  actions,
  children,
}: SelectionToolbarProps) => {
  const { isSelecting, startSelecting, stopSelecting, selectAll } =
    useSelection()

  if (!isSelecting) {
    return (
      <div className="flex justify-between">
        <div>{actions}</div>
        <ToolbarButton onClick={startSelecting}>
          <ActionLabel icon={ListChecks} label="Select" />
        </ToolbarButton>
      </div>
    )
  }

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
      <div className="ml-auto">{children}</div>
    </div>
  )
}

export default SelectionToolbar
