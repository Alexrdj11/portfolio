"use client"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { GallerySection } from "@/components/gallery-section"
import { SkillsSection } from "@/components/skills-section"
// atom visualization removed — kept layout placeholder

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section with 3D Globe */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <HeroSection alignLeft />
            </div>

            <div className="lg:col-span-5 flex justify-center items-center pointer-events-none">
              <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
                {/* visualization removed */}
              </div>
            </div>
          </div>
        </div>
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
