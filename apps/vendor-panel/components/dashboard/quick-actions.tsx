"use client"

import Link from "next/link"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import {
  Plus,
  FileText,
  Wallet,
  Settings,
  ArrowRight,
} from "lucide-react"

const actions = [
  {
    title: "Add Product",
    description: "List a new product in your store",
    icon: Plus,
    href: "/products/new",
    variant: "default" as const,
  },
  {
    title: "Process Orders",
    description: "5 orders awaiting processing",
    icon: FileText,
    href: "/orders",
    variant: "secondary" as const,
  },
  {
    title: "Request Payout",
    description: "Available balance: $4,326",
    icon: Wallet,
    href: "/wallet",
    variant: "secondary" as const,
  },
  {
    title: "Store Settings",
    description: "Customize your store page",
    icon: Settings,
    href: "/shop",
    variant: "secondary" as const,
  },
]

export function QuickActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Link key={action.title} href={action.href}>
          <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${action.variant === "default"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
                }`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{action.title}</p>
                <p className="text-xs text-muted-foreground truncate">{action.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
