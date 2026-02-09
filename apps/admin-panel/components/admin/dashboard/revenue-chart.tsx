"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 65000, commissions: 9750 },
  { month: "Feb", revenue: 72000, commissions: 10800 },
  { month: "Mar", revenue: 85000, commissions: 12750 },
  { month: "Apr", revenue: 78000, commissions: 11700 },
  { month: "May", revenue: 92000, commissions: 13800 },
  { month: "Jun", revenue: 108000, commissions: 16200 },
  { month: "Jul", revenue: 115000, commissions: 17250 },
  { month: "Aug", revenue: 125000, commissions: 18750 },
  { month: "Sep", revenue: 118000, commissions: 17700 },
  { month: "Oct", revenue: 135000, commissions: 20250 },
  { month: "Nov", revenue: 142000, commissions: 21300 },
  { month: "Dec", revenue: 158000, commissions: 23700 },
];

export function RevenueChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
        <Select defaultValue="year">
          <SelectTrigger className="w-32 h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.72 0.18 162)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.72 0.18 162)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCommissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.2 250)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.65 0.2 250)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.26 0.01 260)" />
              <XAxis
                dataKey="month"
                stroke="oklch(0.65 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="oklch(0.65 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.15 0.01 260)",
                  border: "1px solid oklch(0.26 0.01 260)",
                  borderRadius: "8px",
                  color: "oklch(0.96 0 0)",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="oklch(0.72 0.18 162)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="commissions"
                stroke="oklch(0.65 0.2 250)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCommissions)"
                name="Commissions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Total Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2" />
            <span className="text-sm text-muted-foreground">Commissions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
