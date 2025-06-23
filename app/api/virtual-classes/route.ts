import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Mock data for virtual classes
    const classes = [
      {
        id: "1",
        title: "Advanced React Patterns",
        instructor: "Sarah Johnson",
        instructorAvatar: "/placeholder-avatar.png",
        date: "2024-01-15",
        time: "10:00 AM",
        duration: 90,
        participants: 24,
        maxParticipants: 50,
        status: "live",
        description: "Deep dive into advanced React patterns and best practices",
        subject: "Web Development",
      },
      {
        id: "2",
        title: "Machine Learning Fundamentals",
        instructor: "Dr. Michael Chen",
        instructorAvatar: "/placeholder-avatar.png",
        date: "2024-01-16",
        time: "2:00 PM",
        duration: 120,
        participants: 0,
        maxParticipants: 30,
        status: "upcoming",
        description: "Introduction to machine learning concepts and algorithms",
        subject: "Data Science",
      },
      {
        id: "3",
        title: "UI/UX Design Principles",
        instructor: "Emma Rodriguez",
        instructorAvatar: "/placeholder-avatar.png",
        date: "2024-01-14",
        time: "11:00 AM",
        duration: 60,
        participants: 18,
        maxParticipants: 25,
        status: "ended",
        description: "Essential principles for creating beautiful user interfaces",
        subject: "Design",
      },
    ]

    return NextResponse.json({ classes })
  } catch (error) {
    console.error("Error fetching virtual classes:", error)
    return NextResponse.json({ error: "Failed to fetch virtual classes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()

    // Here you would create a new virtual class
    // For now, return success

    return NextResponse.json({
      success: true,
      message: "Virtual class created successfully",
    })
  } catch (error) {
    console.error("Error creating virtual class:", error)
    return NextResponse.json({ error: "Failed to create virtual class" }, { status: 500 })
  }
}
