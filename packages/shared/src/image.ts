// Client-side size/mime checks before attempting an upload, on both web and
// mobile - not a full upload schema (z.file() validation is web/Node-
// specific; the mobile image picker doesn't produce a File/Blob instance
// the same way a browser does, so it validates these plain values itself
// instead of sharing a Zod schema built around z.file()).
export const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const MAX_IMAGE_SIZE = 4.9 * 1000 * 1000
export const MAX_IMAGE_SIZE_READABLE = '4.9MB'
