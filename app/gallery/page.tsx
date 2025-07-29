import { GallerySection } from "@/components/gallery-section"
import { EarthGlobe } from "@/components/earth-globe"

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen">
      <EarthGlobe />
      <div className="pt-20">
        <GallerySection />
      </div>
    </div>
  )
}
