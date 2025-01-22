"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTheme } from "@/lib/theme-context"

interface FAQItem {
  question: string
  answer: string
}

interface FAQTemplateProps {
  content: {
    title: string
    faqs: FAQItem[]
  }
  onEdit?: () => void
}

export function FAQTemplate({ content, onEdit }: FAQTemplateProps) {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const { theme } = useTheme()

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item)
  }

  return (
    <section className="relative py-24 sm:py-32" style={{ backgroundColor: theme.colors.background }}>
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3A6D8C]/10 via-background to-background" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2
          className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
        >
          {content.title}
        </h2>
        <Accordion className="w-full">
          {content.faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger
                onClick={() => toggleItem(`item-${index}`)}
                style={{
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.heading,
                }}
                data-state={openItem === `item-${index}` ? "open" : "closed"}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                style={{
                  color: theme.colors.text,
                  fontFamily: theme.fonts.body,
                }}
                data-state={openItem === `item-${index}` ? "open" : "closed"}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {onEdit && (
        <Button variant="outline" size="sm" className="absolute right-4 top-4" onClick={onEdit}>
          Edit FAQ
        </Button>
      )}
    </section>
  )
}

