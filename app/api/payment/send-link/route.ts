import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { courseId, phone, amount, courseName } = await request.json()

    // Generate unique payment link
    const paymentId = `pay_${Date.now()}_${courseId}`
    const paymentLink = `${process.env.NEXTAUTH_URL}/payment/link/${paymentId}?course=${courseId}&amount=${amount}`

    // In production, you would:
    // 1. Store payment details in database
    // 2. Send SMS using SMS gateway (like Twilio, MSG91, etc.)

    // For now, we'll simulate SMS sending
    console.log(`SMS to ${phone}: Complete your payment for ${courseName}: ${paymentLink}`)

    // Simulate SMS API call
    const smsResponse = await sendSMS(
      phone,
      `Complete your EduVerse payment for "${courseName}" (₹${amount}): ${paymentLink}`,
    )

    return NextResponse.json({
      success: true,
      message: "Payment link sent successfully",
      paymentLink,
      paymentId,
    })
  } catch (error) {
    console.error("Error sending payment link:", error)
    return NextResponse.json({ error: "Failed to send payment link" }, { status: 500 })
  }
}

// SMS sending function (replace with your SMS provider)
async function sendSMS(phone: string, message: string) {
  // Example with MSG91 or similar SMS provider
  // const response = await fetch('https://api.msg91.com/api/v5/flow/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'authkey': process.env.SMS_API_KEY
  //   },
  //   body: JSON.stringify({
  //     flow_id: 'your_flow_id',
  //     sender: process.env.SMS_SENDER_ID,
  //     mobiles: phone,
  //     message: message
  //   })
  // })

  // For demo purposes, just log
  console.log(`SMS sent to ${phone}: ${message}`)
  return { success: true }
}
