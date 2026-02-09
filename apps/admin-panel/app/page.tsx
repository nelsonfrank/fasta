import { AdminLayout } from "@/components/admin/admin-layout";
import { StatsCards } from "@/components/admin/dashboard/stats-cards";
import { RevenueChart } from "@/components/admin/dashboard/revenue-chart";
import { PendingItems } from "@/components/admin/dashboard/pending-items";
import { RecentActivity } from "@/components/admin/dashboard/recent-activity";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your marketplace.
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <RecentActivity />
        </div>

        <PendingItems />
      </div>
    </AdminLayout>
  );
}
