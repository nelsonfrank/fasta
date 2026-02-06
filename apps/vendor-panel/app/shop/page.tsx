"use client"

import { useState } from "react"
import { VendorLayout } from "@/components/vendor/vendor-layout"
import { VendorHeader } from "@/components/vendor/vendor-header"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { Switch } from "@workspace/ui/components/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Store,
  Upload,
  ImageIcon,
  Globe,
  FileText,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Building,
  CreditCard,
  User,
} from "lucide-react"

const verificationStatus = {
  business: "verified",
  identity: "verified",
  bank: "verified",
}

export default function ShopSettingsPage() {
  const [activeTab, setActiveTab] = useState("store")

  return (
    <VendorLayout>
      <VendorHeader
        title="Shop Settings"
        description="Customize your store and manage verification"
      />
      <main className="flex-1 p-4 lg:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger value="store" className="data-[state=active]:bg-background">
              <Store className="mr-2 h-4 w-4" />
              Store Profile
            </TabsTrigger>
            <TabsTrigger value="verification" className="data-[state=active]:bg-background">
              <Shield className="mr-2 h-4 w-4" />
              Verification
            </TabsTrigger>
            <TabsTrigger value="policies" className="data-[state=active]:bg-background">
              <FileText className="mr-2 h-4 w-4" />
              Policies
            </TabsTrigger>
          </TabsList>

          {/* Store Profile Tab */}
          <TabsContent value="store" className="space-y-6">
            {/* Store Banner & Logo */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Store Branding</CardTitle>
                <CardDescription>Customize how your store appears to customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Banner */}
                <div className="space-y-2">
                  <Label>Store Banner</Label>
                  <div className="relative h-40 rounded-lg border-2 border-dashed border-border bg-secondary/30 flex items-center justify-center overflow-hidden group cursor-pointer hover:bg-secondary/50 transition-colors">
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload banner image
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended: 1200 x 300 pixels
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logo */}
                <div className="flex items-start gap-6">
                  <div className="space-y-2">
                    <Label>Store Logo</Label>
                    <div className="h-24 w-24 rounded-lg border-2 border-dashed border-border bg-secondary/30 flex items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input
                        id="storeName"
                        defaultValue="TechStore Pro"
                        className="bg-secondary/50 border-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        placeholder="A short description of your store"
                        defaultValue="Premium Tech Accessories for Everyone"
                        className="bg-secondary/50 border-0"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Store Details */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Store Details</CardTitle>
                <CardDescription>Basic information about your store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Store Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell customers about your store..."
                    className="bg-secondary/50 border-0 min-h-[100px]"
                    defaultValue="We specialize in premium tech accessories, offering the latest in audio, charging, and computing peripherals. Quality products at competitive prices with fast shipping."
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Support Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="support@techstorepro.com"
                      className="bg-secondary/50 border-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Support Phone</Label>
                    <Input
                      id="phone"
                      defaultValue="+1 (555) 123-4567"
                      className="bg-secondary/50 border-0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      className="bg-secondary/50 border-0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Store Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Store Preferences</CardTitle>
                <CardDescription>Configure how your store operates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Store Visibility</Label>
                    <p className="text-xs text-muted-foreground">Make your store visible to customers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Vacation Mode</Label>
                    <p className="text-xs text-muted-foreground">Temporarily pause new orders</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-accept Orders</Label>
                    <p className="text-xs text-muted-foreground">Automatically accept incoming orders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification" className="space-y-6">
            {/* Verification Status */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Verification Status</CardTitle>
                <CardDescription>Complete all verification steps to unlock full features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Business Verification */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <Building className="h-5 w-5 text-success" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Business Details</p>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Business name, address, and registration</p>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>

                  {/* Identity Verification */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-success" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Identity (KYC)</p>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Government ID and selfie verification</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>

                  {/* Bank Account */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-success" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Bank Account</p>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Chase Bank ending in ****4567</p>
                    </div>
                    <Button variant="ghost" size="sm">Change</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KYC Documents */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">KYC Documents</CardTitle>
                <CardDescription>Uploaded verification documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Government ID</p>
                        <p className="text-xs text-muted-foreground">Uploaded Jan 15, 2026</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">
                      Approved
                    </Badge>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Business License</p>
                        <p className="text-xs text-muted-foreground">Uploaded Jan 15, 2026</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">
                      Approved
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Business Information</CardTitle>
                <CardDescription>Your registered business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Legal Business Name</Label>
                    <Input
                      defaultValue="TechStore Pro LLC"
                      className="bg-secondary/50 border-0"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Type</Label>
                    <Input
                      defaultValue="Limited Liability Company"
                      className="bg-secondary/50 border-0"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tax ID / EIN</Label>
                    <Input
                      defaultValue="XX-XXX1234"
                      className="bg-secondary/50 border-0"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Address</Label>
                    <Input
                      defaultValue="123 Commerce St, New York, NY 10001"
                      className="bg-secondary/50 border-0"
                      disabled
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Contact support to update your business information
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policies Tab */}
          <TabsContent value="policies" className="space-y-6">
            {/* Return Policy */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Return Policy</CardTitle>
                <CardDescription>Define your return and refund terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Return Window</Label>
                    <Select defaultValue="30">
                      <SelectTrigger className="bg-secondary/50 border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Return Shipping</Label>
                    <Select defaultValue="buyer">
                      <SelectTrigger className="bg-secondary/50 border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buyer">Paid by buyer</SelectItem>
                        <SelectItem value="seller">Paid by seller</SelectItem>
                        <SelectItem value="free">Free returns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Return Policy Details</Label>
                  <Textarea
                    className="bg-secondary/50 border-0 min-h-[100px]"
                    defaultValue="We accept returns within 30 days of delivery. Items must be in original condition with all tags and packaging. Refunds will be processed within 5-7 business days after we receive the returned item."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Policy */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Shipping Policy</CardTitle>
                <CardDescription>Define your shipping terms and timeframes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Processing Time</Label>
                    <Select defaultValue="1-2">
                      <SelectTrigger className="bg-secondary/50 border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="same">Same day</SelectItem>
                        <SelectItem value="1">1 business day</SelectItem>
                        <SelectItem value="1-2">1-2 business days</SelectItem>
                        <SelectItem value="2-3">2-3 business days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Free Shipping Threshold</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        defaultValue="50"
                        className="bg-secondary/50 border-0 pl-7"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Shipping Policy Details</Label>
                  <Textarea
                    className="bg-secondary/50 border-0 min-h-[100px]"
                    defaultValue="Orders are processed within 1-2 business days. Free standard shipping on orders over $50. Express shipping available at checkout. We ship to all 50 US states."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Terms */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Store Terms</CardTitle>
                <CardDescription>Additional terms and conditions for your store</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Additional Terms</Label>
                  <Textarea
                    className="bg-secondary/50 border-0 min-h-[100px]"
                    placeholder="Add any additional terms specific to your store..."
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button>Save Policies</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </VendorLayout>
  )
}
