import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { VideoPreloader } from "@/components/video-preloader"
import { SessionProvider } from "@/components/session-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "EduVerse - Learn Anywhere, Build Skills That Matter",
  description: "Empowering minds through innovative education. Join thousands of learners worldwide.",
}

// Define videos to preload based on routes and priority
const videosToPreload = [
  {
    urls: [
      "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ],
    priority: "high" as const,
    route: "/",
  },
  {
    urls: ["https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"],
    priority: "medium" as const,
    route: "/courses",
  },
  {
    urls: ["https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"],
    priority: "low" as const,
    route: "/about",
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <VideoPreloader videos={videosToPreload} />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
