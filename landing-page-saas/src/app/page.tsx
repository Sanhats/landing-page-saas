import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Laptop, Book, Users, Trophy, ArrowRight } from 'lucide-react'
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),theme(colors.background))]" />
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Unlock Your Ultimate Knowledge Potential
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Create stunning landing pages in minutes with our intuitive drag-and-drop builder. No coding required.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to build amazing landing pages
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our platform provides all the tools you need to create high-converting landing pages.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Drag & Drop Builder",
                  description: "Intuitive interface for easy page building",
                  icon: Laptop,
                },
                {
                  title: "Pre-made Templates",
                  description: "Start with professional designs",
                  icon: Book,
                },
                {
                  title: "Team Collaboration",
                  description: "Work together seamlessly",
                  icon: Users,
                },
                {
                  title: "High Conversion",
                  description: "Optimized for maximum results",
                  icon: Trophy,
                },
              ].map((feature) => (
                <Card key={feature.title} className="gradient-border p-0">
                  <div className="p-6">
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Learning Without Limits
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Create beautiful, responsive landing pages that convert visitors into customers. Our platform makes it easy to build and deploy professional pages in minutes.
              </p>
              <div className="mt-10">
                <Button variant="outline" className="gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { color: "from-blue-500 to-cyan-500", label: "Templates" },
                { color: "from-purple-500 to-pink-500", label: "Components" },
                { color: "from-orange-500 to-red-500", label: "Analytics" },
                { color: "from-green-500 to-emerald-500", label: "Support" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="gradient-border p-0 aspect-square"
                >
                  <div className="h-full w-full p-6 flex items-center justify-center">
                    <p className="text-lg font-semibold">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative isolate py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join thousands of creators who are building their online presence with our platform.
            </p>
          </div>
          <form className="mx-auto mt-16 max-w-xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6">
                  First name
                </label>
                <div className="mt-2.5">
                  <Input type="text" name="first-name" id="first-name" />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6">
                  Last name
                </label>
                <div className="mt-2.5">
                  <Input type="text" name="last-name" id="last-name" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6">
                  Email
                </label>
                <div className="mt-2.5">
                  <Input type="email" name="email" id="email" />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Button type="submit" className="w-full">
                Get Started
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary mt-auto">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {[
              { name: 'Twitter', href: '#' },
              { name: 'GitHub', href: '#' },
              { name: 'Discord', href: '#' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-muted-foreground">
              &copy; 2024 Your Company, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

