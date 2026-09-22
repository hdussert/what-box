import { generateSessionToken } from '@/lib/session'
import { resetPassword } from '@/lib/user'
import { ResetPasswordSchema } from '@what-box/shared'
import { NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * Body: { token, password, confirmPassword }. Unlike the web page (which
 * gets the token from a URL query param), a JSON API needs it in the body -
 * validated separately from ResetPasswordSchema, which only covers the
 * password fields shared with the web form.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  const token = typeof body?.token === 'string' ? body.token : null
  if (!token) {
    return NextResponse.json(
      { error: 'Validation failed', errors: { token: ['Token is required'] } },
      { status: 400 },
    )
  }

  const parsed = ResetPasswordSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', errors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    )
  }

  const result = await resetPassword(token, parsed.data.password)
  if (result.status === 'invalid') {
    return NextResponse.json({ error: result.error }, { status: 401 })
  }

  const sessionToken = await generateSessionToken(result.user.id)
  return NextResponse.json({
    token: sessionToken,
    user: { id: result.user.id, email: result.user.email },
  })
}
