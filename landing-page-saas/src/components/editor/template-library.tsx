"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getTemplates } from "@/lib/api/landing-pages"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Template {
  id: string
  name: string
  content: any[]
}

interface TemplateLibraryProps {
  onApplyTemplate: (template: Template) => void
}

export function TemplateLibrary({ onApplyTemplate }: TemplateLibraryProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const fetchedTemplates = await getTemplates()
        setTemplates(fetchedTemplates)
      } catch (error) {
        console.error("Error fetching templates:", error)
        toast({
          title: "Error",
          description: "Failed to load templates. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [toast])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => onApplyTemplate(template)}>Apply Template</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

