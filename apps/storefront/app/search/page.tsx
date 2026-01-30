import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchContent } from "@/components/search/search-content"

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={null}>
        <SearchContent />
      </Suspense>
      <Footer />
    </main>
  )
}
