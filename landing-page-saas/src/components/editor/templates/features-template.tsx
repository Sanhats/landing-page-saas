"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Laptop, Book, Users, Trophy } from 'lucide-react'

interface Feature {
  title: string
  description: string
  icon: keyof typeof icons
}

const icons = {
  Laptop,
  Book,
  Users,
  Trophy
}

interface FeaturesTemplateProps {
  content: {
    title: string
    description: string
    features: Feature[]
  }
  onEdit?: () => void
}

export function FeaturesTemplate({ content, onEdit }: FeaturesTemplateProps) {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3A6D8C]/10 via-background to-background" />
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#EAD8B1] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {content.description}
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {content.features.map((feature, index) => {
              const Icon = icons[feature.icon]
              return (
                <Card 
                  key={index}
                  className="group relative overflow-hidden border-[#3A6D8C] bg-[#001F3F]/50 transition-all duration-300 hover:scale-105 hover:bg-[#001F3F]/80"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3A6D8C]/10 to-[#6A9AB0]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative p-6">
                    <Icon className="h-12 w-12 text-[#EAD8B1] mb-4" />
                    <h3 className="text-xl font-semibold text-[#EAD8B1]">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
      
      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-4 top-4"
          onClick={onEdit}
        >
          Edit Features
        </Button>
      )}
    </section>
  )
}

