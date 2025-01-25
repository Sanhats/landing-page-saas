export type ComponentType = "hero" | "features" | "content" | "testimonials" | "pricing" | "faq" | "contact"

export interface EditorComponent {
  id: string
  type: ComponentType
  content: Record<string, any>
}

export interface Theme {
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    accent: string
  }
  fonts: {
    body: string
    heading: string
  }
}

export interface LandingPage {
  id: string
  title: string
  description: string
  content: EditorComponent[]
  status: "draft" | "published"
  slug?: string
  createdAt: string
  updatedAt: string
}

