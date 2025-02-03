"use client"

import { ThemeProvider, useTheme } from "@/lib/theme-context"
import { HeroTemplate } from "@/components/editor/templates/hero-template"
import { FeaturesTemplate } from "@/components/editor/templates/features-template"
import { ContentTemplate } from "@/components/editor/templates/content-template"
import { TestimonialsTemplate } from "@/components/editor/templates/testimonials-template"
import { PricingTemplate } from "@/components/editor/templates/pricing-template"
import { FAQTemplate } from "@/components/editor/templates/faq-template"
import { ContactTemplate } from "@/components/editor/templates/contact-template"
import type { EditorComponent } from "@/types/editor"

interface LivePreviewProps {
  components: EditorComponent[]
}

export function LivePreview({ components }: LivePreviewProps) {
  const { theme } = useTheme()

  const renderComponent = (component: EditorComponent) => {
    switch (component.type) {
      case "hero":
        return <HeroTemplate key={component.id} content={component.content} />
      case "features":
        return <FeaturesTemplate key={component.id} content={component.content} />
      case "content":
        return <ContentTemplate key={component.id} content={component.content} />
      case "testimonials":
        return <TestimonialsTemplate key={component.id} content={component.content} />
      case "pricing":
        return <PricingTemplate key={component.id} content={component.content} />
      case "faq":
        return <FAQTemplate key={component.id} content={component.content} />
      case "contact":
        return <ContactTemplate key={component.id} content={component.content} />
      default:
        return null
    }
  }

  return (
    <ThemeProvider initialTheme={theme}>
      <div className="w-full">{components.map(renderComponent)}</div>
    </ThemeProvider>
  )
}

