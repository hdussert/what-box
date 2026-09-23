/**
 * Allowed image formats: sharp's format name -> MIME type. The single source
 * for both what uploads may declare and what `prepareImage` accepts once it
 * has decoded the bytes.
 */
export const IMAGE_FORMATS = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
} as const

export const IMAGE_MIME_TYPES = Object.values(IMAGE_FORMATS)

export const MAX_IMAGE_SIZE = 4.9 * 1000 * 1000
export const MAX_IMAGE_SIZE_READABLE = '4.9MB'
