import { LivePreview } from "@/components/editor/live-preview"
import { ThemeProvider } from "@/lib/theme-context"
import { notFound } from "next/navigation"
import { getServerLandingPage, getServerSession } from "@/lib/api/server-landing-pages"

export const dynamic = "force-dynamic"

export default async function PreviewPage({ params }: { params: { id: string } }) {
  try {
    // First try to get the public page
    let page = await getServerLandingPage(params.id)

    if (!page) {
      // If no public page found, check authentication and try to get the private page
      const session = await getServerSession()

      if (session) {
        page = await getServerLandingPage(params.id, true)
      }
    }

    if (!page) {
      console.log("Page not found:", params.id)
      notFound()
    }

    return (
      <ThemeProvider initialTheme={page.theme}>
        <div className="min-h-screen bg-background">
          <LivePreview components={page.content} />
        </div>
      </ThemeProvider>
    )
  } catch (error) {
    console.error("Error in PreviewPage:", error instanceof Error ? error.message : String(error))
    notFound()
  }
}

