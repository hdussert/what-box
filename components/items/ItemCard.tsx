import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ImageRecord } from '@/db/schema'
import { ItemWithAll } from '@/lib/item'
import { cn } from '@/lib/utils'
import { ImageIcon, Package } from 'lucide-react'
import Image from 'next/image'

type FirstImageMiniatureProps = {
  images: ImageRecord[]
}

const FirstImageMiniature = ({ images }: FirstImageMiniatureProps) => {
  const hasNoImages = images.length == 0
  const hasMultipleImages = images.length > 1

  if (hasNoImages)
    return (
      <div className="bg-input/30 rounded-md aspect-square w-20 flex items-center justify-center">
        <Package size={48} />
      </div>
    )

  return (
    <div className="bg-input/30 rounded-md aspect-square w-20 relative overflow-hidden">
      <Image
        src={images[0].url}
        alt="Box Image miniature"
        width={160}
        height={160}
        className="object-cover size-full"
      />
      {hasMultipleImages ? (
        <Badge variant="outline" className="absolute bottom-1 right-1">
          +{images.length - 1} <ImageIcon />
        </Badge>
      ) : null}
    </div>
  )
}

type ItemCardProps = {
  item: ItemWithAll
  onClick: () => void
  selected: boolean
  isSelecting: boolean
}

const ItemCard = ({ item, onClick, selected, isSelecting }: ItemCardProps) => {
  return (
    <div className="flex items-center gap-3">
      {isSelecting ? <Checkbox checked={selected} onClick={onClick} /> : null}
      <Card
        className={cn(
          'p-0 pr-4 flex-1 flex-row gap-4 cursor-pointer hover:brightness-120 transition relative items-center',
          {
            'ring-2 ring-primary': selected,
          },
        )}
        onClick={onClick}
      >
        <FirstImageMiniature images={item.images} />
        <div className="flex flex-col gap-1 flex-1">
          <CardTitle>{item.name}</CardTitle>
          <CardDescription className="text-xs">
            {item.createdAt.toLocaleDateString('en-US', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            })}
          </CardDescription>
        </div>
        <CardDescription className="font-mono">
          &times; {item.quantity}
        </CardDescription>
      </Card>
    </div>
  )
}

export default ItemCard
