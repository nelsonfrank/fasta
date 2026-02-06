"use client"

import { VendorLayout } from "@/components/vendor/vendor-layout"
import { VendorHeader } from "@/components/vendor/vendor-header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { TopProducts } from "@/components/dashboard/top-products"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <VendorLayout>
      <VendorHeader 
        title="Dashboard" 
        description="Welcome back! Here's what's happening with your store."
      />
      <main className="flex-1 p-4 lg:p-6 space-y-6">
        <DashboardOverview />
        <QuickActions />
        <div className="grid gap-6 lg:grid-cols-2">
          <SalesChart />
          <TopProducts />
        </div>
        <RecentOrders />
      </main>
    </VendorLayout>
  )
}
