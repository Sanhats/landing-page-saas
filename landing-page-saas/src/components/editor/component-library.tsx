"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import type { ComponentType, EditorComponent } from "@/types/editor"
import { LayoutTemplate, Type, Image, MessageSquare, CreditCard, HelpCircle, Mail } from "lucide-react"

const componentTypes: { type: ComponentType; icon: React.ElementType; label: string }[] = [
  { type: "hero", icon: LayoutTemplate, label: "Hero" },
  { type: "features", icon: Type, label: "Features" },
  { type: "content", icon: Image, label: "Content" },
  { type: "testimonials", icon: MessageSquare, label: "Testimonials" },
  { type: "pricing", icon: CreditCard, label: "Pricing" },
  { type: "faq", icon: HelpCircle, label: "FAQ" },
  { type: "contact", icon: Mail, label: "Contact" },
]

interface ComponentLibraryProps {
  onAddComponent: (component: EditorComponent) => void
}

export function ComponentLibrary({ onAddComponent }: ComponentLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredComponents = componentTypes.filter((component) =>
    component.label.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddComponent = (type: ComponentType) => {
    const newComponent: EditorComponent = {
      id: crypto.randomUUID(),
      type,
      content: getDefaultContent(type),
    }
    onAddComponent(newComponent)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="grid gap-2 p-4">
          {filteredComponents.map((component) => (
            <Button
              key={component.type}
              variant="outline"
              className="justify-start"
              onClick={() => handleAddComponent(component.type)}
            >
              <component.icon className="mr-2 h-4 w-4" />
              {component.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

function getDefaultContent(type: ComponentType): any {
  switch (type) {
    case "hero":
      return {
        title: "Welcome to our platform",
        description: "The best solution for your needs",
        buttonText: "Get Started",
      }
    case "features":
      return {
        title: "Our Features",
        description: "Everything you need to succeed",
        features: [
          {
            title: "Feature 1",
            description: "Description of feature 1",
            icon: "Zap",
          },
          {
            title: "Feature 2",
            description: "Description of feature 2",
            icon: "Heart",
          },
        ],
      }
    // Add default content for other component types...
    default:
      return {}
  }
}

