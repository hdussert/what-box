import { SESSION_COOKIE_NAME } from '@/lib/const'
import { verifyJWT } from '@/lib/jwt'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * - `/`: sends signed-in visitors straight to `/dashboard`, before anything
 *   renders (a redirect from the page itself flashed the marketing layout
 *   first). It checks the token's signature and expiry but not revocation,
 *   which needs the DB: a revoked session goes through sign-in once. An
 *   expired token (the cookie outlives it) falls through to the landing page.
 * - App routes: forwards the requested path as `x-pathname`, so
 *   `getCurrentUser()` can send a signed-out user back here after sign-in.
 *   Server components can't read the URL otherwise.
 *
 * No authorization happens here: that stays in the data layer (`lib/*`).
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname === '/') {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
    const payload = token ? await verifyJWT(token) : null
    if (payload?.type === 'session') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname + search)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/boxes/:path*', '/settings/:path*'],
}
