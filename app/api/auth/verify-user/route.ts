import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/models/user"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    await connectDB()

    // Find user and return profile info
    const user = await User.findOne({ email }).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.profile?.avatar || "/placeholder-avatar.png",
          provider: user.provider,
          enrolledCourses: user.enrolledCourses?.length || 0,
          completedCourses: user.completedCourses?.length || 0,
          createdAt: user.createdAt,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("User verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
