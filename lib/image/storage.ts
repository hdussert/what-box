import { UploadImageData } from '@/lib/image/types'
import { buildImagePath, userImagePrefix } from '@/lib/image/utils'
import { getCurrentUser } from '@/lib/user'
import { del, list, put } from '@vercel/blob'
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

  return put(imagePath, image.data, {
    access: 'public',
    contentType: image.contentType,
  })
}

export async function deleteImageFiles(pathnames: string | string[]) {
  // Auth check only: throws when signed out
  await getCurrentUser()
  return del(pathnames)
}

/**
 * Delete every image file of the signed-in user, including files no box or
 * item points to any more. Blob can't delete a folder, so this lists the
 * user's prefix a page at a time and deletes each page.
 */
export async function deleteAllImageFiles() {
  const user = await getCurrentUser()

  let cursor: string | undefined
  do {
    const page = await list({ prefix: userImagePrefix(user.id), cursor })
    if (page.blobs.length) {
      await del(page.blobs.map((blob) => blob.pathname))
    }
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)
}
