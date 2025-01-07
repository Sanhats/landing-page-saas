import { supabase, getCurrentUser } from '@/lib/supabase'

export async function createLandingPage(data: {
  title: string
  description?: string
}) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      throw new Error('Authentication required')
    }

    console.log('Creating page with user:', user.id)

    const { data: page, error } = await supabase
      .from('landing_pages')
      .insert([
        {
          title: data.title,
          description: data.description || '',
          user_id: user.id,
          status: 'draft',
          content: [],
          views: 0
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', {
        error,
        user: user.id,
        data: {
          title: data.title,
          description: data.description,
          user_id: user.id
        }
      })
      throw error
    }

    if (!page) {
      throw new Error('Failed to create page')
    }

    return page
  } catch (error) {
    console.error('Error creating landing page:', error)
    throw error
  }
}

export async function getUserLandingPages() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      throw new Error('Authentication required')
    }

    const { data, error } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching pages:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error fetching landing pages:', error)
    throw error
  }
}

export async function deleteLandingPage(id: string) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      throw new Error('Authentication required')
    }

    const { error } = await supabase
      .from('landing_pages')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting landing page:', error)
    throw error
  }
}

export async function getLandingPagesStats() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      throw new Error('Authentication required')
    }

    const { data: pages, error } = await supabase
      .from('landing_pages')
      .select('id, created_at, views, status')
      .eq('user_id', user.id)

    if (error) throw error

    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

    const totalPages = pages.length
    const activePages = pages.filter(page => page.status === 'published').length
    const totalViews = pages.reduce((sum, page) => sum + page.views, 0)
    const newPagesLastMonth = pages.filter(page => new Date(page.created_at) > lastMonth).length

    return {
      totalPages: {
        current: totalPages,
        change: newPagesLastMonth
      },
      activePages: {
        current: activePages,
        change: 0 // You might want to calculate this based on historical data
      },
      totalViews: {
        current: totalViews,
        changePercentage: 0 // You might want to calculate this based on historical data
      }
    }
  } catch (error) {
    console.error('Error fetching landing pages stats:', error)
    throw error
  }
}

