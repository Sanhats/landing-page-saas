"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"

interface ContentTemplateProps {
  content: {
    title: string
    description: string
    imageUrl: string
  }
  onEdit?: () => void
}

export function ContentTemplate({ content, onEdit }: ContentTemplateProps) {
  const { theme } = useTheme()

  return (
    <section className="relative py-24 sm:py-32" style={{ backgroundColor: theme.colors.background }}>
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3A6D8C]/10 via-background to-background" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                className="text-3xl font-bold tracking-tight sm:text-4xl"
                style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
              >
                {content.title}
              </h2>
              <p className="mt-6 text-lg leading-8" style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}>
                {content.description}
              </p>
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg" style={{ boxShadow: theme.boxShadow }}>
              <img
                src={content.imageUrl || "/placeholder.svg"}
                alt="Content image"
                className="object-cover w-full h-full"
                style={{ borderRadius: theme.borderRadius }}
              />
            </div>
          </div>
        </div>
      </div>

      {onEdit && (
        <Button variant="outline" size="sm" className="absolute right-4 top-4" onClick={onEdit}>
          Edit Content
        </Button>
      )}
    </section>
  )
}

