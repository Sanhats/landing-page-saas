export type ComponentType = "hero" | "features" | "content" | "testimonials" | "pricing" | "faq" | "contact"

export interface EditorComponent {
  id: string
  type: ComponentType
  content: Record<string, any>
  template?: string
  styles?: ComponentStyles
}

export interface ComponentStyles {
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  padding?: string
  borderRadius?: string
  maxWidth?: string
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
  spacing: {
    small: string
    medium: string
    large: string
  }
  borderRadius: string
  boxShadow: string
}

export interface LandingPage {
  id: string
  title: string
  description: string
  content: EditorComponent[]
  status: "draft" | "published"
  theme?: Theme
  slug?: string
  createdAt: string
  updatedAt: string
}

export type PreviewMode = "desktop" | "tablet" | "mobile"

export interface ComponentTemplate {
  id: string
  name: string
  type: ComponentType
  content: Record<string, any>
  styles: ComponentStyles
  preview?: string
}

export interface Template {
  id: string
  name: string
  content: EditorComponent[]
  created_at: string
}

