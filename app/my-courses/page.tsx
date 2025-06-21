"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Clock,
  Play,
  Calendar,
  Search,
  Star,
  Download,
  Share2,
  MoreVertical,
  CheckCircle,
  AlertCircle,
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
  status: "active" | "completed" | "paused"
}

export default function MyCoursesPage() {
  const { data: session } = useSession()
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
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
  }, [])

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && course.progress < 100) ||
      (filterStatus === "completed" && course.progress === 100)

    return matchesSearch && matchesFilter
  })

  const completedCourses = enrolledCourses.filter((course) => course.progress === 100)
  const activeCourses = enrolledCourses.filter((course) => course.progress < 100)

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-purple-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
          alt="My courses background"
          fill
          className="object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/95 to-background/98" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12 pt-32">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  My Courses
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300">
                  Track your learning progress and continue your journey
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Link href="/courses">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse More Courses
                  </Link>
                </Button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search your courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/95 backdrop-blur-sm border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                >
                  All ({enrolledCourses.length})
                </Button>
                <Button
                  variant={filterStatus === "active" ? "default" : "outline"}
                  onClick={() => setFilterStatus("active")}
                  size="sm"
                >
                  Active ({activeCourses.length})
                </Button>
                <Button
                  variant={filterStatus === "completed" ? "default" : "outline"}
                  onClick={() => setFilterStatus("completed")}
                  size="sm"
                >
                  Completed ({completedCourses.length})
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Courses</p>
                    <p className="text-3xl font-bold text-blue-600">{enrolledCourses.length}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Completed</p>
                    <p className="text-3xl font-bold text-green-600">{completedCourses.length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">In Progress</p>
                    <p className="text-3xl font-bold text-orange-600">{activeCourses.length}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Hours</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {enrolledCourses.reduce((acc, course) => acc + Number.parseInt(course.duration), 0)}h
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course._id}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500">
                    <div className="relative overflow-hidden">
                      <Image
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
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
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant={course.progress === 100 ? "default" : "secondary"}
                          className={
                            course.progress === 100
                              ? "bg-green-500 text-white"
                              : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                          }
                        >
                          {course.progress === 100 ? "Completed" : "In Progress"}
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
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="line-clamp-2 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {course.title}
                          </CardTitle>
                          <CardDescription className="text-slate-600 dark:text-slate-300">
                            By {course.instructor} • {course.duration}
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
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
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>

                    <CardContent className="pt-0">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                        asChild
                      >
                        <Link href={`/course/${course._id}/learn`}>
                          <Play className="h-4 w-4 mr-2" />
                          {course.progress === 100 ? "Review Course" : "Continue Learning"}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="text-center py-16">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-slate-600 mb-2">
                {enrolledCourses.length === 0 ? "No courses enrolled yet" : "No courses match your search"}
              </h3>
              <p className="text-slate-500 mb-6">
                {enrolledCourses.length === 0
                  ? "Start your learning journey by enrolling in your first course"
                  : "Try adjusting your search or filter criteria"}
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Link href="/courses">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
