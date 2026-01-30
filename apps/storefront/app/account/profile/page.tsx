"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    alert("Profile updated successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user?.name || ""} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email || ""} placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+255 712 345 678" placeholder="+255..." />
              </div>
            </div>
            <Button disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address Book</CardTitle>
          <CardDescription>Manage your delivery addresses.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4 relative">
            <div className="absolute top-4 right-4 space-x-2">
              <Button variant="ghost" size="sm" className="h-8">Edit</Button>
              <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive">Delete</Button>
            </div>
            <div className="mb-2">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">Default</span>
            </div>
            <p className="font-medium">Home</p>
            <p className="text-sm text-muted-foreground mt-1">
              Sinza Makaburini, near Kijitonyama<br />
              Dar es Salaam, Kinondoni<br />
              Tanzania
            </p>
          </div>
          <Button variant="outline" className="w-full">
            Add New Address
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Ensure your account is secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <Button variant="secondary">Update Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
