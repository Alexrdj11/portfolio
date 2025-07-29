"use client"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { GallerySection } from "@/components/gallery-section"
import { SkillsSection } from "@/components/skills-section"
import dynamic from "next/dynamic"

// Dynamically import EarthGlobe to prevent SSR issues
const EarthGlobe = dynamic(() => import("@/components/earth-globe"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20" />
    </div>
  )
})

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section with 3D Globe */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EarthGlobe />
        </div>
        <HeroSection />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Skills Section */}
      <SkillsSection />
    </div>
  )
}
