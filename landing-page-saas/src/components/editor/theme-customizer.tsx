"use client"

import { useState } from "react"
import { useTheme } from "@/lib/theme-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EyeIcon as EyeDropperIcon, UndoIcon } from "lucide-react"

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme()
  const [expandedSection, setExpandedSection] = useState<string | null>("colors")

  const handleColorChange = (colorKey: keyof typeof theme.colors) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      colors: {
        ...prevTheme.colors,
        [colorKey]: e.target.value,
      },
    }))
  }

  const handleFontChange = (fontKey: keyof typeof theme.fonts) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      fonts: {
        ...prevTheme.fonts,
        [fontKey]: e.target.value,
      },
    }))
  }

  const resetTheme = () => {
    setTheme({
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
    })
  }

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible value={expandedSection} onValueChange={setExpandedSection}>
        <AccordionItem value="colors">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            {Object.entries(theme.colors).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2 mb-2">
                <Label htmlFor={`color-${key}`}>{key}</Label>
                <div className="flex-1 relative">
                  <Input
                    id={`color-${key}`}
                    type="color"
                    value={value}
                    onChange={handleColorChange(key as keyof typeof theme.colors)}
                    className="w-full h-8"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      // Implement color picker functionality
                    }}
                  >
                    <EyeDropperIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="fonts">
          <AccordionTrigger>Fonts</AccordionTrigger>
          <AccordionContent>
            {Object.entries(theme.fonts).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2 mb-2">
                <Label htmlFor={`font-${key}`}>{key}</Label>
                <Input
                  id={`font-${key}`}
                  type="text"
                  value={value}
                  onChange={handleFontChange(key as keyof typeof theme.fonts)}
                  className="flex-1"
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button onClick={resetTheme} variant="outline" className="w-full">
        <UndoIcon className="mr-2 h-4 w-4" />
        Reset to Default Theme
      </Button>
    </div>
  )
}

