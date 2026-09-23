import { IMAGE_FORMATS } from '@/lib/image/const'
import { PreparedImage } from '@/lib/image/types'
import 'server-only'
import sharp, { type OutputInfo } from 'sharp'

/**
 * Decodes an uploaded image and re-encodes it without metadata (EXIF, XMP,
 * IPTC): phone photos carry the GPS location where they were taken, and
 * blobs are public. `rotate()` bakes the EXIF orientation into the pixels
 * first, or portrait photos would turn sideways once it's gone.
 *
 * Call it before creating anything that owns the image: it throws on files
 * that aren't really a JPEG, PNG or WebP, whatever their declared type.
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

  return { name: file.name, data: output.data, contentType }
}
