"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { useCart } from "@/lib/cart-context"

const products = [
  {
    id: 1,
    name: "ProBook Ultra 15",
    category: "Laptops",
    price: 1299,
    originalPrice: 1499,
    rating: 4.9,
    reviews: 234,
    image: "/ultrabook-laptop-silver-premium-tech-product.jpg",
    badge: "Best Seller",
    specs: ["Intel Core i7", "16GB RAM", "512GB SSD"],
  },
  {
    id: 2,
    name: "AeroSound Pro",
    category: "Audio",
    price: 349,
    originalPrice: null,
    rating: 4.8,
    reviews: 567,
    image: "/wireless-headphones-black-premium-noise-cancelling.jpg",
    badge: "New",
    specs: ["48hr Battery", "ANC", "Hi-Res Audio"],
  },
  {
    id: 3,
    name: "Galaxy Z Ultra",
    category: "Smartphones",
    price: 1199,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 892,
    image: "/foldable-smartphone-premium-tech-product.jpg",
    badge: null,
    specs: ["256GB", "5G", "108MP Camera"],
  },
  {
    id: 4,
    name: "GameStation X7",
    category: "Gaming",
    price: 499,
    originalPrice: null,
    rating: 4.9,
    reviews: 1203,
    image: "/gaming-console-black-sleek-premium-tech.jpg",
    badge: "Hot",
    specs: ["4K 120fps", "1TB SSD", "Ray Tracing"],
  },
  {
    id: 5,
    name: "SmartHub Echo",
    category: "Smart Home",
    price: 129,
    originalPrice: 149,
    rating: 4.6,
    reviews: 445,
    image: "/smart-speaker-home-device-premium-white.jpg",
    badge: null,
    specs: ["Voice Control", "Multi-room", "Matter Support"],
  },
  {
    id: 6,
    name: "ProWatch Series 9",
    category: "Wearables",
    price: 399,
    originalPrice: null,
    rating: 4.8,
    reviews: 678,
    image: "/smartwatch-premium-fitness-tracker-black.jpg",
    badge: "New",
    specs: ["GPS", "Health Tracking", "5-Day Battery"],
  },
  {
    id: 7,
    name: "PowerStation 100W",
    category: "Accessories",
    price: 79,
    originalPrice: 99,
    rating: 4.5,
    reviews: 234,
    image: "/placeholder.svg?height=400&width=400",
    badge: null,
    specs: ["100W Output", "20000mAh", "Fast Charge"],
  },
  {
    id: 8,
    name: "MechKey Pro",
    category: "Accessories",
    price: 199,
    originalPrice: null,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=400&width=400",
    badge: null,
    specs: ["Hot-swap", "RGB", "Wireless"],
  },
]

const filters = ["All", "Best Sellers", "New Arrivals", "On Sale"]

export function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [wishlist, setWishlist] = useState<number[]>([])
  const { addItem } = useCart();
  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Products</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked by our tech experts</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="rounded-full whitespace-nowrap"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
            >
              {/* Image */}
              <div className="relative aspect-square bg-secondary/50 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{product.badge}</Badge>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-primary text-primary" : ""}`} />
                  </Button>
                  <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">{product.category}</span>
                  <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
                </div>

                {/* Specs */}
                <div className="flex flex-wrap gap-1">
                  {product.specs.slice(0, 2).map((spec) => (
                    <span key={spec} className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-foreground">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <Button size="icon" className="h-9 w-9 rounded-full" onClick={() => addItem({
                    id: product.id,
                    title: product.name,
                    price: product.price,
                    image: product.image,
                    currency: "TZS",
                  })}>
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg" className="rounded-full px-8 bg-transparent">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
