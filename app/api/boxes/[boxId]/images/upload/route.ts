import { getBoxById } from '@/lib/box'
import { createImageRecord } from '@/lib/image'
import { getCurrentUser } from '@/lib/user'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ boxId: string }> }
) {
  console.log('[upload route] POST', req.url) // <- add

  try {
    const { boxId } = await params

    const body = (await req.json()) as HandleUploadBody

    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => {
        const user = await getCurrentUser()

        const box = await getBoxById(user.id, boxId)
        if (!box) {
          throw new Error('Box not found')
        }

        // Generate a unique pathname for the upload
        const id = crypto.randomUUID()
        const origin = new URL(req.url).origin

        // Organized into a per-user/per-box folder structure
        const safePathname = `users/${user.id}/boxes/${box.id}/${id}`
        console.log(safePathname)
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'], // TODO: remove magic strings
          tokenPayload: JSON.stringify({
            userId: user.id,
            boxId: box.id,
          }),
          pathname: safePathname,

          maximumSizeInBytes: 10 * 1024 * 1024, // 10 MB
          callbackUrl: `https://b3cf7f80dffb.ngrok-free.app/api/boxes/${boxId}/images/upload`,
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('onUploadCompleted fired', {
          url: blob.url,
          pathname: blob.pathname,
        })

        const { userId, boxId } = JSON.parse(tokenPayload!)
        await createImageRecord(userId, boxId, blob.url, blob.pathname)
      },
    })

    return NextResponse.json(json)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: z.flattenError(error).fieldErrors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message ?? 'Upload token error',
        error: 'Upload token error',
      },
      { status: 500 }
    )
  }
}
