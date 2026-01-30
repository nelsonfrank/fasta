"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@workspace/ui/components/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const heroSlides = [
  {
    id: 1,
    title: "Laptops shouldn't be boring.",
    subtitle:
      'ProBook Ultra 15 is a 15.6" powerhouse with stylus support. Designed for performance, upgrades, and repairs.',
    cta: "Order Now",
    ctaSecondary: "Learn more",
    image: "/modern-ultrabook-laptop-floating-angle-premium-tec.jpg",
    bgColor: "bg-accent",
    price: 3500000,
    currency: "TZS",
  },
  {
    id: 2,
    title: "Sound without compromise.",
    subtitle:
      "Experience studio-quality audio with our new AeroSound Pro headphones. 48-hour battery life, noise cancellation, and premium comfort.",
    cta: "Add to Cart",
    ctaSecondary: "Compare models",
    image: "/premium-wireless-headphones-floating-black-backgro.jpg",
    bgColor: "bg-secondary",
    price: 780000,
    currency: "TZS",
  },
  {
    id: 3,
    title: "Gaming redefined.",
    subtitle:
      "The GX-7000 gaming console delivers 8K gaming, ray tracing, and lightning-fast load times. Your games will never be the same.",
    cta: "Add to Cart",
    ctaSecondary: "View specs",
    image: "/gaming-console-controller-neon-lights-tech-premium.jpg",
    bgColor: "bg-muted",
    price: 1350000,
    currency: "TZS",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { addItem } = useCart()

  const handleAddToCart = (slide: typeof heroSlides[0]) => {
    addItem({
      id: slide.id,
      title: slide.title,
      price: slide.price,
      currency: slide.currency, // Pass currency to cart
      image: slide.image
    })
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const slide = heroSlides[currentSlide]

  return (
    <section className="relative overflow-hidden">
      <div className={`${slide?.bgColor} transition-colors duration-500`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-20">
            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                {slide?.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">{slide?.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
                  onClick={() => slide && handleAddToCart(slide)}
                >
                  {slide?.cta}
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 border-foreground/20 bg-transparent">
                  {slide?.ctaSecondary}
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-square">
              <Image
                src={slide?.image || "/placeholder.svg"}
                alt={slide?.title || ""}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm border-0"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-foreground/20"
                }`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm border-0"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
