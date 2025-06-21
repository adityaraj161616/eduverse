"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, Users, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  image: string
  course: string
}

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "Tech Corp",
      content:
        "EduVerse transformed my career! The web development course was comprehensive and practical. I landed my dream job within 3 months of completion.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      course: "Web Development Bootcamp",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Data Scientist",
      company: "Analytics Pro",
      content:
        "The Python for Data Science course exceeded my expectations. The instructors are world-class and the projects are industry-relevant.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      course: "Data Science with Python",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Design Studio",
      content:
        "Amazing platform! The UI/UX course helped me transition from graphic design to UX. The community support is incredible.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      course: "UI/UX Design Fundamentals",
    },
    {
      id: "4",
      name: "David Kim",
      role: "Marketing Manager",
      company: "Growth Inc",
      content:
        "The digital marketing course gave me practical skills I use daily. ROI on my campaigns increased by 300% after applying what I learned.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      course: "Digital Marketing Mastery",
    },
    {
      id: "5",
      name: "Lisa Thompson",
      role: "Business Analyst",
      company: "Consulting Firm",
      content:
        "Excellent content and presentation. The business strategy course helped me get promoted to senior analyst. Highly recommended!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      course: "Business Strategy & Leadership",
    },
    {
      id: "6",
      name: "James Wilson",
      role: "Full Stack Developer",
      company: "Startup Hub",
      content:
        "The React course was phenomenal. From beginner to building complex applications - the learning curve was smooth and engaging.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      course: "Advanced React & Next.js",
    },
  ]

  const stats = [
    { icon: Users, label: "Happy Students", value: "50,000+" },
    { icon: Award, label: "Course Completion", value: "95%" },
    { icon: TrendingUp, label: "Career Growth", value: "85%" },
    { icon: Star, label: "Average Rating", value: "4.9/5" },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 dark:from-slate-900 dark:via-slate-800/30 dark:to-purple-900/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div
        className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 mb-6 backdrop-blur-sm">
            <Quote className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Student Success Stories
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-slate-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
              Trusted by Learners
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful students who have transformed their careers with our expert-led courses and
            comprehensive learning platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${(index + 4) * 100}ms` }}
            >
              <Card className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-500/20" />
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-6">"{testimonial.content}"</p>
                  </div>

                  {/* Course Badge */}
                  <Badge
                    variant="outline"
                    className="mb-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700 text-xs"
                  >
                    {testimonial.course}
                  </Badge>

                  {/* Profile */}
                  <div className="flex items-center">
                    <div className="relative">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{testimonial.name}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {testimonial.role} at{" "}
                        <span className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
