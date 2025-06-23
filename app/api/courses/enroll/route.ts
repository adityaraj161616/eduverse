import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getCourseById } from "@/lib/course-data"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const { courseId } = await request.json()

    if (!courseId) {
      return NextResponse.json({ message: "Course ID is required" }, { status: 400 })
    }

    // Get course data (for demo courses, we don't need MongoDB)
    const courseData = getCourseById(courseId)

    if (!courseData) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 })
    }

    // For demo courses, we'll handle enrollment on the client side
    // This endpoint just validates the request
    return NextResponse.json({
      message: "Course enrollment validated",
      courseId,
      courseData,
    })
  } catch (error) {
    console.error("Enrollment validation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
