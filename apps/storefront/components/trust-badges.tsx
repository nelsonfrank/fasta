import { Truck, Shield, RefreshCw, CreditCard } from "lucide-react"

const badges = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "In Dar es Salaam",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    description: "Extended protection",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Hassle-free process",
  },
  {
    icon: CreditCard,
    title: "Cash on Delivery",
    description: "Pay upon arrival",
  },
]

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
          {badges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
