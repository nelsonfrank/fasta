"use client"

import { useState } from "react"
import Link from "next/link"
import { VendorLayout } from "@/components/vendor/vendor-layout"
import { VendorHeader } from "@/components/vendor/vendor-header"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Search,
  Eye,
  Printer,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react"

const orders = [
  {
    id: "ORD-2024-1234",
    customer: "John Doe",
    email: "john@example.com",
    items: [
      { name: "Wireless Bluetooth Earbuds Pro", qty: 2, price: "$79.99" },
      { name: "USB-C Cable 2m", qty: 1, price: "$14.99" },
    ],
    total: "$174.97",
    status: "pending",
    payment: "paid",
    date: "Jan 28, 2026 at 10:24 AM",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-2024-1233",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    items: [
      { name: "Laptop Stand Adjustable", qty: 1, price: "$34.99" },
    ],
    total: "$34.99",
    status: "processing",
    payment: "paid",
    date: "Jan 28, 2026 at 9:15 AM",
    address: "456 Oak Ave, Los Angeles, CA 90001",
  },
  {
    id: "ORD-2024-1232",
    customer: "Mike Johnson",
    email: "mike@example.com",
    items: [
      { name: "Wireless Gaming Mouse RGB", qty: 1, price: "$59.99" },
      { name: "Mechanical Keyboard TKL", qty: 1, price: "$89.99" },
      { name: "USB-C Cable 2m", qty: 3, price: "$14.99" },
    ],
    total: "$194.95",
    status: "shipped",
    payment: "paid",
    date: "Jan 27, 2026 at 3:45 PM",
    address: "789 Pine Rd, Chicago, IL 60601",
  },
  {
    id: "ORD-2024-1231",
    customer: "Emily Brown",
    email: "emily@example.com",
    items: [
      { name: "Portable Power Bank 20000mAh", qty: 2, price: "$49.99" },
    ],
    total: "$99.98",
    status: "delivered",
    payment: "paid",
    date: "Jan 27, 2026 at 11:30 AM",
    address: "321 Elm St, Houston, TX 77001",
  },
  {
    id: "ORD-2024-1230",
    customer: "David Lee",
    email: "david@example.com",
    items: [
      { name: "Wireless Bluetooth Earbuds Pro", qty: 1, price: "$79.99" },
    ],
    total: "$79.99",
    status: "cancelled",
    payment: "refunded",
    date: "Jan 26, 2026 at 2:00 PM",
    address: "654 Maple Dr, Phoenix, AZ 85001",
  },
]

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    class: "bg-warning/10 text-warning border-warning/20",
  },
  processing: {
    label: "Processing",
    icon: Package,
    class: "bg-primary/10 text-primary border-primary/20",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    class: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    class: "bg-success/10 text-success border-success/20",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    class: "bg-destructive/10 text-destructive border-destructive/20",
  },
}

const stats = [
  { label: "All Orders", value: 156, status: "all" },
  { label: "Pending", value: 12, status: "pending" },
  { label: "Processing", value: 8, status: "processing" },
  { label: "Shipped", value: 23, status: "shipped" },
  { label: "Delivered", value: 108, status: "delivered" },
  { label: "Cancelled", value: 5, status: "cancelled" },
]

export default function OrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")

  const toggleOrder = (id: string) => {
    setSelectedOrders(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    )
  }

  const filteredOrders = activeTab === "all"
    ? orders
    : orders.filter(o => o.status === activeTab)

  return (
    <VendorLayout>
      <VendorHeader
        title="Orders"
        description="View and manage orders from your customers"
      />
      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Stats Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-secondary/50 p-1 h-auto flex-wrap">
            {stats.map((stat) => (
              <TabsTrigger
                key={stat.status}
                value={stat.status}
                className="data-[state=active]:bg-background px-4 py-2"
              >
                <span>{stat.label}</span>
                <Badge variant="secondary" className="ml-2 text-[10px]">
                  {stat.value}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-9 bg-secondary/50 border-0"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] bg-secondary/50 border-0">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selectedOrders.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedOrders.length} selected
              </span>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print Labels
              </Button>
              <Button size="sm">
                Mark as Shipped
              </Button>
            </div>
          )}
        </div>

        {/* Orders Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedOrders(filteredOrders.map(o => o.id))
                          } else {
                            setSelectedOrders([])
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Order</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Customer</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Items</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Total</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Status</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Payment</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Date</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig]
                    const StatusIcon = status.icon
                    return (
                      <TableRow key={order.id} className="hover:bg-secondary/30 border-border">
                        <TableCell>
                          <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onCheckedChange={() => toggleOrder(order.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium text-sm font-mono">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {order.total}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[10px] ${status.class}`}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${order.payment === "paid"
                              ? "bg-success/10 text-success border-success/20"
                              : "bg-muted text-muted-foreground"
                              }`}
                          >
                            {order.payment === "paid" ? "Paid" : "Refunded"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {order.date.split(" at ")[0]}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link href={`/orders/${order.id}`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Printer className="h-4 w-4" />
                              <span className="sr-only">Print</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 1-5 of {filteredOrders.length} orders
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </main>
    </VendorLayout>
  )
}
