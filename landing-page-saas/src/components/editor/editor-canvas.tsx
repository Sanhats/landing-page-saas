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
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ComponentType, type EditorComponent } from "@/types/editor"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GripVertical, Edit } from "lucide-react"
import { cn } from "@/lib/utils"

interface EditorCanvasProps {
  components: EditorComponent[]
  onEdit: (id: string) => void
  onReorder: (startIndex: number, endIndex: number) => void
}

function SortableComponent({ component, onEdit }: { component: EditorComponent; onEdit: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
      </div>
      <div className="p-6">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/0 z-20" />
          <div className="relative z-10">{renderComponent(component)}</div>
        </Card>
      </div>
    </div>
  )
}

function renderComponent(component: EditorComponent) {
  switch (component.type) {
    case "hero":
      return (
        <div className="space-y-4 p-6">
          <h2 className="text-2xl font-bold">{component.content.title}</h2>
          <p className="text-muted-foreground">{component.content.description}</p>
          <Button>{component.content.buttonText}</Button>
        </div>
      )
    case "features":
      return (
        <div className="space-y-4 p-6">
          <h2 className="text-2xl font-bold">{component.content.title}</h2>
          <p className="text-muted-foreground">{component.content.description}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {component.content.features.map((feature, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      )
    // Add other component type renders as needed
    default:
      return (
        <div className="p-6">
          <p className="text-muted-foreground">Unknown component type: {component.type}</p>
        </div>
      )
  }
}

export function EditorCanvas({ components, onEdit, onReorder }: EditorCanvasProps) {
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
            <SortableComponent key={component.id} component={component} onEdit={onEdit} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  )
}

