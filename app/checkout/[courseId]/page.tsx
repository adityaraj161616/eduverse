"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Shield,
  Lock,
  CheckCircle,
  Star,
  Clock,
  Users,
  ExternalLink,
  MessageSquare,
} from "lucide-react"

interface Course {
  id: string
  title: string
  instructor: string
  image: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  students: number
  duration: string
  level: string
  category: string
}

// Course data for checkout
const courseData = {
  "1": {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=center",
    price: 8299,
    originalPrice: 16599,
    discount: 50,
    rating: 4.8,
    students: 1250,
    duration: "12 weeks",
    level: "Beginner to Advanced",
    category: "Web Development",
  },
  "2": {
    id: "2",
    title: "Data Science with Python",
    instructor: "Jane Smith",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    price: 0,
    originalPrice: 12399,
    discount: 100,
    rating: 4.7,
    students: 890,
    duration: "8 weeks",
    level: "Intermediate",
    category: "Data Science",
  },
  "3": {
    id: "3",
    title: "UI/UX Design Fundamentals",
    instructor: "Mike Johnson",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop&crop=center",
    price: 6599,
    originalPrice: 13199,
    discount: 50,
    rating: 4.9,
    students: 567,
    duration: "6 weeks",
    level: "Beginner",
    category: "Design",
  },
  "4": {
    id: "4",
    title: "Advanced React & Next.js",
    instructor: "Sarah Wilson",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    price: 10799,
    originalPrice: 20699,
    discount: 48,
    rating: 4.8,
    students: 432,
    duration: "10 weeks",
    level: "Advanced",
    category: "Web Development",
  },
  "5": {
    id: "5",
    title: "Digital Marketing Mastery",
    instructor: "David Brown",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&crop=center",
    price: 0,
    originalPrice: 16599,
    discount: 100,
    rating: 4.6,
    students: 723,
    duration: "7 weeks",
    level: "Intermediate",
    category: "Marketing",
  },
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const course = courseData[courseId as keyof typeof courseData]

  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
  })
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle")
  const [paymentLink, setPaymentLink] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Generate UPI payment link
  const generateUPILink = (amount: number, note: string) => {
    const upiId = "eduverse@paytm" // Your UPI ID
    const name = "EduVerse"
    const transactionId = `EDU${Date.now()}`

    return `upi://pay?pa=${upiId}&pn=${name}&tr=${transactionId}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`
  }

  // Handle UPI Payment
  const handleUPIPayment = async () => {
    setLoading(true)
    setPaymentStatus("processing")

    const paymentNote = `Payment for ${course.title}`
    const upiLink = generateUPILink(course.price, paymentNote)

    // Open UPI app
    window.open(upiLink, "_blank")

    // Start checking payment status
    checkPaymentStatus()
  }

  // Handle Razorpay Payment
  const handleRazorpayPayment = async () => {
    setLoading(true)
    setPaymentStatus("processing")

    try {
      // Create order on backend
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          amount: course.price,
          currency: "INR",
          userDetails: formData,
        }),
      })

      const order = await response.json()

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "EduVerse",
        description: `Payment for ${course.title}`,
        order_id: order.id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3B82F6",
        },
        handler: async (response: any) => {
          // Verify payment on backend
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId,
            }),
          })

          if (verifyResponse.ok) {
            setPaymentStatus("success")
            router.push(`/payment/success?courseId=${courseId}&paymentId=${response.razorpay_payment_id}`)
          } else {
            setPaymentStatus("failed")
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
            setPaymentStatus("idle")
          },
        },
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentStatus("failed")
      setLoading(false)
    }
  }

  // Send payment link to mobile
  const sendPaymentLink = async () => {
    setLoading(true)

    try {
      const response = await fetch("/api/payment/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          phone: formData.phone,
          amount: course.price,
          courseName: course.title,
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert(`Payment link sent to ${formData.phone}! Click the link to complete payment.`)
        setPaymentLink(result.paymentLink)
        checkPaymentStatus()
      }
    } catch (error) {
      console.error("Error sending payment link:", error)
    } finally {
      setLoading(false)
    }
  }

  // Check payment status automatically
  const checkPaymentStatus = () => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/payment/status?courseId=${courseId}&phone=${formData.phone}`)
        const status = await response.json()

        if (status.paid) {
          setPaymentStatus("success")
          clearInterval(interval)
          router.push(`/payment/success?courseId=${courseId}`)
        }
      } catch (error) {
        console.error("Error checking payment status:", error)
      }
    }, 3000) // Check every 3 seconds

    // Stop checking after 10 minutes
    setTimeout(() => {
      clearInterval(interval)
      if (paymentStatus === "processing") {
        setPaymentStatus("idle")
        setLoading(false)
      }
    }, 600000)
  }

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Course Not Found</h1>
          <Link href="/courses">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/course/${courseId}`}>
              <Button variant="ghost" className="text-white hover:bg-white/10 p-2">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Course
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm text-white/80">Secure Checkout</span>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-light text-white mb-4">Quick Checkout</h1>
              <p className="text-white/60">Choose your preferred payment method</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Payment Form */}
              <div className="space-y-8">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Lock className="w-5 h-5 mr-2 text-green-400" />
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-white/80">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="fullName" className="text-white/80">
                            Full Name
                          </Label>
                          <Input
                            id="fullName"
                            placeholder="Your full name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-white/80">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          placeholder="+91 9876543210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    {/* Payment Methods */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Choose Payment Method</h3>
                      <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                        <TabsList className="grid w-full grid-cols-3 bg-white/10">
                          <TabsTrigger
                            value="upi"
                            className="data-[state=active]:bg-white data-[state=active]:text-black"
                          >
                            <Smartphone className="w-4 h-4 mr-2" />
                            UPI
                          </TabsTrigger>
                          <TabsTrigger
                            value="card"
                            className="data-[state=active]:bg-white data-[state=active]:text-black"
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Card
                          </TabsTrigger>
                          <TabsTrigger
                            value="link"
                            className="data-[state=active]:bg-white data-[state=active]:text-black"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            SMS Link
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="upi" className="space-y-4">
                          <div className="text-center py-6">
                            <Smartphone className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                            <h4 className="text-lg font-medium text-white mb-2">Pay with UPI</h4>
                            <p className="text-white/60 mb-6">
                              Click below to open your UPI app and complete payment instantly
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="flex items-center justify-center p-3 bg-white/10 rounded-lg">
                                <span className="text-sm text-white">PhonePe</span>
                              </div>
                              <div className="flex items-center justify-center p-3 bg-white/10 rounded-lg">
                                <span className="text-sm text-white">Google Pay</span>
                              </div>
                              <div className="flex items-center justify-center p-3 bg-white/10 rounded-lg">
                                <span className="text-sm text-white">Paytm</span>
                              </div>
                              <div className="flex items-center justify-center p-3 bg-white/10 rounded-lg">
                                <span className="text-sm text-white">BHIM</span>
                              </div>
                            </div>
                            <Button
                              onClick={handleUPIPayment}
                              disabled={loading || !formData.phone || !formData.email}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-2xl"
                            >
                              {loading ? "Opening UPI App..." : `Pay ₹${course.price.toLocaleString()} via UPI`}
                              <ExternalLink className="w-5 h-5 ml-2" />
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="card" className="space-y-4">
                          <div className="text-center py-6">
                            <CreditCard className="w-16 h-16 text-green-400 mx-auto mb-4" />
                            <h4 className="text-lg font-medium text-white mb-2">Pay with Card</h4>
                            <p className="text-white/60 mb-6">
                              Secure payment with Razorpay - supports all major cards
                            </p>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                              <div className="flex items-center justify-center p-3 bg-white/10 rounded-lg">
                                <span className="text-sm text-white">Visa</span>
                              </div>
                              <div className="flex items-center justify-center p-3 bg-white/10 rounded-lg">
                                <span className="text-sm text-white">Mastercard</span>
                              </div>
                              <div className="flex items-center justify-center p-3 bg-white/10 rounded-lg">
                                <span className="text-sm text-white">RuPay</span>
                              </div>
                            </div>
                            <Button
                              onClick={handleRazorpayPayment}
                              disabled={loading || !formData.phone || !formData.email}
                              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-2xl"
                            >
                              {loading
                                ? "Opening Payment Gateway..."
                                : `Pay ₹${course.price.toLocaleString()} with Card`}
                              <ExternalLink className="w-5 h-5 ml-2" />
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="link" className="space-y-4">
                          <div className="text-center py-6">
                            <MessageSquare className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                            <h4 className="text-lg font-medium text-white mb-2">Payment Link via SMS</h4>
                            <p className="text-white/60 mb-6">Get a secure payment link on your mobile number</p>
                            <Button
                              onClick={sendPaymentLink}
                              disabled={loading || !formData.phone || !formData.email}
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg rounded-2xl"
                            >
                              {loading ? "Sending Link..." : "Send Payment Link to Mobile"}
                              <MessageSquare className="w-5 h-5 ml-2" />
                            </Button>
                            {paymentLink && (
                              <div className="mt-4 p-4 bg-white/10 rounded-lg">
                                <p className="text-sm text-white/80 mb-2">
                                  Payment link sent! You can also click below:
                                </p>
                                <a
                                  href={paymentLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 underline"
                                >
                                  Open Payment Link
                                </a>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* Payment Status */}
                    {paymentStatus === "processing" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-center py-6 bg-blue-500/10 rounded-lg border border-blue-500/20"
                      >
                        <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <h4 className="text-lg font-medium text-white mb-2">Processing Payment...</h4>
                        <p className="text-white/60">
                          Complete your payment in the opened app. We'll automatically verify and enroll you.
                        </p>
                      </motion.div>
                    )}

                    {/* Security Notice */}
                    <div className="flex items-center justify-center space-x-2 text-sm text-white/60">
                      <Shield className="w-4 h-4" />
                      <span>256-bit SSL encryption • Automatic verification • Instant access</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary - Same as before */}
              <div className="space-y-8">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Course Details */}
                    <div className="flex space-x-4">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        width={120}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-white mb-2">{course.title}</h3>
                        <p className="text-sm text-white/60 mb-2">By {course.instructor}</p>
                        <div className="flex items-center space-x-4 text-sm text-white/60">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            {course.rating}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.students}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.duration}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    {/* Pricing */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-white/80">
                        <span>Course Price</span>
                        <span>₹{course.originalPrice.toLocaleString()}</span>
                      </div>
                      {course.discount > 0 && (
                        <div className="flex justify-between text-green-400">
                          <span>Discount ({course.discount}%)</span>
                          <span>-₹{(course.originalPrice - course.price).toLocaleString()}</span>
                        </div>
                      )}
                      <Separator className="bg-white/10" />
                      <div className="flex justify-between text-xl font-medium text-white">
                        <span>Total</span>
                        <span>₹{course.price.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Course Features */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">What's included:</h4>
                      <div className="space-y-2">
                        {[
                          "Lifetime access to course content",
                          "Certificate of completion",
                          "Mobile and desktop access",
                          "24/7 student support",
                          "30-day money-back guarantee",
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-white/70">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Money Back Guarantee */}
                <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-md border border-green-400/20 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">30-Day Money-Back Guarantee</h3>
                    <p className="text-sm text-white/70">
                      Not satisfied? Get a full refund within 30 days, no questions asked.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
