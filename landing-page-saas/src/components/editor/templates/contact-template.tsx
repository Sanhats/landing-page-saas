"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContactTemplateProps {
  content: {
    title: string
    description: string
  }
  onEdit?: () => void
}

export function ContactTemplate({ content, onEdit }: ContactTemplateProps) {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3A6D8C]/10 via-background to-background" />
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#EAD8B1] sm:text-4xl">{content.title}</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{content.description}</p>
        </div>
        <form className="mx-auto max-w-xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="first-name">First name</Label>
              <Input type="text" name="first-name" id="first-name" autoComplete="given-name" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="last-name">Last name</Label>
              <Input type="text" name="last-name" id="last-name" autoComplete="family-name" className="mt-2" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" autoComplete="email" className="mt-2" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea name="message" id="message" rows={4} className="mt-2" />
            </div>
          </div>
          <div className="mt-10">
            <Button type="submit" className="w-full bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90">Send message</Button>
          </div>
        </form>
      </div>
      
      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-4 top-4"
          onClick={onEdit}
        >
          Edit Contact
        </Button>
      )}
    </section>
  )
}

