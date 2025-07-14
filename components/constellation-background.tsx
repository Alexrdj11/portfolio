"use client"

import { useEffect, useRef } from "react"

export function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create stars with white glowing effect
    const stars: Array<{ x: number; y: number; size: number; opacity: number; speed: number; glowPhase: number }> = []
    const numStars = 200

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
        glowPhase: Math.random() * Math.PI * 2,
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.016 // 60fps
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars with white glow effect
      stars.forEach((star, index) => {
        // Calculate glow intensity
        const glowIntensity = Math.sin(time * 2 + star.glowPhase + index * 0.1) * 0.5 + 0.5
        const currentOpacity = star.opacity * (0.5 + glowIntensity * 0.5)
        
        // Draw outer glow
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.3})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw main star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.fill()

        // Move stars
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = -star.size
          star.x = Math.random() * canvas.width
        }

        // Subtle twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.01
        star.opacity = Math.max(0.2, Math.min(1, star.opacity))
      })

      // Draw connections between nearby stars with white glow
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const lineOpacity = 0.3 * (1 - distance / 120)
            
            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}
