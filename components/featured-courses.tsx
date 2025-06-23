"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const featuredCourses = [
  {
    id: "1",
    title: "complete web development",
    description: "master modern web development with react, node.js, and cutting-edge technologies.",
    category: "development",
    level: "beginner",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=center",
    duration: "12 weeks",
    students: 1250,
    rating: 4.8,
    price: 99,
    isFree: false,
    hoverAnimation: "hover-slide-reveal",
  },
  {
    id: "2",
    title: "data science mastery",
    description: "learn data analysis, visualization, and machine learning with python and advanced tools.",
    category: "data science",
    level: "intermediate",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    duration: "8 weeks",
    students: 890,
    rating: 4.7,
    price: 0,
    isFree: true,
    hoverAnimation: "hover-rotate-lift",
  },
  {
    id: "3",
    title: "ui/ux design excellence",
    description: "create beautiful and functional user experiences with modern design principles.",
    category: "design",
    level: "beginner",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop&crop=center",
    duration: "6 weeks",
    students: 567,
    rating: 4.9,
    price: 79,
    isFree: false,
    hoverAnimation: "hover-morph",
  },
  {
    id: "4",
    title: "digital marketing strategy",
    description: "master seo, social media, and digital advertising with proven strategies.",
    category: "marketing",
    level: "intermediate",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    duration: "10 weeks",
    students: 743,
    rating: 4.6,
    price: 89,
    isFree: false,
    hoverAnimation: "hover-slide-reveal",
  },
  {
    id: "5",
    title: "artificial intelligence fundamentals",
    description: "explore machine learning, neural networks, and ai applications in real-world scenarios.",
    category: "ai & ml",
    level: "advanced",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
    duration: "14 weeks",
    students: 432,
    rating: 4.9,
    price: 149,
    isFree: false,
    hoverAnimation: "hover-rotate-lift",
  },
  {
    id: "6",
    title: "mobile app development",
    description: "build native and cross-platform mobile applications with react native and flutter.",
    category: "mobile dev",
    level: "intermediate",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
    duration: "11 weeks",
    students: 658,
    rating: 4.7,
    price: 119,
    isFree: false,
    hoverAnimation: "hover-morph",
  },
]

export function FeaturedCourses() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
      className="py-32 bg-gradient-to-br from-white via-green-50/30 to-blue-50/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">featured courses</span>
            </motion.div>

            <motion.h2
              className="text-large font-display mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              learn from the{" "}
              <motion.span
                className="gradient-text relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                best
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-green-500/40 rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.8, 0.4],
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
              className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
              variants={itemVariants}
            >
              carefully curated courses designed to accelerate your learning journey and transform your career
            </motion.p>
          </motion.div>

          {/* Courses Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                className="group"
                onHoverStart={() => setHoveredCard(course.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -15 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Card className="card-hover overflow-hidden bg-white border-0 shadow-lg rounded-3xl">
                  <div className="relative overflow-hidden">
                    {/* Image Container with Custom Hover Animation */}
                    <div className={`course-image-container h-64 ${course.hoverAnimation}`}>
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        width={800}
                        height={600}
                        className="course-image w-full h-full object-cover"
                      />

                      {/* Play Button Overlay */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 interactive-glow">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-6 left-6 z-20">
                      <Badge
                        variant={course.isFree ? "secondary" : "default"}
                        className={`${
                          course.isFree
                            ? "bg-green-500 text-white"
                            : "bg-gradient-to-r from-green-500 to-green-600 text-white"
                        } font-medium shadow-lg`}
                      >
                        {course.isFree ? "free" : `$${course.price}`}
                      </Badge>
                    </div>
                    <div className="absolute top-6 right-6 z-20">
                      <Badge variant="outline" className="bg-white/90 font-medium shadow-lg">
                        {course.level}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Badge
                        variant="outline"
                        className="text-xs font-medium mb-4 text-gray-800 border-gray-300 bg-gray-100"
                      >
                        {course.category}
                      </Badge>

                      <motion.h3
                        className="text-2xl font-bold mb-4 font-display text-gray-900 group-hover:gradient-text transition-all duration-500"
                        whileHover={{ x: 5 }}
                      >
                        {course.title}
                      </motion.h3>

                      <p className="text-gray-800 leading-relaxed font-normal">{course.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-700 mb-8">
                      <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
                        <Clock className="h-4 w-4 mr-2 text-green-500" />
                        <span className="font-semibold text-gray-800">{course.duration}</span>
                      </motion.div>
                      <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
                        <Users className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-semibold text-gray-800">{course.students}</span>
                      </motion.div>
                      <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
                        <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-800">{course.rating}</span>
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Button className="w-full btn-primary font-medium py-6 rounded-2xl group" asChild>
                        <Link href={`/course/${course.id}`}>
                          view course
                          <motion.div
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div variants={itemVariants} className="text-center mt-20">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="btn-outline-green text-lg px-12 py-6 rounded-full font-medium transition-all duration-500"
                asChild
              >
                <Link href="/courses">
                  view all courses
                  <motion.div
                    className="ml-3"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
