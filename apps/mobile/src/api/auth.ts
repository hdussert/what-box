import { SignInData, SignInSchema } from '@what-box/shared'
import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'
const API_URL = process.env.EXPO_PUBLIC_API_URL

export type AuthUser = { id: string; email: string }

export function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY)
}

/**
 * Reads the signed-in user back from storage, for restoring auth state on
 * app launch without a network round-trip. There's no `/api/me` endpoint
 * yet, so this is only as fresh as the last sign-in - if the token has since
 * been revoked server-side, the first authenticated request 401s and the app
 * routes back to sign-in.
 */
export async function getStoredUser(): Promise<AuthUser | null> {
  const raw = await SecureStore.getItemAsync(USER_KEY)
  return raw ? (JSON.parse(raw) as AuthUser) : null
}

export async function signIn(data: SignInData): Promise<AuthUser> {
  // Same schema the server validates against - fail fast locally instead of
  // round-tripping an input we already know is invalid.
  const parsed = SignInSchema.parse(data)

  const response = await fetch(`${API_URL}/api/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed),
  })

  const body = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(body?.error ?? 'Sign in failed')
  }

  const user = body.user as AuthUser
  await SecureStore.setItemAsync(TOKEN_KEY, body.token)
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user))
  return user
}

export async function signOut() {
  await SecureStore.deleteItemAsync(TOKEN_KEY)
  await SecureStore.deleteItemAsync(USER_KEY)
}
