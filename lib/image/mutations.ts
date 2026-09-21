import { createImageRecord } from '@/lib/image/records'
import { deleteImageFiles, uploadImageFile } from '@/lib/image/storage'
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
    await deleteImageFiles(blob.pathname)
    throw error
  }
}
