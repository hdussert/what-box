import { NextResponse, type NextRequest } from 'next/server'

/**
 * Forwards the requested path to server code as `x-pathname`, so
 * `getCurrentUser()` can send a signed-out user back here after sign-in.
 * Server components can't read the URL otherwise. No auth happens here.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname + search)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/dashboard/:path*', '/boxes/:path*'],
}
