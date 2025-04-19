import type React from "react"
import { Inter } from "next/font/google"
import ClientRootLayout from "./ClientRootLayout"
import { AuthProvider } from "@/components/auth-context"
import { CartProvider } from "@/components/cart-context"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Chibi.com - Premium Cat Products",
  description: "The best products for your feline friend. Shop toys, food, accessories and more.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <CartProvider>
        <ClientRootLayout>{children}</ClientRootLayout>
      </CartProvider>
    </AuthProvider>
  )
}
