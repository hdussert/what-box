import { getToken } from './auth'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
  }
}

/**
 * Authenticated GET against the web app's API (see apps/web/app/api). Throws
 * ApiError on a non-2xx response - a 401 means the stored token is missing
 * or stale, which callers use to route back to sign-in.
 */
export async function apiFetch<T>(path: string): Promise<T> {
  const token = await getToken()

  const response = await fetch(`${API_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  const body = await response.json().catch(() => null)
  if (!response.ok) {
    throw new ApiError(body?.error ?? 'Request failed', response.status)
  }

  return body as T
}
