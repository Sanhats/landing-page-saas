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
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const defaultComponents: EditorComponent[] = [
  {
    id: '1',
    type: 'hero',
    content: {
      title: 'Welcome to our platform',
      description: 'The best solution for your needs',
      buttonText: 'Get Started'
    }
  },
  {
    id: '2',
    type: 'features',
    content: {
      title: 'Our Features',
      description: 'Everything you need to succeed',
      features: [
        {
          title: 'Easy to Use',
          description: 'Simple and intuitive interface',
          icon: 'Laptop'
        },
        {
          title: 'Documentation',
          description: 'Comprehensive guides',
          icon: 'Book'
        },
        {
          title: 'Team Work',
          description: 'Collaborate effectively',
          icon: 'Users'
        },
        {
          title: 'Results',
          description: 'Achieve your goals',
          icon: 'Trophy'
        }
      ]
    }
  },
  {
    id: '3',
    type: 'content',
    content: {
      title: 'About Us',
      description: 'Learn more about our mission and values',
      imageUrl: '/placeholder.svg'
    }
  },
  {
    id: '4',
    type: 'testimonials',
    content: {
      title: 'What Our Customers Say',
      testimonials: [
        {
          content: 'Amazing platform! It has transformed our workflow.',
          author: 'John Doe',
          role: 'CEO at TechCorp'
        },
        {
          content: 'The best solution we have found in the market.',
          author: 'Jane Smith',
          role: 'CTO at StartupX'
        },
        {
          content: 'Incredible support and features.',
          author: 'Mike Johnson',
          role: 'Product Manager'
        }
      ]
    }
  },
  {
    id: '5',
    type: 'pricing',
    content: {
      title: 'Pricing Plans',
      description: 'Choose the perfect plan for your needs',
      plans: [
        {
          name: 'Starter',
          price: '$9/month',
          description: 'Perfect for getting started',
          features: ['Basic features', '5 projects', 'Basic support']
        },
        {
          name: 'Pro',
          price: '$29/month',
          description: 'For growing businesses',
          features: ['Advanced features', 'Unlimited projects', 'Priority support']
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          description: 'For large organizations',
          features: ['Custom features', 'Dedicated support', 'Custom integration']
        }
      ]
    }
  },
  {
    id: '6',
    type: 'faq',
    content: {
      title: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'How do I get started?',
          answer: 'Simply sign up for an account and follow our quick start guide.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards and PayPal.'
        },
        {
          question: 'Can I cancel my subscription?',
          answer: 'Yes, you can cancel your subscription at any time.'
        }
      ]
    }
  },
  {
    id: '7',
    type: 'contact',
    content: {
      title: 'Contact Us',
      description: 'Get in touch with our team'
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
        console.log('Loading page...')
        const page = await getLandingPage(pageId)
        console.log('Page loaded:', page)
        console.log('Page content:', page?.content)
        if (page && page.content && Array.isArray(page.content) && page.content.length > 0) {
          console.log('Using page content from database')
          setComponents(page.content as EditorComponent[])
        } else {
          console.log('No content found, using default components')
          console.log('Default components:', defaultComponents)
          setComponents(defaultComponents)
          // Save default components to the database
          await updateLandingPage(pageId, { content: defaultComponents })
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

  useEffect(() => {
    console.log('Current components:', components)
  }, [components])

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

  const renderEditingForm = () => {
    if (!editingComponent) return null

    switch (editingComponent.type) {
      case 'hero':
        return (
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
          </div>
        )

      case 'features':
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="features-title">Section Title</Label>
              <Input
                id="features-title"
                value={editingComponent.content.title}
                onChange={(e) => setEditingComponent({
                  ...editingComponent,
                  content: { ...editingComponent.content, title: e.target.value }
                })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="features-description">Section Description</Label>
              <Textarea
                id="features-description"
                value={editingComponent.content.description}
                onChange={(e) => setEditingComponent({
                  ...editingComponent,
                  content: { ...editingComponent.content, description: e.target.value }
                })}
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
                          const newFeatures = [...editingComponent.content.features];
                          newFeatures[index] = { ...newFeatures[index], title: e.target.value };
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, features: newFeatures }
                          });
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`feature-${index}-description`}>Description</Label>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'content':
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content-title">Title</Label>
              <Input
                id="content-title"
                value={editingComponent.content.title}
                onChange={(e) => setEditingComponent({
                  ...editingComponent,
                  content: { ...editingComponent.content, title: e.target.value }
                })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content-description">Description</Label>
              <Textarea
                id="content-description"
                value={editingComponent.content.description}
                onChange={(e) => setEditingComponent({
                  ...editingComponent,
                  content: { ...editingComponent.content, description: e.target.value }
                })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content-imageUrl">Image URL</Label>
              <Input
                id="content-imageUrl"
                value={editingComponent.content.imageUrl}
                onChange={(e) => setEditingComponent({
                  ...editingComponent,
                  content: { ...editingComponent.content, imageUrl: e.target.value }
                })}
              />
            </div>
          </div>
        )

      case 'testimonials':
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="testimonials-title">Section Title</Label>
              <Input
                id="testimonials-title"
                value={editingComponent.content.title}
                onChange={(e) => setEditingComponent({
                  ...editingComponent,
                  content: { ...editingComponent.content, title: e.target.value }
                })}
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
                          const newTestimonials = [...editingComponent.content.testimonials];
                          newTestimonials[index] = { ...newTestimonials[index], content: e.target.value };
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, testimonials: newTestimonials }
                          });
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`testimonial-${index}-author`}>Author</Label>
                      <Input
                        id={`testimonial-${index}-author`}
                        value={testimonial.author}
                        onChange={(e) => {
                          const newTestimonials = [...editingComponent.content.testimonials];
                          newTestimonials[index] = { ...newTestimonials[index], author: e.target.value };
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, testimonials: newTestimonials }
                          });
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`testimonial-${index}-role`}>Role</Label>
                      <Input
                        id={`testimonial-${index}-role`}
                        value={testimonial.role}
                        onChange={(e) => {
                          const newTestimonials = [...editingComponent.content.testimonials];
                          newTestimonials[index] = { ...newTestimonials[index], role: e.target.value };
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, testimonials: newTestimonials }
                          });
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'pricing':
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="pricing-title">Section Title</Label>
              <Input
                id="pricing-title"
                value={editingComponent.content.title}
                onChange={(e) => setEditingComponent({
                  ...editingComponent,
                  content: { ...editingComponent.content, title: e.target.value }
                })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pricing-description">Section Description</Label>
              <Textarea
                id="pricing-description"
                value={editingComponent.content.description}
                onChange={(e) => setEditingComponent({
                  ...editingComponent,
                  content: { ...editingComponent.content, description: e.target.value }
                })}
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
                          const newPlans = [...editingComponent.content.plans];
                          newPlans[index] = { ...newPlans[index], name: e.target.value };
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, plans: newPlans }
                          });
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`plan-${index}-price`}>Price</Label>
                      <Input
                        id={`plan-${index}-price`}
                        value={plan.price}
                        onChange={(e) => {
                          const newPlans = [...editingComponent.content.plans];
                          newPlans[index] = { ...newPlans[index], price: e.target.value };
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, plans: newPlans }
                          });
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`plan-${index}-description`}>Description</Label>
                      <Textarea
                        id={`plan-${index}-description`}
                        value={plan.description}
                        onChange={(e) => {
                          const newPlans = [...editingComponent.content.plans];
                          newPlans[index] = { ...newPlans[index], description: e.target.value };
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, plans: newPlans }
                          });
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
                            const newPlans = [...editingComponent.content.plans];
                            const newFeatures = [...newPlans[index].features];
                            newFeatures[featureIndex] = e.target.value;
                            newPlans[index] = { ...newPlans[index], features: newFeatures };
                            setEditingComponent({
                              ...editingComponent,
                              content: { ...editingComponent.content, plans: newPlans }
                            });
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

      case 'faq':
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="faq-title">Section Title</Label>
              <Input
                id="faq-title"
                value={editingComponent.content.title}
                onChange={(e) => setEditingComponent({
                  ...editingComponent,
                  content: { ...editingComponent.content, title: e.target.value }
                })}
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
                          const newFaqs = [...editingComponent.content.faqs];
                          newFaqs[index] = { ...newFaqs[index], question: e.target.value };
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, faqs: newFaqs }
                          });
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`faq-${index}-answer`}>Answer</Label>
                      <Textarea
                        id={`faq-${index}-answer`}
                        value={faq.answer}
                        onChange={(e) => {
                          const newFaqs = [...editingComponent.content.faqs];
                          newFaqs[index] = { ...newFaqs[index], answer: e.target.value };
                          setEditingComponent({
                            ...editingComponent,
                            content: { ...editingComponent.content, faqs: newFaqs }
                          });
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="contact-title">Section Title</Label>
              <Input
                id="contact-title"
                value={editingComponent.content.title}
                onChange={(e) => setEditingComponent({
                  ...editingComponent,
                  content: { ...editingComponent.content, title: e.target.value }
                })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-description">Description</Label>
              <Textarea
                id="contact-description"
                value={editingComponent.content.description}
                onChange={(e) => setEditingComponent({
                  ...editingComponent,
                  content: { ...editingComponent.content, description: e.target.value }
                })}
              />
            </div>
          </div>
        )

      default:
        return null
    }
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
        <DialogContent className="max-h-[90vh] w-[90vw] max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit {editingComponent?.type}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            {renderEditingForm()}
          </ScrollArea>
          <div className="flex justify-end pt-4">
            <Button onClick={() => handleSave(editingComponent?.content)}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

