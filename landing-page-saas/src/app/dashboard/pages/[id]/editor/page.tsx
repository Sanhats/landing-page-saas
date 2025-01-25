"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { EditorCanvas } from "@/components/editor/editor-canvas"
import { ComponentLibrary } from "@/components/editor/component-library"
import { LivePreview } from "@/components/editor/live-preview"
import { ThemeCustomizer } from "@/components/editor/theme-customizer"
import { ComponentEditForm } from "@/components/editor/component-edit-form"
import { TemplateLibrary } from "@/components/editor/template-library"
import type { ComponentType, EditorComponent } from "@/types/editor"
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
import { ThemeProvider, useTheme } from "@/lib/theme-context"
import { cn } from "@/lib/utils"

const defaultComponents: EditorComponent[] = [
  {
    id: "1",
    type: "hero",
    content: {
      title: "Welcome to our platform",
      description: "The best solution for your needs",
      buttonText: "Get Started",
    },
  },
  {
    id: "2",
    type: "features",
    content: {
      title: "Our Features",
      description: "Everything you need to succeed",
      features: [
        {
          title: "Easy to Use",
          description: "Simple and intuitive interface",
          icon: "Laptop",
        },
        {
          title: "Documentation",
          description: "Comprehensive guides",
          icon: "Book",
        },
        {
          title: "Team Work",
          description: "Collaborate effectively",
          icon: "Users",
        },
        {
          title: "Results",
          description: "Achieve your goals",
          icon: "Trophy",
        },
      ],
    },
  },
  {
    id: "3",
    type: "content",
    content: {
      title: "About Us",
      description: "Learn more about our mission and values",
      imageUrl: "/placeholder.svg",
    },
  },
  {
    id: "4",
    type: "testimonials",
    content: {
      title: "What Our Customers Say",
      testimonials: [
        {
          content: "Amazing platform! It has transformed our workflow.",
          author: "John Doe",
          role: "CEO at TechCorp",
        },
        {
          content: "The best solution we have found in the market.",
          author: "Jane Smith",
          role: "CTO at StartupX",
        },
        {
          content: "Incredible support and features.",
          author: "Mike Johnson",
          role: "Product Manager",
        },
      ],
    },
  },
  {
    id: "5",
    type: "pricing",
    content: {
      title: "Pricing Plans",
      description: "Choose the perfect plan for your needs",
      plans: [
        {
          name: "Starter",
          price: "$9/month",
          description: "Perfect for getting started",
          features: ["Basic features", "5 projects", "Basic support"],
        },
        {
          name: "Pro",
          price: "$29/month",
          description: "For growing businesses",
          features: ["Advanced features", "Unlimited projects", "Priority support"],
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For large organizations",
          features: ["Custom features", "Dedicated support", "Custom integration"],
        },
      ],
    },
  },
  {
    id: "6",
    type: "faq",
    content: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "How do I get started?",
          answer: "Simply sign up for an account and follow our quick start guide.",
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards and PayPal.",
        },
        {
          question: "Can I cancel my subscription?",
          answer: "Yes, you can cancel your subscription at any time.",
        },
      ],
    },
  },
  {
    id: "7",
    type: "contact",
    content: {
      title: "Contact Us",
      description: "Get in touch with our team",
    },
  },
]

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
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [saveAsTemplateOpen, setSaveAsTemplateOpen] = useState(false)
  const [templateName, setTemplateName] = useState("")
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

  const handleAddComponent = (component: EditorComponent) => {
    const newComponents = [...components, component]
    setComponents(newComponents)
    addToHistory(newComponents)
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
          <div className="flex items-center gap-2">
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
          <div className="flex-1 relative bg-white">
            <ScrollArea className="h-full">
              {activeTab === "edit" ? (
                <EditorCanvas
                  components={components}
                  onEdit={handleEdit}
                  onReorder={handleReorder}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                />
              ) : (
                <LivePreview components={components} previewMode={previewMode} />
              )}
            </ScrollArea>

            {/* Preview Mode Buttons */}
            {activeTab === "preview" && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant={previewMode === "desktop" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("desktop")}
                >
                  <Laptop className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewMode === "tablet" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewMode === "mobile" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Sidebar Toggle Buttons */}
            {!leftSidebarOpen && (
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 shadow-lg bg-white hover:bg-gray-100"
                onClick={() => setLeftSidebarOpen(true)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}

            {!rightSidebarOpen && (
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 shadow-lg bg-white hover:bg-gray-100"
                onClick={() => setRightSidebarOpen(true)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
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
      </div>
    </ThemeProvider>
  )
}



function HeroTemplate({ content }: { content: any }) {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{content.title}</h1>
        <p className="mt-4 text-lg text-gray-700">{content.description}</p>
        <a
          href="#"
          className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
        >
          {content.buttonText}
        </a>
      </div>
    </section>
  )
}

function FeaturesTemplate({ content }: { content: any }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
        <p className="mt-4 text-lg text-gray-700">{content.description}</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.features.map((feature) => (
            <div key={feature.title} className="flex items-center space-x-4">
              <svg
                className="h-6 w-6 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d={`M${feature.icon === "Laptop" ? "12 20" : feature.icon === "Book" ? "12 8" : feature.icon === "Users" ? "17 17" : feature.icon === "Trophy" ? "12 12" : "12 12"} h 0`}
                />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="text-base text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContentTemplate({ content }: { content: any }) {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-autopx-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
        <p className="mt-4 text-lg text-gray-700">{content.description}</p>
        {content.imageUrl && (
          <img src={content.imageUrl || "/placeholder.svg"} alt={content.title} className="mt-8 rounded-lg shadow-lg" />
        )}
      </div>
    </section>
  )
}

function TestimonialsTemplate({ content }: { content: any }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl fontbold text-gray-900">{content.title}</h2>
        <div className="mt-8">
          {content.testimonials.map((testimonial) => (
            <div key={testimonial.content} className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
              <p className="text-lg text-gray-700">{testimonial.content}</p>
              <p className="mt-4 text-gray-600 italic">
                {testimonial.author} - {testimonial.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingTemplate({ content }: { content: any }) {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
        <p className="mt-4 text-lg text-gray-700">{content.description}</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.plans.map((plan) => (
            <div key={plan.name} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <p className="mt-2 text-2xl font-bold text-gray-900">{plan.price}</p>
              <ul className="mt-4 list-disc list-inside text-gray-700">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-4 inline-block bg-blue-500 hover:bg-blue600 text-white font-boldpy-2 px-4 rounded-lg"
              >
                Select Plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQTemplate({ content }: { content: any }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
        <div className="mt-8">
          {content.faqs.map((faq) => (
            <div key={faq.question} className="border-b border-gray-200 py-4">
              <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactTemplate({ content }: { content: any }) {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
        <p className="mt-4 text-lg text-gray-700">{content.description}</p>
        <form className="mt-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={5}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

function getDefaultContent(type: ComponentType) {
  switch (type) {
    case "hero":
      return {
        title: "Welcome to our platform",
        description: "The best solution for your needs",
        buttonText: "Get Started",
      }
    case "features":
      return {
        title: "Our Features",
        description: "Everything you need to succeed",
        features: [
          {
            title: "Feature 1",
            description: "Description of feature 1",
            icon: "Laptop",
          },
          {
            title: "Feature 2",
            description: "Description of feature 2",
            icon: "Book",
          },
        ],
      }
    // Add other component type defaults
    default:
      return {}
  }
}

