"use client"

import { Button } from "@/components/ui/button"
import { Laptop, Tablet, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"
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

interface PreviewFrameProps {
  mode: PreviewMode
  children: React.ReactNode
}

const previewSizes: Record<PreviewMode, string> = {
  desktop: "w-full",
  tablet: "w-[768px]",
  mobile: "w-[375px]",
}

export function PreviewFrame({ mode, children }: PreviewFrameProps) {
  return (
    <div className="flex justify-center overflow-x-auto bg-background/50 backdrop-blur">
      <div className={cn("min-h-[500px] transition-all duration-200", previewSizes[mode])}>{children}</div>
    </div>
  )
}

