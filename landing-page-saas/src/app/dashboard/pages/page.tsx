import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react'

export default function PagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[#EAD8B1]">
          Landing Pages
        </h1>
        <Button className="bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90">
          <Plus className="mr-2 h-4 w-4" />
          New Page
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Landing Page 1",
            description: "A beautiful landing page for product X",
            status: "published",
            views: 123,
          },
          {
            title: "Landing Page 2",
            description: "Landing page for service Y",
            status: "draft",
            views: 0,
          },
          {
            title: "Landing Page 3",
            description: "Campaign landing page",
            status: "published",
            views: 456,
          },
        ].map((page, index) => (
          <Card
            key={index}
            className="border-[#3A6D8C] bg-[#001F3F]/50 transition-all hover:bg-[#001F3F]/70"
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-[#EAD8B1]">
                  {page.title}
                </CardTitle>
                <CardDescription>{page.description}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-[#EAD8B1]"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[160px] bg-[#001F3F] text-[#EAD8B1]"
                >
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                    page.status === "published"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {page.status}
                </span>
                <span className="text-muted-foreground">
                  {page.views} views
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

