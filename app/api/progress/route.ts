import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Mock progress data
    const progressData = {
      overallProgress: 68,
      coursesCompleted: 12,
      totalCourses: 18,
      studyStreak: 15,
      totalStudyTime: 240,
      skillsAcquired: 8,
      achievements: [
        {
          id: "1",
          title: "First Course Complete",
          description: "Completed your first course",
          icon: "🎓",
          unlockedAt: "2024-01-10",
          rarity: "common",
        },
        {
          id: "2",
          title: "Study Streak Master",
          description: "15 days consecutive learning",
          icon: "🔥",
          unlockedAt: "2024-01-15",
          rarity: "rare",
        },
        {
          id: "3",
          title: "Speed Learner",
          description: "Completed 5 courses in a month",
          icon: "⚡",
          unlockedAt: "2024-01-12",
          rarity: "epic",
        },
      ],
      weeklyProgress: [
        { week: "Week 1", hoursStudied: 12, coursesCompleted: 2, quizzesCompleted: 8 },
        { week: "Week 2", hoursStudied: 15, coursesCompleted: 3, quizzesCompleted: 12 },
        { week: "Week 3", hoursStudied: 18, coursesCompleted: 2, quizzesCompleted: 10 },
        { week: "Week 4", hoursStudied: 20, coursesCompleted: 4, quizzesCompleted: 15 },
      ],
      courseProgress: [
        {
          id: "1",
          title: "Advanced React Development",
          progress: 85,
          totalLessons: 20,
          completedLessons: 17,
          timeSpent: 45,
          lastAccessed: "2024-01-15",
        },
        {
          id: "2",
          title: "Machine Learning Basics",
          progress: 60,
          totalLessons: 15,
          completedLessons: 9,
          timeSpent: 32,
          lastAccessed: "2024-01-14",
        },
        {
          id: "3",
          title: "UI/UX Design Principles",
          progress: 100,
          totalLessons: 12,
          completedLessons: 12,
          timeSpent: 28,
          lastAccessed: "2024-01-13",
        },
      ],
      skillProgress: [
        { skill: "React", level: 4, progress: 75, xp: 750, nextLevelXp: 1000 },
        { skill: "JavaScript", level: 5, progress: 20, xp: 1020, nextLevelXp: 1250 },
        { skill: "Python", level: 3, progress: 90, xp: 590, nextLevelXp: 750 },
        { skill: "Design", level: 2, progress: 45, xp: 245, nextLevelXp: 500 },
      ],
    }

    return NextResponse.json(progressData)
  } catch (error) {
    console.error("Error fetching progress data:", error)
    return NextResponse.json({ error: "Failed to fetch progress data" }, { status: 500 })
  }
}
