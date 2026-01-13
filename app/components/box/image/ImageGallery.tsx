import ImageThumbnail from '@/app/components/box/image/ImageThumbnail'
import { useImageUpload } from '@/app/components/box/image/ImageUploadProvider'
import UploadingImageThumbnail from '@/app/components/box/image/UploadingImageThumbnail'

type ImageCarouselProps = {
  images: {
    url: string
  }[]
}

const ImageGallery = ({ images }: ImageCarouselProps) => {
  const { uploadItems } = useImageUpload()

  return (
    <div className="relative flex flex-row flex-wrap justify-center gap-4 bg-red-400">
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
        <div key={index}>
          <ImageThumbnail src={image.url} alt={`Box image ${index + 1}`} />
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
