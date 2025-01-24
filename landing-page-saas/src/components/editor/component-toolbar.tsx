"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ComponentType } from "@/types/editor"
import { LayoutTemplate, Type, Image, MessageSquare, CreditCard, HelpCircle, Mail, Plus } from "lucide-react"

interface ComponentToolbarProps {
  onAddComponent: (type: ComponentType) => void
}

const components = [
  {
    type: "hero" as ComponentType,
    icon: LayoutTemplate,
    label: "Hero Section",
  },
  {
    type: "features" as ComponentType,
    icon: Type,
    label: "Features",
  },
  {
    type: "content" as ComponentType,
    icon: Image,
    label: "Content",
  },
  {
    type: "testimonials" as ComponentType,
    icon: MessageSquare,
    label: "Testimonials",
  },
  {
    type: "pricing" as ComponentType,
    icon: CreditCard,
    label: "Pricing",
  },
  {
    type: "faq" as ComponentType,
    icon: HelpCircle,
    label: "FAQ",
  },
  {
    type: "contact" as ComponentType,
    icon: Mail,
    label: "Contact",
  },
]

export function ComponentToolbar({ onAddComponent }: ComponentToolbarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-4 py-2">
        <Tabs defaultValue="components">
          <TabsList className="w-full">
            <TabsTrigger value="components" className="flex-1">
              Components
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex-1">
              Templates
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="grid gap-2">
          {components.map((component) => (
            <Button
              key={component.type}
              variant="outline"
              className="justify-start"
              onClick={() => onAddComponent(component.type)}
            >
              <component.icon className="mr-2 h-4 w-4" />
              {component.label}
              <Plus className="ml-auto h-4 w-4 text-muted-foreground" />
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

