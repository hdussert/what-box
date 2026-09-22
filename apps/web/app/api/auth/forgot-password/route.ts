import { requestPasswordReset } from '@/lib/user'
import { ForgotPasswordSchema } from '@what-box/shared'
import { NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * Always returns the same generic response, whether the email exists, is
 * unknown, or is in its cooldown window - matches the web action's
 * intentional non-disclosure (see requestPasswordReset in lib/user.ts).
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = ForgotPasswordSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', errors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    )
  }

  await requestPasswordReset(parsed.data.email)
  return NextResponse.json({
    message: "If the account exists we've sent a link to setup a new password",
  })
}
