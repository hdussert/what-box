import BoxHeaderToolbar from '@/components/boxes/BoxHeaderToolbar'
import BoxName from '@/components/boxes/BoxName'
import EditableImage from '@/components/images/EditableImage'
import Typography from '@/components/ui/typography'
import { BoxWithRelations } from '@/lib/box'

type BoxHeaderProps = {
  box: BoxWithRelations
}

const BoxHeader = ({ box }: BoxHeaderProps) => {
  return (
    <div className="flex flex-col gap-3">
      <BoxHeaderToolbar boxId={box.id} />
      <div className="flex">
        <EditableImage
          boxId={box.id}
          imageUrl={box.imageUrl}
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
