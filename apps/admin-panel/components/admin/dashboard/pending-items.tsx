"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Store, Package, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

const pendingVendors = [
  { id: 1, name: "TechGear Pro", email: "contact@techgearpro.com", date: "2 hours ago" },
  { id: 2, name: "Digital Dreams", email: "info@digitaldreams.io", date: "5 hours ago" },
  { id: 3, name: "Gadget Galaxy", email: "hello@gadgetgalaxy.com", date: "1 day ago" },
];

const pendingProducts = [
  { id: 1, name: "Wireless Gaming Mouse", vendor: "TechGear Pro", price: "$89.99" },
  { id: 2, name: "4K Webcam Ultra", vendor: "Digital Dreams", price: "$159.99" },
  { id: 3, name: "RGB Mechanical Keyboard", vendor: "Gadget Galaxy", price: "$129.99" },
];

const pendingPayouts = [
  { id: 1, vendor: "ElectroMart", amount: "$12,450", date: "Jan 15, 2026" },
  { id: 2, vendor: "TechWorld", amount: "$8,320", date: "Jan 15, 2026" },
  { id: 3, vendor: "GadgetHub", amount: "$15,890", date: "Jan 14, 2026" },
];

export function PendingItems() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">Pending Vendors</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
            {pendingVendors.length}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-secondary text-foreground text-xs">
                  {vendor.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{vendor.name}</p>
                <p className="text-xs text-muted-foreground truncate">{vendor.email}</p>
              </div>
              <span className="text-xs text-muted-foreground">{vendor.date}</span>
            </div>
          ))}
          <Link href="/vendors?status=pending">
            <Button variant="ghost" className="w-full mt-2 text-primary hover:text-primary hover:bg-primary/10">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-warning" />
            <CardTitle className="text-sm font-medium">Products to Review</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-warning/20 text-warning border-0">
            12
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground truncate">{product.vendor}</p>
              </div>
              <span className="text-sm font-medium text-foreground">{product.price}</span>
            </div>
          ))}
          <Link href="/products?status=pending">
            <Button variant="ghost" className="w-full mt-2 text-warning hover:text-warning hover:bg-warning/10">
              Review Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-success" />
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-success/20 text-success border-0">
            5
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingPayouts.map((payout) => (
            <div
              key={payout.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-success/20 text-success text-xs">
                  {payout.vendor.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{payout.vendor}</p>
                <p className="text-xs text-muted-foreground">{payout.date}</p>
              </div>
              <span className="text-sm font-semibold text-success">{payout.amount}</span>
            </div>
          ))}
          <Link href="/financials?tab=payouts">
            <Button variant="ghost" className="w-full mt-2 text-success hover:text-success hover:bg-success/10">
              Process Payouts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
