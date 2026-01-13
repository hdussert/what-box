'use client'

import { ImageUploadActorRef } from '@/app/components/box/image/_image-upload-machine'
import {
  imagesUploaderMachine,
  UploadItem,
} from '@/app/components/box/image/_images-uploader-machine'
import { useMachine } from '@xstate/react'
import {
  ChangeEvent,
  createContext,
  RefObject,
  useContext,
  useMemo,
  useRef,
} from 'react'

type ImageUploadContextValue = {
  fileInputRef: RefObject<HTMLInputElement | null>
  uploadItems: UploadItem[]
  getUploadActorById: (uploadId: string) => ImageUploadActorRef
  handleFilesSelected: (event: ChangeEvent<HTMLInputElement>) => void
}

const ImageUploadContext = createContext<ImageUploadContextValue | null>(null)

const ImageUploadProvider = ({
  children,
  boxId,
}: React.PropsWithChildren<{ boxId: string }>) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [state, send] = useMachine(imagesUploaderMachine, {
    input: { boxId },
  })

  const uploadItems: UploadItem[] = useMemo(() => {
    return state.context.items
  }, [state.context.items])

  const handleFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    if (!files.length) return
    send({ type: 'ADD_FILES', files })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const getUploadActorById = (uploadId: string) => {
    const children = state.children as Record<
      string,
      ImageUploadActorRef | undefined
    >
    const ref = children[uploadId]
    if (!ref) {
      throw new Error(`Missing upload actor for uploadId="${uploadId}"`)
    }
    return ref
  }

  const value = useMemo(
    () => ({
      fileInputRef,
      uploadItems,
      getUploadActorById,
      handleFilesSelected,
    }),
    [uploadItems, send]
  )

  return (
    <ImageUploadContext.Provider value={value}>
      {children}
    </ImageUploadContext.Provider>
  )
}

export function useImageUpload() {
  const ctx = useContext(ImageUploadContext)
  if (!ctx)
    throw new Error('useImageUpload must be used within ImageUploadProvider')
  return ctx
}

export default ImageUploadProvider
