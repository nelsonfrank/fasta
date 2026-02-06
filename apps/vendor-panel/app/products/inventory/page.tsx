"use client"

import { useState } from "react"
import { VendorLayout } from "@/components/vendor/vendor-layout"
import { VendorHeader } from "@/components/vendor/vendor-header"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Search,
  AlertTriangle,
  Package,
  TrendingDown,
  RefreshCw,
  Plus,
  Minus,
} from "lucide-react"

const inventory = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds Pro",
    sku: "WBE-PRO-001",
    variant: "Black",
    stock: 145,
    reserved: 12,
    incoming: 50,
    threshold: 20,
  },
  {
    id: 2,
    name: "Wireless Bluetooth Earbuds Pro",
    sku: "WBE-PRO-002",
    variant: "White",
    stock: 89,
    reserved: 5,
    incoming: 0,
    threshold: 20,
  },
  {
    id: 3,
    name: "USB-C Fast Charging Cable 2m",
    sku: "UCC-2M-001",
    variant: "Black",
    stock: 312,
    reserved: 28,
    incoming: 100,
    threshold: 50,
  },
  {
    id: 4,
    name: "Portable Power Bank 20000mAh",
    sku: "PPB-20K-001",
    variant: "Black",
    stock: 0,
    reserved: 0,
    incoming: 200,
    threshold: 30,
  },
  {
    id: 5,
    name: "Wireless Gaming Mouse RGB",
    sku: "WGM-RGB-001",
    variant: "Black",
    stock: 23,
    reserved: 8,
    incoming: 0,
    threshold: 25,
  },
  {
    id: 6,
    name: "Laptop Stand Adjustable",
    sku: "LSA-ALU-001",
    variant: "Silver",
    stock: 15,
    reserved: 3,
    incoming: 0,
    threshold: 20,
  },
]

const stats = [
  {
    title: "Total Stock",
    value: "1,247",
    icon: Package,
    color: "text-primary",
  },
  {
    title: "Low Stock Items",
    value: "8",
    icon: AlertTriangle,
    color: "text-warning",
  },
  {
    title: "Out of Stock",
    value: "3",
    icon: TrendingDown,
    color: "text-destructive",
  },
  {
    title: "Incoming Stock",
    value: "350",
    icon: RefreshCw,
    color: "text-success",
  },
]

export default function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState<typeof inventory[0] | null>(null)
  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove">("add")
  const [quantity, setQuantity] = useState("")

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return { label: "Out of Stock", class: "bg-destructive/10 text-destructive border-destructive/20" }
    if (stock <= threshold) return { label: "Low Stock", class: "bg-warning/10 text-warning border-warning/20" }
    return { label: "In Stock", class: "bg-success/10 text-success border-success/20" }
  }

  return (
    <VendorLayout>
      <VendorHeader
        title="Inventory"
        description="Track and manage your product stock levels"
      />
      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-secondary ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by product or SKU..."
                className="pl-9 bg-secondary/50 border-0"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] bg-secondary/50 border-0">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Inventory
          </Button>
        </div>

        {/* Inventory Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="text-muted-foreground text-xs font-medium">Product</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">SKU</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Variant</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium text-right">Available</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium text-right">Reserved</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium text-right">Incoming</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Status</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => {
                    const status = getStockStatus(item.stock, item.threshold)
                    return (
                      <TableRow key={item.id} className="hover:bg-secondary/30 border-border">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                              <Package className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <span className="font-medium text-sm max-w-[200px] truncate">
                              {item.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground font-mono">
                          {item.sku}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {item.variant}
                        </TableCell>
                        <TableCell className="text-sm font-medium text-right">
                          {item.stock}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground text-right">
                          {item.reserved}
                        </TableCell>
                        <TableCell className="text-sm text-right">
                          {item.incoming > 0 ? (
                            <span className="text-success">+{item.incoming}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[10px] ${status.class}`}>
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedItem(item)}
                              >
                                Adjust
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Adjust Stock</DialogTitle>
                                <DialogDescription>
                                  Update inventory for {item.name} ({item.variant})
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-secondary/30">
                                  <span className="text-muted-foreground">Current Stock:</span>
                                  <span className="text-2xl font-bold">{item.stock}</span>
                                </div>
                                <div className="space-y-2">
                                  <Label>Adjustment Type</Label>
                                  <div className="flex gap-2">
                                    <Button
                                      type="button"
                                      variant={adjustmentType === "add" ? "default" : "outline"}
                                      className="flex-1"
                                      onClick={() => setAdjustmentType("add")}
                                    >
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add Stock
                                    </Button>
                                    <Button
                                      type="button"
                                      variant={adjustmentType === "remove" ? "default" : "outline"}
                                      className="flex-1"
                                      onClick={() => setAdjustmentType("remove")}
                                    >
                                      <Minus className="mr-2 h-4 w-4" />
                                      Remove Stock
                                    </Button>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="quantity">Quantity</Label>
                                  <Input
                                    id="quantity"
                                    type="number"
                                    placeholder="Enter quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="reason">Reason (Optional)</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select reason" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="received">Stock Received</SelectItem>
                                      <SelectItem value="returned">Customer Return</SelectItem>
                                      <SelectItem value="damaged">Damaged/Defective</SelectItem>
                                      <SelectItem value="adjustment">Manual Adjustment</SelectItem>
                                      <SelectItem value="theft">Theft/Loss</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>Update Stock</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </VendorLayout>
  )
}
