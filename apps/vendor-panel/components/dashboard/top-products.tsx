"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { ArrowRight } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    sku: "WBE-001",
    sold: 124,
    revenue: "$3,720",
    stock: 45,
    status: "in-stock",
  },
  {
    id: 2,
    name: "USB-C Fast Charging Cable",
    sku: "UCC-002",
    sold: 98,
    revenue: "$1,470",
    stock: 12,
    status: "low-stock",
  },
  {
    id: 3,
    name: "Portable Power Bank 20000mAh",
    sku: "PPB-003",
    sold: 76,
    revenue: "$2,660",
    stock: 0,
    status: "out-of-stock",
  },
  {
    id: 4,
    name: "Laptop Stand Adjustable",
    sku: "LSA-004",
    sold: 65,
    revenue: "$1,950",
    stock: 89,
    status: "in-stock",
  },
]

export function TopProducts() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Top Selling Products</CardTitle>
        <Link href="/products">
          <Button variant="ghost" size="sm" className="h-8 text-xs text-primary">
            View All
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground">{product.sku}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-medium text-foreground">{product.revenue}</p>
                <p className="text-xs text-muted-foreground">{product.sold} sold</p>
              </div>
              <Badge
                variant={
                  product.status === "in-stock"
                    ? "secondary"
                    : product.status === "low-stock"
                      ? "outline"
                      : "destructive"
                }
                className={`text-[10px] ${product.status === "in-stock"
                    ? "bg-success/10 text-success border-success/20"
                    : product.status === "low-stock"
                      ? "bg-warning/10 text-warning border-warning/20"
                      : ""
                  }`}
              >
                {product.status === "in-stock"
                  ? "In Stock"
                  : product.status === "low-stock"
                    ? "Low Stock"
                    : "Out of Stock"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
