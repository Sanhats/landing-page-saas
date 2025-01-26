"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/components/ui/use-toast"

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("fullName") as string

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success",
        description: "Account created successfully. Please check your email to confirm your account.",
      })
      router.push("/auth/signin")
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-[#3A6D8C] bg-[#001F3F]/50 p-6">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold tracking-tight text-[#EAD8B1]">
            Create your account
          </CardTitle>
          <CardDescription className="text-center text-[#EAD8B1]/70">
            Sign up to get started with our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[#EAD8B1]">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="mt-1 border-[#3A6D8C] bg-[#001F3F]/50 focus:border-[#6A9AB0]"
                />
              </div>
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
                  autoComplete="new-password"
                  required
                  className="mt-1 border-[#3A6D8C] bg-[#001F3F]/50 focus:border-[#6A9AB0]"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-[#EAD8B1]/70">
            Already have an account?{" "}
            <Link href="/auth/signin" className="font-medium text-[#EAD8B1] hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

