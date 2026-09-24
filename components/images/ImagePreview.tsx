'use client'

import ImageSpinner from '@/components/images/ImageSpinner'
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
      {isLoading ? <ImageSpinner className="bg-accent" /> : null}
      {children}
    </div>
  )
}

export default ImagePreview
