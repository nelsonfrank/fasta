"use client"

import { useCart } from "@/lib/cart-context"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"

export function OrderSummary() {
  const { items, cartTotal } = useCart()

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS' }).format(amount)
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          <ShoppingBag className="mx-auto h-12 w-12 mb-4 opacity-50" />
          <p>Your cart is empty.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4">
              <div className="relative h-16 w-16 flex-none overflow-hidden rounded-md border border-secondary bg-secondary/50">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <span className="font-medium line-clamp-2 text-sm">{item.title}</span>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                  <span className="font-medium text-sm">{formatCurrency((item.price) * item.quantity)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Separator />

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-6">
        <div className="flex items-center justify-between w-full">
          <span className="font-bold text-lg">Total</span>
          <span className="font-bold text-lg text-primary">{formatCurrency(cartTotal)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
