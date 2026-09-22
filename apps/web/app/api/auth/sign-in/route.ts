import { generateSessionToken } from '@/lib/session'
import { lockoutMessage, verifyCredentials } from '@/lib/user'
import { SignInSchema } from '@what-box/shared'
import { NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * JSON sign-in for API clients (the mobile app) that can't use the
 * cookie-based `signInAction`. Returns the JWT in the body instead of
 * setting a cookie - the client stores it and sends it back as
 * `Authorization: Bearer <token>`.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = SignInSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', errors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    )
  }

  const result = await verifyCredentials(parsed.data.email, parsed.data.password)
  if (result.status === 'locked') {
    return NextResponse.json({ error: lockoutMessage(result.lockedUntil) }, { status: 429 })
  }
  if (result.status === 'invalid') {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const token = await generateSessionToken(result.user.id)
  return NextResponse.json({
    token,
    user: { id: result.user.id, email: result.user.email },
  })
}
