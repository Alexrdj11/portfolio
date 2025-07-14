"use client"

import { motion } from "framer-motion"
import { AboutSection } from "@/components/about-section"

export default function AboutPage() {
  return (
    <div className="pt-20">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <AboutSection />
      </motion.div>
    </div>
  )
}
