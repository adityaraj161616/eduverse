"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Target, Plus, Edit, CheckCircle, TrendingUp, BookOpen } from "lucide-react"
import Image from "next/image"

interface StudySession {
  id: string
  title: string
  courseId: string
  courseName: string
  date: string
  startTime: string
  endTime: string
  duration: number
  completed: boolean
  type: "lesson" | "practice" | "review"
}

interface Goal {
  id: string
  title: string
  description: string
  targetDate: string
  progress: number
  maxProgress: number
  category: "daily" | "weekly" | "monthly"
  completed: boolean
}

export default function SchedulePage() {
  const { data: session } = useSession()
  const [studySessions, setStudySessions] = useState<StudySession[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  useEffect(() => {
    // Mock study sessions
    const mockSessions: StudySession[] = [
      {
        id: "1",
        title: "Python Basics - Variables and Data Types",
        courseId: "2",
        courseName: "Data Science with Python",
        date: new Date().toISOString().split("T")[0],
        startTime: "09:00",
        endTime: "10:30",
        duration: 90,
        completed: true,
        type: "lesson",
      },
      {
        id: "2",
        title: "Practice: Data Manipulation with Pandas",
        courseId: "2",
        courseName: "Data Science with Python",
        date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
        startTime: "14:00",
        endTime: "15:30",
        duration: 90,
        completed: false,
        type: "practice",
      },
      {
        id: "3",
        title: "Review: Machine Learning Concepts",
        courseId: "2",
        courseName: "Data Science with Python",
        date: new Date(Date.now() + 172800000).toISOString().split("T")[0], // Day after tomorrow
        startTime: "10:00",
        endTime: "11:00",
        duration: 60,
        completed: false,
        type: "review",
      },
    ]

    const mockGoals: Goal[] = [
      {
        id: "1",
        title: "Complete 1 lesson daily",
        description: "Maintain consistent daily learning habit",
        targetDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
        progress: 5,
        maxProgress: 7,
        category: "daily",
        completed: false,
      },
      {
        id: "2",
        title: "Finish Data Science Course",
        description: "Complete all modules and projects",
        targetDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
        progress: 30,
        maxProgress: 100,
        category: "monthly",
        completed: false,
      },
      {
        id: "3",
        title: "Study 10 hours this week",
        description: "Dedicate focused time to learning",
        targetDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
        progress: 6,
        maxProgress: 10,
        category: "weekly",
        completed: false,
      },
    ]

    setStudySessions(mockSessions)
    setGoals(mockGoals)
  }, [])

  const todaySessions = studySessions.filter((session) => session.date === selectedDate)
  const upcomingSessions = studySessions.filter((session) => new Date(session.date) > new Date(selectedDate))
  const completedToday = todaySessions.filter((session) => session.completed).length
  const totalToday = todaySessions.length

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lesson":
        return "bg-blue-500"
      case "practice":
        return "bg-green-500"
      case "review":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "lesson":
        return <BookOpen className="w-4 h-4" />
      case "practice":
        return <Target className="w-4 h-4" />
      case "review":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
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
          alt="Schedule background"
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
                  Learning Schedule
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300">
                  Plan your study sessions and track your learning goals
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Study Session
                </Button>
              </div>
            </div>

            {/* Date Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <Label htmlFor="date-select">Select Date:</Label>
              <Input
                id="date-select"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto bg-white/95 backdrop-blur-sm border-slate-200 dark:border-slate-700"
              />
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Today's Sessions</p>
                    <p className="text-3xl font-bold text-blue-600">{totalToday}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Completed</p>
                    <p className="text-3xl font-bold text-green-600">{completedToday}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Study Time</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {todaySessions.reduce((acc, session) => acc + session.duration, 0)}m
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Active Goals</p>
                    <p className="text-3xl font-bold text-orange-600">{goals.filter((g) => !g.completed).length}</p>
                  </div>
                  <Target className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="schedule" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-[450px] bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <TabsTrigger
                  value="schedule"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Schedule
                </TabsTrigger>
                <TabsTrigger
                  value="goals"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Goals
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Today's Sessions */}
                  <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                        Today's Sessions
                      </CardTitle>
                      <CardDescription>
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {todaySessions.length > 0 ? (
                        todaySessions.map((session) => (
                          <div
                            key={session.id}
                            className={`p-4 rounded-lg border-l-4 ${getTypeColor(session.type)} ${
                              session.completed
                                ? "bg-green-50 dark:bg-green-900/20"
                                : "bg-slate-50 dark:bg-slate-800/50"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {getTypeIcon(session.type)}
                                <h3 className="font-semibold">{session.title}</h3>
                              </div>
                              <div className="flex items-center space-x-2">
                                {session.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{session.courseName}</p>
                            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                              <span>
                                {session.startTime} - {session.endTime}
                              </span>
                              <Badge variant="outline" className="capitalize">
                                {session.type}
                              </Badge>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                          <p className="text-slate-500">No sessions scheduled for this date</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Upcoming Sessions */}
                  <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-purple-500" />
                        Upcoming Sessions
                      </CardTitle>
                      <CardDescription>Your next scheduled study sessions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {upcomingSessions.slice(0, 5).map((session) => (
                        <div
                          key={session.id}
                          className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border-l-4 border-slate-300"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(session.type)}
                              <h3 className="font-semibold">{session.title}</h3>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{session.courseName}</p>
                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>
                              {new Date(session.date).toLocaleDateString()} • {session.startTime}
                            </span>
                            <Badge variant="outline" className="capitalize">
                              {session.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {upcomingSessions.length === 0 && (
                        <div className="text-center py-8">
                          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                          <p className="text-slate-500">No upcoming sessions scheduled</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Goals Tab */}
              <TabsContent value="goals" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {goals.map((goal) => (
                    <motion.div
                      key={goal.id}
                      variants={itemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group"
                    >
                      <Card
                        className={`h-full backdrop-blur-sm border-2 transition-all duration-500 ${
                          goal.completed
                            ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
                            : "bg-white/95 dark:bg-slate-800/95 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Badge
                              variant="outline"
                              className={`capitalize ${
                                goal.category === "daily"
                                  ? "text-blue-600 border-blue-300"
                                  : goal.category === "weekly"
                                    ? "text-purple-600 border-purple-300"
                                    : "text-orange-600 border-orange-300"
                              }`}
                            >
                              {goal.category}
                            </Badge>
                            {goal.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                          </div>

                          <h3 className="font-bold text-lg mb-2">{goal.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{goal.description}</p>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-semibold">
                                {goal.progress} / {goal.maxProgress}
                              </span>
                            </div>
                            <Progress value={(goal.progress / goal.maxProgress) * 100} className="h-2" />
                          </div>

                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Target: {new Date(goal.targetDate).toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                        Learning Streak
                      </CardTitle>
                      <CardDescription>Your consistency over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <div className="text-6xl font-bold text-orange-500 mb-2">7</div>
                        <p className="text-lg font-semibold mb-2">Day Streak</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Keep it up! You're on fire 🔥</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-blue-500" />
                        Study Time This Week
                      </CardTitle>
                      <CardDescription>Total hours spent learning</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <div className="text-6xl font-bold text-blue-500 mb-2">12</div>
                        <p className="text-lg font-semibold mb-2">Hours</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Great progress this week!</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
