"use client"

import { useState } from "react"
import Link from "next/link"
import { VendorLayout } from "@/components/vendor/vendor-layout"
import { VendorHeader } from "@/components/vendor/vendor-header"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Switch } from "@workspace/ui/components/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Badge } from "@workspace/ui/components/badge"
import {
  ArrowLeft,
  Plus,
  Upload,
  X,
  Trash2,
  ImageIcon,
  GripVertical,
} from "lucide-react"

interface Variant {
  id: number
  name: string
  sku: string
  price: string
  stock: number
}

export default function AddProductPage() {
  const [variants, setVariants] = useState<Variant[]>([
    { id: 1, name: "Default", sku: "", price: "", stock: 0 },
  ])

  const addVariant = () => {
    setVariants([
      ...variants,
      { id: Date.now(), name: "", sku: "", price: "", stock: 0 },
    ])
  }

  const removeVariant = (id: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((v) => v.id !== id))
    }
  }

  return (
    <VendorLayout>
      <VendorHeader
        title="Add New Product"
        description="Create a new product listing for your store"
      />
      <main className="flex-1 p-4 lg:p-6">
        <div className="mb-6">
          <Link href="/products">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>

        <form className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">Basic Information</CardTitle>
                  <CardDescription>
                    Enter the basic details of your product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Wireless Bluetooth Earbuds"
                      className="bg-secondary/50 border-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your product in detail..."
                      className="bg-secondary/50 border-0 min-h-[120px]"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger className="bg-secondary/50 border-0">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                          <SelectItem value="gaming">Gaming</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        placeholder="e.g., TechBrand"
                        className="bg-secondary/50 border-0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Media */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">Media</CardTitle>
                  <CardDescription>
                    Add images of your product (up to 8 images)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                    <div className="aspect-square rounded-lg border-2 border-dashed border-border bg-secondary/30 flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-xs text-muted-foreground">Upload</span>
                    </div>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square rounded-lg border border-border bg-secondary/30 flex items-center justify-center relative group">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        <button className="absolute top-2 right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Variants */}
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Variants</CardTitle>
                    <CardDescription>
                      Manage product variants like sizes, colors, etc.
                    </CardDescription>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Variant
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {variants.map((variant, index) => (
                    <div
                      key={variant.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30"
                    >
                      <div className="pt-2 cursor-move text-muted-foreground">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <div className="flex-1 grid gap-4 sm:grid-cols-4">
                        <div className="space-y-2">
                          <Label>Variant Name</Label>
                          <Input
                            placeholder="e.g., Black / Large"
                            className="bg-background border-0"
                            defaultValue={variant.name}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>SKU</Label>
                          <Input
                            placeholder="e.g., WBE-BLK-L"
                            className="bg-background border-0 font-mono text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Price</Label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="bg-background border-0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Stock</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            className="bg-background border-0"
                          />
                        </div>
                      </div>
                      {variants.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeVariant(variant.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="active">Active</Label>
                      <p className="text-xs text-muted-foreground">
                        Product will be visible on store
                      </p>
                    </div>
                    <Switch id="active" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="featured">Featured</Label>
                      <p className="text-xs text-muted-foreground">
                        Show in featured section
                      </p>
                    </div>
                    <Switch id="featured" />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Base Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        className="bg-secondary/50 border-0 pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comparePrice">Compare at Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="comparePrice"
                        type="number"
                        placeholder="0.00"
                        className="bg-secondary/50 border-0 pl-7"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Original price for showing discount
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost per Item</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="cost"
                        type="number"
                        placeholder="0.00"
                        className="bg-secondary/50 border-0 pl-7"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      For profit calculation only
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                    <Input
                      id="sku"
                      placeholder="e.g., WBE-001"
                      className="bg-secondary/50 border-0 font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode (ISBN, UPC, etc.)</Label>
                    <Input
                      id="barcode"
                      placeholder="e.g., 123456789012"
                      className="bg-secondary/50 border-0 font-mono"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="trackInventory">Track Inventory</Label>
                      <p className="text-xs text-muted-foreground">
                        Enable stock tracking
                      </p>
                    </div>
                    <Switch id="trackInventory" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Create Product
                </Button>
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  Save as Draft
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </VendorLayout>
  )
}
