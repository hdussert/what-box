import { UploadImageData } from '@/lib/image/types'
import { buildImagePath } from '@/lib/image/utils'
import { getCurrentUser } from '@/lib/user'
import { del, put } from '@vercel/blob'
import 'server-only'

export async function uploadImageFile({
  boxId,
  itemId = null,
  image,
}: UploadImageData) {
  const user = await getCurrentUser()
  const imagePath = buildImagePath({
    userId: user.id,
    boxId: boxId,
    itemId: itemId,
    imageName: image.name,
  })

  return put(imagePath, image, {
    access: 'public',
    addRandomSuffix: true,
  })
}

export async function deleteImageFiles(pathnames: string | string[]) {
  const user = await getCurrentUser()
  return del(pathnames)
}
