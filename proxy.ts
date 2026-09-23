import { SESSION_COOKIE_NAME } from '@/lib/const'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * - `/`: sends visitors with a session cookie straight to `/dashboard`, before
 *   anything renders (a redirect from the page itself flashed the marketing
 *   layout first). It only checks that the cookie exists: `/dashboard`
 *   verifies it, and an invalid one ends on sign-in with the "expired" notice.
 * - App routes: forwards the requested path as `x-pathname`, so
 *   `getCurrentUser()` can send a signed-out user back here after sign-in.
 *   Server components can't read the URL otherwise.
 *
 * No authorization happens here: that stays in the data layer (`lib/*`).
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname === '/') {
    if (request.cookies.has(SESSION_COOKIE_NAME)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname + search)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/boxes/:path*'],
}
