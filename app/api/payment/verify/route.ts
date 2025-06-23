import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { User } from "@/models/user"
import { Course } from "@/models/course"
import { Progress } from "@/models/progress"

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = await request.json()

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    // Get user from token
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    await connectDB()

    // Find user and course
    const user = await User.findById(decoded.userId)
    const course = await Course.findById(courseId)

    if (!user || !course) {
      return NextResponse.json({ error: "User or course not found" }, { status: 404 })
    }

    // Check if already enrolled
    if (!user.enrolledCourses.includes(courseId)) {
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
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified and course enrolled successfully",
      paymentId: razorpay_payment_id,
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
