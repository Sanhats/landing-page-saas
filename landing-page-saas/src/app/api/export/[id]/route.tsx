// src/app/api/export/[id]/route.tsx
import { type NextRequest, NextResponse } from "next/server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { getLandingPage } from "@/lib/api/landing-pages"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server" // Cambiar a renderToStaticMarkup
import { LivePreview } from "@/components/editor/live-preview"
import { ThemeProvider } from "@/lib/theme-context"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const page = await getLandingPage(params.id)

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    // Generar HTML con contexto de tema
    const htmlContent = renderToStaticMarkup( // Cambiar a renderToStaticMarkup
      <React.StrictMode>
        <ThemeProvider defaultTheme="light">
          <LivePreview components={page.content} />
        </ThemeProvider>
      </React.StrictMode>
    )

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${page.title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `

    return new NextResponse(fullHtml, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="${page.title.replace(/\s+/g, "-").toLowerCase()}.html"`,
      },
    })
  } catch (error) {
    console.error("Error exporting HTML:", error)
    return NextResponse.json({ error: "Failed to export HTML" }, { status: 500 })
  }
}