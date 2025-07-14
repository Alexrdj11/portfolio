"use client"

import { motion } from "framer-motion"
import { SkillsSection } from "@/components/skills-section"

export default function SkillsPage() {
  return (
    <div className="pt-20">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <SkillsSection />
      </motion.div>
    </div>
  )
}
