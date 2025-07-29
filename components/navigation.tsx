"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sun, Moon, Linkedin, Twitter, Mail } from "lucide-react"
import { useTheme } from "next-themes"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Gallery", href: "/gallery" },
  { name: "Skills", href: "/skills" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass glow" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <Link href="/" className="text-2xl font-orbitron font-bold text-gradient">
              HJ
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      pathname === item.href ? "text-cyan-400 glow-cyan" : "text-gray-300 hover:text-white hover:glow"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Social Media Links */}
            <motion.a
              href="https://www.linkedin.com/in/harsha-jain-469377253/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full glass glass-hover"
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
              className="p-2 rounded-full glass glass-hover"
              aria-label="Twitter Profile"
            >
              <Twitter size={20} className="text-gray-300 hover:text-cyan-400" />
            </motion.a>

            <motion.a
              href="mailto:harshahjain4@gmail.com"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full glass glass-hover"
              aria-label="Send Email"
            >
              <Mail size={20} className="text-gray-300 hover:text-green-400" />
            </motion.a>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full glass glass-hover"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full glass glass-hover"
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
