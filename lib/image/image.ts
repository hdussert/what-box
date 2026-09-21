import { createImageRecord } from '@/lib/image/image-record'
import { deleteImagesFiles, uploadImageFile } from '@/lib/image/image-upload'
import 'server-only'

type CreateImageData = {
  boxId: string
  itemId?: string | null
  image: File
}

export async function createImage(data: CreateImageData) {
  const blob = await uploadImageFile(data)
  try {
    return await createImageRecord({
      boxId: data.boxId,
      itemId: data.itemId,
      url: blob.url,
      pathname: blob.pathname,
    })
  } catch (error) {
    // Clean up if DB fails
    await deleteImagesFiles(blob.pathname)
    throw error
  }
}
