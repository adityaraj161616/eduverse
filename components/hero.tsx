"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight, Play, Users, BookOpen, Award, Globe } from "lucide-react"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const x = useSpring(0, springConfig)
  const ySpring = useSpring(0, springConfig)

  useEffect(() => {
    setIsLoaded(true)

    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        setVideoLoaded(true)
        videoRef.current?.play().catch(console.error)
      })

      videoRef.current.addEventListener("canplay", () => {
        setVideoLoaded(true)
        videoRef.current?.play().catch(console.error)
      })
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const xPct = (clientX - innerWidth / 2) / innerWidth
      const yPct = (clientY - innerHeight / 2) / innerHeight
      x.set(xPct * 20)
      ySpring.set(yPct * 20)
      setMousePosition({ x: clientX, y: clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, ySpring])

  const stats = [
    { icon: Users, value: "50K+", label: "Active Students", delay: 0 },
    { icon: BookOpen, value: "500+", label: "Expert Courses", delay: 0.1 },
    { icon: Award, value: "95%", label: "Success Rate", delay: 0.2 },
    { icon: Globe, value: "120+", label: "Countries", delay: 0.3 },
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Direct Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline="true"
        preload="auto"
        onLoadedData={() => {
          setVideoLoaded(true)
          if (videoRef.current) {
            videoRef.current.play().catch(console.error)
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.play().catch(console.error)
          }
        }}
        onCanPlay={() => {
          setVideoLoaded(true)
          if (videoRef.current) {
            videoRef.current.play().catch(console.error)
          }
        }}
        onEnded={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(console.error)
          }
        }}
      >
        <source src="/videos/students-collaboration.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-10" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-20 min-h-screen flex items-center justify-center pt-24 md:pt-32"
      >
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white leading-[0.85] tracking-tight">
                <motion.span className="block" style={{ x, y: ySpring }}>
                  Learn
                </motion.span>
                <motion.span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"
                  style={{
                    x: useTransform(x, (value) => -value * 0.5),
                    y: useTransform(ySpring, (value) => -value * 0.5),
                  }}
                >
                  Without
                </motion.span>
                <motion.span
                  className="block"
                  style={{
                    x: useTransform(x, (value) => value * 0.3),
                    y: useTransform(ySpring, (value) => value * 0.3),
                  }}
                >
                  Limits
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              Master cutting-edge skills with world-class instructors.
              <br />
              Transform your career through immersive learning experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-lg font-medium rounded-full transition-all duration-300 shadow-2xl"
                  asChild
                >
                  <Link href="/courses">
                    Start Learning
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="ml-3"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-12 py-6 text-lg font-medium rounded-full transition-all duration-300"
                >
                  <Play className="h-5 w-5 mr-3" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.4 + stat.delay,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-light text-white mb-2">{stat.value}</div>
                  <div className="text-white/70 text-sm font-light tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Video Loading Indicator
      {!videoLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-4 right-4 z-50 bg-black/20 backdrop-blur-sm rounded-lg p-3"
        >
          <div className="flex items-center space-x-2 text-white">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-sm">Loading video...</span>
          </div>
        </motion.div>
      )} */}

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full"
        animate={{
          y: [-20, 20, -20],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-green-400/60 rounded-full"
        animate={{
          y: [20, -20, 20],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-400/50 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-10 border border-white/30 rounded-full flex justify-center cursor-pointer hover:border-white/60 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-0.5 h-3 bg-white/40 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-4 h-4 bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
    </div>
  )
}
