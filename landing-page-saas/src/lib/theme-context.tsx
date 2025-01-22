import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Theme {
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    accent: string
  }
  fonts: {
    body: string
    heading: string
  }
  borderRadius: string
  boxShadow: string
  spacing: {
    small: string
    medium: string
    large: string
  }
  button: {
    backgroundColor: string
    textColor: string
    hoverBackgroundColor: string
  }
}

const defaultTheme: Theme = {
  colors: {
    primary: "#3A6D8C",
    secondary: "#6A9AB0",
    background: "#FFFFFF",
    text: "#333333",
    accent: "#EAD8B1",
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Poppins, sans-serif",
  },
  borderRadius: "0.25rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  spacing: {
    small: "1rem",
    medium: "2rem",
    large: "3rem",
  },
  button: {
    backgroundColor: "#3A6D8C",
    textColor: "#FFFFFF",
    hoverBackgroundColor: "#2A5D7C",
  },
}

interface ThemeContextType {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

