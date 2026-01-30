import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Smartphones",
    description: "Latest flagships & accessories",
    image: "/smartphone-iphone-android-premium-floating.jpg",
    href: "#",
    itemCount: "234 products",
  },
  {
    name: "Laptops & PCs",
    description: "Work, create, and game",
    image: "/macbook-laptop-premium-floating-minimal.jpg",
    href: "#",
    itemCount: "156 products",
  },
  {
    name: "Gaming",
    description: "Consoles, PCs & accessories",
    image: "/gaming-controller-ps5-xbox-premium-floating.jpg",
    href: "#",
    itemCount: "312 products",
  },
  {
    name: "Audio",
    description: "Headphones, speakers & more",
    image: "/airpods-headphones-audio-premium-floating.jpg",
    href: "#",
    itemCount: "189 products",
  },
  {
    name: "Smart Home",
    description: "Automate your life",
    image: "/smart-home-device-echo-speaker-premium-floating.jpg",
    href: "#",
    itemCount: "98 products",
  },
  {
    name: "Wearables",
    description: "Watches, trackers & more",
    image: "/smartwatch-apple-watch-premium-floating.jpg",
    href: "#",
    itemCount: "67 products",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Shop by Category</h2>
            <p className="mt-2 text-muted-foreground">Find exactly what you're looking for</p>
          </div>
          <Link href="#" className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            View all categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group relative overflow-hidden rounded-2xl bg-secondary ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "aspect-square md:aspect-[2/1]" : "aspect-square"}`}>
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-medium text-background/70">{category.itemCount}</span>
                <h3 className="text-xl font-bold text-background">{category.name}</h3>
                <p className="text-sm text-background/80 mt-1">{category.description}</p>
              </div>
              <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-5 w-5 text-background" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
