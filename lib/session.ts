import { env } from '@/env'
import { SESSION_COOKIE_NAME } from '@/lib/const'
import { getUserById } from '@/lib/user'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import 'server-only'

// JWT types
interface JWTPayload {
  userId: string
  type: 'session' | 'reset'
  [key: string]: string | number | boolean | null | undefined // This is ugly af
}

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET)
const JWT_EXPIRATION = '7d' // 7 days expiration time
// Outlives the JWT on purpose: a cookie still holding an expired token tells
// "session expired" apart from "never signed in" (see hasSessionCookie).
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days, in seconds
const RESET_TOKEN_EXPIRATION = '1h' // Password-reset links are short-lived, unlike sessions
const REFRESH_THRESHOLD_SECONDS = 24 * 60 * 60 // 24 hours refresh threshold in seconds

async function generateJWT(payload: JWTPayload, expiration: string) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiration)
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

// Session tokens (login) and reset tokens (forgot-password links) are both
// JWTs signed with the same secret, so a `type` claim is the only thing
// stopping a reset link from working as a full session credential - this is
// checked before anything else, not just relied on as a hint.
async function verifyToken(token: string, expectedType: JWTPayload['type']) {
  const payload = await verifyJWT(token)
  if (!payload) {
    return { valid: false as const, error: 'Invalid token structure' }
  }

  if (payload.type !== expectedType) {
    return { valid: false as const, error: 'Invalid token type' }
  }

  const user = await getUserById(payload.userId)
  if (!user) {
    return { valid: false as const, error: 'User not found' }
  }

  const tokenIssuedAt = payload.iat as number // seconds
  const tokenInvalidBefore = Math.floor(
    user.tokenInvalidBefore.getTime() / 1000,
  )

  if (tokenIssuedAt < tokenInvalidBefore) {
    return {
      valid: false as const,
      error: 'Token has been revoked by a security event',
    }
  }

  return { valid: true as const, user }
}

export async function verifyAccessToken(token: string) {
  return verifyToken(token, 'session')
}

/** Verifies a password-reset link's token. Rejects a session token used here. */
export async function verifyResetToken(token: string) {
  return verifyToken(token, 'reset')
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

/** JWT for a login session, stored in the auth_token cookie - 7-day expiry. */
export async function generateSessionToken(userId: string) {
  return generateJWT({ userId, type: 'session' }, JWT_EXPIRATION)
}

/** JWT for a password-reset link - 1-hour expiry, rejected by verifyAccessToken. */
export async function generateResetToken(userId: string) {
  return generateJWT({ userId, type: 'reset' }, RESET_TOKEN_EXPIRATION)
}

export async function createSession(userId: string) {
  try {
    const token = await generateSessionToken(userId)

    const cookieStore = await cookies()
    cookieStore.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: SESSION_COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    })

    return true
  } catch (error) {
    console.error('Error creating session:', error)
    return false
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) return null

  // TODO: Check errors, display toasts (like "Session expired")
  const { valid, user } = await verifyAccessToken(token)
  if (!valid || !user) return null

  return user
}

/**
 * Whether the browser sent a session cookie, valid or not. When
 * `getSession()` returns null, this tells an expired or revoked session
 * (true) apart from a visitor who never signed in or signed out (false).
 */
export async function hasSessionCookie() {
  const cookieStore = await cookies()
  return cookieStore.has(SESSION_COOKIE_NAME)
}

// Delete session by clearing the JWT cookie
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
