export interface LandingPage {
  id: string
  title: string
  description: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
  userId: string
}

export interface LandingPageContent {
  id: string
  landingPageId: string
  content: any // Esto será un JSON que contendrá la estructura de la página
  version: number
  createdAt: string
}

