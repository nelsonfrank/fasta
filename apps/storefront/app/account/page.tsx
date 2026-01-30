"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default function AccountPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+1 last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">In your wishlist</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0 pts</div>
                        <p className="text-xs text-muted-foreground">Start shopping to earn</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Order #1234</p>
                                    <p className="text-xs text-muted-foreground">Placed on Jan 15, 2024</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">Processing</p>
                                    <Link href="/account/orders" className="text-xs text-primary underline">View</Link>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Order #1233</p>
                                    <p className="text-xs text-muted-foreground">Placed on Dec 20, 2023</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-green-600">Delivered</p>
                                    <Link href="/account/orders" className="text-xs text-primary underline">View</Link>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Default Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            <p className="font-medium">Nelson Frank</p>
                            <p className="text-muted-foreground">Kijitonyama, Sinza Makaburini</p>
                            <p className="text-muted-foreground">Dar es Salaam, Tanzania</p>
                            <p className="text-muted-foreground">+255 712 345 678</p>
                            <Button variant="link" asChild className="px-0 h-auto">
                                <Link href="/account/profile">Edit Address</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
