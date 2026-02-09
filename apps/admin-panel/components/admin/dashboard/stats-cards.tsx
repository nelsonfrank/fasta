"use client";

import { Card, CardContent } from "@workspace/ui/components/card";
import { DollarSign, Users, Store, Package, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

const stats = [
  {
    title: "Total Revenue",
    value: "$1,284,392",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "vs last month",
  },
  {
    title: "Active Vendors",
    value: "248",
    change: "+8.2%",
    trend: "up",
    icon: Store,
    description: "vs last month",
  },
  {
    title: "Total Products",
    value: "12,847",
    change: "+23.1%",
    trend: "up",
    icon: Package,
    description: "vs last month",
  },
  {
    title: "Active Users",
    value: "48,392",
    change: "-2.4%",
    trend: "down",
    icon: Users,
    description: "vs last month",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center gap-1 text-sm">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  <span
                    className={cn(
                      "font-medium",
                      stat.trend === "up" ? "text-success" : "text-destructive"
                    )}
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">{stat.description}</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
