"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface VideoPreloadOptions {
  preloadAmount?: number // Percentage of video to preload (0-100)
  enableBandwidthDetection?: boolean
  enableIntersectionObserver?: boolean
  priority?: "high" | "medium" | "low"
  fallbackDelay?: number // Delay before showing fallback (ms)
}

interface VideoPreloadState {
  isLoaded: boolean
  isLoading: boolean
  hasError: boolean
  loadProgress: number
  canPlay: boolean
  bandwidth: "fast" | "medium" | "slow" | "unknown"
  shouldUseVideo: boolean
}

export function useVideoPreloader(videoSources: string[], options: VideoPreloadOptions = {}) {
  const {
    preloadAmount = 25,
    enableBandwidthDetection = true,
    enableIntersectionObserver = true,
    priority = "medium",
    fallbackDelay = 3000,
  } = options

  const [state, setState] = useState<VideoPreloadState>({
    isLoaded: false,
    isLoading: false,
    hasError: false,
    loadProgress: 0,
    canPlay: false,
    bandwidth: "unknown",
    shouldUseVideo: true,
  })

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const intersectionRef = useRef<HTMLDivElement | null>(null)
  const bandwidthTestRef = useRef<number>(0)
  const fallbackTimeoutRef = useRef<NodeJS.Timeout>()

  // Bandwidth detection
  const detectBandwidth = useCallback(async () => {
    if (!enableBandwidthDetection) return "unknown"

    try {
      const startTime = performance.now()
      const testImage = new Image()

      return new Promise<"fast" | "medium" | "slow">((resolve) => {
        testImage.onload = () => {
          const endTime = performance.now()
          const loadTime = endTime - startTime
          const imageSize = 50000 // Approximate size in bytes
          const speed = imageSize / (loadTime / 1000) // bytes per second

          if (speed > 500000)
            resolve("fast") // > 500KB/s
          else if (speed > 100000)
            resolve("medium") // > 100KB/s
          else resolve("slow")
        }

        testImage.onerror = () => resolve("slow")
        testImage.src = `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=100&fit=crop&t=${Date.now()}`
      })
    } catch {
      return "medium"
    }
  }, [enableBandwidthDetection])

  // Preload video with progress tracking
  const preloadVideo = useCallback(
    async (sources: string[]) => {
      if (!sources.length) return

      setState((prev) => ({ ...prev, isLoading: true, hasError: false }))

      // Start fallback timer
      fallbackTimeoutRef.current = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          shouldUseVideo: false,
          isLoading: false,
        }))
      }, fallbackDelay)

      try {
        const video = document.createElement("video")
        video.preload = "metadata"
        video.muted = true
        video.playsInline = true

        // Add sources
        sources.forEach((src) => {
          const source = document.createElement("source")
          source.src = src
          source.type = "video/mp4"
          video.appendChild(source)
        })

        // Progress tracking
        const updateProgress = () => {
          if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1)
            const duration = video.duration || 1
            const progress = (bufferedEnd / duration) * 100

            setState((prev) => ({ ...prev, loadProgress: Math.min(progress, 100) }))

            // Check if enough is preloaded
            if (progress >= preloadAmount) {
              setState((prev) => ({
                ...prev,
                canPlay: true,
                isLoaded: true,
                isLoading: false,
              }))

              if (fallbackTimeoutRef.current) {
                clearTimeout(fallbackTimeoutRef.current)
              }
            }
          }
        }

        video.addEventListener("loadedmetadata", () => {
          setState((prev) => ({ ...prev, loadProgress: 10 }))
        })

        video.addEventListener("progress", updateProgress)
        video.addEventListener("canplay", () => {
          setState((prev) => ({
            ...prev,
            canPlay: true,
            isLoaded: true,
            isLoading: false,
          }))

          if (fallbackTimeoutRef.current) {
            clearTimeout(fallbackTimeoutRef.current)
          }
        })

        video.addEventListener("error", () => {
          setState((prev) => ({
            ...prev,
            hasError: true,
            isLoading: false,
            shouldUseVideo: false,
          }))

          if (fallbackTimeoutRef.current) {
            clearTimeout(fallbackTimeoutRef.current)
          }
        })

        videoRef.current = video

        // Start loading
        video.load()
      } catch (error) {
        setState((prev) => ({
          ...prev,
          hasError: true,
          isLoading: false,
          shouldUseVideo: false,
        }))
      }
    },
    [preloadAmount, fallbackDelay],
  )

  // Initialize preloading
  useEffect(() => {
    const initPreload = async () => {
      // Detect bandwidth first
      const bandwidth = await detectBandwidth()
      setState((prev) => ({ ...prev, bandwidth }))

      // Decide whether to use video based on bandwidth and priority
      const shouldUseVideo =
        bandwidth === "fast" ||
        (bandwidth === "medium" && priority !== "low") ||
        (bandwidth === "slow" && priority === "high")

      if (shouldUseVideo) {
        // Check if intersection observer should be used
        if (enableIntersectionObserver && intersectionRef.current) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  preloadVideo(videoSources)
                  observer.disconnect()
                }
              })
            },
            { threshold: 0.1 },
          )

          observer.observe(intersectionRef.current)

          return () => observer.disconnect()
        } else {
          // Preload immediately
          preloadVideo(videoSources)
        }
      } else {
        setState((prev) => ({ ...prev, shouldUseVideo: false }))
      }
    }

    initPreload()

    return () => {
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current)
      }
    }
  }, [videoSources, detectBandwidth, preloadVideo, enableIntersectionObserver, priority])

  return {
    ...state,
    intersectionRef,
    videoRef: videoRef.current,
  }
}
