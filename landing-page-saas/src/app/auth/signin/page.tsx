'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials')
        return
      }

      router.push('/dashboard')
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-[#3A6D8C] bg-[#001F3F]/50 p-6">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#EAD8B1]">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#EAD8B1]">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 border-[#3A6D8C] bg-[#001F3F]/50 focus:border-[#6A9AB0]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#EAD8B1]">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 border-[#3A6D8C] bg-[#001F3F]/50 focus:border-[#6A9AB0]"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90"
          >
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  )
}