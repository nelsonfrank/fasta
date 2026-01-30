"use client"

import Image from "next/image"
import { Store, Star, MessageCircle, Package, Clock, BadgeCheck, ChevronRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"

export function SellerInfo() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Seller Profile */}
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-xl bg-secondary overflow-hidden flex-shrink-0">
            <Image src="/apple-store-logo-modern-minimalist.jpg" alt="Apple Official Store" fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">Apple Official Store</h3>
              <BadgeCheck className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="text-xs">
                Top Rated
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-foreground font-medium">4.9</span>
                <span>(125K Reviews)</span>
              </div>
              <span>•</span>
              <span>Active 2 minutes ago</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
              Official Apple products with full warranty and support. Authorized reseller since 2010.
            </p>
          </div>
        </div>

        {/* Seller Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button variant="outline" className="gap-2 bg-transparent">
            <MessageCircle className="h-4 w-4" />
            Chat Now
          </Button>
          <Button variant="secondary" className="gap-2">
            <Store className="h-4 w-4" />
            Visit Store
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Seller Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">12.5K+</div>
            <div className="text-sm text-muted-foreground">Products</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Star className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">98%</div>
            <div className="text-sm text-muted-foreground">Positive Feedback</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">&lt; 1 hr</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BadgeCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">14 Years</div>
            <div className="text-sm text-muted-foreground">On Platform</div>
          </div>
        </div>
      </div>
    </div>
  )
}
