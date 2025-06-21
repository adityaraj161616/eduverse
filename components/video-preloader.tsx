"use client"

import { useEffect } from "react"
import { useVideoCache } from "@/hooks/use-video-cache"

interface VideoPreloaderProps {
  videos: Array<{
    urls: string[]
    priority: "high" | "medium" | "low"
    route?: string
  }>
}

export function VideoPreloader({ videos }: VideoPreloaderProps) {
  const { prefetchVideos, cacheStats } = useVideoCache()

  useEffect(() => {
    // Prefetch videos based on priority
    const highPriorityVideos = videos.filter((v) => v.priority === "high").flatMap((v) => v.urls)

    const mediumPriorityVideos = videos.filter((v) => v.priority === "medium").flatMap((v) => v.urls)

    const lowPriorityVideos = videos.filter((v) => v.priority === "low").flatMap((v) => v.urls)

    // Prefetch immediately for high priority
    if (highPriorityVideos.length > 0) {
      prefetchVideos(highPriorityVideos, "high")
    }

    // Delay medium priority
    setTimeout(() => {
      if (mediumPriorityVideos.length > 0) {
        prefetchVideos(mediumPriorityVideos, "medium")
      }
    }, 2000)

    // Delay low priority even more
    setTimeout(() => {
      if (lowPriorityVideos.length > 0) {
        prefetchVideos(lowPriorityVideos, "low")
      }
    }, 5000)
  }, [videos, prefetchVideos])

  // Log cache stats in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Video Cache Stats:", cacheStats)
    }
  }, [cacheStats])

  return null // This component doesn't render anything
}
