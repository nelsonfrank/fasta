import Image from "next/image"
import { Button } from "@workspace/ui/components/button"

export function PromoSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Promo */}
          <div className="relative rounded-3xl bg-foreground text-background overflow-hidden">
            <div className="relative z-10 p-8 lg:p-12 flex flex-col h-full min-h-[400px]">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold w-fit">
                Limited Time Offer
              </span>
              <div className="mt-auto">
                <h3 className="text-3xl lg:text-4xl font-bold mt-6 text-balance">
                  TechVault Desktop is a big computer made mini.
                </h3>
                <p className="mt-4 text-background/80 max-w-md">
                  Massive gaming capability, heavy-duty AI compute, and standard PC parts, all in 4.5L.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Button className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                    Pre-order Now
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full px-8 border-background/30 text-background hover:bg-background/10 bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-80">
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="TechVault Desktop"
                fill
                className="object-contain object-right p-8"
              />
            </div>
          </div>

          {/* Side Promos */}
          <div className="grid gap-6">
            <div className="relative rounded-3xl bg-accent overflow-hidden">
              <div className="p-8 flex items-center gap-6">
                <div className="flex-1">
                  <span className="text-xs font-semibold text-primary">Save up to 40%</span>
                  <h3 className="text-2xl font-bold text-foreground mt-2">Audio Essentials</h3>
                  <p className="text-muted-foreground mt-2">Premium headphones & speakers at unbeatable prices.</p>
                  <Button className="mt-4 rounded-full" size="sm">
                    Shop Now
                  </Button>
                </div>
                <div className="relative w-32 h-32 shrink-0">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Audio products"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl bg-secondary overflow-hidden">
              <div className="p-8 flex items-center gap-6">
                <div className="flex-1">
                  <span className="text-xs font-semibold text-primary">New Collection</span>
                  <h3 className="text-2xl font-bold text-foreground mt-2">Smart Home Bundle</h3>
                  <p className="text-muted-foreground mt-2">Everything you need to automate your home.</p>
                  <Button className="mt-4 rounded-full" size="sm">
                    Explore
                  </Button>
                </div>
                <div className="relative w-32 h-32 shrink-0">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Smart home products"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
