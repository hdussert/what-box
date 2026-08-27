import DeleteImageButton from '@/app/components/box/image/DeleteImageButton'
import EmptyImageGallery from '@/app/components/box/image/EmptyImageGallery'
import { useFilesUploadContext } from '@/app/components/box/image/FilesUploadContext'
import ImageThumbnail from '@/app/components/box/image/ImageThumbnail'
import UploadingImages from '@/app/components/box/image/UploadingImages'
import { Image } from '@/db/schema'

type ImageGalleryProps = {
  images: Image[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const { uploadIds } = useFilesUploadContext()
  const hasImages = images.length > 0
  const hasUploads = uploadIds.length > 0

  if (!hasImages && !hasUploads) {
    return (
      <div className="w-full">
        <EmptyImageGallery />
      </div>
    )
  }

  return (
    <div className="mx-auto grid grid-cols-3 md:grid-cols-4 w-full gap-2 ">
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
