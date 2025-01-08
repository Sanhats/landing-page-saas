"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

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
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3A6D8C]/10 via-background to-background" />
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#EAD8B1] sm:text-4xl">{content.title}</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{content.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.plans.map((plan, index) => (
            <Card key={index} className="bg-[#001F3F]/50 border-[#3A6D8C] p-8">
              <h3 className="text-2xl font-bold text-[#EAD8B1] mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold text-[#EAD8B1] mb-6">{plan.price}</p>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="h-5 w-5 text-[#EAD8B1] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90">Choose Plan</Button>
            </Card>
          ))}
        </div>
      </div>
      
      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-4 top-4"
          onClick={onEdit}
        >
          Edit Pricing
        </Button>
      )}
    </section>
  )
}

