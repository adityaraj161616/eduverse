"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  Calendar,
  Search,
  Star,
  Users,
  ChevronRight,
  Filter,
  BookmarkPlus,
  Share2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface EnrolledCourse {
  _id: string
  title: string
  thumbnail: string
  progress: number
  totalLessons: number
  completedLessons: number
  lastAccessed: string
  instructor: string
  category: string
  rating: number
  duration: string
  price?: number
  enrolledAt: string
}

interface RecommendedCourse {
  _id: string
  title: string
  thumbnail: string
  instructor: string
  category: string
  rating: number
  students: number
  price: number
  duration: string
  level: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [recommendedCourses, setRecommendedCourses] = useState<RecommendedCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Recommended courses for users with no enrollments
  const mockRecommendedCourses: RecommendedCourse[] = [
    {
      _id: "2",
      title: "Data Science with Python",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      instructor: "Dr. Jane Smith",
      category: "Data Science",
      rating: 4.7,
      students: 8930,
      price: 0, // Free course
      duration: "42 hours",
      level: "Beginner",
    },
    {
      _id: "4",
      title: "Machine Learning A-Z",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      instructor: "Kirill Eremenko",
      category: "Machine Learning",
      rating: 4.8,
      students: 15420,
      price: 7399,
      duration: "44 hours",
      level: "Intermediate",
    },
    {
      _id: "1",
      title: "Complete Web Development Bootcamp",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      instructor: "Dr. Angela Yu",
      category: "Web Development",
      rating: 4.8,
      students: 12340,
      price: 8299,
      duration: "65 hours",
      level: "Beginner",
    },
    {
      _id: "5",
      title: "React Native Development",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      instructor: "Maximilian Schwarzmüller",
      category: "Mobile Development",
      rating: 4.7,
      students: 8930,
      price: 6599,
      duration: "38 hours",
      level: "Advanced",
    },
    {
      _id: "3",
      title: "UI/UX Design Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop",
      instructor: "Daniel Schifano",
      category: "Design",
      rating: 4.9,
      students: 7650,
      price: 5499,
      duration: "28 hours",
      level: "Beginner",
    },
    {
      _id: "6",
      title: "Digital Marketing Masterclass",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      instructor: "Phil Ebiner",
      category: "Marketing",
      rating: 4.6,
      students: 12340,
      price: 5499,
      duration: "32 hours",
      level: "Beginner",
    },
  ]

  useEffect(() => {
    if (status === "loading") return

    // Load enrolled courses from localStorage
    const loadEnrolledCourses = () => {
      try {
        const stored = localStorage.getItem("enrolled-courses")
        if (stored) {
          const courses = JSON.parse(stored)
          setEnrolledCourses(courses)
        }
      } catch (error) {
        console.error("Error loading enrolled courses:", error)
      }
    }

    loadEnrolledCourses()
    setLoading(false)

    // Listen for enrollment updates
    const handleStorageChange = () => {
      loadEnrolledCourses()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("courseEnrolled", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("courseEnrolled", handleStorageChange)
    }
  }, [status])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  // Show loading only for authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8 pt-16">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-8 bg-muted rounded w-1/2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const userName = session?.user?.name || "Learner"
  const userImage = session?.user?.image || "/placeholder-avatar.png"
  const hasEnrolledCourses = enrolledCourses.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-purple-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
          alt="Dashboard background"
          fill
          className="object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div ref={ref} initial="hidden" animate="visible" variants={containerVariants}>
          {/* Header with User Profile */}
          <motion.div variants={itemVariants} className="mb-12 pt-32">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Image
                    src={userImage || "/placeholder.svg"}
                    alt={userName}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-slate-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                      Welcome back,
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {userName}! 👋
                    </span>
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-300">
                    {hasEnrolledCourses
                      ? "Ready to continue your learning journey?"
                      : "Ready to start your learning journey?"}
                  </p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4 md:mt-0">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                  asChild
                >
                  <Link href="/courses">
                    <BookOpen className="w-5 h-5 mr-2" />
                    {hasEnrolledCourses ? "Explore More Courses" : "Start Learning"}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Search */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search for courses, skills, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-white/80 backdrop-blur-sm border-slate-200/50 rounded-2xl shadow-lg"
              />
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: hasEnrolledCourses ? "Courses in Progress" : "Available Courses",
                value: hasEnrolledCourses ? enrolledCourses.length : mockRecommendedCourses.length,
                description: hasEnrolledCourses ? "Keep learning" : "Ready to start",
                icon: BookOpen,
                color: "text-blue-500",
                bgColor: "bg-blue-500/10",
                change: hasEnrolledCourses ? "+2 this month" : "Start today!",
              },
              {
                title: "Completed",
                value: hasEnrolledCourses ? enrolledCourses.filter((c) => c.progress === 100).length : 0,
                description: "Certificates earned",
                icon: Award,
                color: "text-green-500",
                bgColor: "bg-green-500/10",
                change: hasEnrolledCourses ? "+1 this week" : "Complete your first!",
              },
              {
                title: "Learning Time",
                value: hasEnrolledCourses ? "45h" : "0h",
                description: "Total hours",
                icon: Clock,
                color: "text-purple-500",
                bgColor: "bg-purple-500/10",
                change: hasEnrolledCourses ? "+12h this week" : "Start learning!",
              },
              {
                title: "Streak",
                value: hasEnrolledCourses ? "7 days" : "0 days",
                description: hasEnrolledCourses ? "Keep it up!" : "Start your streak!",
                icon: TrendingUp,
                color: "text-orange-500",
                bgColor: "bg-orange-500/10",
                change: hasEnrolledCourses ? "🔥 On fire!" : "Begin today!",
              },
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className="group">
                <Card className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {stat.title}
                    </CardTitle>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                    >
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{stat.description}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">{stat.change}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content */}
          {hasEnrolledCourses ? (
            // Show enrolled courses with progress
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Continue Learning
                </h2>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/profile/courses">View All</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500">
                      <div className="relative overflow-hidden">
                        <motion.div whileHover={{ scale: 1.1 }} className="relative">
                          <Image
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title}
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <motion.div
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1 }}
                              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                            >
                              <Play className="w-8 h-8 text-white ml-1" />
                            </motion.div>
                          </div>
                        </motion.div>
                        <div className="absolute top-4 right-4">
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30"
                          >
                            {course.category}
                          </Badge>
                        </div>
                        <div className="absolute top-4 left-4">
                          <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-white text-xs font-medium">{course.rating}</span>
                          </div>
                        </div>
                      </div>

                      <CardHeader>
                        <CardTitle className="line-clamp-2 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-300">
                          By {course.instructor} • {course.duration}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-300">Progress</span>
                            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {course.progress}%
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {course.completedLessons} of {course.totalLessons} lessons completed
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Enrolled: {new Date(course.enrolledAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <BookmarkPlus className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>

                      <CardContent className="pt-0">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                            asChild
                          >
                            <Link href={`/course/${course._id}/learn`}>
                              <Play className="h-4 w-4 mr-2" />
                              Continue Learning
                            </Link>
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ) : (
            // Show recommended courses for new users
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="text-center">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Start Your Learning Journey
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                  Discover courses tailored just for you. Begin with our free Data Science course!
                </p>
              </motion.div>

              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockRecommendedCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500">
                      <div className="relative overflow-hidden">
                        <Image
                          src={course.thumbnail || "/placeholder.svg"}
                          alt={course.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className={course.price === 0 ? "bg-green-500 text-white" : "bg-blue-500 text-white"}>
                            {course.price === 0 ? "FREE" : `₹${course.price.toLocaleString()}`}
                          </Badge>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge variant="outline" className="bg-white/90">
                            {course.level}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-white text-xs font-medium">{course.rating}</span>
                          </div>
                        </div>
                      </div>

                      <CardHeader>
                        <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
                        <CardDescription>
                          By {course.instructor} • {course.duration}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {course.students.toLocaleString()} students
                          </div>
                          <Badge variant="outline">{course.category}</Badge>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            className={`w-full ${
                              course.price === 0
                                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            } text-white`}
                            asChild
                          >
                            <Link href={course.price === 0 ? `/course/${course._id}` : `/checkout/${course._id}`}>
                              {course.price === 0 ? "Start Free Course" : "Enroll Now"}
                              <ChevronRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
