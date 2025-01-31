import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { LivePreview } from "@/components/editor/live-preview"
import { ThemeProvider } from "@/lib/theme-context"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function PreviewPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })

  // First try to get the page without authentication check
  const { data: publicPage } = await supabase.from("landing_pages").select("*").eq("id", params.id).single()

  // If the page is published, show it regardless of authentication
  if (publicPage && publicPage.status === "published") {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <LivePreview components={publicPage.content} />
        </div>
      </ThemeProvider>
    )
  }

  // If the page is not published, check authentication
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">This page is private or does not exist.</p>
        </div>
      </div>
    )
  }

  // Get the page with authentication
  const { data: privatePage, error: privateError } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", session.user.id)
    .single()

  if (!privatePage || privateError) {
    notFound()
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <LivePreview components={privatePage.content} />
      </div>
    </ThemeProvider>
  )
}

