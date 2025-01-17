import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { SideNav } from "@/components/dashboard/side-nav"

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <SideNav />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

