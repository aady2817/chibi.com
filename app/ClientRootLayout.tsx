"use client"

import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Bell, Menu, Search, ShoppingCart, User, LogOut, Heart, Package, HelpCircle, Home } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Toaster } from "@/components/ui/toaster"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

const inter = Inter({ subsets: ["latin"] })

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)

    // Get cart count
    const cart = localStorage.getItem("cart")
    if (cart) {
      try {
        const cartItems = JSON.parse(cart)
        setCartCount(cartItems.length || 0)
      } catch (e) {
        setCartCount(0)
      }
    }

    // Listen for storage changes (login/logout/cart updates)
    const handleStorageChange = () => {
      const user = localStorage.getItem("user")
      setIsLoggedIn(!!user)

      const cart = localStorage.getItem("cart")
      if (cart) {
        try {
          const cartItems = JSON.parse(cart)
          setCartCount(cartItems.length || 0)
        } catch (e) {
          setCartCount(0)
        }
      } else {
        setCartCount(0)
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-xl font-bold text-pink-600 transition-colors hover:text-pink-700 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 animate-pulse-subtle"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      <path d="M12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                      <path d="M17.5 12a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0z" />
                    </svg>
                    Chibi.com
                  </div>
                  <nav className="hidden md:flex md:gap-6">
                    {isLoggedIn ? (
                      // Logged in navigation
                      <>
                        <Link
                          href="/"
                          className={`group relative text-sm font-medium transition-colors hover:text-foreground ${
                            pathname === "/" ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          Home
                          <span
                            className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                              pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                          ></span>
                        </Link>
                        <Link
                          href="/products"
                          className={`group relative text-sm font-medium transition-colors hover:text-foreground ${
                            pathname === "/products" ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          Shop
                          <span
                            className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                              pathname === "/products" ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                          ></span>
                        </Link>
                        <Link
                          href="/orders"
                          className={`group relative text-sm font-medium transition-colors hover:text-foreground ${
                            pathname === "/orders" ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          My Orders
                          <span
                            className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                              pathname === "/orders" ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                          ></span>
                        </Link>
                        <Link
                          href="/wishlist"
                          className={`group relative text-sm font-medium transition-colors hover:text-foreground ${
                            pathname === "/wishlist" ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          Wishlist
                          <span
                            className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                              pathname === "/wishlist" ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                          ></span>
                        </Link>
                      </>
                    ) : (
                      // Not logged in navigation
                      <>
                        <Link
                          href="/"
                          className={`group relative text-sm font-medium transition-colors hover:text-foreground ${
                            pathname === "/" ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          Home
                          <span
                            className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                              pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                          ></span>
                        </Link>
                        <Link
                          href="/products"
                          className={`group relative text-sm font-medium transition-colors hover:text-foreground ${
                            pathname === "/products" ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          Shop All
                          <span
                            className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                              pathname === "/products" ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                          ></span>
                        </Link>
                        <Link
                          href="/about"
                          className={`group relative text-sm font-medium transition-colors hover:text-foreground ${
                            pathname === "/about" ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          About Us
                          <span
                            className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                              pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                          ></span>
                        </Link>
                        <Link
                          href="/help-center"
                          className={`group relative text-sm font-medium transition-colors hover:text-foreground ${
                            pathname === "/help-center" ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          Help Center
                          <span
                            className={`absolute -bottom-1 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                              pathname === "/help-center" ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                          ></span>
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
                <div className="hidden md:flex md:items-center md:gap-4">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-[200px] bg-background pl-8 transition-all duration-300 focus:w-[300px] md:w-[300px] md:focus:w-[400px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-muted/20"
                      >
                        <Menu className="h-3 w-3 text-muted-foreground" />
                      </button>
                    )}
                  </form>
                  <ThemeToggle />
                  {isLoggedIn && (
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
                      <span className="absolute right-1 top-1 flex h-2 w-2 animate-pulse rounded-full bg-red-600"></span>
                    </Button>
                  )}
                  <Link href="/cart">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative transition-transform duration-300 hover:rotate-12"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {cartCount > 0 && (
                        <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 p-0 text-[10px] text-white">
                          {cartCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                  <UserButton />
                </div>

                {/* Mobile Menu */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                    <div className="flex flex-col gap-6 py-4">
                      <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-pink-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            <path d="M12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                            <path d="M17.5 12a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0z" />
                          </svg>
                          Chibi.com
                        </Link>
                        <ThemeToggle />
                      </div>

                      <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search..."
                          className="w-full bg-background pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-muted/20"
                          >
                            <Menu className="h-3 w-3 text-muted-foreground" />
                          </button>
                        )}
                      </form>

                      <nav className="flex flex-col gap-2">
                        {isLoggedIn ? (
                          // Logged in mobile navigation
                          <>
                            <Link
                              href="/"
                              className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-muted ${
                                pathname === "/" ? "bg-muted/70 text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              <Home className="h-4 w-4" />
                              Home
                            </Link>
                            <Link
                              href="/products"
                              className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-muted ${
                                pathname === "/products" ? "bg-muted/70 text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Shop
                            </Link>
                            <Link
                              href="/orders"
                              className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-muted ${
                                pathname === "/orders" ? "bg-muted/70 text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              <Package className="h-4 w-4" />
                              My Orders
                            </Link>
                            <Link
                              href="/wishlist"
                              className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-muted ${
                                pathname === "/wishlist" ? "bg-muted/70 text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              <Heart className="h-4 w-4" />
                              Wishlist
                            </Link>
                            <Link
                              href="/cart"
                              className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-muted ${
                                pathname === "/cart" ? "bg-muted/70 text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Cart
                              {cartCount > 0 && (
                                <Badge className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 p-0 text-[10px] text-white">
                                  {cartCount}
                                </Badge>
                              )}
                            </Link>
                            <Link
                              href="/profile"
                              className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-muted ${
                                pathname === "/profile" ? "bg-muted/70 text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              <User className="h-4 w-4" />
                              Profile
                            </Link>
                          </>
                        ) : (
                          // Not logged in mobile navigation
                          <>
                            <Link
                              href="/"
                              className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-muted ${
                                pathname === "/" ? "bg-muted/70 text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              <Home className="h-4 w-4" />
                              Home
                            </Link>
                            <Link
                              href="/products"
                              className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-muted ${
                                pathname === "/products" ? "bg-muted/70 text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Shop All
                            </Link>
                            <Link
                              href="/about"
                              className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-muted ${
                                pathname === "/about" ? "bg-muted/70 text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              <User className="h-4 w-4" />
                              About Us
                            </Link>
                            <Link
                              href="/help-center"
                              className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-muted ${
                                pathname === "/help-center" ? "bg-muted/70 text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              <HelpCircle className="h-4 w-4" />
                              Help Center
                            </Link>
                            <Link
                              href="/cart"
                              className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-muted ${
                                pathname === "/cart" ? "bg-muted/70 text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Cart
                              {cartCount > 0 && (
                                <Badge className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 p-0 text-[10px] text-white">
                                  {cartCount}
                                </Badge>
                              )}
                            </Link>
                          </>
                        )}
                      </nav>

                      <MobileUserButton onClose={() => setIsMobileMenuOpen(false)} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t bg-muted/30 py-8 dark:bg-muted/10">
              <div className="container mx-auto px-4">
                <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                  <Link href="/" className="flex items-center gap-2 text-xl font-bold text-pink-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      <path d="M12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                      <path d="M17.5 12a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0z" />
                    </svg>
                    Chibi.com
                  </Link>
                  <div className="flex gap-4">
                    <Link
                      href="#"
                      className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-pink-600/10 hover:text-pink-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-pink-600/10 hover:text-pink-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-pink-600/10 hover:text-pink-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="grid gap-8 md:grid-cols-4">
                  <div>
                    <h3 className="mb-4 text-lg font-bold">Shop</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/products?category=food"
                          className="text-muted-foreground transition-colors hover:text-pink-600"
                        >
                          Cat Food
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products?category=toys"
                          className="text-muted-foreground transition-colors hover:text-pink-600"
                        >
                          Cat Toys
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products?category=accessories"
                          className="text-muted-foreground transition-colors hover:text-pink-600"
                        >
                          Accessories
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-bold">Support</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/help-center"
                          className="text-muted-foreground transition-colors hover:text-pink-600"
                        >
                          Help Center
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shipping-info"
                          className="text-muted-foreground transition-colors hover:text-pink-600"
                        >
                          Shipping Info
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/returns-policy"
                          className="text-muted-foreground transition-colors hover:text-pink-600"
                        >
                          Returns Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-bold">Company</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/about" className="text-muted-foreground transition-colors hover:text-pink-600">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/careers" className="text-muted-foreground transition-colors hover:text-pink-600">
                          Careers
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="text-muted-foreground transition-colors hover:text-pink-600">
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Subscribe to our newsletter for cat care tips and exclusive offers.
                    </p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        const form = e.target as HTMLFormElement
                        const email = (form.elements.namedItem("email") as HTMLInputElement).value
                        if (email) {
                          toast({
                            title: "Subscribed!",
                            description: "Thank you for subscribing to our newsletter.",
                          })
                          ;(form.elements.namedItem("email") as HTMLInputElement).value = ""
                        }
                      }}
                      className="flex gap-2"
                    >
                      <Input name="email" placeholder="Your email" className="bg-background" />
                      <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                        Subscribe
                      </Button>
                    </form>
                  </div>
                </div>
                <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                  <p>© 2025 Chibi.com. All rights reserved. Made with ❤️ for cats everywhere.</p>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

// Client-side user button component
function UserButton() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    router.push("/")

    // Trigger storage event for other components to update
    window.dispatchEvent(new Event("storage"))
  }

  if (!user) {
    return (
      <Link href="/auth/login">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full transition-all duration-300 hover:bg-pink-600/10 hover:text-pink-600"
        >
          <User className="h-5 w-5" />
        </Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8 transition-transform duration-300 hover:scale-110">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/orders")}>
          <Package className="mr-2 h-4 w-4" />
          My Orders
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/wishlist")}>
          <Heart className="mr-2 h-4 w-4" />
          Wishlist
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Mobile user button component
function MobileUserButton({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    onClose()
    router.push("/")

    // Trigger storage event for other components to update
    window.dispatchEvent(new Event("storage"))
  }

  const navigateTo = (path: string) => {
    onClose()
    router.push(path)
  }

  if (!user) {
    return (
      <Link href="/auth/login" onClick={onClose}>
        <Button className="w-full bg-pink-600 hover:bg-pink-700">
          <User className="mr-2 h-4 w-4" />
          Sign In / Register
        </Button>
      </Link>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start" onClick={() => navigateTo("/profile")}>
          <User className="mr-2 h-4 w-4" />
          My Profile
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigateTo("/orders")}>
          <Package className="mr-2 h-4 w-4" />
          My Orders
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigateTo("/wishlist")}>
          <Heart className="mr-2 h-4 w-4" />
          Wishlist
        </Button>
        <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

