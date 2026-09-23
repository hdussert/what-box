import ImagePreview from '@/components/images/ImagePreview'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { BoxWithRelations } from '@/lib/box'
import { cn } from '@/lib/utils'
import { Package } from 'lucide-react'

type BoxCardProps = {
  box: BoxWithRelations
  isSelected: boolean
}

const BoxCard = ({ box, isSelected }: BoxCardProps) => {
  return (
    <Card
      className={cn(
        'p-0 pr-4 flex-1 flex-row gap-4 cursor-pointer hover:brightness-120 transition items-center min-w-0',
        {
          'ring-2 ring-primary': isSelected,
        },
      )}
    >
      {box.imageUrl ? (
        <ImagePreview
          src={box.imageUrl}
          alt="Box image"
          className="aspect-square w-20"
        />
      ) : (
        <div className="bg-input/30 rounded-md aspect-square w-20 flex items-center justify-center">
          <Package size={48} />
        </div>
      )}
      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <div className="flex justify-between items-center">
          <CardDescription className="text-xs font-mono">
            {box.shortId}
          </CardDescription>

          <CardDescription className="text-xs">
            {box.createdAt.toLocaleDateString('en-US', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            })}
          </CardDescription>
        </div>

        <CardTitle>{box.name}</CardTitle>
        <CardDescription className="leading-none whitespace-nowrap text-ellipsis overflow-hidden text-xs">
          {box.items.length
            ? `Items (${box.items.length}) : ${box.items
                .map((item) => item.name)
                .join(', ')}`
            : 'Empty'}
        </CardDescription>
      </div>
    </Card>
  )
}

export default BoxCard
