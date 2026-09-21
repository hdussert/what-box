import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type ItemListItemProps = PropsWithChildren<{
  onClick: () => void
  selected: boolean
  isSelecting: boolean
}>

const ItemListItem = ({
  onClick,
  selected,
  isSelecting,
  children,
}: ItemListItemProps) => {
  return (
    <div className="flex items-center gap-3" onClick={onClick}>
      <Checkbox
        checked={selected}
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

export default ItemListItem
