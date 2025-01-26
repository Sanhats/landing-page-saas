import { useHotkeys } from "react-hotkeys-hook"
import { useCallback } from "react"

interface EditorShortcutsOptions {
  onSave: () => void
  onUndo: () => void
  onRedo: () => void
  onPreview: () => void
  canUndo: boolean
  canRedo: boolean
}

export function useEditorShortcuts({ onSave, onUndo, onRedo, onPreview, canUndo, canRedo }: EditorShortcutsOptions) {
  const handleSave = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      onSave()
    },
    [onSave],
  )

  const handleUndo = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      if (canUndo) onUndo()
    },
    [canUndo, onUndo],
  )

  const handleRedo = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      if (canRedo) onRedo()
    },
    [canRedo, onRedo],
  )

  const handlePreview = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      onPreview()
    },
    [onPreview],
  )

  // Registrar atajos de teclado
  useHotkeys("mod+s", handleSave, { enableOnFormTags: true })
  useHotkeys("mod+z", handleUndo, { enableOnFormTags: true })
  useHotkeys("mod+shift+z", handleRedo, { enableOnFormTags: true })
  useHotkeys("mod+p", handlePreview, { enableOnFormTags: true })

  return null
}

