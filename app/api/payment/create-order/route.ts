import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Check if Razorpay is configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        {
          error: "Payment gateway not configured. Please contact support.",
          code: "PAYMENT_NOT_CONFIGURED",
        },
        { status: 503 },
      )
    }

    const { courseId, amount, currency, userDetails } = await request.json()

    // Validate required fields
    if (!courseId || !amount || !userDetails) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    try {
      // Dynamic import to avoid build-time dependency
      const Razorpay = await import("razorpay").then((mod) => mod.default)

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      })

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

      const order = await razorpay.orders.create(options)

      return NextResponse.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      })
    } catch (importError) {
      console.error("Razorpay import error:", importError)

      return NextResponse.json(
        {
          error: "Payment service temporarily unavailable. Please try again later.",
          code: "PAYMENT_SERVICE_ERROR",
        },
        { status: 503 },
      )
    }
  } catch (error) {
    console.error("Error creating payment order:", error)

    return NextResponse.json(
      {
        error: "Failed to create payment order",
        code: "PAYMENT_ORDER_FAILED",
      },
      { status: 500 },
    )
  }
}
