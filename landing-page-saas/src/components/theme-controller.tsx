import type React from "react"
import { useTheme, type Theme } from "@/lib/theme-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const ThemeController: React.FC = () => {
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

  return (
    <div className="p-4 bg-gray-600 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="colors">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            {Object.entries(theme.colors).map(([key, value]) => (
              <div key={key} className="flex items-center mb-2">
                <Label htmlFor={`color-${key}`} className="w-24">
                  {key}
                </Label>
                <Input
                  type="color"
                  id={`color-${key}`}
                  value={value}
                  onChange={handleColorChange(key as keyof Theme["colors"])}
                  className="w-16 h-8"
                />
                <Input
                  type="text"
                  value={value}
                  onChange={handleColorChange(key as keyof Theme["colors"])}
                  className="ml-2 w-28"
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="fonts">
          <AccordionTrigger>Fonts</AccordionTrigger>
          <AccordionContent>
            {Object.entries(theme.fonts).map(([key, value]) => (
              <div key={key} className="flex items-center mb-2">
                <Label htmlFor={`font-${key}`} className="w-24">
                  {key}
                </Label>
                <Input
                  type="text"
                  id={`font-${key}`}
                  value={value}
                  onChange={handleFontChange(key as keyof Theme["fonts"])}
                  className="flex-grow"
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="spacing">
          <AccordionTrigger>Spacing</AccordionTrigger>
          <AccordionContent>
            {Object.entries(theme.spacing).map(([key, value]) => (
              <div key={key} className="flex items-center mb-2">
                <Label htmlFor={`spacing-${key}`} className="w-24">
                  {key}
                </Label>
                <Input
                  type="text"
                  id={`spacing-${key}`}
                  value={value}
                  onChange={handleSpacingChange(key as keyof Theme["spacing"])}
                  className="flex-grow"
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="button">
          <AccordionTrigger>Button</AccordionTrigger>
          <AccordionContent>
            {Object.entries(theme.button).map(([key, value]) => (
              <div key={key} className="flex items-center mb-2">
                <Label htmlFor={`button-${key}`} className="w-24">
                  {key}
                </Label>
                <Input
                  type="color"
                  id={`button-${key}`}
                  value={value}
                  onChange={handleButtonChange(key as keyof Theme["button"])}
                  className="w-16 h-8"
                />
                <Input
                  type="text"
                  value={value}
                  onChange={handleButtonChange(key as keyof Theme["button"])}
                  className="ml-2 w-28"
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

