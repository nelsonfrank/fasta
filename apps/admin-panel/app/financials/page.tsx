"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
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
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Wallet,
  Download,
  Check,
  X,
  Settings,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { cn } from "@workspace/ui/lib/utils";

const revenueData = [
  { month: "Jan", revenue: 65000 },
  { month: "Feb", revenue: 72000 },
  { month: "Mar", revenue: 85000 },
  { month: "Apr", revenue: 78000 },
  { month: "May", revenue: 92000 },
  { month: "Jun", revenue: 108000 },
  { month: "Jul", revenue: 115000 },
  { month: "Aug", revenue: 125000 },
  { month: "Sep", revenue: 118000 },
  { month: "Oct", revenue: 135000 },
  { month: "Nov", revenue: 142000 },
  { month: "Dec", revenue: 158000 },
];

const categoryData = [
  { name: "Electronics", value: 45, color: "oklch(0.72 0.18 162)" },
  { name: "Accessories", value: 25, color: "oklch(0.65 0.2 250)" },
  { name: "Computers", value: 20, color: "oklch(0.75 0.15 80)" },
  { name: "Other", value: 10, color: "oklch(0.65 0.2 330)" },
];

type PayoutStatus = "pending" | "approved" | "completed" | "rejected";

interface Payout {
  id: string;
  vendor: string;
  amount: string;
  date: string;
  status: PayoutStatus;
  bankAccount: string;
}

const initialPayouts: Payout[] = [
  { id: "1", vendor: "ElectroMart", amount: "$12,450", date: "Jan 28, 2026", status: "pending", bankAccount: "****4521" },
  { id: "2", vendor: "TechWorld", amount: "$8,320", date: "Jan 28, 2026", status: "pending", bankAccount: "****7832" },
  { id: "3", vendor: "GadgetHub", amount: "$15,890", date: "Jan 27, 2026", status: "pending", bankAccount: "****2156" },
  { id: "4", vendor: "TechGear Pro", amount: "$22,150", date: "Jan 26, 2026", status: "approved", bankAccount: "****9087" },
  { id: "5", vendor: "Digital World", amount: "$9,870", date: "Jan 25, 2026", status: "completed", bankAccount: "****3421" },
  { id: "6", vendor: "SmartDevices", amount: "$5,240", date: "Jan 24, 2026", status: "completed", bankAccount: "****6543" },
  { id: "7", vendor: "FakeStore", amount: "$1,200", date: "Jan 23, 2026", status: "rejected", bankAccount: "****1234" },
];

const statusConfig: Record<PayoutStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-warning/20 text-warning border-0" },
  approved: { label: "Approved", className: "bg-primary/20 text-primary border-0" },
  completed: { label: "Completed", className: "bg-success/20 text-success border-0" },
  rejected: { label: "Rejected", className: "bg-destructive/20 text-destructive border-0" },
};

interface TaxRule {
  id: string;
  region: string;
  rate: number;
  enabled: boolean;
}

const initialTaxRules: TaxRule[] = [
  { id: "1", region: "United States", rate: 8.5, enabled: true },
  { id: "2", region: "European Union", rate: 20, enabled: true },
  { id: "3", region: "United Kingdom", rate: 20, enabled: true },
  { id: "4", region: "Canada", rate: 13, enabled: true },
  { id: "5", region: "Australia", rate: 10, enabled: false },
];

export default function FinancialsPage() {
  const [payouts, setPayouts] = useState<Payout[]>(initialPayouts);
  const [taxRules, setTaxRules] = useState<TaxRule[]>(initialTaxRules);
  const [taxDialog, setTaxDialog] = useState(false);
  const [newTax, setNewTax] = useState({ region: "", rate: "" });

  const handleApprovePayout = (id: string) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "approved" as PayoutStatus } : p))
    );
  };

  const handleRejectPayout = (id: string) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "rejected" as PayoutStatus } : p))
    );
  };

  const handleToggleTax = (id: string) => {
    setTaxRules((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const handleAddTax = () => {
    if (newTax.region && newTax.rate) {
      setTaxRules((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          region: newTax.region,
          rate: parseFloat(newTax.rate),
          enabled: true,
        },
      ]);
      setTaxDialog(false);
      setNewTax({ region: "", rate: "" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Financial Overview</h1>
            <p className="text-muted-foreground">
              Monitor revenue, manage payouts, and configure tax settings
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">$1,284,392</p>
                  <p className="text-sm text-success">+12.5% from last month</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Commissions</p>
                  <p className="text-2xl font-bold text-foreground">$154,127</p>
                  <p className="text-sm text-success">+8.2% from last month</p>
                </div>
                <div className="p-3 rounded-lg bg-chart-2/10">
                  <TrendingUp className="h-5 w-5 text-chart-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Pending Payouts</p>
                  <p className="text-2xl font-bold text-foreground">$36,660</p>
                  <p className="text-sm text-muted-foreground">5 requests pending</p>
                </div>
                <div className="p-3 rounded-lg bg-warning/10">
                  <Wallet className="h-5 w-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Processed This Month</p>
                  <p className="text-2xl font-bold text-foreground">$89,420</p>
                  <p className="text-sm text-muted-foreground">23 payouts completed</p>
                </div>
                <div className="p-3 rounded-lg bg-success/10">
                  <CreditCard className="h-5 w-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
              <Select defaultValue="year">
                <SelectTrigger className="w-32 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.72 0.18 162)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.72 0.18 162)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.26 0.01 260)" />
                    <XAxis dataKey="month" stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.15 0.01 260)",
                        border: "1px solid oklch(0.26 0.01 260)",
                        borderRadius: "8px",
                        color: "oklch(0.96 0 0)",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="oklch(0.72 0.18 162)" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Revenue by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.15 0.01 260)",
                        border: "1px solid oklch(0.26 0.01 260)",
                        borderRadius: "8px",
                        color: "oklch(0.96 0 0)",
                      }}
                      formatter={(value: number) => [`${value}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-muted-foreground">{cat.name}</span>
                    </div>
                    <span className="font-medium text-foreground">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="payouts" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="payouts">Payout Requests</TabsTrigger>
            <TabsTrigger value="taxes">Tax Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="payouts">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Payout Requests</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32 h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="text-muted-foreground">Vendor</TableHead>
                      <TableHead className="text-muted-foreground text-right">Amount</TableHead>
                      <TableHead className="text-muted-foreground">Bank Account</TableHead>
                      <TableHead className="text-muted-foreground">Date</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts.map((payout) => (
                      <TableRow key={payout.id} className="border-border hover:bg-secondary/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-secondary text-foreground text-xs">
                                {payout.vendor.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">{payout.vendor}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-foreground">
                          {payout.amount}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{payout.bankAccount}</TableCell>
                        <TableCell className="text-muted-foreground">{payout.date}</TableCell>
                        <TableCell>
                          <Badge className={cn(statusConfig[payout.status].className)}>
                            {statusConfig[payout.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {payout.status === "pending" && (
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
                                onClick={() => handleApprovePayout(payout.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => handleRejectPayout(payout.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="taxes">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Tax Rules</CardTitle>
                <Button size="sm" onClick={() => setTaxDialog(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Add Tax Rule
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="text-muted-foreground">Region</TableHead>
                      <TableHead className="text-muted-foreground text-right">Tax Rate</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxRules.map((tax) => (
                      <TableRow key={tax.id} className="border-border hover:bg-secondary/30">
                        <TableCell className="font-medium text-foreground">{tax.region}</TableCell>
                        <TableCell className="text-right text-foreground">{tax.rate}%</TableCell>
                        <TableCell>
                          <Badge className={cn(tax.enabled ? "bg-success/20 text-success border-0" : "bg-muted text-muted-foreground border-0")}>
                            {tax.enabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleTax(tax.id)}
                          >
                            {tax.enabled ? "Disable" : "Enable"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={taxDialog} onOpenChange={setTaxDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Tax Rule</DialogTitle>
              <DialogDescription>
                Configure a new tax rule for a specific region
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  value={newTax.region}
                  onChange={(e) => setNewTax((p) => ({ ...p, region: e.target.value }))}
                  placeholder="e.g., Japan"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Tax Rate (%)</Label>
                <Input
                  id="rate"
                  type="number"
                  value={newTax.rate}
                  onChange={(e) => setNewTax((p) => ({ ...p, rate: e.target.value }))}
                  placeholder="e.g., 10"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setTaxDialog(false)}>Cancel</Button>
              <Button onClick={handleAddTax}>Add Rule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
