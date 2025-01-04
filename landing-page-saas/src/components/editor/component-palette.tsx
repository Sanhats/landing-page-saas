"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LayoutTemplate, Type, Image, ListChecks, MessageSquare, CreditCard, HelpCircle, Mail } from 'lucide-react'
import { useDraggable } from "@dnd-kit/core"
import { ComponentType } from "@/types/editor"

interface ComponentButtonProps {
  type: ComponentType
  icon: React.ComponentType<{ className?: string }>
  label: string
}

function ComponentButton({ type, icon: Icon, label }: ComponentButtonProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: `new-${type}`,
    data: {
      type,
      isNew: true
    }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <Button
      ref={setNodeRef}
      variant="outline"
      className="flex items-center gap-2 w-full justify-start"
      {...listeners}
      {...attributes}
      style={style}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  )
}

export function ComponentPalette() {
  const components: ComponentButtonProps[] = [
    { type: "hero", icon: LayoutTemplate, label: "Hero Section" },
    { type: "features", icon: ListChecks, label: "Features" },
    { type: "content", icon: Type, label: "Content" },
    { type: "testimonials", icon: MessageSquare, label: "Testimonials" },
    { type: "pricing", icon: CreditCard, label: "Pricing" },
    { type: "faq", icon: HelpCircle, label: "FAQ" },
    { type: "contact", icon: Mail, label: "Contact" },
  ]

  return (
    <Card className="p-4 space-y-2">
      <h3 className="font-medium mb-4">Components</h3>
      <div className="space-y-2">
        {components.map((component) => (
          <ComponentButton key={component.type} {...component} />
        ))}
      </div>
    </Card>
  )
}

