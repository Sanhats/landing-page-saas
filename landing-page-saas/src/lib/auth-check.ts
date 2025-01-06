import { supabase } from './supabase'

export async function checkAuthentication() {
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error checking authentication:', error)
    return false
  }
  
  return !!session
}

export async function verifyDatabaseSetup() {
  try {
    // Verify if we can access the landing_pages table
    const { data, error } = await supabase
      .from('landing_pages')
      .select('id')
      .limit(1)
    
    if (error) {
      console.error('Error verifying database setup:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error checking database:', error)
    return false
  }
}

