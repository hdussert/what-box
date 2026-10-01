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
      <ItemContent className="min-w-0 p-1 self-stretch gap-1 justify-around">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-2">
            <ItemTitle className="block min-w-0 flex-1 truncate text-base font-semibold">
              {box.name}&nbsp;
            </ItemTitle>
          </div>
          <span className="font-mono text-sm font-semibold text-muted-foreground">
            {box.shortId}
          </span>
        </div>
        <p className="truncate text-sm text-muted-foreground">{itemsSummary}</p>
      </ItemContent>
      <div className="flex flex-col justify-between self-stretch items-end">
        <time
          dateTime={box.createdAt.toISOString()}
          className="text-xs text-muted-foreground"
        >
          {formatShortDate(box.createdAt)}
        </time>
        {box.labelPrinted ? null : (
          <Badge variant="secondary" className="ml-auto">
            Not printed
          </Badge>
        )}
      </div>
    </Item>
  )
}

export default BoxCard
