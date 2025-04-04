"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Heart, Share2, ShieldCheck, Star, User, Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

// Product type definition
type Product = {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: string
  description: string
  features: string[]
  category: string
  rating: number
  reviewCount: number
  sold: number
  images: string[]
  seller: {
    name: string
    isVerified: boolean
    avatar: string
  }
  details: Record<string, string>
  reviews: {
    user: string
    avatar: string
    rating: number
    date: string
    comment: string
  }[]
  similarProducts: {
    id: number
    name: string
    price: number
    image: string
    rating: number
  }[]
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [mainImage, setMainImage] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("details")
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { toast } = useToast()

  // Fetch product data
  useEffect(() => {
    // Simulate API call to fetch product details
    const fetchProduct = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock product data
        const productData: Product = {
          id: params.id,
          name: "Interactive Laser Cat Toy",
          price: 19.99,
          originalPrice: 24.99,
          discount: "20%",
          description:
            "This interactive laser toy will keep your cat entertained for hours. The unpredictable movement patterns trigger your cat's natural hunting instincts, providing both mental and physical exercise.",
          features: [
            "5 different movement patterns",
            "Automatic shut-off after 15 minutes",
            "USB rechargeable battery",
            "Safe for cats of all ages",
          ],
          category: "Cat Toys",
          rating: 4.8,
          reviewCount: 48,
          sold: 120,
          images: [
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=150&width=150",
            "/placeholder.svg?height=150&width=150",
            "/placeholder.svg?height=150&width=150",
          ],
          seller: {
            name: "Whisker Wonders",
            isVerified: true,
            avatar: "/placeholder.svg?height=40&width=40",
          },
          details: {
            material: "ABS Plastic",
            dimensions: "3.5 x 3.5 x 7 inches",
            weight: "0.5 lbs",
            batteryLife: "Up to 5 hours",
            warranty: "1 year",
          },
          reviews: [
            {
              user: "CatLover123",
              avatar: "/placeholder.svg?height=32&width=32",
              rating: 5,
              date: "1 month ago",
              comment:
                "My cat absolutely loves this toy! It keeps her entertained for hours and she gets great exercise chasing the laser around.",
            },
            {
              user: "FurryFriend",
              avatar: "/placeholder.svg?height=32&width=32",
              rating: 5,
              date: "2 weeks ago",
              comment: "Great quality toy that has held up well despite daily use. My two cats can't get enough of it!",
            },
            {
              user: "MeowMaster",
              avatar: "/placeholder.svg?height=32&width=32",
              rating: 4,
              date: "3 days ago",
              comment: "Good toy, but battery life could be better. Otherwise, my cat is obsessed with it!",
            },
          ],
          similarProducts: [
            {
              id: 101,
              name: "Feather Wand Toy",
              price: 12.99,
              image: "/placeholder.svg?height=300&width=300",
              rating: 4.6,
            },
            {
              id: 102,
              name: "Catnip Mouse Toy",
              price: 8.99,
              image: "/placeholder.svg?height=300&width=300",
              rating: 4.7,
            },
            {
              id: 103,
              name: "Electronic Moving Fish",
              price: 24.99,
              image: "/placeholder.svg?height=300&width=300",
              rating: 4.9,
            },
            {
              id: 104,
              name: "Cat Tunnel Playground",
              price: 29.99,
              image: "/placeholder.svg?height=300&width=300",
              rating: 4.8,
            },
          ],
        }

        setProduct(productData)
        setMainImage(productData.images[0])
      } catch (error) {
        console.error("Error fetching product:", error)
        toast({
          title: "Error",
          description: "Failed to load product details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, toast])

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  // Handle image change
  const changeMainImage = (image: string) => {
    setMainImage(image)
  }

  // Handle add to cart
  const addToCart = () => {
    // In a real app, this would add the product to a cart state or make an API call
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product?.name} added to your cart.`,
    })
  }

  // Handle buy now
  const buyNow = () => {
    // In a real app, this would redirect to checkout with the selected product
    toast({
      title: "Proceeding to checkout",
      description: `Preparing checkout for ${quantity} x ${product?.name}.`,
    })

    // Simulate redirect to checkout
    setTimeout(() => {
      window.location.href = `/checkout/${params.id}`
    }, 1000)
  }

  // Toggle wishlist
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)

    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted
        ? `${product?.name} has been removed from your wishlist.`
        : `${product?.name} has been added to your wishlist.`,
    })
  }

  // Handle share
  const handleShare = () => {
    // In a real app, this would open a share dialog or copy link to clipboard
    navigator.clipboard.writeText(window.location.href)

    toast({
      title: "Link copied",
      description: "Product link copied to clipboard. Share it with your friends!",
    })
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-muted/20 pb-16">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="aspect-square w-full rounded-md" />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-3/4" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-40" />
              </div>

              <Skeleton className="h-0.5 w-full" />

              <div className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-5 w-3/4" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">Product Not Found</h2>
          <p className="mb-6 text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/products">
            <Button className="bg-pink-600 hover:bg-pink-700">Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/products" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border bg-white">
              <img src={mainImage || product.images[0]} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`cursor-pointer overflow-hidden rounded-md border ${mainImage === img ? "border-pink-500 ring-2 ring-pink-500/20" : "bg-white"}`}
                  onClick={() => changeMainImage(img)}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Badge className="bg-pink-500 hover:bg-pink-600">Verified</Badge>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                <span className="ml-2 text-sm font-medium">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{product.sold} sold</span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-pink-600">${product.price.toFixed(2)}</span>
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                {product.discount} OFF
              </span>
            </div>

            <Separator className="my-6" />

            <div className="mb-6 space-y-4">
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
              <ul className="grid gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-pink-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity selector */}
            <div className="mb-6">
              <h3 className="mb-2 font-semibold">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex h-10 w-16 items-center justify-center border-y bg-background text-center">
                  {quantity}
                </div>
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-l-none" onClick={increaseQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={product.seller.avatar} alt={product.seller.name} />
                  <AvatarFallback>{product.seller.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{product.seller.name}</p>
                  <p className="text-xs text-muted-foreground">Verified Seller</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                <User className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-pink-600 hover:bg-pink-700" onClick={buyNow}>
                Buy Now
              </Button>
              <Button variant="outline" className="flex-1" onClick={addToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={isWishlisted ? "text-pink-600 bg-pink-50" : ""}
                onClick={toggleWishlist}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-pink-600" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-6 rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-pink-500" />
                <p className="text-sm font-medium">Secure Transaction</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                All purchases are protected by our 30-day money-back guarantee if the item doesn't meet your
                expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12">
          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Product Details</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-medium">Specifications</h4>
                      <ul className="space-y-2 text-sm">
                        {Object.entries(product.details).map(([key, value]) => (
                          <li key={key} className="flex justify-between">
                            <span className="text-muted-foreground">{key}</span>
                            <span>{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium">Care Instructions</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-pink-500" />
                          <span>Clean with a damp cloth only</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-pink-500" />
                          <span>Do not submerge in water</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-pink-500" />
                          <span>Remove batteries when not in use for extended periods</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-pink-500" />
                          <span>Keep away from extreme heat or cold</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Customer Reviews</h3>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold">{product.rating}</div>
                      <div className="flex items-center justify-center">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">{product.reviewCount} reviews</div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="mb-1 flex items-center gap-2">
                          <div className="text-sm">{rating} stars</div>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full bg-yellow-400"
                              style={{
                                width: rating === 5 ? "80%" : rating === 4 ? "15%" : rating === 3 ? "5%" : "0%",
                              }}
                            ></div>
                          </div>
                          <div className="text-sm">
                            {rating === 5 ? "38" : rating === 4 ? "7" : rating === 3 ? "3" : "0"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="space-y-6">
                    {product.reviews.map((review, index) => (
                      <div key={index}>
                        <div className="mb-2 flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.avatar} alt={review.user} />
                            <AvatarFallback>{review.user.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{review.user}</p>
                            <div className="flex items-center">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              <span className="ml-2 text-xs text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                        {index !== product.reviews.length - 1 && <Separator className="my-4" />}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    View All Reviews
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Shipping & Returns</h3>

                  <div className="mb-6">
                    <h4 className="mb-2 font-medium">Shipping Information</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-pink-500" />
                        <div>
                          <span className="font-medium">Standard Shipping:</span>
                          <p className="text-muted-foreground">3-5 business days (Free on orders over $35)</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-pink-500" />
                        <div>
                          <span className="font-medium">Express Shipping:</span>
                          <p className="text-muted-foreground">1-2 business days ($9.99)</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-pink-500" />
                        <div>
                          <span className="font-medium">International Shipping:</span>
                          <p className="text-muted-foreground">7-14 business days (Rates vary by location)</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium">Return Policy</h4>
                    <p className="mb-4 text-sm text-muted-foreground">
                      We want you and your cat to be completely satisfied with your purchase. If for any reason you're
                      not happy with your order, we offer a hassle-free return policy.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-pink-500" />
                        <div>
                          <span className="font-medium">30-Day Returns:</span>
                          <p className="text-muted-foreground">Return unused items within 30 days for a full refund</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-pink-500" />
                        <div>
                          <span className="font-medium">Damaged or Defective Items:</span>
                          <p className="text-muted-foreground">
                            Contact us within 7 days of delivery for replacement or refund
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-pink-500" />
                        <div>
                          <span className="font-medium">Return Process:</span>
                          <p className="text-muted-foreground">
                            Contact customer service to initiate a return and receive a prepaid shipping label
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="faq" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Frequently Asked Questions</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-1 font-medium">Is this toy safe for kittens?</h4>
                      <p className="text-sm text-muted-foreground">
                        Yes, this toy is designed to be safe for cats of all ages, including kittens. However, we
                        recommend supervising your kitten during play, especially when they're first getting used to the
                        toy.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-1 font-medium">How long does the battery last?</h4>
                      <p className="text-sm text-muted-foreground">
                        The rechargeable battery lasts up to 5 hours of continuous play. The toy also has an automatic
                        shut-off feature after 15 minutes to conserve battery life.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-1 font-medium">Can I replace the battery?</h4>
                      <p className="text-sm text-muted-foreground">
                        The battery is built-in and rechargeable via USB. It's not designed to be replaced by the user,
                        but with proper care, it should last for years of use.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-1 font-medium">Is the laser safe for my cat's eyes?</h4>
                      <p className="text-sm text-muted-foreground">
                        The laser is specifically designed to be safe for cats. However, as with any laser toy, you
                        should avoid pointing it directly at your cat's eyes.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-1 font-medium">How do I clean this toy?</h4>
                      <p className="text-sm text-muted-foreground">
                        Clean the exterior with a slightly damp cloth. Do not submerge in water or use harsh cleaning
                        chemicals as this may damage the electronic components.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {product.similarProducts.map((item) => (
              <Link href={`/product/${item.id}`} key={item.id}>
                <Card className="overflow-hidden border-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-1 font-semibold">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-pink-600">${item.price.toFixed(2)}</span>
                      <div className="flex items-center text-sm text-yellow-500">
                        {item.rating} <span className="ml-1">★</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

