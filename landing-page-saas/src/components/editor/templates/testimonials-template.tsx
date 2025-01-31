"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/lib/theme-context"

interface Testimonial {
  content: string
  author: string
  role: string
}

interface TestimonialsTemplateProps {
  content: {
    title: string
    testimonials: Testimonial[]
  }
  onEdit?: () => void
}

export function TestimonialsTemplate({ content, onEdit }: TestimonialsTemplateProps) {
  const { theme } = useTheme()

  return (
    <section className="relative py-24 sm:py-32" style={{ backgroundColor: theme.colors.background }}>
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3A6D8C]/10 via-background to-background" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2
          className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12"
          style={{ color: theme.colors.primary, fontFamily: theme.typography.fontFamily.sans }}
        >
          {content.title}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6"
              style={{
                backgroundColor: theme.colors.secondary,
                borderColor: theme.colors.primary,
                borderRadius: theme.borderRadius,
                boxShadow: theme.boxShadow,
              }}
            >
              <p
                className="text-lg mb-4"
                style={{ color: theme.colors.text, fontFamily: theme.typography.fontFamily.sans }}
              >
                "{testimonial.content}"
              </p>
              <div>
                <p
                  className="font-semibold"
                  style={{ color: theme.colors.primary, fontFamily: theme.typography.fontFamily.sans }}
                >
                  {testimonial.author}
                </p>
                <p
                  className="text-sm"
                  style={{ color: theme.colors.text, fontFamily: theme.typography.fontFamily.sans }}
                >
                  {testimonial.role}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {onEdit && (
        <Button variant="outline" size="sm" className="absolute right-4 top-4" onClick={onEdit}>
          Edit Testimonials
        </Button>
      )}
    </section>
  )
}

