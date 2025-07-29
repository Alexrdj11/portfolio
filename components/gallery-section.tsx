"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Auto-generate image paths - optimized for 8 images with different formats
const generateImagePaths = () => {
  const images = [
    "/gallery/image-1.jpg",
    "/gallery/image-2.jpg", 
    "/gallery/image-3.JPG",
    "/gallery/image-4.jpg",
    "/gallery/image-5.jpg",
    "/gallery/image-6.jpg",
    "/gallery/image-7.jpg",
    "/gallery/image-8.png"  // This one is PNG format
  ]
  
  return images
}

const galleryImages = generateImagePaths()

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Get items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3 // Desktop: 3 images
      if (window.innerWidth >= 768) return 2  // Tablet: 2 images
      return 1 // Mobile: 1 image
    }
    return 1
  }

  const [itemsPerView, setItemsPerView] = useState(1)

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(getItemsPerView())
    }
    
    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const maxIndex = itemsPerView === 1 
    ? galleryImages.length - 1 
    : Math.max(0, Math.ceil(galleryImages.length / itemsPerView) - 1)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying])

  // Smooth scroll to current image
  useEffect(() => {
    if (scrollRef.current) {
      // For mobile (1 item per view), use simple percentage calculation
      // For desktop/tablet, use grouped calculation
      const scrollAmount = itemsPerView === 1 
        ? currentIndex * 100 
        : currentIndex * (100 / itemsPerView)
      scrollRef.current.style.transform = `translateX(-${scrollAmount}%)`
    }
  }, [currentIndex, itemsPerView])

  // Debug: Log current state
  useEffect(() => {
    console.log(`Gallery Debug: currentIndex=${currentIndex}, itemsPerView=${itemsPerView}, maxIndex=${maxIndex}, totalImages=${galleryImages.length}`)
  }, [currentIndex, itemsPerView, maxIndex])

  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8 lg:mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
            Gallery
          </h2>
          <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            A collection of my achievements
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => {
              setIsAutoPlaying(false)
              prevSlide()
            }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 md:p-3 rounded-full transition-all duration-300 border border-white/20"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>

          <button
            onClick={() => {
              setIsAutoPlaying(false)
              nextSlide()
            }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 md:p-3 rounded-full transition-all duration-300 border border-white/20"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>

          {/* Gallery Container */}
          <div className="overflow-hidden rounded-lg md:rounded-xl mx-8 md:mx-12">
            <div
              ref={scrollRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                width: itemsPerView === 1 
                  ? `${galleryImages.length * 100}%` 
                  : `${galleryImages.length * (100 / itemsPerView)}%` 
              }}
            >
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-1 md:px-2"
                  style={{ 
                    width: itemsPerView === 1 
                      ? `${100 / galleryImages.length}%` 
                      : `${100 / galleryImages.length}%` 
                  }}
                >
                  <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] rounded-lg overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10">
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                      onError={(e) => {
                        console.log(`Failed to load image: ${image}`)
                        // Hide broken images
                        const target = e.target as HTMLImageElement
                        if (target.parentElement) {
                          target.parentElement.style.display = 'none'
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-4 md:mt-6 lg:mt-8 space-x-1 md:space-x-2">
            {Array.from({ 
              length: itemsPerView === 1 
                ? galleryImages.length 
                : Math.ceil(galleryImages.length / itemsPerView) 
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  goToSlide(index)
                }}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
