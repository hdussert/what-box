import NoLabelIcon from '@/components/boxes/labels/NoLabelIcon'
import ImagePreview from '@/components/images/ImagePreview'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item'
import { BoxWithRelations } from '@/lib/box'
import { ITEM_WORDS } from '@/lib/item/const'
import { pluralize } from '@/lib/utils'
import { cn } from 'cn'
import { Package } from 'lucide-react'

type BoxCardProps = {
  box: BoxWithRelations
  isSelected: boolean
}

const BoxCard = ({ box, isSelected }: BoxCardProps) => {
  const itemsSummary = box.items.length
    ? `${pluralize(box.items.length, ITEM_WORDS)} · ${box.items
        .map((item) => item.name)
        .join(', ')}`
    : 'Empty'

  return (
    <Item
      variant="muted"
      className={cn(
        'p-0 pr-4 gap-4 flex-1 flex-nowrap min-w-0 cursor-pointer transition hover:bg-muted',
        {
          'ring-2 ring-primary': isSelected,
        },
      )}
    >
      {box.imageUrl ? (
        <ImagePreview
          src={box.imageUrl}
          alt="Box image"
          className="aspect-square w-20 shrink-0"
        />
      ) : (
        <div className="bg-input/30 rounded-md aspect-square w-20 shrink-0 flex items-center justify-center">
          <Package size={48} />
        </div>
      )}
      <ItemContent className="min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <ItemTitle className="block min-w-0 flex-1 truncate text-base font-semibold">
            {box.name}
          </ItemTitle>
          <time
            dateTime={box.createdAt.toISOString()}
            className="text-xs text-muted-foreground"
          >
            {box.createdAt.toLocaleDateString('en-US', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            })}
          </time>
        </div>
        <ItemDescription className="line-clamp-1">
          {itemsSummary}
        </ItemDescription>
        <div className="flex items-center justify-between text-xs text-muted-foreground/70">
          <span className="font-mono">{box.shortId}</span>
          {box.labelPrinted ? null : <NoLabelIcon />}
        </div>
      </ItemContent>
    </Item>
  )
}

export default BoxCard
