"use client"

import * as React from "react"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getTemplatesForType } from "@/lib/templates/component-templates"
import type { ComponentTemplate, ComponentType } from "@/types/editor"

interface TemplateSelectorProps {
  type: ComponentType
  onSelect: (template: ComponentTemplate) => void
  onClose: () => void
}

export function TemplateSelector({ type, onSelect, onClose }: TemplateSelectorProps) {
  const templates = getTemplatesForType(type)

  return (
    <div className="p-6 bg-background">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Select a Template</h2>
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
      <ScrollArea className="h-[500px] pr-4">
        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer transition-all hover:shadow-lg"
              onClick={() => onSelect(template)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {template.preview ? (
                  <div className="relative aspect-video rounded-md overflow-hidden">
                    <Image
                      src={template.preview || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground">No preview available</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

