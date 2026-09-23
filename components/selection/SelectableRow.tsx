import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type SelectableRowProps = PropsWithChildren<{
  onClick: () => void
  isSelected: boolean
  isSelecting: boolean
}>

/**
 * A list row with a selection checkbox that slides in while selecting.
 * The row owns the click: callers decide whether it selects or navigates.
 */
const SelectableRow = ({
  onClick,
  isSelected,
  isSelecting,
  children,
}: SelectableRowProps) => {
  return (
    <div className="flex items-center gap-3" onClick={onClick}>
      <Checkbox
        checked={isSelected}
        aria-hidden={!isSelecting}
        tabIndex={isSelecting ? 0 : -1}
        className={cn('-mr-7 transition-all opacity-0 pointer-events-none', {
          'mr-0 opacity-100 pointer-events-auto': isSelecting,
        })}
      />
      {children}
    </div>
  )
}

export default SelectableRow
