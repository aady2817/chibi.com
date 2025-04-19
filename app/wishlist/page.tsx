"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Heart, Trash2, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/page-transition"
import { useToast } from "@/hooks/use-toast"
import { useCart, type CartItem } from "@/components/cart-context"

// Wishlist item type
type WishlistItem = {
  id: string | number
  name: string
  price: number
  image: string
  category: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()

  // Load wishlist from localStorage
  useEffect(() => {
    setLoading(true)
    try {
      const storedWishlist = localStorage.getItem("wishlist")
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist))
      }
    } catch (error) {
      console.error("Error loading wishlist:", error)
      toast({
        title: "Error",
        description: "Failed to load your wishlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
    }
  }, [wishlistItems, loading])

  // Remove item from wishlist
  const removeFromWishlist = (id: string | number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))

    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist.",
    })
  }

  // Add item to cart
  const handleAddToCart = (item: WishlistItem) => {
    // Create cart item from wishlist item
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      category: item.category,
    }

    // Add to cart
    addToCart(cartItem)
  }

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([])

    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  // Add sample items to wishlist (for demo purposes)
  const addSampleItems = () => {
    const sampleItems: WishlistItem[] = [
      {
        id: 1,
        name: "Interactive Laser Cat Toy",
        price: 19.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Toys",
      },
      {
        id: 2,
        name: "Premium Cat Food - Salmon",
        price: 24.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Food & Treats",
      },
      {
        id: 3,
        name: "Cozy Cat Bed",
        price: 39.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Beds & Furniture",
      },
      {
        id: 4,
        name: "Cat Scratching Post",
        price: 29.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Furniture",
      },
    ]

    setWishlistItems(sampleItems)

    toast({
      title: "Sample items added",
      description: "Sample items have been added to your wishlist for demo purposes.",
    })
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Your Wishlist</h1>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : wishlistItems.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                You have <span className="font-medium text-foreground">{wishlistItems.length}</span> items in your
                wishlist
              </p>
              <Button variant="outline" size="sm" onClick={clearWishlist}>
                Clear Wishlist
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 text-red-500 hover:bg-white hover:text-red-600"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        removeFromWishlist(item.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">
                      {item.category}
                    </Badge>
                    <h3 className="mb-2 line-clamp-2 font-medium">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-pink-600">${item.price.toFixed(2)}</span>
                      <Button
                        size="sm"
                        className="h-8 bg-pink-600 hover:bg-pink-700"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleAddToCart(item)
                        }}
                      >
                        <ShoppingCart className="mr-1 h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Heart className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Your wishlist is empty</h2>
            <p className="mb-6 text-muted-foreground">Save items you love to your wishlist and revisit them anytime.</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => router.push("/products")}>
                Browse Products
              </Button>
              <Button variant="outline" onClick={addSampleItems}>
                Add Sample Items
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
