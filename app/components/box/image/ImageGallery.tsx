import DeleteImageButton from '@/app/components/box/image/DeleteImageButton'
import ImageThumbnail from '@/app/components/box/image/ImageThumbnail'
import UploadingImages from '@/app/components/box/image/UploadingImages'
import { Image } from '@/db/schema'

type ImageGalleryProps = {
  images: Image[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="mx-auto grid grid-cols-4 w-full">
      <UploadingImages />
      {images.map((image, index) => (
        <div key={image.id} className="relative group aspect-square">
          <DeleteImageButton pathname={image.pathname} />
          <ImageThumbnail src={image.url} alt={`Box image ${image.id}`} />
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
