"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Save, Eye, ArrowLeft } from 'lucide-react'

export default function EditorPage({
  params,
}: {
  params: { id: string }
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-[#EAD8B1]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-[#EAD8B1]">
            Editor
          </h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-[#3A6D8C]">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button className="bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-[#3A6D8C] bg-[#001F3F]/50 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[#EAD8B1]">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-[#3A6D8C] bg-[#001F3F]/50"
                placeholder="Enter page title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-[#EAD8B1]">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-[#3A6D8C] bg-[#001F3F]/50"
                placeholder="Enter page description"
              />
            </div>
          </div>
        </Card>

        <Card className="border-[#3A6D8C] bg-[#001F3F]/50 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#EAD8B1]">
                Components
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="border-[#3A6D8C]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Component
              </Button>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Drag and drop components to build your page
              </p>
              {/* Aquí irán los componentes arrastrables */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

