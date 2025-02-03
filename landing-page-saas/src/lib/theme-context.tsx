"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Theme {
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    accent: string
    muted: string
  }
  typography: {
    fontFamily: {
      sans: string
      serif: string
      mono: string
    }
    fontSize: {
      base: string
      lg: string
      xl: string
      "2xl": string
      "3xl": string
    }
    fontWeight: {
      normal: string
      medium: string
      bold: string
    }
  }
  spacing: {
    small: string
    medium: string
    large: string
  }
  borderRadius: string
  boxShadow: string
}

const defaultTheme: Theme = {
  colors: {
    primary: "#3A6D8C",
    secondary: "#6A9AB0",
    background: "#FFFFFF",
    text: "#333333",
    accent: "#EAD8B1",
    muted: "#F3F4F6",
  },
  typography: {
    fontFamily: {
      sans: "Inter, sans-serif",
      serif: "Georgia, serif",
      mono: "Menlo, monospace",
    },
    fontSize: {
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "700",
    },
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
  },
  borderRadius: "0.375rem",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
}

interface ThemeContextType {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  initialTheme = defaultTheme,
}: { children: React.ReactNode; initialTheme?: Theme }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    // Actualizar las variables CSS cuando el tema cambie
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value)
    })
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

