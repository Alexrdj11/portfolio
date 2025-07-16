import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { ConstellationBackground } from "@/components/constellation-background"
import { AmbientParticles } from "@/components/ambient-particles"

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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: '32x32',
      },
      {
        url: '/favicon-16x16.svg',
        type: 'image/svg+xml',
        sizes: '16x16',
      },
    ],
    shortcut: '/favicon.svg',
    apple: [
      {
        url: '/icon-192x192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
    ],
  },
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
          <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            <ConstellationBackground />
            <AmbientParticles />
            <Navigation />
            <main className="relative z-10">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
