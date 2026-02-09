"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";
import {
  Search,
  Check,
  X,
  Eye,
  Package,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

type ProductStatus = "pending" | "approved" | "rejected";

interface Product {
  id: string;
  name: string;
  vendor: string;
  category: string;
  price: string;
  status: ProductStatus;
  submittedDate: string;
  image: string;
}

const initialProducts: Product[] = [
  { id: "1", name: "Wireless Gaming Mouse Pro", vendor: "TechGear Pro", category: "Accessories", price: "$89.99", status: "pending", submittedDate: "Jan 28, 2026", image: "/placeholder.svg" },
  { id: "2", name: "4K Ultra HD Webcam", vendor: "Digital Dreams", category: "Computers", price: "$159.99", status: "pending", submittedDate: "Jan 28, 2026", image: "/placeholder.svg" },
  { id: "3", name: "RGB Mechanical Keyboard", vendor: "Gadget Galaxy", category: "Accessories", price: "$129.99", status: "pending", submittedDate: "Jan 27, 2026", image: "/placeholder.svg" },
  { id: "4", name: "Noise Cancelling Headphones", vendor: "ElectroMart", category: "Electronics", price: "$249.99", status: "pending", submittedDate: "Jan 27, 2026", image: "/placeholder.svg" },
  { id: "5", name: "USB-C Hub 10-in-1", vendor: "TechWorld", category: "Accessories", price: "$59.99", status: "pending", submittedDate: "Jan 26, 2026", image: "/placeholder.svg" },
  { id: "6", name: "Portable SSD 1TB", vendor: "GadgetHub", category: "Storage", price: "$119.99", status: "pending", submittedDate: "Jan 26, 2026", image: "/placeholder.svg" },
  { id: "7", name: "Smart Watch Series X", vendor: "TechGear Pro", category: "Wearables", price: "$399.99", status: "approved", submittedDate: "Jan 25, 2026", image: "/placeholder.svg" },
  { id: "8", name: "Wireless Earbuds Pro", vendor: "ElectroMart", category: "Electronics", price: "$179.99", status: "approved", submittedDate: "Jan 25, 2026", image: "/placeholder.svg" },
  { id: "9", name: "Counterfeit Item XYZ", vendor: "FakeGoods Inc", category: "Electronics", price: "$19.99", status: "rejected", submittedDate: "Jan 24, 2026", image: "/placeholder.svg" },
  { id: "10", name: "Gaming Monitor 27\"", vendor: "TechWorld", category: "Computers", price: "$449.99", status: "pending", submittedDate: "Jan 26, 2026", image: "/placeholder.svg" },
  { id: "11", name: "Laptop Stand Aluminum", vendor: "GadgetHub", category: "Accessories", price: "$49.99", status: "pending", submittedDate: "Jan 26, 2026", image: "/placeholder.svg" },
  { id: "12", name: "Webcam Ring Light", vendor: "Digital Dreams", category: "Accessories", price: "$34.99", status: "pending", submittedDate: "Jan 25, 2026", image: "/placeholder.svg" },
];

const statusConfig: Record<ProductStatus, { label: string; className: string }> = {
  pending: { label: "Pending Review", className: "bg-warning/20 text-warning border-0" },
  approved: { label: "Approved", className: "bg-success/20 text-success border-0" },
  rejected: { label: "Rejected", className: "bg-destructive/20 text-destructive border-0" },
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rejectDialog, setRejectDialog] = useState<Product | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = products.filter((p) => p.status === "pending").length;

  const handleApprove = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "approved" as ProductStatus } : p))
    );
    setSelectedProduct(null);
  };

  const handleReject = () => {
    if (rejectDialog) {
      setProducts((prev) =>
        prev.map((p) => (p.id === rejectDialog.id ? { ...p, status: "rejected" as ProductStatus } : p))
      );
      setRejectDialog(null);
      setRejectReason("");
      setSelectedProduct(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Product Moderation</h1>
            <p className="text-muted-foreground">
              Review and approve products submitted by vendors
            </p>
          </div>
          {pendingCount > 0 && (
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30 px-3 py-1.5">
              <AlertTriangle className="mr-2 h-4 w-4" />
              {pendingCount} products awaiting review
            </Badge>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products or vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-card border-border overflow-hidden group">
              <div className="aspect-video bg-secondary relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="h-12 w-12 text-muted-foreground/30" />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className={cn(statusConfig[product.status].className, "text-xs")}>
                    {statusConfig[product.status].label}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-medium text-foreground line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.vendor}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{product.price}</span>
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  {product.status === "pending" && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
                        onClick={() => handleApprove(product.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setRejectDialog(product)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="font-medium text-foreground mb-1">No products found</h3>
              <p className="text-sm text-muted-foreground">
                {statusFilter === "pending"
                  ? "All products have been reviewed!"
                  : "Try adjusting your search or filter criteria"}
              </p>
            </CardContent>
          </Card>
        )}

        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
              <DialogDescription>
                Review the product information before approval
              </DialogDescription>
            </DialogHeader>
            {selectedProduct && (
              <div className="space-y-4 py-4">
                <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                  <Package className="h-16 w-16 text-muted-foreground/30" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Product Name</Label>
                    <p className="font-medium text-foreground">{selectedProduct.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Vendor</Label>
                    <p className="font-medium text-foreground">{selectedProduct.vendor}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Category</Label>
                    <p className="font-medium text-foreground">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Price</Label>
                    <p className="font-medium text-foreground">{selectedProduct.price}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Submitted</Label>
                    <p className="font-medium text-foreground">{selectedProduct.submittedDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <Badge className={cn(statusConfig[selectedProduct.status].className, "mt-1")}>
                      {statusConfig[selectedProduct.status].label}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                Close
              </Button>
              {selectedProduct?.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    className="text-destructive border-destructive/30 hover:bg-destructive/10 bg-transparent"
                    onClick={() => {
                      setRejectDialog(selectedProduct);
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={() => handleApprove(selectedProduct.id)}>
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!rejectDialog} onOpenChange={() => setRejectDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Product</DialogTitle>
              <DialogDescription>
                Provide a reason for rejecting {rejectDialog?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Rejection Reason</Label>
                <Textarea
                  id="reason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g., Product violates marketplace policy..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectDialog(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Reject Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
