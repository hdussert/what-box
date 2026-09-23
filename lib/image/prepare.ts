import { PreparedImage } from '@/lib/image/types'
import sharp from 'sharp'
import 'server-only'

// sharp's detected format -> the content type we serve (IMAGE_MIME_TYPES)
const CONTENT_TYPES: Record<string, string> = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

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

  let output: { data: Buffer; info: sharp.OutputInfo }
  try {
    output = await sharp(input, { animated: true })
      .rotate()
      .toBuffer({ resolveWithObject: true })
  } catch {
    throw new Error('Invalid image file')
  }

  // The format sharp found in the bytes, not the one the browser declared
  const contentType = CONTENT_TYPES[output.info.format]
  if (!contentType) {
    throw new Error('Invalid image file')
  }

  return { name: file.name, data: output.data, contentType }
}
