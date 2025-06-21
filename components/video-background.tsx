"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useVideoPreloader } from "@/hooks/use-video-preloader"
import { Loader2, Wifi, WifiOff } from "lucide-react"

interface VideoBackgroundProps {
  videoSrc: string[]
  fallbackImage: string
  overlay?: boolean
  className?: string
  children?: React.ReactNode
  priority?: "high" | "medium" | "low"
  preloadAmount?: number
  showLoadingIndicator?: boolean
}

export function VideoBackground({
  videoSrc,
  fallbackImage,
  overlay = true,
  className = "",
  children,
  priority = "medium",
  preloadAmount = 25,
  showLoadingIndicator = true,
}: VideoBackgroundProps) {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { isLoaded, isLoading, hasError, loadProgress, canPlay, bandwidth, shouldUseVideo, intersectionRef, videoRef } =
    useVideoPreloader(videoSrc, {
      preloadAmount,
      priority,
      enableBandwidthDetection: true,
      enableIntersectionObserver: true,
      fallbackDelay: 4000,
    })

  // Create and setup video element when preloading is complete
  useEffect(() => {
    if (canPlay && shouldUseVideo && !videoElement && containerRef.current) {
      const video = document.createElement("video")
      video.autoplay = true
      video.muted = true
      video.loop = true
      video.playsInline = true
      video.className = "absolute inset-0 w-full h-full object-cover z-0"

      // Add sources
      videoSrc.forEach((src) => {
        const source = document.createElement("source")
        source.src = src
        source.type = "video/mp4"
        video.appendChild(source)
      })

      video.addEventListener("playing", () => setIsPlaying(true))
      video.addEventListener("pause", () => setIsPlaying(false))

      setVideoElement(video)
      containerRef.current.appendChild(video)

      // Start playing
      video.play().catch(console.error)
    }
  }, [canPlay, shouldUseVideo, videoElement, videoSrc])

  // Cleanup
  useEffect(() => {
    return () => {
      if (videoElement && containerRef.current?.contains(videoElement)) {
        containerRef.current.removeChild(videoElement)
      }
    }
  }, [videoElement])

  const getBandwidthIcon = () => {
    switch (bandwidth) {
      case "fast":
        return <Wifi className="w-4 h-4 text-green-400" />
      case "medium":
        return <Wifi className="w-4 h-4 text-yellow-400" />
      case "slow":
        return <WifiOff className="w-4 h-4 text-red-400" />
      default:
        return <Wifi className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Intersection Observer Target */}
      <div ref={intersectionRef} className="absolute inset-0" />

      {/* Fallback Image */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${fallbackImage})` }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: !shouldUseVideo || hasError || !isPlaying ? 1 : 0,
        }}
        transition={{ duration: 1.5 }}
      />

      {/* Loading Indicator */}
      <AnimatePresence>
        {showLoadingIndicator && isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 z-50 bg-black/20 backdrop-blur-sm rounded-lg p-3"
          >
            <div className="flex items-center space-x-3 text-white">
              <Loader2 className="w-4 h-4 animate-spin" />
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  {getBandwidthIcon()}
                  <span className="text-xs font-medium">Loading video... {Math.round(loadProgress)}%</span>
                </div>
                <div className="w-24 h-1 bg-white/20 rounded-full mt-1">
                  <motion.div
                    className="h-full bg-green-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Quality Indicator */}
      <AnimatePresence>
        {shouldUseVideo && isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-4 right-4 z-50 bg-black/20 backdrop-blur-sm rounded-lg p-2"
          >
            <div className="flex items-center space-x-2 text-white">
              {getBandwidthIcon()}
              <span className="text-xs font-medium capitalize">{bandwidth} quality</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {overlay && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black/40 via-green-900/20 to-blue-900/30 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  )
}
