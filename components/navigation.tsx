"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sun, Moon, Linkedin, Twitter, Mail, Download } from "lucide-react"
import { useTheme } from "next-themes"
import GooeyNav from "./GooeyNav"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (pathname !== "/") {
      setIsVisible(true)
      return
    }

    const revealNav = () => setIsVisible(true)
    const timeoutId = window.setTimeout(revealNav, 6000)

    window.addEventListener("mousemove", revealNav)
    window.addEventListener("pointerdown", revealNav)
    window.addEventListener("touchstart", revealNav)

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener("mousemove", revealNav)
      window.removeEventListener("pointerdown", revealNav)
      window.removeEventListener("touchstart", revealNav)
    }
  }, [pathname])

  return (
    <motion.nav
      initial={false}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <motion.div 
              className="text-2xl font-orbitron font-bold text-white relative overflow-hidden"
              whileHover="hover"
              initial="initial"
            >
              <motion.span
                className="inline-block"
                variants={{
                  initial: { rotate: 0 },
                  hover: { 
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }
                }}
              >
                H
              </motion.span>
              <motion.span
                className="inline-block"
                variants={{
                  initial: { rotate: 0, y: 0 },
                  hover: { 
                    rotate: [0, 360],
                    y: [0, -5, 0],
                    transition: { duration: 0.6, delay: 0.1 }
                  }
                }}
              >
                J
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group overflow-hidden ${
                    pathname === item.href
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="relative z-10 block overflow-hidden">
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                      {item.name}
                    </span>
                    <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      {item.name}
                    </span>
                  </span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
              
              {/* Available for Work Badge */}
              <div className="ml-4 px-4 py-2 relative group">
                {/* Corner highlights */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white"></div>
                
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="text-xs text-gray-300 overflow-hidden">
                    <div className="block">Currently</div>
                    <div className="block overflow-hidden relative h-4">
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Available for work</span>
                      <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">Available for work</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Resume Button */}
            <a
              href="/resume/resume.pdf"
              download
              className="hidden md:flex items-center gap-2 relative group px-4 py-2"
            >
              {/* Corner highlights */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white"></div>
              
              <Download size={16} className="text-white" />
              <div className="text-sm font-semibold text-white overflow-hidden relative h-5">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">RESUME</span>
                <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">RESUME</span>
              </div>
            </a>

            

            {/* Social Media Links */}
            <motion.a
              href="https://www.linkedin.com/in/harsha-jain-469377253/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} className="text-gray-300 hover:text-blue-400" />
            </motion.a>

            <motion.a
              href="https://x.com/Alex64914127"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2"
              aria-label="Twitter Profile"
            >
              <Twitter size={20} className="text-gray-300 hover:text-cyan-400" />
            </motion.a>

            <motion.a
              href="mailto:harshahjain4@gmail.com"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2"
              aria-label="Send Email"
            >
              <Mail size={20} className="text-gray-300 hover:text-green-400" />
            </motion.a>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    pathname === item.href ? "text-cyan-400 glow-cyan" : "text-gray-300 hover:text-white hover:glow"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
