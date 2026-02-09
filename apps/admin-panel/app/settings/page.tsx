"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Switch } from "@workspace/ui/components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
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
import {
  FolderTree,
  Truck,
  CreditCard,
  Globe,
  Plus,
  Edit2,
  Trash2,
  Check,
  Key,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  products: number;
  parent: string | null;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: string;
  estimatedDays: string;
  enabled: boolean;
}

interface PaymentGateway {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  apiKey: string;
}

const initialCategories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics", products: 4523, parent: null },
  { id: "2", name: "Smartphones", slug: "smartphones", products: 1234, parent: "Electronics" },
  { id: "3", name: "Laptops", slug: "laptops", products: 892, parent: "Electronics" },
  { id: "4", name: "Accessories", slug: "accessories", products: 3456, parent: null },
  { id: "5", name: "Cables", slug: "cables", products: 567, parent: "Accessories" },
  { id: "6", name: "Cases", slug: "cases", products: 890, parent: "Accessories" },
  { id: "7", name: "Computers", slug: "computers", products: 2341, parent: null },
  { id: "8", name: "Wearables", slug: "wearables", products: 1087, parent: null },
  { id: "9", name: "Storage", slug: "storage", products: 654, parent: null },
];

const initialShippingMethods: ShippingMethod[] = [
  { id: "1", name: "Standard Shipping", description: "Regular delivery via ground shipping", price: "$5.99", estimatedDays: "5-7", enabled: true },
  { id: "2", name: "Express Shipping", description: "Fast delivery via air shipping", price: "$14.99", estimatedDays: "2-3", enabled: true },
  { id: "3", name: "Next Day Delivery", description: "Guaranteed next business day delivery", price: "$24.99", estimatedDays: "1", enabled: true },
  { id: "4", name: "Free Shipping", description: "Free shipping on orders over $100", price: "Free", estimatedDays: "7-10", enabled: true },
  { id: "5", name: "International Standard", description: "International delivery worldwide", price: "$19.99", estimatedDays: "10-14", enabled: false },
];

const initialPaymentGateways: PaymentGateway[] = [
  { id: "1", name: "Stripe", type: "Credit Card", enabled: true, apiKey: "sk_live_****************************abcd" },
  { id: "2", name: "PayPal", type: "PayPal", enabled: true, apiKey: "live_****************************efgh" },
  { id: "3", name: "Square", type: "Credit Card", enabled: false, apiKey: "" },
  { id: "4", name: "Apple Pay", type: "Digital Wallet", enabled: true, apiKey: "pk_****************************ijkl" },
  { id: "5", name: "Google Pay", type: "Digital Wallet", enabled: true, apiKey: "pk_****************************mnop" },
];

export default function SettingsPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>(initialShippingMethods);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>(initialPaymentGateways);
  const [defaultCurrency, setDefaultCurrency] = useState("USD");

  const [categoryDialog, setCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" });

  const [shippingDialog, setShippingDialog] = useState(false);
  const [newShipping, setNewShipping] = useState({ name: "", description: "", price: "", estimatedDays: "" });

  const [apiKeyDialog, setApiKeyDialog] = useState<PaymentGateway | null>(null);
  const [newApiKey, setNewApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.slug) {
      setCategories((prev) => [
        ...prev,
        { ...newCategory, id: Date.now().toString(), products: 0, parent: null },
      ]);
      setCategoryDialog(false);
      setNewCategory({ name: "", slug: "" });
    }
  };

  const handleToggleShipping = (id: string) => {
    setShippingMethods((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleAddShipping = () => {
    if (newShipping.name && newShipping.price) {
      setShippingMethods((prev) => [
        ...prev,
        { ...newShipping, id: Date.now().toString(), enabled: true },
      ]);
      setShippingDialog(false);
      setNewShipping({ name: "", description: "", price: "", estimatedDays: "" });
    }
  };

  const handleToggleGateway = (id: string) => {
    setPaymentGateways((prev) =>
      prev.map((g) => (g.id === id ? { ...g, enabled: !g.enabled } : g))
    );
  };

  const handleSaveApiKey = () => {
    if (apiKeyDialog && newApiKey) {
      setPaymentGateways((prev) =>
        prev.map((g) => (g.id === apiKeyDialog.id ? { ...g, apiKey: newApiKey } : g))
      );
      setApiKeyDialog(null);
      setNewApiKey("");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Configuration</h1>
          <p className="text-muted-foreground">
            Configure categories, shipping, payments, and global settings
          </p>
        </div>

        <Tabs defaultValue="categories" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="categories" className="gap-2">
              <FolderTree className="h-4 w-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="shipping" className="gap-2">
              <Truck className="h-4 w-4" />
              Shipping
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="general" className="gap-2">
              <Globe className="h-4 w-4" />
              General
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Product Categories</CardTitle>
                  <CardDescription>Organize products into categories and subcategories</CardDescription>
                </div>
                <Button size="sm" onClick={() => setCategoryDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="text-muted-foreground">Name</TableHead>
                      <TableHead className="text-muted-foreground">Slug</TableHead>
                      <TableHead className="text-muted-foreground">Parent</TableHead>
                      <TableHead className="text-muted-foreground text-right">Products</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id} className="border-border hover:bg-secondary/30">
                        <TableCell className="font-medium text-foreground">{category.name}</TableCell>
                        <TableCell className="text-muted-foreground font-mono text-sm">{category.slug}</TableCell>
                        <TableCell>
                          {category.parent ? (
                            <Badge variant="outline" className="bg-secondary/50 border-0">
                              {category.parent}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right text-foreground">{category.products.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Shipping Methods</CardTitle>
                  <CardDescription>Configure available shipping options for customers</CardDescription>
                </div>
                <Button size="sm" onClick={() => setShippingDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Method
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shippingMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 border border-border"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{method.name}</p>
                          {method.enabled && (
                            <Badge className="bg-success/20 text-success border-0 text-xs">Active</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{method.price}</p>
                        <p className="text-sm text-muted-foreground">{method.estimatedDays} days</p>
                      </div>
                      <Switch
                        checked={method.enabled}
                        onCheckedChange={() => handleToggleShipping(method.id)}
                      />
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Payment Gateways</CardTitle>
                <CardDescription>Configure payment processing and API keys</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentGateways.map((gateway) => (
                    <div
                      key={gateway.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 border border-border"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{gateway.name}</p>
                          <Badge variant="outline" className="bg-secondary/50 border-0 text-xs">
                            {gateway.type}
                          </Badge>
                          {gateway.enabled && (
                            <Badge className="bg-success/20 text-success border-0 text-xs">
                              <Check className="mr-1 h-3 w-3" />
                              Connected
                            </Badge>
                          )}
                        </div>
                        {gateway.apiKey && (
                          <p className="text-sm text-muted-foreground font-mono">{gateway.apiKey}</p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setApiKeyDialog(gateway);
                          setNewApiKey(gateway.apiKey);
                        }}
                      >
                        <Key className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                      <Switch
                        checked={gateway.enabled}
                        onCheckedChange={() => handleToggleGateway(gateway.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general">
            <div className="grid gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Currency Settings</CardTitle>
                  <CardDescription>Configure default currency and display options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Default Currency</Label>
                      <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                          <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Currency Symbol Position</Label>
                      <Select defaultValue="before">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="before">Before amount ($100)</SelectItem>
                          <SelectItem value="after">After amount (100$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div>
                      <p className="font-medium text-foreground">Multi-currency Support</p>
                      <p className="text-sm text-muted-foreground">Allow customers to view prices in their local currency</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Store Settings</CardTitle>
                  <CardDescription>General marketplace configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="store-name">Store Name</Label>
                      <Input id="store-name" defaultValue="TechHub Marketplace" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="support-email">Support Email</Label>
                      <Input id="support-email" type="email" defaultValue="support@techhub.com" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div>
                        <p className="font-medium text-foreground">Maintenance Mode</p>
                        <p className="text-sm text-muted-foreground">Temporarily disable the storefront</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div>
                        <p className="font-medium text-foreground">Product Reviews</p>
                        <p className="text-sm text-muted-foreground">Allow customers to leave product reviews</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div>
                        <p className="font-medium text-foreground">Guest Checkout</p>
                        <p className="text-sm text-muted-foreground">Allow purchases without creating an account</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={categoryDialog} onOpenChange={setCategoryDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>Create a new product category</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cat-name">Category Name</Label>
                <Input
                  id="cat-name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g., Gaming Peripherals"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-slug">Slug</Label>
                <Input
                  id="cat-slug"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory((p) => ({ ...p, slug: e.target.value }))}
                  placeholder="e.g., gaming-peripherals"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCategoryDialog(false)}>Cancel</Button>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={shippingDialog} onOpenChange={setShippingDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Shipping Method</DialogTitle>
              <DialogDescription>Create a new shipping option</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="ship-name">Method Name</Label>
                <Input
                  id="ship-name"
                  value={newShipping.name}
                  onChange={(e) => setNewShipping((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g., Priority Shipping"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ship-desc">Description</Label>
                <Input
                  id="ship-desc"
                  value={newShipping.description}
                  onChange={(e) => setNewShipping((p) => ({ ...p, description: e.target.value }))}
                  placeholder="e.g., Fast and reliable delivery"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ship-price">Price</Label>
                  <Input
                    id="ship-price"
                    value={newShipping.price}
                    onChange={(e) => setNewShipping((p) => ({ ...p, price: e.target.value }))}
                    placeholder="e.g., $9.99"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ship-days">Estimated Days</Label>
                  <Input
                    id="ship-days"
                    value={newShipping.estimatedDays}
                    onChange={(e) => setNewShipping((p) => ({ ...p, estimatedDays: e.target.value }))}
                    placeholder="e.g., 3-5"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShippingDialog(false)}>Cancel</Button>
              <Button onClick={handleAddShipping}>Add Method</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!apiKeyDialog} onOpenChange={() => setApiKeyDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configure {apiKeyDialog?.name}</DialogTitle>
              <DialogDescription>Enter your API credentials for this payment gateway</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="relative">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={newApiKey}
                    onChange={(e) => setNewApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setApiKeyDialog(null)}>Cancel</Button>
              <Button onClick={handleSaveApiKey}>Save Configuration</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
