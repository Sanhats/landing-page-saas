"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { EditorCanvas } from "@/components/editor/editor-canvas"
import { ComponentLibrary } from "@/components/editor/component-library"
import { LivePreview } from "@/components/editor/live-preview"
import { ThemeCustomizer } from "@/components/editor/theme-customizer"
import { ComponentEditForm } from "@/components/editor/component-edit-form"
import { TemplateLibrary } from "@/components/editor/template-library"
import { ExportHtmlButton } from "@/components/editor/export-html-button"
import type { ComponentType, EditorComponent, ComponentTemplate } from "@/types/editor"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  getLandingPage,
  updateLandingPage,
  publishLandingPage,
  unpublishLandingPage,
  saveAsTemplate,
} from "@/lib/api/landing-pages"
import {
  Loader2,
  Save,
  Eye,
  ArrowLeft,
  Undo,
  Redo,
  Globe,
  GlobeIcon as GlobeOff,
  LayoutTemplateIcon as Template,
  Smartphone,
  Tablet,
  Laptop,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ThemeProvider } from "@/lib/theme-context"
import { cn } from "@/lib/utils"
import { PreviewToolbar, PreviewFrame } from "@/components/editor/preview"
import { TemplateSelector } from "@/components/editor/template-selector"
import type { PreviewMode } from "@/types/preview"

export default function EditorPage() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [components, setComponents] = useState<EditorComponent[]>([])
  const [editingComponent, setEditingComponent] = useState<EditorComponent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [history, setHistory] = useState<EditorComponent[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [componentToDelete, setComponentToDelete] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")
  const [pageData, setPageData] = useState<{ title: string; description: string; status: "draft" | "published" }>({
    title: "",
    description: "",
    status: "draft",
  })
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop")
  const [saveAsTemplateOpen, setSaveAsTemplateOpen] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [selectedComponentType, setSelectedComponentType] = useState<ComponentType | null>(null)
  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()
  const pageId = params.id as string

  const loadPage = useCallback(async () => {
    setIsLoading(true)
    try {
      const page = await getLandingPage(pageId)
      if (page) {
        setPageData({
          title: page.title,
          description: page.description || "",
          status: page.status as "draft" | "published",
        })
        if (page.content && Array.isArray(page.content)) {
          setComponents(page.content as EditorComponent[])
          setHistory([page.content as EditorComponent[]])
          setHistoryIndex(0)
        }
      }
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
  }, [pageId, toast])

  useEffect(() => {
    loadPage()
  }, [loadPage])

  const addToHistory = useCallback(
    (newComponents: EditorComponent[]) => {
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), newComponents])
      setHistoryIndex((prev) => prev + 1)
    },
    [historyIndex],
  )

  const handleAddComponent = (type: ComponentType) => {
    setSelectedComponentType(type)
    setShowTemplateSelector(true)
  }

  const handleTemplateSelect = (template: ComponentTemplate) => {
    const newComponent: EditorComponent = {
      id: crypto.randomUUID(),
      type: template.type,
      content: { ...template.content },
      template: template.id,
      styles: { ...template.styles },
    }
    setComponents([...components, newComponent])
    setShowTemplateSelector(false)
    setSelectedComponentType(null)
  }

  const handleEdit = (id: string) => {
    const component = components.find((c) => c.id === id)
    if (component) {
      setEditingComponent(component)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateLandingPage(pageId, { content: components, title: pageData.title, description: pageData.description })
      toast({
        title: "Success",
        description: "Changes saved successfully.",
      })
    } catch (error) {
      console.error("Error saving changes:", error)
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    try {
      await publishLandingPage(pageId)
      setPageData((prev) => ({ ...prev, status: "published" }))
      toast({
        title: "Success",
        description: "Page published successfully.",
      })
    } catch (error) {
      console.error("Error publishing page:", error)
      toast({
        title: "Error",
        description: "Failed to publish page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const handleUnpublish = async () => {
    setIsPublishing(true)
    try {
      await unpublishLandingPage(pageId)
      setPageData((prev) => ({ ...prev, status: "draft" }))
      toast({
        title: "Success",
        description: "Page unpublished successfully.",
      })
    } catch (error) {
      console.error("Error unpublishing page:", error)
      toast({
        title: "Error",
        description: "Failed to unpublish page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const handleReorder = (startIndex: number, endIndex: number) => {
    const result = Array.from(components)
    const [reorderedItem] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, reorderedItem)
    setComponents(result)
    addToHistory(result)
  }

  const handleDuplicate = (id: string) => {
    const componentToDuplicate = components.find((c) => c.id === id)
    if (componentToDuplicate) {
      const newComponent = {
        ...componentToDuplicate,
        id: crypto.randomUUID(),
      }
      const newComponents = [...components, newComponent]
      setComponents(newComponents)
      addToHistory(newComponents)
    }
  }

  const handleDelete = (id: string) => {
    setComponentToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (componentToDelete) {
      const newComponents = components.filter((c) => c.id !== componentToDelete)
      setComponents(newComponents)
      addToHistory(newComponents)
      setDeleteConfirmOpen(false)
      setComponentToDelete(null)
    }
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1)
      setComponents(history[historyIndex - 1])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1)
      setComponents(history[historyIndex + 1])
    }
  }

  const handleUpdateComponent = (updatedComponent: EditorComponent) => {
    const updatedComponents = components.map((c) => (c.id === updatedComponent.id ? updatedComponent : c))
    setComponents(updatedComponents)
    addToHistory(updatedComponents)
    setEditingComponent(null)
  }

  const handleSaveAsTemplate = async () => {
    if (!templateName) {
      toast({
        title: "Error",
        description: "Please enter a template name.",
        variant: "destructive",
      })
      return
    }

    try {
      await saveAsTemplate(pageId, templateName)
      toast({
        title: "Success",
        description: "Page saved as template successfully.",
      })
      setSaveAsTemplateOpen(false)
      setTemplateName("")
    } catch (error) {
      console.error("Error saving as template:", error)
      toast({
        title: "Error",
        description: "Failed to save as template. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePreviewInNewTab = () => {
    window.open(`/preview/${pageId}`, "_blank")
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col bg-background">
        <header className="border-b px-4 h-14 flex items-center justify-between shrink-0 bg-[#0a192f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a192f]/60">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/pages">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">{pageData.title || "Untitled Page"}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={handleUndo} disabled={historyIndex <= 0}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setActiveTab(activeTab === "edit" ? "preview" : "edit")}>
              <Eye className="mr-2 h-4 w-4" />
              {activeTab === "edit" ? "Preview" : "Edit"}
            </Button>
            <Button variant="outline" size="sm" onClick={handlePreviewInNewTab}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview in New Tab
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              size="sm"
              variant={pageData.status === "published" ? "destructive" : "default"}
              onClick={pageData.status === "published" ? handleUnpublish : handlePublish}
              disabled={isPublishing}
            >
              {pageData.status === "published" ? (
                <GlobeOff className="mr-2 h-4 w-4" />
              ) : (
                <Globe className="mr-2 h-4 w-4" />
              )}
              {isPublishing ? "Processing..." : pageData.status === "published" ? "Unpublish" : "Publish"}
            </Button>
            <ExportHtmlButton pageId={pageId} />
            <Button variant="outline" size="sm" onClick={() => setSaveAsTemplateOpen(true)}>
              <Template className="mr-2 h-4 w-4" />
              Save as Template
            </Button>
          </div>
        </header>

        <div className="flex-1 flex">
          {/* Left Sidebar */}
          <div
            className={cn(
              "w-64 border-r bg-[#0a192f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a192f]/60 transition-all duration-300 ease-in-out",
              !leftSidebarOpen && "-translate-x-full",
            )}
          >
            <Tabs defaultValue="components" className="h-full flex flex-col">
              <TabsList className="w-full justify-start px-4 border-b rounded-none h-12">
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              <TabsContent value="components" className="flex-1 p-0">
                <ComponentLibrary onAddComponent={handleAddComponent} />
              </TabsContent>
              <TabsContent value="templates" className="flex-1 p-0">
                <TemplateLibrary onApplyTemplate={(template) => setComponents(template.content)} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Content */}
          <div className="flex-1 relative">
            {activeTab === "edit" ? (
              <EditorCanvas
                components={components}
                onEdit={handleEdit}
                onReorder={handleReorder}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
              />
            ) : (
              <>
                <PreviewToolbar mode={previewMode} onModeChange={setPreviewMode} />
                <PreviewFrame mode={previewMode}>
                  <LivePreview components={components} />
                </PreviewFrame>
              </>
            )}
          </div>

          {/* Right Sidebar */}
          <div
            className={cn(
              "w-80 border-l bg-[#0a192f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a192f]/60 transition-all duration-300 ease-in-out",
              !rightSidebarOpen && "translate-x-full",
            )}
          >
            <Tabs defaultValue="theme" className="h-full flex flex-col">
              <TabsList className="w-full justify-start px-4 border-b rounded-none h-12">
                <TabsTrigger value="theme">Theme</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="theme" className="flex-1 p-4">
                <ThemeCustomizer />
              </TabsContent>
              <TabsContent value="settings" className="flex-1 p-4">
                {/* Add page settings component here */}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Dialog open={!!editingComponent} onOpenChange={() => setEditingComponent(null)}>
          <DialogContent className="max-h-[90vh] w-[90vw] max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                Edit {editingComponent?.type.charAt(0).toUpperCase() + editingComponent?.type.slice(1)}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] pr-4">
              {editingComponent && <ComponentEditForm component={editingComponent} onSave={handleUpdateComponent} />}
            </ScrollArea>
            <DialogFooter>
              <Button onClick={() => setEditingComponent(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this component? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={saveAsTemplateOpen} onOpenChange={setSaveAsTemplateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save as Template</DialogTitle>
              <DialogDescription>Enter a name for your new template.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSaveAsTemplateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAsTemplate}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showTemplateSelector} onOpenChange={setShowTemplateSelector}>
          <DialogContent className="max-w-4xl">
            {selectedComponentType && (
              <TemplateSelector
                type={selectedComponentType}
                onSelect={handleTemplateSelect}
                onClose={() => setShowTemplateSelector(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}

