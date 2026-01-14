import { UploadStatus } from '@/app/components/box/image/_image-upload-machine'
import { UploadItem } from '@/app/components/box/image/_images-uploader-machine'
import ImageThumbnail from '@/app/components/box/image/ImageThumbnail'
import { useImageUpload } from '@/app/components/box/image/ImageUploadProvider'
import { useSelector } from '@xstate/react'
import { LoaderCircle } from 'lucide-react'

type UploadingImageThumbnailProps = {
  uploadItem: UploadItem
  index: number
}

const UploadingImageThumbnail = ({
  uploadItem,
  index,
}: UploadingImageThumbnailProps) => {
  const { getUploadActorById } = useImageUpload()
  const uploadActor = getUploadActorById(uploadItem.id)

  const uploadStatus = useSelector(
    uploadActor,
    (s) => s.context.status as UploadStatus
  )
  const uploadProgress = useSelector(
    uploadActor,
    (s) => s.context.progress ?? 0
  )
  const uploadError = useSelector(uploadActor, (s) => s.context.error)
  const progressPercent = Math.max(0, Math.min(100, Math.round(uploadProgress)))

  return (
    <ImageThumbnail
      src={uploadItem.previewUrl}
      alt={`Preview ${index + 1}`}
      className="relative"
    >
      {uploadStatus === 'success' ? null : (
        <div className="absolute inset-0 rounded bg-black/60 overflow-hidden">
          <div className="flex items-center justify-center gap-1 size-full uppercase font-bold">
            <LoaderCircle className="absolute stroke-[0.5] size-32 animate-spin" />
            <span>{progressPercent}%</span>
          </div>

          {uploadStatus === 'error' && uploadError ? (
            <div>{uploadError}</div>
          ) : null}
        </div>
      )}
    </ImageThumbnail>
  )
}

export default UploadingImageThumbnail
