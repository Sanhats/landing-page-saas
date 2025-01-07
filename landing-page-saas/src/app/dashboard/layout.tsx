import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { SideNav } from "@/components/dashboard/side-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    console.log('No valid session in dashboard layout, redirecting...')
    redirect('/auth/signin')
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <SideNav />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

