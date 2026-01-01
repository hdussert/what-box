'use client'

import { useMachine } from '@xstate/react'
import React, {
  ChangeEvent,
  createContext,
  RefObject,
  useContext,
  useMemo,
  useRef,
} from 'react'
import { ImageUploadActorRef } from './image-upload-machine'
import {
  imagesUploaderMachine,
  type UploadItem,
} from './images-uploader-machine'

type UploadActorRef = ImageUploadActorRef

type ImagesInputContextValue = {
  fileInputRef: RefObject<HTMLInputElement | null>
  items: UploadItem[]
  getUploadActor: (uploadId: string) => UploadActorRef
  onFilesSelected: (event: ChangeEvent<HTMLInputElement>) => void
}

const ImagesInputContext = createContext<ImagesInputContextValue | null>(null)

export function ImagesInputProvider({
  children,
  boxId,
}: React.PropsWithChildren<{ boxId: string }>) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [state, send] = useMachine(imagesUploaderMachine, {
    input: { boxId },
  })

  const items: UploadItem[] = useMemo(() => {
    return state.context.items
  }, [state.context.items])

  const onFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    if (!files.length) return
    send({ type: 'ADD_FILES', files })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const getUploadActor = (uploadId: string) => {
    const children = state.children as Record<
      string,
      UploadActorRef | undefined
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
      items,
      getUploadActor,
      onFilesSelected,
    }),
    [items, send]
  )

  return (
    <ImagesInputContext.Provider value={value}>
      {children}
    </ImagesInputContext.Provider>
  )
}

export function useImagesInput() {
  const ctx = useContext(ImagesInputContext)
  if (!ctx)
    throw new Error('useImagesInput must be used within ImagesInputProvider')
  return ctx
}
