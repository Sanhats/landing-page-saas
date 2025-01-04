import { SessionProvider } from "@/components/auth/session-provider"
import { SideNav } from "@/components/dashboard/side-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        <SideNav />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </SessionProvider>
  )
}

