"use client"

import { Button } from "@/components/ui/button"
import { Laptop, Tablet, Smartphone } from "lucide-react"
import type { PreviewMode } from "@/types/editor"

interface PreviewToolbarProps {
  mode: PreviewMode
  onModeChange: (mode: PreviewMode) => void
}

export function PreviewToolbar({ mode, onModeChange }: PreviewToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <Button variant={mode === "desktop" ? "secondary" : "ghost"} size="sm" onClick={() => onModeChange("desktop")}>
        <Laptop className="h-4 w-4" />
        <span className="sr-only">Desktop view</span>
      </Button>
      <Button variant={mode === "tablet" ? "secondary" : "ghost"} size="sm" onClick={() => onModeChange("tablet")}>
        <Tablet className="h-4 w-4" />
        <span className="sr-only">Tablet view</span>
      </Button>
      <Button variant={mode === "mobile" ? "secondary" : "ghost"} size="sm" onClick={() => onModeChange("mobile")}>
        <Smartphone className="h-4 w-4" />
        <span className="sr-only">Mobile view</span>
      </Button>
    </div>
  )
}

