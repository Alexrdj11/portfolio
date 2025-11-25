import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Poppins, Montserrat, Anton, Bebas_Neue } from "next/font/google"
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

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
})

// Anton only provides a single weight; supply it explicitly for next/font typing
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
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
      <body className={`${orbitron.variable} ${poppins.variable} ${montserrat.variable} ${anton.variable} ${bebasNeue.variable} font-poppins antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            <ConstellationBackground />
            <AmbientParticles />
            <Navigation />
            <main className="relative z-10">{children}</main>
            
            {/* Buy Me a Coffee Button */}
            <a
              href="https://buymeacoffee.com/harsha_jain"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-8 right-8 z-50 group"
            >
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/50 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-orange-500/70">
                <span className="text-2xl">☕</span>
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-2 rounded-lg">
                    <span className="text-sm font-medium text-white">Buy me a coffee</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
