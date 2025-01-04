"use client"

import { useState } from "react"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { ComponentPalette } from "@/components/editor/component-palette"
import { EditorCanvas } from "@/components/editor/editor-canvas"
import { ComponentType, EditorComponent } from "@/types/editor"
import { HeroSection } from "@/components/editor/components/hero-section"

export default function EditorPage() {
  const [components, setComponents] = useState<EditorComponent[]>([])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over || over.id !== 'editor-canvas') return

    const draggedComponent = active.data.current
    if (!draggedComponent?.type) return

    const newComponent: EditorComponent = {
      id: crypto.randomUUID(),
      type: draggedComponent.type as ComponentType,
      content: draggedComponent.type === 'hero' ? {
        title: 'Welcome to our page',
        description: 'This is a sample hero section. Edit me!',
        buttonText: 'Get Started'
      } : {}
    }

    setComponents([...components, newComponent])
  }

  return (
    <div className="h-full flex gap-4 p-4">
      <div className="w-64 flex-shrink-0">
        <ComponentPalette />
      </div>
      <div className="flex-1">
        <DndContext onDragEnd={handleDragEnd}>
          <EditorCanvas 
            components={components}
            onDrop={(type) => {
              setComponents([
                ...components,
                {
                  id: crypto.randomUUID(),
                  type,
                  content: {}
                }
              ])
            }}
          >
            {components.map((component) => (
              <div key={component.id} className="mb-4">
                {component.type === 'hero' && (
                  <HeroSection
                    content={component.content}
                    onChange={(newContent) => {
                      setComponents(components.map(c => 
                        c.id === component.id ? {...c, content: newContent} : c
                      ))
                    }}
                  />
                )}
                {component.type !== 'hero' && (
                  <pre>{JSON.stringify(component, null, 2)}</pre>
                )}
              </div>
            ))}
          </EditorCanvas>
        </DndContext>
      </div>
    </div>
  )
}

