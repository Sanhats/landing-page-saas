import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Laptop, Book, Users, Trophy, ArrowRight, Sparkles } from 'lucide-react'
import { Navbar } from "@/components/Navbar"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full bg-background">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#3A6D8C]/20 via-background to-background" />
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#6A9AB0]/20 via-background to-background" />
          </div>
        </div>
        
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="absolute -top-48 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[#3A6D8C]/20 blur-3xl" />
          <div className="absolute -bottom-48 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[#6A9AB0]/20 blur-3xl" />
          
          <h1 className="animate-fade-up bg-gradient-to-r from-[#6A9AB0] via-[#3A6D8C] to-[#EAD8B1] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            Unlock Your Ultimate Knowledge Potential
          </h1>
          
          <p className="mt-6 animate-fade-up text-lg leading-8 text-muted-foreground [animation-delay:200ms]">
            Create stunning landing pages in minutes with our intuitive drag-and-drop builder. No coding required.
          </p>
          
          <div className="mt-10 flex animate-fade-up items-center justify-center gap-x-6 [animation-delay:400ms]">
            <Button size="lg" className="group relative overflow-hidden rounded-full bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90">
              <span className="relative flex items-center gap-2">
                Get Started <Sparkles className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full bg-background">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3A6D8C]/10 via-background to-background" />
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#EAD8B1] sm:text-4xl">
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
              ].map((feature, index) => (
                <Card 
                  key={feature.title}
                  className="group relative overflow-hidden border-[#3A6D8C] bg-[#001F3F]/50 transition-all duration-300 hover:scale-105 hover:bg-[#001F3F]/80"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3A6D8C]/10 to-[#6A9AB0]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative p-6">
                    <feature.icon className="h-12 w-12 text-[#EAD8B1] mb-4" />
                    <h3 className="text-xl font-semibold text-[#EAD8B1]">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section id="templates" className="relative py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full bg-background">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#6A9AB0]/10 via-background to-background" />
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#EAD8B1] sm:text-4xl">
                Learning Without Limits
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Create beautiful, responsive landing pages that convert visitors into customers. Our platform makes it easy to build and deploy professional pages in minutes.
              </p>
              <div className="mt-10">
                <Button variant="outline" className="group relative overflow-hidden border-[#3A6D8C] hover:border-[#6A9AB0]">
                  <span className="relative flex items-center gap-2">
                    Learn More <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { gradient: "from-[#3A6D8C] to-[#6A9AB0]", label: "Templates" },
                { gradient: "from-[#001F3F] to-[#3A6D8C]", label: "Components" },
                { gradient: "from-[#6A9AB0] to-[#EAD8B1]", label: "Analytics" },
                { gradient: "from-[#3A6D8C] to-[#001F3F]", label: "Support" },
              ].map((item) => (
                <Card
                  key={item.label}
                  className="group relative aspect-square overflow-hidden border-[#3A6D8C] bg-[#001F3F]/50"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10 transition-opacity duration-300 group-hover:opacity-20`} />
                  <div className="flex h-full w-full items-center justify-center p-6">
                    <p className="text-lg font-semibold text-[#EAD8B1]">{item.label}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full bg-background">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3A6D8C]/10 via-background to-background" />
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#EAD8B1] sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join thousands of creators who are building their online presence with our platform.
            </p>
          </div>
          
          <form className="mx-auto mt-16 max-w-xl">
            <Card className="overflow-hidden border-[#3A6D8C] bg-[#001F3F]/50">
              <div className="p-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-[#EAD8B1]">
                      First name
                    </label>
                    <div className="mt-2.5">
                      <Input 
                        type="text" 
                        name="first-name" 
                        id="first-name"
                        className="border-[#3A6D8C] bg-[#001F3F]/50 focus:border-[#6A9AB0]" 
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-[#EAD8B1]">
                      Last name
                    </label>
                    <div className="mt-2.5">
                      <Input 
                        type="text" 
                        name="last-name" 
                        id="last-name"
                        className="border-[#3A6D8C] bg-[#001F3F]/50 focus:border-[#6A9AB0]" 
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-[#EAD8B1]">
                      Email
                    </label>
                    <div className="mt-2.5">
                      <Input 
                        type="email" 
                        name="email" 
                        id="email"
                        className="border-[#3A6D8C] bg-[#001F3F]/50 focus:border-[#6A9AB0]" 
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <Button type="submit" className="w-full bg-[#EAD8B1] text-[#001F3F] hover:bg-[#EAD8B1]/90">
                    Get Started
                  </Button>
                </div>
              </div>
            </Card>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#3A6D8C] bg-[#001F3F]/80 backdrop-blur-sm">
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
                className="text-muted-foreground transition-colors hover:text-[#EAD8B1]"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-muted-foreground">
              &copy; 2024 LandingBuilder, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

