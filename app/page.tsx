import Link from "next/link"
import { ArrowRight, ShieldCheck, Truck, Zap, ChevronRight, Star, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container relative mx-auto px-4 py-20 text-center md:py-32">
          <Badge className="mb-4 animate-bounce-subtle bg-white/10 text-white backdrop-blur-sm">
            Purr-fect Products for Your Feline Friend
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Welcome to <span className="text-gradient">Chibi.com</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 md:text-xl">
            Discover premium cat products that will make your furry friend purr with delight. From toys to treats, we've
            got everything your cat needs.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="button-glow group bg-white text-pink-700 hover:bg-white/90">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>

          {/* Floating cards */}
          <div className="relative mt-16 hidden md:block">
            <div className="absolute left-[10%] top-0 animate-float" style={{ animationDelay: "0.5s" }}>
              <Card className="w-48 rotate-[-5deg] overflow-hidden border-none shadow-xl">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-1"></div>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-pink-100">
                      <img src="/placeholder.svg?height=32&width=32" alt="" className="h-full w-full rounded-full" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Cat Toy Bundle</p>
                      <p className="text-xs text-muted-foreground">$19.99</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="absolute right-[15%] top-10 animate-float" style={{ animationDelay: "1s" }}>
              <Card className="w-48 rotate-[5deg] overflow-hidden border-none shadow-xl">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-1"></div>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100">
                      <img src="/placeholder.svg?height=32&width=32" alt="" className="h-full w-full rounded-full" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Premium Cat Food</p>
                      <p className="text-xs text-muted-foreground">$24.99</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Animated Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-background">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <Badge className="mb-2">Why Choose Chibi</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">The Purr-fect Choice for Cat Lovers</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We provide the highest quality products for your feline friends, ensuring their happiness and health.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="group overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-100 dark:hover:shadow-pink-900/20">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-1 transition-all duration-300 group-hover:p-1.5"></div>
            <CardContent className="p-6 pt-8">
              <div className="mb-4 rounded-full bg-pink-100 p-3 text-pink-600 transition-all duration-300 group-hover:scale-110 dark:bg-pink-900/30">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Premium Quality</h3>
              <p className="text-muted-foreground">
                All our products are carefully selected to ensure the highest quality for your beloved cats.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-pink-400">
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-100 dark:hover:shadow-purple-900/20">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-1 transition-all duration-300 group-hover:p-1.5"></div>
            <CardContent className="p-6 pt-8">
              <div className="mb-4 rounded-full bg-purple-100 p-3 text-purple-600 transition-all duration-300 group-hover:scale-110 dark:bg-purple-900/30">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Quick and reliable shipping to ensure your cat's favorite products arrive on time.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-purple-400">
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-1 transition-all duration-300 group-hover:p-1.5"></div>
            <CardContent className="p-6 pt-8">
              <div className="mb-4 rounded-full bg-indigo-100 p-3 text-indigo-600 transition-all duration-300 group-hover:scale-110 dark:bg-indigo-900/30">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Expert Advice</h3>
              <p className="text-muted-foreground">
                Our team of cat lovers provides expert advice to help you choose the perfect products.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-indigo-400">
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-muted/30 py-20 dark:bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-2">Featured</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Best Selling Cat Products</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Discover our most popular products that cats and their owners love.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Interactive Laser Toy",
                price: 19.99,
                category: "Toys",
                image: "/placeholder.svg?height=300&width=300",
                rating: 4.8,
                hot: true,
              },
              {
                name: "Organic Catnip Bundle",
                price: 14.99,
                category: "Treats",
                image: "/placeholder.svg?height=300&width=300",
                rating: 4.7,
              },
              {
                name: "Cozy Cat Bed",
                price: 39.99,
                category: "Furniture",
                image: "/placeholder.svg?height=300&width=300",
                rating: 4.9,
              },
              {
                name: "Premium Wet Cat Food",
                price: 24.99,
                category: "Food",
                image: "/placeholder.svg?height=300&width=300",
                rating: 4.6,
              },
            ].map((product, index) => (
              <Link href="/products" key={index} className="group">
                <Card className="hover-card-effect overflow-hidden border-none">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-800/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 rounded-full bg-pink-500 px-3 py-1 text-xs font-medium text-white">
                      New
                    </div>
                    {product.hot && (
                      <div className="absolute right-2 top-2 rounded-full bg-purple-500 px-3 py-1 text-xs font-medium text-white">
                        Hot Item
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-1 flex items-center justify-between">
                      <Badge variant="outline" className="rounded-sm px-2 py-0 text-xs font-normal">
                        {product.category}
                      </Badge>
                      <div className="flex items-center text-sm text-yellow-500">
                        <Star className="mr-1 h-3 w-3 fill-yellow-500" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="mb-1 font-semibold group-hover:text-pink-600">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-pink-600">${product.price}</span>
                      <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100) + 20} sold</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" className="button-glow bg-pink-600 text-white hover:bg-pink-700">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Cat Care Tips Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <Badge className="mb-2">Cat Care</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Tips for Happy Cats</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Expert advice to keep your feline friend healthy and happy.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="aspect-video overflow-hidden">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Nutrition Tips"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-bold">Proper Nutrition</h3>
              <p className="mb-4 text-muted-foreground">
                Learn about the essential nutrients your cat needs for a healthy life and how to choose the right food.
              </p>
              <Link href="#" className="flex items-center text-sm font-medium text-pink-600 hover:underline">
                Read More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="aspect-video overflow-hidden">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Play Time"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-bold">Play Time Importance</h3>
              <p className="mb-4 text-muted-foreground">
                Discover why regular play is crucial for your cat's physical and mental well-being.
              </p>
              <Link href="#" className="flex items-center text-sm font-medium text-pink-600 hover:underline">
                Read More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="aspect-video overflow-hidden">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Grooming Tips"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-bold">Grooming Guide</h3>
              <p className="mb-4 text-muted-foreground">
                Tips and tricks for keeping your cat's coat healthy and reducing hairballs.
              </p>
              <Link href="#" className="flex items-center text-sm font-medium text-pink-600 hover:underline">
                Read More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 py-20 dark:bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-2">Testimonials</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">What Cat Parents Say</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Hear from our satisfied customers and their happy feline friends.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Cat Mom to Whiskers",
                content:
                  "My cat absolutely loves the interactive toys from Chibi. They've kept him entertained for hours and helped him stay active!",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Owner of Two Tabbies",
                content:
                  "The premium cat food has made such a difference in my cats' coats. They're shinier and healthier than ever before. Plus, they absolutely love the taste!",
                rating: 5,
              },
              {
                name: "Emma Rodriguez",
                role: "First-time Cat Parent",
                content:
                  "As a new cat owner, I was overwhelmed with all the options out there. Chibi's customer service helped me find exactly what my kitten needed. So grateful!",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="hover-card-effect overflow-hidden border-none">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <img
                        src={`/placeholder.svg?height=40&width=40`}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-8 md:grid-cols-4">
          {[
            { label: "Happy Cats", value: "10,000+", icon: "😺" },
            { label: "Products", value: "500+", icon: "🧶" },
            { label: "Satisfied Customers", value: "8,500+", icon: "😊" },
            { label: "Years of Experience", value: "5+", icon: "🏆" },
          ].map((stat, index) => (
            <Card key={index} className="hover-card-effect overflow-hidden border-none text-center">
              <CardContent className="p-6">
                <div className="mb-4 text-4xl">{stat.icon}</div>
                <h3 className="mb-1 text-3xl font-bold text-pink-600">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 py-20 text-white dark:from-pink-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/10 text-white backdrop-blur-sm">Join Our Cat Community</Badge>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Make Your Cat Happy?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
            Join thousands of cat parents who trust Chibi for all their feline needs.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="button-glow group bg-white text-pink-700 hover:bg-white/90">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Sign In / Register
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-pink-300" />
              <span className="text-sm font-medium text-white/90">Free shipping over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-pink-300" />
              <span className="text-sm font-medium text-white/90">30-day returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-pink-300" />
              <span className="text-sm font-medium text-white/90">Cat-approved products</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-pink-300" />
              <span className="text-sm font-medium text-white/90">Expert customer support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

