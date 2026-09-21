import BoxHeaderToolbar from '@/components/boxes/BoxHeaderToolbar'
import ImagePreview from '@/components/images/ImagePreview'
import Typography from '@/components/ui/typography'
import { BoxWithAll } from '@/lib/box'
import { Package } from 'lucide-react'

type HeaderProps = {
  box: BoxWithAll
}

const BoxHeader = ({ box }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-3">
      <BoxHeaderToolbar boxId={box.id} />
      <div className="flex">
        {box.images[0] ? (
          <ImagePreview
            src={box.images[0].url}
            alt={`${box.name} image`}
            className="aspect-square flex-1 bg-card "
          />
        ) : (
          <div className="bg-card rounded-md aspect-square flex flex-1 items-center justify-center">
            <Package size={64} />
          </div>
        )}
        <div className="flex flex-col text-center justify-center flex-2 gap-2">
          <Typography.P className=" font-bold text-sm font-mono">
            {box.shortId}
          </Typography.P>
          <Typography.H2 className="uppercase">{box.name}</Typography.H2>
          <Typography.P className="text-sm">
            {box.items.length ? `${box.items.length} items` : 'Empty'}
          </Typography.P>
        </div>
      </div>
    </div>
  )
}

export default BoxHeader
