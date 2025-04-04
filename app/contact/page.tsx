"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/page-transition"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    topic: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTopicChange = (value: string) => {
    setFormData((prev) => ({ ...prev, topic: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        topic: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-700 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Contact Us</h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90">
              Have questions or need assistance? We're here to help you and your feline friend.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-pink-100 p-3 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Call Us</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Our customer service team is available Monday through Friday, 9am-5pm EST.
                  </p>
                  <a href="tel:1-800-CAT-LOVE" className="text-pink-600 hover:underline">
                    1-800-CAT-LOVE
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Email Us</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Send us an email and we'll get back to you within 24 hours.
                  </p>
                  <a href="mailto:support@chibi.com" className="text-pink-600 hover:underline">
                    support@chibi.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Live Chat</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Chat with our support team in real-time during business hours.
                  </p>
                  <Button className="bg-pink-600 hover:bg-pink-700">Start Chat</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Contact Form */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 text-xl font-semibold">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic</Label>
                      <Select value={formData.topic} onValueChange={handleTopicChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order">Order Inquiry</SelectItem>
                          <SelectItem value="product">Product Information</SelectItem>
                          <SelectItem value="return">Returns & Refunds</SelectItem>
                          <SelectItem value="shipping">Shipping & Delivery</SelectItem>
                          <SelectItem value="account">Account Help</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please provide details about your inquiry..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Location & Hours */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 text-pink-600" />
                      <div>
                        <h3 className="mb-2 font-medium">Our Headquarters</h3>
                        <p className="text-sm text-muted-foreground">
                          123 Cat Avenue, Suite 200
                          <br />
                          Purrington, CA 90210
                          <br />
                          United States
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-medium">Business Hours</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Monday - Friday</span>
                        <span className="text-sm font-medium">9:00 AM - 5:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Saturday</span>
                        <span className="text-sm font-medium">10:00 AM - 3:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Sunday</span>
                        <span className="text-sm font-medium">Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="overflow-hidden rounded-lg border">
                  <div className="aspect-video w-full">
                    {/* Placeholder for a map - in a real app, you would use Google Maps or similar */}
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <div className="text-center">
                        <MapPin className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Interactive Map</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="mx-auto grid max-w-4xl gap-4">
              {[
                {
                  question: "How quickly will I receive a response to my inquiry?",
                  answer:
                    "We strive to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling our customer service line.",
                },
                {
                  question: "Can I change or cancel my order after it's been placed?",
                  answer:
                    "Yes, you can modify or cancel your order within 1 hour of placing it. After that, please contact our customer service team as soon as possible, and we'll do our best to accommodate your request.",
                },
                {
                  question: "Do you offer international shipping?",
                  answer:
                    "Yes, we ship to select international destinations. Shipping rates and delivery times vary by location. You can see if we ship to your country during checkout or contact our customer service for more information.",
                },
                {
                  question: "What is your return policy?",
                  answer:
                    "We offer a 30-day return policy for most items. Products must be unused, in their original packaging, and in resalable condition. Please visit our Returns & Refunds page for complete details.",
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-medium">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

