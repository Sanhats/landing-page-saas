"use client"

import { useState } from "react"
import type { EditorComponent } from "@/types/editor"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusIcon, TrashIcon } from "lucide-react"

interface ComponentEditFormProps {
  component: EditorComponent
  onSave: (updatedComponent: EditorComponent) => void
}

export function ComponentEditForm({ component, onSave }: ComponentEditFormProps) {
  const [editedComponent, setEditedComponent] = useState(component)

  const handleInputChange = (key: string, value: string) => {
    setEditedComponent((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value,
      },
    }))
  }

  const renderFields = () => {
    switch (component.type) {
      case "hero":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editedComponent.content.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedComponent.content.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={editedComponent.content.buttonText}
                onChange={(e) => handleInputChange("buttonText", e.target.value)}
              />
            </div>
          </>
        )
      case "features":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editedComponent.content.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedComponent.content.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Features</Label>
              {editedComponent.content.features.map((feature, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-md">
                  <Input
                    value={feature.title}
                    onChange={(e) => {
                      const updatedFeatures = [...editedComponent.content.features]
                      updatedFeatures[index].title = e.target.value
                      handleInputChange("features", updatedFeatures)
                    }}
                    placeholder="Feature title"
                  />
                  <Textarea
                    value={feature.description}
                    onChange={(e) => {
                      const updatedFeatures = [...editedComponent.content.features]
                      updatedFeatures[index].description = e.target.value
                      handleInputChange("features", updatedFeatures)
                    }}
                    placeholder="Feature description"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const updatedFeatures = editedComponent.content.features.filter((_, i) => i !== index)
                      handleInputChange("features", updatedFeatures)
                    }}
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Remove Feature
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const updatedFeatures = [
                    ...editedComponent.content.features,
                    { title: "", description: "", icon: "Zap" },
                  ]
                  handleInputChange("features", updatedFeatures)
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
          </>
        )
      // Add cases for other component types...
      default:
        return null
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(editedComponent)
      }}
    >
      <div className="space-y-4">
        {renderFields()}
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}

