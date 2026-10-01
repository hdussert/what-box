import { Item } from '@/components/ui/item'
import { cn } from 'cn'
import { ComponentProps, ReactNode } from 'react'

type ItemCardLayoutProps = {
  image: ReactNode
  details: ReactNode
  date: ReactNode
  /** Shown over the card's bottom-right corner */
  actions?: ReactNode
} & Omit<ComponentProps<typeof Item>, 'children'>

/** The item card's layout, shared by `ItemCard` and its skeleton. */
const ItemCardLayout = ({
  image,
  details,
  date,
  actions,
  className,
  ...props
}: ItemCardLayoutProps) => (
  <Item
    variant="muted"
    className={cn(
      'p-1 flex-1 min-w-0 flex-nowrap items-stretch gap-2 relative',
      className,
    )}
    {...props}
  >
    {image}
    <div className="flex flex-1 min-w-0 p-1">
      {details}
      {date}
      {actions}
    </div>
  </Item>
)

export default ItemCardLayout
