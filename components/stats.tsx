"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, BookOpen, Award, Globe } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Learners",
    description: "Students worldwide",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: BookOpen,
    value: "500+",
    label: "Expert Courses",
    description: "Across all disciplines",
    color: "from-green-400 to-green-600",
  },
  {
    icon: Award,
    value: "95%",
    label: "Success Rate",
    description: "Course completion",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: Globe,
    value: "120+",
    label: "Countries",
    description: "Global reach",
    color: "from-orange-400 to-orange-600",
  },
]

export function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl animate-pulse"
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
              className="inline-block mb-6"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-sm font-medium text-white/60 uppercase tracking-wider">Our Impact</span>
            </motion.div>

            <motion.h2
              className="text-6xl md:text-8xl font-light leading-[0.85] tracking-tight mb-8 font-display"
              variants={itemVariants}
            >
              Trusted by learners{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                worldwide
                <motion.div
                  className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500/20 rounded-full blur-lg"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed"
              variants={itemVariants}
            >
              Join thousands of successful students who have transformed their careers with our platform
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="group"
                whileHover={{ y: -15, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 h-full hover:bg-white/10 transition-all duration-500">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <motion.div
                    className="text-4xl md:text-5xl font-light mb-3 text-white font-display"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                  >
                    {stat.value}
                  </motion.div>

                  <motion.div
                    className="text-lg font-medium mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300"
                    variants={itemVariants}
                  >
                    {stat.label}
                  </motion.div>

                  <motion.div className="text-white/60 font-light" variants={itemVariants}>
                    {stat.description}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
