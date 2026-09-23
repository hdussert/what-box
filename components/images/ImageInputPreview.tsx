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
  // The object URL is a browser resource that must be revoked, so it's created
  // and released in an effect. useMemo + cleanup would break in Strict Mode:
  // the cleanup revokes the URL, and the memoized value isn't recreated.
  useEffect(() => {
    const url = URL.createObjectURL(image)
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
