"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { PageTransition } from "@/components/page-transition"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-context"

export default function CartPage() {
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  const router = useRouter()
  const { toast } = useToast()
  const { cartItems, cartCount, subtotal, updateQuantity, removeFromCart, clearCart, isLoading } = useCart()

  // Calculate shipping and tax
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax - discount

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "chibi10") {
      setDiscount(subtotal * 0.1) // 10% discount
      setPromoApplied(true)

      toast({
        title: "Promo code applied",
        description: "10% discount has been applied to your order.",
      })
    } else {
      setDiscount(0)
      setPromoApplied(false)

      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is invalid or expired.",
        variant: "destructive",
      })
    }
  }

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add some items before checking out.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would save the cart to the server
    // and redirect to a checkout page with the cart ID
    router.push("/checkout")
  }

  // Add sample products to cart (for demo purposes)
  const addSampleProducts = () => {
    // Clear existing cart first
    clearCart()

    // Add sample products
    const sampleProducts = [
      {
        id: "1",
        name: "Interactive Laser Cat Toy",
        price: 19.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
        category: "Toys",
      },
      {
        id: "2",
        name: "Premium Cat Food - Salmon",
        price: 24.99,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=100",
        category: "Food & Treats",
      },
      {
        id: "3",
        name: "Cozy Cat Bed",
        price: 39.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
        category: "Beds & Furniture",
      },
    ]

    // Add each sample product to cart
    sampleProducts.forEach((product) => {
      // We're using setTimeout to ensure each product is added separately
      setTimeout(() => {
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          image: product.image,
          category: product.category,
        }

        // Store directly in localStorage to avoid state update issues
        const currentCart = JSON.parse(localStorage.getItem("cart") || "[]")
        currentCart.push(cartItem)
        localStorage.setItem("cart", JSON.stringify(currentCart))

        // Trigger cart change event
        window.dispatchEvent(new Event("cart-change"))
      }, 100)
    })

    toast({
      title: "Sample products added",
      description: "Sample products have been added to your cart for demo purposes.",
    })
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Your Shopping Cart</h1>

        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : cartItems.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                    <Button variant="outline" size="sm" onClick={clearCart}>
                      Clear Cart
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col gap-4 border-b pb-6 last:border-0 sm:flex-row">
                        <div className="h-24 w-24 overflow-hidden rounded-md bg-muted">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-r-none"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <div className="flex h-8 w-10 items-center justify-center border-y bg-background text-center">
                                {item.quantity}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-l-none"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-medium text-pink-600">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/50 px-6 py-4">
                  <Link
                    href="/products"
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Continue Shopping
                  </Link>
                  <Button onClick={proceedToCheckout} className="bg-pink-600 hover:bg-pink-700">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex items-center justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex items-center justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mt-6">
                    <h3 className="mb-2 text-sm font-medium">Promo Code</h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                        className="flex-1"
                      />
                      <Button
                        variant={promoApplied ? "outline" : "default"}
                        onClick={
                          promoApplied
                            ? () => {
                                setPromoCode("")
                                setPromoApplied(false)
                                setDiscount(0)
                              }
                            : applyPromoCode
                        }
                        disabled={!promoCode && !promoApplied}
                      >
                        {promoApplied ? "Remove" : "Apply"}
                      </Button>
                    </div>
                    {promoApplied && <p className="mt-2 text-xs text-green-600">10% discount applied successfully!</p>}
                    <p className="mt-2 text-xs text-muted-foreground">Try "CHIBI10" for 10% off your order</p>
                  </div>

                  {/* Shipping Notice */}
                  <div className="mt-6 rounded-lg bg-muted p-4">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 text-pink-500">
                        {subtotal >= 50 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {subtotal >= 50
                            ? "Your order qualifies for free shipping!"
                            : `Add $${(50 - subtotal).toFixed(2)} more to qualify for free shipping`}
                        </p>
                        <p className="text-xs text-muted-foreground">Free shipping on all orders over $50</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-4 border-t bg-muted/50 px-6 py-4">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700" onClick={proceedToCheckout}>
                    Proceed to Checkout
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <ShoppingBag className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
            <p className="mb-6 text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => router.push("/products")}>
                Browse Products
              </Button>
              <Button variant="outline" onClick={addSampleProducts}>
                Add Sample Products
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
