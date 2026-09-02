import BoxImages from '@/app/components/box/image/BoxImages'
import { getBoxesImages } from '@/lib/image'

type ImagesSlotProps = {
  params: Promise<{ id: string }>
}

const ImagesSlot = async ({ params }: ImagesSlotProps) => {
  const { id: boxId } = await params
  const images = await getBoxesImages([boxId])

  return <BoxImages boxId={boxId} images={images} />
}

export default ImagesSlot
