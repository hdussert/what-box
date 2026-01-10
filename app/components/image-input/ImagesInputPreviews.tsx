'use client'

import { useImagesInput } from '@/app/components/image-input/ImagesInputProvider'
import type { UploadItem } from '@/app/components/image-input/images-uploader-machine'
import { useSelector } from '@xstate/react'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

const statusLabel: Record<UploadStatus, string> = {
  idle: 'Queued',
  uploading: 'Uploading',
  success: 'Uploaded',
  error: 'Error',
}

const ImagePreview = ({ item, index }: { item: UploadItem; index: number }) => {
  const { getUploadActor } = useImagesInput()
  const ref = getUploadActor(item.id)

  // Subscribe to child updates (progress/status)
  const status = useSelector(ref, (s) => s.context.status as UploadStatus)
  const progress = useSelector(ref, (s) => s.context.progress ?? 0)
  const error = useSelector(ref, (s) => s.context.error)
  const pct = Math.max(0, Math.min(100, Math.round(progress)))

  return (
    <div className="relative h-32 w-32">
      <Image
        src={item.previewUrl}
        width={128}
        height={128}
        alt={`Preview ${index + 1}`}
        className="border rounded-md h-full w-full object-cover"
      />

      {/* Status + progress overlay */}
      <div className="absolute inset-0 rounded bg-black/60 overflow-hidden">
        <div className="flex items-center justify-center gap-1 size-full uppercase font-bold">
          <LoaderCircle className="absolute stroke-1 size-32 animate-spin" />
          <span>{pct}%</span>
        </div>

        {status === 'error' && error ? <div>{error}</div> : null}
      </div>
    </div>
  )
}

export const ImagesPreviews = () => {
  const { items } = useImagesInput()

  if (!items.length) return null

  return (
    <div className="mt-4 flex gap-4 overflow-x-auto">
      {items.map((item, index) => (
        <ImagePreview key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}
