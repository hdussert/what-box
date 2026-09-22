import { NextResponse } from 'next/server'
import 'server-only'
import { z } from 'zod'

// Next.js tags a thrown redirect() with a `digest` string prefixed
// NEXT_REDIRECT - there's no exported type guard for it, so this is the
// standard way to detect one.
function isRedirectError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    typeof (error as { digest?: unknown }).digest === 'string' &&
    (error as { digest: string }).digest.startsWith('NEXT_REDIRECT')
  )
}

/**
 * Runs a route handler's `lib/*` call and maps the result to a JSON response.
 * `getCurrentUser()` (called by every `lib/*` query and mutation) redirects
 * to `/` when there's no session, which is right for pages but not for an
 * API - this turns that redirect into a 401, and a thrown `ZodError` into a
 * 400, instead of letting either reach the client as-is.
 */
export async function apiRoute<T>(
  handler: () => Promise<T | NextResponse>,
): Promise<NextResponse> {
  try {
    const data = await handler()
    return data instanceof NextResponse ? data : NextResponse.json(data)
  } catch (error) {
    if (isRedirectError(error)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', errors: z.flattenError(error).fieldErrors },
        { status: 400 },
      )
    }

    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
