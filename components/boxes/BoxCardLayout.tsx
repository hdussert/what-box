import { Item, ItemContent } from '@/components/ui/item'
import { cn } from 'cn'
import { ReactNode } from 'react'

type BoxCardLayoutProps = {
  /** Fills a fixed square: give it `size-full` */
  image: ReactNode
  title: ReactNode
  date: ReactNode
  shortId: ReactNode
  labelStatus: ReactNode
  summary: ReactNode
  className?: string
}

/** The box card's layout, shared by `BoxCard` and its skeleton. */
const BoxCardLayout = ({
  image,
  title,
  date,
  shortId,
  labelStatus,
  summary,
  className,
}: BoxCardLayoutProps) => (
  <Item
    variant="muted"
    className={cn('p-1 gap-2 flex-1 flex-nowrap min-w-0', className)}
  >
    <div className="aspect-square w-24 shrink-0">{image}</div>
    <ItemContent className="min-w-0 p-1 self-stretch">
      <div className="flex justify-between gap-2">
        <div className="min-w-0 flex-1">{title}</div>
        {date}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        {shortId}
        {labelStatus}
      </div>
      <div className="flex-1">{summary}</div>
    </ItemContent>
  </Item>
)

export default BoxCardLayout
