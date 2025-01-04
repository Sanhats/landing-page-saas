import { supabase } from '@/lib/supabase'

export async function getLandingPagesStats() {
  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())

  // Get current stats
  const { data: currentStats, error: currentError } = await supabase
    .from('landing_pages')
    .select(`
      id,
      status,
      views,
      created_at
    `)
    .gte('created_at', lastMonth.toISOString())

  if (currentError) throw currentError

  // Calculate metrics
  const totalPages = currentStats?.length || 0
  const totalViews = currentStats?.reduce((sum, page) => sum + (page.views || 0), 0) || 0
  const activePages = currentStats?.filter(page => page.status === 'published').length || 0

  // Get last month's stats for comparison
  const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate())
  const { data: lastMonthStats, error: lastMonthError } = await supabase
    .from('landing_pages')
    .select()
    .gte('created_at', twoMonthsAgo.toISOString())
    .lt('created_at', lastMonth.toISOString())

  if (lastMonthError) throw lastMonthError

  // Calculate changes from last month
  const lastMonthPages = lastMonthStats?.length || 0
  const lastMonthActive = lastMonthStats?.filter(page => page.status === 'published').length || 0
  const lastMonthViews = lastMonthStats?.reduce((sum, page) => sum + (page.views || 0), 0) || 0

  return {
    totalPages: {
      current: totalPages,
      change: totalPages - lastMonthPages
    },
    totalViews: {
      current: totalViews,
      changePercentage: lastMonthViews ? ((totalViews - lastMonthViews) / lastMonthViews) * 100 : 0
    },
    activePages: {
      current: activePages,
      change: activePages - lastMonthActive
    }
  }
}

export async function getUserLandingPages() {
  const { data, error } = await supabase
    .from('landing_pages')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createLandingPage(data: {
  title: string
  description?: string
}) {
  const { data: page, error } = await supabase
    .from('landing_pages')
    .insert([
      {
        title: data.title,
        description: data.description,
        status: 'draft'
      }
    ])
    .select()
    .single()

  if (error) throw error
  return page
}

export async function deleteLandingPage(id: string) {
  const { error } = await supabase
    .from('landing_pages')
    .delete()
    .eq('id', id)

  if (error) throw error
}

