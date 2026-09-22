import { apiRoute } from '@/lib/api/response'
import { IMAGE_MIME_TYPES, MAX_IMAGE_SIZE } from '@/lib/image/const'
import { deleteImage, saveImage } from '@/lib/image/mutations'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const AddImageSchema = z.object({
  image: z.file().max(MAX_IMAGE_SIZE).mime(IMAGE_MIME_TYPES),
  boxId: z.string().trim().min(1, 'Box is required'),
  itemId: z.string().trim().min(1, 'Item is required').optional().nullable(),
})

/**
 * `POST /api/images` - multipart/form-data: `image` (file), `boxId`,
 * `itemId` (present -> item image, absent -> box image - the only
 * discriminator, same as the web action).
 */
export async function POST(request: Request) {
  return apiRoute(async () => {
    const formData = await request.formData()
    const { image, boxId, itemId } = AddImageSchema.parse({
      image: formData.get('image'),
      boxId: formData.get('boxId'),
      itemId: formData.get('itemId'),
    })

    await saveImage({ boxId, itemId: itemId ?? null, image })
    return NextResponse.json(
      { message: 'Image uploaded successfully' },
      { status: 201 },
    )
  })
}

const DeleteImageSchema = z.object({
  boxId: z.string().trim().min(1, 'Box is required'),
  itemId: z.string().trim().min(1, 'Item is required').optional().nullable(),
})

/** `DELETE /api/images` - body `{ boxId, itemId? }`, same discriminator as POST. */
export async function DELETE(request: Request) {
  return apiRoute(async () => {
    const body = await request.json().catch(() => null)
    const data = DeleteImageSchema.parse(body)

    const deleted = await deleteImage(data)
    if (!deleted) {
      return NextResponse.json({ error: 'No image found' }, { status: 404 })
    }
    return { message: 'Image deleted successfully' }
  })
}
