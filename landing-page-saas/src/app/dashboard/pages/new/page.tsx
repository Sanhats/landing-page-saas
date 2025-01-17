"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { createLandingPage } from "@/lib/api/landing-pages"
import { useToast } from "@/components/ui/use-toast"
import { getCurrentUser } from "@/lib/supabase-client"

export default function NewPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser()
      if (!user) {
        router.replace('/auth/signin')
      } else {
        setIsAuthenticated(true)
      }
    }
    checkAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      toast({
        title: "Error",
        description: "You must be logged in to create a page",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const title = formData.get('title') as string
      const description = formData.get('description') as string

      if (!title) {
        throw new Error('Title is required')
      }

      const page = await createLandingPage({ title, description })
      
      toast({
        title: "Success",
        description: "Landing page created successfully",
      })

      router.push(`/dashboard/pages/${page.id}/editor`)
    } catch (error) {
      console.error("Error creating page:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create landing page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
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
              <Link href="/dashboard/pages">Cancelar</Link>
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

