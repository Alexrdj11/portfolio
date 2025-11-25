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
import { DecryptedText } from "@/components/ui/decrypted-text"

// All skills for the scrolling marquee with their icons
const allSkills = [
  { name: "Python", icon: SiPython },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "React", icon: SiReact },
  { name: "Machine Learning", icon: BiBrain },
  { name: "Computer Vision", icon: SiOpencv },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Java", icon: FaJava },
  { name: "Flask", icon: SiFlask },
  { name: "Docker", icon: SiDocker },
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
]

export function HeroSection({ alignLeft }: { alignLeft?: boolean }) {
  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    })
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
    <div className={`relative z-10 px-4 w-full ${alignLeft ? 'text-left' : 'text-center'}`}>
      {/* Hero Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`text-sm md:text-base text-gray-400 mb-2 ${alignLeft ? 'mx-0' : 'mx-auto text-left max-w-fit'}`}
        >
          Hey there I am,
        </motion.p>

  <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={alignLeft ? "text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold mb-6 leading-tight mx-0" : "text-4xl md:text-7xl lg:text-8xl font-montserrat font-bold mb-6 leading-tight mx-auto max-w-fit"}>
        
          {/* Use Montserrat for a strong, modern heading on the left */}
          <DecryptedText 
            text="Harsha Jain" 
            className="text-white"
            speed={40}
            triggerOnView={true}
            triggerOnHover={true}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className={`text-lg md:text-xl text-gray-300 mb-8 ${alignLeft ? 'mx-0 max-w-xl' : 'mx-auto text-left max-w-fit'}`}
        >
          
          Java Full Stack Developer • Creative Builder
        </motion.p>

      {/* Skills Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="relative overflow-hidden mb-8"
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
          onClick={scrollDown}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </div>
  )
}
