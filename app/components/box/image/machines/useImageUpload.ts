import { useFileUpload } from '@/app/components/box/image/machines/useFileUpload'
import { useEffect, useState } from 'react'

const useImageUpload = (imageUploadId: string) => {
  const fileUpload = useFileUpload(imageUploadId)
  const [previewUrl, setPreviewUrl] = useState<string | null>()

  useEffect(() => {
    const url = URL.createObjectURL(fileUpload.file)
    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [fileUpload.file])

  return {
    ...fileUpload,
    previewUrl,
  }
}

export default useImageUpload
