import { env } from '@/env'
import { processImageCleanupQueue } from '@/lib/image/cleanup'

/** Daily image cleanup, called by Vercel Cron (vercel.json). */
export async function GET(request: Request) {
  const isFromCron =
    request.headers.get('authorization') === `Bearer ${env.CRON_SECRET}`
  if (!isFromCron) {
    return new Response('Unauthorized', { status: 401 })
  }

  const result = await processImageCleanupQueue()
  console.log('Image cleanup', result)
  return Response.json(result)
}
