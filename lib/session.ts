import * as jose from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'
import 'server-only'

// JWT types
interface JWTPayload {
  userId: string
  [key: string]: string | number | boolean | null | undefined
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'MISSING_JWT_SECRET_IN_ENV_VARIABLE'
)
const JWT_EXPIRATION = '7d' // 7 days expiration time
const REFRESH_THRESHOLD = 24 * 60 * 60 // 24 hours refresh threshold in seconds
const JWT_TOKEN_COOKIE_NAME = 'auth_token'

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
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

export async function shouldRefreshToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      clockTolerance: 15, // 15 seconds tolerance for clock skew
    })

    // Get expiration time
    const exp = payload.exp as number
    const now = Math.floor(Date.now() / 1000)
    const isTokenExpiringSoon = exp - now < REFRESH_THRESHOLD

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
      name: JWT_TOKEN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
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

export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies()

    const token = cookieStore.get(JWT_TOKEN_COOKIE_NAME)?.value
    if (!token) return null

    const payload = await verifyJWT(token)

    return payload ? { userId: payload.userId } : null
  } catch (error) {
    // Handle the specific prerendering error
    if (
      error instanceof Error &&
      error.message.includes('During prerendering, `cookies()` rejects')
    ) {
      console.log(
        'Cookies not available during prerendering, returning null session'
      )
      return null
    }

    console.error('Error getting session:', error)
    return null
  }
})

// Delete session by clearing the JWT cookie
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(JWT_TOKEN_COOKIE_NAME)
}
