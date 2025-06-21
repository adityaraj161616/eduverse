import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Course } from "@/models/course"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const course = await Course.findById(params.id).populate("instructor", "name email")

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({
      course: {
        ...course.toObject(),
        instructor: {
          name: course.instructor?.name || "Unknown Instructor",
          avatar: "/placeholder.svg?height=100&width=100",
          bio: "Experienced instructor passionate about teaching.",
        },
      },
    })
  } catch (error) {
    console.error("Fetch course error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
