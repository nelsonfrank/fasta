"use client"

import { VendorLayout } from "@/components/vendor/vendor-layout"
import { VendorHeader } from "@/components/vendor/vendor-header"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  DollarSign,
  ShoppingCart,
  Package,
  Eye,
  TrendingUp,
  TrendingDown,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react"

const salesData = [
  { date: "Jan 22", revenue: 4200, orders: 84 },
  { date: "Jan 23", revenue: 3800, orders: 76 },
  { date: "Jan 24", revenue: 5100, orders: 102 },
  { date: "Jan 25", revenue: 4600, orders: 92 },
  { date: "Jan 26", revenue: 5800, orders: 116 },
  { date: "Jan 27", revenue: 6200, orders: 124 },
  { date: "Jan 28", revenue: 5400, orders: 108 },
]

const categoryData = [
  { name: "Electronics", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Accessories", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Gaming", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Audio", value: 10, color: "hsl(var(--chart-4))" },
]

const trafficData = [
  { source: "Direct", visits: 2840, percentage: 35 },
  { source: "Search", visits: 2120, percentage: 26 },
  { source: "Social", visits: 1680, percentage: 21 },
  { source: "Referral", visits: 1040, percentage: 13 },
  { source: "Email", visits: 420, percentage: 5 },
]

const topProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds Pro",
    sku: "WBE-PRO-001",
    sold: 156,
    revenue: 12468,
    views: 3420,
    conversion: 4.6,
    trend: "up",
  },
  {
    id: 2,
    name: "USB-C Fast Charging Cable 2m",
    sku: "UCC-2M-001",
    sold: 243,
    revenue: 3640,
    views: 5680,
    conversion: 4.3,
    trend: "up",
  },
  {
    id: 3,
    name: "Portable Power Bank 20000mAh",
    sku: "PPB-20K-001",
    sold: 89,
    revenue: 4445,
    views: 2340,
    conversion: 3.8,
    trend: "down",
  },
  {
    id: 4,
    name: "Wireless Gaming Mouse RGB",
    sku: "WGM-RGB-001",
    sold: 67,
    revenue: 4013,
    views: 1890,
    conversion: 3.5,
    trend: "up",
  },
  {
    id: 5,
    name: "Laptop Stand Adjustable",
    sku: "LSA-ALU-001",
    sold: 54,
    revenue: 1890,
    views: 1560,
    conversion: 3.5,
    trend: "down",
  },
]

const stats = [
  {
    title: "Total Revenue",
    value: "$35,100",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "Last 7 days",
  },
  {
    title: "Total Orders",
    value: "702",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    description: "Last 7 days",
  },
  {
    title: "Products Sold",
    value: "1,248",
    change: "+15.3%",
    trend: "up",
    icon: Package,
    description: "Last 7 days",
  },
  {
    title: "Store Views",
    value: "12,840",
    change: "-2.4%",
    trend: "down",
    icon: Eye,
    description: "Last 7 days",
  },
]

export default function AnalyticsPage() {
  return (
    <VendorLayout>
      <VendorHeader
        title="Analytics"
        description="Track your store performance and insights"
      />
      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Date Range Selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Showing data for:</span>
          </div>
          <Select defaultValue="7d">
            <SelectTrigger className="w-[160px] bg-secondary/50 border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1.5">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-success" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
                      )}
                      <span
                        className={`text-xs font-medium ${stat.trend === "up" ? "text-success" : "text-destructive"
                          }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">{stat.description}</span>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue Chart */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Revenue Overview</CardTitle>
              <CardDescription>Daily revenue and order trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                      formatter={(value: number, name: string) => [
                        name === "revenue" ? `$${value.toLocaleString()}` : value,
                        name === "revenue" ? "Revenue" : "Orders",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Sales by Category</CardTitle>
              <CardDescription>Product category distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Share"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-muted-foreground">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium">{category.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Sources & Top Products */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Traffic Sources */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Traffic Sources</CardTitle>
              <CardDescription>Where your visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="source"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      width={70}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [value.toLocaleString(), "Visits"]}
                    />
                    <Bar
                      dataKey="visits"
                      fill="hsl(var(--primary))"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Visitors</span>
                  <span className="font-medium">8,100</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Funnel */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Conversion Funnel</CardTitle>
              <CardDescription>From views to purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Store Views</span>
                  <span className="font-medium">12,840</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "100%" }} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Product Views</span>
                  <span className="font-medium">8,420</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "65.6%" }} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Added to Cart</span>
                  <span className="font-medium">2,156</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "16.8%" }} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Purchases</span>
                  <span className="font-medium">702</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-success" style={{ width: "5.5%" }} />
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Conversion Rate</span>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    5.5%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Top Performing Products</CardTitle>
            <CardDescription>Products ranked by revenue this period</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="text-muted-foreground text-xs font-medium">Product</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium text-right">Views</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium text-right">Sold</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium text-right">Revenue</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium text-right">Conv. Rate</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-medium text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={product.id} className="hover:bg-secondary/30 border-border">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm max-w-[200px] truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{product.sku}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {product.views.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium">
                        {product.sold}
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium">
                        ${product.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {product.conversion}%
                      </TableCell>
                      <TableCell className="text-right">
                        {product.trend === "up" ? (
                          <div className="flex items-center justify-end gap-1 text-success">
                            <TrendingUp className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1 text-destructive">
                            <TrendingDown className="h-4 w-4" />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </VendorLayout>
  )
}
