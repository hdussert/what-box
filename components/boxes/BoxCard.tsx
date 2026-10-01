import ImagePreview from '@/components/images/ImagePreview'
import { Badge } from '@/components/ui/badge'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item'
import { BoxWithRelations } from '@/lib/box'
import { cn } from 'cn'
import { Package } from 'lucide-react'

type BoxCardProps = {
  box: BoxWithRelations
  isSelected: boolean
}

const BoxCard = ({ box, isSelected }: BoxCardProps) => {
  // getBoxes puts the items matching the search first, so they stay visible
  const itemsSummary = box.items.length
    ? box.items.map((item) => item.name).join(', ')
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
      <ItemContent className="min-w-0 p-1 self-stretch justify-center gap-1">
        <ItemTitle className="block truncate text-base font-semibold">
          {box.name}
        </ItemTitle>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="font-mono font-semibold">{box.shortId}</span>
          <span aria-hidden>·</span>
          <time dateTime={box.createdAt.toISOString()}>
            {formatShortDate(box.createdAt)}
          </time>
          {box.labelPrinted ? null : (
            <Badge variant="outline" className="ml-auto">
              No label
            </Badge>
          )}
        </div>
        <ItemDescription className="line-clamp-1">
          {itemsSummary}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}

/** "Sep 30", with the year only when it isn't the current one. */
function formatShortDate(date: Date) {
  const isThisYear = date.getFullYear() === new Date().getFullYear()

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: isThisYear ? undefined : 'numeric',
  })
}

export default BoxCard
