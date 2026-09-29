import { db } from '@/db'
import { User, users } from '@/db/schema'
import { UserError } from '@/lib/errors'
import { hashPassword, verifyPassword } from '@/lib/password'
import { getSession, hasSessionCookie } from '@/lib/session'
import { pluralize } from '@/lib/utils'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
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
    // Set from the app clock, not the column's DB default: the session token's
    // `iat` comes from this clock too, and a DB clock even a few ms ahead
    // made a brand-new token look revoked (see verifyToken in lib/session.ts).
    .values({ email, password: hashedPassword, tokenInvalidBefore: new Date() })
    .returning({
      id: users.id,
      email: users.email,
    })

  if (!user) throw new UserError('Failed to create the account')
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

  if (!user) throw new UserError("Couldn't change the user password")
  return user
}

/**
 * Change the signed-in user's password once their current one checks out,
 * with the same lockout as sign-in. Revokes every session, this one too.
 * Throws a user-facing Error when the current password is refused.
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  const user = await verifyCurrentPassword(
    currentPassword,
    'Incorrect current password',
  )
  return updatePassword(user.id, newPassword)
}

/**
 * The signed-in user, once `password` checks out, with the same lockout as
 * sign-in. Throws the lockout message or `invalidMessage` otherwise.
 */
export async function verifyCurrentPassword(
  password: string,
  invalidMessage: string,
) {
  const user = await getCurrentUser()
  await checkCredentials(user.email, password, invalidMessage)
  return user
}

/**
 * Delete the signed-in user. Their boxes and items go with them (cascade),
 * but not their image files: delete those first, through lib/image.
 */
export async function deleteCurrentUser() {
  const user = await getCurrentUser()
  await db.delete(users).where(eq(users.id, user.id))
}

// Get user by email
export const getUserByEmail = cache(async (email: string) => {
  return db.query.users.findFirst({
    where: { email },
  })
})

type CredentialsResult =
  | { status: 'ok'; user: User }
  | { status: 'invalid' }
  | { status: 'locked'; lockedUntil: Date }

/** The message for a 'locked' result. */
function lockoutMessage(lockedUntil: Date) {
  const minutes = Math.max(
    1,
    Math.ceil((lockedUntil.getTime() - Date.now()) / 60_000),
  )
  return `Too many failed attempts. Try again in ${pluralize(minutes, { one: 'minute', other: 'minutes' })}.`
}

/**
 * Verify email/password credentials, enforcing a lockout after repeated
 * failures: MAX_FAILED_LOGIN_ATTEMPTS wrong passwords in a row locks the
 * account for LOCKOUT_DURATION_MS. A correct password resets the counter.
 */
async function verifyCredentials(
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

/**
 * verifyCredentials for callers that only need the user: throws a
 * user-facing Error instead, the lockout message or `invalidMessage`.
 */
export async function checkCredentials(
  email: string,
  password: string,
  invalidMessage: string,
) {
  const result = await verifyCredentials(email, password)
  if (result.status === 'locked') {
    throw new UserError(lockoutMessage(result.lockedUntil))
  }
  if (result.status === 'invalid') {
    throw new UserError(invalidMessage)
  }
  return result.user
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
 * If no user is authenticated, redirects to the sign-in page with:
 * - `next`: the requested path (set by `proxy.ts`), so sign-in can return there
 * - `expired=1`: when a session cookie exists but is no longer valid
 */
export const getCurrentUser = async () => {
  const user = await getSession()
  if (!user) {
    const params = new URLSearchParams()
    const pathname = (await headers()).get('x-pathname')
    if (pathname) {
      params.set('next', pathname)
    }
    if (await hasSessionCookie()) {
      params.set('expired', '1')
    }
    const query = params.toString()
    redirect(query ? `/sign-in?${query}` : '/sign-in')
  }

  return user
}
