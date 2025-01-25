"use client"

import type { EditorComponent } from "@/types/editor"
import { HeroTemplate } from "@/components/editor/templates/hero-template"
import { FeaturesTemplate } from "@/components/editor/templates/features-template"
import { ContentTemplate } from "@/components/editor/templates/content-template"
import { TestimonialsTemplate } from "@/components/editor/templates/testimonials-template"
import { PricingTemplate } from "@/components/editor/templates/pricing-template"
import { FAQTemplate } from "@/components/editor/templates/faq-template"
import { ContactTemplate } from "@/components/editor/templates/contact-template"
import { cn } from "@/lib/utils"

interface LivePreviewProps {
  components: EditorComponent[]
  previewMode: "desktop" | "tablet" | "mobile"
}

export function LivePreview({ components, previewMode }: LivePreviewProps) {
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
    <div
      className={cn(
        "mx-auto transition-all duration-200 ease-in-out",
        previewMode === "desktop" && "w-full",
        previewMode === "tablet" && "max-w-[768px]",
        previewMode === "mobile" && "max-w-[375px]",
      )}
    >
      {components.map(renderComponent)}
    </div>
  )
}

