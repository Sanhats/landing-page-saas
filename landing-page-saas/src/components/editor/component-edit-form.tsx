"use client"

import { useState } from "react"
import type { EditorComponent } from "@/types/editor"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusIcon, TrashIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ComponentEditFormProps {
  component: EditorComponent
  onSave: (updatedComponent: EditorComponent) => void
}

export function ComponentEditForm({ component, onSave }: ComponentEditFormProps) {
  const [editedComponent, setEditedComponent] = useState(component)

  const handleInputChange = (key: string, value: string | any) => {
    setEditedComponent((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value,
      },
    }))
  }

  const handleSave = () => {
    onSave(editedComponent)
  }

  const renderHeroForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={editedComponent.content.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={editedComponent.content.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="buttonText">Button Text</Label>
        <Input
          id="buttonText"
          value={editedComponent.content.buttonText}
          onChange={(e) => handleInputChange("buttonText", e.target.value)}
        />
      </div>
    </>
  )

  const renderFeaturesForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={editedComponent.content.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={editedComponent.content.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Features</Label>
        {editedComponent.content.features.map((feature: any, index: number) => (
          <div key={index} className="space-y-2 p-4 border rounded-md">
            <Input
              value={feature.title}
              onChange={(e) => {
                const updatedFeatures = [...editedComponent.content.features]
                updatedFeatures[index].title = e.target.value
                handleInputChange("features", updatedFeatures)
              }}
              placeholder="Feature title"
            />
            <Textarea
              value={feature.description}
              onChange={(e) => {
                const updatedFeatures = [...editedComponent.content.features]
                updatedFeatures[index].description = e.target.value
                handleInputChange("features", updatedFeatures)
              }}
              placeholder="Feature description"
            />
            <Input
              value={feature.icon}
              onChange={(e) => {
                const updatedFeatures = [...editedComponent.content.features]
                updatedFeatures[index].icon = e.target.value
                handleInputChange("features", updatedFeatures)
              }}
              placeholder="Feature icon (e.g., 'Zap', 'Heart')"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const updatedFeatures = editedComponent.content.features.filter((_, i) => i !== index)
                handleInputChange("features", updatedFeatures)
              }}
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Remove Feature
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const updatedFeatures = [...editedComponent.content.features, { title: "", description: "", icon: "Zap" }]
            handleInputChange("features", updatedFeatures)
          }}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>
    </>
  )

  const renderContentForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={editedComponent.content.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={editedComponent.content.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={editedComponent.content.imageUrl}
          onChange={(e) => handleInputChange("imageUrl", e.target.value)}
        />
      </div>
    </>
  )

  const renderTestimonialsForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={editedComponent.content.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Testimonials</Label>
        {editedComponent.content.testimonials.map((testimonial: any, index: number) => (
          <div key={index} className="space-y-2 p-4 border rounded-md">
            <Textarea
              value={testimonial.content}
              onChange={(e) => {
                const updatedTestimonials = [...editedComponent.content.testimonials]
                updatedTestimonials[index].content = e.target.value
                handleInputChange("testimonials", updatedTestimonials)
              }}
              placeholder="Testimonial content"
            />
            <Input
              value={testimonial.author}
              onChange={(e) => {
                const updatedTestimonials = [...editedComponent.content.testimonials]
                updatedTestimonials[index].author = e.target.value
                handleInputChange("testimonials", updatedTestimonials)
              }}
              placeholder="Author name"
            />
            <Input
              value={testimonial.role}
              onChange={(e) => {
                const updatedTestimonials = [...editedComponent.content.testimonials]
                updatedTestimonials[index].role = e.target.value
                handleInputChange("testimonials", updatedTestimonials)
              }}
              placeholder="Author role"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const updatedTestimonials = editedComponent.content.testimonials.filter((_, i) => i !== index)
                handleInputChange("testimonials", updatedTestimonials)
              }}
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Remove Testimonial
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const updatedTestimonials = [...editedComponent.content.testimonials, { content: "", author: "", role: "" }]
            handleInputChange("testimonials", updatedTestimonials)
          }}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>
    </>
  )

  const renderPricingForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={editedComponent.content.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={editedComponent.content.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Pricing Plans</Label>
        {editedComponent.content.plans.map((plan: any, index: number) => (
          <div key={index} className="space-y-2 p-4 border rounded-md">
            <Input
              value={plan.name}
              onChange={(e) => {
                const updatedPlans = [...editedComponent.content.plans]
                updatedPlans[index].name = e.target.value
                handleInputChange("plans", updatedPlans)
              }}
              placeholder="Plan name"
            />
            <Input
              value={plan.price}
              onChange={(e) => {
                const updatedPlans = [...editedComponent.content.plans]
                updatedPlans[index].price = e.target.value
                handleInputChange("plans", updatedPlans)
              }}
              placeholder="Plan price"
            />
            <Textarea
              value={plan.description}
              onChange={(e) => {
                const updatedPlans = [...editedComponent.content.plans]
                updatedPlans[index].description = e.target.value
                handleInputChange("plans", updatedPlans)
              }}
              placeholder="Plan description"
            />
            <div className="space-y-2">
              <Label>Features</Label>
              {plan.features.map((feature: string, featureIndex: number) => (
                <div key={featureIndex} className="flex items-center space-x-2">
                  <Input
                    value={feature}
                    onChange={(e) => {
                      const updatedPlans = [...editedComponent.content.plans]
                      updatedPlans[index].features[featureIndex] = e.target.value
                      handleInputChange("plans", updatedPlans)
                    }}
                    placeholder="Feature"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const updatedPlans = [...editedComponent.content.plans]
                      updatedPlans[index].features = plan.features.filter((_: any, i: number) => i !== featureIndex)
                      handleInputChange("plans", updatedPlans)
                    }}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const updatedPlans = [...editedComponent.content.plans]
                  updatedPlans[index].features.push("")
                  handleInputChange("plans", updatedPlans)
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const updatedPlans = editedComponent.content.plans.filter((_, i) => i !== index)
                handleInputChange("plans", updatedPlans)
              }}
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Remove Plan
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const updatedPlans = [
              ...editedComponent.content.plans,
              { name: "", price: "", description: "", features: [] },
            ]
            handleInputChange("plans", updatedPlans)
          }}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </div>
    </>
  )

  const renderFAQForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={editedComponent.content.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>FAQs</Label>
        {editedComponent.content.faqs.map((faq: any, index: number) => (
          <div key={index} className="space-y-2 p-4 border rounded-md">
            <Input
              value={faq.question}
              onChange={(e) => {
                const updatedFaqs = [...editedComponent.content.faqs]
                updatedFaqs[index].question = e.target.value
                handleInputChange("faqs", updatedFaqs)
              }}
              placeholder="Question"
            />
            <Textarea
              value={faq.answer}
              onChange={(e) => {
                const updatedFaqs = [...editedComponent.content.faqs]
                updatedFaqs[index].answer = e.target.value
                handleInputChange("faqs", updatedFaqs)
              }}
              placeholder="Answer"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const updatedFaqs = editedComponent.content.faqs.filter((_, i) => i !== index)
                handleInputChange("faqs", updatedFaqs)
              }}
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Remove FAQ
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const updatedFaqs = [...editedComponent.content.faqs, { question: "", answer: "" }]
            handleInputChange("faqs", updatedFaqs)
          }}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>
      </div>
    </>
  )

  const renderContactForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={editedComponent.content.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={editedComponent.content.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </>
  )

  const renderForm = () => {
    switch (component.type) {
      case "hero":
        return renderHeroForm()
      case "features":
        return renderFeaturesForm()
      case "content":
        return renderContentForm()
      case "testimonials":
        return renderTestimonialsForm()
      case "pricing":
        return renderPricingForm()
      case "faq":
        return renderFAQForm()
      case "contact":
        return renderContactForm()
      default:
        return null
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSave()
      }}
    >
      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-4 pb-4">{renderForm()}</div>
      </ScrollArea>
      <div className="flex justify-end mt-4">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}

