"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Truck, Package, CheckCircle, XCircle, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PageTransition } from "@/components/page-transition"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-context"

// Order type
type OrderItem = {
  id: string | number
  name: string
  price: number
  quantity: number
  image: string
}

type Order = {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: OrderItem[]
  shippingAddress?: {
    name: string
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  paymentMethod?: {
    type: string
    last4: string
  }
  trackingNumber?: string
  estimatedDelivery?: string
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()
  const orderId = params.id

  // Load order from localStorage
  useEffect(() => {
    setLoading(true)

    // Check if user is authenticated
    if (!isAuthenticated) {
      setLoading(false)
      return
    }

    try {
      const storedOrders = localStorage.getItem("orders")
      if (storedOrders) {
        const orders: Order[] = JSON.parse(storedOrders)
        const foundOrder = orders.find((o) => o.id === orderId)

        if (foundOrder) {
          // Add additional details for demo purposes
          setOrder({
            ...foundOrder,
            shippingAddress: {
              name: "John Doe",
              street: "123 Cat Street",
              city: "Purrington",
              state: "CA",
              zip: "90210",
              country: "United States",
            },
            paymentMethod: {
              type: "Credit Card",
              last4: "4242",
            },
            trackingNumber:
              foundOrder.status !== "processing"
                ? "TRK" + Math.random().toString(36).substring(2, 10).toUpperCase()
                : undefined,
            estimatedDelivery:
              foundOrder.status === "shipped"
                ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
                : undefined,
          })
        } else {
          toast({
            title: "Order not found",
            description: "The order you're looking for doesn't exist.",
            variant: "destructive",
          })
          router.push("/orders")
        }
      } else {
        toast({
          title: "No orders found",
          description: "You don't have any orders yet.",
          variant: "destructive",
        })
        router.push("/orders")
      }
    } catch (error) {
      console.error("Error loading order:", error)
      toast({
        title: "Error",
        description: "Failed to load order details. Please try again.",
        variant: "destructive",
      })
      router.push("/orders")
    } finally {
      setLoading(false)
    }
  }, [toast, router, orderId, isAuthenticated])

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return <Badge className="bg-blue-500">Processing</Badge>
      case "shipped":
        return <Badge className="bg-purple-500">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  // If not authenticated, show login prompt
  if (!isAuthenticated && !loading) {
    return (
      <PageTransition>
        <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12">
          <div className="text-center">
            <div className="mb-4 inline-flex rounded-full bg-muted p-3">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            <h1 className="mb-4 text-2xl font-bold">Sign in to view your order</h1>
            <p className="mb-6 text-muted-foreground">Please sign in to your account to view your order details.</p>
            <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => router.push("/auth/login")}>
              Sign In
            </Button>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <Link href="/orders" className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Link>

        <h1 className="mb-6 text-3xl font-bold">Order Details</h1>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : order ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Order {order.id}</h2>
                      <p className="text-sm text-muted-foreground">Placed on {formatDate(order.date)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {order.status === "shipped" && order.trackingNumber && (
                    <div className="mt-4 rounded-lg bg-muted p-4">
                      <div className="flex items-start gap-3">
                        <Truck className="mt-0.5 h-5 w-5 text-purple-500" />
                        <div>
                          <h3 className="font-medium">Your order is on the way!</h3>
                          <p className="text-sm text-muted-foreground">
                            Tracking Number: <span className="font-medium">{order.trackingNumber}</span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Estimated Delivery:{" "}
                            <span className="font-medium">{formatDate(order.estimatedDelivery)}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-semibold">Order Items</h2>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="h-20 w-20 overflow-hidden rounded-md bg-muted">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${(order.total * 0.9).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>$5.99</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${(order.total * 0.1 - 5.99).toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between font-bold">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-semibold">Shipping Information</h2>
                  {order.shippingAddress ? (
                    <div className="space-y-1">
                      <p className="font-medium">{order.shippingAddress.name}</p>
                      <p className="text-sm text-muted-foreground">{order.shippingAddress.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                      </p>
                      <p className="text-sm text-muted-foreground">{order.shippingAddress.country}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No shipping information available.</p>
                  )}
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-semibold">Payment Information</h2>
                  {order.paymentMethod ? (
                    <div className="space-y-1">
                      <p className="font-medium">{order.paymentMethod.type}</p>
                      <p className="text-sm text-muted-foreground">Ending in {order.paymentMethod.last4}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No payment information available.</p>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  {order.status === "delivered" ? "Buy Again" : "Contact Support"}
                </Button>
                {order.status === "processing" && (
                  <Button variant="outline" className="w-full">
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Order not found</h2>
            <p className="mb-6 text-muted-foreground">
              The order you're looking for doesn't exist or has been removed.
            </p>
            <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => router.push("/orders")}>
              View All Orders
            </Button>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
