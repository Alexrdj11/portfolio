"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

export function LayoutLoader() {
  const [show, setShow] = useState(false)
  const pathname = usePathname()
  const prevPath = useState(pathname)[0]  // capture mount-time path

  useEffect(() => {
    // Show on every visit to the home page
    if (pathname === "/") {
      setShow(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!show) return null
  return <LoadingScreen onComplete={() => setShow(false)} />
}
