"use client"

import { useState, useEffect, useCallback } from "react"

interface CacheEntry {
  url: string
  blob: Blob
  timestamp: number
  priority: "high" | "medium" | "low"
  size: number
}

interface VideoCacheOptions {
  maxCacheSize?: number // in MB
  maxAge?: number // in milliseconds
  enablePrefetch?: boolean
}

class VideoCache {
  private cache = new Map<string, CacheEntry>()
  private maxSize: number
  private maxAge: number
  private currentSize = 0

  constructor(maxSizeMB = 50, maxAgeMs = 30 * 60 * 1000) {
    // 50MB, 30 minutes
    this.maxSize = maxSizeMB * 1024 * 1024 // Convert to bytes
    this.maxAge = maxAgeMs
    this.cleanup()
  }

  async get(url: string): Promise<string | null> {
    const entry = this.cache.get(url)

    if (!entry) return null

    // Check if expired
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.delete(url)
      return null
    }

    // Return blob URL
    return URL.createObjectURL(entry.blob)
  }

  async set(url: string, blob: Blob, priority: "high" | "medium" | "low" = "medium"): Promise<void> {
    const size = blob.size

    // Check if we need to make space
    while (this.currentSize + size > this.maxSize && this.cache.size > 0) {
      this.evictLRU()
    }

    // Don't cache if too large
    if (size > this.maxSize * 0.5) return

    const entry: CacheEntry = {
      url,
      blob,
      timestamp: Date.now(),
      priority,
      size,
    }

    // Remove existing entry if present
    if (this.cache.has(url)) {
      this.delete(url)
    }

    this.cache.set(url, entry)
    this.currentSize += size
  }

  delete(url: string): void {
    const entry = this.cache.get(url)
    if (entry) {
      this.cache.delete(url)
      this.currentSize -= entry.size
    }
  }

  private evictLRU(): void {
    let oldestTime = Date.now()
    let oldestUrl = ""
    let lowestPriority = "high"

    // Find oldest low priority item first
    for (const [url, entry] of this.cache) {
      if (entry.priority === "low" && entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp
        oldestUrl = url
        lowestPriority = "low"
      }
    }

    // If no low priority, find oldest medium priority
    if (!oldestUrl) {
      oldestTime = Date.now()
      for (const [url, entry] of this.cache) {
        if (entry.priority === "medium" && entry.timestamp < oldestTime) {
          oldestTime = entry.timestamp
          oldestUrl = url
          lowestPriority = "medium"
        }
      }
    }

    // Finally, find oldest high priority if needed
    if (!oldestUrl) {
      oldestTime = Date.now()
      for (const [url, entry] of this.cache) {
        if (entry.timestamp < oldestTime) {
          oldestTime = entry.timestamp
          oldestUrl = url
        }
      }
    }

    if (oldestUrl) {
      this.delete(oldestUrl)
    }
  }

  private cleanup(): void {
    setInterval(
      () => {
        const now = Date.now()
        for (const [url, entry] of this.cache) {
          if (now - entry.timestamp > this.maxAge) {
            this.delete(url)
          }
        }
      },
      5 * 60 * 1000,
    ) // Cleanup every 5 minutes
  }

  getCacheStats() {
    return {
      size: this.currentSize,
      maxSize: this.maxSize,
      count: this.cache.size,
      utilization: (this.currentSize / this.maxSize) * 100,
    }
  }
}

// Global cache instance
const globalVideoCache = new VideoCache()

export function useVideoCache(options: VideoCacheOptions = {}) {
  const { enablePrefetch = true } = options
  const [cacheStats, setCacheStats] = useState(globalVideoCache.getCacheStats())

  const getCachedVideo = useCallback(async (url: string): Promise<string | null> => {
    return await globalVideoCache.get(url)
  }, [])

  const cacheVideo = useCallback(
    async (url: string, priority: "high" | "medium" | "low" = "medium"): Promise<string | null> => {
      try {
        // Check cache first
        const cached = await globalVideoCache.get(url)
        if (cached) return cached

        // Validate URL before fetching
        if (!url || !url.startsWith("http")) {
          console.warn("Invalid video URL:", url)
          return null
        }

        // Fetch and cache with timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        const response = await fetch(url, {
          signal: controller.signal,
          mode: "cors",
          headers: {
            Accept: "video/*,*/*;q=0.9",
          },
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          console.warn(`Failed to fetch video: ${response.status} - ${url}`)
          return null
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.startsWith("video/")) {
          console.warn("Response is not a video:", contentType, url)
          return null
        }

        const blob = await response.blob()
        await globalVideoCache.set(url, blob, priority)

        // Update stats
        setCacheStats(globalVideoCache.getCacheStats())

        return URL.createObjectURL(blob)
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.warn("Video fetch timeout:", url)
          } else {
            console.warn("Failed to cache video:", error.message, url)
          }
        } else {
          console.warn("Failed to cache video:", error, url)
        }
        return null
      }
    },
    [],
  )

  const prefetchVideos = useCallback(
    async (urls: string[], priority: "high" | "medium" | "low" = "low") => {
      if (!enablePrefetch) return

      // Filter valid URLs
      const validUrls = urls.filter((url) => url && url.startsWith("http"))

      // Prefetch in background with delay to avoid blocking
      const prefetchWithDelay = async (url: string, delay: number) => {
        try {
          await new Promise((resolve) => setTimeout(resolve, delay))
          await cacheVideo(url, priority)
        } catch (error) {
          console.warn("Prefetch failed for:", url, error)
        }
      }

      validUrls.forEach((url, index) => {
        prefetchWithDelay(url, index * 1000) // 1 second delay between prefetches
      })
    },
    [enablePrefetch, cacheVideo],
  )

  const clearCache = useCallback(() => {
    // Clear all cached blob URLs to prevent memory leaks
    for (const [url] of globalVideoCache.cache) {
      globalVideoCache.delete(url)
    }
    setCacheStats(globalVideoCache.getCacheStats())
  }, [])

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCacheStats(globalVideoCache.getCacheStats())
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return {
    getCachedVideo,
    cacheVideo,
    prefetchVideos,
    clearCache,
    cacheStats,
  }
}
