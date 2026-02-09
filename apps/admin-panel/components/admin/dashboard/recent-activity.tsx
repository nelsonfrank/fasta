"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import {
  UserPlus,
  Package,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

const activities = [
  {
    id: 1,
    type: "vendor_approved",
    message: "Vendor approved",
    subject: "TechGear Pro",
    time: "2 min ago",
    icon: CheckCircle,
    iconClass: "text-success",
  },
  {
    id: 2,
    type: "product_rejected",
    message: "Product rejected",
    subject: "Counterfeit Item XYZ",
    time: "15 min ago",
    icon: XCircle,
    iconClass: "text-destructive",
  },
  {
    id: 3,
    type: "payout_processed",
    message: "Payout processed",
    subject: "$8,450 to ElectroMart",
    time: "1 hour ago",
    icon: DollarSign,
    iconClass: "text-success",
  },
  {
    id: 4,
    type: "vendor_suspended",
    message: "Vendor suspended",
    subject: "FakeGoods Inc",
    time: "2 hours ago",
    icon: AlertTriangle,
    iconClass: "text-warning",
  },
  {
    id: 5,
    type: "new_vendor",
    message: "New vendor application",
    subject: "Digital Dreams",
    time: "3 hours ago",
    icon: UserPlus,
    iconClass: "text-primary",
  },
  {
    id: 6,
    type: "product_approved",
    message: "Product approved",
    subject: "Gaming Headset Pro",
    time: "4 hours ago",
    icon: Package,
    iconClass: "text-success",
  },
];

export function RecentActivity() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={cn(
                "flex items-start gap-3 pb-4",
                index !== activities.length - 1 && "border-b border-border"
              )}
            >
              <div className={cn("p-2 rounded-lg bg-secondary/50", activity.iconClass)}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="text-muted-foreground">{activity.message}: </span>
                  <span className="font-medium text-foreground">{activity.subject}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
