"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { listLandingPages, deleteLandingPage } from "@/lib/api/landing-pages"
import type { LandingPage } from "@/types/editor"
import { Loader2, ExternalLink, Edit, Trash } from "lucide-react"
import { formatDate } from "@/lib/utils/date"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function PageList() {
  const [pages, setPages] = useState<LandingPage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pageToDelete, setPageToDelete] = useState<LandingPage | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const fetchPages = async () => {
    setIsLoading(true)
    try {
      const fetchedPages = await listLandingPages()
      setPages(fetchedPages)
      setError(null)
    } catch (error) {
      console.error("Error fetching pages:", error)
      setError("Failed to fetch pages. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPages()
  }, []) //Fixed: Added empty dependency array to useEffect

  const handleDelete = async () => {
    if (!pageToDelete) return

    setIsDeleting(true)
    try {
      await deleteLandingPage(pageToDelete.id)
      setPages(pages.filter((page) => page.id !== pageToDelete.id))
      toast({
        title: "Page deleted",
        description: `"${pageToDelete.title}" has been successfully deleted.`,
      })
    } catch (error) {
      console.error("Error deleting page:", error)
      toast({
        title: "Error",
        description: "Failed to delete the page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setPageToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
        <Button onClick={fetchPages} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (pages.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="mb-4">No pages found. Create your first landing page!</p>
        <Button onClick={() => router.push("/dashboard/pages/new")}>Create New Page</Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <Card key={page.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{page.title}</CardTitle>
              <CardDescription>{page.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    page.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {page.status}
                </span>
                <span className="text-sm text-muted-foreground">Updated: {formatDate(page.updatedAt)}</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => router.push(`/dashboard/pages/${page.id}/editor`)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                {page.status === "published" && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={`/preview/${page.id}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </a>
                  </Button>
                )}
                <Button size="sm" variant="destructive" onClick={() => setPageToDelete(page)}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!pageToDelete} onOpenChange={() => setPageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this page?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the page "{pageToDelete?.title}" and remove it
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

