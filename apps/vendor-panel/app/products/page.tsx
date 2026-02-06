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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Copy,
  Package,
} from "lucide-react"

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds Pro",
    sku: "WBE-PRO-001",
    category: "Electronics",
    price: "$79.99",
    stock: 145,
    status: "active",
    variants: 3,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "USB-C Fast Charging Cable 2m",
    sku: "UCC-2M-002",
    category: "Accessories",
    price: "$14.99",
    stock: 312,
    status: "active",
    variants: 4,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Portable Power Bank 20000mAh",
    sku: "PPB-20K-003",
    category: "Electronics",
    price: "$49.99",
    stock: 0,
    status: "out-of-stock",
    variants: 2,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Laptop Stand Adjustable Aluminum",
    sku: "LSA-ALU-004",
    category: "Accessories",
    price: "$34.99",
    stock: 89,
    status: "active",
    variants: 1,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Wireless Gaming Mouse RGB",
    sku: "WGM-RGB-005",
    category: "Gaming",
    price: "$59.99",
    stock: 23,
    status: "low-stock",
    variants: 5,
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Mechanical Keyboard TKL",
    sku: "MKB-TKL-006",
    category: "Gaming",
    price: "$89.99",
    stock: 56,
    status: "draft",
    variants: 6,
    image: "/placeholder.svg",
  },
]

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  draft: "bg-secondary text-muted-foreground border-border",
  "low-stock": "bg-warning/10 text-warning border-warning/20",
  "out-of-stock": "bg-destructive/10 text-destructive border-destructive/20",
}

export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const toggleProduct = (id: number) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelectedProducts(prev =>
      prev.length === products.length ? [] : products.map(p => p.id)
    )
  }

  return (
    <VendorLayout>
      <VendorHeader
        title="Products"
        description="Manage your product catalog and inventory"
      />
      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9 bg-secondary/50 border-0"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] bg-secondary/50 border-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] bg-secondary/50 border-0 hidden sm:flex">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Link href="/products/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Products Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedProducts.length === products.length}
                        onCheckedChange={toggleAll}
                      />
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Product</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">SKU</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Category</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Price</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Stock</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Variants</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium">Status</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className="hover:bg-secondary/30 border-border">
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => toggleProduct(product.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <span className="font-medium text-sm max-w-[200px] truncate">
                            {product.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground font-mono">
                        {product.sku}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {product.category}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {product.price}
                      </TableCell>
                      <TableCell className="text-sm">
                        <span className={product.stock === 0 ? "text-destructive" : product.stock < 30 ? "text-warning" : "text-muted-foreground"}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {product.variants}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] capitalize ${statusStyles[product.status]}`}>
                          {product.status.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination placeholder */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 1-6 of 23 products
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
