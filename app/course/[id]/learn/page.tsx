"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, Play, CheckCircle, Clock, Download, Award } from "lucide-react"
import Link from "next/link"
import { progressManager } from "@/lib/progress-manager"

interface Lesson {
  id: string
  title: string
  description: string
  videoUrl: string
  duration: string
  type: "video" | "quiz" | "assignment"
  completed: boolean
  resources?: string[]
}

interface CourseSection {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  duration: string
}

interface CourseData {
  id: string
  title: string
  description: string
  instructor: {
    name: string
    title: string
    avatar: string
    bio: string
  }
  sections: CourseSection[]
  skillsGained: string[]
  totalDuration: string
  totalLessons: number
  certificate: boolean
}

// Complete Data Science with Python Course Content
const courseContent: { [key: string]: CourseData } = {
  "2": {
    id: "2",
    title: "Data Science with Python",
    description:
      "Master data analysis, visualization, and machine learning with Python from scratch to advanced level.",
    instructor: {
      name: "Dr. Jane Smith",
      title: "Senior Data Scientist at Microsoft",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Dr. Jane Smith has 10+ years of experience in data science and machine learning. She has worked at top tech companies and published numerous research papers. She's passionate about making data science accessible to everyone.",
    },
    sections: [
      {
        id: "intro",
        title: "Course Introduction",
        description: "Welcome to Data Science with Python! Get ready for an amazing journey.",
        duration: "15 min",
        lessons: [
          {
            id: "intro-1",
            title: "Welcome to Data Science with Python",
            description: "Course overview, what you'll learn, and how to get the most out of this course.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            duration: "8:30",
            type: "video",
            completed: false,
            resources: ["Course Syllabus.pdf", "Python Installation Guide.pdf"],
          },
          {
            id: "intro-2",
            title: "Setting Up Your Environment",
            description: "Install Python, Jupyter Notebook, and essential libraries for data science.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            duration: "6:45",
            type: "video",
            completed: false,
            resources: ["Environment Setup Checklist.pdf"],
          },
        ],
      },
      {
        id: "python-basics",
        title: "1. Python Fundamentals for Data Science",
        description: "Master Python basics essential for data science work.",
        duration: "2h 30m",
        lessons: [
          {
            id: "python-1-1",
            title: "1.1 Python Syntax and Variables",
            description: "Learn Python syntax, variables, and data types used in data science.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            duration: "18:20",
            type: "video",
            completed: false,
            resources: ["Python Basics Cheat Sheet.pdf", "Practice Exercises.ipynb"],
          },
          {
            id: "python-1-2",
            title: "1.2 Lists, Dictionaries, and Data Structures",
            description: "Understanding Python data structures crucial for data manipulation.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            duration: "22:15",
            type: "video",
            completed: false,
            resources: ["Data Structures Guide.pdf", "Hands-on Examples.ipynb"],
          },
          {
            id: "python-1-3",
            title: "1.3 Functions and Control Flow",
            description: "Master functions, loops, and conditional statements for data processing.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            duration: "25:30",
            type: "video",
            completed: false,
            resources: ["Functions Reference.pdf", "Control Flow Examples.ipynb"],
          },
          {
            id: "python-1-4",
            title: "1.4 Working with Files and Libraries",
            description: "Learn to import libraries and work with different file formats.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            duration: "19:45",
            type: "video",
            completed: false,
            resources: ["File Handling Guide.pdf", "Library Import Examples.ipynb"],
          },
        ],
      },
      {
        id: "numpy-pandas",
        title: "2. NumPy and Pandas Mastery",
        description: "Master the essential libraries for data manipulation and analysis.",
        duration: "3h 15m",
        lessons: [
          {
            id: "numpy-2-1",
            title: "2.1 NumPy Arrays and Operations",
            description: "Learn NumPy arrays, mathematical operations, and array manipulation.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            duration: "28:40",
            type: "video",
            completed: false,
            resources: ["NumPy Cheat Sheet.pdf", "Array Operations.ipynb"],
          },
          {
            id: "pandas-2-2",
            title: "2.2 Pandas DataFrames and Series",
            description: "Master Pandas for data manipulation, cleaning, and analysis.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            duration: "32:20",
            type: "video",
            completed: false,
            resources: ["Pandas Guide.pdf", "DataFrame Examples.ipynb"],
          },
          {
            id: "pandas-2-3",
            title: "2.3 Data Cleaning and Preprocessing",
            description: "Learn to clean messy data and prepare it for analysis.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            duration: "35:15",
            type: "video",
            completed: false,
            resources: ["Data Cleaning Checklist.pdf", "Preprocessing Techniques.ipynb"],
          },
          {
            id: "pandas-2-4",
            title: "2.4 Data Aggregation and Grouping",
            description: "Master groupby operations and data aggregation techniques.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
            duration: "26:30",
            type: "video",
            completed: false,
            resources: ["Aggregation Guide.pdf", "GroupBy Examples.ipynb"],
          },
        ],
      },
      {
        id: "visualization",
        title: "3. Data Visualization",
        description: "Create stunning visualizations with Matplotlib and Seaborn.",
        duration: "2h 45m",
        lessons: [
          {
            id: "viz-3-1",
            title: "3.1 Matplotlib Fundamentals",
            description: "Learn the basics of creating plots and charts with Matplotlib.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            duration: "24:15",
            type: "video",
            completed: false,
            resources: ["Matplotlib Guide.pdf", "Basic Plots.ipynb"],
          },
          {
            id: "viz-3-2",
            title: "3.2 Advanced Plotting with Seaborn",
            description: "Create beautiful statistical visualizations with Seaborn.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            duration: "29:30",
            type: "video",
            completed: false,
            resources: ["Seaborn Tutorial.pdf", "Statistical Plots.ipynb"],
          },
          {
            id: "viz-3-3",
            title: "3.3 Interactive Visualizations",
            description: "Build interactive dashboards and plots with Plotly.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            duration: "31:45",
            type: "video",
            completed: false,
            resources: ["Plotly Guide.pdf", "Interactive Examples.ipynb"],
          },
        ],
      },
      {
        id: "machine-learning",
        title: "4. Introduction to Machine Learning",
        description: "Get started with machine learning algorithms and scikit-learn.",
        duration: "3h 30m",
        lessons: [
          {
            id: "ml-4-1",
            title: "4.1 Machine Learning Fundamentals",
            description: "Understanding different types of machine learning and when to use them.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            duration: "27:20",
            type: "video",
            completed: false,
            resources: ["ML Fundamentals.pdf", "Algorithm Comparison.pdf"],
          },
          {
            id: "ml-4-2",
            title: "4.2 Linear Regression and Classification",
            description: "Build your first machine learning models for prediction and classification.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            duration: "33:45",
            type: "video",
            completed: false,
            resources: ["Regression Guide.pdf", "Classification Examples.ipynb"],
          },
          {
            id: "ml-4-3",
            title: "4.3 Model Evaluation and Validation",
            description: "Learn to evaluate model performance and avoid overfitting.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            duration: "28:15",
            type: "video",
            completed: false,
            resources: ["Model Evaluation.pdf", "Validation Techniques.ipynb"],
          },
        ],
      },
      {
        id: "projects",
        title: "5. Real-World Projects",
        description: "Apply your skills to real data science projects.",
        duration: "4h 00m",
        lessons: [
          {
            id: "project-5-1",
            title: "5.1 Sales Data Analysis Project",
            description: "Analyze real sales data to discover business insights.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            duration: "45:30",
            type: "video",
            completed: false,
            resources: ["Sales Dataset.csv", "Project Template.ipynb", "Business Questions.pdf"],
          },
          {
            id: "project-5-2",
            title: "5.2 Customer Segmentation Project",
            description: "Use clustering to segment customers for targeted marketing.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            duration: "52:15",
            type: "video",
            completed: false,
            resources: ["Customer Data.csv", "Segmentation Guide.pdf", "Clustering Examples.ipynb"],
          },
        ],
      },
      {
        id: "conclusion",
        title: "Course Conclusion",
        description: "Congratulations! You've completed the Data Science with Python course.",
        duration: "20 min",
        lessons: [
          {
            id: "conclusion-1",
            title: "What You've Accomplished",
            description: "Review all the skills you've gained and your learning journey.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            duration: "12:30",
            type: "video",
            completed: false,
            resources: ["Skills Summary.pdf", "Certificate Template.pdf"],
          },
          {
            id: "conclusion-2",
            title: "Next Steps in Your Data Science Journey",
            description: "Where to go from here and how to continue learning.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            duration: "7:45",
            type: "video",
            completed: false,
            resources: ["Learning Path.pdf", "Recommended Resources.pdf"],
          },
        ],
      },
    ],
    skillsGained: [
      "Python Programming for Data Science",
      "Data Manipulation with Pandas",
      "Numerical Computing with NumPy",
      "Data Visualization with Matplotlib & Seaborn",
      "Statistical Analysis and Interpretation",
      "Machine Learning Fundamentals",
      "Data Cleaning and Preprocessing",
      "Real-world Project Experience",
      "Business Intelligence and Insights",
      "Problem-solving with Data",
    ],
    totalDuration: "16h 35m",
    totalLessons: 18,
    certificate: true,
  },
}

export default function CourseLearnPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const courseId = params.id as string
  const course = courseContent[courseId]

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Check if user is enrolled
    if (!progressManager.isEnrolledInCourse(courseId)) {
      router.push(`/course/${courseId}`)
      return
    }

    // Load progress from progress manager
    const progress = progressManager.getCourseProgress(courseId)
    if (progress) {
      setCompletedLessons(progress.completedLessons)
      setCurrentSectionIndex(progress.currentSection)
      setCurrentLessonIndex(progress.currentLesson)
    }
  }, [courseId, router])

  useEffect(() => {
    // Update progress when section/lesson changes
    if (course) {
      progressManager.updateCourseProgress(courseId, {
        currentSection: currentSectionIndex,
        currentLesson: currentLessonIndex,
      })
    }
  }, [currentSectionIndex, currentLessonIndex, courseId, course])

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Course Not Found</h1>
          <p className="text-white/60 mb-6">The course you're looking for doesn't exist.</p>
          <Link href="/courses">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentSection = course.sections[currentSectionIndex]
  const currentLesson = currentSection?.lessons[currentLessonIndex]
  const totalLessons = course.sections.reduce((acc, section) => acc + section.lessons.length, 0)
  const completedCount = completedLessons.length
  const overallProgress = (completedCount / totalLessons) * 100

  const markLessonComplete = () => {
    if (currentLesson && !completedLessons.includes(currentLesson.id)) {
      const newCompletedLessons = [...completedLessons, currentLesson.id]
      setCompletedLessons(newCompletedLessons)

      // Update progress manager
      progressManager.markLessonComplete(courseId, currentLesson.id, totalLessons)

      // Show success message
      const event = new CustomEvent("showToast", {
        detail: {
          title: "Lesson Completed! 🎉",
          description: `You've completed "${currentLesson.title}"`,
          type: "success",
        },
      })
      window.dispatchEvent(event)
    }
  }

  const goToNextLesson = () => {
    if (currentLessonIndex < currentSection.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    } else if (currentSectionIndex < course.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
      setCurrentLessonIndex(0)
    }
  }

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
      setCurrentLessonIndex(course.sections[currentSectionIndex - 1].lessons.length - 1)
    }
  }

  const isIntroSection = currentSection?.id === "intro"
  const isConclusionSection = currentSection?.id === "conclusion"

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-20">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-lg font-semibold">{course.title}</h1>
              <p className="text-sm text-slate-400">
                {currentSection?.title} • Lesson {currentLessonIndex + 1} of {currentSection?.lessons.length}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-slate-400">
              Progress: {completedCount}/{totalLessons} lessons
            </div>
            <Progress value={overallProgress} className="w-32" />
            <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-160px)]">
        {/* Sidebar - Course Content */}
        <div className="w-80 bg-slate-800 border-r border-slate-700 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Course Content</h2>
            <div className="space-y-4">
              {course.sections.map((section, sectionIdx) => (
                <div key={section.id} className="space-y-2">
                  <div
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      sectionIdx === currentSectionIndex ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
                    }`}
                    onClick={() => {
                      setCurrentSectionIndex(sectionIdx)
                      setCurrentLessonIndex(0)
                    }}
                  >
                    <h3 className="font-semibold text-sm">{section.title}</h3>
                    <p className="text-xs text-slate-300">{section.duration}</p>
                  </div>
                  {sectionIdx === currentSectionIndex && (
                    <div className="ml-4 space-y-1">
                      {section.lessons.map((lesson, lessonIdx) => (
                        <div
                          key={lesson.id}
                          className={`p-2 rounded cursor-pointer text-sm transition-colors flex items-center space-x-2 ${
                            lessonIdx === currentLessonIndex
                              ? "bg-blue-500 text-white"
                              : "text-slate-300 hover:bg-slate-600"
                          }`}
                          onClick={() => setCurrentLessonIndex(lessonIdx)}
                        >
                          {completedLessons.includes(lesson.id) ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                          <span className="flex-1">{lesson.title}</span>
                          <span className="text-xs">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="bg-black relative">
            <video
              ref={videoRef}
              className="w-full h-96 object-contain"
              controls
              poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
              onEnded={markLessonComplete}
            >
              <source src={currentLesson?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Lesson Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Special Intro Section */}
              {isIntroSection && currentLessonIndex === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30"
                >
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Welcome to Data Science with Python! 🎉
                    </h1>
                    <p className="text-xl text-slate-300 mb-6">
                      You're about to embark on an incredible journey into the world of data science. This comprehensive
                      course will transform you from a beginner to a confident data scientist.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400">{course.totalLessons}</div>
                        <div className="text-sm text-slate-400">Lessons</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">{course.totalDuration}</div>
                        <div className="text-sm text-slate-400">Total Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">5</div>
                        <div className="text-sm text-slate-400">Projects</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Special Conclusion Section */}
              {isConclusionSection && currentLessonIndex === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-8 bg-gradient-to-r from-green-600/20 to-yellow-600/20 rounded-2xl border border-green-500/30"
                >
                  <div className="text-center">
                    <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                      Congratulations! 🎊
                    </h1>
                    <p className="text-xl text-slate-300 mb-6">
                      You've successfully completed the Data Science with Python course! You should be proud of your
                      dedication and hard work.
                    </p>

                    {/* Skills Gained */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-4 text-white">Skills You've Mastered</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.skillsGained.map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg"
                          >
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-slate-200">{skill}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Certificate */}
                    <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/30">
                      <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Your Certificate is Ready!</h3>
                      <p className="text-slate-300 mb-4">
                        Download your completion certificate and showcase your new skills to employers.
                      </p>
                      <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                        <Download className="w-4 h-4 mr-2" />
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Regular Lesson Content */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{currentLesson?.title}</h1>
                    <p className="text-slate-400">{currentLesson?.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      {currentLesson?.type}
                    </Badge>
                    <div className="flex items-center text-slate-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {currentLesson?.duration}
                    </div>
                  </div>
                </div>

                {/* Lesson Resources */}
                {currentLesson?.resources && currentLesson.resources.length > 0 && (
                  <Card className="mb-6 bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Download className="w-5 h-5 mr-2" />
                        Lesson Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentLesson.resources.map((resource, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="justify-start border-slate-600 hover:bg-slate-700"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            {resource}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Instructor Info */}
                <Card className="mb-6 bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{course.instructor.name}</h3>
                        <p className="text-blue-400 mb-2">{course.instructor.title}</p>
                        <p className="text-slate-300 text-sm leading-relaxed">{course.instructor.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={goToPreviousLesson}
                    disabled={currentSectionIndex === 0 && currentLessonIndex === 0}
                    className="border-slate-600 hover:bg-slate-700"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous Lesson
                  </Button>

                  <div className="flex items-center space-x-4">
                    {!completedLessons.includes(currentLesson?.id || "") && (
                      <Button onClick={markLessonComplete} className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}

                    <Button
                      onClick={goToNextLesson}
                      disabled={
                        currentSectionIndex === course.sections.length - 1 &&
                        currentLessonIndex === currentSection.lessons.length - 1
                      }
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Next Lesson
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
