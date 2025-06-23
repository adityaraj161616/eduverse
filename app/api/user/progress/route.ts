import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { Progress } from "@/models/progress"
import { Course } from "@/models/course"

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    const { courseId, lessonId, action } = await request.json()

    if (!courseId || !lessonId || !action) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    await connectDB()

    // Find or create progress record
    let progress = await Progress.findOne({
      user: decoded.userId,
      course: courseId,
    })

    if (!progress) {
      progress = await Progress.create({
        user: decoded.userId,
        course: courseId,
        progress: 0,
        completedLessons: [],
        lastAccessed: new Date(),
      })
    }

    if (action === "complete") {
      // Check if lesson is already completed
      const isAlreadyCompleted = progress.completedLessons.some((lesson: any) => lesson.lesson.toString() === lessonId)

      if (!isAlreadyCompleted) {
        progress.completedLessons.push({
          lesson: lessonId,
          completedAt: new Date(),
        })

        // Calculate new progress percentage
        const course = await Course.findById(courseId)
        if (course) {
          const totalLessons = course.lessons.length
          const completedCount = progress.completedLessons.length
          progress.progress = Math.round((completedCount / totalLessons) * 100)
        }

        progress.lastAccessed = new Date()
        await progress.save()
      }
    }

    return NextResponse.json({
      message: "Progress updated successfully",
      progress: progress.progress,
    })
  } catch (error) {
    console.error("Update progress error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
