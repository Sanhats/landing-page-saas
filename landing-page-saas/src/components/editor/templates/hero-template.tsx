"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"

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

  return (
    <section
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-6 py-24 sm:py-32 lg:px-8"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#3A6D8C]/20 via-background to-background" />
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <h1
          className="text-4xl font-bold tracking-tight sm:text-6xl"
          style={{
            color: theme.colors.primary,
            fontFamily: theme.typography.fontFamily.sans,
          }}
        >
          {content.title}
        </h1>

        <p
          className="mt-6 text-lg leading-8"
          style={{
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.lg,
          }}
        >
          {content.description}
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.medium,
              borderRadius: theme.borderRadius,
              boxShadow: theme.boxShadow,
            }}
          >
            {content.buttonText}
          </Button>
        </div>
      </div>

      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-4 top-4"
          onClick={onEdit}
          style={{
            borderColor: theme.colors.primary,
            color: theme.colors.primary,
          }}
        >
          Edit Hero
        </Button>
      )}
    </section>
  )
}

