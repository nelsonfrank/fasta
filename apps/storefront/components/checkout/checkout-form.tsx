"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { Loader2 } from "lucide-react"

const regions = [
  "Dar es Salaam",
  "Arusha",
  "Dodoma",
  "Mwanza",
  "Zanzibar",
  "Mbeya",
  "Morogoro",
  "Tanga",
  "Kilimanjaro",
  "Other",
]

export function CheckoutForm() {
  const router = useRouter()
  const { clearCart } = useCart()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    clearCart()
    // In a real app, we'd redirect to a success page or order history
    // For now, we'll show a success alert and go home
    alert("Order placed successfully! We will contact you for delivery.")
    router.push("/")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Details */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Details</CardTitle>
          <CardDescription>Where should we send your order?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" required placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" required placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" required placeholder="07XXXXXXXX" />
            <p className="text-xs text-muted-foreground">Used for delivery coordination</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Street Address / Location</Label>
            <Input id="address" required placeholder="e.g. Sinza Makaburini, near Kijitonyama" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select defaultValue="Dar es Salaam">
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" required placeholder="e.g. Kinondoni" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Select how you want to pay</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="cod" className="grid gap-4">
            <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex-1 cursor-pointer">
                <span className="font-semibold">Cash on Delivery</span>
                <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
              </Label>
            </div>

            <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent">
              <RadioGroupItem value="mobile-money" id="mobile-money" />
              <Label htmlFor="mobile-money" className="flex-1 cursor-pointer">
                <span className="font-semibold">Mobile Money</span>
                <p className="text-sm text-muted-foreground">M-Pesa, Tigo Pesa, Airtel Money</p>
              </Label>
            </div>

            <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex-1 cursor-pointer">
                <span className="font-semibold">Card Payment</span>
                <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full text-lg" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Place Order"
        )}
      </Button>
    </form>
  )
}
