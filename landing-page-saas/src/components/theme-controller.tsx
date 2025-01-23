"use client"

import { useTheme, type Theme } from "@/lib/theme-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { EyeIcon as EyeDropper, Undo } from "lucide-react"

export function ThemeController() {
  const { theme, setTheme } = useTheme()

  const handleColorChange = (colorKey: keyof Theme["colors"]) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      colors: {
        ...prevTheme.colors,
        [colorKey]: e.target.value,
      },
    }))
  }

  const handleFontChange = (fontKey: keyof Theme["fonts"]) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      fonts: {
        ...prevTheme.fonts,
        [fontKey]: e.target.value,
      },
    }))
  }

  const handleSpacingChange = (spacingKey: keyof Theme["spacing"]) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      spacing: {
        ...prevTheme.spacing,
        [spacingKey]: e.target.value,
      },
    }))
  }

  const handleButtonChange = (buttonKey: keyof Theme["button"]) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      button: {
        ...prevTheme.button,
        [buttonKey]: e.target.value,
      },
    }))
  }

  const resetTheme = (section: keyof Theme) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      [section]: defaultTheme[section],
    }))
  }

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="colors">
          <AccordionTrigger className="text-sm hover:no-underline">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {Object.values(theme.colors).map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-border shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span>Colors</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Color Palette</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground"
                  onClick={() => resetTheme("colors")}
                >
                  <Undo className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              {Object.entries(theme.colors).map(([key, value]) => (
                <div key={key} className="grid gap-2">
                  <Label className="text-xs capitalize flex items-center justify-between">
                    {key}
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <EyeDropper className="h-3 w-3" />
                    </Button>
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Input
                        type="color"
                        value={value}
                        onChange={handleColorChange(key as keyof Theme["colors"])}
                        className="absolute inset-0 opacity-0"
                      />
                      <div
                        className="w-8 h-8 rounded-md border border-border shadow-sm"
                        style={{ backgroundColor: value }}
                      />
                    </div>
                    <Input
                      value={value}
                      onChange={handleColorChange(key as keyof Theme["colors"])}
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fonts">
          <AccordionTrigger className="text-sm">Fonts</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {Object.entries(theme.fonts).map(([key, value]) => (
                <div key={key} className="grid gap-2">
                  <Label htmlFor={`font-${key}`} className="capitalize">
                    {key}
                  </Label>
                  <Input
                    type="text"
                    id={`font-${key}`}
                    value={value}
                    onChange={handleFontChange(key as keyof Theme["fonts"])}
                  />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="spacing">
          <AccordionTrigger className="text-sm">Spacing</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {Object.entries(theme.spacing).map(([key, value]) => (
                <div key={key} className="grid gap-2">
                  <Label htmlFor={`spacing-${key}`} className="capitalize">
                    {key}
                  </Label>
                  <Input
                    type="text"
                    id={`spacing-${key}`}
                    value={value}
                    onChange={handleSpacingChange(key as keyof Theme["spacing"])}
                  />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="button">
          <AccordionTrigger className="text-sm">Button Styles</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {Object.entries(theme.button).map(([key, value]) => (
                <div key={key} className="grid gap-2">
                  <Label htmlFor={`button-${key}`} className="capitalize">
                    {key}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id={`button-${key}`}
                      value={value}
                      onChange={handleButtonChange(key as keyof Theme["button"])}
                      className="w-12 h-8 p-0"
                    />
                    <Input
                      type="text"
                      value={value}
                      onChange={handleButtonChange(key as keyof Theme["button"])}
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

const defaultTheme = {
  colors: {
    primary: "#3A6D8C",
    secondary: "#6A9AB0",
    background: "#FFFFFF",
    text: "#333333",
    accent: "#EAD8B1",
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "system-ui, sans-serif",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
    xl: "4rem",
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
  },
}

