"use client"

import { ComponentType, EditorComponent } from "@/types/editor"
import { HeroTemplate } from "./templates/hero-template"
import { FeaturesTemplate } from "./templates/features-template"
import { ContentTemplate } from "./templates/content-template"
import { TestimonialsTemplate } from "./templates/testimonials-template"
import { PricingTemplate } from "./templates/pricing-template"
import { FAQTemplate } from "./templates/faq-template"
import { ContactTemplate } from "./templates/contact-template"

interface EditorCanvasProps {
  components: EditorComponent[]
  onEdit: (id: string) => void
}

export function EditorCanvas({ components, onEdit }: EditorCanvasProps) {
  console.log('EditorCanvas rendering with components:', components)
  const renderComponent = (component: EditorComponent) => {
    console.log('Rendering component:', component)
    switch (component.type) {
      case 'hero':
        return (
          <HeroTemplate
            key={component.id}
            content={component.content}
            onEdit={() => onEdit(component.id)}
          />
        )
      case 'features':
        return (
          <FeaturesTemplate
            key={component.id}
            content={component.content}
            onEdit={() => onEdit(component.id)}
          />
        )
      case 'content':
        return (
          <ContentTemplate
            key={component.id}
            content={component.content}
            onEdit={() => onEdit(component.id)}
          />
        )
      case 'testimonials':
        return (
          <TestimonialsTemplate
            key={component.id}
            content={component.content}
            onEdit={() => onEdit(component.id)}
          />
        )
      case 'pricing':
        return (
          <PricingTemplate
            key={component.id}
            content={component.content}
            onEdit={() => onEdit(component.id)}
          />
        )
      case 'faq':
        return (
          <FAQTemplate
            key={component.id}
            content={component.content}
            onEdit={() => onEdit(component.id)}
          />
        )
      case 'contact':
        return (
          <ContactTemplate
            key={component.id}
            content={component.content}
            onEdit={() => onEdit(component.id)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-[calc(100vh-2rem)] w-full rounded-lg border-2 border-dashed p-8 overflow-auto">
      {components.map((component) => {
        console.log('Mapping component:', component)
        return (
          <div key={component.id} className="mb-4">
            {renderComponent(component)}
          </div>
        )
      })}
    </div>
  )
}

