"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift, Bell, Zap, CheckCircle, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Successfully subscribed!",
      description: "Welcome to EduVerse! Check your email for exclusive content.",
    })

    setEmail("")
    setIsLoading(false)
  }

  const benefits = [
    { icon: Gift, title: "Exclusive Discounts", description: "Up to 50% off on premium courses" },
    { icon: Bell, title: "Early Access", description: "Be first to know about new courses" },
    { icon: Zap, title: "Weekly Tips", description: "Learning strategies from experts" },
  ]

  const stats = [
    { value: "25,000+", label: "Subscribers" },
    { value: "Weekly", label: "Updates" },
    { value: "100%", label: "Free" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section
      ref={ref}
      className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Mail className="w-5 h-5 mr-3 text-white" />
              <span className="text-sm font-medium text-white tracking-wide">Join Our Learning Community</span>
            </motion.div>

            <motion.h2
              className="text-6xl md:text-8xl font-light text-white mb-8 leading-[0.85] tracking-tight font-display"
              variants={itemVariants}
            >
              Stay Updated with
              <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Latest Courses & Tips
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light"
              variants={itemVariants}
            >
              Subscribe to our newsletter and get exclusive access to new courses, learning resources, and special
              discounts delivered straight to your inbox.
            </motion.p>
          </motion.div>

          {/* Main Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mb-12">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      <div className="text-3xl md:text-4xl font-light text-white mb-2 font-display">{stat.value}</div>
                      <div className="text-sm text-white/60 tracking-wide">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Newsletter Form */}
                <motion.form onSubmit={handleSubmit} className="mb-12" variants={itemVariants}>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <motion.div
                      className="flex-1"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 rounded-2xl text-lg"
                        required
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-14 px-10 bg-white text-slate-900 hover:bg-gray-100 font-medium shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl text-lg"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                        ) : (
                          <>
                            Subscribe
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.form>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className="text-center group"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.8 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300"
                        whileHover={{ rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <benefit.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <h3 className="font-medium text-white mb-3 text-lg">{benefit.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Trust Indicators */}
                <motion.div
                  className="flex items-center justify-center mt-12 pt-8 border-t border-white/10"
                  variants={itemVariants}
                >
                  <div className="flex items-center text-white/70 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    <span>No spam, unsubscribe anytime</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
