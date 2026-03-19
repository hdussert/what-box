'use client'

import { FileUploadActorRef } from '@/app/components/box/image/machines/_file-upload-machine'
import { filesUploaderMachine } from '@/app/components/box/image/machines/_files-uploader-machine'
import { useMachine } from '@xstate/react'
import { useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useMemo } from 'react'

type FilesUploadContextValue = {
  getFileUploadActor: (uploadId: string) => FileUploadActorRef
  addFilesToUpload: (images: File[]) => void
  uploadIds: string[]
}

type FilesUploadProviderProps = React.PropsWithChildren<{
  boxId: string
}>

const FilesUploadContext = createContext<FilesUploadContextValue | null>(null)

const FilesUploadProvider = ({ children, boxId }: FilesUploadProviderProps) => {
  const router = useRouter()
  // Uploading images
  const [state, send] = useMachine(filesUploaderMachine, {
    input: { boxId },
    inspect: (event) => {
      if (event.type === '@xstate.event' && event.event.type == 'COMPLETED') {
        // This is a bit hacky but it ensures the router refreshes after the state has been updated with the completed upload, which triggers a refetch of the images.
        // TODO : Rely on optimistic updates instead of refreshing the router after each upload
        setTimeout(() => {
          router.refresh()
        }, 2000) // Delay to ensure state is updated before refresh
      }
    },
  })

  const fileUploadActors = state.children as Record<
    string,
    FileUploadActorRef | undefined
  >
  const uploadIds = useMemo(() => {
    return Object.keys(fileUploadActors)
  }, [fileUploadActors])

  const addFilesToUpload = useCallback(
    (files: File[]) => {
      send({ type: 'ADD_TO_QUEUE', files })
    },
    [send]
  )

  const getFileUploadActor = useCallback(
    (uploadId: string) => {
      const actor = fileUploadActors[uploadId]
      if (!actor) throw new Error(`No upload actor found for id ${uploadId}`)
      return actor
    },
    [fileUploadActors]
  )

  const value = useMemo(
    () => ({
      getFileUploadActor,
      addFilesToUpload,
      uploadIds,
    }),
    [getFileUploadActor, addFilesToUpload, uploadIds]
  )

  return (
    <FilesUploadContext.Provider value={value}>
      {children}
    </FilesUploadContext.Provider>
  )
}

export function useFilesUploadContext() {
  const ctx = useContext(FilesUploadContext)
  if (!ctx)
    throw new Error('useImageUpload must be used within ImageUploadProvider')
  return ctx
}

export default FilesUploadProvider
