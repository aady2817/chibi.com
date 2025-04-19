"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string
  name: string
  email: string
  avatar?: string
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Authentication error:", error)
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem("user") // Clear invalid data
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth()
    }

    window.addEventListener("auth-change", handleAuthChange)
    window.addEventListener("storage", handleAuthChange)

    return () => {
      window.removeEventListener("auth-change", handleAuthChange)
      window.removeEventListener("storage", handleAuthChange)
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to your authentication endpoint
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll accept any email/password
      // In a real app, you would validate credentials against your backend

      // Mock user data
      const userData = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name: email.split("@")[0],
        email,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(userData))

      // Trigger auth change event
      window.dispatchEvent(new Event("auth-change"))

      toast({
        title: "Login successful",
        description: "Welcome back to Chibi.com!",
      })

      return Promise.resolve()
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to your registration endpoint
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name,
        email,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(userData))

      // Trigger auth change event
      window.dispatchEvent(new Event("auth-change"))

      toast({
        title: "Registration successful",
        description: "Your account has been created. Welcome to Chibi.com!",
      })

      return Promise.resolve()
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)

    // Trigger auth change event
    window.dispatchEvent(new Event("auth-change"))

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
