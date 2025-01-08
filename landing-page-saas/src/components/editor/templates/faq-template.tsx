"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item)
  }

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3A6D8C]/10 via-background to-background" />
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-[#EAD8B1] sm:text-4xl text-center mb-12">{content.title}</h2>
        <Accordion className="w-full">
          {content.faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger
                onClick={() => toggleItem(`item-${index}`)}
                className="text-[#EAD8B1]"
                data-state={openItem === `item-${index}` ? 'open' : 'closed'}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                className="text-muted-foreground"
                data-state={openItem === `item-${index}` ? 'open' : 'closed'}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-4 top-4"
          onClick={onEdit}
        >
          Edit FAQ
        </Button>
      )}
    </section>
  )
}

