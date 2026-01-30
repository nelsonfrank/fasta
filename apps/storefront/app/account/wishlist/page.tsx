"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import Image from "next/image"
import { ShoppingCart, Trash2 } from "lucide-react"

// Mock Wishlist Data
const wishlistItems = [
  {
    id: 101,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 850000,
    currency: "TZS",
    image: "/premium-wireless-headphones-floating-black-backgro.jpg",
    inStock: true,
  },
  {
    id: 102,
    title: "Mechanical Keyboard RGB",
    price: 250000,
    currency: "TZS",
    image: "/placeholder.svg", // Fallback
    inStock: false,
  }
]

export default function WishlistPage() {
  const { addItem } = useCart()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wishlist</h1>
        <p className="text-muted-foreground">Save items you want to buy later.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="group relative rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">
            <div className="aspect-square relative bg-secondary/50">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-4"
              />
              {!item.inStock && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                  <Badge variant="destructive">Out of Stock</Badge>
                </div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold leading-none tracking-tight mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-lg font-bold mb-4">
                {new Intl.NumberFormat('en-TZ', { style: 'currency', currency: item.currency }).format(item.price)}
              </p>

              <div className="mt-auto flex gap-2">
                <Button
                  className="flex-1"
                  disabled={!item.inStock}
                  onClick={() => addItem({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    currency: item.currency,
                    image: item.image
                  })}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
