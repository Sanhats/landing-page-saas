'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientSideSupabaseClient } from '@/lib/supabase-client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 1000; // 1 second

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [backoffTime, setBackoffTime] = useState(0)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (backoffTime > 0) {
      timer = setTimeout(() => setBackoffTime(prev => Math.max(0, prev - 1000)), 1000)
    }
    return () => clearTimeout(timer)
  }, [backoffTime])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (backoffTime > 0) {
      toast({
        title: "Too many attempts",
        description: `Please wait ${backoffTime / 1000} seconds before trying again.`,
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)

    try {
      console.log('Attempting to sign in...')
      const supabase = createClientSideSupabaseClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      console.log('Sign in successful:', data)

      if (data.session) {
        console.log('Valid session obtained, redirecting...')
        router.push('/dashboard')
      } else {
        throw new Error('No session obtained after sign in')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      if (error instanceof Error && error.message.includes('rate limit')) {
        handleRateLimitError()
      } else {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to sign in",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRateLimitError = () => {
    const newRetryCount = retryCount + 1
    setRetryCount(newRetryCount)
    
    if (newRetryCount <= MAX_RETRIES) {
      const newBackoffTime = INITIAL_BACKOFF * Math.pow(2, newRetryCount - 1)
      setBackoffTime(newBackoffTime)
      toast({
        title: "Too many attempts",
        description: `Please wait ${newBackoffTime / 1000} seconds before trying again.`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Maximum retries reached",
        description: "Please try again later or contact support.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/auth/signup')}
              disabled={isLoading || backoffTime > 0}
            >
              Sign Up
            </Button>
            <Button type="submit" disabled={isLoading || backoffTime > 0}>
              {isLoading ? "Signing in..." : backoffTime > 0 ? `Wait ${backoffTime / 1000}s` : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

