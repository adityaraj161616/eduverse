import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../[...nextauth]/route"
import { connectDB } from "@/lib/db"
import { User } from "@/models/user"

export async function GET(request: NextRequest) {
  try {
    // Try NextAuth session first
    const session = await getServerSession(authOptions)

    if (session?.user) {
      await connectDB()

      // Find user in database
      const user = await User.findOne({ email: session.user.email }).select("-password")

      if (user) {
        return NextResponse.json({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || "student",
          avatar: user.avatar || session.user.image || "/placeholder-avatar.png",
          enrolledCourses: user.enrolledCourses || [],
          completedCourses: user.completedCourses || [],
          provider: user.provider || "google",
        })
      }
    }

    // Fallback to JWT token check
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const jwt = await import("jsonwebtoken")
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    await connectDB()

    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "student",
      avatar: user.avatar || "/placeholder-avatar.png",
      enrolledCourses: user.enrolledCourses || [],
      completedCourses: user.completedCourses || [],
      provider: user.provider || "credentials",
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ message: "Authentication failed" }, { status: 401 })
  }
}
