'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Activity } from 'lucide-react'
import { getLandingPagesStats } from '@/lib/api/landing-pages'

type DashboardStats = {
  totalPages: {
    current: number
    change: number
  }
  totalViews: {
    current: number
    changePercentage: number
  }
  activePages: {
    current: number
    change: number
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getLandingPagesStats()
        setStats(data)
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your landing pages and activity
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPages.current}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalPages.change >= 0 ? '+' : ''}{stats?.totalPages.change} from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalViews.current}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalViews.changePercentage >= 0 ? '+' : ''}{stats?.totalViews.changePercentage.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Pages</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activePages.current}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.activePages.change >= 0 ? '+' : ''}{stats?.activePages.change} from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

