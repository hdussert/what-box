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
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })
    return user
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
})

export const getUserById = cache(async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    })
    return user
  } catch (error) {
    console.error('Error getting user by id:', error)
    return null
  }
})

/**
 * Get the currently authenticated user based on the session.
 * If no user is authenticated, redirects to the sign-in page.
 */
export const getCurrentUser = cache(async () => {
  try {
    const session = await getSession()
    if (!session) redirect('/signin')

    const user = await getUserById(session.userId)
    if (!user) redirect('/signin')
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    redirect('/signin')
  }
})
