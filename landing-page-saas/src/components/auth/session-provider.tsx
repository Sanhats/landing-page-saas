'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { createClientSideSupabaseClient } from '@/lib/supabase-client'
import { usePathname, useRouter } from 'next/navigation'

interface SessionContextType {
  session: Session | null
  isLoading: boolean
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  isLoading: true,
})

export function SessionProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode
  initialSession: Session | null
}) {
  const [session, setSession] = useState<Session | null>(initialSession)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClientSideSupabaseClient()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      
      if (event === 'SIGNED_OUT') {
        // Only redirect if we're not already on an auth page
        if (!pathname.startsWith('/auth')) {
          router.push('/auth/signin')
        }
      } else if (event === 'SIGNED_IN') {
        // Only redirect if we're on an auth page
        if (pathname.startsWith('/auth')) {
          router.push('/dashboard')
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, pathname])

  return (
    <SessionContext.Provider value={{ session, isLoading }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}

