"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useVideoPreloader } from "@/hooks/use-video-preloader"
import { useVideoCache } from "@/hooks/use-video-cache"
import { Loader2, Wifi, WifiOff, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EnhancedVideoBackgroundProps {
  videoSrc: string[]
  fallbackImage: string
  overlay?: boolean
  className?: string
  children?: React.ReactNode
  priority?: "high" | "medium" | "low"
  preloadAmount?: number
  showControls?: boolean
  showLoadingIndicator?: boolean
  enableAutoplay?: boolean
  enableMute?: boolean
}

export function EnhancedVideoBackground({
  videoSrc,
  fallbackImage,
  overlay = true,
  className = "",
  children,
  priority = "medium",
  preloadAmount = 25,
  showControls = false,
  showLoadingIndicator = true,
  enableAutoplay = true,
  enableMute = true,
}: EnhancedVideoBackgroundProps) {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(enableMute)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { getCachedVideo, cacheVideo } = useVideoCache()

  const { isLoaded, isLoading, hasError, loadProgress, canPlay, bandwidth, shouldUseVideo, intersectionRef } =
    useVideoPreloader(videoSrc, {
      preloadAmount,
      priority,
      enableBandwidthDetection: true,
      enableIntersectionObserver: true,
      fallbackDelay: 4000,
    })

  // Enhanced video setup with caching
  useEffect(() => {
    if (canPlay && shouldUseVideo && !videoElement && containerRef.current) {
      const setupVideo = async () => {
        const video = document.createElement("video")
        video.autoplay = enableAutoplay
        video.muted = isMuted
        video.loop = true
        video.playsInline = true
        video.className = "absolute inset-0 w-full h-full object-cover z-0"

        // Try to get cached video first
        let videoUrl = videoSrc[0]
        const cachedUrl = await getCachedVideo(videoSrc[0])
        if (cachedUrl) {
          videoUrl = cachedUrl
        } else {
          // Cache the video for future use
          cacheVideo(videoSrc[0], priority)
        }

        // Add sources
        const source = document.createElement("source")
        source.src = videoUrl
        source.type = "video/mp4"
        video.appendChild(source)

        // Add fallback sources
        videoSrc.slice(1).forEach((src) => {
          const fallbackSource = document.createElement("source")
          fallbackSource.src = src
          fallbackSource.type = "video/mp4"
          video.appendChild(fallbackSource)
        })

        // Event listeners
        video.addEventListener("playing", () => setIsPlaying(true))
        video.addEventListener("pause", () => setIsPlaying(false))
        video.addEventListener("timeupdate", () => setCurrentTime(video.currentTime))
        video.addEventListener("loadedmetadata", () => setDuration(video.duration))
        video.addEventListener("volumechange", () => setIsMuted(video.muted))

        setVideoElement(video)
        containerRef.current.appendChild(video)

        // Start playing if autoplay is enabled
        if (enableAutoplay) {
          video.play().catch(console.error)
        }
      }

      setupVideo()
    }
  }, [canPlay, shouldUseVideo, videoElement, videoSrc, enableAutoplay, isMuted, getCachedVideo, cacheVideo, priority])

  // Control functions
  const togglePlay = () => {
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause()
      } else {
        videoElement.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoElement) {
      videoElement.muted = !videoElement.muted
    }
  }

  const seek = (time: number) => {
    if (videoElement) {
      videoElement.currentTime = time
    }
  }

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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

      {/* Video Controls */}
      <AnimatePresence>
        {showControls && shouldUseVideo && videoElement && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 z-50 bg-black/20 backdrop-blur-sm rounded-lg p-3"
          >
            <div className="flex items-center space-x-4">
              <Button size="sm" variant="ghost" onClick={togglePlay} className="text-white hover:bg-white/20">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>

              <Button size="sm" variant="ghost" onClick={toggleMute} className="text-white hover:bg-white/20">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>

              <div className="flex-1 flex items-center space-x-2">
                <span className="text-xs text-white">{formatTime(currentTime)}</span>
                <div className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer">
                  <motion.div
                    className="h-full bg-green-400 rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const x = e.clientX - rect.left
                      const percentage = x / rect.width
                      seek(percentage * duration)
                    }}
                  />
                </div>
                <span className="text-xs text-white">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center space-x-2">
                {getBandwidthIcon()}
                <span className="text-xs text-white capitalize">{bandwidth}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quality Indicator */}
      <AnimatePresence>
        {shouldUseVideo && isPlaying && !showControls && (
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
