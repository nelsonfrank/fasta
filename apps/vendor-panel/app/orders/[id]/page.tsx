"use client"

import { useState, use } from "react"
import Link from "next/link"
import { VendorLayout } from "@/components/vendor/vendor-layout"
import { VendorHeader } from "@/components/vendor/vendor-header"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Printer,
  FileText,
  MapPin,
  User,
  Mail,
  Phone,
  CreditCard,
  Copy,
} from "lucide-react"

// Mock order data
const order = {
  id: "ORD-2024-1234",
  customer: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
  },
  shipping: {
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
  },
  items: [
    {
      id: 1,
      name: "Wireless Bluetooth Earbuds Pro",
      sku: "WBE-PRO-001",
      variant: "Black",
      qty: 2,
      price: 79.99,
      total: 159.98,
    },
    {
      id: 2,
      name: "USB-C Fast Charging Cable 2m",
      sku: "UCC-2M-001",
      variant: "Black",
      qty: 1,
      price: 14.99,
      total: 14.99,
    },
  ],
  subtotal: 174.97,
  shipping_cost: 0,
  tax: 15.75,
  total: 190.72,
  status: "processing",
  payment: {
    method: "Credit Card",
    last4: "4242",
    status: "paid",
  },
  created_at: "Jan 28, 2026 at 10:24 AM",
  tracking: null,
  notes: "",
}

const statusSteps = [
  { key: "pending", label: "Pending", icon: Clock },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
]

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [currentStatus, setCurrentStatus] = useState(order.status)
  const [trackingNumber, setTrackingNumber] = useState("")

  const currentStepIndex = statusSteps.findIndex(s => s.key === currentStatus)

  const handleStatusUpdate = (newStatus: string) => {
    setCurrentStatus(newStatus)
  }

  return (
    <VendorLayout>
      <VendorHeader
        title={`Order ${resolvedParams.id}`}
        description={`Placed on ${order.created_at}`}
      />
      <main className="flex-1 p-4 lg:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link href="/orders">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Invoice
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Shipping Label
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Timeline */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Order Status</CardTitle>
                <CardDescription>Track the progress of this order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    {statusSteps.map((step, index) => {
                      const isCompleted = index <= currentStepIndex
                      const isCurrent = index === currentStepIndex
                      const StepIcon = step.icon
                      return (
                        <div key={step.key} className="flex flex-col items-center relative z-10">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${isCompleted
                                ? "bg-primary border-primary text-primary-foreground"
                                : "bg-secondary border-border text-muted-foreground"
                              }`}
                          >
                            <StepIcon className="h-5 w-5" />
                          </div>
                          <span
                            className={`mt-2 text-xs font-medium ${isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                              }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-0">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label className="text-xs text-muted-foreground">Update Status</Label>
                    <Select value={currentStatus} onValueChange={handleStatusUpdate}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {currentStatus === "shipped" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Add Tracking</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Tracking Information</DialogTitle>
                          <DialogDescription>
                            Enter the tracking number and carrier for this shipment
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Carrier</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select carrier" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="usps">USPS</SelectItem>
                                <SelectItem value="ups">UPS</SelectItem>
                                <SelectItem value="fedex">FedEx</SelectItem>
                                <SelectItem value="dhl">DHL</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Tracking Number</Label>
                            <Input
                              placeholder="Enter tracking number"
                              value={trackingNumber}
                              onChange={(e) => setTrackingNumber(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button>Save Tracking</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Order Items</CardTitle>
                <CardDescription>Items from your store in this order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30"
                    >
                      <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          SKU: {item.sku} | Variant: {item.variant}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.qty} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-medium">${item.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{order.shipping_cost === 0 ? "Free" : `$${order.shipping_cost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Customer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{order.customer.name}</p>
                    <p className="text-xs text-muted-foreground">Customer</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{order.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{order.customer.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Shipping Address</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="text-sm">
                    <p>{order.shipping.address}</p>
                    <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
                    <p>{order.shipping.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{order.payment.method}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    **** {order.payment.last4}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="bg-success/10 text-success border-success/20"
                >
                  {order.payment.status === "paid" ? "Paid" : "Pending"}
                </Badge>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Order Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add notes about this order..."
                  className="bg-secondary/50 border-0 min-h-[100px]"
                  defaultValue={order.notes}
                />
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </VendorLayout>
  )
}
