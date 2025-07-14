"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

// All your skills in a flat array for the scrolling tape
const allSkills = [
  "Python", "TensorFlow", "JavaScript", "React", "Next.js", 
  "Machine Learning", "Computer Vision","Java",
  "Flask","Git", "MongoDB", "SQL", 
  "OpenCV","HTML5", 
  "CSS3","REST APIs","Kubernetes",
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-color white">Technical Skills</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            My dev toolbox
          </p>
        </motion.div>

        {/* Horizontal Scrolling Skills Tape */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative overflow-hidden"
        >
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10"></div>
          
          {/* First scrolling row */}
          <div className="flex whitespace-nowrap animate-scroll-left mb-8">
            {[...allSkills, ...allSkills].map((skill, index) => (
              <div
                key={`row1-${index}`}
                className="inline-flex items-center mx-4 px-6 py-3 glass rounded-full text-lg font-semibold text-white glow-subtle"
              >
                <span className="mr-3 text-cyan-400">●</span>
                {skill}
              </div>
            ))}
          </div>

          {/* Second scrolling row (opposite direction) */}
          <div className="flex whitespace-nowrap animate-scroll-right">
            {[...allSkills.slice().reverse(), ...allSkills.slice().reverse()].map((skill, index) => (
              <div
                key={`row2-${index}`}
                className="inline-flex items-center mx-4 px-6 py-3 glass rounded-full text-lg font-semibold text-white glow-subtle"
              >
                <span className="mr-3 text-blue-400">●</span>
                {skill}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-400 mb-6">
            Always learning and adapting to new technologies
          </p>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold glow transition-all duration-300 cursor-pointer">
              <span className="mr-2">🚀</span>
              If it can be built, let's build it
            </Link>
          </motion.div>
        </motion.div>


      </div>
    </section>
  )
}
