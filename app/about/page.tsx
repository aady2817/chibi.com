import { ArrowRight, Heart, Shield, Users, Award, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/page-transition"

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-700 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">About Chibi.com</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              We're on a mission to make every cat's life happier, healthier, and more playful.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="flex flex-col justify-center">
                <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
                <p className="mb-4 text-muted-foreground">
                  Chibi.com was founded in 2020 by a group of passionate cat lovers who were frustrated with the lack of
                  high-quality, cat-focused products available online. We started with a simple idea: create a one-stop
                  shop for cat parents that offers premium products, expert advice, and a community of fellow cat
                  enthusiasts.
                </p>
                <p className="mb-4 text-muted-foreground">
                  What began as a small operation run out of a living room has grown into a thriving e-commerce platform
                  serving thousands of happy cats and their humans across the country. Despite our growth, our core
                  mission remains the same: to improve the lives of cats everywhere through thoughtfully designed
                  products and education.
                </p>
                <p className="text-muted-foreground">
                  Today, we're proud to offer a curated selection of the best cat products on the market, all tested and
                  approved by our team of feline experts (and their discerning cats).
                </p>
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="The Chibi.com team with their cats"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Values</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-pink-100 p-3 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Cat-First Approach</h3>
                  <p className="text-muted-foreground">
                    Every product we offer is selected with your cat's health, happiness, and natural behaviors in mind.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Quality & Safety</h3>
                  <p className="text-muted-foreground">
                    We rigorously test all products to ensure they meet our high standards for quality, durability, and
                    safety.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Community</h3>
                  <p className="text-muted-foreground">
                    We're building a community of cat lovers who share knowledge, experiences, and a passion for feline
                    well-being.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We're committed to reducing our environmental pawprint through eco-friendly products and practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Meet Our Team</h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  name: "Emma Chen",
                  role: "Founder & CEO",
                  bio: "Cat mom to three rescues and passionate about creating products that enrich cats' lives.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Marcus Johnson",
                  role: "Head of Product",
                  bio: "Former veterinary technician with a keen eye for products that promote feline health and happiness.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Sophia Rodriguez",
                  role: "Cat Behaviorist",
                  bio: "Certified animal behaviorist who ensures all our products align with natural cat behaviors.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "David Kim",
                  role: "Customer Happiness",
                  bio: "Dedicated to making sure every cat parent has an amazing experience with Chibi.com.",
                  image: "/placeholder.svg?height=300&width=300",
                },
              ].map((member, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="mb-2 text-sm text-pink-600">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">What Our Customers Say</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  quote:
                    "Chibi.com has completely transformed my shopping experience for my two cats. The quality of products is outstanding!",
                  author: "Jessica T.",
                  location: "Portland, OR",
                  rating: 5,
                },
                {
                  quote:
                    "I love that I can find everything my cat needs in one place. The customer service is exceptional and shipping is always fast.",
                  author: "Michael L.",
                  location: "Chicago, IL",
                  rating: 5,
                },
                {
                  quote:
                    "My picky cat actually loves the toys and treats I've ordered from Chibi. That alone makes this site worth every penny!",
                  author: "Aisha K.",
                  location: "Atlanta, GA",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <p className="mb-4 text-muted-foreground">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-700 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Join Our Cat-Loving Community</h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/90">
              Discover premium products, expert advice, and connect with fellow cat enthusiasts.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-white/90">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

