import ImagePreview from '@/components/images/ImagePreview'
import { Badge } from '@/components/ui/badge'
import { Item, ItemContent, ItemTitle } from '@/components/ui/item'
import { BoxWithRelations } from '@/lib/box'
import { formatShortDate } from '@/lib/utils'
import { cn } from 'cn'
import { Package } from 'lucide-react'

type BoxCardProps = {
  box: BoxWithRelations
  isSelected: boolean
}

const SHOWN_ITEM_COUNT = 4

const BoxCard = ({ box, isSelected }: BoxCardProps) => {
  // getBoxes puts the items matching the search first, so they stay visible
  const shownItems = box.items.slice(0, SHOWN_ITEM_COUNT)
  const hiddenItemCount = box.items.length - shownItems.length
  const itemsSummary = shownItems.length
    ? shownItems.map((item) => item.name).join(', ')
    : 'Empty'

  return (
    <Item
      variant="muted"
      className={cn(
        'p-1 gap-2 flex-1 flex-nowrap min-w-0 cursor-pointer transition hover:bg-muted',
        {
          'ring-2 ring-primary': isSelected,
        },
      )}
    >
      {box.imageUrl ? (
        <ImagePreview
          src={box.imageUrl}
          alt="Box image"
          className="aspect-square w-24 shrink-0"
        />
      ) : (
        <div className="bg-input/30 rounded-md aspect-square w-24 shrink-0 flex items-center justify-center">
          <Package size={48} />
        </div>
      )}
      <ItemContent className="min-w-0 p-1 self-stretch gap-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-2">
            <ItemTitle className="block min-w-0 flex-1 truncate text-base font-semibold">
              {box.name}
            </ItemTitle>
            <time
              dateTime={box.createdAt.toISOString()}
              className="shrink-0 text-xs text-muted-foreground"
            >
              {formatShortDate(box.createdAt)}
            </time>
          </div>
          <span className="font-mono text-xs font-semibold text-muted-foreground">
            {box.shortId}
          </span>
        </div>
        <div className="flex flex-1 items-center gap-1 text-sm text-muted-foreground">
          <span className="truncate">{itemsSummary}</span>
          {hiddenItemCount ? (
            <span className="shrink-0">({hiddenItemCount} more)</span>
          ) : null}
          {box.labelPrinted ? null : (
            <Badge variant="outline" className="ml-auto">
              No label
            </Badge>
          )}
        </div>
      </ItemContent>
    </Item>
  )
}

export default BoxCard
