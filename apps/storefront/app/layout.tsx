import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "@workspace/ui/globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechVault | Premium Electronics & Gadgets",
  description:
    "Shop the latest smartphones, laptops, gaming gear, and smart home devices. Free Delivery in Dar es Salaam.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#1f1f1f",
  width: "device-width",
  initialScale: 1,
}

import { CartProvider } from "@/lib/cart-context"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { AuthProvider } from "@/lib/auth-context"
import { ConvexClientProvider } from "@/components/providers/ConvexProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ConvexClientProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <WhatsAppButton />
            </CartProvider>
          </AuthProvider>
        </ConvexClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
