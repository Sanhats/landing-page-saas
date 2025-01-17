import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    
    await supabase.auth.getSession()

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If accessing a protected route and not authenticated
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      if (!session) {
        const redirectUrl = new URL('/auth/signin', req.url)
        redirectUrl.searchParams.set('from', req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
      }
    }

    // If accessing auth pages while authenticated
    if (req.nextUrl.pathname.startsWith('/auth')) {
      if (session) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }

    return res
  } catch (e) {
    console.error('Middleware error:', e)
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}

