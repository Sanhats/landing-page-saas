import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const createClientSideSupabaseClient = () => {
  return createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })
}

export async function getCurrentUser() {
  const supabase = createClientSideSupabaseClient()
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function hasValidSession() {
  const supabase = createClientSideSupabaseClient()
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return !!session
  } catch (error) {
    console.error('Error checking session:', error)
    return false
  }
}

