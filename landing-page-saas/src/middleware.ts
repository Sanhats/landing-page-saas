import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  console.log('Middleware executing for path:', req.nextUrl.pathname)
  
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    console.log('Session status in middleware:', session ? 'Authenticated' : 'Not authenticated')

    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      if (!session) {
        console.log('No session found, redirecting to signin...')
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
      console.log('Session found, allowing access to dashboard')
    }

    if (req.nextUrl.pathname.startsWith('/auth')) {
      if (session) {
        console.log('Session found, redirecting to dashboard...')
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      console.log('No session found, allowing access to auth pages')
    }

    return res
  } catch (error) {
    console.error('Error in middleware:', error)
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
}

