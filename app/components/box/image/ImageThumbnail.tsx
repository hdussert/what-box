import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type ImageThumbnailProps = ImageProps

const ImageThumbnail = ({
  children,
  className,
  ...props
}: ImageThumbnailProps) => {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <div
      className={cn(
        'w-full h-full overflow-hidden rounded-lg shadow-sm',
        className
      )}
    >
      {isLoading ? <Skeleton className="h-full w-full" /> : null}
      <Image
        {...props}
        className="h-full w-full object-cover"
        width={256}
        height={256}
        alt={props.alt}
        onLoad={() => setIsLoading(false)}
      />
      {children}
    </div>
  )
}

export default ImageThumbnail
