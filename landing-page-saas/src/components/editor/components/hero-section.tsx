"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  content: {
    title?: string
    description?: string
    buttonText?: string
  }
  onChange: (content: any) => void
}

export function HeroSection({ content, onChange }: HeroSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localContent, setLocalContent] = useState(content)

  const handleSave = () => {
    onChange(localContent)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <Input
          value={localContent.title || ""}
          onChange={(e) => setLocalContent({ ...localContent, title: e.target.value })}
          placeholder="Enter title"
        />
        <Textarea
          value={localContent.description || ""}
          onChange={(e) => setLocalContent({ ...localContent, description: e.target.value })}
          placeholder="Enter description"
        />
        <Input
          value={localContent.buttonText || ""}
          onChange={(e) => setLocalContent({ ...localContent, buttonText: e.target.value })}
          placeholder="Enter button text"
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="relative group cursor-pointer p-4 border rounded-lg"
      onClick={() => setIsEditing(true)}
    >
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">
          {content.title || "Click to edit title"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {content.description || "Click to edit description"}
        </p>
        <Button>
          {content.buttonText || "Click to edit button"}
        </Button>
      </div>
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
    </div>
  )
}

