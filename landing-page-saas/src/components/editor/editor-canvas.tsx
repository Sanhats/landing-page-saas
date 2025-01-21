"use client"

import { ComponentType, type EditorComponent } from "@/types/editor"
import { HeroTemplate } from "./templates/hero-template"
import { FeaturesTemplate } from "./templates/features-template"
import { ContentTemplate } from "./templates/content-template"
import { TestimonialsTemplate } from "./templates/testimonials-template"
import { PricingTemplate } from "./templates/pricing-template"
import { FAQTemplate } from "./templates/faq-template"
import { ContactTemplate } from "./templates/contact-template"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"

interface EditorCanvasProps {
  components: EditorComponent[]
  onEdit: (id: string) => void
  onReorder: (startIndex: number, endIndex: number) => void
}

function SortableItem({ component, onEdit }: { component: EditorComponent; onEdit: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const ComponentTemplate = {
    hero: HeroTemplate,
    features: FeaturesTemplate,
    content: ContentTemplate,
    testimonials: TestimonialsTemplate,
    pricing: PricingTemplate,
    faq: FAQTemplate,
    contact: ContactTemplate,
  }[component.type]

  if (!ComponentTemplate) return null

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="mb-4">
      <div {...listeners} className="drag-handle p-2 bg-gray-200 rounded mb-2">
        Drag to reorder
      </div>
      <ComponentTemplate content={component.content} onEdit={() => onEdit(component.id)} />
    </div>
  )
}

export function EditorCanvas({ components, onEdit, onReorder }: EditorCanvasProps) {
  const [items, setItems] = useState(components)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)

      // Call the parent's onReorder callback instead of updating state directly
      onReorder(oldIndex, newIndex)

      // Update local state after the parent handles the reorder
      const newOrder = arrayMove(items, oldIndex, newIndex)
      setItems(newOrder)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <div className="min-h-[calc(100vh-2rem)] w-full rounded-lg border-2 border-dashed p-8 overflow-auto">
          {items.map((component) => (
            <SortableItem key={component.id} component={component} onEdit={onEdit} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

