import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { BoxImage, ItemImage } from '@/db/schema'
import { BoxWithAll } from '@/lib/box'
import { cn } from '@/lib/utils'
import { ImageIcon, Package } from 'lucide-react'
import Image from 'next/image'

type FirstImageMiniatureProps = {
  images: BoxImage[] | ItemImage[]
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
    <div className="bg-input/30 rounded-md aspect-square w-20 relative">
      <Image src={''} alt="Box Image miniature" />
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

const BoxesListItem = ({
  box,
  onClick,
  selected,
  isSelecting,
}: BoxesListItemProps) => {
  return (
    <Card
      className={cn(
        'p-2 flex-row gap-4 cursor-pointer hover:brightness-120 transition relative',
        {
          'ring-2 ring-primary': selected,
        },
      )}
      onClick={onClick}
    >
      <FirstImageMiniature images={box.images} />
      <CardHeader className="flex-1 p-0 items-center gap-0 relative">
        <CardDescription className="absolute right-4 font-mono">
          {box.shortId}
        </CardDescription>
        <CardTitle>{box.name}</CardTitle>
        <CardDescription>
          {box.items.length ? `${box.items.length} Objects` : 'Empty'}
        </CardDescription>
        <CardDescription>
          {box.createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardDescription>
      </CardHeader>
      {isSelecting ? (
        <CardFooter className="p-0 pr-2">
          <Checkbox checked={selected} />
        </CardFooter>
      ) : null}
    </Card>
  )
}

export default BoxesListItem
