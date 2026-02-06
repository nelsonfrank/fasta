"use client"

import React from "react"

import { SidebarProvider, SidebarInset } from "@workspace/ui/components/sidebar"
import { VendorSidebar } from "./vendor-sidebar"

interface VendorLayoutProps {
  children: React.ReactNode
}

export function VendorLayout({ children }: VendorLayoutProps) {
  return (
    <SidebarProvider>
      <VendorSidebar />
      <SidebarInset className="bg-background">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
