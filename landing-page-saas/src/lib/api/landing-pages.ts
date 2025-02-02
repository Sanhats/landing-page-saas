import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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

export async function saveLandingPage(pageData: Partial<LandingPage>): Promise<LandingPage> {
  const supabase = createClientComponentClient()
  try {
    if (!pageData.id) {
      throw new Error("Page ID is required for updates")
    }

    const { data, error } = await supabase
      .from("landing_pages")
      .update(pageData)
      .eq("id", pageData.id)
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Supabase error: ${error.message}`)
    }

    if (!data) {
      throw new Error("No data returned from Supabase")
    }

    return data
  } catch (error) {
    console.error("Error in saveLandingPage:", error)
    throw error
  }
}

export async function getLandingPage(id: string, includePrivate = false): Promise<LandingPage | null> {
  const supabase = createClientComponentClient()

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
    console.error("Error in getLandingPage:", error instanceof Error ? error.message : String(error))
    throw error
  }
}

export async function listLandingPages(): Promise<LandingPage[]> {
  const supabase = createClientComponentClient()

  try {
    const { data, error } = await supabase.from("landing_pages").select("*").order("updated_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Supabase error: ${error.message}`)
    }

    if (!data) {
      return []
    }

    return data as LandingPage[]
  } catch (error) {
    console.error("Error listing landing pages:", error)
    throw error
  }
}

export async function publishLandingPage(id: string): Promise<LandingPage> {
  const supabase = createClientComponentClient()

  try {
    const { data, error } = await supabase
      .from("landing_pages")
      .update({ status: "published" })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data as LandingPage
  } catch (error) {
    console.error("Error publishing landing page:", error)
    throw error
  }
}

export async function unpublishLandingPage(id: string): Promise<LandingPage> {
  const supabase = createClientComponentClient()

  try {
    const { data, error } = await supabase
      .from("landing_pages")
      .update({ status: "draft" })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data as LandingPage
  } catch (error) {
    console.error("Error unpublishing landing page:", error)
    throw error
  }
}

export async function saveAsTemplate(pageId: string, templateName: string): Promise<void> {
  const supabase = createClientComponentClient()

  try {
    const { data: page, error: pageError } = await supabase.from("landing_pages").select("*").eq("id", pageId).single()

    if (pageError) {
      throw pageError
    }

    const { error: templateError } = await supabase.from("templates").insert({
      name: templateName,
      content: page.content,
      theme: page.theme,
    })

    if (templateError) {
      throw templateError
    }
  } catch (error) {
    console.error("Error saving as template:", error)
    throw error
  }
}

export async function getTemplates() {
  const supabase = createClientComponentClient()

  try {
    const { data, error } = await supabase.from("templates").select("*").order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error fetching templates:", error)
    throw error
  }
}

export async function deleteLandingPage(id: string): Promise<void> {
  const supabase = createClientComponentClient()

  try {
    const { error } = await supabase.from("landing_pages").delete().eq("id", id)

    if (error) {
      throw error
    }
  } catch (error) {
    console.error("Error deleting landing page:", error)
    throw error
  }
}

