"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/lib/theme-context"

interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
}

interface PricingTemplateProps {
  content: {
    title: string
    description: string
    plans: PricingPlan[]
  }
  onEdit?: () => void
}

export function PricingTemplate({ content, onEdit }: PricingTemplateProps) {
  const { theme } = useTheme()

  return (
    <section className="relative py-24 sm:py-32" style={{ backgroundColor: theme.colors.background }}>
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3A6D8C]/10 via-background to-background" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: theme.colors.primary, fontFamily: theme.typography.fontFamily.sans }}
          >
            {content.title}
          </h2>
          <p
            className="mt-6 text-lg leading-8"
            style={{ color: theme.colors.text, fontFamily: theme.typography.fontFamily.sans }}
          >
            {content.description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.plans.map((plan, index) => (
            <Card
              key={index}
              className="p-8"
              style={{
                backgroundColor: theme.colors.secondary,
                borderColor: theme.colors.primary,
                borderRadius: theme.borderRadius,
                boxShadow: theme.boxShadow,
              }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: theme.colors.primary, fontFamily: theme.typography.fontFamily.sans }}
              >
                {plan.name}
              </h3>
              <p
                className="text-4xl font-bold mb-6"
                style={{ color: theme.colors.accent, fontFamily: theme.typography.fontFamily.sans }}
              >
                {plan.price}
              </p>
              <p className="mb-6" style={{ color: theme.colors.text, fontFamily: theme.typography.fontFamily.sans }}>
                {plan.description}
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: theme.colors.accent }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{ color: theme.colors.text, fontFamily: theme.typography.fontFamily.sans }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                  fontFamily: theme.typography.fontFamily.sans,
                  borderRadius: theme.borderRadius,
                }}
              >
                Choose Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {onEdit && (
        <Button variant="outline" size="sm" className="absolute right-4 top-4" onClick={onEdit}>
          Edit Pricing
        </Button>
      )}
    </section>
  )
}

