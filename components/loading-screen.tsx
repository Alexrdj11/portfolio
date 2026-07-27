"use client"

import { useEffect, useRef, useState } from "react"

const INIT_HOLD    = 1000
const WIPE_MS      = 1400
const LOAD_DELAY   = 80
const AT_100_PAUSE = 500
const FLASH_MS     = 200
const SLIDE_MS     = 600

const STEPS = [
  { pct:  0, hold:   0 },
  { pct:  7, hold: 240 },
  { pct: 15, hold: 280 },
  { pct: 24, hold: 320 },
  { pct: 39, hold: 350 },
  { pct: 52, hold: 370 },
  { pct: 68, hold: 380 },
  { pct: 84, hold: 390 },
  { pct:100, hold:   0 },
]

const STATUS: Record<number, string> = {
  0: "INITIALIZING...", 7: "INITIALIZING...", 15: "INITIALIZING...",
  24: "LOADING EXPERIENCE...", 39: "LOADING EXPERIENCE...",
  52: "LOADING EXPERIENCE...", 68: "LOADING EXPERIENCE...",
  84: "WELCOME, HARSHA.", 100: "WELCOME, HARSHA.",
}

function ease(t: number) {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2
}

// ── Panel uses transform: translateX(Xvw) on a full-100vw fixed div
// X=0 → full white screen  X=94 → thin strip  X=100 → off-screen
// GPU-composited → unaffected by main-thread JS load
export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  type Phase = "init" | "wipe" | "load" | "done"

  const [phase,      setPhase]      = useState<Phase>("init")
  const [tx,         setTx]         = useState(0)      // translateX in vw
  const [pct,        setPct]        = useState(0)
  const [status,     setStatus]     = useState(STATUS[0])
  const [flash,      setFlash]      = useState(false)
  const [visible,    setVisible]    = useState(true)

  const raf   = useRef<number | ReturnType<typeof setTimeout> | null>(null)
  const t0    = useRef(0)
  const alive = useRef(true)

  useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
      if (raf.current != null) {
        cancelAnimationFrame(raf.current as number)
        clearTimeout(raf.current as ReturnType<typeof setTimeout>)
      }
    }
  }, [])

  useEffect(() => {
    const safe = (fn: () => void) => { if (alive.current) fn() }

    // ── Phase 1: hold white
    const t1 = setTimeout(() => {
      safe(() => setPhase("wipe"))
      t0.current = performance.now()

      // ── Phase 2: rAF wipe  tx: 0 → 94
      const wipeFrame = (now: number) => {
        if (!alive.current) return
        const t = Math.min((now - t0.current) / WIPE_MS, 1)
        setTx(ease(t) * 94)
        if (t < 1) {
          raf.current = requestAnimationFrame(wipeFrame)
        } else {
          safe(() => setPhase("load"))

          // ── Phase 3: counter  tx: 94 → 99.2
          const t2 = setTimeout(() => {
            if (!alive.current) return
            let idx = 1

            const tick = () => {
              if (!alive.current) return
              const step = STEPS[idx]
              if (!step) return
              const newTx = 94 + (idx - 1) / (STEPS.length - 2) * 5.2
              setTx(newTx)
              setPct(step.pct)
              setStatus(STATUS[step.pct])

              if (idx < STEPS.length - 1) {
                const hold = STEPS[idx].hold
                idx++
                raf.current = setTimeout(tick, hold) as ReturnType<typeof setTimeout>
              } else {
                // ── Phase 4: exit
                setTimeout(() => {
                  if (!alive.current) return
                  safe(() => setFlash(true))
                  setTimeout(() => {
                    if (!alive.current) return
                    safe(() => { setFlash(false); setPhase("done"); setTx(100) })
                    setTimeout(() => safe(() => { setVisible(false); onComplete?.() }), SLIDE_MS)
                  }, FLASH_MS)
                }, AT_100_PAUSE)
              }
            }
            tick()
          }, LOAD_DELAY)

          return () => clearTimeout(t2)
        }
      }
      raf.current = requestAnimationFrame(wipeFrame)
    }, INIT_HOLD)

    return () => clearTimeout(t1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  const txStyle = `translateX(${tx}vw)`

  return (
    <div style={{ position:"fixed", inset:0, zIndex:100000, pointerEvents:"all", overflow:"hidden" }}>

      {/* White panel — GPU-composited transform */}
      <div style={{
        position:"absolute", top:0, bottom:0, left:0, width:"100vw",
        background:"#fff",
        transform: txStyle,
        willChange:"transform",
        transition: phase === "done" ? `transform ${SLIDE_MS}ms cubic-bezier(0.76,0,0.24,1)` : "none",
        opacity: flash ? 0.45 : 1,
        boxShadow: flash ? "-20px 0 100px rgba(255,255,255,0.7)" : "none",
      }}>
        {/* Status text — init + wipe phases */}
        {(phase === "init" || phase === "wipe") && (
          <div style={{
            position:"absolute", inset:0, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:14,
            fontFamily:"'Inter','SF Pro Display',-apple-system,sans-serif", userSelect:"none",
          }}>
            <span style={{ fontSize:"clamp(0.58rem,1.1vw,0.72rem)", fontWeight:500,
              letterSpacing:"0.28em", opacity:0.45, textTransform:"uppercase", color:"#000" }}>
              {status}
            </span>
          </div>
        )}

        {/* Glowing left-edge seam */}
        <div style={{
          position:"absolute", top:0, bottom:0, left:0, width:"1.5px",
          background:"linear-gradient(to bottom,transparent,rgba(255,255,255,1) 50%,transparent)",
          boxShadow:"0 0 10px rgba(255,255,255,0.7),0 0 28px rgba(255,255,255,0.25)",
          opacity: phase === "init" ? 0 : flash ? 1 : 0.9,
          transition:"opacity 0.3s ease",
        }} />
      </div>

      {/* Percentage counter — just left of the seam, in the dark area */}
      {(phase === "load" || phase === "done") && (
        <div style={{
          position:"absolute", top:"50%", zIndex:1,
          transform:`translateY(-50%) translateX(calc(${txStyle} - 100% - 18px))`,
          display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6,
          fontFamily:"'Inter','SF Pro Display',-apple-system,sans-serif",
          userSelect:"none", whiteSpace:"nowrap",
        }}>
          <span style={{ fontSize:"clamp(0.62rem,1.2vw,0.78rem)", fontWeight:700,
            letterSpacing:"0.12em", fontVariantNumeric:"tabular-nums",
            color:"#fff", opacity:0.85 }}>
            {String(pct).padStart(2,"0")}
          </span>
          <div style={{
            height:"1px", width:`${Math.max(8, pct * 0.54)}px`, maxWidth:"54px",
            background:"rgba(255,255,255,0.5)", transition:"width 0.22s ease-out",
          }} />
        </div>
      )}
    </div>
  )
}
