import { ArrowLeftRight, Calendar, ShieldCheck, AlertCircle, HelpCircle, CheckCircle } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PageTransition } from "@/components/page-transition"

export default function ReturnsPage() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-700 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Returns & Refunds Policy</h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90">
              We want you and your cat to be completely satisfied with your purchase.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {/* Overview */}
              <div className="mb-12 rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">Returns Overview</h2>
                <p className="mb-6 text-muted-foreground">
                  At Chibi.com, we stand behind the quality of our products. If you're not completely satisfied with
                  your purchase, we're here to help with an easy return process.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-full bg-pink-100 p-2 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-medium">30-Day Returns</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Return most unused items within 30 days of delivery for a full refund.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                          <ArrowLeftRight className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-medium">Easy Process</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Start your return online through your account for a hassle-free experience.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-medium">Satisfaction Guarantee</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        If you're not happy with your purchase, we'll make it right.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Return Eligibility */}
              <div className="mb-12">
                <h2 className="mb-6 text-xl font-semibold">Return Eligibility</h2>

                <div className="mb-6 rounded-lg border p-6">
                  <h3 className="mb-4 font-medium">Items Eligible for Return</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                      <span>Unused and unopened products in original packaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                      <span>Defective or damaged items (please report within 7 days of receipt)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                      <span>Incorrect items received</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                      <span>Cat furniture and larger items (special conditions apply)</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 font-medium">Items Not Eligible for Return</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 text-red-500" />
                      <span>Food, treats, and perishable items for health and safety reasons</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 text-red-500" />
                      <span>Used or opened grooming products, beds, and litter boxes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 text-red-500" />
                      <span>Customized or personalized items</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 text-red-500" />
                      <span>Items marked as final sale or clearance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 text-red-500" />
                      <span>Gift cards and digital products</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Return Process */}
              <div className="mb-12">
                <h2 className="mb-6 text-xl font-semibold">Return Process</h2>

                <div className="rounded-lg border p-6">
                  <ol className="space-y-6">
                    <li className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                        1
                      </div>
                      <div>
                        <h3 className="mb-2 font-medium">Initiate Your Return</h3>
                        <p className="text-sm text-muted-foreground">
                          Log in to your Chibi.com account, go to "My Orders," find the order containing the item you
                          wish to return, and click "Return Item." Select the items you want to return and the reason
                          for your return.
                        </p>
                      </div>
                    </li>

                    <Separator />

                    <li className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                        2
                      </div>
                      <div>
                        <h3 className="mb-2 font-medium">Print Return Label</h3>
                        <p className="text-sm text-muted-foreground">
                          Once your return is approved, you'll receive a return shipping label via email. Print the
                          label and attach it to your package. If you can't print the label, contact customer service
                          for alternatives.
                        </p>
                      </div>
                    </li>

                    <Separator />

                    <li className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                        3
                      </div>
                      <div>
                        <h3 className="mb-2 font-medium">Package Your Return</h3>
                        <p className="text-sm text-muted-foreground">
                          Place the item(s) in the original packaging if possible, or use a sturdy box. Include all
                          original components, accessories, and documentation. Seal the package securely.
                        </p>
                      </div>
                    </li>

                    <Separator />

                    <li className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                        4
                      </div>
                      <div>
                        <h3 className="mb-2 font-medium">Ship Your Return</h3>
                        <p className="text-sm text-muted-foreground">
                          Drop off your package at any authorized shipping location for the carrier indicated on your
                          return label. We recommend getting a tracking number or receipt as proof of return.
                        </p>
                      </div>
                    </li>

                    <Separator />

                    <li className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                        5
                      </div>
                      <div>
                        <h3 className="mb-2 font-medium">Refund Processing</h3>
                        <p className="text-sm text-muted-foreground">
                          Once we receive and inspect your return, we'll process your refund. This typically takes 3-5
                          business days. You'll receive an email notification when your refund is processed.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Refund Information */}
              <div className="mb-12">
                <h2 className="mb-6 text-xl font-semibold">Refund Information</h2>

                <div className="rounded-lg border p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-medium">Refund Methods</h3>
                      <p className="text-sm text-muted-foreground">
                        Refunds will be issued to the original payment method used for the purchase. If the original
                        payment method is unavailable, we'll issue store credit or process the refund via an alternative
                        method.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-2 font-medium">Refund Timeline</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Processing time: 3-5 business days after receiving your return</li>
                        <li>• Credit/debit card refunds: 5-10 business days to appear on your statement</li>
                        <li>• PayPal refunds: 2-3 business days</li>
                        <li>• Store credit: Issued immediately after processing</li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-2 font-medium">Refund Amount</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Original purchase price of the returned item(s)</li>
                        <li>• Original shipping charges are non-refundable unless the return is due to our error</li>
                        <li>
                          • Return shipping costs are the customer's responsibility unless the return is due to our
                          error
                        </li>
                        <li>• Promotional discounts may affect the refund amount</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Cases */}
              <div className="mb-12">
                <h2 className="mb-6 text-xl font-semibold">Special Cases</h2>

                <div className="space-y-6">
                  <div className="rounded-lg border p-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-amber-100 p-1.5 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="mb-2 font-medium">Damaged or Defective Items</h3>
                        <p className="text-sm text-muted-foreground">
                          If you receive a damaged or defective item, please contact us within 7 days of delivery.
                          Include photos of the damage and the packaging. We'll provide a prepaid return label and
                          process a replacement or refund as soon as possible.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-amber-100 p-1.5 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="mb-2 font-medium">Incorrect Items</h3>
                        <p className="text-sm text-muted-foreground">
                          If you receive an item different from what you ordered, please contact us within 7 days of
                          delivery. We'll provide a prepaid return label and ship the correct item or process a refund
                          as soon as possible.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-amber-100 p-1.5 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="mb-2 font-medium">Large Items</h3>
                        <p className="text-sm text-muted-foreground">
                          For large items like cat trees or furniture, special return procedures may apply. Contact
                          customer service for assistance with returning these items, as they may require special
                          packaging or pickup arrangements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="rounded-lg bg-muted p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="mt-0.5 h-5 w-5 text-pink-600" />
                  <div>
                    <h3 className="mb-2 font-medium">Need Help with Returns?</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Our customer service team is here to assist you with any questions or concerns about returns and
                      refunds.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Email: returns@chibi.com</li>
                      <li>• Phone: 1-800-CAT-LOVE (Monday-Friday, 9am-5pm EST)</li>
                      <li>• Live Chat: Available on our website during business hours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

