"use client"

import { cn } from "@/lib/utils"
import type { PreviewMode } from "@/types/editor"

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

