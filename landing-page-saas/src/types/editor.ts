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

export interface DraggedComponent {
  id: string
  type: ComponentType
}

