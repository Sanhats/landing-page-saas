"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Save, Eye, ArrowLeft, Plus, Loader2 } from "lucide-react"
import { EditorCanvas } from "@/components/editor/editor-canvas"
import { ComponentLibrary } from "@/components/editor/component-library"
import { getLandingPage, updateLandingPage } from "@/lib/api/landing-pages"
import { useToast } from "@/components/ui/use-toast"
import type { EditorComponent } from "@/types/editor"

export default function EditorPage({
  params,
}: {
  params: { id: string }
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [components, setComponents] = useState<EditorComponent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loadPage = async () => {
      try {
        const page = await getLandingPage(params.id)
        setTitle(page.title)
        setDescription(page.description || "")
        setComponents(page.content || [])
      } catch (error) {
        console.error("Error loading page:", error)
        toast({
          title: "Error",
          description: "Failed to load page content. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPage()
  }, [params.id, toast])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateLandingPage(params.id, { title, description, content: components })
      toast({
        title: "Success",
        description: "Page saved successfully.",
      })
    } catch (error) {
      console.error("Error saving page:", error)
      toast({
        title: "Error",
        description: "Failed to save page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddComponent = (component: EditorComponent) => {
    setComponents([...components, component])
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#EAD8B1]" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 bg-[#001F3F]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:text-[#EAD8B1]" asChild>
            <Link href="/dashboard/pages">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-[#EAD8B1]">Editor</h1>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-[#3A6D8C] text-[#EAD8B1] hover:bg-[#3A6D8C]/20"
            onClick={() => router.push(`/preview/${params.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button
            className="bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
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
                className="border-[#3A6D8C] bg-[#001F3F]/50 text-[#EAD8B1]"
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
                className="border-[#3A6D8C] bg-[#001F3F]/50 text-[#EAD8B1]"
                placeholder="Enter page description"
              />
            </div>
          </div>
        </Card>

        <Card className="border-[#3A6D8C] bg-[#001F3F]/50 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#EAD8B1]">Components</h2>
            </div>
            <ComponentLibrary onAddComponent={handleAddComponent} />
          </div>
        </Card>
      </div>

      <Card className="border-[#3A6D8C] bg-[#001F3F]/50 p-6">
        <h2 className="text-xl font-semibold text-[#EAD8B1] mb-4">Page Layout</h2>
        <EditorCanvas
          components={components}
          onEdit={() => {}}
          onReorder={() => {}}
          onDuplicate={() => {}}
          onDelete={() => {}}
        />
      </Card>
    </div>
  )
}

