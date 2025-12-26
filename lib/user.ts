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

  try {
    const result = await db
      .insert(users)
      .values({ email, password: hashedPassword })
      .returning()

    const user = { id: result[0].id, email: result[0].email }
    return user
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

// Get user by email
export const getUserByEmail = cache(async (email: string) => {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  })
})

export const getUserById = cache(async (id: string) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
})

/**
 * Get the currently authenticated user based on the session.
 * If no user is authenticated, redirects to the sign-in page.
 */
export const getCurrentUser = async () => {
  const session = await getSession()
  if (!session) redirect('/signin')

  const user = await getUserById(session.userId)
  if (!user) redirect('/signin')
  return user
}
