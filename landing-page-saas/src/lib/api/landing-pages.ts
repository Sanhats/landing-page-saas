import { supabase } from '@/lib/supabase'
import { getSession } from 'next-auth/react'

export async function createLandingPage(data: {
  title: string
  description?: string
}) {
  const session = await getSession()
  
  if (!session?.user?.id) {
    throw new Error('No authenticated user')
  }

  const { data: page, error } = await supabase
    .from('landing_pages')
    .insert([
      {
        title: data.title,
        description: data.description,
        user_id: session.user.id,
        status: 'draft',
        content: []
      }
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating page:', error)
    throw error
  }

  return page
}

export async function getUserLandingPages() {
  const session = await getSession()
  
  if (!session?.user?.id) {
    throw new Error('No authenticated user')
  }

  const { data, error } = await supabase
    .from('landing_pages')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching pages:', error)
    throw error
  }

  return data
}

export async function deleteLandingPage(id: string) {
  const session = await getSession()
  
  if (!session?.user?.id) {
    throw new Error('No authenticated user')
  }

  const { error } = await supabase
    .from('landing_pages')
    .delete()
    .eq('id', id)
    .eq('user_id', session.user.id)

  if (error) {
    console.error('Error deleting page:', error)
    throw error
  }
}

