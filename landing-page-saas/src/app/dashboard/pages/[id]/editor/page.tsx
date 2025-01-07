"use client"

import { useState } from "react"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { ComponentPalette } from "@/components/editor/component-palette"
import { EditorCanvas } from "@/components/editor/editor-canvas"
import { ComponentType, EditorComponent } from "@/types/editor"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

const defaultContent = {
  hero: {
    title: 'Welcome to our platform',
    description: 'This is a sample hero section. Edit me!',
    buttonText: 'Get Started'
  },
  features: {
    title: 'Amazing Features',
    description: 'Discover what makes us special',
    features: [
      {
        title: "Easy to Use",
        description: "Simple and intuitive interface",
        icon: "Laptop"
      },
      {
        title: "Documentation",
        description: "Comprehensive guides",
        icon: "Book"
      },
      {
        title: "Team Work",
        description: "Collaborate effectively",
        icon: "Users"
      },
      {
        title: "Results",
        description: "Achieve your goals",
        icon: "Trophy"
      }
    ]
  }
}

export default function EditorPage() {
  const [components, setComponents] = useState<EditorComponent[]>([])
  const [editingComponent, setEditingComponent] = useState<EditorComponent | null>(null)
  const { toast } = useToast()

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over || over.id !== 'editor-canvas') return

    const draggedComponent = active.data.current
    if (!draggedComponent?.type) return

    const newComponent: EditorComponent = {
      id: crypto.randomUUID(),
      type: draggedComponent.type as ComponentType,
      content: defaultContent[draggedComponent.type as keyof typeof defaultContent]
    }

    setComponents([...components, newComponent])
    toast({
      title: "Component added",
      description: `Added ${draggedComponent.type} component to the page.`
    })
  }

  const handleEdit = (id: string) => {
    const component = components.find(c => c.id === id)
    if (component) {
      setEditingComponent(component)
    }
  }

  const handleSave = (newContent: any) => {
    if (!editingComponent) return

    setComponents(components.map(c => 
      c.id === editingComponent.id ? {...c, content: newContent} : c
    ))
    setEditingComponent(null)
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully."
    })
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
                  content: defaultContent[type as keyof typeof defaultContent]
                }
              ])
            }}
            onEdit={handleEdit}
          />
        </DndContext>
      </div>

      <Dialog open={!!editingComponent} onOpenChange={() => setEditingComponent(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {editingComponent?.type}</DialogTitle>
          </DialogHeader>
          {editingComponent?.type === 'hero' && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingComponent.content.title}
                  onChange={(e) => setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, title: e.target.value }
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingComponent.content.description}
                  onChange={(e) => setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, description: e.target.value }
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={editingComponent.content.buttonText}
                  onChange={(e) => setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, buttonText: e.target.value }
                  })}
                />
              </div>
              <Button onClick={() => handleSave(editingComponent.content)}>
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

