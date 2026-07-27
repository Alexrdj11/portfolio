"use client"

/**
 * Page transition overlay.
 *
 * Visual language matches the loading screen but mirrored:
 *   Cover  → white panel sweeps FROM RIGHT → LEFT (dark portfolio disappears)
 *   Reveal → white panel sweeps FROM LEFT  → RIGHT (new page appears)
 *
 * Percentage counter shown in the dark area next to the seam, same style as loader.
 */

import React, {
  createContext, useCallback, useContext,
  useEffect, useRef, useState,
} from "react"
import { useRouter } from "next/navigation"

// ─── Timing ──────────────────────────────────────────────────────────────────
const COVER_MS  = 620
const HOLD_MS   = 60
const REVEAL_MS = 720

function ease(t: number) {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2
}
function lerp(a: number, b: number, t: number) { return a + (b - a)*t }

// ─── Context ─────────────────────────────────────────────────────────────────
type Ctx = { navigate: (href: string) => void }
const TransitionCtx = createContext<Ctx>({ navigate: () => {} })
export const usePageTransition = () => useContext(TransitionCtx)

// ─── Provider + Overlay ──────────────────────────────────────────────────────
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  // tx = translateX of the 100vw white panel (in vw)
  // Cover:  100 → 0    (panel sweeps in from right, covering page)
  // Reveal: 0   → -100 (panel sweeps out to left, revealing new page)
  const [tx,      setTx]      = useState(100)   // off-screen right = hidden
  const [pct,     setPct]     = useState(0)
  const [active,  setActive]  = useState(false)
  const [seamSide, setSeamSide] = useState<"left"|"right">("left")

  const raf   = useRef<number | null>(null)
  const t0    = useRef(0)
  const alive = useRef(true)

  useEffect(() => {
    alive.current = true
    return () => { alive.current = false; if (raf.current) cancelAnimationFrame(raf.current) }
  }, [])

  const navigate = useCallback((href: string) => {
    if (!alive.current) return
    if (raf.current) cancelAnimationFrame(raf.current)

    // ── Cover: panel slides from right (tx=100) → center (tx=0)
    setActive(true)
    setSeamSide("left")   // seam = left edge of panel = right edge of dark area
    setPct(0)
    t0.current = performance.now()

    const coverTick = (now: number) => {
      if (!alive.current) return
      const t = Math.min((now - t0.current) / COVER_MS, 1)
      const newTx = lerp(100, 0, ease(t))
      setTx(newTx)
      setPct(Math.round(t * 100))

      if (t < 1) {
        raf.current = requestAnimationFrame(coverTick)
      } else {
        setTx(0)
        setPct(100)

        // Navigate, then reveal
        setTimeout(() => {
          router.push(href)

          setTimeout(() => {
            if (!alive.current) return
            setSeamSide("right")  // seam = right edge of panel = right of dark new page
            t0.current = performance.now()
            setPct(0)

            const revealTick = (now: number) => {
              if (!alive.current) return
              const t = Math.min((now - t0.current) / REVEAL_MS, 1)
              const newTx = lerp(0, -105, ease(t))
              setTx(newTx)
              setPct(Math.round(t * 100))

              if (t < 1) {
                raf.current = requestAnimationFrame(revealTick)
              } else {
                setActive(false)
                setTx(100)  // reset off-screen
                setPct(0)
              }
            }
            raf.current = requestAnimationFrame(revealTick)
          }, HOLD_MS)
        }, HOLD_MS)
      }
    }

    raf.current = requestAnimationFrame(coverTick)
  }, [router])

  return (
    <TransitionCtx.Provider value={{ navigate }}>
      {children}

      {/* ── Overlay ── */}
      {active && (
        <div style={{
          position:"fixed", inset:0, zIndex:99998,
          pointerEvents:"all", overflow:"hidden",
        }}>
          {/* White panel */}
          <div style={{
            position:"absolute", top:0, bottom:0, left:0, width:"100vw",
            background:"#fff",
            transform:`translateX(${tx}vw)`,
            willChange:"transform",
          }}>
            {/* Seam */}
            <div style={{
              position:"absolute",
              top:0, bottom:0,
              [seamSide]: 0,
              width:"1.5px",
              background:"linear-gradient(to bottom,transparent,rgba(255,255,255,1) 50%,transparent)",
              boxShadow:"0 0 10px rgba(255,255,255,0.7),0 0 26px rgba(255,255,255,0.25)",
            }} />
          </div>

          {/* Percentage counter — always in the dark area outside the panel */}
          <div style={{
            position:"absolute", top:"50%",
            transform:`translateY(-50%) translateX(calc(${tx}vw ${seamSide === "left" ? "- 100% - 18px" : "+ 100vw + 18px"}))`,
            display:"flex", flexDirection:"column",
            alignItems: seamSide === "left" ? "flex-end" : "flex-start",
            gap:6,
            fontFamily:"'Inter','SF Pro Display',-apple-system,sans-serif",
            userSelect:"none", whiteSpace:"nowrap",
          }}>
            <span style={{
              fontSize:"clamp(0.62rem,1.2vw,0.78rem)", fontWeight:700,
              letterSpacing:"0.12em", fontVariantNumeric:"tabular-nums",
              color:"#fff", opacity:0.85,
            }}>
              {String(pct).padStart(2,"0")}
            </span>
            <div style={{
              height:"1px",
              width:`${Math.max(8, pct * 0.54)}px`, maxWidth:"54px",
              background:"rgba(255,255,255,0.5)",
              transition:"width 0.18s ease-out",
              alignSelf: seamSide === "left" ? "flex-end" : "flex-start",
            }} />
          </div>
        </div>
      )}
    </TransitionCtx.Provider>
  )
}
