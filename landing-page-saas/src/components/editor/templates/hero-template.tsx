"use client"

import { Button } from "@/components/ui/button"

interface HeroTemplateProps {
  content: {
    title: string
    description: string
    buttonText: string
  }
  onEdit?: () => void
}

export function HeroTemplate({ content, onEdit }: HeroTemplateProps) {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#3A6D8C]/20 via-background to-background" />
        </div>
      </div>
      
      <div className="relative mx-auto max-w-3xl text-center">
        <h1 className="bg-gradient-to-r from-[#6A9AB0] via-[#3A6D8C] to-[#EAD8B1] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          {content.title}
        </h1>
        
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {content.description}
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button 
            size="lg" 
            className="group relative overflow-hidden rounded-full bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90"
          >
            {content.buttonText}
          </Button>
        </div>
      </div>
      
      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-4 top-4"
          onClick={onEdit}
        >
          Edit Hero
        </Button>
      )}
    </section>
  )
}

