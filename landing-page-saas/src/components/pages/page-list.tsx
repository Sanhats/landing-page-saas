"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { listLandingPages } from "@/lib/api/landing-pages"
import type { LandingPage } from "@/types/editor"

export function PageList() {
  const [pages, setPages] = useState<LandingPage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchPages = async () => {
      setIsLoading(true)
      try {
        const fetchedPages = await listLandingPages()
        setPages(fetchedPages)
      } catch (error) {
        console.error("Error fetching pages:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPages()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pages.map((page) => (
        <Card key={page.id} className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{page.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{page.description}</p>
            <Button onClick={() => router.push(`/dashboard/pages/${page.id}/editor`)}>Edit</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

