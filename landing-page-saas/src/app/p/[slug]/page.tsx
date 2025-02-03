import { notFound } from "next/navigation"
import { getLandingPage } from "@/lib/api/landing-pages"
import { LivePreview } from "@/components/editor/live-preview"
import { ThemeProvider } from "@/lib/theme-context"

export const dynamic = "force-dynamic"

export default async function PublishedPage({ params }: { params: { slug: string } }) {
  try {
    const page = await getLandingPage(params.slug)

    if (!page) {
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
    console.error("Error in PublishedPage:", error instanceof Error ? error.message : String(error))
    notFound()
  }
}

