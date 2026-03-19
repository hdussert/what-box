import { useFilesUploadContext } from '@/app/components/box/image/FilesUploadContext'
import { useSelector } from '@xstate/react'

export const useFileUpload = (fileUploadId: string) => {
  const { getFileUploadActor } = useFilesUploadContext()
  const uploadActor = getFileUploadActor(fileUploadId)

  const isSuccess = useSelector(uploadActor, (s) => s.matches('success'))
  const isLoading = useSelector(uploadActor, (s) => s.matches('uploading'))
  const isError = useSelector(uploadActor, (s) => s.matches('error'))

  const progress = useSelector(uploadActor, (s) =>
    Math.max(0, Math.round(s.context.progress ?? 0))
  )

  const error = useSelector(uploadActor, (s) => s.context.error)
  const file = useSelector(uploadActor, (s) => s.context.file)

  const retry = () => uploadActor.send({ type: 'RETRY' })
  return {
    isSuccess,
    isError,
    isLoading,
    error,
    progress,
    file,
    retry,
  }
}
