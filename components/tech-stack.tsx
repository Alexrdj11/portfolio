"use client"

import { motion } from "framer-motion"
import { 
  SiSpring, SiHibernate, SiMysql, 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiPython
} from "react-icons/si"
import { BiServer } from "react-icons/bi"
import { FaJava } from "react-icons/fa"

const techStack = [
  { name: "Java", icon: FaJava },
  { name: "Python", icon: SiPython },
  { name: "Spring Boot", icon: SiSpring },
  { name: "REST APIs", icon: BiServer },
  { name: "JPA", icon: SiHibernate },
  { name: "MySQL", icon: SiMysql },
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss3 },
  { name: "JavaScript", icon: SiJavascript },
  { name: "React", icon: SiReact },
]

export function TechStack() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Title on the left (centered on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-4 text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 lg:mb-0">TECH STACK</h2>
          </motion.div>

          {/* Tech stack list on the right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-8 flex flex-col space-y-2 md:space-y-3"
          >
            {techStack.map((tech, index) => {
              const IconComponent = tech.icon
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 md:gap-4 group cursor-pointer"
                >
                  <IconComponent className="text-2xl sm:text-3xl md:text-4xl text-white/70 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/80 group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
