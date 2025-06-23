"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Target, Calendar, BookOpen, Clock, Zap, Brain, GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { progressManager } from "@/lib/progress-manager"

interface ProgressData {
  overallProgress: number
  coursesCompleted: number
  totalCourses: number
  studyStreak: number
  totalStudyTime: number
  skillsAcquired: number
  achievements: Achievement[]
  weeklyProgress: WeeklyProgress[]
  courseProgress: CourseProgress[]
  skillProgress: SkillProgress[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface WeeklyProgress {
  week: string
  hoursStudied: number
  coursesCompleted: number
  quizzesCompleted: number
}

interface CourseProgress {
  id: string
  title: string
  progress: number
  totalLessons: number
  completedLessons: number
  timeSpent: number
  lastAccessed: string
}

interface SkillProgress {
  skill: string
  level: number
  progress: number
  xp: number
  nextLevelXp: number
}

export default function ProgressPage() {
  const [progressData, setProgressData] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgressData()
  }, [])

  const fetchProgressData = async () => {
    try {
      // Get enrolled courses from progress manager
      const enrolledCourses = progressManager.getEnrolledCourses()
      const stats = progressManager.getLearningStats()

      if (enrolledCourses.length === 0) {
        // No enrolled courses, show empty state
        setProgressData(null)
      } else {
        // Generate achievements based on progress
        const achievements: Achievement[] = []

        if (stats.completedCourses > 0) {
          achievements.push({
            id: "1",
            title: "First Course Complete",
            description: "Completed your first course",
            icon: "🎓",
            unlockedAt: new Date().toISOString().split("T")[0],
            rarity: "common",
          })
        }

        if (stats.completedCourses >= 3) {
          achievements.push({
            id: "2",
            title: "Learning Enthusiast",
            description: "Completed 3 courses",
            icon: "📚",
            unlockedAt: new Date().toISOString().split("T")[0],
            rarity: "rare",
          })
        }

        if (stats.totalHours >= 50) {
          achievements.push({
            id: "3",
            title: "Dedicated Learner",
            description: "Studied for 50+ hours",
            icon: "⏰",
            unlockedAt: new Date().toISOString().split("T")[0],
            rarity: "epic",
          })
        }

        if (stats.completedCourses >= 5) {
          achievements.push({
            id: "4",
            title: "Knowledge Master",
            description: "Completed 5 courses",
            icon: "🏆",
            unlockedAt: new Date().toISOString().split("T")[0],
            rarity: "legendary",
          })
        }

        setProgressData({
          overallProgress: stats.overallProgress,
          coursesCompleted: stats.completedCourses,
          totalCourses: stats.totalCourses,
          studyStreak: stats.currentStreak,
          totalStudyTime: stats.totalHours,
          skillsAcquired: stats.completedCourses * 2,
          achievements: achievements,
          weeklyProgress: [
            {
              week: "This Week",
              hoursStudied: Math.round(stats.totalHours * 0.3),
              coursesCompleted: Math.min(stats.completedCourses, 2),
              quizzesCompleted: stats.completedCourses * 3,
            },
            {
              week: "Last Week",
              hoursStudied: Math.round(stats.totalHours * 0.25),
              coursesCompleted: Math.min(stats.completedCourses, 1),
              quizzesCompleted: stats.completedCourses * 2,
            },
            {
              week: "2 Weeks Ago",
              hoursStudied: Math.round(stats.totalHours * 0.2),
              coursesCompleted: 0,
              quizzesCompleted: stats.completedCourses,
            },
            {
              week: "3 Weeks Ago",
              hoursStudied: Math.round(stats.totalHours * 0.25),
              coursesCompleted: Math.max(stats.completedCourses - 1, 0),
              quizzesCompleted: stats.completedCourses * 2,
            },
          ],
          courseProgress: enrolledCourses.map((course) => ({
            id: course._id,
            title: course.title,
            progress: course.progress,
            totalLessons: course.totalLessons,
            completedLessons: course.completedLessons,
            timeSpent: course.timeSpent,
            lastAccessed: course.lastAccessed,
          })),
          skillProgress: [
            {
              skill: "Web Development",
              level: Math.min(Math.floor(stats.completedCourses / 2) + 1, 5),
              progress: (stats.completedCourses * 25) % 100,
              xp: stats.completedCourses * 100,
              nextLevelXp: (Math.floor(stats.completedCourses / 2) + 2) * 200,
            },
            {
              skill: "Data Science",
              level: Math.min(Math.floor(stats.completedCourses / 3) + 1, 5),
              progress: (stats.completedCourses * 33) % 100,
              xp: stats.completedCourses * 75,
              nextLevelXp: (Math.floor(stats.completedCourses / 3) + 2) * 250,
            },
          ],
        })
      }
    } catch (error) {
      console.error("Error fetching progress data:", error)
      setProgressData(null)
    } finally {
      setLoading(false)
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    )
  }

  // Empty state for new users
  if (!progressData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="mb-8">
              <GraduationCap className="w-24 h-24 text-purple-400 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Start Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Learning Journey
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your progress will appear here once you enroll in courses and start learning. Track your achievements,
                study streaks, and skill development all in one place.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Course Progress</h3>
                  <p className="text-gray-300 text-sm">Track completion of lessons and modules</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Study Streaks</h3>
                  <p className="text-gray-300 text-sm">Build consistent learning habits</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Achievements</h3>
                  <p className="text-gray-300 text-sm">Earn badges and certificates</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
                asChild
              >
                <Link href="/courses">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Courses
                </Link>
              </Button>
              <p className="text-gray-400 text-sm">
                Or go to your{" "}
                <Link href="/dashboard" className="text-purple-400 hover:text-purple-300 underline">
                  dashboard
                </Link>{" "}
                to see recommended courses
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Progress</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Track your learning journey and celebrate your achievements
          </p>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Overall Progress</p>
                    <p className="text-3xl font-bold text-white">{progressData.overallProgress}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
                <Progress value={progressData.overallProgress} className="mt-3" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Courses Completed</p>
                    <p className="text-3xl font-bold text-white">
                      {progressData.coursesCompleted}/{progressData.totalCourses}
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Study Streak</p>
                    <p className="text-3xl font-bold text-white">{progressData.studyStreak} days</p>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total Study Time</p>
                    <p className="text-3xl font-bold text-white">{progressData.totalStudyTime}h</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-lg">
            <TabsTrigger value="courses" className="text-white">
              Courses
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-white">
              Skills
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-white">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6">
              {progressData.courseProgress.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                          <p className="text-gray-300 text-sm">
                            {course.completedLessons}/{course.totalLessons} lessons • {course.timeSpent}h studied
                          </p>
                        </div>
                        <Badge variant={course.progress === 100 ? "default" : "secondary"}>{course.progress}%</Badge>
                      </div>
                      <Progress value={course.progress} className="mb-2" />
                      <p className="text-gray-400 text-sm">Last accessed: {course.lastAccessed}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {progressData.skillProgress.map((skill, index) => (
                <motion.div
                  key={skill.skill}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Brain className="h-8 w-8 text-purple-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white">{skill.skill}</h3>
                            <p className="text-gray-300 text-sm">Level {skill.level}</p>
                          </div>
                        </div>
                        <Badge className="bg-purple-600">{skill.xp} XP</Badge>
                      </div>
                      <Progress value={skill.progress} className="mb-2" />
                      <p className="text-gray-400 text-sm">{skill.nextLevelXp - skill.xp} XP to next level</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {progressData.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{achievement.icon}</div>
                      <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={`${getRarityColor(achievement.rarity)} text-white`}>
                          {achievement.rarity.toUpperCase()}
                        </Badge>
                        <span className="text-gray-400 text-xs">{achievement.unlockedAt}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Weekly Learning Activity</CardTitle>
                <CardDescription className="text-gray-300">
                  Your learning progress over the past 4 weeks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.weeklyProgress.map((week, index) => (
                    <div key={week.week} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Calendar className="h-5 w-5 text-blue-400" />
                        <span className="text-white font-medium">{week.week}</span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-green-400" />
                          <span className="text-gray-300">{week.hoursStudied}h</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-blue-400" />
                          <span className="text-gray-300">{week.coursesCompleted} courses</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-purple-400" />
                          <span className="text-gray-300">{week.quizzesCompleted} quizzes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
