'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type ImagePreviewProps = ImageProps

const ImagePreview = ({ children, className, ...props }: ImagePreviewProps) => {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <div
      className={cn('overflow-hidden rounded-md shadow-sm relative', className)}
    >
      <Image
        data-loaded={false}
        {...props}
        className="size-full object-cover"
        width={256}
        height={256}
        alt={props.alt}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading ? <Skeleton className="absolute inset-0" /> : null}
      {children}
    </div>
  )
}

export default ImagePreview
