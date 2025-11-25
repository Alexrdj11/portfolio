"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface AnimatedButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: "primary" | "secondary"
  className?: string
  target?: string
  rel?: string
}

export function AnimatedButton({ 
  href, 
  onClick, 
  children, 
  variant = "primary",
  className = "",
  target,
  rel
}: AnimatedButtonProps) {
  const baseClasses = "group relative overflow-hidden px-8 py-4 border-2 border-white inline-block transition-all duration-300 hover:bg-white"
  const variantClasses = variant === "primary" 
    ? "text-white hover:text-black" 
    : "text-white/70 border-white/70 hover:border-white hover:text-black"

  const content = (
    <>
      <span className="relative block overflow-hidden">
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </>
  )

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={`${baseClasses} ${variantClasses} ${className}`}
        >
          {content}
        </a>
      )
    }
    return (
      <Link
        href={href}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {content}
    </button>
  )
}
