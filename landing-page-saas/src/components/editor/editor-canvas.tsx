"use client"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { type EditorComponent } from "@/types/editor"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GripVertical, Edit, Copy, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { HeroTemplate } from "@/components/editor/templates/hero-template"
import { FeaturesTemplate } from "@/components/editor/templates/features-template"
import { ContentTemplate } from "@/components/editor/templates/content-template"
import { TestimonialsTemplate } from "@/components/editor/templates/testimonials-template"
import { PricingTemplate } from "@/components/editor/templates/pricing-template"
import { FAQTemplate } from "@/components/editor/templates/faq-template"
import { ContactTemplate } from "@/components/editor/templates/contact-template"

interface EditorCanvasProps {
  components: EditorComponent[]
  onEdit: (id: string) => void
  onReorder: (startIndex: number, endIndex: number) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
}

function SortableComponent({
  component,
  onEdit,
  onDuplicate,
  onDelete,
}: {
  component: EditorComponent
  onEdit: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const renderComponent = () => {
    switch (component.type) {
      case "hero":
        return <HeroTemplate content={component.content} />
      case "features":
        return <FeaturesTemplate content={component.content} />
      case "content":
        return <ContentTemplate content={component.content} />
      case "testimonials":
        return <TestimonialsTemplate content={component.content} />
      case "pricing":
        return <PricingTemplate content={component.content} />
      case "faq":
        return <FAQTemplate content={component.content} />
      case "contact":
        return <ContactTemplate content={component.content} />
      default:
        return null
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative rounded-lg border bg-card text-card-foreground shadow-sm transition-colors",
        isDragging && "opacity-50 border-primary",
      )}
    >
      <div className="absolute left-2 top-2 z-20 flex items-center gap-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab rounded-md border bg-background p-1.5 text-muted-foreground hover:text-foreground"
        >
          <GripVertical className="h-4 w-4" />
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onEdit(component.id)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onDuplicate(component.id)}>
          <Copy className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onDelete(component.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-6">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/0 z-20" />
          <div className="relative z-10">{renderComponent()}</div>
        </Card>
      </div>
    </div>
  )
}

export function EditorCanvas({ components, onEdit, onReorder, onDuplicate, onDelete }: EditorCanvasProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex((item) => item.id === active.id)
      const newIndex = components.findIndex((item) => item.id === over.id)
      onReorder(oldIndex, newIndex)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="mx-auto w-full max-w-5xl space-y-4 p-4">
        <SortableContext items={components} strategy={verticalListSortingStrategy}>
          {components.map((component) => (
            <SortableComponent
              key={component.id}
              component={component}
              onEdit={onEdit}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  )
}

