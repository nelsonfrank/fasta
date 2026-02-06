"use client"

import { ProductGallery } from "./product-gallery"
import { ProductInfo } from "./product-info"
import { ProductTabs } from "./product-tabs"
import { SellerInfo } from "./seller-info"
import { RelatedProducts } from "./related-products"

export function ProductContent() {
  return (
    <main className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/search" className="hover:text-primary transition-colors">
            Smartphones
          </a>
          <span>/</span>
          <span className="text-foreground">iPhone 15 Pro Max</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery />
          <ProductInfo />
        </div>

        {/* Seller Info */}
        <div className="mt-12">
          <SellerInfo />
        </div>

        {/* Product Tabs (Specs, Description, Reviews) */}
        <div className="mt-12">
          <ProductTabs />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts />
        </div>
      </div>
    </main>
  )
}
