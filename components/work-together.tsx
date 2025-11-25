"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function WorkTogether() {
  return (
    <section className="relative py-32 px-6 pb-48 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-gray-400"
          >
            LET'S WORK TOGETHER
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <a
              href="https://cal.com/harsha-jain-1q7kr4"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden px-12 py-6 border-4 border-white inline-block transition-all duration-300 hover:bg-white text-3xl md:text-5xl lg:text-6xl font-bold"
            >
              <span className="relative block overflow-hidden text-white group-hover:text-black">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  Schedule a call
                </span>
                <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  Schedule a call
                </span>
              </span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col items-end space-y-2 max-w-xs ml-auto text-sm"
          >
            <Link
              href="https://github.com/Alexrdj11"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              <span>↗</span> GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/harsha-jain-469377253/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              <span>↗</span> LinkedIn
            </Link>
            <Link
              href="https://x.com/Alex64914127"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              <span>↗</span> Twitter
            </Link>
          </motion.div>
        </div>

        {/* Large HJ Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1, 
            delay: 0.6,
            ease: "easeOut"
          }}
          whileHover={{ 
            scale: 1.1, 
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
          viewport={{ once: true }}
          className="absolute bottom-8 right-8 opacity-30 hover:opacity-50 transition-opacity duration-300 cursor-pointer"
        >
          <div className="text-white text-9xl font-bold font-orbitron">
            HJ
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="absolute bottom-2 left-8 text-gray-500 text-sm"
        >
          HJ © Copyright 2025
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="absolute bottom-2 right-1/2 translate-x-1/2 text-gray-500 text-sm"
        >
          All rights reserved
        </motion.div>
      </div>
    </section>
  )
}
