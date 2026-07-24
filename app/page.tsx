"use client"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { TechStack } from "@/components/tech-stack"
import { WorkTogether } from "@/components/work-together"
import { InteractiveParticles } from "@/components/interactive-particles"

export default function HomePage() {
  return (
    <div className="relative pb-32">
      <section className="relative min-h-screen overflow-hidden bg-black">
        <InteractiveParticles />
        <HeroSection />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Tech Stack Section */}
      <TechStack />

      {/* Work Together Section */}
      <WorkTogether />
    </div>
  )
}
