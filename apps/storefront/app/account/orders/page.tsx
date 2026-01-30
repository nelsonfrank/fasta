"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { Package, ChevronRight } from "lucide-react"

const orders = [
  {
    id: "ORD-1234-5678",
    date: "Jan 15, 2024",
    total: "3,500,000 TZS",
    status: "Processing",
    items: 2,
  },
  {
    id: "ORD-8765-4321",
    date: "Dec 20, 2023",
    total: "780,000 TZS",
    status: "Delivered",
    items: 1,
  },
  {
    id: "ORD-9999-0000",
    date: "Nov 10, 2023",
    total: "1,350,000 TZS",
    status: "Cancelled",
    items: 3,
  },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">View your order history and check status.</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-muted/40 p-4">
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wide">Order Placed</span>
                  <span className="font-medium">{order.date}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wide">Total</span>
                  <span className="font-medium">{order.total}</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-muted-foreground block text-xs uppercase tracking-wide">Order #</span>
                  <span className="font-medium">{order.id}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="#">View Invoice</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center bg-secondary rounded-lg">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm sm:text-base">
                        Status: <span className={
                          order.status === "Delivered" ? "text-green-600" :
                            order.status === "Cancelled" ? "text-destructive" : "text-blue-600"
                        }>{order.status}</span>
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.items} item(s)</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  Order Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
