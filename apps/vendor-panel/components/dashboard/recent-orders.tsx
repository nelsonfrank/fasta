"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { ArrowRight, Eye } from "lucide-react"

const orders = [
  {
    id: "ORD-2024-1234",
    customer: "John Doe",
    items: 3,
    total: "$156.00",
    status: "pending",
    date: "Jan 28, 2026",
  },
  {
    id: "ORD-2024-1233",
    customer: "Sarah Wilson",
    items: 1,
    total: "$89.99",
    status: "processing",
    date: "Jan 28, 2026",
  },
  {
    id: "ORD-2024-1232",
    customer: "Mike Johnson",
    items: 5,
    total: "$324.50",
    status: "shipped",
    date: "Jan 27, 2026",
  },
  {
    id: "ORD-2024-1231",
    customer: "Emily Brown",
    items: 2,
    total: "$67.00",
    status: "delivered",
    date: "Jan 27, 2026",
  },
  {
    id: "ORD-2024-1230",
    customer: "David Lee",
    items: 4,
    total: "$212.75",
    status: "delivered",
    date: "Jan 26, 2026",
  },
]

const statusStyles: Record<string, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  processing: "bg-primary/10 text-primary border-primary/20",
  shipped: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  delivered: "bg-success/10 text-success border-success/20",
}

export function RecentOrders() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
        <Link href="/orders">
          <Button variant="ghost" size="sm" className="h-8 text-xs text-primary">
            View All Orders
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-muted-foreground text-xs font-medium">Order ID</TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium">Customer</TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium text-center">Items</TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium">Total</TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium">Status</TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium">Date</TableHead>
                <TableHead className="text-muted-foreground text-xs font-medium text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-secondary/30 border-border">
                  <TableCell className="font-medium text-sm">{order.id}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.customer}</TableCell>
                  <TableCell className="text-sm text-center text-muted-foreground">{order.items}</TableCell>
                  <TableCell className="text-sm font-medium">{order.total}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] capitalize ${statusStyles[order.status]}`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.date}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View order</span>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
