import { env } from '@/env'
import { getUserById } from '@/lib/user'
import * as jose from 'jose'
import { cookies, headers } from 'next/headers'
import 'server-only'

// JWT types
interface JWTPayload {
  userId: string
  [key: string]: string | number | boolean | null | undefined // This is ugly af
}

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET)
const JWT_EXPIRATION = '7d' // 7 days expiration time
const REFRESH_THRESHOLD_SECONDS = 24 * 60 * 60 // 24 hours refresh threshold in seconds
const SESSION_COOKIE_NAME = 'auth_token'

export async function generateJWT(payload: JWTPayload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET)
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch {
    return null
  }
}

export async function verifyAccessToken(token: string) {
  const payload = await verifyJWT(token)
  if (!payload)
    return {
      valid: false,
      error: 'Invalid token structure',
    }

  const user = await getUserById(payload.userId) // payload.sub is usually the user ID
  if (!user)
    return {
      valid: false,
      error: 'User not found',
    }

  const tokenIssuedAt = payload.iat as number // seconds
  const tokenInvalidBefore = Math.floor(
    user.tokenInvalidBefore.getTime() / 1000,
  )

  if (tokenIssuedAt < tokenInvalidBefore) {
    return { valid: false, error: 'Token has been revoked by a security event' }
  }

  return { valid: true, user }
}

export async function shouldRefreshToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      clockTolerance: 15, // 15 seconds tolerance for clock skew
    })

    // Get expiration time
    const exp = payload.exp as number
    const now = Math.floor(Date.now() / 1000)
    const isTokenExpiringSoon = exp - now < REFRESH_THRESHOLD_SECONDS

    return isTokenExpiringSoon // If token expires within the threshold, refresh it
  } catch {
    // If verification fails, token is invalid or expired
    return false
  }
}

export async function createSession(userId: string) {
  try {
    const token = await generateJWT({ userId })

    const cookieStore = await cookies()
    cookieStore.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    })

    return true
  } catch (error) {
    console.error('Error creating session:', error)
    return false
  }
}

// Web reads the session from the `auth_token` cookie. Mobile has no cookie jar,
// so it authenticates with an `Authorization: Bearer <token>` header instead -
// same JWT, same verification, just a different place to find it.
async function getSessionToken(): Promise<string | null> {
  const headerStore = await headers()
  const authHeader = headerStore.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length)
  }

  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null
}

export async function getSession() {
  const token = await getSessionToken()
  if (!token) return null

  // TODO: Check errors, display toasts (like "Session expired")
  const { valid, user } = await verifyAccessToken(token)
  if (!valid || !user) return null

  return user
}

// Delete session by clearing the JWT cookie
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
