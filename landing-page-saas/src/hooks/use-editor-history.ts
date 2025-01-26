import { useState, useCallback } from "react"
import type { EditorComponent } from "@/types/editor"

interface HistoryEntry {
  components: EditorComponent[]
  timestamp: number
}

export function useEditorHistory(initialComponents: EditorComponent[]) {
  const [history, setHistory] = useState<HistoryEntry[]>([{ components: initialComponents, timestamp: Date.now() }])
  const [currentIndex, setCurrentIndex] = useState(0)

  const addToHistory = useCallback(
    (components: EditorComponent[]) => {
      setHistory((prev) => {
        // Remove any future history if we're not at the latest point
        const newHistory = prev.slice(0, currentIndex + 1)

        // Add new history entry
        return [...newHistory, { components, timestamp: Date.now() }]
      })
      setCurrentIndex((prev) => prev + 1)
    },
    [currentIndex],
  )

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      return history[currentIndex - 1].components
    }
    return null
  }, [currentIndex, history])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      return history[currentIndex + 1].components
    }
    return null
  }, [currentIndex, history])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  return {
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    currentEntry: history[currentIndex],
    historyLength: history.length,
  }
}

