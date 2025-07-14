"use client"

import { useEffect, useRef } from "react"

export function AmbientParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles: HTMLDivElement[] = []
    const numParticles = 50

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 3}s`
      particle.style.animationDuration = `${2 + Math.random() * 3}s`
      particle.style.boxShadow = "0 0 6px rgba(255, 255, 255, 0.6), 0 0 12px rgba(255, 255, 255, 0.3)"

      container.appendChild(particle)
      particles.push(particle)

      // Animate particle movement
      const animateParticle = () => {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        const duration = 10000 + Math.random() * 20000

        particle.style.transition = `transform ${duration}ms linear`
        particle.style.transform = `translate(${x}px, ${y}px)`

        setTimeout(animateParticle, duration)
      }

      setTimeout(animateParticle, Math.random() * 5000)
    }

    return () => {
      particles.forEach((particle) => particle.remove())
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
}
