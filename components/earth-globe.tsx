"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"

function NetworkGlobe() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  
  // Parameters for the network globe - adjust for mobile
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const radius = isMobile ? 1.8 : 2.5  // Smaller radius on mobile
  const nodeCount = isMobile ? 120 : 180  // Fewer nodes on mobile for performance
  const connectionDistance = isMobile ? 0.6 : 0.8  // Shorter connections on mobile
  const rotationSpeed = 0.001

  // Create particle texture for glowing effect
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)')
      gradient.addColorStop(0.7, 'rgba(200, 220, 255, 0.3)')
      gradient.addColorStop(1, 'rgba(100, 150, 255, 0)')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(32, 32, 32, 0, Math.PI * 2)
      ctx.fill()
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  // Create nodes (points) for the network
  const { nodes, nodePositions, glowIntensities } = useMemo(() => {
    // Generate points on a sphere
    const positions = new Float32Array(nodeCount * 3)
    const sizes = new Float32Array(nodeCount)
    const colors = new Float32Array(nodeCount * 3)
    const glowValues = new Float32Array(nodeCount)
    
    for (let i = 0; i < nodeCount; i++) {
      // Use fibonacci sphere for even distribution
      const phi = Math.acos(-1 + (2 * i) / nodeCount)
      const theta = Math.sqrt(nodeCount * Math.PI) * phi
      
      // Convert to cartesian coordinates
      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi)
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // Random size for each node - smaller on mobile
      const baseSize = isMobile ? 0.015 : 0.02
      sizes[i] = Math.random() * (isMobile ? 0.03 : 0.05) + baseSize
      
      // White color with slight variations for shining effect
      colors[i * 3] = 0.8 + Math.random() * 0.2      // R
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2  // G
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.1  // B
      
      // Initialize glow values
      glowValues[i] = Math.random()
    }
    
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('glow', new THREE.BufferAttribute(glowValues, 1))
    
    return { nodes: geometry, nodePositions: positions, glowIntensities: glowValues }
  }, [nodeCount, radius, isMobile])
  
  // Create connections (lines) between nodes
  const lines = useMemo(() => {
    const positions = []
    const colors = []
    
    // Check distances between all nodes and connect if close enough
    for (let i = 0; i < nodeCount; i++) {
      const ix = i * 3
      const p1 = new THREE.Vector3(
        nodePositions[ix],
        nodePositions[ix + 1],
        nodePositions[ix + 2]
      )
      
      for (let j = i + 1; j < nodeCount; j++) {
        const jx = j * 3
        const p2 = new THREE.Vector3(
          nodePositions[jx],
          nodePositions[jx + 1],
          nodePositions[jx + 2]
        )
        
        const distance = p1.distanceTo(p2)
        
        if (distance < connectionDistance) {
          // Store positions
          positions.push(
            p1.x, p1.y, p1.z,
            p2.x, p2.y, p2.z
          )
          
          // White lattice lines with some transparency
          const intensity = (1 - distance / connectionDistance) * 0.8
          colors.push(
            0.9 * intensity, 0.9 * intensity, 1.0 * intensity,
            0.9 * intensity, 0.9 * intensity, 1.0 * intensity
          )
        }
      }
    }
    
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    
    return geometry
  }, [nodePositions, nodeCount, connectionDistance])

  // Animation
  useFrame((state) => {
    if (pointsRef.current) {
      // Gentle rotation
      pointsRef.current.rotation.y += rotationSpeed
      pointsRef.current.rotation.x += rotationSpeed * 0.5
      
      // Random glow animation for shining effect
      const time = state.clock.elapsedTime
      const colorAttribute = pointsRef.current.geometry.getAttribute('color')
      
      if (colorAttribute) {
        for (let i = 0; i < nodeCount; i++) {
          // Create random pulsing effect
          const glowPhase = glowIntensities[i] * Math.PI * 2
          const glowValue = Math.sin(time * 2 + glowPhase) * 0.3 + 0.7
          const pulseIntensity = Math.sin(time * 0.5 + i * 0.1) * 0.4 + 0.6
          
          // Random bright flashes for shining lattice effect
          const flashChance = Math.sin(time * 3 + i * 0.05) > 0.95 ? 1.8 : 1
          
          // Update colors with glow effect - white shining lattices
          const baseR = 0.8 + Math.random() * 0.1
          const baseG = 0.8 + Math.random() * 0.1
          const baseB = 0.9 + Math.random() * 0.1
          
          colorAttribute.array[i * 3] = baseR * glowValue * pulseIntensity * flashChance
          colorAttribute.array[i * 3 + 1] = baseG * glowValue * pulseIntensity * flashChance
          colorAttribute.array[i * 3 + 2] = baseB * glowValue * pulseIntensity * flashChance
        }
        
        colorAttribute.needsUpdate = true
      }
    }
    
    if (linesRef.current) {
      // Gentle rotation
      linesRef.current.rotation.y += rotationSpeed
      linesRef.current.rotation.x += rotationSpeed * 0.5
      
      // Animate line opacity for shining effect
      const time = state.clock.elapsedTime
      const material = linesRef.current.material as THREE.LineBasicMaterial
      const baseOpacity = 0.5 + Math.sin(time * 0.8) * 0.3
      material.opacity = baseOpacity
    }
  })

  return (
    <>
      {/* Network nodes (points) */}
      <points ref={pointsRef}>
        <primitive object={nodes} attach="geometry" />
        <pointsMaterial
          size={isMobile ? 0.08 : 0.1}  // Smaller points on mobile
          sizeAttenuation={true}
          transparent
          depthWrite={false}
          vertexColors
          blending={THREE.AdditiveBlending}
          map={particleTexture}
        />
      </points>
      
      {/* Network connections (lines) */}
      <lineSegments ref={linesRef}>
        <primitive object={lines} attach="geometry" />
        <lineBasicMaterial 
          vertexColors 
          transparent 
          opacity={0.6} 
          blending={THREE.AdditiveBlending} 
        />
      </lineSegments>
    </>
  )
}

export function EarthGlobe() {
  const [cameraSettings, setCameraSettings] = useState({
    position: [0, 0, 7] as [number, number, number],
    fov: 45
  })

  useEffect(() => {
    const updateCameraSettings = () => {
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
      
      if (isMobile) {
        // Mobile: Move camera further back and increase FOV for full globe view
        setCameraSettings({
          position: [0, 0, 10],
          fov: 60
        })
      } else if (isTablet) {
        // Tablet: Middle ground
        setCameraSettings({
          position: [0, 0, 8],
          fov: 50
        })
      } else {
        // Desktop: Original settings
        setCameraSettings({
          position: [0, 0, 7],
          fov: 45
        })
      }
    }

    updateCameraSettings()
    window.addEventListener('resize', updateCameraSettings)

    return () => window.removeEventListener('resize', updateCameraSettings)
  }, [])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas 
        camera={{ 
          position: cameraSettings.position, 
          fov: cameraSettings.fov,
          aspect: typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 1
        }}
        dpr={[1, 2]} // Limit pixel ratio for better mobile performance
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />
        <NetworkGlobe />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.3}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI} // Allow full rotation
          minPolarAngle={0}
        />
        
        {/* Add stars for a space effect - fewer on mobile */}
        <Stars 
          radius={100} 
          depth={50} 
          count={typeof window !== 'undefined' && window.innerWidth < 768 ? 2000 : 5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
        
        {/* Background gradient sphere */}
        <mesh scale={[20, 20, 20]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial 
            color="#000000"
            side={THREE.BackSide}
          />
        </mesh>
      </Canvas>
    </div>
  )
}

export default EarthGlobe