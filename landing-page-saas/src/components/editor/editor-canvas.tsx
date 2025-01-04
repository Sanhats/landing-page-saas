"use client"

import { useDroppable } from "@dnd-kit/core"
import { ComponentType, EditorComponent } from "@/types/editor"
import { cn } from "@/lib/utils"

interface EditorCanvasProps {
  components: EditorComponent[]
  onDrop: (type: ComponentType) => void
}

export function EditorCanvas({ components, onDrop }: EditorCanvasProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'editor-canvas',
    data: {
      accepts: ['component']
    }
  })

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
          {/* Aquí renderizaremos los componentes editables */}
          <pre>{JSON.stringify(component, null, 2)}</pre>
        </div>
      ))}
    </div>
  )
}

