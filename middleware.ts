import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

const PUBLIC_PATHS = [
  '/login',
  '/public/*'
]

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))
}

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request)

  const pathname = request.nextUrl.pathname

  if (isPublicPath(pathname)) return response

  if (user) return response

  const signInUrl = new URL('/login', request.url)
  signInUrl.searchParams.set('next', request.nextUrl.pathname + request.nextUrl.search)

  return NextResponse.redirect(signInUrl)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
