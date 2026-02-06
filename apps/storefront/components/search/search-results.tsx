"use client"

import Image from "next/image"
import { Heart, ShoppingCart, Star, Check, Truck } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import type { FilterState } from "./search-content"

interface SearchResultsProps {
  filters: FilterState
  view: "grid" | "list"
}

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "Smartphones",
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    reviews: 2341,
    image: "/iphone-15-pro-titanium-smartphone.jpg",
    badge: "Best Seller",
    specs: ["256GB", "A17 Pro Chip", "Titanium"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    brand: "Apple",
    category: "Laptops",
    price: 2499,
    originalPrice: null,
    rating: 4.8,
    reviews: 892,
    image: "/macbook-pro-16-space-gray-laptop.jpg",
    badge: "New",
    specs: ["M3 Pro", "18GB RAM", "512GB SSD"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Audio",
    price: 349,
    originalPrice: 399,
    rating: 4.8,
    reviews: 4567,
    image: "/sony-wh1000xm5-headphones-black.jpg",
    badge: null,
    specs: ["30hr Battery", "Best ANC", "Hi-Res"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    price: 1299,
    originalPrice: 1399,
    rating: 4.7,
    reviews: 1823,
    image: "/samsung-galaxy-s24-ultra-titanium.jpg",
    badge: "Hot",
    specs: ["512GB", "200MP Camera", "S Pen"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: 5,
    name: "PlayStation 5 Slim",
    brand: "Sony",
    category: "Gaming",
    price: 449,
    originalPrice: 499,
    rating: 4.9,
    reviews: 8923,
    image: "/playstation-5-slim-console-white.jpg",
    badge: "Best Seller",
    specs: ["1TB SSD", "4K 120Hz", "DualSense"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: 6,
    name: 'Dell XPS 15"',
    brand: "Dell",
    category: "Laptops",
    price: 1799,
    originalPrice: 1999,
    rating: 4.6,
    reviews: 567,
    image: "/dell-xps-15-laptop-silver.jpg",
    badge: null,
    specs: ["Intel i7", "32GB RAM", "1TB SSD"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: 7,
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    category: "Wearables",
    price: 799,
    originalPrice: null,
    rating: 4.8,
    reviews: 1234,
    image: "/apple-watch-ultra-2-titanium.jpg",
    badge: "New",
    specs: ["Titanium", "GPS + Cell", "36hr Battery"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: 8,
    name: "AirPods Pro 2nd Gen",
    brand: "Apple",
    category: "Audio",
    price: 249,
    originalPrice: 279,
    rating: 4.7,
    reviews: 6789,
    image: "/airpods-pro-2-wireless-earbuds.jpg",
    badge: null,
    specs: ["ANC", "Spatial Audio", "USB-C"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: 9,
    name: 'Samsung 65" Neo QLED',
    brand: "Samsung",
    category: "TVs",
    price: 1999,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 445,
    image: "/samsung-neo-qled-65-inch-tv.jpg",
    badge: "Sale",
    specs: ["4K 120Hz", "Mini LED", "Smart TV"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: 10,
    name: "Nintendo Switch OLED",
    brand: "Nintendo",
    category: "Gaming",
    price: 349,
    originalPrice: null,
    rating: 4.8,
    reviews: 3456,
    image: "/nintendo-switch-oled-white.jpg",
    badge: null,
    specs: ['7" OLED', "64GB", "Dock Included"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: 11,
    name: "Bose QuietComfort Ultra",
    brand: "Bose",
    category: "Audio",
    price: 429,
    originalPrice: null,
    rating: 4.7,
    reviews: 892,
    image: "/bose-quietcomfort-ultra-headphones-black.jpg",
    badge: "New",
    specs: ["Immersive Audio", "24hr Battery", "ANC"],
    inStock: false,
    freeShipping: true,
  },
  {
    id: 12,
    name: 'iPad Pro 12.9"',
    brand: "Apple",
    category: "Tablets",
    price: 1099,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 2341,
    image: "/ipad-pro-12-9-space-gray.jpg",
    badge: null,
    specs: ["M2 Chip", "256GB", "Face ID"],
    inStock: true,
    freeShipping: true,
  },
]

export function SearchResults({ view }: SearchResultsProps) {
  if (view === "list") {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex gap-4 bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-colors"
          >
            {/* Image */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 bg-secondary/50 rounded-lg overflow-hidden">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-2" />
              {product.badge && (
                <Badge className="absolute top-2 left-2 text-xs bg-primary text-primary-foreground">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex-1">
                <span className="text-xs font-medium text-muted-foreground">{product.brand}</span>
                <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>

                {/* Specs */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.specs.map((spec) => (
                    <span key={spec} className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
                </div>

                {/* Stock & Shipping */}
                <div className="flex items-center gap-4 mt-2 text-xs">
                  {product.inStock ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <Check className="h-3 w-3" /> In Stock
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Out of Stock</span>
                  )}
                  {product.freeShipping && (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Truck className="h-3 w-3" /> Free Shipping
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-foreground">${product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button className="gap-2" disabled={!product.inStock}>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
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
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <span className="text-sm font-medium text-muted-foreground">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <div>
              <span className="text-xs font-medium text-muted-foreground">{product.brand}</span>
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
              <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-foreground">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <Button size="icon" className="h-9 w-9 rounded-full" disabled={!product.inStock}>
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
