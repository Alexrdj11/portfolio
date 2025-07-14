import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { ConstellationBackground } from "@/components/constellation-background"
import { AmbientParticles } from "@/components/ambient-particles"
import { SoundProvider } from "@/components/sound-provider"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "HJ_Industries",
  description: "Portfolio of a developer specializing in AI, ML, and software development.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${orbitron.variable} ${poppins.variable} font-poppins antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SoundProvider>
            <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
              <ConstellationBackground />
              <AmbientParticles />
              <Navigation />
              <main className="relative z-10">{children}</main>
            </div>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
