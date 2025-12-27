import { del, put } from '@vercel/blob'
import 'server-only'

/** Upload a file to Vercel Blob Storage under a specific box ID directory. */
export async function uploadFile(file: Blob, boxId: string) {
  const pathname = `${boxId}/${crypto.randomUUID()}`
  return put(pathname, file, {
    access: 'public',
  })
}

/** Delete a file from Vercel Blob Storage by its file path. */
export async function deleteFile(pathname: string) {
  return del(pathname)
}
