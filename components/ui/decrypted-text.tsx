"use client"

import { useEffect, useRef, useState } from 'react'

interface DecryptedTextProps {
  text: string
  className?: string
  speed?: number
  triggerOnView?: boolean
  triggerOnHover?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'button'
  [key: string]: any
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

export function DecryptedText({
  text,
  className = '',
  speed = 150,
  triggerOnView = true,
  triggerOnHover = true,
  as: Component = 'span',
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const elementRef = useRef<HTMLElement>(null)
  const hasAnimatedRef = useRef(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startDecryption = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    let iteration = 0
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            
            // Decrypt from start to end
            if (index < iteration) {
              return text[index]
            }
            
            // Show random character for positions not yet decrypted
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
          })
          .join('')
      )

      iteration += 1

      if (iteration > text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setDisplayText(text)
        setIsAnimating(false)
      }
    }, speed)
  }

  useEffect(() => {
    if (!triggerOnView || hasAnimatedRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true
            startDecryption()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [triggerOnView])

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startDecryption()
    }
  }

  return (
    <Component
      ref={elementRef as any}
      className={className}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {displayText}
    </Component>
  )
}
