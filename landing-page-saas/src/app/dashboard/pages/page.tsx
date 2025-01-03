import { Button } from "@/components/ui/button"
import { PagesList } from "@/components/pages/pages-list"
import { Plus } from 'lucide-react'
import Link from "next/link"

export default function PagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Landing Pages</h1>
          <p className="text-muted-foreground">
            Create and manage your landing pages
          </p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          asChild
        >
          <Link href="/dashboard/pages/new">
            <Plus className="mr-2 h-4 w-4" />
            New Page
          </Link>
        </Button>
      </div>
      <PagesList />
    </div>
  )
}

