import BoxHeaderToolbar from '@/components/boxes/BoxHeaderToolbar'
import BoxName from '@/components/boxes/BoxName'
import ImageEditable from '@/components/images/ImageEditable'
import Typography from '@/components/ui/typography'
import { BoxWithAll } from '@/lib/box'

type HeaderProps = {
  box: BoxWithAll
}

const BoxHeader = ({ box }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-3">
      <BoxHeaderToolbar boxId={box.id} />
      <div className="flex">
        <ImageEditable
          boxId={box.id}
          image={box.images[0]}
          isEditing
          className="aspect-square flex-1"
        />
        <div className="flex flex-col text-center justify-center flex-2 gap-2 min-w-0">
          <Typography.P className=" font-bold text-sm font-mono">
            {box.shortId}
          </Typography.P>
          <BoxName box={{ id: box.id, name: box.name }} />
          <Typography.P className="text-sm">
            {box.items.length ? `${box.items.length} items` : 'Empty'}
          </Typography.P>
        </div>
      </div>
    </div>
  )
}

export default BoxHeader
