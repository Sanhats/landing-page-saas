"use client"

import type React from "react"
import { useTheme } from "@/lib/theme-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Undo, Eye } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme()

  const handleColorChange = (colorKey: keyof typeof theme.colors) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      colors: {
        ...prevTheme.colors,
        [colorKey]: e.target.value,
      },
    }))
  }

  const handleTypographyChange = (category: keyof typeof theme.typography, key: string, value: string) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      typography: {
        ...prevTheme.typography,
        [category]: {
          ...prevTheme.typography[category],
          [key]: value,
        },
      },
    }))
  }

  const handleSpacingChange = (spacingKey: keyof typeof theme.spacing) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      spacing: {
        ...prevTheme.spacing,
        [spacingKey]: e.target.value,
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
    })
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="colors">
            <AccordionTrigger>Colors</AccordionTrigger>
            <AccordionContent>
              {Object.entries(theme.colors).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 mb-2">
                  <Label htmlFor={`color-${key}`} className="w-24">
                    {key}
                  </Label>
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
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="typography">
            <AccordionTrigger>Typography</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <Label>Font Family</Label>
                  {Object.entries(theme.typography.fontFamily).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2 mt-2">
                      <Label htmlFor={`font-family-${key}`} className="w-24">
                        {key}
                      </Label>
                      <Input
                        id={`font-family-${key}`}
                        value={value}
                        onChange={(e) => handleTypographyChange("fontFamily", key, e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <Label>Font Size</Label>
                  {Object.entries(theme.typography.fontSize).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2 mt-2">
                      <Label htmlFor={`font-size-${key}`} className="w-24">
                        {key}
                      </Label>
                      <Input
                        id={`font-size-${key}`}
                        value={value}
                        onChange={(e) => handleTypographyChange("fontSize", key, e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <Label>Font Weight</Label>
                  {Object.entries(theme.typography.fontWeight).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2 mt-2">
                      <Label htmlFor={`font-weight-${key}`} className="w-24">
                        {key}
                      </Label>
                      <Select
                        value={value}
                        onValueChange={(newValue) => handleTypographyChange("fontWeight", key, newValue)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue>{value}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">Thin (100)</SelectItem>
                          <SelectItem value="200">Extra Light (200)</SelectItem>
                          <SelectItem value="300">Light (300)</SelectItem>
                          <SelectItem value="400">Normal (400)</SelectItem>
                          <SelectItem value="500">Medium (500)</SelectItem>
                          <SelectItem value="600">Semi Bold (600)</SelectItem>
                          <SelectItem value="700">Bold (700)</SelectItem>
                          <SelectItem value="800">Extra Bold (800)</SelectItem>
                          <SelectItem value="900">Black (900)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="spacing">
            <AccordionTrigger>Spacing</AccordionTrigger>
            <AccordionContent>
              {Object.entries(theme.spacing).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 mb-2">
                  <Label htmlFor={`spacing-${key}`} className="w-24">
                    {key}
                  </Label>
                  <Input
                    id={`spacing-${key}`}
                    value={value}
                    onChange={handleSpacingChange(key as keyof typeof theme.spacing)}
                    className="flex-1"
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="other">
            <AccordionTrigger>Other</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="border-radius" className="w-24">
                    Border Radius
                  </Label>
                  <Input
                    id="border-radius"
                    value={theme.borderRadius}
                    onChange={(e) => setTheme((prevTheme) => ({ ...prevTheme, borderRadius: e.target.value }))}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="box-shadow" className="w-24">
                    Box Shadow
                  </Label>
                  <Input
                    id="box-shadow"
                    value={theme.boxShadow}
                    onChange={(e) => setTheme((prevTheme) => ({ ...prevTheme, boxShadow: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button onClick={resetTheme} variant="outline" className="w-full">
          <Undo className="mr-2 h-4 w-4" />
          Reset to Default Theme
        </Button>
      </div>
    </ScrollArea>
  )
}

