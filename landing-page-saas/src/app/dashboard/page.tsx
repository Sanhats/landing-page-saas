'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Activity } from 'lucide-react'
import { getLandingPagesStats } from '@/lib/api/landing-pages'
import { useToast } from "@/components/ui/use-toast"
import { getSession } from '@/lib/auth'

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
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    async function checkSession() {
      const session = await getSession()
      if (!session) {
        router.push('/auth/signin')
      } else {
        setUserEmail(session.user.email)
      }
    }

    async function loadStats() {
      try {
        const data = await getLandingPagesStats()
        setStats(data)
      } catch (error) {
        console.error('Error loading stats:', error)
        toast({
          title: "Error",
          description: "Failed to load dashboard stats. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
    loadStats()
  }, [router, toast])

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Loading stats...</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <div className="h-4 w-24 bg-muted rounded" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your landing page dashboard, {userEmail}
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

