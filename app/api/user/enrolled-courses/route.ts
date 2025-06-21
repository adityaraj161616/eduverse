import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { User } from "@/models/user"
import { Progress } from "@/models/progress"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    await connectDB()

    // Find user's enrolled courses with progress
    const user = await User.findById(decoded.userId).populate("enrolledCourses")
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Get progress for each enrolled course
    const coursesWithProgress = await Promise.all(
      user.enrolledCourses.map(async (course: any) => {
        const progress = await Progress.findOne({
          user: decoded.userId,
          course: course._id,
        })

        return {
          _id: course._id,
          title: course.title,
          thumbnail: course.thumbnail,
          progress: progress?.progress || 0,
          totalLessons: course.lessons?.length || 0,
          completedLessons: progress?.completedLessons?.length || 0,
          lastAccessed: progress?.lastAccessed || course.createdAt,
          instructor: course.instructor?.name || "Unknown",
          category: course.category,
        }
      }),
    )

    return NextResponse.json({
      courses: coursesWithProgress,
      total: coursesWithProgress.length,
    })
  } catch (error) {
    console.error("Fetch enrolled courses error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
