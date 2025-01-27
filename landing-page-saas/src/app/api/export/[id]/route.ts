import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
//import { getLandingPage } from "@/lib/api/landing-pages"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Verify authentication
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    // Get the page data
    const { data: page, error: pageError } = await supabase
      .from("landing_pages")
      .select("*")
      .eq("id", params.id)
      .single()

    if (pageError || !page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    // Verify ownership
    if (page.user_id !== user.id) {
      return NextResponse.json({ error: "You do not have permission to export this page" }, { status: 403 })
    }

    // Generate static HTML
    const htmlContent = generateHtmlContent(page.content)

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${page.title}</title>
        <style>
          /* Include necessary styles here */
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          /* Add more styles as needed */
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
    return NextResponse.json(
      { error: "Failed to export HTML", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

function generateHtmlContent(components: any[]): string {
  return components
    .map((component) => {
      switch (component.type) {
        case "hero":
          return `
          <section>
            <h1>${component.content.title}</h1>
            <p>${component.content.description}</p>
            <button>${component.content.buttonText}</button>
          </section>
        `
        case "features":
          return `
          <section>
            <h2>${component.content.title}</h2>
            <p>${component.content.description}</p>
            <ul>
              ${component.content.features
                .map(
                  (feature: any) => `
                <li>
                  <h3>${feature.title}</h3>
                  <p>${feature.description}</p>
                </li>
              `,
                )
                .join("")}
            </ul>
          </section>
        `
        // Add cases for other component types...
        default:
          return ""
      }
    })
    .join("")
}

