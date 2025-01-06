import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    // Refresh session if expired
    const { data: { session } } = await supabase.auth.getSession()

    // Rutas protegidas
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      if (!session) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    // Rutas de autenticación
    if (req.nextUrl.pathname.startsWith('/auth')) {
      if (session) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
}

