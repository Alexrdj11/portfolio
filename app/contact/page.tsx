"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle, Loader } from "lucide-react"
import GradualBlur from "@/components/ui/GradualBlur"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: data.message || 'Thank you! Your message has been received.'
        })
        // Clear form on success
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Failed to send message. Please try again.'
        })
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "harshahjain4@gmail.com",
      href: "mailto:harshahjain4@gmail.com",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.2
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9742166180",
      href: "tel:+919742166180",
      gradient: "from-green-500 to-emerald-500",
      delay: 0.3
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mysore, Karnataka, India",
      href: null,
      gradient: "from-purple-500 to-pink-500",
      delay: 0.4
    }
  ]

  const socials = [
    {
      icon: Github,
      href: "https://github.com/Alexrdj11",
      label: "GitHub",
      color: "hover:text-white"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/harsha-jain-469377253/",
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      icon: Twitter,
      href: "https://x.com/Alex64914127",
      label: "Twitter",
      color: "hover:text-cyan-400"
    }
  ]

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            GET IN TOUCH
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Ready to collaborate on exciting AI/ML projects? Let's connect and build something amazing together.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-cyan-400 mb-2" style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                SEND MESSAGE
              </h2>
              <div className="h-1 w-20 bg-cyan-400"></div>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-2"
                >
                  <label className="text-sm text-gray-400">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-cyan-400 transition-all duration-300 text-white placeholder:text-gray-600"
                    placeholder="Your name"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-2"
                >
                  <label className="text-sm text-gray-400">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-cyan-400 transition-all duration-300 text-white placeholder:text-gray-600"
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="space-y-2"
              >
                <label className="text-sm text-gray-400">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-cyan-400 transition-all duration-300 text-white placeholder:text-gray-600"
                  placeholder="What's this about?"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-2"
              >
                <label className="text-sm text-gray-400">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-cyan-400 transition-all duration-300 resize-none text-white placeholder:text-gray-600"
                  placeholder="Tell me about your project or idea..."
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                disabled={isSubmitting}
                className="group relative overflow-hidden w-full px-8 py-4 border-2 border-cyan-400 inline-flex items-center justify-center gap-3 transition-all duration-300 hover:bg-cyan-400 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative flex items-center gap-3 text-white">
                  {isSubmitting ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Sending...</span>
                      <span className="absolute inset-0 inline-flex items-center justify-center gap-3 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        <Loader size={20} className="animate-spin" />Sending...
                      </span>
                    </>
                  ) : (
                    <>
                      <Send size={20} className="transition-transform duration-300 group-hover:-translate-y-12" />
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Send Message</span>
                      <Send size={20} className="absolute left-8 translate-y-12 transition-transform duration-300 group-hover:translate-y-0" />
                      <span className="absolute inset-0 inline-flex items-center justify-center gap-3 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        <Send size={20} />Send Message
                      </span>
                    </>
                  )}
                </span>
              </motion.button>
              
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 border-2 flex items-center gap-3 ${
                      submitStatus.success 
                        ? 'border-green-500 bg-green-500/10' 
                        : 'border-red-500 bg-red-500/10'
                    }`}
                  >
                    {submitStatus.success ? (
                      <CheckCircle className="text-green-400" size={20} />
                    ) : (
                      <AlertCircle className="text-red-400" size={20} />
                    )}
                    <p className="text-white">{submitStatus.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-12"
          >
            {/* Contact Information */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-cyan-400 mb-2" style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                  CONTACT INFORMATION
                </h2>
                <div className="h-1 w-20 bg-cyan-400"></div>
              </motion.div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`p-4 bg-gradient-to-br ${item.gradient} rounded-sm flex-shrink-0`}
                    >
                      <item.icon size={24} className="text-white" />
                    </motion.div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-white mb-1">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href}
                          className="text-gray-400 hover:text-cyan-400 transition-colors break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-400">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-cyan-400 mb-2" style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                  FOLLOW ME
                </h2>
                <div className="h-1 w-20 bg-cyan-400"></div>
              </motion.div>

              <div className="flex gap-4">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-5 bg-white/5 border-2 border-white/10 hover:border-cyan-400 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={28} className={`text-gray-400 ${social.color} transition-colors`} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <GradualBlur
        target="page"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={8}
        curve="bezier"
        exponential={true}
        opacity={1}
      />
    </div>
  )
}
