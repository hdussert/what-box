import { generateSessionToken } from '@/lib/session'
import { createUser, getUserByEmail } from '@/lib/user'
import { SignUpSchema } from '@what-box/shared'
import { NextResponse } from 'next/server'
import { z } from 'zod'

/** JSON sign-up for API clients (the mobile app). Returns the JWT in the body, same as sign-in. */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = SignUpSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', errors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    )
  }

  const existingUser = await getUserByEmail(parsed.data.email)
  if (existingUser) {
    return NextResponse.json({ error: 'Failed to create account' }, { status: 409 })
  }

  const user = await createUser(parsed.data.email, parsed.data.password)
  const token = await generateSessionToken(user.id)
  return NextResponse.json({ token, user: { id: user.id, email: user.email } })
}
