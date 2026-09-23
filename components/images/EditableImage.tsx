'use client'

import { addImageAction } from '@/actions/images/add-image'
import { deleteImageAction } from '@/actions/images/delete-image'
import EditableImageMenu from '@/components/images/EditableImageMenu'
import ImageInput from '@/components/images/ImageInput'
import ImagePreview from '@/components/images/ImagePreview'
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

  // Uploads as soon as a file is picked (ImageInput calls this on change)
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
        toast.error('Could not upload the image.')
      }
    })
  }

  const deleteImage = () => {
    if (!imageUrl) {
      return
    }
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

  const replaceImage = (image: File) => {
    startTransition(async () => {
      const deleteResult = await deleteImageAction({ boxId, itemId })
      if (!deleteResult.success) {
        toast.error('Could not replace the image.')
        return
      }
      const addResult = await addImageAction({ image, itemId, boxId })
      if (addResult.success) {
        toast.success('Image replaced !')
        router.refresh()
      } else {
        toast.error('Could not replace the image.')
      }
    })
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
      setImage={uploadImage}
      className={className}
      disabled={isInputDisabled || isPending}
      isLoading={isPending}
    />
  )
}

export default EditableImage
