"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"

export default function NewPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement create functionality with Supabase
      router.push("/dashboard/pages")
    } catch (error) {
      console.error("Error creating page:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/[0.08]"
          asChild
        >
          <Link href="/dashboard/pages">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Landing Page</h1>
          <p className="text-muted-foreground">
            Create a new landing page from scratch or start with a template
          </p>
        </div>
      </div>

      <Card className="bg-card-gradient backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-8 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter page title"
                required
                className="border-white/[0.08] bg-white/[0.02] focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter page description"
                required
                className="border-white/[0.08] bg-white/[0.02] focus-visible:ring-primary"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              className="border-white/[0.08] hover:bg-white/[0.08]"
              asChild
            >
              <Link href="/dashboard/pages">Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? "Creating..." : "Create Page"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

