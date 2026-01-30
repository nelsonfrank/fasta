import { Suspense } from "react"
import { ProductContent } from "@/components/product/product-content"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<ProductLoading />}>
        <ProductContent />
      </Suspense>
      <Footer />
    </div>
  )
}

function ProductLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading product...</div>
    </div>
  )
}
