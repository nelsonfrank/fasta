"use client"

import Image from "next/image"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"

interface CategoryGridProps {
    onSelectCategory: (slug: string) => void
}



export function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
    const categories = [{
        _id: 1,
        slug: '/product',
        imageUrl: '',
        name: 'Product name',
    }]

    if (categories === undefined) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-40 w-full rounded-xl" />
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Browse Categories</h2>
                <p className="text-muted-foreground">Find exactly what you're looking for</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {categories.map((category) => (
                    <Card
                        key={category._id}
                        className="cursor-pointer hover:border-primary/50 transition-colors overflow-hidden group"
                        onClick={() => onSelectCategory(category.slug)}
                    >
                        <CardContent className="p-0">
                            <div className="relative h-32 w-full bg-secondary/30">
                                <Image
                                    src={category.imageUrl || "/placeholder.svg"}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                                    <h3 className="text-lg font-bold text-white drop-shadow-md">{category.name}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
