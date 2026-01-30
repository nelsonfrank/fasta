"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Share2, Star, Check, Truck, Shield, RotateCcw, Minus, Plus, Zap } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"

const colorOptions = [
  { name: "Natural Titanium", value: "#9A9A98", available: true },
  { name: "Blue Titanium", value: "#4A5568", available: true },
  { name: "White Titanium", value: "#E5E5E5", available: true },
  { name: "Black Titanium", value: "#1A1A1A", available: false },
]

const storageOptions = [
  { size: "256GB", price: 1199, available: true },
  { size: "512GB", price: 1399, available: true },
  { size: "1TB", price: 1599, available: true },
]

export function ProductInfo() {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0])
  const [selectedStorage, setSelectedStorage] = useState(storageOptions[0])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  return (
    <div className="flex flex-col">
      {/* Brand & Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            Apple
          </Badge>
          <Badge className="bg-primary/10 text-primary border-0 text-xs">Best Seller</Badge>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">
          iPhone 15 Pro Max - Titanium Design, A17 Pro Chip
        </h1>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3 mt-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn("h-4 w-4", i < 4 ? "fill-primary text-primary" : "fill-primary/30 text-primary/30")}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-foreground">4.9</span>
        <a href="#reviews" className="text-sm text-primary hover:underline">
          2,341 Reviews
        </a>
        <Separator orientation="vertical" className="h-4" />
        <span className="text-sm text-muted-foreground">5.2K+ Sold</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 mt-6">
        <span className="text-3xl font-bold text-foreground">${selectedStorage?.price?.toLocaleString()}</span>
        <span className="text-lg text-muted-foreground line-through">
          ${((selectedStorage?.price || 0) + 100).toLocaleString()}
        </span>
        <Badge variant="destructive" className="text-xs">
          Save $100
        </Badge>
      </div>

      {/* Quick Benefits */}
      <div className="flex flex-wrap gap-4 mt-6 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Truck className="h-4 w-4 text-primary" />
          <span>Free Express Shipping</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="h-4 w-4 text-primary" />
          <span>2 Year Warranty</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <RotateCcw className="h-4 w-4 text-primary" />
          <span>30-Day Returns</span>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Color Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Color</span>
          <span className="text-sm text-muted-foreground">{selectedColor?.name}</span>
        </div>
        <div className="flex gap-3">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => color.available && setSelectedColor(color)}
              disabled={!color.available}
              className={cn(
                "relative w-10 h-10 rounded-full border-2 transition-all",
                selectedColor?.name === color.name
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50",
                !color.available && "opacity-40 cursor-not-allowed",
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {selectedColor?.name === color.name && (
                <Check className="absolute inset-0 m-auto h-4 w-4 text-primary-foreground drop-shadow-md" />
              )}
              {!color.available && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-muted-foreground rotate-45" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Storage Selection */}
      <div className="space-y-3 mt-6">
        <span className="text-sm font-medium text-foreground">Storage</span>
        <div className="flex flex-wrap gap-3">
          {storageOptions.map((option) => (
            <button
              key={option.size}
              onClick={() => setSelectedStorage(option)}
              disabled={!option.available}
              className={cn(
                "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                selectedStorage?.size === option.size
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50 text-foreground",
                !option.available && "opacity-40 cursor-not-allowed",
              )}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span>{option.size}</span>
                <span className="text-xs text-muted-foreground">${option.price}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="space-y-3 mt-6">
        <span className="text-sm font-medium text-foreground">Quantity</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-r-none"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-l-none"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm text-green-600 flex items-center gap-1">
            <Check className="h-4 w-4" />
            In Stock (24 available)
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button size="lg" className="flex-1 gap-2 h-12 text-base" onClick={() => addItem({
          id: 1,
          title: "iPhone 15 Pro Max",
          price: selectedStorage?.price || 0,
          image: "/images/iphone-15-pro-max.jpg",
        })}>
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </Button>
        <Button size="lg" variant="secondary" className="flex-1 gap-2 h-12 text-base">
          <Zap className="h-5 w-5" />
          Buy Now
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-primary"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-primary text-primary")} />
          {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>

      {/* Key Specs */}
      <div className="mt-6 p-4 bg-secondary/50 rounded-xl">
        <h3 className="text-sm font-medium text-foreground mb-3">Key Specifications</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Display</span>
            <span className="text-foreground">6.7" Super Retina</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Chip</span>
            <span className="text-foreground">A17 Pro</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Camera</span>
            <span className="text-foreground">48MP Main</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Battery</span>
            <span className="text-foreground">29hr Video</span>
          </div>
        </div>
      </div>
    </div>
  )
}
