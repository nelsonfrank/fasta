"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { CartSheet } from "@/components/cart-sheet"
import { useAuth } from "@/lib/auth-context"

const categories = [
  { name: "Smartphones", href: "#" },
  { name: "Laptops", href: "#" },
  { name: "Gaming", href: "#" },
  { name: "Audio", href: "#" },
  { name: "Smart Home", href: "#" },
  { name: "Accessories", href: "#" },
]

export function Header() {
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      {/* Promo banner */}
      <div className="bg-foreground text-background py-1.5 px-4 text-center text-xs sm:text-sm font-medium">
        <span className="hidden sm:inline">🚀 Free Delivery in Dar es Salaam • Pay on Delivery Available • </span>
        <Link href="#" className="underline underline-offset-2 hover:text-primary">
          Shop New Arrivals
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Row 1: Logo, Search, Actions */}
        <div className="flex h-20 items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">T</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground hidden sm:block">TechVault</span>
          </Link>

          {/* Search Bar - Takes most space */}
          <div className="hidden md:flex flex-1 max-w-3xl mx-4 lg:mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="search"
                placeholder="Search for anything"
                className="w-full pl-10 h-11 text-base bg-secondary/50 border-2 border-transparent focus:border-primary transition-all rounded-full"
              />
              <Button className="absolute right-1 top-1 bottom-1 rounded-full px-6">
                Search
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <Link href="/account" className="text-sm font-medium text-muted-foreground hover:text-primary">
                  My Account
                </Link>
                <div className="flex items-center gap-2">
                  <Link href="/account">
                    <Button variant="ghost" size="icon" className="relative rounded-full">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                      ) : (
                        <User className="h-6 w-6" />
                      )}
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-1 mr-2 text-sm font-medium">
                <span className="text-muted-foreground">Hi! </span>
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
                <span className="text-muted-foreground">or</span>
                <Link href="/register" className="text-primary hover:underline">
                  register
                </Link>
                <Button variant="ghost" size="icon" className="ml-2">
                  <User className="h-6 w-6" />
                </Button>
              </div>
            )}

            <CartSheet />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Row 2: Navigation - Desktop */}
        <nav className="hidden lg:flex items-center justify-center gap-8 pb-4">
          {categories.map((category) => (
            <div key={category.name} className="group relative">
              <Link
                href={category.href}
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {category.name}
                <ChevronDown className="ml-1 h-3 w-3 transition-transform group-hover:rotate-180" />
              </Link>

              {/* Hover Dropdown */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-48 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-popover text-popover-foreground rounded-lg shadow-lg border border-border p-2">
                  <div className="text-xs font-semibold text-muted-foreground px-2 py-1.5 uppercase tracking-wider">
                    top {category.name}
                  </div>
                  {['New Arrivals', 'Best Sellers', 'On Sale', 'Refurbished'].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="block px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Daily Deals
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Help & Contact
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative md:hidden">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="w-full pl-10" />
            </div>
            <nav className="flex flex-col gap-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors flex justify-between items-center"
                >
                  {category.name}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
