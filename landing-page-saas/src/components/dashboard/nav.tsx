"use client"

import { LayoutDashboard, FileEdit, Settings, Plus } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navigation = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Landing Pages",
    icon: FileEdit,
    href: "/dashboard/pages",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-white/[0.08] bg-secondary/50 backdrop-blur-xl">
      <SidebarHeader className="border-b border-white/[0.08] p-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-xl font-bold text-transparent"
          >
            LandingBuilder
          </Link>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link href="/dashboard/pages/new">
              <Plus className="mr-2 h-4 w-4" />
              New Page
            </Link>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    active={pathname === item.href}
                    className={`text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground ${
                      pathname === item.href ? 'bg-white/[0.08] text-foreground' : ''
                    }`}
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail className="bg-white/[0.08]" />
    </Sidebar>
  )
}

