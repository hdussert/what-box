import BoxImagesClient from '@/app/components/box/image/BoxImagesClient'
import { getUserBoxImages } from '@/lib/image'

type BoxImagesProps = {
  boxId: string
}

const BoxImages = async ({ boxId }: BoxImagesProps) => {
  const { images } = await getUserBoxImages(boxId)

  return <BoxImagesClient boxId={boxId} images={images} />
}

export default BoxImages
