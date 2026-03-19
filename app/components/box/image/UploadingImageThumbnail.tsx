import ImageThumbnail from '@/app/components/box/image/ImageThumbnail'
import useImageUpload from '@/app/components/box/image/machines/useImageUpload'
import { LoaderCircle } from 'lucide-react'

type UploadingImageThumbnailProps = {
  uploadId: string
}

const UploadingImageThumbnail = ({
  uploadId,
}: UploadingImageThumbnailProps) => {
  const { isSuccess, isError, error, progress, previewUrl, file } =
    useImageUpload(uploadId)

  return (
    <ImageThumbnail
      src={previewUrl}
      alt={`Preview ${file.name}`}
      className="relative"
    >
      {isSuccess ? null : (
        <div className="absolute inset-0 rounded bg-black/60 overflow-hidden">
          <div className="flex items-center justify-center gap-1 size-full uppercase font-bold">
            <LoaderCircle className="absolute stroke-[0.5] size-32 animate-spin" />
            <span>{progress}%</span>
          </div>

          {isError && error ? <div>{error}</div> : null}
        </div>
      )}
    </ImageThumbnail>
  )
}

export default UploadingImageThumbnail
