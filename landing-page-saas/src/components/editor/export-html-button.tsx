"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ExportHtmlButtonProps {
  pageId: string
}

export function ExportHtmlButton({ pageId }: ExportHtmlButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const response = await fetch(`/api/export/${pageId}`)

      if (!response.ok) {
        throw new Error("Failed to export HTML")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = "landing-page.html"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: "Your landing page has been exported as HTML.",
      })
    } catch (error) {
      console.error("Error exporting HTML:", error)
      toast({
        title: "Export Failed",
        description: "There was an error exporting your landing page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button onClick={handleExport} disabled={isExporting}>
      <Download className="mr-2 h-4 w-4" />
      {isExporting ? "Exporting..." : "Export HTML"}
    </Button>
  )
}

