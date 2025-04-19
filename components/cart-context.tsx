"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Cart item type
export type CartItem = {
  id: string | number
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

type CartContextType = {
  cartItems: CartItem[]
  cartCount: number
  subtotal: number
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string | number) => void
  updateQuantity: (id: string | number, quantity: number) => void
  clearCart: () => void
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Calculate cart count and subtotal
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Load cart from localStorage on initial load
  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart)
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart)
          } else {
            // If cart is not an array, initialize as empty
            setCartItems([])
            localStorage.setItem("cart", JSON.stringify([]))
          }
        } else {
          // If no cart exists, initialize as empty
          setCartItems([])
          localStorage.setItem("cart", JSON.stringify([]))
        }
      } catch (error) {
        console.error("Error loading cart:", error)
        // If there's an error, initialize as empty
        setCartItems([])
        localStorage.setItem("cart", JSON.stringify([]))
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()

    // Listen for storage events from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        loadCart()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, isLoading])

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id)

      if (existingItemIndex !== -1) {
        // If item exists, update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity,
        }
        return updatedItems
      } else {
        // If item doesn't exist, add it
        return [...prevItems, item]
      }
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  // Remove item from cart
  const removeFromCart = (id: string | number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))

    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    })
  }

  // Update item quantity
  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity < 1) return

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])

    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
