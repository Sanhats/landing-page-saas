"use client"

import { LayoutDashboard, FileEdit, Settings, Plus } from 'lucide-react'
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
    <Sidebar className="border-r border-[#3A6D8C]/20 bg-[#001F3F]/80 backdrop-blur-sm">
      <SidebarHeader className="border-b border-[#3A6D8C]/20 p-4">
        <div className="flex items-center justify-between">
          <span className="bg-gradient-to-r from-[#6A9AB0] to-[#EAD8B1] bg-clip-text text-xl font-bold text-transparent">
            LandingBuilder
          </span>
          <Button
            size="sm"
            className="bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Page
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#6A9AB0]">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    active={pathname === item.href}
                    className={`text-[#6A9AB0] hover:bg-[#3A6D8C]/20 ${
                      pathname === item.href ? 'bg-[#3A6D8C]/20 text-[#EAD8B1]' : ''
                    }`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail className="bg-[#3A6D8C]/20" />
    </Sidebar>
  )
}

