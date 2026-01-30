"use client"

import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
} from "@workspace/ui/components/sheet"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"

export function CartSheet() {
    const { items, removeItem, updateQuantity, cartCount, cartTotal } = useCart()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                    <span className="sr-only">Cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className="px-1">
                    <SheetTitle>Cart ({cartCount})</SheetTitle>
                </SheetHeader>
                {items.length > 0 ? (
                    <>
                        <div className="flex-1 overflow-y-auto pr-6">
                            <ul className="space-y-4 py-4">
                                {items.map((item) => (
                                    <li key={item.id} className="flex gap-4">
                                        <div className="relative h-20 w-20 flex-none overflow-hidden rounded-md border border-secondary bg-secondary/50">
                                            <Image
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.title}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="grid gap-1.5">
                                                <h4 className="font-medium leading-none">{item.title}</h4>
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    ${item.price.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                    <span className="sr-only">Decrease</span>
                                                </Button>
                                                <span className="w-4 text-center text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                    <span className="sr-only">Increase</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="ml-auto h-8 w-8 text-muted-foreground hover:text-foreground"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Remove</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-background p-6 pl-0">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between font-medium">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-muted-foreground text-sm">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="flex items-center justify-between font-bold text-lg pt-2 border-t mt-2">
                                    <span>Total</span>
                                    <span>${cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                            <SheetFooter className="mt-4">
                                <SheetClose asChild>
                                    <Link href="/checkout" className="w-full">
                                        <Button className="w-full h-11 rounded-full text-base">
                                            Checkout
                                        </Button>
                                    </Link>
                                </SheetClose>
                            </SheetFooter>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center space-y-2 pr-6">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                        <span className="text-lg font-medium text-muted-foreground">
                            Your cart is empty
                        </span>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
