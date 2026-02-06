"use client"

import { useState } from "react"
import { VendorLayout } from "@/components/vendor/vendor-layout"
import { VendorHeader } from "@/components/vendor/vendor-header"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { Progress } from "@workspace/ui/components/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Wallet,
  DollarSign,
  TrendingUp,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  Building,
  Plus,
} from "lucide-react"

const walletStats = {
  totalSales: 24852.50,
  commission: 2485.25,
  netEarnings: 22367.25,
  pendingPayout: 4326.80,
  availableBalance: 18040.45,
  lastPayout: 5000.00,
}

const transactions = [
  {
    id: "TXN-001",
    type: "credit",
    description: "Order #ORD-2024-1234",
    amount: 174.97,
    commission: 17.50,
    net: 157.47,
    status: "completed",
    date: "Jan 28, 2026",
  },
  {
    id: "TXN-002",
    type: "credit",
    description: "Order #ORD-2024-1233",
    amount: 34.99,
    commission: 3.50,
    net: 31.49,
    status: "completed",
    date: "Jan 28, 2026",
  },
  {
    id: "TXN-003",
    type: "debit",
    description: "Payout to Bank Account",
    amount: 5000.00,
    commission: 0,
    net: -5000.00,
    status: "completed",
    date: "Jan 25, 2026",
  },
  {
    id: "TXN-004",
    type: "credit",
    description: "Order #ORD-2024-1232",
    amount: 194.95,
    commission: 19.50,
    net: 175.45,
    status: "completed",
    date: "Jan 27, 2026",
  },
  {
    id: "TXN-005",
    type: "refund",
    description: "Refund for Order #ORD-2024-1230",
    amount: 79.99,
    commission: -8.00,
    net: -71.99,
    status: "completed",
    date: "Jan 26, 2026",
  },
]

const payouts = [
  {
    id: "PAY-001",
    amount: 5000.00,
    method: "Bank Transfer",
    account: "****4567",
    status: "completed",
    date: "Jan 25, 2026",
  },
  {
    id: "PAY-002",
    amount: 3500.00,
    method: "Bank Transfer",
    account: "****4567",
    status: "completed",
    date: "Jan 18, 2026",
  },
  {
    id: "PAY-003",
    amount: 2800.00,
    method: "Bank Transfer",
    account: "****4567",
    status: "completed",
    date: "Jan 11, 2026",
  },
]

export default function WalletPage() {
  const [payoutAmount, setPayoutAmount] = useState("")

  return (
    <VendorLayout>
      <VendorHeader
        title="Wallet"
        description="Manage your earnings and payouts"
      />
      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Balance Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                  <p className="text-2xl font-bold">${walletStats.totalSales.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Lifetime earnings</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Commission (10%)</p>
                  <p className="text-2xl font-bold text-destructive">-${walletStats.commission.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Platform fee</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                  <TrendingUp className="h-5 w-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Net Earnings</p>
                  <p className="text-2xl font-bold text-success">${walletStats.netEarnings.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">After commission</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <Wallet className="h-5 w-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-2xl font-bold">${walletStats.availableBalance.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Ready to withdraw</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      Withdraw
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Payout</DialogTitle>
                      <DialogDescription>
                        Enter the amount you want to withdraw to your bank account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="p-4 rounded-lg bg-secondary/30 text-center">
                        <p className="text-sm text-muted-foreground">Available Balance</p>
                        <p className="text-3xl font-bold">${walletStats.availableBalance.toLocaleString()}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Withdrawal Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="pl-7"
                            value={payoutAmount}
                            onChange={(e) => setPayoutAmount(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setPayoutAmount("1000")}
                          >
                            $1,000
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setPayoutAmount("5000")}
                          >
                            $5,000
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setPayoutAmount(walletStats.availableBalance.toString())}
                          >
                            Max
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Payout Method</Label>
                        <Select defaultValue="bank">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank">
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4" />
                                Bank Account ****4567
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                        <p className="text-xs text-warning">
                          Payouts are processed within 2-3 business days. Minimum withdrawal amount is $50.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Request Payout</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Breakdown */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Earnings Breakdown</CardTitle>
            <CardDescription>Overview of your earnings this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Gross Sales</span>
                <span className="font-medium">$12,426.50</span>
              </div>
              <div className="flex items-center justify-between text-destructive">
                <span className="text-sm">Platform Commission (10%)</span>
                <span className="font-medium">-$1,242.65</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-medium">Net Earnings</span>
                <span className="font-bold text-success">$11,183.85</span>
              </div>
              <Progress value={90} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                You keep 90% of every sale
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Transactions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Recent Transactions</CardTitle>
              <CardDescription>Your latest earning activities</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="text-muted-foreground text-xs font-medium">Description</TableHead>
                      <TableHead className="text-muted-foreground text-xs font-medium text-right">Amount</TableHead>
                      <TableHead className="text-muted-foreground text-xs font-medium text-right">Net</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.slice(0, 5).map((txn) => (
                      <TableRow key={txn.id} className="hover:bg-secondary/30 border-border">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${txn.type === "credit"
                                ? "bg-success/10"
                                : txn.type === "debit"
                                  ? "bg-primary/10"
                                  : "bg-warning/10"
                              }`}>
                              {txn.type === "credit" ? (
                                <ArrowDownRight className="h-4 w-4 text-success" />
                              ) : txn.type === "debit" ? (
                                <ArrowUpRight className="h-4 w-4 text-primary" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4 text-warning" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{txn.description}</p>
                              <p className="text-xs text-muted-foreground">{txn.date}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          ${txn.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className={`text-right text-sm font-medium ${txn.net >= 0 ? "text-success" : "text-destructive"
                          }`}>
                          {txn.net >= 0 ? "+" : ""}${txn.net.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Payout History */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Payout History</CardTitle>
              <CardDescription>Your withdrawal requests</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="text-muted-foreground text-xs font-medium">Payout</TableHead>
                      <TableHead className="text-muted-foreground text-xs font-medium text-right">Amount</TableHead>
                      <TableHead className="text-muted-foreground text-xs font-medium">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts.map((payout) => (
                      <TableRow key={payout.id} className="hover:bg-secondary/30 border-border">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                              <Building className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{payout.method}</p>
                              <p className="text-xs text-muted-foreground">{payout.date}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-sm font-medium">
                          ${payout.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-success/10 text-success border-success/20"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            {payout.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bank Account */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Payout Methods</CardTitle>
              <CardDescription>Manage your withdrawal accounts</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Chase Bank</p>
                <p className="text-sm text-muted-foreground">Account ending in 4567</p>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Primary
              </Badge>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </VendorLayout>
  )
}
