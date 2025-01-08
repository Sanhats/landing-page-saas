"use client"

import { useState, useEffect } from "react"
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
import { useParams } from "next/navigation"
import { getLandingPage, updateLandingPage } from "@/lib/api/landing-pages"

const defaultComponents: EditorComponent[] = [
  {
    id: "hero-1",
    type: "hero",
    content: {
      title: 'Welcome to our platform',
      description: 'This is a sample hero section. Edit me!',
      buttonText: 'Get Started'
    }
  },
  {
    id: "features-1",
    type: "features",
    content: {
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
  },
  {
    id: "content-1",
    type: "content",
    content: {
      title: 'About Our Platform',
      description: 'Learn more about what we offer and how it can benefit you.',
      imageUrl: '/placeholder.svg?height=400&width=600'
    }
  },
  {
    id: "testimonials-1",
    type: "testimonials",
    content: {
      title: 'What Our Customers Say',
      testimonials: [
        {
          content: "This platform has revolutionized the way we work. Highly recommended!",
          author: "Jane Doe",
          role: "CEO, Tech Corp"
        },
        {
          content: "Easy to use and incredibly powerful. It's a game-changer for our team.",
          author: "John Smith",
          role: "Project Manager, Innovate Inc"
        }
      ]
    }
  },
  {
    id: "pricing-1",
    type: "pricing",
    content: {
      title: 'Simple, Transparent Pricing',
      description: 'Choose the plan that works best for you and your team.',
      plans: [
        {
          name: 'Basic',
          price: '$9.99/mo',
          description: 'Perfect for individuals and small teams',
          features: ['Up to 5 users', '10GB storage', 'Basic support']
        },
        {
          name: 'Pro',
          price: '$19.99/mo',
          description: 'Great for growing teams and businesses',
          features: ['Up to 20 users', '50GB storage', 'Priority support', 'Advanced analytics']
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          description: 'For large organizations with specific needs',
          features: ['Unlimited users', 'Unlimited storage', '24/7 dedicated support', 'Custom integrations']
        }
      ]
    }
  },
  {
    id: "faq-1",
    type: "faq",
    content: {
      title: 'Frequently Asked Questions',
      faqs: [
        {
          question: "How do I get started?",
          answer: "Simply sign up for an account and follow our easy onboarding process. You'll be up and running in no time!"
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes, we offer a 14-day free trial for all new users. No credit card required."
        },
        {
          question: "Can I upgrade or downgrade my plan at any time?",
          answer: "You can change your plan at any time, and the changes will be reflected in your next billing cycle."
        }
      ]
    }
  },
  {
    id: "contact-1",
    type: "contact",
    content: {
      title: 'Get in Touch',
      description: 'Have questions or need support? Reach out to us and we\'ll be happy to help.'
    }
  }
]

export default function EditorPage() {
  const [components, setComponents] = useState<EditorComponent[]>([])
  const [editingComponent, setEditingComponent] = useState<EditorComponent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const params = useParams()
  const pageId = params.id as string

  useEffect(() => {
    const loadPage = async () => {
      setIsLoading(true)
      try {
        const page = await getLandingPage(pageId)
        if (page && page.content && page.content.length > 0) {
          setComponents(page.content as EditorComponent[])
        } else {
          setComponents(defaultComponents)
        }
      } catch (error) {
        console.error("Error loading page:", error)
        toast({
          title: "Error",
          description: "Failed to load page content. Using default template.",
          variant: "destructive",
        })
        setComponents(defaultComponents)
      } finally {
        setIsLoading(false)
      }
    }
    loadPage()
  }, [pageId, toast])

  const handleEdit = (id: string) => {
    const component = components.find(c => c.id === id)
    if (component) {
      setEditingComponent(component)
    }
  }

  const handleSave = async (newContent: any) => {
    if (!editingComponent) return

    const updatedComponents = components.map(c =>
      c.id === editingComponent.id ? { ...c, content: newContent } : c
    )
    setComponents(updatedComponents)
    setEditingComponent(null)

    try {
      await updateLandingPage(pageId, { content: updatedComponents })
      toast({
        title: "Changes saved",
        description: "Your changes have been saved successfully."
      })
    } catch (error) {
      console.error("Error saving changes:", error)
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4 p-4">
      <div className="lg:w-64 flex-shrink-0">
        <h2 className="text-xl font-bold mb-4">Page Components</h2>
        <ul className="space-y-2">
          {components.map((component) => (
            <li key={component.id}>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleEdit(component.id)}
              >
                {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 overflow-auto">
        <EditorCanvas
          components={components}
          onEdit={handleEdit}
        />
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
          {editingComponent?.type === 'features' && (
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
              {editingComponent.content.features.map((feature, index) => (
                <div key={index} className="grid gap-2">
                  <Label htmlFor={`feature-${index}-title`}>Feature {index + 1} Title</Label>
                  <Input
                    id={`feature-${index}-title`}
                    value={feature.title}
                    onChange={(e) => {
                      const newFeatures = [...editingComponent.content.features];
                      newFeatures[index] = { ...newFeatures[index], title: e.target.value };
                      setEditingComponent({
                        ...editingComponent,
                        content: { ...editingComponent.content, features: newFeatures }
                      });
                    }}
                  />
                  <Label htmlFor={`feature-${index}-description`}>Feature {index + 1} Description</Label>
                  <Textarea
                    id={`feature-${index}-description`}
                    value={feature.description}
                    onChange={(e) => {
                      const newFeatures = [...editingComponent.content.features];
                      newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                      setEditingComponent({
                        ...editingComponent,
                        content: { ...editingComponent.content, features: newFeatures }
                      });
                    }}
                  />
                </div>
              ))}
              <Button onClick={() => handleSave(editingComponent.content)}>
                Save Changes
              </Button>
            </div>
          )}
          {/* Add similar editing sections for other component types */}
        </DialogContent>
      </Dialog>
    </div>
  )
}

