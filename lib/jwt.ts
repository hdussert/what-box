import { env } from '@/env'
import * as jose from 'jose'
import 'server-only'

// Kept apart from lib/session.ts, which needs the DB: proxy.ts verifies
// tokens with these and must stay light.

export interface JWTPayload {
  userId: string
  type: 'session' | 'reset'
  [key: string]: string | number | boolean | null | undefined // This is ugly af
}

export const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET)

export async function generateJWT(payload: JWTPayload, expiration: string) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiration)
    .sign(JWT_SECRET)
}

/** Checks the signature and expiry only; revocation needs the DB (see lib/session.ts). */
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch {
    return null
  }
}
