"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { SearchFilters } from "./search-filters"
import { SearchResults } from "./search-results"
import { CategoryGrid } from "./category-grid"
import { SearchHeader } from "./search-header"
import { Sheet, SheetContent, SheetTrigger } from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { SlidersHorizontal } from "lucide-react"

export type FilterState = {
  categories: string[]
  brands: string[]
  priceRange: string[]
  screenSize: string[]
  storage: string[]
  ram: string[]
  connectivity: string[]
  condition: string[]
  rating: string[]
}

const initialFilters: FilterState = {
  categories: [],
  brands: [],
  priceRange: [],
  screenSize: [],
  storage: [],
  ram: [],
  connectivity: [],
  condition: [],
  rating: [],
}

export function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [sortBy, setSortBy] = useState("relevance")
  const [view, setView] = useState<"grid" | "list">("grid")


  const activeFilterCount = Object.values(filters).flat().length

  const handleFilterChange = (filterType: keyof FilterState, value: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: checked ? [...prev[filterType], value] : prev[filterType].filter((v) => v !== value),
    }))
  }

  const clearAllFilters = () => {
    setFilters(initialFilters)
  }

  const showCategories = !query && activeFilterCount === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {!showCategories && (
        <SearchHeader sortBy={sortBy} setSortBy={setSortBy} view={view} setView={setView} resultCount={24} />
      )}

      <div className="flex gap-8 mt-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <SearchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={clearAllFilters}
            activeCount={activeFilterCount}
          />
        </aside>

        {/* Mobile Filter Sheet */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full gap-2 rounded-full shadow-lg">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 h-5 w-5 rounded-full bg-primary-foreground text-primary text-xs flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-md p-0 overflow-y-auto">
              <div className="p-6">
                <SearchFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearAll={clearAllFilters}
                  activeCount={activeFilterCount}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Results or Categories */}
        <div className="flex-1 min-w-0">
          {showCategories ? (
            <CategoryGrid onSelectCategory={(slug) => handleFilterChange("categories", slug, true)} />
          ) : (
            <SearchResults filters={filters} view={view} />
          )}
        </div>
      </div>
    </div>
  )
}
