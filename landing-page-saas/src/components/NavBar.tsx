"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#3A6D8C] bg-[#001F3F]/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-[#6A9AB0] to-[#EAD8B1] bg-clip-text text-xl font-bold text-transparent">
                LandingBuilder
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-[#EAD8B1]">
                Features
              </Link>
              <Link href="#templates" className="text-sm text-muted-foreground hover:text-[#EAD8B1]">
                Templates
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-[#EAD8B1]">
                Pricing
              </Link>
              <Button variant="ghost" className="text-sm hover:text-[#EAD8B1]">
                Sign In
              </Button>
              <Button className="text-sm bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90">
                Get Started
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 hover:text-[#EAD8B1]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="#features"
              className="block rounded-md px-3 py-2 text-base text-muted-foreground hover:bg-[#3A6D8C]/20 hover:text-[#EAD8B1]"
            >
              Features
            </Link>
            <Link
              href="#templates"
              className="block rounded-md px-3 py-2 text-base text-muted-foreground hover:bg-[#3A6D8C]/20 hover:text-[#EAD8B1]"
            >
              Templates
            </Link>
            <Link
              href="#pricing"
              className="block rounded-md px-3 py-2 text-base text-muted-foreground hover:bg-[#3A6D8C]/20 hover:text-[#EAD8B1]"
            >
              Pricing
            </Link>
            <Button variant="ghost" className="w-full justify-start text-base hover:text-[#EAD8B1]">
              Sign In
            </Button>
            <Button className="mt-2 w-full text-base bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

