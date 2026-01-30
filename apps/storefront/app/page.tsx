import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { PromoSection } from "@/components/promo-section"
import { TrustBadges } from "@/components/trust-badges"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TrustBadges />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoSection />
      <Newsletter />
      <Footer />
    </main>
  )
}
