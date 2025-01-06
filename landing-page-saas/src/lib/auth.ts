import { supabase } from './supabase'

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Forzar la actualización de la sesión
    if (data.session) {
      await supabase.auth.setSession(data.session)
    }

    return data
  } catch (error) {
    console.error('Sign in error:', error)
    throw error
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    window.location.href = '/auth/signin'
  } catch (error) {
    console.error('Sign out error:', error)
    throw error
  }
}

export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('Get session error:', error)
    return null
  }
}

