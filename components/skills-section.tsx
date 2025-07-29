"use client"

import { motion } from "framer-motion"

// Skills organized by categories
const skillsData = {
  "Languages": ["JAVA", "Python", "HTML+CSS"],
  "Libraries": ["Tensorflow"],
  "Version control and project management": ["VScode", "Git", "Github"],
  "Cloud/Databases": ["MongoDb", "Firebase"],
  "Relevant Coursework": ["Data Structures & Algorithms", "Operating Systems", "Object Oriented Programming", "Database Management System", "Software Engineering"]
}

export function SkillsSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Skills
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-2xl mx-auto"
        >
          <div className="space-y-6">
            {Object.entries(skillsData).map(([category, skills], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <div className="font-semibold text-white text-sm sm:text-base sm:min-w-[200px] sm:text-right">
                    {category}:
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base flex-1">
                    {Array.isArray(skills) ? skills.join(", ") : skills}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
