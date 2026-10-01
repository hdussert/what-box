import ImagePreview from '@/components/images/ImagePreview'
import { Badge } from '@/components/ui/badge'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item'
import { BoxWithRelations } from '@/lib/box'
import { formatShortDate } from '@/lib/utils'
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
        <div className="flex items-baseline gap-2">
          <ItemTitle className="block min-w-0 truncate text-base font-semibold">
            {box.name}
          </ItemTitle>
          <span className="shrink-0 font-mono text-xs font-semibold text-muted-foreground">
            {box.shortId}
          </span>
          <time
            dateTime={box.createdAt.toISOString()}
            className="ml-auto shrink-0 text-xs text-muted-foreground"
          >
            {formatShortDate(box.createdAt)}
          </time>
        </div>
        <div className="flex items-center gap-2">
          <ItemDescription className="line-clamp-1 flex-1">
            {itemsSummary}
          </ItemDescription>
          {box.labelPrinted ? null : <Badge variant="outline">No label</Badge>}
        </div>
      </ItemContent>
    </Item>
  )
}

export default BoxCard
