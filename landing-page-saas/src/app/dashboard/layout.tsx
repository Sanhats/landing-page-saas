import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { SideNav } from "@/components/dashboard/side-nav"
import { checkAuthentication, verifyDatabaseSetup } from '@/lib/auth-check'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('Dashboard layout: Checking authentication...')
  const session = await getSession()
  
  if (!session) {
    console.log('No session found, redirecting to signin...')
    redirect('/auth/signin')
  }
  
  const [isAuthenticated, isDatabaseSetup] = await Promise.all([
    checkAuthentication(),
    verifyDatabaseSetup()
  ])

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to signin...')
    redirect('/auth/signin')
  }

  if (!isDatabaseSetup) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold text-red-500">Database Setup Error</h1>
        <p className="mt-2">
          There seems to be an issue with the database configuration. 
          Please ensure that:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>The landing_pages table exists in your Supabase database</li>
          <li>Row Level Security (RLS) policies are properly configured</li>
          <li>Your authentication tokens are valid</li>
        </ul>
      </div>
    )
  }

  console.log('Dashboard layout: Authentication successful')

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <SideNav />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

