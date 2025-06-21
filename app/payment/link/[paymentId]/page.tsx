"use client"

import { useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, CreditCard, ExternalLink } from "lucide-react"

export default function PaymentLinkPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const paymentId = params.paymentId as string
  const courseId = searchParams.get("course")
  const amount = searchParams.get("amount")

  const [loading, setLoading] = useState(false)

  const handleUPIPayment = () => {
    setLoading(true)
    const upiLink = `upi://pay?pa=eduverse@paytm&pn=EduVerse&tr=${paymentId}&am=${amount}&cu=INR&tn=Course Payment`
    window.open(upiLink, "_blank")

    // Check payment status
    setTimeout(() => {
      router.push(`/payment/success?courseId=${courseId}`)
    }, 5000)
  }

  const handleCardPayment = async () => {
    setLoading(true)
    // Redirect to Razorpay or other payment gateway
    window.location.href = `/checkout/${courseId}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-2xl">Complete Payment</CardTitle>
          <p className="text-white/60">Amount: ₹{amount}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={handleUPIPayment}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-2xl"
          >
            <Smartphone className="w-5 h-5 mr-2" />
            Pay with UPI
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>

          <Button
            onClick={handleCardPayment}
            disabled={loading}
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10 py-6 text-lg rounded-2xl"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Pay with Card
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
