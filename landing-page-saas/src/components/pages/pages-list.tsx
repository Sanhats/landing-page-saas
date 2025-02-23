"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Eye, MoreVertical, Pencil, Trash2, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { getUserLandingPages, deleteLandingPage } from "@/lib/api/landing-pages"
import { formatDate } from "@/lib/utils/date"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { createClientSideSupabaseClient } from '@/lib/supabase-client'

type LandingPage = {
  id: string
  title: string
  description: string
  status: "draft" | "published"
  views: number
  slug?: string
  created_at: string
  updated_at: string
}

export function PagesList() {
  const [pages, setPages] = useState<LandingPage[]>([])
  const [pageToDelete, setPageToDelete] = useState<LandingPage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const checkAuthAndLoadPages = async () => {
      const supabase = createClientSideSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/auth/signin')
        return
      }

      loadPages()
    }

    checkAuthAndLoadPages()
  }, [router])

  const loadPages = async () => {
    setIsLoading(true)
    try {
      const data = await getUserLandingPages()
      setPages(data)
    } catch (error) {
      console.error("Error loading pages:", error)
      toast({
        title: "Error",
        description: "Failed to load pages. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!pageToDelete) return
    try {
      await deleteLandingPage(pageToDelete.id)
      setPages(pages.filter(page => page.id !== pageToDelete.id))
      toast({
        title: "Success",
        description: "Page deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting page:", error)
      toast({
        title: "Error",
        description: "Failed to delete page. Please try again.",
        variant: "destructive",
      })
    }
    setPageToDelete(null)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (pages.length === 0) {
    return <div>No pages found. Create your first landing page!</div>
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pages.map(page => (
          <Card key={page.id} className="bg-card-gradient backdrop-blur-sm">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle>{page.title}</CardTitle>
                <CardDescription>{page.description}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-white/[0.08]"
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/pages/${page.id}/editor`}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/pages/${page.id}/preview`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Link>
                  </DropdownMenuItem>
                  {page.status === "published" && page.slug && (
                    <DropdownMenuItem asChild>
                      <Link href={`/p/${page.slug}`} target="_blank">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={() => setPageToDelete(page)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      page.status === "published"
                        ? "bg-green-400/10 text-green-400 ring-green-400/20"
                        : "bg-yellow-400/10 text-yellow-400 ring-yellow-400/20"
                    }`}
                  >
                    {page.status}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {page.views} views
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Updated {formatDate(page.updated_at)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!pageToDelete} onOpenChange={() => setPageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the landing
              page and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

