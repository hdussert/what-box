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
      <div className="flex items-center gap-4">
        <EditableImage
          boxId={box.id}
          imageUrl={box.imageUrl}
          className="size-28 shrink-0"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Typography.P className="font-mono text-sm font-bold">
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
