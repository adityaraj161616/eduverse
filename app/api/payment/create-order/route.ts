import { type NextRequest, NextResponse } from "next/server"

// Lazy initialization of Razorpay to avoid build-time errors
let razorpay: any = null

function getRazorpayInstance() {
  if (!razorpay) {
    // Check if environment variables are available
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials not configured")
    }

    // Dynamic import to avoid build-time initialization
    const Razorpay = require("razorpay")
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  }
  return razorpay
}

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables first
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 })
    }

    const { courseId, amount, currency, userDetails } = await request.json()

    // Validate required fields
    if (!courseId || !amount || !userDetails) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const razorpayInstance = getRazorpayInstance()

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: currency || "INR",
      receipt: `course_${courseId}_${Date.now()}`,
      notes: {
        courseId,
        userEmail: userDetails.email,
        userName: userDetails.fullName,
        userPhone: userDetails.phone,
      },
    }

    const order = await razorpayInstance.orders.create(options)

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    })
  } catch (error) {
    console.error("Error creating Razorpay order:", error)

    // Handle specific Razorpay errors
    if (error instanceof Error && error.message.includes("not configured")) {
      return NextResponse.json({ error: "Payment gateway not configured. Please contact support." }, { status: 503 })
    }

    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 })
  }
}
