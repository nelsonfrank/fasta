"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { ProductReviews } from "./product-reviews.js"

export function ProductTabs() {
  return (
    <Tabs defaultValue="specifications" className="w-full">
      <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-border rounded-none gap-0">
        <TabsTrigger
          value="specifications"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger
          value="description"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
        >
          Reviews (2,341)
        </TabsTrigger>
      </TabsList>

      <TabsContent value="specifications" className="mt-6">
        <SpecificationsTab />
      </TabsContent>

      <TabsContent value="description" className="mt-6">
        <DescriptionTab />
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <ProductReviews />
      </TabsContent>
    </Tabs>
  )
}

function SpecificationsTab() {
  const specs = [
    {
      category: "Display",
      items: [
        { label: "Screen Size", value: '6.7"' },
        { label: "Resolution", value: "2796 x 1290 pixels" },
        { label: "Technology", value: "Super Retina XDR OLED" },
        { label: "Refresh Rate", value: "ProMotion 1-120Hz" },
        { label: "HDR", value: "Yes, Dolby Vision" },
        { label: "Peak Brightness", value: "2000 nits (outdoor)" },
      ],
    },
    {
      category: "Performance",
      items: [
        { label: "Chipset", value: "Apple A17 Pro (3nm)" },
        { label: "CPU", value: "6-core (2 performance + 4 efficiency)" },
        { label: "GPU", value: "6-core" },
        { label: "Neural Engine", value: "16-core" },
        { label: "RAM", value: "8GB" },
      ],
    },
    {
      category: "Camera",
      items: [
        { label: "Main Camera", value: "48MP, f/1.78, 24mm" },
        { label: "Ultrawide", value: "12MP, f/2.2, 13mm, 120°" },
        { label: "Telephoto", value: "12MP, f/2.8, 120mm, 5x optical" },
        { label: "Front Camera", value: "12MP, f/1.9, SL 3D" },
        { label: "Video", value: "4K@60fps, ProRes, Log" },
      ],
    },
    {
      category: "Battery & Charging",
      items: [
        { label: "Battery", value: "4422 mAh" },
        { label: "Video Playback", value: "Up to 29 hours" },
        { label: "Wired Charging", value: "27W (USB-C)" },
        { label: "Wireless Charging", value: "15W MagSafe" },
      ],
    },
    {
      category: "Connectivity",
      items: [
        { label: "5G", value: "Sub-6GHz + mmWave" },
        { label: "Wi-Fi", value: "Wi-Fi 6E" },
        { label: "Bluetooth", value: "5.3" },
        { label: "Port", value: "USB-C 3.0" },
        { label: "NFC", value: "Yes" },
      ],
    },
    {
      category: "Design",
      items: [
        { label: "Dimensions", value: "159.9 x 76.7 x 8.25 mm" },
        { label: "Weight", value: "221g" },
        { label: "Material", value: "Titanium frame, Ceramic Shield" },
        { label: "Water Resistance", value: "IP68 (6m, 30 min)" },
      ],
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {specs.map((section) => (
        <div key={section.category} className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">{section.category}</h3>
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="text-foreground font-medium text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function DescriptionTab() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Forged in Titanium</h3>
          <p className="text-muted-foreground leading-relaxed">
            iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back.
            It also features a Ceramic Shield front that's tougher than any smartphone glass. And it's splash, water,
            and dust resistant.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">A17 Pro Chip - A Monster Win for Gaming</h3>
          <p className="text-muted-foreground leading-relaxed">
            A17 Pro is an entirely new class of iPhone chip. It's the industry's first 3nm chip, and it's wickedly fast.
            It has a Pro-class GPU with a new 6-core design. Games can now load detailed assets almost instantly, and
            you'll see more fluid graphics with hardware-accelerated ray tracing.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">The Ultimate Camera System</h3>
          <p className="text-muted-foreground leading-relaxed">
            The 48MP Main camera shoots in super-high resolution, so it's easier than ever to take standout photos with
            phenomenal detail. The 5x Telephoto camera brings your subjects closer, from a grand vista to an
            architectural detail.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">What's in the Box</h3>
          <ul className="text-muted-foreground space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              iPhone 15 Pro Max
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              USB-C Charge Cable (1m)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Documentation
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
