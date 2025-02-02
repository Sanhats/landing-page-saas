import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

interface LandingPage {
  id: string
  title: string
  description: string
  content: any[]
  status: "draft" | "published"
  theme?: any
  slug?: string
  createdAt: string
  updatedAt: string
}

export async function getServerLandingPage(id: string, includePrivate = false): Promise<LandingPage | null> {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  try {
    let query = supabase.from("landing_pages").select("*").eq("id", id).single()

    if (!includePrivate) {
      query = query.eq("status", "published")
    }

    const { data: page, error } = await query

    if (error) {
      console.error("Error fetching landing page:", error.message, error.details)
      throw error
    }

    if (!page) {
      return null
    }

    return page as LandingPage
  } catch (error) {
    console.error("Error in getServerLandingPage:", error instanceof Error ? error.message : String(error))
    throw error
  }
}

export async function getServerSession() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting server session:", error)
    throw error
  }
}

