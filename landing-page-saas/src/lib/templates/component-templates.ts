import type { ComponentTemplate } from "@/types/editor"

export const componentTemplates: Record<string, ComponentTemplate[]> = {
  hero: [
    {
      id: "hero-centered",
      name: "Centered Hero",
      type: "hero",
      content: {
        title: "Welcome to Our Platform",
        description: "The best solution for your needs",
        buttonText: "Get Started",
      },
      styles: {
        backgroundColor: "bg-gradient-to-r from-primary/10 via-background to-background",
        textColor: "text-foreground",
        padding: "py-24",
        maxWidth: "max-w-4xl",
      },
    },
    {
      id: "hero-split",
      name: "Split Hero",
      type: "hero",
      content: {
        title: "Transform Your Business",
        description: "Powerful tools to help you reach your goals",
        buttonText: "Learn More",
        image: "/placeholder.svg",
      },
      styles: {
        backgroundColor: "bg-gradient-to-br from-primary/20 to-background",
        textColor: "text-foreground",
        padding: "py-16",
        maxWidth: "max-w-7xl",
      },
    },
  ],
  features: [
    {
      id: "features-grid",
      name: "Features Grid",
      type: "features",
      content: {
        title: "Our Features",
        description: "Everything you need to succeed",
        features: [
          {
            title: "Easy to Use",
            description: "Simple and intuitive interface",
            icon: "Zap",
          },
          {
            title: "Powerful Tools",
            description: "Advanced features when you need them",
            icon: "Tool",
          },
          {
            title: "Fast Performance",
            description: "Optimized for speed and efficiency",
            icon: "Gauge",
          },
          {
            title: "24/7 Support",
            description: "We're here to help anytime",
            icon: "Headphones",
          },
        ],
      },
      styles: {
        backgroundColor: "bg-background",
        textColor: "text-foreground",
        padding: "py-16",
        maxWidth: "max-w-7xl",
      },
    },
  ],
  // Add more templates for other component types...
}

export function getTemplatesForType(type: string): ComponentTemplate[] {
  return componentTemplates[type] || []
}

export function getTemplateById(id: string): ComponentTemplate | undefined {
  return Object.values(componentTemplates)
    .flat()
    .find((template) => template.id === id)
}

