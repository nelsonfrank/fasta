"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
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
  MoreHorizontal,
  Eye,
  Ban,
  Mail,
  ShoppingBag,
  Download,
  UserCheck,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

type UserStatus = "active" | "banned";

interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  orders: number;
  totalSpent: string;
  joinedDate: string;
  lastActive: string;
}

const initialUsers: User[] = [
  { id: "1", name: "John Smith", email: "john.smith@email.com", status: "active", orders: 24, totalSpent: "$2,847", joinedDate: "Mar 15, 2024", lastActive: "2 hours ago" },
  { id: "2", name: "Emily Davis", email: "emily.d@email.com", status: "active", orders: 18, totalSpent: "$1,592", joinedDate: "Apr 2, 2024", lastActive: "5 hours ago" },
  { id: "3", name: "Michael Brown", email: "m.brown@email.com", status: "active", orders: 42, totalSpent: "$5,231", joinedDate: "Jan 10, 2024", lastActive: "1 day ago" },
  { id: "4", name: "Sarah Wilson", email: "sarah.w@email.com", status: "banned", orders: 3, totalSpent: "$289", joinedDate: "Dec 5, 2025", lastActive: "Jan 15, 2026" },
  { id: "5", name: "David Lee", email: "david.lee@email.com", status: "active", orders: 56, totalSpent: "$7,842", joinedDate: "Feb 20, 2024", lastActive: "30 min ago" },
  { id: "6", name: "Jennifer Martinez", email: "j.martinez@email.com", status: "active", orders: 12, totalSpent: "$982", joinedDate: "Jun 8, 2024", lastActive: "3 hours ago" },
  { id: "7", name: "Robert Johnson", email: "r.johnson@email.com", status: "active", orders: 31, totalSpent: "$3,456", joinedDate: "Apr 15, 2024", lastActive: "Yesterday" },
  { id: "8", name: "Lisa Anderson", email: "lisa.a@email.com", status: "banned", orders: 1, totalSpent: "$45", joinedDate: "Jan 2, 2026", lastActive: "Jan 10, 2026" },
  { id: "9", name: "Chris Taylor", email: "chris.t@email.com", status: "active", orders: 67, totalSpent: "$9,123", joinedDate: "Nov 30, 2023", lastActive: "1 hour ago" },
  { id: "10", name: "Amanda White", email: "a.white@email.com", status: "active", orders: 8, totalSpent: "$678", joinedDate: "Jul 22, 2024", lastActive: "2 days ago" },
];

const statusConfig: Record<UserStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-success/20 text-success border-0" },
  banned: { label: "Banned", className: "bg-destructive/20 text-destructive border-0" },
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [banDialog, setBanDialog] = useState<User | null>(null);
  const [banReason, setBanReason] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleBan = () => {
    if (banDialog) {
      setUsers((prev) =>
        prev.map((u) => (u.id === banDialog.id ? { ...u, status: "banned" as UserStatus } : u))
      );
      setBanDialog(null);
      setBanReason("");
    }
  };

  const handleUnban = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "active" as UserStatus } : u))
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground">
              Manage customer accounts and handle user moderation
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Users
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">48,392</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <ShoppingBag className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12,847</p>
                <p className="text-sm text-muted-foreground">Active Buyers</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <Ban className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">Banned Users</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Orders</TableHead>
                <TableHead className="text-muted-foreground text-right">Total Spent</TableHead>
                <TableHead className="text-muted-foreground">Joined</TableHead>
                <TableHead className="text-muted-foreground">Last Active</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-border hover:bg-secondary/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-secondary text-foreground text-xs">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(statusConfig[user.status].className)}>
                      {statusConfig[user.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-foreground">{user.orders}</TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {user.totalSpent}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.joinedDate}</TableCell>
                  <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          View Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" ? (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setBanDialog(user)}
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Ban User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-success"
                            onClick={() => handleUnban(user.id)}
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            Unban User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={!!banDialog} onOpenChange={() => setBanDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ban User</DialogTitle>
              <DialogDescription>
                Are you sure you want to ban {banDialog?.name}? This will prevent them from
                making purchases and accessing their account.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="ban-reason">Reason for Ban</Label>
                <Textarea
                  id="ban-reason"
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  placeholder="e.g., Fraudulent activity, terms of service violation..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setBanDialog(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleBan}>
                <Ban className="mr-2 h-4 w-4" />
                Ban User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
