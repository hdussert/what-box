import { db } from '@/db'
import { users } from '@/db/schema'
import { hashPassword } from '@/lib/password'
import { getSession } from '@/lib/session'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import 'server-only'

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
export async function updateUserPassword(userId: string, password: string) {
  const hashedPassword = await hashPassword(password)
  const date = new Date()

  console.table({ pwd: hashedPassword, date: date, uid: userId })
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
  if (!user) redirect('/signin')

  return user
}
