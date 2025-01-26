// components/editor/live-preview.tsx
"use client"

import dynamic from "next/dynamic"
import type { EditorComponent } from "@/types/editor"

// Asegúrate de que todos los dynamic imports tengan { ssr: false }
const HeroTemplate = dynamic(
  () => import("@/components/editor/templates/hero-template").then((mod) => mod.HeroTemplate),
  { ssr: false }
)
const FeaturesTemplate = dynamic(
  () => import("@/components/editor/templates/features-template").then((mod) => mod.FeaturesTemplate),
  { ssr: false }
)
const ContentTemplate = dynamic(
  () => import("@/components/editor/templates/content-template").then((mod) => mod.ContentTemplate),
  { ssr: false }
)
const TestimonialsTemplate = dynamic(
  () => import("@/components/editor/templates/testimonials-template").then((mod) => mod.TestimonialsTemplate),
  { ssr: false }
)
const PricingTemplate = dynamic(
  () => import("@/components/editor/templates/pricing-template").then((mod) => mod.PricingTemplate),
  { ssr: false }
)
const FAQTemplate = dynamic(
  () => import("@/components/editor/templates/faq-template").then((mod) => mod.FAQTemplate),
  { ssr: false }
)
const ContactTemplate = dynamic(
  () => import("@/components/editor/templates/contact-template").then((mod) => mod.ContactTemplate),
  { ssr: false }
)

interface LivePreviewProps {
  components: EditorComponent[]
}

export function LivePreview({ components }: LivePreviewProps) {
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

  return <div className="w-full">{components.map(renderComponent)}</div>
}