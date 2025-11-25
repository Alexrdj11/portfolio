"use client"

import { motion } from "framer-motion"
import { AboutSection } from "@/components/about-section"
import GradualBlur from "@/components/ui/GradualBlur"

export default function AboutPage() {
  return (
    <div className="pt-20 relative">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <AboutSection />
      </motion.div>
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
    </div>
  )
}
