// components/editor/templates/hero-template.tsx
"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"

// Añadir tema por defecto para SSR
const defaultTheme = {
  colors: {
    primary: "#3A6D8C",
    text: "#333333",
    background: "#FFFFFF"
  },
  button: {
    backgroundColor: "#3A6D8C",
    textColor: "#FFFFFF"
  },
  fonts: {
    heading: "Arial, sans-serif",
    body: "Arial, sans-serif"
  },
  borderRadius: "9999px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
}

interface HeroTemplateProps {
  content: {
    title: string
    description: string
    buttonText: string
  }
  onEdit?: () => void
}

export function HeroTemplate({ content, onEdit }: HeroTemplateProps) {
  const { theme } = useTheme()
  const safeTheme = theme || defaultTheme // Usar tema por defecto si no hay contexto

  return (
    <section
    className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-6 py-24 sm:py-32 lg:px-8"
    style={{ backgroundColor: safeTheme.colors.background }}
  >
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#3A6D8C]/20 via-background to-background" />
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
      <h1
        className="text-4xl font-bold tracking-tight sm:text-6xl"
        style={{ color: safeTheme.colors.primary, fontFamily: safeTheme.fonts.heading }}
      >
        {content.title}
      </h1>

        <p className="mt-6 text-lg leading-8" style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}>
          {content.description}
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full"
            style={{
              backgroundColor: theme.button.backgroundColor,
              color: theme.button.textColor,
              fontFamily: theme.fonts.body,
              borderRadius: theme.borderRadius,
              boxShadow: theme.boxShadow,
            }}
          >
            {content.buttonText}
          </Button>
        </div>
      </div>

      {onEdit && (
        <Button variant="outline" size="sm" className="absolute right-4 top-4" onClick={onEdit}>
          Edit Hero
        </Button>
      )}
    </section>
  )
}

