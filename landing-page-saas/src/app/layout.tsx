import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import { SessionProvider } from '@/components/SessionProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Landing Page Builder',
  description: 'Create beautiful landing pages with ease',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <AuthProvider>{children}</AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

