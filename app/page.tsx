"use client"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { TechStack } from "@/components/tech-stack"
import { WorkTogether } from "@/components/work-together"
import { InteractiveParticles } from "@/components/interactive-particles"
import { TerminalSimulator } from "@/components/terminal-simulator"
import GradualBlur from "@/components/ui/GradualBlur"

export default function HomePage() {
  return (
    <div className="relative pb-32">
      <InteractiveParticles />
      
      {/* Hero Section with 3D Globe */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <HeroSection alignLeft />
            </div>

            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="w-full h-56 sm:h-64 lg:h-80 max-w-xl">
                <TerminalSimulator />
              </div>
            </div>
          </div>
        </div>
        
        <GradualBlur
          target="page"
          position="bottom"
          height="8rem"
          strength={2}
          divCount={8}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
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
