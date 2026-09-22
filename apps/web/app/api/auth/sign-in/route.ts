import { generateJWT } from '@/lib/session'
import { verifyCredentials } from '@/lib/user'
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

  const user = await verifyCredentials(parsed.data.email, parsed.data.password)
  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const token = await generateJWT({ userId: user.id })
  return NextResponse.json({ token, user: { id: user.id, email: user.email } })
}
