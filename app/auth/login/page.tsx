"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { PageTransition } from "@/components/page-transition"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const router = useRouter()
  const { toast } = useToast()

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      router.push("/products")
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.email) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      valid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would be a Firebase Google Auth call
      // For demo purposes, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock user data
      const userData = {
        id: "google-user-123",
        name: "Cat Lover",
        email: "catlover@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      }

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userData))

      // Trigger auth change event
      window.dispatchEvent(new Event("auth-change"))

      toast({
        title: "Login successful",
        description: "Welcome to Chibi.com!",
        variant: "success",
      })

      // Redirect to products page
      router.push("/products")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "There was an error with Google authentication. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to your authentication endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData = {
        id: "user-123",
        name: "Cat Enthusiast",
        email: formData.email,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userData))

      // Trigger auth change event
      window.dispatchEvent(new Event("auth-change"))

      toast({
        title: "Login successful",
        description: "Welcome back to Chibi.com!",
        variant: "success",
      })

      // Redirect to products page
      router.push("/products")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="grid w-full max-w-[1000px] overflow-hidden rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-none dark:hover:shadow-pink-900/10 md:grid-cols-2">
          <div className="flex flex-col justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 p-8 text-white dark:from-pink-900 dark:via-purple-900 dark:to-indigo-900">
            <div className="mb-6">
              <h1 className="mb-2 text-3xl font-bold">Welcome Back!</h1>
              <p className="text-white/80">
                Log in to access your account and continue shopping for your feline friend.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 hover:scale-110">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Secure Shopping</h3>
                  <p className="text-sm text-white/70">Your data and transactions are always protected</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 hover:scale-110">
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
                    <path d="M10 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                    <path d="M17.83 15.83a8 8 0 1 0-11.66 0" />
                    <path d="M19.07 17.07a10 10 0 1 0-14.14 0" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Cat Community</h3>
                  <p className="text-sm text-white/70">Join thousands of cat lovers</p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-12">
              <p className="text-sm text-white/70">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-white underline underline-offset-2 transition-colors hover:text-primary-foreground"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-background p-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold">Login to Your Account</h2>
              <p className="text-muted-foreground">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className={`pl-10 transition-all duration-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/forgot-password" className="text-xs text-pink-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`pl-10 transition-all duration-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-pink-600 text-white transition-all duration-300 hover:bg-pink-700 hover:shadow-md hover:shadow-pink-600/20"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="my-6 flex items-center">
              <Separator className="flex-1" />
              <span className="mx-4 text-xs text-muted-foreground">OR CONTINUE WITH</span>
              <Separator className="flex-1" />
            </div>

            <Button
              variant="outline"
              type="button"
              className="flex w-full items-center justify-center transition-all duration-300 hover:bg-muted/50 hover:shadow-sm"
              disabled={isLoading}
              onClick={handleGoogleLogin}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link href="#" className="underline underline-offset-2 hover:text-pink-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline underline-offset-2 hover:text-pink-600">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
