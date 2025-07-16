"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle, Loader } from "lucide-react"

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

  return (
    <div className="pt-20 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-color white">Get In Touch</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to collaborate on exciting AI/ML projects? Let's connect and build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-4 sm:p-6 md:p-8"
          >
            <h2 className="text-2xl font-orbitron font-bold text-gradient mb-6">Send Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                    placeholder="Your name"
                    required
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>
              </div>

              <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                  placeholder="What's this about?"
                  required
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or idea..."
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold glow transition-all duration-300 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  <Send size={20} />
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
              
              {/* Form submission feedback */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                      submitStatus.success 
                        ? 'bg-green-500/20 border border-green-500' 
                        : 'bg-red-500/20 border border-red-500'
                    }`}
                  >
                    {submitStatus.success ? (
                      <CheckCircle className="text-green-400" size={20} />
                    ) : (
                      <AlertCircle className="text-red-400" size={20} />
                    )}
                    <p>{submitStatus.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass rounded-2xl p-4 sm:p-6 md:p-8">
              <h2 className="text-2xl font-orbitron font-bold text-gradient mb-4 md:mb-6">Contact Information</h2>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 glass-hover rounded-lg transition-all duration-300"
                >
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <a 
                      href="mailto:harshahjain4@gmail.com" 
                      className="text-gray-300 hover:text-blue-300 transition-colors"
                    >
                      harshahjain4@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 glass-hover rounded-lg transition-all duration-300"
                >
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a 
                      href="tel:+919742166180" 
                      className="text-gray-300 hover:text-green-300 transition-colors"
                    >
                      +91 9742166180
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 glass-hover rounded-lg transition-all duration-300"
                >
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-300">Mysore, Karnataka, India</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="glass rounded-2xl p-4 sm:p-6 md:p-8">
              <h2 className="text-2xl font-orbitron font-bold text-gradient mb-4 md:mb-6">Follow Me</h2>

              <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                <motion.a
                  href="https://github.com/Alexrdj11" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 glass glass-hover rounded-lg transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <Github size={24} className="text-gray-300 hover:text-white" />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/harsha-jain-469377253/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 glass glass-hover rounded-lg transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={24} className="text-gray-300 hover:text-blue-400" />
                </motion.a>

                <motion.a
                  href="https://x.com/Alex64914127" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 glass glass-hover rounded-lg transition-all duration-300"
                  aria-label="Twitter Profile"
                >
                  <Twitter size={24} className="text-gray-300 hover:text-cyan-400" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
