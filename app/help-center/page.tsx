"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ChevronDown, ChevronRight, Mail, Phone, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/page-transition"

export default function HelpCenterPage() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-700 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Help Center</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              Find answers to your questions and get the support you need.
            </p>
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search for help articles..." className="h-12 bg-white pl-10 text-base shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  title: "Orders & Shipping",
                  description: "Track your order, shipping policies, and returns",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <rect width="16" height="13" x="4" y="6" rx="2" />
                      <path d="M16 6V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1" />
                      <path d="M8 21V10" />
                      <path d="M16 21V10" />
                    </svg>
                  ),
                  link: "/help-center/orders",
                },
                {
                  title: "Returns & Refunds",
                  description: "How to return items and get refunds",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                      <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                      <path d="M13 13h4" />
                      <path d="M15 15v-4" />
                    </svg>
                  ),
                  link: "/help-center/returns",
                },
                {
                  title: "Account & Payment",
                  description: "Manage your account and payment methods",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <circle cx="12" cy="8" r="5" />
                      <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                  ),
                  link: "/help-center/account",
                },
                {
                  title: "Product Information",
                  description: "Details about our products and care guides",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  ),
                  link: "/help-center/products",
                },
              ].map((item, index) => (
                <Link href={item.link} key={index}>
                  <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-4 rounded-full bg-pink-100 p-3 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                        {item.icon}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="mt-auto pt-4 text-sm font-medium text-pink-600">
                        Learn more <ChevronRight className="ml-1 inline-block h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>

            <Tabs defaultValue="orders" className="mx-auto max-w-3xl">
              <TabsList className="mb-6 grid w-full grid-cols-4">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="returns">Returns</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4">
                <FaqItem
                  question="How can I track my order?"
                  answer="Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can also view your order status by logging into your account and visiting the 'My Orders' section."
                />
                <FaqItem
                  question="How long will it take to receive my order?"
                  answer="Standard shipping typically takes 3-5 business days. Express shipping is 1-2 business days. Please note that these are estimates and delivery times may vary based on your location."
                />
                <FaqItem
                  question="Can I change or cancel my order?"
                  answer="You can modify or cancel your order within 1 hour of placing it. After that, your order begins processing and cannot be changed. Please contact customer service immediately if you need to make changes."
                />
                <FaqItem
                  question="Do you ship internationally?"
                  answer="Yes, we ship to select international destinations. International shipping rates and delivery times vary by location. You can see if we ship to your country during checkout."
                />
              </TabsContent>

              <TabsContent value="returns" className="space-y-4">
                <FaqItem
                  question="What is your return policy?"
                  answer="We offer a 30-day return policy for most items. Products must be unused, in their original packaging, and in resalable condition. Some items, like food and treats, cannot be returned for health and safety reasons."
                />
                <FaqItem
                  question="How do I start a return?"
                  answer="To initiate a return, log into your account, go to 'My Orders,' select the order containing the item you wish to return, and click 'Return Item.' Follow the instructions to complete the return process."
                />
                <FaqItem
                  question="How long does it take to process a refund?"
                  answer="Once we receive your return, it typically takes 3-5 business days to process. After processing, refunds are issued to your original payment method and may take an additional 5-10 business days to appear on your statement."
                />
                <FaqItem
                  question="Do I have to pay for return shipping?"
                  answer="For standard returns, customers are responsible for return shipping costs. If you received a damaged or incorrect item, we'll provide a prepaid return label at no cost to you."
                />
              </TabsContent>

              <TabsContent value="account" className="space-y-4">
                <FaqItem
                  question="How do I create an account?"
                  answer="You can create an account by clicking the 'Sign In / Register' button in the top right corner of our website. Follow the prompts to enter your information and create a password."
                />
                <FaqItem
                  question="I forgot my password. How do I reset it?"
                  answer="Click on 'Sign In,' then select 'Forgot Password.' Enter the email address associated with your account, and we'll send you instructions to reset your password."
                />
                <FaqItem
                  question="How do I update my payment information?"
                  answer="Log into your account, go to 'Account Settings,' and select 'Payment Methods.' From there, you can add, edit, or remove payment methods."
                />
                <FaqItem
                  question="Can I have multiple shipping addresses?"
                  answer="Yes, you can save multiple shipping addresses in your account. During checkout, you'll be able to select from your saved addresses or add a new one."
                />
              </TabsContent>

              <TabsContent value="products" className="space-y-4">
                <FaqItem
                  question="Are your products safe for cats?"
                  answer="Yes, all our products are specifically designed for cats and undergo rigorous safety testing. We select products made from non-toxic materials that are safe for your feline friends."
                />
                <FaqItem
                  question="How do I know which size to order for my cat?"
                  answer="Most of our products include size guides with measurements. If you're unsure, check your cat's weight and measurements against our size charts, or contact customer service for assistance."
                />
                <FaqItem
                  question="Do you offer samples of cat food or treats?"
                  answer="We occasionally offer sample packs of select food and treats. Check our 'Special Offers' section or sign up for our newsletter to be notified when samples are available."
                />
                <FaqItem
                  question="How should I clean cat toys and accessories?"
                  answer="Cleaning instructions vary by product. Generally, fabric toys can be hand-washed with mild soap and air-dried. Electronic toys should be wiped with a damp cloth. Always check the product description or packaging for specific care instructions."
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">Still Need Help?</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Email Us</h3>
                  <p className="mb-4 text-sm text-muted-foreground">We'll respond to your inquiry within 24 hours.</p>
                  <a href="mailto:support@chibi.com" className="text-pink-600 hover:underline">
                    support@chibi.com
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Call Us</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Available Monday-Friday, 9am-5pm EST</p>
                  <a href="tel:1-800-CAT-LOVE" className="text-pink-600 hover:underline">
                    1-800-CAT-LOVE
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Live Chat</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Chat with our support team in real-time.</p>
                  <Button className="bg-pink-600 hover:bg-pink-700">Start Chat</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

// FAQ Item Component
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <button
        className="flex w-full items-center justify-between p-4 text-left font-medium focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="border-t p-4">
          <p className="text-muted-foreground">{answer}</p>
        </div>
      )}
    </div>
  )
}

