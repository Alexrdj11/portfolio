"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { 
  SiPython, SiTensorflow, SiJavascript, SiReact, SiNextdotjs,
  SiNodedotjs, SiTypescript, SiFlask, SiGit, SiMongodb,
  SiScikitlearn, SiPandas, SiNumpy, SiKeras, SiHtml5, SiTailwindcss,
  SiGraphql, SiDocker, SiAmazonwebservices, SiFastapi, SiOpencv
} from "react-icons/si"
import { BiData, BiBrain, BiServer } from "react-icons/bi"
import { FaJava } from "react-icons/fa"

// All skills for the scrolling marquee with their icons
const allSkills = [
  { name: "Python", icon: SiPython },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "JavaScript", icon: SiJavascript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Machine Learning", icon: BiBrain },
  { name: "Computer Vision", icon: SiOpencv },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Java", icon: FaJava },
  { name: "Flask", icon: SiFlask },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Docker", icon: SiDocker },
  { name: "AWS", icon: SiAmazonwebservices },
  { name: "Git", icon: SiGit },
  { name: "MongoDB", icon: SiMongodb },
  { name: "SQL", icon: BiData },
  { name: "Scikit-learn", icon: SiScikitlearn },
  { name: "Pandas", icon: SiPandas },
  { name: "NumPy", icon: SiNumpy },
  { name: "Keras", icon: SiKeras },
  { name: "HTML5", icon: SiHtml5 },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "REST APIs", icon: BiServer },
  { name: "GraphQL", icon: SiGraphql },
]

export function HeroSection() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects-section')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadResume = async () => {
    try {
      const response = await fetch('/api/download-resume')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'harsha-resume.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } else {
        // If API fails, redirect to resume page
        window.open('/resume', '_blank')
      }
    } catch (error) {
      console.error('Error downloading resume:', error)
      // Fallback to resume page
      window.open('/resume', '_blank')
    }
  }

  return (
    <div className="relative z-10 text-center px-4 w-full">
      {/* Hero Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-16"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-4xl md:text-6xl font-orbitron font-bold mb-6 mx-auto max-w-fit"
        >
          <span className="text-gradient">Harsha Jain HJ</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 mx-auto text-left max-w-fit"
        >
          Final year B.E student
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold glow transition-all duration-300 cursor-pointer"
          >
            Explore My Work
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadResume}
            className="px-8 py-3 glass glass-hover rounded-full font-semibold transition-all duration-300 cursor-pointer"
          >
            Download Resume
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Skills Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="relative overflow-hidden mb-8 mt-16 sm:mt-24 mx-4 sm:mx-8 md:mx-16 lg:mx-32"
      >
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10"></div>
        
        {/* Single scrolling row */}
        <div className="flex whitespace-nowrap animate-scroll-left">
          {[...allSkills, ...allSkills].map((skill, index) => {
            const IconComponent = skill.icon
            return (
              <div
                key={`skill-${index}`}
                className="inline-flex items-center mx-2 sm:mx-3 px-3 sm:px-4 py-1 sm:py-2 glass rounded-full text-xs sm:text-sm font-semibold text-white glow-white-subtle"
              >
                <IconComponent className="mr-2 text-white text-base" />
                {skill.name}
              </div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-white cursor-pointer"
          onClick={scrollToProjects}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </div>
  )
}
