import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Course } from "@/models/course"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")
    const category = searchParams.get("category")
    const level = searchParams.get("level")

    await connectDB()

    const query: any = {}

    if (featured === "true") {
      query.featured = true
    }

    if (category && category !== "All Categories") {
      query.category = category
    }

    if (level && level !== "All Levels") {
      query.level = level
    }

    let coursesQuery = Course.find(query)

    if (limit) {
      coursesQuery = coursesQuery.limit(Number.parseInt(limit))
    }

    const courses = await coursesQuery.exec()

    return NextResponse.json({
      courses,
      total: courses.length,
    })
  } catch (error) {
    console.error("Fetch courses error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const courseData = await request.json()

    await connectDB()

    const course = await Course.create(courseData)

    return NextResponse.json({ message: "Course created successfully", course }, { status: 201 })
  } catch (error) {
    console.error("Create course error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
