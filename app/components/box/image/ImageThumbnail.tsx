import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'

type ImageThumbnailProps = ImageProps

const ImageThumbnail = ({
  children,
  className,
  ...props
}: ImageThumbnailProps) => {
  return (
    <div className={cn('h-16 w-16', className)}>
      <Image
        {...props}
        className="h-full w-full object-cover rounded border-2"
        width={128}
        height={128}
        alt={props.alt}
      />
      {children}
    </div>
  )
}

export default ImageThumbnail
