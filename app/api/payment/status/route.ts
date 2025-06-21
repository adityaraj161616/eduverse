import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/models/user"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("courseId")
    const phone = searchParams.get("phone")

    // Get user from token
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ paid: false, error: "Not authenticated" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    await connectDB()
    const user = await User.findById(decoded.userId)

    if (!user) {
      return NextResponse.json({ paid: false, error: "User not found" })
    }

    // Check if user is enrolled in the course
    const isEnrolled = user.enrolledCourses.includes(courseId)

    return NextResponse.json({
      paid: isEnrolled,
      enrolled: isEnrolled,
    })
  } catch (error) {
    console.error("Error checking payment status:", error)
    return NextResponse.json({ paid: false, error: "Status check failed" })
  }
}
