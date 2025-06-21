"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Download, Play, Star, Trophy, Gift } from "lucide-react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseId = searchParams.get("courseId")
  const [confetti, setConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const course = {
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=center",
    price: 8299,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Confetti Effect */}
      {confetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "easeOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6">Payment Successful! 🎉</h1>
            <p className="text-xl text-white/70 mb-8">
              Congratulations! You've successfully enrolled in the course. Your learning journey starts now!
            </p>
          </motion.div>

          {/* Course Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center space-x-6">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={120}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-medium text-white mb-2">{course.title}</h3>
                    <p className="text-white/60 mb-4">By {course.instructor}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span className="text-sm">4.8</span>
                      </div>
                      <div className="text-sm text-white/60">12 weeks</div>
                      <div className="text-lg font-medium text-green-400">₹{course.price.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4 mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push(`/course/${courseId}/learn`)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-2xl"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-2xl"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Receipt
              </Button>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardContent className="p-6 text-center">
                <Play className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Start Learning</h3>
                <p className="text-sm text-white/60">
                  Access your course content immediately and begin your learning journey.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Earn Certificate</h3>
                <p className="text-sm text-white/60">Complete the course to earn your certificate of completion.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardContent className="p-6 text-center">
                <Gift className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Bonus Content</h3>
                <p className="text-sm text-white/60">Get access to exclusive bonus materials and resources.</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-white/60"
          >
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Go to Dashboard
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/courses" className="hover:text-white transition-colors">
              Browse More Courses
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/support" className="hover:text-white transition-colors">
              Need Help?
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
