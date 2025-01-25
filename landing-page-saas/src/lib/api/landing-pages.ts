import { createClientSideSupabaseClient } from "@/lib/supabase-client"
import type { LandingPage, EditorComponent } from "@/types/editor"

const defaultComponents: EditorComponent[] = [
  {
    id: "hero-1",
    type: "hero",
    content: {
      title: "Welcome to our platform",
      description: "The best solution for your needs",
      buttonText: "Get Started",
    },
  },
  {
    id: "features-1",
    type: "features",
    content: {
      title: "Our Features",
      description: "Everything you need to succeed",
      features: [
        {
          title: "Easy to Use",
          description: "Simple and intuitive interface",
          icon: "Laptop",
        },
        {
          title: "Documentation",
          description: "Comprehensive guides",
          icon: "Book",
        },
        {
          title: "Team Work",
          description: "Collaborate effectively",
          icon: "Users",
        },
        {
          title: "Results",
          description: "Achieve your goals",
          icon: "Trophy",
        },
      ],
    },
  },
  {
    id: "content-1",
    type: "content",
    content: {
      title: "About Us",
      description: "Learn more about our mission and values",
      imageUrl: "/placeholder.svg",
    },
  },
  {
    id: "testimonials-1",
    type: "testimonials",
    content: {
      title: "What Our Customers Say",
      testimonials: [
        {
          content: "Amazing platform! It has transformed our workflow.",
          author: "John Doe",
          role: "CEO at TechCorp",
        },
        {
          content: "The best solution we have found in the market.",
          author: "Jane Smith",
          role: "CTO at StartupX",
        },
        {
          content: "Incredible support and features.",
          author: "Mike Johnson",
          role: "Product Manager",
        },
      ],
    },
  },
  {
    id: "pricing-1",
    type: "pricing",
    content: {
      title: "Pricing Plans",
      description: "Choose the perfect plan for your needs",
      plans: [
        {
          name: "Starter",
          price: "$9/month",
          description: "Perfect for getting started",
          features: ["Basic features", "5 projects", "Basic support"],
        },
        {
          name: "Pro",
          price: "$29/month",
          description: "For growing businesses",
          features: ["Advanced features", "Unlimited projects", "Priority support"],
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For large organizations",
          features: ["Custom features", "Dedicated support", "Custom integration"],
        },
      ],
    },
  },
  {
    id: "faq-1",
    type: "faq",
    content: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "How do I get started?",
          answer: "Simply sign up for an account and follow our quick start guide.",
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards and PayPal.",
        },
        {
          question: "Can I cancel my subscription?",
          answer: "Yes, you can cancel your subscription at any time.",
        },
      ],
    },
  },
  {
    id: "contact-1",
    type: "contact",
    content: {
      title: "Contact Us",
      description: "Get in touch with our team",
    },
  },
]

export async function createLandingPage(data: {
  title: string
  description?: string
}) {
  try {
    const supabase = createClientSideSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("Authentication required")
    }

    console.log("Creating page with user:", user.id)

    const { data: page, error } = await supabase
      .from("landing_pages")
      .insert([
        {
          title: data.title,
          description: data.description || "",
          user_id: user.id,
          status: "draft",
          content: defaultComponents,
          views: 0,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    if (!page) {
      throw new Error("Failed to create page")
    }

    return page
  } catch (error) {
    console.error("Error creating landing page:", error)
    throw error
  }
}

export async function getUserLandingPages() {
  try {
    const supabase = createClientSideSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("Authentication required")
    }

    const { data, error } = await supabase
      .from("landing_pages")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching pages:", error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error fetching landing pages:", error)
    throw error
  }
}

export async function deleteLandingPage(id: string) {
  try {
    const supabase = createClientSideSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("Authentication required")
    }

    const { error } = await supabase.from("landing_pages").delete().eq("id", id).eq("user_id", user.id)

    if (error) throw error
  } catch (error) {
    console.error("Error deleting landing page:", error)
    throw error
  }
}

export async function getLandingPagesStats() {
  try {
    const supabase = createClientSideSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("Authentication required")
    }

    const { data: pages, error } = await supabase
      .from("landing_pages")
      .select("id, created_at, views, status")
      .eq("user_id", user.id)

    if (error) throw error

    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

    const totalPages = pages.length
    const activePages = pages.filter((page) => page.status === "published").length
    const totalViews = pages.reduce((sum, page) => sum + page.views, 0)
    const newPagesLastMonth = pages.filter((page) => new Date(page.created_at) > lastMonth).length

    return {
      totalPages: {
        current: totalPages,
        change: newPagesLastMonth,
      },
      activePages: {
        current: activePages,
        change: 0, // You might want to calculate this based on historical data
      },
      totalViews: {
        current: totalViews,
        changePercentage: 0, // You might want to calculate this based on historical data
      },
    }
  } catch (error) {
    console.error("Error fetching landing pages stats:", error)
    throw error
  }
}

export async function getLandingPage(id: string) {
  try {
    console.log("Fetching landing page with ID:", id)
    const supabase = createClientSideSupabaseClient()

    // First try to get the page without authentication check
    const { data: publicPage, error: publicError } = await supabase
      .from("landing_pages")
      .select("*")
      .eq("id", id)
      .eq("status", "published")
      .single()

    // If the page is published, return it
    if (publicPage) {
      return publicPage
    }

    // If not published, check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("Authentication required")
    }

    // Get the private page
    const { data: privatePage, error: privateError } = await supabase
      .from("landing_pages")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single()

    if (privateError) {
      console.error("Error fetching landing page:", privateError)
      throw privateError
    }

    if (!privatePage) {
      throw new Error("Page not found")
    }

    return privatePage
  } catch (error) {
    console.error("Error in getLandingPage:", error)
    throw error
  }
}

export async function updateLandingPage(
  id: string,
  updates: {
    content?: EditorComponent[]
    title?: string
    description?: string
  },
): Promise<LandingPage> {
  const supabase = createClientSideSupabaseClient()
  const { data, error } = await supabase.from("landing_pages").update(updates).eq("id", id).single()

  if (error) throw error
  return data
}

export async function publishLandingPage(id: string): Promise<LandingPage> {
  const supabase = createClientSideSupabaseClient()
  const { data, error } = await supabase.from("landing_pages").update({ status: "published" }).eq("id", id).single()

  if (error) throw error
  return data
}

export async function unpublishLandingPage(id: string): Promise<LandingPage> {
  const supabase = createClientSideSupabaseClient()
  const { data, error } = await supabase.from("landing_pages").update({ status: "draft" }).eq("id", id).single()

  if (error) throw error
  return data
}

