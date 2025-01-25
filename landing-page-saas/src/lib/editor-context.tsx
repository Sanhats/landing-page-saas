"use client"

import { createContext, useContext, useReducer, useCallback } from "react"
import type { EditorState, EditorContextType, EditorComponent, EditorHistory } from "@/types/editor"
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core"

const MAX_HISTORY = 50

type EditorAction =
  | { type: "ADD_COMPONENT"; component: EditorComponent }
  | { type: "REMOVE_COMPONENT"; id: string }
  | { type: "UPDATE_COMPONENT"; id: string; updates: Partial<EditorComponent> }
  | { type: "REORDER_COMPONENTS"; startIndex: number; endIndex: number }
  | { type: "SET_DRAGGING"; isDragging: boolean }
  | { type: "SELECT_COMPONENT"; id: string | null }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET_DRAG_STATE"; state: EditorState["dragState"] }
  | { type: "UPDATE_LAST_SAVED" }

const initialState: EditorState = {
  components: [],
  history: [],
  currentHistoryIndex: -1,
  isDragging: false,
  selectedComponent: null,
  dragState: null,
}

function addToHistory(state: EditorState, historyItem: EditorHistory): EditorState {
  // Remove any future history if we're not at the latest point
  const newHistory = state.history.slice(0, state.currentHistoryIndex + 1)

  // Add new history item
  newHistory.push(historyItem)

  // Keep only the last MAX_HISTORY items
  if (newHistory.length > MAX_HISTORY) {
    newHistory.shift()
  }

  return {
    ...state,
    history: newHistory,
    currentHistoryIndex: newHistory.length - 1,
  }
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "ADD_COMPONENT": {
      const newState = {
        ...state,
        components: [...state.components, action.component],
      }
      return addToHistory(newState, {
        timestamp: Date.now(),
        components: newState.components,
        type: "add",
        componentId: action.component.id,
      })
    }

    case "REMOVE_COMPONENT": {
      const newState = {
        ...state,
        components: state.components.filter((c) => c.id !== action.id),
      }
      return addToHistory(newState, {
        timestamp: Date.now(),
        components: newState.components,
        type: "remove",
        componentId: action.id,
      })
    }

    case "UPDATE_COMPONENT": {
      const newState = {
        ...state,
        components: state.components.map((component) =>
          component.id === action.id ? { ...component, ...action.updates } : component,
        ),
      }
      return addToHistory(newState, {
        timestamp: Date.now(),
        components: newState.components,
        type: "update",
        componentId: action.id,
      })
    }

    case "REORDER_COMPONENTS": {
      const { startIndex, endIndex } = action
      const result = Array.from(state.components)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)

      const newState = {
        ...state,
        components: result,
      }
      return addToHistory(newState, {
        timestamp: Date.now(),
        components: result,
        type: "reorder",
      })
    }

    case "SET_DRAGGING":
      return {
        ...state,
        isDragging: action.isDragging,
      }

    case "SELECT_COMPONENT":
      return {
        ...state,
        selectedComponent: action.id,
      }

    case "UNDO": {
      if (state.currentHistoryIndex <= 0) return state

      const newIndex = state.currentHistoryIndex - 1
      const previousState = state.history[newIndex]

      return {
        ...state,
        components: previousState.components,
        currentHistoryIndex: newIndex,
      }
    }

    case "REDO": {
      if (state.currentHistoryIndex >= state.history.length - 1) return state

      const newIndex = state.currentHistoryIndex + 1
      const nextState = state.history[newIndex]

      return {
        ...state,
        components: nextState.components,
        currentHistoryIndex: newIndex,
      }
    }

    case "SET_DRAG_STATE":
      return {
        ...state,
        dragState: action.state,
      }

    case "UPDATE_LAST_SAVED":
      return {
        ...state,
        lastSaved: Date.now(),
      }

    default:
      return state
  }
}

const EditorContext = createContext<EditorContextType | null>(null)

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  const addComponent = useCallback((component: EditorComponent) => {
    dispatch({ type: "ADD_COMPONENT", component })
  }, [])

  const removeComponent = useCallback((id: string) => {
    dispatch({ type: "REMOVE_COMPONENT", id })
  }, [])

  const updateComponent = useCallback((id: string, updates: Partial<EditorComponent>) => {
    dispatch({ type: "UPDATE_COMPONENT", id, updates })
  }, [])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    dispatch({ type: "SET_DRAGGING", isDragging: true })
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      dispatch({ type: "SET_DRAGGING", isDragging: false })

      const { active, over } = event
      if (over && active.id !== over.id) {
        const oldIndex = state.components.findIndex((item) => item.id === active.id)
        const newIndex = state.components.findIndex((item) => item.id === over.id)

        dispatch({
          type: "REORDER_COMPONENTS",
          startIndex: oldIndex,
          endIndex: newIndex,
        })
      }
    },
    [state.components],
  )

  const selectComponent = useCallback((id: string | null) => {
    dispatch({ type: "SELECT_COMPONENT", id })
  }, [])

  const undo = useCallback(() => {
    dispatch({ type: "UNDO" })
  }, [])

  const redo = useCallback(() => {
    dispatch({ type: "REDO" })
  }, [])

  const value = {
    state,
    addComponent,
    removeComponent,
    updateComponent,
    handleDragStart,
    handleDragEnd,
    selectComponent,
    undo,
    redo,
  }

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

export function useEditor() {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider")
  }
  return context
}

