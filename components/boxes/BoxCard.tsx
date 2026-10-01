import BoxCardLayout from '@/components/boxes/BoxCardLayout'
import NoLabelIcon from '@/components/boxes/labels/NoLabelIcon'
import ImagePreview from '@/components/images/ImagePreview'
import { ItemDescription, ItemTitle } from '@/components/ui/item'
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
    <BoxCardLayout
      className={cn('cursor-pointer transition hover:bg-muted', {
        'ring-2 ring-primary': isSelected,
      })}
      image={
        box.imageUrl ? (
          <ImagePreview
            src={box.imageUrl}
            alt="Box image"
            className="size-full"
          />
        ) : (
          <div className="bg-input/30 rounded-md size-full flex items-center justify-center">
            <Package size={48} />
          </div>
        )
      }
      title={
        <ItemTitle className="block truncate text-base font-semibold">
          {box.name}
        </ItemTitle>
      }
      date={
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
      }
      shortId={<span className="font-mono font-semibold">{box.shortId}</span>}
      labelStatus={box.labelPrinted ? null : <NoLabelIcon />}
      summary={
        <ItemDescription className="line-clamp-2">
          {itemsSummary}
        </ItemDescription>
      }
    />
  )
}

export default BoxCard
