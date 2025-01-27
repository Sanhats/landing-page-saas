"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface ExportHtmlButtonProps {
  pageId: string
}

export function ExportHtmlButton({ pageId }: ExportHtmlButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Get current session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session) {
        throw new Error("No active session. Please log in.")
      }

      // Make the export request
      const response = await fetch(`/api/export/${pageId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Export error response:", errorData)
        throw new Error(errorData.error || "Failed to export HTML")
      }

      // Handle successful response
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = "landing-page.html"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Success",
        description: "Your landing page has been exported as HTML.",
      })
    } catch (error) {
      console.error("Export error:", error)
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to export HTML. Please try again.",
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

