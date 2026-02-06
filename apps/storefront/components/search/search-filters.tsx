"use client"

import { X } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui/components/accordion"
import type { FilterState } from "./search-content"

interface SearchFiltersProps {
  filters: FilterState
  onFilterChange: (filterType: keyof FilterState, value: string, checked: boolean) => void
  onClearAll: () => void
  activeCount: number
}

const filterOptions = {
  categories: {
    label: "Category",
    options: [
      { value: "smartphones", label: "Smartphones", count: 156 },
      { value: "laptops", label: "Laptops & Notebooks", count: 89 },
      { value: "tablets", label: "Tablets", count: 45 },
      { value: "gaming", label: "Gaming & Consoles", count: 78 },
      { value: "audio", label: "Audio & Headphones", count: 234 },
      { value: "smart-home", label: "Smart Home", count: 67 },
      { value: "wearables", label: "Wearables", count: 92 },
      { value: "cameras", label: "Cameras & Drones", count: 34 },
      { value: "accessories", label: "Accessories", count: 312 },
    ],
  },
  brands: {
    label: "Brand",
    options: [
      { value: "apple", label: "Apple", count: 89 },
      { value: "samsung", label: "Samsung", count: 124 },
      { value: "sony", label: "Sony", count: 67 },
      { value: "lg", label: "LG", count: 45 },
      { value: "asus", label: "ASUS", count: 78 },
      { value: "dell", label: "Dell", count: 56 },
      { value: "lenovo", label: "Lenovo", count: 82 },
      { value: "hp", label: "HP", count: 64 },
      { value: "microsoft", label: "Microsoft", count: 23 },
      { value: "google", label: "Google", count: 31 },
      { value: "bose", label: "Bose", count: 28 },
      { value: "jbl", label: "JBL", count: 45 },
    ],
  },
  priceRange: {
    label: "Price Range",
    options: [
      { value: "under-50", label: "Under $50", count: 145 },
      { value: "50-100", label: "$50 - $100", count: 234 },
      { value: "100-250", label: "$100 - $250", count: 312 },
      { value: "250-500", label: "$250 - $500", count: 189 },
      { value: "500-1000", label: "$500 - $1,000", count: 156 },
      { value: "1000-2000", label: "$1,000 - $2,000", count: 78 },
      { value: "over-2000", label: "Over $2,000", count: 34 },
    ],
  },
  screenSize: {
    label: "Screen Size",
    options: [
      { value: "under-5", label: 'Under 5"', count: 23 },
      { value: "5-6.5", label: '5" - 6.5"', count: 156 },
      { value: "6.5-8", label: '6.5" - 8"', count: 45 },
      { value: "11-13", label: '11" - 13"', count: 67 },
      { value: "14-16", label: '14" - 16"', count: 89 },
      { value: "over-17", label: '17" & Above', count: 34 },
    ],
  },
  storage: {
    label: "Storage Capacity",
    options: [
      { value: "32gb", label: "32GB", count: 45 },
      { value: "64gb", label: "64GB", count: 78 },
      { value: "128gb", label: "128GB", count: 156 },
      { value: "256gb", label: "256GB", count: 189 },
      { value: "512gb", label: "512GB", count: 134 },
      { value: "1tb", label: "1TB", count: 89 },
      { value: "2tb-plus", label: "2TB+", count: 34 },
    ],
  },
  ram: {
    label: "RAM",
    options: [
      { value: "4gb", label: "4GB", count: 45 },
      { value: "8gb", label: "8GB", count: 123 },
      { value: "16gb", label: "16GB", count: 167 },
      { value: "32gb", label: "32GB", count: 89 },
      { value: "64gb-plus", label: "64GB+", count: 23 },
    ],
  },
  connectivity: {
    label: "Connectivity",
    options: [
      { value: "5g", label: "5G", count: 134 },
      { value: "wifi-6e", label: "Wi-Fi 6E", count: 89 },
      { value: "bluetooth-5", label: "Bluetooth 5.0+", count: 234 },
      { value: "usb-c", label: "USB-C", count: 312 },
      { value: "thunderbolt", label: "Thunderbolt 4", count: 56 },
      { value: "nfc", label: "NFC", count: 145 },
      { value: "wireless-charging", label: "Wireless Charging", count: 178 },
    ],
  },
  condition: {
    label: "Condition",
    options: [
      { value: "new", label: "New", count: 567 },
      { value: "refurbished", label: "Certified Refurbished", count: 123 },
      { value: "open-box", label: "Open Box", count: 45 },
    ],
  },
  rating: {
    label: "Customer Rating",
    options: [
      { value: "4-up", label: "4 Stars & Up", count: 456 },
      { value: "3-up", label: "3 Stars & Up", count: 523 },
      { value: "2-up", label: "2 Stars & Up", count: 578 },
    ],
  },
}

export function SearchFilters({ filters, onFilterChange, onClearAll, activeCount }: SearchFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-primary hover:text-primary/80 h-auto p-0"
          >
            Clear all ({activeCount})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {Object.entries(filters).map(([key, values]) =>
            values.map((value) => {
              const filterKey = key as keyof FilterState
              const option = filterOptions[filterKey]?.options.find((o) => o.value === value)
              return (
                <button
                  key={`${key}-${value}`}
                  onClick={() => onFilterChange(filterKey, value, false)}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                >
                  {option?.label || value}
                  <X className="h-3 w-3" />
                </button>
              )
            }),
          )}
        </div>
      )}

      {/* Filter Accordions */}
      <Accordion type="multiple" defaultValue={["categories", "brands", "priceRange"]} className="space-y-2">
        {Object.entries(filterOptions).map(([key, { label, options }]) => (
          <AccordionItem
            key={key}
            value={key}
            className="border border-border rounded-lg px-4 overflow-hidden data-[state=open]:bg-card"
          >
            <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
              <span className="flex items-center gap-2">
                {label}
                {filters[key as keyof FilterState].length > 0 && (
                  <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {filters[key as keyof FilterState].length}
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="space-y-2 pt-1">
                {options.map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox
                      checked={filters[key as keyof FilterState].includes(option.value)}
                      onCheckedChange={(checked) =>
                        onFilterChange(key as keyof FilterState, option.value, checked as boolean)
                      }
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <span className="flex-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {option.label}
                    </span>
                    <span className="text-xs text-muted-foreground">({option.count})</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
