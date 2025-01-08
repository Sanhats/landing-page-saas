import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
})

export const createClientSideSupabaseClient = () => {
  return createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  })
}

export async function getCurrentUser() {
  const supabase = createClientSideSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function hasValidSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  console.log('Checking session:', session ? 'Valid session found' : 'No valid session')
  if (error) console.error('Session check error:', error)
  return !!session
}

