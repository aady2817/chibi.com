"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, SortDesc, Tag, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

// Product type definition
type Product = {
  id: number
  name: string
  price: number
  category: string
  image: string
  rating: number
  featured?: boolean
  hot?: boolean
  sold: number
  ageRange?: string
  brand?: string
}

export default function ProductsPage() {
  // State for products and filters
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortOption, setSortOption] = useState("newest")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedAges, setSelectedAges] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [filtersApplied, setFiltersApplied] = useState(false)

  // Mock product data - in a real app, this would be fetched from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: "Interactive Laser Toy",
          price: 19.99,
          category: "Toys",
          image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQxP3jNlqe1jlXVSlKO8LsFweCI5isRttIh21BEuosEtks47AXSz27zZvk5IDt2Aeo0oFDZGDKvGMmhtrvv3ksDxGRmJ6_twRiV6NWnw4jvddCA3m3b6sS9",
          rating: 4.8,
          featured: true,
          sold: 128,
          ageRange: "All Ages",
          brand: "Whisker Wonders",
        },
        {
          id: 2,
          name: "Organic Catnip Bundle",
          price: 14.99,
          category: "Treats",
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.7,
          sold: 95,
          ageRange: "Adult",
          brand: "Purrfect Pets",
        },
        {
          id: 3,
          name: "Cozy Cat Bed",
          price: 39.99,
          category: "Beds & Furniture",
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.9,
          sold: 76,
          ageRange: "All Ages",
          brand: "Cat Comfort",
        },
        {
          id: 4,
          name: "Premium Wet Cat Food",
          price: 24.99,
          category: "Food & Treats",
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.6,
          hot: true,
          sold: 210,
          ageRange: "All Ages",
          brand: "Feline Finest",
        },
        {
          id: 5,
          name: "Cat Scratching Post",
          price: 29.99,
          category: "Beds & Furniture",
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.5,
          sold: 64,
          ageRange: "All Ages",
          brand: "Cat Comfort",
        },
        {
          id: 6,
          name: "Automatic Cat Feeder",
          price: 49.99,
          category: "Accessories",
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.7,
          featured: true,
          sold: 42,
          ageRange: "Adult",
          brand: "Whisker Wonders",
        },
        {
          id: 7,
          name: "Cat Grooming Brush",
          price: 12.99,
          category: "Grooming",
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.4,
          sold: 118,
          ageRange: "All Ages",
          brand: "Purrfect Pets",
        },
        {
          id: 8,
          name: "Cat Tunnel Toy",
          price: 18.99,
          category: "Toys",
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.6,
          hot: true,
          sold: 87,
          ageRange: "Kitten",
          brand: "Whisker Wonders",
        },
        {
          id: 9,
          name: "Calming Cat Diffuser",
          price: 34.99,
          category: "Health & Wellness",
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.8,
          sold: 53,
          ageRange: "Adult",
          brand: "Feline Finest",
        },
        {
          id: 10,
          name: "Kitten Starter Kit",
          price: 45.99,
          category: "Accessories",
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.9,
          sold: 72,
          ageRange: "Kitten",
          brand: "Purrfect Pets",
        },
        {
          id: 11,
          name: "Senior Cat Vitamins",
          price: 28.99,
          category: "Health & Wellness",
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.7,
          sold: 41,
          ageRange: "Senior",
          brand: "Feline Finest",
        },
        {
          id: 12,
          name: "Cat Water Fountain",
          price: 32.99,
          category: "Accessories",
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.8,
          sold: 105,
          ageRange: "All Ages",
          brand: "Cat Comfort",
        },
      ]

      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  // Filter products based on all criteria
  useEffect(() => {
    let result = [...products]

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by tab/category
    if (activeTab !== "all") {
      const categoryMap: Record<string, string[]> = {
        food: ["Food & Treats", "Treats"],
        toys: ["Toys"],
        accessories: ["Accessories", "Grooming"],
      }

      if (categoryMap[activeTab]) {
        result = result.filter((product) => categoryMap[activeTab].some((cat) => product.category.includes(cat)))
      }
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.some((cat) => product.category.includes(cat)))
    }

    // Filter by selected age ranges
    if (selectedAges.length > 0) {
      result = result.filter(
        (product) =>
          selectedAges.includes(product.ageRange || "All Ages") ||
          (selectedAges.includes("All Ages") && product.ageRange === "All Ages"),
      )
    }

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.brand || ""))
    }

    // Filter by price range
    if (priceRange.min !== "" || priceRange.max !== "") {
      const min = priceRange.min !== "" ? Number.parseFloat(priceRange.min) : 0
      const max = priceRange.max !== "" ? Number.parseFloat(priceRange.max) : Number.POSITIVE_INFINITY

      result = result.filter((product) => product.price >= min && product.price <= max)
    }

    // Sort products
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "popular":
        result.sort((a, b) => b.sold - a.sold)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
      default:
        // For demo purposes, we'll keep the original order for "newest"
        break
    }

    setFilteredProducts(result)
  }, [
    products,
    searchQuery,
    activeTab,
    selectedCategories,
    selectedAges,
    selectedBrands,
    priceRange,
    sortOption,
    filtersApplied,
  ])

  // Handle category checkbox change
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category])
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category))
    }
  }

  // Handle age range checkbox change
  const handleAgeChange = (age: string, checked: boolean) => {
    if (checked) {
      setSelectedAges((prev) => [...prev, age])
    } else {
      setSelectedAges((prev) => prev.filter((a) => a !== age))
    }
  }

  // Handle brand checkbox change
  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands((prev) => [...prev, brand])
    } else {
      setSelectedBrands((prev) => prev.filter((b) => b !== brand))
    }
  }

  // Apply filters
  const applyFilters = () => {
    setFiltersApplied(!filtersApplied)
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setActiveTab("all")
    setSortOption("newest")
    setPriceRange({ min: "", max: "" })
    setSelectedCategories([])
    setSelectedAges([])
    setSelectedBrands([])
    setFiltersApplied((prev) => !prev)
  }

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Categories for filter
  const categories = ["Food & Treats", "Toys", "Beds & Furniture", "Grooming", "Health & Wellness", "Accessories"]
  const ageRanges = ["Kitten", "Adult", "Senior", "All Ages"]
  const brands = ["Whisker Wonders", "Purrfect Pets", "Feline Finest", "Cat Comfort", "Meow Mix"]

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-700 py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl">Cat Products</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for cat toys, food, accessories..."
              className="h-12 bg-white pl-10 text-base shadow-lg"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-muted/20"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={resetFilters}>
                Reset All
              </Button>
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="mb-3 font-medium">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={category}
                        className="h-4 w-4 rounded border-gray-300 text-pink-600"
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => handleCategoryChange(category, e.target.checked)}
                      />
                      <label htmlFor={category} className="ml-2 text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="mb-3 font-medium">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    className="h-9"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    className="h-9"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                  />
                </div>
              </div>

              {/* Age Range */}
              <div>
                <h3 className="mb-3 font-medium">Cat Age</h3>
                <div className="space-y-2">
                  {ageRanges.map((age) => (
                    <div key={age} className="flex items-center">
                      <input
                        type="checkbox"
                        id={age}
                        className="h-4 w-4 rounded border-gray-300 text-pink-600"
                        checked={selectedAges.includes(age)}
                        onChange={(e) => handleAgeChange(age, e.target.checked)}
                      />
                      <label htmlFor={age} className="ml-2 text-sm">
                        {age}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="mb-3 font-medium">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        id={brand}
                        className="h-4 w-4 rounded border-gray-300 text-pink-600"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => handleBrandChange(brand, e.target.checked)}
                      />
                      <label htmlFor={brand} className="ml-2 text-sm">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-pink-600 hover:bg-pink-700" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div>
            {/* Sorting and View Options */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  <TabsTrigger value="food">Food & Treats</TabsTrigger>
                  <TabsTrigger value="toys">Toys</TabsTrigger>
                  <TabsTrigger value="accessories">Accessories</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="h-9 w-[180px]">
                    <SortDesc className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                // Loading skeletons
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="overflow-hidden rounded-lg border">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </div>
                  </div>
                ))
              ) : filteredProducts.length > 0 ? (
                // Product cards
                filteredProducts.map((product) => (
                  <Link href={`/product/${product.id}`} key={product.id}>
                    <Card className="overflow-hidden border-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {product.featured && (
                          <Badge className="absolute left-2 top-2 bg-pink-500 hover:bg-pink-600">Featured</Badge>
                        )}
                        {product.hot && (
                          <Badge className="absolute left-2 top-2 bg-amber-500 hover:bg-amber-600">Hot Deal</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <Badge variant="outline" className="rounded-sm px-2 py-0 text-xs font-normal">
                            {product.category}
                          </Badge>
                          <div className="flex items-center text-sm text-yellow-500">
                            {product.rating} <span className="ml-1">★</span>
                          </div>
                        </div>
                        <h3 className="mb-1 font-semibold">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-pink-600">${product.price.toFixed(2)}</span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Tag className="mr-1 h-3 w-3" />
                            {product.sold} sold
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                // No results found
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-muted p-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">No products found</h3>
                  <p className="mb-6 text-muted-foreground">
                    We couldn't find any products matching your criteria. Try adjusting your filters.
                  </p>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Pagination - only show if we have products */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 flex items-center justify-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8 bg-pink-50">
                  1
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  2
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  3
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  4
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  5
                </Button>
                <span className="mx-1">...</span>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  10
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

