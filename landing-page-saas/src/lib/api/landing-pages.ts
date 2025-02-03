import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

interface EditorComponent {
  id: string
  type: string
  content: any
}

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
    if (!pageData.title) {
      throw new Error("Title is required")
    }

    const { data, error } = await supabase
      .from("landing_pages")
      .upsert({
        id: pageData.id,
        title: pageData.title,
        description: pageData.description,
        content: pageData.content || [], // Asegurarse de que content sea un array
        status: pageData.status,
        theme: pageData.theme,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Supabase error: ${error.message}`)
    }

    if (!data) {
      throw new Error("No data returned from Supabase")
    }

    return data as LandingPage
  } catch (error) {
    console.error("Error in saveLandingPage:", error)
    throw error
  }
}

export async function createLandingPage(pageData: { title: string; description?: string }): Promise<LandingPage> {
  const supabase = createClientComponentClient()
  try {
    if (!pageData.title) {
      throw new Error("Title is required")
    }

    const defaultComponents: EditorComponent[] = [
      {
        id: generateUUID(),
        type: "hero",
        content: {
          title: "Welcome to Your New Landing Page",
          description: "This is a default hero section. Customize it to fit your needs.",
          buttonText: "Get Started",
        },
      },
      {
        id: generateUUID(),
        type: "features",
        content: {
          title: "Our Features",
          description: "Here are some key features of our product or service.",
          features: [
            {
              title: "Feature 1",
              description: "Description of feature 1",
              icon: "Zap",
            },
            {
              title: "Feature 2",
              description: "Description of feature 2",
              icon: "Heart",
            },
          ],
        },
      },
    ]

    const { data, error } = await supabase
      .from("landing_pages")
      .insert({
        title: pageData.title,
        description: pageData.description,
        content: defaultComponents,
        status: "draft",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Supabase error: ${error.message}`)
    }

    if (!data) {
      throw new Error("No data returned from Supabase")
    }

    return data as LandingPage
  } catch (error) {
    console.error("Error in createLandingPage:", error)
    throw error
  }
}

export async function getLandingPage(idOrSlug: string, includePrivate = false): Promise<LandingPage | null> {
  const supabase = createClientComponentClient()

  try {
    let query = supabase.from("landing_pages").select("*")

    if (idOrSlug.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
      // If it's a UUID, search by id
      query = query.eq("id", idOrSlug)
    } else {
      // Otherwise, search by slug
      query = query.eq("slug", idOrSlug)
    }

    if (!includePrivate) {
      query = query.eq("status", "published")
    }

    const { data: page, error } = await query.single()

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

