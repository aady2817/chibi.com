"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Package, Search, Filter, Eye, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const router = useRouter()
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()

  // Load orders from localStorage
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
        setOrders(JSON.parse(storedOrders))
      } else {
        // If no orders exist, create sample orders
        createSampleOrders()
      }
    } catch (error) {
      console.error("Error loading orders:", error)
      toast({
        title: "Error",
        description: "Failed to load your orders. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast, isAuthenticated])

  // Create sample orders for demo purposes
  const createSampleOrders = () => {
    const sampleOrders: Order[] = [
      {
        id: "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        status: "delivered",
        total: 59.97,
        items: [
          {
            id: 1,
            name: "Interactive Laser Cat Toy",
            price: 19.99,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: 2,
            name: "Premium Cat Food - Salmon",
            price: 19.99,
            quantity: 2,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
      {
        id: "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        status: "shipped",
        total: 39.99,
        items: [
          {
            id: 3,
            name: "Cozy Cat Bed",
            price: 39.99,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
      {
        id: "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
        status: "processing",
        total: 29.99,
        items: [
          {
            id: 4,
            name: "Cat Scratching Post",
            price: 29.99,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
      {
        id: "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        status: "cancelled",
        total: 24.99,
        items: [
          {
            id: 5,
            name: "Catnip Toys Bundle",
            price: 24.99,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
    ]

    setOrders(sampleOrders)
    localStorage.setItem("orders", JSON.stringify(sampleOrders))
  }

  // Filter orders based on status and search query
  const filteredOrders = orders.filter((order) => {
    // Filter by status
    if (filterStatus !== "all" && order.status !== filterStatus) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        order.id.toLowerCase().includes(query) || order.items.some((item) => item.name.toLowerCase().includes(query))
      )
    }

    return true
  })

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get status badge color
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
            <div className="mb-4 rounded-full bg-muted p-3 inline-flex">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            <h1 className="mb-4 text-2xl font-bold">Sign in to view your orders</h1>
            <p className="mb-6 text-muted-foreground">Please sign in to your account to view your order history.</p>
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
        <h1 className="mb-6 text-3xl font-bold">My Orders</h1>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : orders.length > 0 ? (
          <>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <Card key={order.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-0">
                      <div className="border-b bg-muted/50 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Order ID</p>
                            <p className="font-medium">{order.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-medium">{formatDate(order.date)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <div>{getStatusBadge(order.status)}</div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto flex items-center gap-1"
                            onClick={() => router.push(`/orders/${order.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                            <span>Details</span>
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="mb-2 text-sm font-medium">Items</p>
                        <div className="space-y-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center">
                  <div className="mb-4 rounded-full bg-muted p-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h2 className="mb-2 text-xl font-semibold">No orders found</h2>
                  <p className="mb-6 text-muted-foreground">
                    We couldn't find any orders matching your search criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setFilterStatus("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <ShoppingBag className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">No orders yet</h2>
            <p className="mb-6 text-muted-foreground">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => router.push("/products")}>
                Start Shopping
              </Button>
              <Button variant="outline" onClick={createSampleOrders}>
                Create Sample Orders
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
