"use client"

import { motion } from "framer-motion"
import { ProjectsSection } from "@/components/projects-section"

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <ProjectsSection />
      </motion.div>
    </div>
  )
}
