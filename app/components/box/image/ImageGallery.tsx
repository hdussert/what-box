import DeleteImageButton from '@/app/components/box/image/DeleteImageButton'
import ImageThumbnail from '@/app/components/box/image/ImageThumbnail'
import { useImageUpload } from '@/app/components/box/image/ImageUploadProvider'
import UploadingImageThumbnail from '@/app/components/box/image/UploadingImageThumbnail'

type ImageCarouselProps = {
  images: {
    url: string
    id: string
  }[]
}

const ImageGallery = ({ images }: ImageCarouselProps) => {
  const { uploadItems } = useImageUpload()
  return (
    <div className="flex flex-wrap gap-4 mx-auto">
      {/* TODO: SSE so I can use the images records  and delete them instead of the blobs */}
      {uploadItems
        .map((item, index) => (
          <UploadingImageThumbnail
            key={index}
            uploadItem={item}
            index={index}
          />
        ))
        .reverse()}
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <DeleteImageButton imageId={image.id} />
          <ImageThumbnail src={image.url} alt={`Box image ${index + 1}`} />
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
