import { Truck, Clock, Globe, CreditCard, ShieldCheck, HelpCircle } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/page-transition"

export default function ShippingInfoPage() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-700 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Shipping Information</h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90">
              Everything you need to know about shipping, delivery times, and tracking your order.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="domestic" className="mx-auto max-w-4xl">
              <TabsList className="mb-8 grid w-full grid-cols-3">
                <TabsTrigger value="domestic">Domestic Shipping</TabsTrigger>
                <TabsTrigger value="international">International Shipping</TabsTrigger>
                <TabsTrigger value="tracking">Order Tracking</TabsTrigger>
              </TabsList>

              <TabsContent value="domestic" className="space-y-8">
                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Domestic Shipping Options</h2>
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardContent className="p-6">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="rounded-full bg-pink-100 p-2 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                              <Truck className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-medium">Standard Shipping</h3>
                          </div>
                          <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <span className="text-foreground">•</span>
                              <span>Delivery in 3-5 business days</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-foreground">•</span>
                              <span>$5.99 for orders under $50</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-foreground">•</span>
                              <span>FREE for orders over $50</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-foreground">•</span>
                              <span>Available to all 50 states</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                              <Clock className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-medium">Express Shipping</h3>
                          </div>
                          <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <span className="text-foreground">•</span>
                              <span>Delivery in 1-2 business days</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-foreground">•</span>
                              <span>$12.99 flat rate</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-foreground">•</span>
                              <span>Order by 2pm EST for same-day processing</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-foreground">•</span>
                              <span>Available to continental US only</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="mb-2 font-medium">Important Notes</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Business days are Monday through Friday, excluding federal holidays.</li>
                        <li>• Orders placed after 2pm EST will be processed the next business day.</li>
                        <li>• Delivery times are estimates and not guaranteed.</li>
                        <li>• Additional fees may apply for shipments to Alaska, Hawaii, and US territories.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Shipping Restrictions</h2>
                  <p className="mb-4 text-muted-foreground">
                    Some products may have shipping restrictions due to their nature or local regulations. These
                    include:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-foreground">•</span>
                      <span>
                        Certain cat foods and treats may not be available for shipment to all locations due to
                        ingredient restrictions.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-foreground">•</span>
                      <span>
                        Oversized items like large cat trees may require special shipping arrangements and additional
                        fees.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-foreground">•</span>
                      <span>Products containing catnip may have restrictions in certain jurisdictions.</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="international" className="space-y-8">
                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">International Shipping</h2>
                  <p className="mb-6 text-muted-foreground">
                    We're happy to ship Chibi.com products to cat lovers around the world! Please note that
                    international shipping rates, delivery times, and available products may vary by destination.
                  </p>

                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            <Globe className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-medium">Standard International</h3>
                        </div>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-foreground">•</span>
                            <span>Delivery in 7-14 business days</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-foreground">•</span>
                            <span>Rates starting at $19.99</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-foreground">•</span>
                            <span>Available to 60+ countries</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                            <Clock className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-medium">Express International</h3>
                        </div>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-foreground">•</span>
                            <span>Delivery in 3-5 business days</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-foreground">•</span>
                            <span>Rates starting at $39.99</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-foreground">•</span>
                            <span>Available to select countries</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="mb-2 font-medium">International Shipping Considerations</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        • Import duties, taxes, and customs fees are not included in the shipping cost and are the
                        responsibility of the recipient.
                      </li>
                      <li>
                        • Some products may not be available for international shipping due to country-specific
                        regulations.
                      </li>
                      <li>• International orders may require additional processing time.</li>
                      <li>• Tracking information may be limited once the package leaves the United States.</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Countries We Ship To</h2>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div>
                      <h3 className="mb-2 font-medium">North America</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Canada</li>
                        <li>• Mexico</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-medium">Europe</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• United Kingdom</li>
                        <li>• France</li>
                        <li>• Germany</li>
                        <li>• Italy</li>
                        <li>• Spain</li>
                        <li>• And 20+ more</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-medium">Asia Pacific</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Australia</li>
                        <li>• Japan</li>
                        <li>• Singapore</li>
                        <li>• South Korea</li>
                        <li>• And 10+ more</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tracking" className="space-y-8">
                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Tracking Your Order</h2>
                  <p className="mb-6 text-muted-foreground">
                    We provide tracking information for all orders so you can monitor your package's journey from our
                    warehouse to your doorstep.
                  </p>

                  <div className="mb-6 space-y-4">
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="mb-2 font-medium">How to Track Your Order</h3>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="font-medium text-foreground">1.</span>
                          <span>Log in to your Chibi.com account and navigate to "My Orders"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-medium text-foreground">2.</span>
                          <span>Find your order and click "Track Package"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-medium text-foreground">3.</span>
                          <span>You'll be redirected to the carrier's tracking page with real-time updates</span>
                        </li>
                      </ol>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="mb-2 font-medium">Tracking Email</h3>
                      <p className="text-sm text-muted-foreground">
                        Once your order ships, you'll automatically receive a shipping confirmation email with your
                        tracking number and a direct link to track your package.
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2 font-medium">Common Tracking Statuses</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Order Processed</p>
                        <p className="text-sm text-muted-foreground">
                          Your order has been received and is being prepared for shipment.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Shipped</p>
                        <p className="text-sm text-muted-foreground">
                          Your order has left our warehouse and is on its way to you.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">In Transit</p>
                        <p className="text-sm text-muted-foreground">
                          Your package is moving through the carrier's network.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Out for Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          Your package is on a delivery vehicle and will be delivered today.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Delivered</p>
                        <p className="text-sm text-muted-foreground">Your package has been delivered.</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-pink-50 p-4 dark:bg-pink-900/10">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="mt-0.5 h-5 w-5 text-pink-600" />
                      <div>
                        <h3 className="font-medium text-pink-600">Need Help with Tracking?</h3>
                        <p className="text-sm text-muted-foreground">
                          If your tracking information hasn't updated in 48 hours or you have any concerns about your
                          delivery, please contact our customer service team at support@chibi.com or call
                          1-800-CAT-LOVE.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Shipping Policies */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">Shipping Policies</h2>

            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-pink-100 p-2 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-medium">Payment & Processing</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Orders are processed within 1-2 business days</li>
                    <li>• We accept all major credit cards, PayPal, and Apple Pay</li>
                    <li>• Your card is only charged when your order ships</li>
                    <li>• Pre-orders may have different processing times</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-medium">Shipping Insurance</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• All orders over $75 include free shipping insurance</li>
                    <li>• Optional insurance available for all other orders</li>
                    <li>• Covers loss, theft, and damage during transit</li>
                    <li>• File claims within 14 days of estimated delivery date</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-medium">Shipping FAQ</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Can I change my shipping address? Yes, if the order hasn't shipped</li>
                    <li>• Do you offer gift wrapping? Yes, for a small additional fee</li>
                    <li>
                      • What if I'm not home for delivery? Packages will be left at your door or held according to
                      carrier policy
                    </li>
                    <li>• Can I expedite my order? Yes, contact customer service</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

