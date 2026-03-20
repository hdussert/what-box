import BoxImages from '@/app/components/box/image/BoxImages'
import { getUserBoxImages } from '@/lib/image'

type ImagesSlotProps = {
  params: Promise<{ id: string }>
}

const ImagesSlot = async ({ params }: ImagesSlotProps) => {
  const { id } = await params
  const { images } = await getUserBoxImages(id)

  return <BoxImages boxId={id} images={images} />
}

export default ImagesSlot
