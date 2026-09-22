import { db } from '@/db'
import { User, users } from '@/db/schema'
import { hashPassword, verifyPassword } from '@/lib/password'
import { getSession } from '@/lib/session'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import 'server-only'

const MAX_FAILED_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 15 * 60 * 1000
// Prevents spamming an inbox with reset links / farming reset tokens.
const RESET_REQUEST_COOLDOWN_MS = 5 * 60 * 1000

// Create a new user
export async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password)

  const [user] = await db
    .insert(users)
    .values({ email, password: hashedPassword })
    .returning({
      id: users.id,
      email: users.email,
    })

  if (!user) throw new Error('Failed to create the account')
  return user
}

// Update user password
export async function updatePassword(userId: string, password: string) {
  const hashedPassword = await hashPassword(password)
  const date = new Date()

  const [user] = await db
    .update(users)
    .set({ password: hashedPassword, tokenInvalidBefore: date })
    .where(eq(users.id, userId))
    .returning({
      id: users.id,
      email: users.email,
    })

  if (!user) throw new Error("Couldn't change the user password")
  return user
}

// Get user by email
export const getUserByEmail = cache(async (email: string) => {
  return db.query.users.findFirst({
    where: { email },
  })
})

export type CredentialsResult =
  | { status: 'ok'; user: User }
  | { status: 'invalid' }
  | { status: 'locked'; lockedUntil: Date }

/** Shared copy for a 'locked' result. */
export function lockoutMessage(lockedUntil: Date) {
  const minutes = Math.max(1, Math.ceil((lockedUntil.getTime() - Date.now()) / 60_000))
  return `Too many failed attempts. Try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`
}

/**
 * Verify email/password credentials, enforcing a lockout after repeated
 * failures: MAX_FAILED_LOGIN_ATTEMPTS wrong passwords in a row locks the
 * account for LOCKOUT_DURATION_MS. A correct password resets the counter.
 */
export async function verifyCredentials(
  email: string,
  password: string,
): Promise<CredentialsResult> {
  const user = await getUserByEmail(email)
  if (!user) return { status: 'invalid' }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return { status: 'locked', lockedUntil: user.lockedUntil }
  }

  const isPasswordValid = await verifyPassword(password, user.password)
  if (!isPasswordValid) {
    await recordFailedLogin(user)
    return { status: 'invalid' }
  }

  if (user.failedLoginAttempts > 0) {
    await db
      .update(users)
      .set({ failedLoginAttempts: 0, lockedUntil: null })
      .where(eq(users.id, user.id))
  }

  return { status: 'ok', user }
}

async function recordFailedLogin(user: User) {
  const failedLoginAttempts = user.failedLoginAttempts + 1
  const lockedUntil =
    failedLoginAttempts >= MAX_FAILED_LOGIN_ATTEMPTS
      ? new Date(Date.now() + LOCKOUT_DURATION_MS)
      : null

  await db
    .update(users)
    .set({ failedLoginAttempts, lockedUntil })
    .where(eq(users.id, user.id))
}

/**
 * Whether a forgot-password request for this user should proceed, or is
 * still within the cooldown from a previous request.
 */
export function canRequestPasswordReset(
  user: Pick<User, 'lastPasswordResetRequestAt'>,
): boolean {
  return (
    !user.lastPasswordResetRequestAt ||
    Date.now() - user.lastPasswordResetRequestAt.getTime() >=
      RESET_REQUEST_COOLDOWN_MS
  )
}

/** Stamps the cooldown - call right before sending a reset email. */
export async function recordPasswordResetRequest(userId: string) {
  await db
    .update(users)
    .set({ lastPasswordResetRequestAt: new Date() })
    .where(eq(users.id, userId))
}

export const getUserById = cache(async (id: string) => {
  return db.query.users.findFirst({
    where: { id },
  })
})

/**
 * Get the currently authenticated user based on the session.
 * If no user is authenticated, redirects to the sign-in page.
 */
export const getCurrentUser = async () => {
  const user = await getSession()
  if (!user) redirect('/')

  return user
}
