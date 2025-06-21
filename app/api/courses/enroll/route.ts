import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { User } from "@/models/user"
import { Course } from "@/models/course"
import { Progress } from "@/models/progress"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    const { courseId } = await request.json()

    if (!courseId) {
      return NextResponse.json({ message: "Course ID is required" }, { status: 400 })
    }

    await connectDB()

    // Find user and course
    const user = await User.findById(decoded.userId)
    const course = await Course.findById(courseId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 })
    }

    // Check if already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return NextResponse.json({ message: "Already enrolled in this course" }, { status: 400 })
    }

    // Enroll user
    user.enrolledCourses.push(courseId)
    await user.save()

    // Add user to course's enrolled students
    course.studentsEnrolled.push(decoded.userId)
    await course.save()

    // Create progress record
    await Progress.create({
      user: decoded.userId,
      course: courseId,
      progress: 0,
      completedLessons: [],
      lastAccessed: new Date(),
    })

    return NextResponse.json({
      message: "Successfully enrolled in course",
      courseId,
    })
  } catch (error) {
    console.error("Enrollment error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
