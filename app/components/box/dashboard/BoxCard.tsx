import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ImageRecord } from '@/db/schema'
import { BoxWithAll } from '@/lib/box'
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

type BoxesListItemProps = {
  box: BoxWithAll
  onClick: () => void
  selected: boolean
  isSelecting: boolean
}

const BoxCard = ({
  box,
  onClick,
  selected,
  isSelecting,
}: BoxesListItemProps) => {
  return (
    <div className="flex items-center gap-3">
      {isSelecting ? <Checkbox checked={selected} onClick={onClick} /> : null}
      <Card
        className={cn(
          'p-2 flex-1 flex-row gap-4 cursor-pointer hover:brightness-120 transition relative',
          {
            'ring-2 ring-primary': selected,
          },
        )}
        onClick={onClick}
      >
        <FirstImageMiniature images={box.images} />
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <CardTitle>{box.name}</CardTitle>
            <CardDescription className="font-mono">
              {box.shortId}
            </CardDescription>
          </div>
          <CardDescription className="font-mono text-xs">
            {box.createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </CardDescription>
          <CardDescription>
            {box.items.length
              ? `Objects (${box.items.length}) : ${box.items
                  .slice(0, 3)
                  .map((item, index) => item.name)
                  .join(', ')} ...`
              : 'Empty'}
          </CardDescription>
        </div>
      </Card>
    </div>
  )
}

export default BoxCard
