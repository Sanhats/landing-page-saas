"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react'
import { signOut } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Landing Pages",
    icon: FileText,
    href: "/dashboard/pages",
    color: "text-violet-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-gray-500",
  },
]

export function SideNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/auth/signin')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex h-full w-72 flex-col border-r bg-gray-100/40 p-4">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex h-14 items-center border-b px-2 font-semibold">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-[#6A9AB0] to-[#EAD8B1] bg-clip-text text-xl font-bold text-transparent">
              LandingBuilder
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn("justify-start", pathname === route.href && "bg-gray-200/80")}
              asChild
            >
              <Link href={route.href}>
                <route.icon className={cn("mr-2 h-5 w-5", route.color)} />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex flex-col gap-2 border-t pt-4">
          <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

