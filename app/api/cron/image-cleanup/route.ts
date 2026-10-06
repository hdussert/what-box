import { env } from '@/env'
import { deleteUnreferencedImageFiles } from '@/lib/image/cleanup'

/** Monthly image cleanup, called by Vercel Cron (vercel.json). */
export async function GET(request: Request) {
  // Checked first: an unset secret would otherwise match "Bearer undefined"
  const isFromCron =
    !!env.CRON_SECRET &&
    request.headers.get('authorization') === `Bearer ${env.CRON_SECRET}`
  if (!isFromCron) {
    return new Response('Unauthorized', { status: 401 })
  }

  const result = await deleteUnreferencedImageFiles()
  console.log('Image cleanup', result)
  return Response.json(result)
}
