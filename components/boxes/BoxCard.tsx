import NoLabelIcon from '@/components/boxes/labels/NoLabelIcon'
import ImagePreview from '@/components/images/ImagePreview'
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
      <ItemContent className="min-w-0 p-1 self-stretch">
        <div className="flex justify-between gap-2">
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
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="font-mono font-semibold">{box.shortId}</span>
          {box.labelPrinted ? null : <NoLabelIcon />}
        </div>
        <ItemDescription className="line-clamp-2 flex-1">
          {itemsSummary}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}

export default BoxCard
