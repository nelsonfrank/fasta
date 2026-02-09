"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
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
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  MoreHorizontal,
  Check,
  X,
  Ban,
  Eye,
  Percent,
  Mail,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

type VendorStatus = "active" | "pending" | "suspended";

interface Vendor {
  id: string;
  name: string;
  email: string;
  status: VendorStatus;
  products: number;
  revenue: string;
  commission: number;
  joinedDate: string;
}

const initialVendors: Vendor[] = [
  {
    id: "1",
    name: "TechGear Pro",
    email: "contact@techgearpro.com",
    status: "active",
    products: 156,
    revenue: "$284,392",
    commission: 12,
    joinedDate: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "Digital Dreams",
    email: "info@digitaldreams.io",
    status: "pending",
    products: 0,
    revenue: "$0",
    commission: 15,
    joinedDate: "Jan 25, 2026",
  },
  {
    id: "3",
    name: "Gadget Galaxy",
    email: "hello@gadgetgalaxy.com",
    status: "pending",
    products: 0,
    revenue: "$0",
    commission: 15,
    joinedDate: "Jan 24, 2026",
  },
  {
    id: "4",
    name: "ElectroMart",
    email: "sales@electromart.com",
    status: "active",
    products: 89,
    revenue: "$156,780",
    commission: 10,
    joinedDate: "Mar 10, 2024",
  },
  {
    id: "5",
    name: "TechWorld",
    email: "support@techworld.io",
    status: "active",
    products: 234,
    revenue: "$412,560",
    commission: 8,
    joinedDate: "Feb 5, 2024",
  },
  {
    id: "6",
    name: "FakeGoods Inc",
    email: "fake@goods.com",
    status: "suspended",
    products: 12,
    revenue: "$8,450",
    commission: 15,
    joinedDate: "Dec 1, 2025",
  },
  {
    id: "7",
    name: "GadgetHub",
    email: "contact@gadgethub.com",
    status: "active",
    products: 178,
    revenue: "$298,120",
    commission: 11,
    joinedDate: "Apr 20, 2024",
  },
  {
    id: "8",
    name: "SmartTech Solutions",
    email: "info@smarttech.com",
    status: "pending",
    products: 0,
    revenue: "$0",
    commission: 15,
    joinedDate: "Jan 23, 2026",
  },
];

const statusConfig: Record<VendorStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-success/20 text-success border-0",
  },
  pending: {
    label: "Pending",
    className: "bg-warning/20 text-warning border-0",
  },
  suspended: {
    label: "Suspended",
    className: "bg-destructive/20 text-destructive border-0",
  },
};

interface VendorsTableProps {
  statusFilter: string;
}

export function VendorsTable({ statusFilter }: VendorsTableProps) {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [commissionDialog, setCommissionDialog] = useState<Vendor | null>(null);
  const [newCommission, setNewCommission] = useState("");

  const filteredVendors = vendors.filter((vendor) => {
    if (statusFilter === "all") return true;
    return vendor.status === statusFilter;
  });

  const handleApprove = (vendorId: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId ? { ...v, status: "active" as VendorStatus } : v
      )
    );
  };

  const handleReject = (vendorId: string) => {
    setVendors((prev) => prev.filter((v) => v.id !== vendorId));
  };

  const handleSuspend = (vendorId: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId ? { ...v, status: "suspended" as VendorStatus } : v
      )
    );
  };

  const handleReactivate = (vendorId: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId ? { ...v, status: "active" as VendorStatus } : v
      )
    );
  };

  const handleCommissionSave = () => {
    if (commissionDialog && newCommission) {
      setVendors((prev) =>
        prev.map((v) =>
          v.id === commissionDialog.id
            ? { ...v, commission: parseInt(newCommission) }
            : v
        )
      );
      setCommissionDialog(null);
      setNewCommission("");
    }
  };

  return (
    <>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="text-muted-foreground">Vendor</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground text-right">Products</TableHead>
              <TableHead className="text-muted-foreground text-right">Revenue</TableHead>
              <TableHead className="text-muted-foreground text-right">Commission</TableHead>
              <TableHead className="text-muted-foreground">Joined</TableHead>
              <TableHead className="text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVendors.map((vendor) => (
              <TableRow key={vendor.id} className="border-border hover:bg-secondary/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-secondary text-foreground text-xs">
                        {vendor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{vendor.name}</p>
                      <p className="text-sm text-muted-foreground">{vendor.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn(statusConfig[vendor.status].className)}>
                    {statusConfig[vendor.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-foreground">{vendor.products}</TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  {vendor.revenue}
                </TableCell>
                <TableCell className="text-right text-foreground">{vendor.commission}%</TableCell>
                <TableCell className="text-muted-foreground">{vendor.joinedDate}</TableCell>
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
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setCommissionDialog(vendor);
                          setNewCommission(vendor.commission.toString());
                        }}
                      >
                        <Percent className="mr-2 h-4 w-4" />
                        Set Commission
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {vendor.status === "pending" && (
                        <>
                          <DropdownMenuItem
                            className="text-success"
                            onClick={() => handleApprove(vendor.id)}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleReject(vendor.id)}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      {vendor.status === "active" && (
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleSuspend(vendor.id)}
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend
                        </DropdownMenuItem>
                      )}
                      {vendor.status === "suspended" && (
                        <DropdownMenuItem
                          className="text-success"
                          onClick={() => handleReactivate(vendor.id)}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Reactivate
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

      <Dialog open={!!commissionDialog} onOpenChange={() => setCommissionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Commission Rate</DialogTitle>
            <DialogDescription>
              Set a custom commission rate for {commissionDialog?.name}. This rate will be
              applied to all future sales.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="commission">Commission Rate (%)</Label>
              <Input
                id="commission"
                type="number"
                min="0"
                max="100"
                value={newCommission}
                onChange={(e) => setNewCommission(e.target.value)}
                placeholder="Enter commission percentage"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCommissionDialog(null)}>
              Cancel
            </Button>
            <Button onClick={handleCommissionSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
