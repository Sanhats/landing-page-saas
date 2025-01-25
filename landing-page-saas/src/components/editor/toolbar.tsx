"use client"

import { useHotkeys } from "react-hotkeys-hook"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Undo2, Redo2, Save, Eye, Laptop, Tablet, Smartphone, RotateCcw } from "lucide-react"
import { useEditor } from "@/lib/editor-context"
import { cn } from "@/lib/utils"

interface ToolbarProps {
  className?: string
  onSave: () => Promise<void>
  onPreview: () => void
}

type DevicePreview = "desktop" | "tablet" | "mobile"

export function Toolbar({ className, onSave, onPreview }: ToolbarProps) {
  const { undo, redo, state } = useEditor()
  const canUndo = state.currentHistoryIndex > 0
  const canRedo = state.currentHistoryIndex < state.history.length - 1

  // Keyboard shortcuts
  useHotkeys("mod+z", (e) => {
    e.preventDefault()
    if (canUndo) undo()
  })

  useHotkeys("mod+shift+z", (e) => {
    e.preventDefault()
    if (canRedo) redo()
  })

  useHotkeys("mod+s", (e) => {
    e.preventDefault()
    onSave()
  })

  return (
    <div className={cn("flex items-center gap-2 p-2 border-b", className)}>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo}>
              <Undo2 className="h-4 w-4" />
              <span className="sr-only">Undo</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo (⌘Z)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={redo} disabled={!canRedo}>
              <Redo2 className="h-4 w-4" />
              <span className="sr-only">Redo</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo (⌘⇧Z)</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onPreview}>
              <Eye className="h-4 w-4" />
              <span className="sr-only">Preview</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Preview page</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => onSave()}>
              <Save className="h-4 w-4" />
              <span className="sr-only">Save</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save changes (⌘S)</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

