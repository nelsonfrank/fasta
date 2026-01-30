"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LayoutDashboard, ShoppingBag, User, Heart, LogOut } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

const sidebarItems = [
  { name: "Overview", href: "/account", icon: LayoutDashboard },
  { name: "Orders", href: "/account/orders", icon: ShoppingBag },
  { name: "Profile", href: "/account/profile", icon: User },
  { name: "Wishlist", href: "/account/wishlist", icon: Heart },
]

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { logout, user } = useAuth()

  if (!user) {
    // In a real app we'd redirect here, but for this mock let's just show a message or let it render
    // The ProtectedRoute logic usually handles this at a higher level
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0 space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <p className="font-medium truncate">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
              <Button
                variant="ghost"
                className="justify-start gap-3 px-4 py-2 text-sm font-medium text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
