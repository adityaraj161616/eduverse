"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Trophy, Target, Calendar, Download, Share2, Flame, BookOpen } from "lucide-react"
import Image from "next/image"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "learning" | "streak" | "social" | "milestone"
  earned: boolean
  earnedDate?: string
  progress?: number
  maxProgress?: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface Certificate {
  id: string
  courseTitle: string
  instructor: string
  completedDate: string
  certificateUrl: string
  skills: string[]
}

export default function AchievementsPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([])

  useEffect(() => {
    // Load enrolled courses from localStorage
    const stored = localStorage.getItem("enrolled-courses")
    if (stored) {
      setEnrolledCourses(JSON.parse(stored))
    }
  }, [])

  const achievements: Achievement[] = [
    {
      id: "first-course",
      title: "First Steps",
      description: "Enrolled in your first course",
      icon: "🎯",
      category: "milestone",
      earned: enrolledCourses.length > 0,
      earnedDate: enrolledCourses.length > 0 ? "2024-01-15" : undefined,
      rarity: "common",
    },
    {
      id: "course-complete",
      title: "Course Conqueror",
      description: "Completed your first course",
      icon: "🏆",
      category: "learning",
      earned: enrolledCourses.some((course: any) => course.progress === 100),
      earnedDate: "2024-01-20",
      rarity: "rare",
    },
    {
      id: "week-streak",
      title: "Week Warrior",
      description: "Maintained a 7-day learning streak",
      icon: "🔥",
      category: "streak",
      earned: true,
      earnedDate: "2024-01-22",
      rarity: "rare",
    },
    {
      id: "early-bird",
      title: "Early Bird",
      description: "Completed 5 lessons before 9 AM",
      icon: "🌅",
      category: "learning",
      earned: false,
      progress: 2,
      maxProgress: 5,
      rarity: "common",
    },
    {
      id: "night-owl",
      title: "Night Owl",
      description: "Completed 10 lessons after 10 PM",
      icon: "🦉",
      category: "learning",
      earned: false,
      progress: 7,
      maxProgress: 10,
      rarity: "common",
    },
    {
      id: "speed-learner",
      title: "Speed Learner",
      description: "Completed 3 courses in one month",
      icon: "⚡",
      category: "milestone",
      earned: false,
      progress: 1,
      maxProgress: 3,
      rarity: "epic",
    },
    {
      id: "perfectionist",
      title: "Perfectionist",
      description: "Scored 100% on 5 quizzes",
      icon: "💯",
      category: "learning",
      earned: false,
      progress: 3,
      maxProgress: 5,
      rarity: "rare",
    },
    {
      id: "social-learner",
      title: "Social Learner",
      description: "Shared 3 course completions",
      icon: "👥",
      category: "social",
      earned: false,
      progress: 1,
      maxProgress: 3,
      rarity: "common",
    },
    {
      id: "master-learner",
      title: "Master Learner",
      description: "Completed 10 courses",
      icon: "👑",
      category: "milestone",
      earned: false,
      progress: 1,
      maxProgress: 10,
      rarity: "legendary",
    },
  ]

  const certificates: Certificate[] = enrolledCourses
    .filter((course: any) => course.progress === 100)
    .map((course: any) => ({
      id: course._id,
      courseTitle: course.title,
      instructor: course.instructor,
      completedDate: course.lastAccessed,
      certificateUrl: "#",
      skills:
        course.category === "Data Science"
          ? ["Python Programming", "Data Analysis", "Machine Learning", "Data Visualization"]
          : ["Web Development", "JavaScript", "React", "Node.js"],
    }))

  const earnedAchievements = achievements.filter((a) => a.earned)
  const totalAchievements = achievements.length
  const completionRate = Math.round((earnedAchievements.length / totalAchievements) * 100)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 border-gray-300"
      case "rare":
        return "text-blue-600 border-blue-300"
      case "epic":
        return "text-purple-600 border-purple-300"
      case "legendary":
        return "text-yellow-600 border-yellow-300"
      default:
        return "text-gray-600 border-gray-300"
    }
  }

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-50 dark:bg-gray-900/20"
      case "rare":
        return "bg-blue-50 dark:bg-blue-900/20"
      case "epic":
        return "bg-purple-50 dark:bg-purple-900/20"
      case "legendary":
        return "bg-yellow-50 dark:bg-yellow-900/20"
      default:
        return "bg-gray-50 dark:bg-gray-900/20"
    }
  }

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
          alt="Achievements background"
          fill
          className="object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/95 to-background/98" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12 pt-32">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Achievements & Certificates
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Track your learning milestones and celebrate your progress
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-600">{earnedAchievements.length}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Achievements Earned</p>
                </CardContent>
              </Card>
              <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{certificates.length}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Certificates</p>
                </CardContent>
              </Card>
              <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">{completionRate}%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Completion Rate</p>
                </CardContent>
              </Card>
              <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                <CardContent className="p-6 text-center">
                  <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-600">7</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Day Streak</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="achievements" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:w-[400px] bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <TabsTrigger
                  value="achievements"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Achievements
                </TabsTrigger>
                <TabsTrigger
                  value="certificates"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Certificates
                </TabsTrigger>
              </TabsList>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      variants={itemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group"
                    >
                      <Card
                        className={`h-full overflow-hidden backdrop-blur-sm border-2 transition-all duration-500 ${
                          achievement.earned
                            ? `${getRarityBg(achievement.rarity)} ${getRarityColor(achievement.rarity)} shadow-lg`
                            : "bg-white/40 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-700/50 opacity-60"
                        }`}
                      >
                        <CardContent className="p-6 text-center">
                          <div className={`text-6xl mb-4 ${achievement.earned ? "" : "grayscale"}`}>
                            {achievement.icon}
                          </div>
                          <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{achievement.description}</p>

                          <div className="flex justify-center mb-4">
                            <Badge variant="outline" className={`${getRarityColor(achievement.rarity)} capitalize`}>
                              {achievement.rarity}
                            </Badge>
                          </div>

                          {achievement.earned ? (
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              Earned on {new Date(achievement.earnedDate!).toLocaleDateString()}
                            </div>
                          ) : achievement.progress !== undefined ? (
                            <div className="space-y-2">
                              <Progress
                                value={(achievement.progress / achievement.maxProgress!) * 100}
                                className="h-2"
                              />
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {achievement.progress} / {achievement.maxProgress}
                              </p>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-500 dark:text-slate-400">Not earned yet</p>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Certificates Tab */}
              <TabsContent value="certificates" className="space-y-6">
                {certificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certificates.map((certificate, index) => (
                      <motion.div
                        key={certificate.id}
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group"
                      >
                        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800 hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <Award className="w-8 h-8 text-yellow-600" />
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share2 className="w-4 h-4 mr-2" />
                                  Share
                                </Button>
                              </div>
                            </div>

                            <h3 className="font-bold text-lg mb-2">{certificate.courseTitle}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                              Instructor: {certificate.instructor}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                              Completed on {new Date(certificate.completedDate).toLocaleDateString()}
                            </p>

                            <div className="space-y-2">
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Skills Gained:</p>
                              <div className="flex flex-wrap gap-2">
                                {certificate.skills.map((skill, skillIndex) => (
                                  <Badge key={skillIndex} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-slate-600 mb-2">No certificates yet</h3>
                    <p className="text-slate-500 mb-6">Complete your courses to earn certificates</p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <a href="/courses">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Learning
                      </a>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
