"use client"

import { useState, useEffect, useCallback } from "react"
import { EditorCanvas } from "@/components/editor/editor-canvas"
import { ComponentType, type EditorComponent } from "@/types/editor"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useParams } from "next/navigation"
import { getLandingPage, updateLandingPage } from "@/lib/api/landing-pages"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Loader2, Save } from "lucide-react"

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
  const [components, setComponents] = useState<EditorComponent[]>([])
  const [editingComponent, setEditingComponent] = useState<EditorComponent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const params = useParams()
  const pageId = params.id as string

  const loadPage = useCallback(async () => {
    setIsLoading(true)
    try {
      const page = await getLandingPage(pageId)
      if (page && page.content && Array.isArray(page.content) && page.content.length > 0) {
        setComponents(page.content as EditorComponent[])
      } else {
        throw new Error("No content found")
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

  const handleEdit = (id: string) => {
    const component = components.find((c) => c.id === id)
    if (component) {
      setEditingComponent(component)
    }
  }

  const handleSave = async (newContent: any) => {
    if (!editingComponent) return

    setIsSaving(true)
    const updatedComponents = components.map((c) => (c.id === editingComponent.id ? { ...c, content: newContent } : c))
    setComponents(updatedComponents)
    setEditingComponent(null)

    try {
      await updateLandingPage(pageId, { content: updatedComponents })
      toast({
        title: "Changes saved",
        description: "Your changes have been saved successfully.",
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

  const handleReorder = async (startIndex: number, endIndex: number) => {
    const result = Array.from(components)
    const [reorderedItem] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, reorderedItem)

    setComponents(result)

    try {
      await updateLandingPage(pageId, { content: result })
      toast({
        title: "Order updated",
        description: "The component order has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating order:", error)
      toast({
        title: "Error",
        description: "Failed to update component order. Please try again.",
        variant: "destructive",
      })
      setComponents(components) // Revert on error
    }
  }

  const renderEditingForm = () => {
    if (!editingComponent) return null

    switch (editingComponent.type) {
      case "hero":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingComponent.content.title}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingComponent.content.description}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, description: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={editingComponent.content.buttonText}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, buttonText: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )

      case "features":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="features-title">Section Title</Label>
              <Input
                id="features-title"
                value={editingComponent.content.title}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="features-description">Section Description</Label>
              <Textarea
                id="features-description"
                value={editingComponent.content.description}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, description: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-4">
              <Label>Features</Label>
              {editingComponent.content.features.map((feature, index) => (
                <Card key={index} className="p-4">
                  <CardContent className="p-0 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`feature-${index}-title`}>Title</Label>
                      <Input
                        id={`feature-${index}-title`}
                        value={feature.title}
                        onChange={(e) => {
                          const newFeatures = [...editingComponent.content.features]
                          newFeatures[index] = { ...newFeatures[index], title: e.target.value }
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, features: newFeatures },
                          })
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`feature-${index}-description`}>Description</Label>
                      <Textarea
                        id={`feature-${index}-description`}
                        value={feature.description}
                        onChange={(e) => {
                          const newFeatures = [...editingComponent.content.features]
                          newFeatures[index] = { ...newFeatures[index], description: e.target.value }
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, features: newFeatures },
                          })
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "content":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content-title">Title</Label>
              <Input
                id="content-title"
                value={editingComponent.content.title}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content-description">Description</Label>
              <Textarea
                id="content-description"
                value={editingComponent.content.description}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, description: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content-imageUrl">Image URL</Label>
              <Input
                id="content-imageUrl"
                value={editingComponent.content.imageUrl}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, imageUrl: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )

      case "testimonials":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="testimonials-title">Section Title</Label>
              <Input
                id="testimonials-title"
                value={editingComponent.content.title}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-4">
              <Label>Testimonials</Label>
              {editingComponent.content.testimonials.map((testimonial, index) => (
                <Card key={index} className="p-4">
                  <CardContent className="p-0 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`testimonial-${index}-content`}>Content</Label>
                      <Textarea
                        id={`testimonial-${index}-content`}
                        value={testimonial.content}
                        onChange={(e) => {
                          const newTestimonials = [...editingComponent.content.testimonials]
                          newTestimonials[index] = { ...newTestimonials[index], content: e.target.value }
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, testimonials: newTestimonials },
                          })
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`testimonial-${index}-author`}>Author</Label>
                      <Input
                        id={`testimonial-${index}-author`}
                        value={testimonial.author}
                        onChange={(e) => {
                          const newTestimonials = [...editingComponent.content.testimonials]
                          newTestimonials[index] = { ...newTestimonials[index], author: e.target.value }
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, testimonials: newTestimonials },
                          })
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`testimonial-${index}-role`}>Role</Label>
                      <Input
                        id={`testimonial-${index}-role`}
                        value={testimonial.role}
                        onChange={(e) => {
                          const newTestimonials = [...editingComponent.content.testimonials]
                          newTestimonials[index] = { ...newTestimonials[index], role: e.target.value }
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, testimonials: newTestimonials },
                          })
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "pricing":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="pricing-title">Section Title</Label>
              <Input
                id="pricing-title"
                value={editingComponent.content.title}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pricing-description">Section Description</Label>
              <Textarea
                id="pricing-description"
                value={editingComponent.content.description}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, description: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-4">
              <Label>Pricing Plans</Label>
              {editingComponent.content.plans.map((plan, index) => (
                <Card key={index} className="p-4">
                  <CardContent className="p-0 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`plan-${index}-name`}>Plan Name</Label>
                      <Input
                        id={`plan-${index}-name`}
                        value={plan.name}
                        onChange={(e) => {
                          const newPlans = [...editingComponent.content.plans]
                          newPlans[index] = { ...newPlans[index], name: e.target.value }
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, plans: newPlans },
                          })
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`plan-${index}-price`}>Price</Label>
                      <Input
                        id={`plan-${index}-price`}
                        value={plan.price}
                        onChange={(e) => {
                          const newPlans = [...editingComponent.content.plans]
                          newPlans[index] = { ...newPlans[index], price: e.target.value }
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, plans: newPlans },
                          })
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`plan-${index}-description`}>Description</Label>
                      <Textarea
                        id={`plan-${index}-description`}
                        value={plan.description}
                        onChange={(e) => {
                          const newPlans = [...editingComponent.content.plans]
                          newPlans[index] = { ...newPlans[index], description: e.target.value }
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, plans: newPlans },
                          })
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Features</Label>
                      {plan.features.map((feature, featureIndex) => (
                        <Input
                          key={featureIndex}
                          value={feature}
                          onChange={(e) => {
                            const newPlans = [...editingComponent.content.plans]
                            const newFeatures = [...newPlans[index].features]
                            newFeatures[featureIndex] = e.target.value
                            newPlans[index] = { ...newPlans[index], features: newFeatures }
                            setEditingComponent({
                              ...editingComponent,
                              content: { ...editingComponent.content, plans: newPlans },
                            })
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "faq":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="faq-title">Section Title</Label>
              <Input
                id="faq-title"
                value={editingComponent.content.title}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-4">
              <Label>FAQ Items</Label>
              {editingComponent.content.faqs.map((faq, index) => (
                <Card key={index} className="p-4">
                  <CardContent className="p-0 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`faq-${index}-question`}>Question</Label>
                      <Input
                        id={`faq-${index}-question`}
                        value={faq.question}
                        onChange={(e) => {
                          const newFaqs = [...editingComponent.content.faqs]
                          newFaqs[index] = { ...newFaqs[index], question: e.target.value }
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, faqs: newFaqs },
                          })
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`faq-${index}-answer`}>Answer</Label>
                      <Textarea
                        id={`faq-${index}-answer`}
                        value={faq.answer}
                        onChange={(e) => {
                          const newFaqs = [...editingComponent.content.faqs]
                          newFaqs[index] = { ...newFaqs[index], answer: e.target.value }
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, faqs: newFaqs },
                          })
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="contact-title">Section Title</Label>
              <Input
                id="contact-title"
                value={editingComponent.content.title}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-description">Description</Label>
              <Textarea
                id="contact-description"
                value={editingComponent.content.description}
                onChange={(e) =>
                  setEditingComponent({
                    ...editingComponent,
                    content: { ...editingComponent.content, description: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-background border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Page Editor</h1>
        <Button onClick={loadPage} variant="outline" className="mr-2">
          Refresh
        </Button>
      </header>
      <Tabs defaultValue="edit" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start px-4 border-b">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="flex-1 p-4 overflow-auto">
          <div className="flex gap-4 h-full">
            <Card className="w-64 flex-shrink-0">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Components</h2>
                <ScrollArea className="h-[calc(100vh-200px)]">
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
                </ScrollArea>
              </CardContent>
            </Card>
            <div className="flex-1 overflow-auto">
              <EditorCanvas components={components} onEdit={handleEdit} onReorder={handleReorder} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preview" className="flex-1 p-4 overflow-auto">
          <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {components.map((component) => {
              const ComponentTemplate = {
                hero: HeroTemplate,
                features: FeaturesTemplate,
                content: ContentTemplate,
                testimonials: TestimonialsTemplate,
                pricing: PricingTemplate,
                faq: FAQTemplate,
                contact: ContactTemplate,
              }[component.type]

              return ComponentTemplate ? <ComponentTemplate key={component.id} content={component.content} /> : null
            })}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingComponent} onOpenChange={() => setEditingComponent(null)}>
        <DialogContent className="max-h-[90vh] w-[90vw] max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit {editingComponent?.type}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">{renderEditingForm()}</ScrollArea>
          <div className="flex justify-end pt-4">
            <Button onClick={() => handleSave(editingComponent?.content)} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
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
                className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
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
            {" "}
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

