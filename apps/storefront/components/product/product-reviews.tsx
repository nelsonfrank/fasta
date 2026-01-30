"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ThumbsUp, ThumbsDown, ChevronDown, ImageIcon, Filter } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Progress } from "@workspace/ui/components/progress"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import { cn } from "@workspace/ui/lib/utils"

const reviewStats = {
  average: 4.9,
  total: 2341,
  breakdown: [
    { stars: 5, count: 2010, percentage: 86 },
    { stars: 4, count: 234, percentage: 10 },
    { stars: 3, count: 70, percentage: 3 },
    { stars: 2, count: 20, percentage: 1 },
    { stars: 1, count: 7, percentage: 0 },
  ],
}

const reviews = [
  {
    id: 1,
    author: "Michael T.",
    avatar: "/professional-man-portrait.png",
    rating: 5,
    date: "December 15, 2025",
    verified: true,
    title: "Best iPhone Ever Made",
    content:
      "The titanium design feels incredible in hand - much lighter than expected. The camera system is a huge leap forward, especially the 5x telephoto. Battery life easily lasts a full day of heavy use. The Action Button is surprisingly useful once you customize it.",
    helpful: 234,
    notHelpful: 12,
    images: ["/iphone-photo-sample-landscape-mountain.jpg", "/iphone-photo-sample-night-city.jpg"],
    variant: "Natural Titanium, 256GB",
  },
  {
    id: 2,
    author: "Sarah K.",
    avatar: "/professional-woman-portrait.png",
    rating: 5,
    date: "December 10, 2025",
    verified: true,
    title: "Professional Photography in Your Pocket",
    content:
      "As a professional photographer, I'm blown away by the ProRAW capabilities and the new Log video recording. The dynamic range is exceptional. This has become my go-to camera for quick shoots and behind-the-scenes content.",
    helpful: 189,
    notHelpful: 8,
    images: [],
    variant: "Blue Titanium, 512GB",
  },
  {
    id: 3,
    author: "David L.",
    avatar: "/casual-man-portrait.png",
    rating: 4,
    date: "December 5, 2025",
    verified: true,
    title: "Great Phone, Minor USB-C Quirks",
    content:
      "Love almost everything about this phone. The switch to USB-C is welcome, but be aware that not all USB-C cables work at full speed. Make sure to get proper USB 3 cables. Other than that, it's a fantastic upgrade from my 13 Pro.",
    helpful: 156,
    notHelpful: 23,
    images: [],
    variant: "White Titanium, 256GB",
  },
  {
    id: 4,
    author: "Emma R.",
    avatar: "/young-woman-portrait-smile.jpg",
    rating: 5,
    date: "November 28, 2025",
    verified: true,
    title: "Gaming Performance is Insane",
    content:
      "The A17 Pro chip is ridiculous for gaming. Console-quality graphics on games like Resident Evil Village. No heating issues even after hours of playing. The 120Hz display makes everything buttery smooth.",
    helpful: 312,
    notHelpful: 15,
    images: ["/mobile-game-screenshot-action.jpg"],
    variant: "Natural Titanium, 1TB",
  },
]

export function ProductReviews() {
  const [filterRating, setFilterRating] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {/* Overall Rating */}
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-5xl font-bold text-foreground mb-2">{reviewStats.average}</div>
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-5 w-5",
                  i < Math.round(reviewStats.average) ? "fill-primary text-primary" : "fill-muted text-muted",
                )}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">Based on {reviewStats.total.toLocaleString()} reviews</p>
          <Button className="w-full mt-4">Write a Review</Button>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-3">
          {reviewStats.breakdown.map((item) => (
            <button
              key={item.stars}
              onClick={() => setFilterRating(filterRating === item.stars ? null : item.stars)}
              className={cn(
                "flex items-center gap-3 w-full p-2 rounded-lg transition-colors",
                filterRating === item.stars ? "bg-primary/10" : "hover:bg-secondary/50",
              )}
            >
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium text-foreground">{item.stars}</span>
                <Star className="h-4 w-4 fill-primary text-primary" />
              </div>
              <Progress value={item.percentage} className="flex-1 h-2" />
              <span className="text-sm text-muted-foreground w-16 text-right">{item.count.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Filter & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={filterRating === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilterRating(null)}
          >
            All Reviews
          </Badge>
          <Badge variant="outline" className="cursor-pointer gap-1">
            <ImageIcon className="h-3 w-3" />
            With Photos
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Verified Purchase
          </Badge>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Most Helpful
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews
          .filter((r) => filterRating === null || r.rating === filterRating)
          .map((review) => (
            <div key={review.id} className="bg-card border border-border rounded-xl p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{review.author}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3.5 w-3.5",
                              i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted",
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mt-4">
                <h4 className="font-semibold text-foreground">{review.title}</h4>
                <p className="text-muted-foreground mt-2 leading-relaxed">{review.content}</p>
                <div className="text-xs text-muted-foreground mt-2">Variant: {review.variant}</div>
              </div>

              {/* Images */}
              {review.images.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {review.images.map((img, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary">
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Review image ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Was this helpful?</span>
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  {review.helpful}
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                  <ThumbsDown className="h-4 w-4" />
                  {review.notHelpful}
                </Button>
              </div>
            </div>
          ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg" className="gap-2 bg-transparent">
          Load More Reviews
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
