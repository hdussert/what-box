'use client'

import { useImagesInput } from '@/app/components/image-input/ImagesInputProvider'
import type { UploadItem } from '@/app/components/image-input/images-uploader-machine'
import { Skeleton } from '@/components/ui/skeleton'
import { useSelector } from '@xstate/react'
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

  const abortUpload = () => {
    ref.send({ type: 'ABORT' })
  }

  return (
    <Skeleton>
      <div className="relative h-24 w-24 mt-2 shrink-0">
        <Image
          src={item.previewUrl}
          width={96}
          height={96}
          alt={`Preview ${index + 1}`}
          className="border rounded-md h-full w-full object-cover"
        />

        {/* Status + progress overlay */}
        <div className="absolute inset-0  rounded bg-black/60 px-1 py-0.5 text-[11px] text-white">
          <div className="flex items-center justify-between gap-2">
            <span>{statusLabel[status]}</span>
            <span>{pct}%</span>
          </div>

          <div className="mt-0.5 h-1 w-full rounded bg-white/30">
            <div
              className="h-1 rounded bg-primary"
              style={{ width: `${pct}%` }}
            />
          </div>

          {status === 'error' && error ? (
            <div className="mt-1 line-clamp-2 text-[10px] text-white/90">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </Skeleton>
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
