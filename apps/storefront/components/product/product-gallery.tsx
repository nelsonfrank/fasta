"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@/lib/utils"

const productImages = [
  {
    id: 1,
    src: "/iphone-15-pro-titanium-smartphone.jpg",
    alt: "iPhone 15 Pro Max - Front View",
  },
  {
    id: 2,
    src: "/iphone-15-pro-max-back-titanium-finish-camera-modu.jpg",
    alt: "iPhone 15 Pro Max - Back View",
  },
  {
    id: 3,
    src: "/iphone-15-pro-max-side-profile-titanium-buttons.jpg",
    alt: "iPhone 15 Pro Max - Side View",
  },
  {
    id: 4,
    src: "/iphone-15-pro-max-camera-closeup-48mp-lens.jpg",
    alt: "iPhone 15 Pro Max - Camera Detail",
  },
  {
    id: 5,
    src: "/iphone-15-pro-max-display-dynamic-island-screen.jpg",
    alt: "iPhone 15 Pro Max - Display",
  },
]

export function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnail Strip */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] pb-2 lg:pb-0 lg:pr-2">
        {productImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all",
              selectedImage === index
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50",
            )}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1">
        <div
          className={cn(
            "relative aspect-square bg-secondary/30 rounded-2xl overflow-hidden cursor-zoom-in",
            isZoomed && "cursor-zoom-out",
          )}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <Image
            src={productImages?.[selectedImage]?.src || "/placeholder.svg"}
            alt={productImages?.[selectedImage]?.alt || ""}
            fill
            className={cn("object-contain p-6 transition-transform duration-300", isZoomed && "scale-150")}
            priority
          />

          {/* Zoom indicator */}
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2">
            <ZoomIn className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Navigation arrows */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-muted-foreground">
          {selectedImage + 1} / {productImages.length}
        </div>
      </div>
    </div>
  )
}
