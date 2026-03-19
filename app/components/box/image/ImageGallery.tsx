import DeleteImageButton from '@/app/components/box/image/DeleteImageButton'
import ImageThumbnail from '@/app/components/box/image/ImageThumbnail'
import UploadingImages from '@/app/components/box/image/UploadingImages'
import { Image } from '@/db/schema'

type ImageGalleryProps = {
  images: Image[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex flex-wrap gap-3 mx-auto">
      <div className="flex w-full overflow-hidden">
        <UploadingImages />
      </div>
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <DeleteImageButton pathname={image.pathname} />
          <ImageThumbnail src={image.url} alt={`Box image ${image.id}`} />
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
