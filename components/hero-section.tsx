"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const revealVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const groupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.08,
    },
  },
}

export function HeroSection() {
  const [uiVisible, setUiVisible] = useState(false)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.dataset.heroCinematic = "true"

    const showUi = () => setUiVisible(true)
    const revealTimer = window.setTimeout(showUi, 4000)

    const handleMouseMove = (event: MouseEvent) => {
      showUi()

      const hero = heroRef.current
      if (!hero) return

      const bounds = hero.getBoundingClientRect()
      const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5
      const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5

      setPointer({
        x: Math.max(-1, Math.min(1, normalizedX)),
        y: Math.max(-1, Math.min(1, normalizedY)),
      })
    }

    const handlePointerDown = () => showUi()

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("pointerdown", handlePointerDown)
    window.addEventListener("touchstart", handlePointerDown)

    return () => {
      delete document.body.dataset.heroCinematic
      window.clearTimeout(revealTimer)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("touchstart", handlePointerDown)
    }
  }, [])

  const textDepthStyle = {
    transform: `translate3d(${pointer.x * 8}px, ${pointer.y * 8}px, 0)`,
  }

  const buttonGlow = `0 0 ${18 + Math.abs(pointer.x) * 14}px rgba(255, 255, 255, ${0.08 + Math.abs(pointer.y) * 0.08})`

  return (
    <div ref={heroRef} className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] flex-col items-center gap-10 px-6 pb-16 pt-24 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
      <div className="flex w-full flex-col items-center gap-8 lg:hidden">
        <motion.div
          className="w-full max-w-xl text-center"
          initial="hidden"
          animate={uiVisible ? "visible" : "hidden"}
          variants={groupVariants}
        >
          <motion.p
            variants={revealVariants}
            className="mb-3 text-[0.65rem] uppercase tracking-[0.42em] text-white/50 sm:text-xs"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={revealVariants}
            className="mx-auto max-w-[12ch] text-[clamp(2.8rem,12vw,4.6rem)] font-semibold uppercase leading-[0.88] tracking-[-0.06em] text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            HARSHA JAIN
          </motion.h1>

          <motion.p
            variants={revealVariants}
            className="mx-auto mt-4 max-w-[18rem] text-sm leading-6 text-white/68 sm:text-base"
          >
            Java Backend Developer • AI Engineer • Creative Builder
          </motion.p>

          <motion.div
            variants={revealVariants}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/8 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/12"
              style={{ boxShadow: buttonGlow }}
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/25 hover:bg-white/8 hover:text-white"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative w-[min(92vw,360px)] overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.02] shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.08),transparent_42%),radial-gradient(circle_at_50%_88%,rgba(0,0,0,0.95),transparent_64%)]" />
          <video
            src="/heroharsha/harsha.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="MetaHuman hero video"
            className="relative z-10 h-full w-full object-contain object-[50%_18%]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.82)_26%,rgba(0,0,0,0.22)_60%,transparent_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.74)_20%,rgba(0,0,0,0.2)_52%,transparent_78%)] mix-blend-multiply" />
        </motion.div>
      </div>

      <motion.div
        className="order-2 hidden w-full max-w-2xl lg:order-1 lg:block lg:w-[39%]"
        style={textDepthStyle}
        initial="hidden"
        animate={uiVisible ? "visible" : "hidden"}
        variants={groupVariants}
      >
        <motion.p
          variants={revealVariants}
          className="mb-4 text-xs uppercase tracking-[0.35em] text-white/55 sm:text-sm"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          variants={revealVariants}
          className="max-w-3xl text-3xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl xl:text-[5.75rem]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          HARSHA JAIN
        </motion.h1>

        <motion.p
          variants={revealVariants}
          className="mt-6 text-base text-white/72 sm:text-lg lg:max-w-xl"
        >
          Java Backend Developer • AI Engineer • Creative Builder
        </motion.p>

        <motion.div
          variants={revealVariants}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10"
            style={{ boxShadow: buttonGlow }}
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/25 hover:bg-white/6 hover:text-white"
          >
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="order-1 hidden w-full justify-center lg:order-2 lg:flex lg:w-[64%] lg:justify-end lg:translate-x-[2.5vw]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <div className="relative w-full max-w-[420px] overflow-hidden aspect-[4/5] sm:max-w-[840px] sm:aspect-auto lg:h-[92vh] lg:max-h-[980px] lg:w-[min(65vw,1020px)] lg:max-w-none lg:aspect-auto lg:translate-y-[1.5vh]">
          <video
            src="/heroharsha/harsha.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="MetaHuman hero video"
            className="h-full w-full object-contain object-[54%_28%] sm:object-[54%_34%] lg:scale-[1.2]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-18 bg-[linear-gradient(to_top,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.86)_28%,rgba(0,0,0,0.26)_62%,transparent_100%)] backdrop-blur-[1px] sm:h-20 lg:h-24" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.8)_18%,rgba(0,0,0,0.34)_42%,transparent_74%)] mix-blend-multiply sm:h-44 lg:h-48" />
        </div>
      </motion.div>
    </div>
  )
}
