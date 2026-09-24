import { IMAGE_FORMATS } from '@/lib/image/const'
import { PreparedImage } from '@/lib/image/types'
import { randomUUID } from 'crypto'
import 'server-only'
import sharp, { type OutputInfo } from 'sharp'

/**
 * Decodes an upload and re-encodes it without metadata (phone photos carry
 * their GPS location), applying the EXIF orientation first. Throws if the
 * bytes aren't a JPEG, PNG or WebP. The file gets a random name.
 */
export async function prepareImage(file: File): Promise<PreparedImage> {
  const input = Buffer.from(await file.arrayBuffer())

  let output: { data: Buffer; info: OutputInfo }
  try {
    output = await sharp(input, { animated: true })
      .rotate()
      .toBuffer({ resolveWithObject: true })
  } catch {
    throw new Error('Invalid image file')
  }

  // The format sharp found in the bytes, not the one the browser declared
  const { format } = output.info
  if (!Object.hasOwn(IMAGE_FORMATS, format)) {
    throw new Error('Invalid image file')
  }
  const contentType = IMAGE_FORMATS[format as keyof typeof IMAGE_FORMATS]

  const extension = format === 'jpeg' ? 'jpg' : format
  const name = `${randomUUID()}.${extension}`

  return { name, data: output.data, contentType }
}
