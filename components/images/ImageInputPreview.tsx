import ImagePreview from '@/components/images/ImagePreview'
import { cn } from '@/lib/utils'
import { PropsWithChildren, useEffect, useState } from 'react'

type ImageInputPreviewProps = PropsWithChildren<{
  image: File
  className?: string
}>

const ImageInputPreview = ({
  image,
  className,
  children,
}: ImageInputPreviewProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>()
  useEffect(() => {
    const url = URL.createObjectURL(image)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the object URL only exists once created here
    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [image])

  return previewUrl ? (
    <ImagePreview
      src={previewUrl}
      alt="box image"
      className={cn('aspect-square', className)}
    >
      {children}
    </ImagePreview>
  ) : null
}

export default ImageInputPreview
