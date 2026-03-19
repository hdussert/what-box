import { useFilesUploadContext } from '@/app/components/box/image/FilesUploadContext'
import UploadingImageThumbnail from '@/app/components/box/image/UploadingImageThumbnail'

const UploadingImages = () => {
  const { uploadIds } = useFilesUploadContext()
  return uploadIds
    .map((id) => <UploadingImageThumbnail key={id} uploadId={id} />)
    .reverse()
}

export default UploadingImages
