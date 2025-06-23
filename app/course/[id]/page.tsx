"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Award,
  Globe,
  Smartphone,
  Download,
  Share2,
  Heart,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getCourseById } from "@/lib/course-data"
import { progressManager } from "@/lib/progress-manager"

export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const courseId = params.id as string

  const [course, setCourse] = useState<any>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourseData()
  }, [courseId])

  const loadCourseData = async () => {
    try {
      // Get course data
      const courseData = getCourseById(courseId)

      if (!courseData) {
        router.push("/courses")
        return
      }

      setCourse(courseData)

      // Check if user is enrolled
      const enrolled = progressManager.isEnrolledInCourse(courseId)
      setIsEnrolled(enrolled)
    } catch (error) {
      console.error("Error loading course:", error)
      router.push("/courses")
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    if (!session) {
      router.push("/login")
      return
    }

    setEnrolling(true)

    try {
      // For free courses, enroll directly
      if (course.price === 0) {
        const success = progressManager.enrollInCourse(course)
        if (success) {
          setIsEnrolled(true)
          // Show success message
          const event = new CustomEvent("showToast", {
            detail: {
              title: "Enrollment Successful!",
              description: `You've successfully enrolled in ${course.title}`,
              type: "success",
            },
          })
          window.dispatchEvent(event)
        }
      } else {
        // Redirect to checkout for paid courses
        router.push(`/checkout/${courseId}`)
      }
    } catch (error) {
      console.error("Enrollment error:", error)
      const event = new CustomEvent("showToast", {
        detail: {
          title: "Enrollment Failed",
          description: "There was an error enrolling in the course. Please try again.",
          type: "error",
        },
      })
      window.dispatchEvent(event)
    } finally {
      setEnrolling(false)
    }
  }

  const getContinueLink = () => {
    const progress = progressManager.getCourseProgress(courseId)
    if (progress) {
      return `/course/${courseId}/learn`
    }
    return `/course/${courseId}/learn`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Course Not Found</h1>
          <p className="text-gray-300 mb-6">The course you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge className="bg-blue-600 text-white">{course.category}</Badge>
                    <Badge variant="outline" className="border-white text-white">
                      {course.level}
                    </Badge>
                    {course.price === 0 && <Badge className="bg-green-600 text-white">FREE</Badge>}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.title}</h1>
                  <p className="text-gray-200 text-lg">{course.description}</p>
                </div>
              </div>
            </motion.div>

            {/* Course Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </div>
                      <div className="text-2xl font-bold text-white">{course.rating}</div>
                      <div className="text-sm text-gray-300">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">{course.students.toLocaleString()}</div>
                      <div className="text-sm text-gray-300">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Clock className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">{course.duration}</div>
                      <div className="text-sm text-gray-300">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <BookOpen className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">{course.totalLessons}</div>
                      <div className="text-sm text-gray-300">Lessons</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">About This Course</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>{course.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-blue-400" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-green-400" />
                      <span>Mobile friendly</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Download className="w-4 h-4 text-purple-400" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructor */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Your Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl">
                        {course.instructor.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">{course.instructor}</h3>
                      <p className="text-blue-400 mb-2">Senior {course.category} Expert</p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Expert instructor with years of experience in {course.category.toLowerCase()}. Passionate about
                        teaching and helping students achieve their goals.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    {course.price === 0 ? (
                      <div className="text-3xl font-bold text-green-400 mb-2">FREE</div>
                    ) : (
                      <div className="text-3xl font-bold text-white mb-2">₹{course.price.toLocaleString()}</div>
                    )}
                    <p className="text-gray-300 text-sm">Full lifetime access</p>
                  </div>

                  {isEnrolled ? (
                    <div className="space-y-4">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        size="lg"
                      >
                        <Link href={getContinueLink()}>
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Link>
                      </Button>
                      <div className="flex items-center justify-center space-x-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">You're enrolled in this course</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Button
                        onClick={handleEnroll}
                        disabled={enrolling}
                        className={`w-full ${
                          course.price === 0
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        }`}
                        size="lg"
                      >
                        {enrolling ? (
                          "Enrolling..."
                        ) : course.price === 0 ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Free Course
                          </>
                        ) : (
                          <>
                            Enroll Now
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>

                      {!session && (
                        <p className="text-center text-sm text-gray-400">
                          <Link href="/login" className="text-blue-400 hover:underline">
                            Sign in
                          </Link>{" "}
                          to enroll in this course
                        </p>
                      )}
                    </div>
                  )}

                  <Separator className="my-6 bg-white/20" />

                  <div className="space-y-4">
                    <h4 className="font-semibold text-white">This course includes:</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span>{course.duration} on-demand video</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-green-400" />
                        <span>{course.totalLessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-purple-400" />
                        <span>Downloadable resources</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-yellow-400" />
                        <span>Full lifetime access</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-4 h-4 text-pink-400" />
                        <span>Access on mobile and TV</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-orange-400" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6 bg-white/20" />

                  <div className="flex items-center justify-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                      <Heart className="w-4 h-4 mr-1" />
                      Wishlist
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
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
