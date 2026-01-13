import { del } from '@vercel/blob'
import 'server-only'

/** Delete a file from Vercel Blob Storage by its file path. */
export async function deleteFiles(pathname: string | string[]) {
  return del(pathname)
}
