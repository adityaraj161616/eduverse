"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Clock, TrendingUp, Award, Play, Calendar, Target, Zap, GraduationCap, Users } from "lucide-react"
import { progressManager, type EnrolledCourse } from "@/lib/progress-manager"

interface DashboardStats {
  totalCourses: number
  completedCourses: number
  totalHours: number
  currentStreak: number
  achievements: number
  overallProgress: number
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    currentStreak: 0,
    achievements: 0,
    overallProgress: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()

    // Listen for enrollment updates
    const handleCourseEnrolled = () => {
      loadDashboardData()
    }

    window.addEventListener("courseEnrolled", handleCourseEnrolled)

    return () => {
      window.removeEventListener("courseEnrolled", handleCourseEnrolled)
    }
  }, [])

  const loadDashboardData = () => {
    try {
      // Load enrolled courses from progress manager
      const courses = progressManager.getEnrolledCourses()
      const learningStats = progressManager.getLearningStats()

      setEnrolledCourses(courses)
      setStats(learningStats)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getProfileImage = () => {
    if (session?.user?.image) {
      return session.user.image // Google account image
    }
    return "/placeholder-avatar.png" // Demo photo for manual registration
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const continueLastCourse = () => {
    if (enrolledCourses.length > 0) {
      // Find the most recently accessed course that's not completed
      const inProgressCourses = enrolledCourses.filter((course) => course.progress < 100)
      const lastCourse =
        inProgressCourses.length > 0
          ? inProgressCourses.sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())[0]
          : enrolledCourses[0]

      return `/course/${lastCourse._id}/learn`
    }
    return "/courses"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border-4 border-purple-500/30">
                <AvatarImage src={getProfileImage() || "/placeholder.svg"} alt={session?.user?.name || "User"} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl">
                  {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {getGreeting()}, {session?.user?.name?.split(" ")[0] || "Learner"}! 👋
                </h1>
                <p className="text-gray-300">Ready to continue your learning journey?</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                asChild
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Link href={continueLastCourse()}>
                  <Play className="w-4 h-4 mr-2" />
                  Continue Learning
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Enrolled Courses</p>
                    <p className="text-3xl font-bold text-white">{stats.totalCourses}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Completed</p>
                    <p className="text-3xl font-bold text-white">{stats.completedCourses}</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Study Hours</p>
                    <p className="text-3xl font-bold text-white">{stats.totalHours}h</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Current Streak</p>
                    <p className="text-3xl font-bold text-white">{stats.currentStreak}</p>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Continue Learning
                  </CardTitle>
                  <CardDescription className="text-gray-300">Pick up where you left off</CardDescription>
                </CardHeader>
                <CardContent>
                  {enrolledCourses.length > 0 ? (
                    <div className="space-y-4">
                      {enrolledCourses
                        .filter((course) => course.progress < 100)
                        .slice(0, 3)
                        .map((course, index) => (
                          <motion.div
                            key={course._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-semibold">{course.title}</h3>
                              <p className="text-gray-400 text-sm">{course.instructor}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Progress value={course.progress} className="flex-1" />
                                <span className="text-sm text-gray-300">{course.progress}%</span>
                              </div>
                            </div>
                            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Link href={`/course/${course._id}/learn`}>
                                <Play className="w-4 h-4 mr-1" />
                                Continue
                              </Link>
                            </Button>
                          </motion.div>
                        ))}
                      {enrolledCourses.filter((course) => course.progress < 100).length === 0 && (
                        <div className="text-center py-8">
                          <GraduationCap className="w-16 h-16 text-green-400 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-white mb-2">All Courses Completed!</h3>
                          <p className="text-gray-300 mb-4">
                            Congratulations! You've completed all your enrolled courses.
                          </p>
                          <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500">
                            <Link href="/courses">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Explore More Courses
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">No Courses Yet</h3>
                      <p className="text-gray-300 mb-4">Start your learning journey by enrolling in a course.</p>
                      <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-500">
                        <Link href="/courses">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Browse Courses
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {enrolledCourses.length > 0 ? (
                    <div className="space-y-3">
                      {enrolledCourses
                        .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
                        .slice(0, 5)
                        .map((course, index) => (
                          <div key={course._id} className="flex items-center justify-between py-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <div>
                                <p className="text-white text-sm font-medium">{course.title}</p>
                                <p className="text-gray-400 text-xs">Last accessed: {course.lastAccessed}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="border-blue-500 text-blue-400">
                              {course.progress}%
                            </Badge>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No recent activity</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start" variant="ghost">
                    <Link href="/courses">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Browse Courses
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start" variant="ghost">
                    <Link href="/progress">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Progress
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start" variant="ghost">
                    <Link href="/virtual-classes">
                      <Users className="w-4 h-4 mr-2" />
                      Virtual Classes
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start" variant="ghost">
                    <Link href="/achievements">
                      <Award className="w-4 h-4 mr-2" />
                      Achievements
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Goals */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Learning Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm">Overall Progress</span>
                        <span className="text-gray-300 text-sm">{stats.overallProgress}%</span>
                      </div>
                      <Progress value={stats.overallProgress} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-400">{stats.completedCourses}</div>
                        <div className="text-xs text-gray-400">Completed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400">{stats.achievements}</div>
                        <div className="text-xs text-gray-400">Achievements</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div>
                        <p className="text-white text-sm font-medium">Weekly Review</p>
                        <p className="text-gray-400 text-xs">Tomorrow, 2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <div>
                        <p className="text-white text-sm font-medium">Live Q&A Session</p>
                        <p className="text-gray-400 text-xs">Friday, 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
