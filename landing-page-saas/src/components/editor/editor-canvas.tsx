"use client"

import { useDroppable } from "@dnd-kit/core"
import { ComponentType, EditorComponent } from "@/types/editor"
import { cn } from "@/lib/utils"
import { HeroTemplate } from "./templates/hero-template"
import { FeaturesTemplate } from "./templates/features-template"

interface EditorCanvasProps {
  components: EditorComponent[]
  onDrop: (type: ComponentType) => void
  onEdit: (id: string) => void
}

export function EditorCanvas({ components, onDrop, onEdit }: EditorCanvasProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'editor-canvas',
    data: {
      accepts: ['component']
    }
  })

  const renderComponent = (component: EditorComponent) => {
    switch (component.type) {
      case 'hero':
        return (
          <HeroTemplate
            content={component.content}
            onEdit={() => onEdit(component.id)}
          />
        )
      case 'features':
        return (
          <FeaturesTemplate
            content={component.content}
            onEdit={() => onEdit(component.id)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "min-h-[calc(100vh-2rem)] w-full rounded-lg border-2 border-dashed p-8",
        isOver && "border-primary bg-primary/10",
        !components.length && "flex items-center justify-center"
      )}
    >
      {!components.length && (
        <p className="text-muted-foreground text-center">
          Drag and drop components here to start building your page
        </p>
      )}
      {components.map((component) => (
        <div key={component.id} className="mb-4">
          {renderComponent(component)}
        </div>
      ))}
    </div>
  )
}

