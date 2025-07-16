"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentParagraph, setCurrentParagraph] = useState(0)

  const paragraphs = [
    "Engineering, for me...isn't just about writing code, it's about crafting smart systems that solve problems with style.I love designing tech that just works...and works well.",
    "My engineering journey began with a curiosity about how machines could learn on their own and adapt (like every other kid i was inspired by iron man's AI-JARVIS), which quickly evolved into a deep fascination with neural networks, computer vision, and intelligent systems. I believe in the power of code to create meaningful impact.",
    "I've contributed to open-source projects, and attended tons of hackathons working on innovative solutions that bridged the gap between technology and practical applications.",
    "My passion is building remarkable things with teams and companies (in future) who share the same vision for leveraging AI and programming to create a better future. 'Connect with me to explore how we can collaborate on exciting projects that push the boundaries of technology'.",
  ]

  return (
    <section ref={ref} className="py-20 px-4 relative">
      {/* Full background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-color white">About ME...</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Content Section with Elegant Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center mx-auto w-full max-w-lg"
          >
            {/* Single Elegant Card */}
            <div className="relative w-full">
              {/* Outer glow effect */}
              <div className="absolute inset-0 -m-2 bg-gradient-to-r from-blue-300/40 to-white/30 rounded-3xl blur-xl"></div>
              
              {/* Elegant white card */}
              <motion.div 
                className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 border border-white/30 shadow-xl"
                initial={{ boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
                animate={{ boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              >
                {/* Card header with quote symbol */}
                <div className="mb-6 text-center">
                  <span className="text-4xl text-blue-300 opacity-50">"</span>
                </div>
                
                {/* Paragraph content */}
                <motion.div 
                  key={currentParagraph}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="min-h-[180px] sm:min-h-[200px] flex items-center"
                >
                  <p className="text-base sm:text-lg leading-relaxed text-left sm:text-justify text-gray-100">
                    {paragraphs[currentParagraph]}
                  </p>
                </motion.div>
                
                {/* Card footer with navigation */}
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/10 gap-4">
                  {/* Dot indicators - shown on top in mobile view */}
                  <div className="flex gap-2 order-1 sm:order-2 my-2 sm:my-0">
                    {paragraphs.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentParagraph(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          index === currentParagraph 
                            ? 'bg-white scale-125' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`Go to paragraph ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Navigation buttons */}
                  <div className="flex justify-between w-full sm:w-auto gap-2 order-2 sm:order-1">
                    {/* Previous button */}
                    <button
                      onClick={() => setCurrentParagraph(Math.max(0, currentParagraph - 1))}
                      disabled={currentParagraph === 0}
                      className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-sm transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-blue-300"
                    >
                      <span>←</span> Previous
                    </button>
                    
                    {/* Next button */}
                    <button
                      onClick={() => setCurrentParagraph(Math.min(paragraphs.length - 1, currentParagraph + 1))}
                      disabled={currentParagraph === paragraphs.length - 1}
                      className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-sm transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-blue-300"
                    >
                      Next <span>→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-6 lg:mt-0"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              {/* Main image container */}
              <div className="relative glass rounded-2xl p-4 overflow-hidden">
                <img
                  src="/harsha-profile.jpg" 
                  alt="Harsha Jain"
                  className="w-full h-96 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-4 bg-gradient-to-t from-black/30 to-transparent rounded-xl pointer-events-none"></div>
              </div>
            </div>

            {/* Collaboration Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 text-center"
            >
              
              <div className="flex justify-center gap-4 items-center">
                <a href="https://github.com/Alexrdj11" target="_blank" rel="noopener noreferrer" 
                   className="hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 fill-white hover:fill-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://x.com/Alex64914127" target="_blank" rel="noopener noreferrer"
                   className="hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 fill-white hover:fill-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </a>
                <a href="mailto:harshahjain4@gmail.com" target="_blank" rel="noopener noreferrer"
                   className="hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 fill-white hover:fill-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                  </svg>
                </a>
              </div>
              <div className="text-sm text-gray-300 mt-2">
                Let's collaborate
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
