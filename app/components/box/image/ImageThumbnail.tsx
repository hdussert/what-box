import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'

type ImageThumbnailProps = ImageProps

const ImageThumbnail = ({
  children,
  className,
  ...props
}: ImageThumbnailProps) => {
  return (
    <div className={cn('h-32 w-32', className)}>
      <Image
        {...props}
        className="h-full w-full object-cover rounded border-2"
        width={256}
        height={256}
        alt={props.alt}
      />
      {children}
    </div>
  )
}

export default ImageThumbnail
