"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { DecryptedText } from "@/components/ui/decrypted-text"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 pb-32 relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-8">
              A little about me
            </h3>
            
            <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Java Full Stack dev crafting reliable and thoughtfully engineered projects.
            </p>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              I love creating and building awesome projects with the power of code. Always curious to Learn and adapt to new technologies.
            </p>

            <div className="space-y-4 text-lg md:text-xl text-white/80">
            
              <p>Currently looking for a new challenge.</p>
              
            </div>

            <p className="text-lg text-white/60">
              Born and raised in Mysore, India.
            </p>
          </motion.div>

          {/* Right - Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:sticky lg:top-32"
          >
            <div className="relative w-full max-w-md mx-auto lg:ml-auto">
              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/harsha-profile.jpg" 
                  alt="Harsha Jain"
                  className="w-full h-[500px] lg:h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Collaboration Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 text-center"
            >
              <div className="flex justify-center gap-6 items-center">
                <a href="https://github.com/Alexrdj11" target="_blank" rel="noopener noreferrer" 
                   className="hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 fill-white hover:fill-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://x.com/Alex64914127" target="_blank" rel="noopener noreferrer"
                   className="hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 fill-white hover:fill-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </a>
                <a href="mailto:harshahjain4@gmail.com"
                   className="hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 fill-white hover:fill-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                  </svg>
                </a>
              </div>
              <div className="text-sm text-gray-400 mt-4">
                Let's collaborate
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
