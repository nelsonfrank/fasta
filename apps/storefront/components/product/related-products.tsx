"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { useRef } from "react"

const relatedProducts = [
  {
    id: 2,
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 999,
    originalPrice: 1099,
    rating: 4.8,
    reviews: 1823,
    image: "/iphone-15-pro-titanium.png",
    badge: null,
  },
  {
    id: 3,
    name: "AirPods Pro 2nd Gen",
    brand: "Apple",
    price: 249,
    originalPrice: null,
    rating: 4.7,
    reviews: 6789,
    image: "/airpods-pro-2-wireless-earbuds.jpg",
    badge: "Often Bought Together",
  },
  {
    id: 4,
    name: "MagSafe Charger",
    brand: "Apple",
    price: 39,
    originalPrice: null,
    rating: 4.6,
    reviews: 2341,
    image: "/apple-magsafe-charger-white.jpg",
    badge: null,
  },
  {
    id: 5,
    name: "iPhone 15 Pro Max Case",
    brand: "Apple",
    price: 59,
    originalPrice: null,
    rating: 4.5,
    reviews: 892,
    image: "/iphone-silicone-case-premium-blue.jpg",
    badge: null,
  },
  {
    id: 6,
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    price: 799,
    originalPrice: null,
    rating: 4.9,
    reviews: 1234,
    image: "/apple-watch-ultra-2-titanium.jpg",
    badge: "Popular Combo",
  },
  {
    id: 7,
    name: "20W USB-C Power Adapter",
    brand: "Apple",
    price: 19,
    originalPrice: null,
    rating: 4.8,
    reviews: 4567,
    image: "/apple-20w-usb-c-power-adapter-white.jpg",
    badge: null,
  },
]

export function RelatedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">You May Also Like</h2>
          <p className="text-muted-foreground mt-1">Customers who viewed this also viewed</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full bg-transparent" onClick={() => scroll("left")}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full bg-transparent" onClick={() => scroll("right")}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group flex-shrink-0 w-[220px] snap-start">
            <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors">
              {/* Image */}
              <div className="relative aspect-square bg-secondary/50 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs">
                    {product.badge}
                  </Badge>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <div>
                  <span className="text-xs text-muted-foreground">{product.brand}</span>
                  <h3 className="font-medium text-foreground line-clamp-2 text-sm">{product.name}</h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-xs font-medium text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-bold text-foreground">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <Button size="icon" className="h-8 w-8 rounded-full" onClick={(e) => e.preventDefault()}>
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
