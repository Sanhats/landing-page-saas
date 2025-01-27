"use client"

import { HeroTemplate } from "@/components/editor/templates/hero-template"
import { FeaturesTemplate } from "@/components/editor/templates/features-template"
import { ContentTemplate } from "@/components/editor/templates/content-template"
import { TestimonialsTemplate } from "@/components/editor/templates/testimonials-template"
import { PricingTemplate } from "@/components/editor/templates/pricing-template"
import { FAQTemplate } from "@/components/editor/templates/faq-template"
import { ContactTemplate } from "@/components/editor/templates/contact-template"
import type { EditorComponent } from "@/types/editor"

//const HeroTemplate = dynamic(
//  () => import("@/components/editor/templates/hero-template").then((mod) => mod.HeroTemplate),
//  { ssr: true },
//)
//const FeaturesTemplate = dynamic(
//  () => import("@/components/editor/templates/features-template").then((mod) => mod.FeaturesTemplate),
//  { ssr: true },
//)
//const ContentTemplate = dynamic(
//  () => import("@/components/editor/templates/content-template").then((mod) => mod.ContentTemplate),
//  { ssr: true },
//)
//const TestimonialsTemplate = dynamic(
//  () => import("@/components/editor/templates/testimonials-template").then((mod) => mod.TestimonialsTemplate),
//  { ssr: true },
//)
//const PricingTemplate = dynamic(
//  () => import("@/components/editor/templates/pricing-template").then((mod) => mod.PricingTemplate),
//  { ssr: true },
//)
//const FAQTemplate = dynamic(() => import("@/components/editor/templates/faq-template").then((mod) => mod.FAQTemplate), {
//  ssr: true,
//})
//const ContactTemplate = dynamic(
//  () => import("@/components/editor/templates/contact-template").then((mod) => mod.ContactTemplate),
//  { ssr: true },
//)

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

