import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { Progress } from "@/models/progress"

export async function GET(request: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    await connectDB()

    // Find progress for this user and course
    const progress = await Progress.findOne({
      user: decoded.userId,
      course: params.courseId,
    })

    if (!progress) {
      return NextResponse.json({
        progress: {
          courseId: params.courseId,
          completedLessons: [],
          progress: 0,
          isEnrolled: false,
        },
      })
    }

    return NextResponse.json({
      progress: {
        courseId: params.courseId,
        completedLessons: progress.completedLessons.map((lesson: any) => lesson.lesson),
        progress: progress.progress,
        isEnrolled: true,
        lastAccessed: progress.lastAccessed,
      },
    })
  } catch (error) {
    console.error("Fetch progress error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
