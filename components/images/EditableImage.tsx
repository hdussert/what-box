'use client'

import { addImageAction } from '@/actions/images/add-image'
import { deleteImageAction } from '@/actions/images/delete-image'
import EditableImageMenu from '@/components/images/EditableImageMenu'
import ImageInput from '@/components/images/ImageInput'
import ImageInputPreview from '@/components/images/ImageInputPreview'
import ImagePreview from '@/components/images/ImagePreview'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type EditableImageProps = {
  itemId?: string
  boxId: string
  imageUrl?: string | null
  className?: string
  isInputDisabled?: boolean
}

const EditableImage = ({
  imageUrl,
  isInputDisabled,
  itemId,
  boxId,
  className,
}: EditableImageProps) => {
  const [newImage, setNewImage] = useState<File>()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // Uploads as soon as a file is picked
  const uploadImage = (image?: File) => {
    setNewImage(image)
    if (!image) {
      return
    }
    startTransition(async () => {
      const result = await addImageAction({ image, itemId, boxId })
      if (result.success) {
        toast.success('Image uploaded !')
        router.refresh()
      } else {
        // Drop the preview so it doesn't look saved
        setNewImage(undefined)
        toast.error('Could not upload the image.')
      }
    })
  }

  const deleteImage = () => {
    if (!imageUrl) {
      return
    }
    // A file from an earlier upload must not show as "replacing" while deleting
    setNewImage(undefined)
    startTransition(async () => {
      const result = await deleteImageAction({ boxId, itemId })
      if (result.success) {
        setNewImage(undefined)
        toast.success('Image deleted !')
        router.refresh()
      } else {
        toast.error('Could not delete the image.')
      }
    })
  }

  // saveImage (behind addImageAction) swaps the image and only then deletes
  // the old file, so there's no separate delete step
  const replaceImage = (image: File) => {
    setNewImage(image)
    startTransition(async () => {
      const result = await addImageAction({ image, itemId, boxId })
      if (result.success) {
        toast.success('Image replaced !')
        // Inside the transition so the new photo and spinner stay until the
        // refreshed page arrives, instead of flashing back to the old photo
        startTransition(() => router.refresh())
      } else {
        // Back to the old photo, which is still saved
        setNewImage(undefined)
        toast.error('Could not replace the image.')
      }
    })
  }

  // While replacing, show the new photo with the upload spinner, like a first upload
  if (imageUrl && isPending && newImage) {
    return (
      <ImageInputPreview image={newImage} className={cn('relative', className)}>
        <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center">
          <LoaderCircle size={48} className="animate-spin" />
        </div>
      </ImageInputPreview>
    )
  }

  return imageUrl ? (
    <ImagePreview src={imageUrl} alt="Image" className={className}>
      {isInputDisabled ? null : (
        <EditableImageMenu
          disabled={isPending}
          onReplace={replaceImage}
          onDelete={deleteImage}
        />
      )}
    </ImagePreview>
  ) : (
    <ImageInput
      image={newImage}
      onImageChange={uploadImage}
      className={className}
      disabled={isInputDisabled || isPending}
      isLoading={isPending}
    />
  )
}

export default EditableImage
