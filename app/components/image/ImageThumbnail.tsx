import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'

type ImageThumbnailProps = ImageProps

const ImageThumbnail = ({
  children,
  className,
  ...props
}: ImageThumbnailProps) => {
  return (
    <div
      className={cn(
        'size-full overflow-hidden rounded-lg shadow-sm',
        className,
      )}
    >
      <Image
        {...props}
        className="size-full object-cover data-[loaded=false]:animate-pulse data-[loaded=false]:bg-accent"
        width={256}
        height={256}
        alt={props.alt}
      />
      {children}
    </div>
  )
}

export default ImageThumbnail
