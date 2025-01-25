"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Laptop, Tablet, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

interface PreviewPanelProps {
  className?: string
  children: React.ReactNode
}

type DeviceSize = "desktop" | "tablet" | "mobile"

const deviceSizes: Record<DeviceSize, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
}

export function PreviewPanel({ className, children }: PreviewPanelProps) {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>("desktop")

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-center gap-2 p-2 border-b">
        <Button
          variant={deviceSize === "desktop" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => setDeviceSize("desktop")}
        >
          <Laptop className="h-4 w-4" />
          <span className="sr-only">Desktop view</span>
        </Button>
        <Button
          variant={deviceSize === "tablet" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => setDeviceSize("tablet")}
        >
          <Tablet className="h-4 w-4" />
          <span className="sr-only">Tablet view</span>
        </Button>
        <Button
          variant={deviceSize === "mobile" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => setDeviceSize("mobile")}
        >
          <Smartphone className="h-4 w-4" />
          <span className="sr-only">Mobile view</span>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div
          className="mx-auto transition-all duration-200 ease-in-out"
          style={{
            width: deviceSizes[deviceSize],
            maxWidth: "100%",
          }}
        >
          {children}
        </div>
      </ScrollArea>
    </div>
  )
}

