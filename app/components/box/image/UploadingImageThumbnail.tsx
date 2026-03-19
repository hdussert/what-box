import ImageThumbnail from '@/app/components/box/image/ImageThumbnail'
import useImageUpload from '@/app/components/box/image/machines/useImageUpload'
import { Skeleton } from '@/components/ui/skeleton'
import { LoaderCircle, RotateCw } from 'lucide-react'
type UploadingImageThumbnailProps = {
  uploadId: string
}

type LoadingOverlayProps = {
  progress: number
}
const LoadingOverlay = ({ progress }: LoadingOverlayProps) => (
  <div className="flex items-center justify-center gap-1 size-full uppercase font-bold">
    <LoaderCircle className="absolute stroke-[0.5] size-32 animate-spin" />
    <span>{progress}%</span>
  </div>
)

type RetryOverlayProps = {
  retry: () => void
}
const RetryOverlay = ({ retry }: RetryOverlayProps) => (
  <div
    onClick={retry}
    className="flex items-center justify-center gap-1 size-full uppercase font-bold"
  >
    <RotateCw className="absolute stroke-[0.5] size-32 hover:rotate-360 hover:transition-all hover:duration-500" />
    <div>Retry</div>
  </div>
)

const UploadingImageThumbnail = ({
  uploadId,
}: UploadingImageThumbnailProps) => {
  const { isLoading, isError, progress, previewUrl, file, retry } =
    useImageUpload(uploadId)
  if (!previewUrl) return null

  return (
    <Skeleton>
      <ImageThumbnail
        src={previewUrl}
        alt={`Preview ${file.name}`}
        className="relative"
      >
        <div className="absolute inset-0 rounded bg-black/60 overflow-hidden">
          {isLoading ? <LoadingOverlay progress={progress} /> : null}
          {isError ? <RetryOverlay retry={retry} /> : null}
        </div>
      </ImageThumbnail>
    </Skeleton>
  )
}

export default UploadingImageThumbnail
