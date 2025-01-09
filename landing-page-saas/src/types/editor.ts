export type ComponentType = 
  | 'hero'
  | 'features'
  | 'content'
  | 'testimonials'
  | 'pricing'
  | 'faq'
  | 'contact'

export interface EditorComponent {
  id: string
  type: ComponentType
  content: Record<string, any>
}

export interface Feature {
  title: string
  description: string
  icon: 'Laptop' | 'Book' | 'Users' | 'Trophy'
}

export interface Testimonial {
  content: string
  author: string
  role: string
}

export interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
}

export interface FAQItem {
  question: string
  answer: string
}

