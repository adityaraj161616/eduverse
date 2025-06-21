"use client"

import { useEffect } from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Users, Star, Play, Check, BookOpen, ArrowLeft, Heart, Share2 } from "lucide-react"
import { getSession } from "next-auth/react" // Import getSession to declare session variable

interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  instructor: {
    name: string
    title: string
    company: string
    avatar: string
    rating: number
    students: number
    courses: number
  }
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: any[]
  students: number
  duration: string
  level: string
  language: string
  subtitles: string[]
  lastUpdated: string
  image: string
  category: string
  tags: string[]
  features: string[]
  curriculum: any[]
  requirements: string[]
  whatYouWillLearn: string[]
}

// Complete course data for all courses (converted to INR)
const courseData = {
  "1": {
    id: "1",
    title: "Complete Web Development Bootcamp",
    subtitle: "Master modern web development with React, Node.js, and cutting-edge technologies",
    description:
      "Transform your career with our comprehensive web development course. Learn from industry experts and build real-world projects that showcase your skills to potential employers.",
    longDescription:
      "This comprehensive web development bootcamp covers everything you need to know to become a full-stack developer. Starting with HTML, CSS, and JavaScript fundamentals, you'll progress through modern frameworks like React and Vue.js, backend development with Node.js and Express, database management with MongoDB and PostgreSQL, and deployment strategies using cloud platforms.",
    instructor: {
      name: "Sarah Johnson",
      title: "Senior Full Stack Developer",
      company: "Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      students: 45000,
      courses: 12,
    },
    price: 8299, // ₹8,299 (was $99)
    originalPrice: 16599, // ₹16,599 (was $199)
    discount: 50,
    rating: 4.8,
    reviews: [
      {
        id: 1,
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Absolutely fantastic course! Sarah explains everything so clearly and the projects are really practical. I landed my first developer job just 3 months after completing this course.",
      },
    ],
    students: 1250,
    duration: "12 weeks",
    level: "Beginner to Advanced",
    language: "English",
    subtitles: ["English", "Spanish", "French"],
    lastUpdated: "December 2024",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=center",
    category: "Web Development",
    tags: ["React", "Node.js", "JavaScript", "HTML", "CSS", "MongoDB"],
    features: [
      "24/7 Support",
      "Lifetime Access",
      "Certificate of Completion",
      "Mobile Access",
      "Downloadable Resources",
      "30-Day Money Back Guarantee",
    ],
    curriculum: [
      {
        title: "Getting Started",
        lessons: 8,
        duration: "2h 30m",
        topics: [
          { title: "Course Introduction", duration: "15m", type: "video", free: true },
          { title: "Setting up Development Environment", duration: "25m", type: "video", free: true },
          { title: "HTML Fundamentals", duration: "45m", type: "video", free: false },
          { title: "CSS Basics", duration: "35m", type: "video", free: false },
        ],
      },
    ],
    requirements: [
      "Basic computer skills",
      "No prior programming experience required",
      "A computer with internet connection",
      "Willingness to learn and practice",
    ],
    whatYouWillLearn: [
      "Build responsive websites from scratch",
      "Master React.js and modern JavaScript",
      "Create full-stack applications with Node.js",
      "Work with databases (MongoDB, PostgreSQL)",
      "Deploy applications to the cloud",
      "Understand version control with Git",
      "Build a professional portfolio",
      "Land your first developer job",
    ],
  },
  "2": {
    id: "2",
    title: "Data Science with Python",
    subtitle: "Master data analysis, visualization, and machine learning with Python",
    description:
      "Transform your career with comprehensive data science skills. Learn Python, pandas, NumPy, and machine learning from industry experts.",
    longDescription:
      "This comprehensive data science course covers everything from basic Python programming to advanced machine learning algorithms. You'll work with real datasets, build predictive models, and learn to extract insights from data using industry-standard tools and techniques.",
    instructor: {
      name: "Jane Smith",
      title: "Senior Data Scientist",
      company: "Microsoft",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      students: 32000,
      courses: 8,
    },
    price: 0,
    originalPrice: 12399, // ₹12,399 (was $149)
    discount: 100,
    rating: 4.7,
    reviews: [
      {
        id: 1,
        name: "Michael Brown",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        date: "1 week ago",
        comment:
          "Excellent free course! Jane explains complex concepts in a very understandable way. The hands-on projects are fantastic.",
      },
    ],
    students: 890,
    duration: "8 weeks",
    level: "Intermediate",
    language: "English",
    subtitles: ["English", "Spanish"],
    lastUpdated: "December 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    category: "Data Science",
    tags: ["Python", "Machine Learning", "Data Analysis", "Pandas", "NumPy"],
    features: [
      "Free Course",
      "Lifetime Access",
      "Certificate",
      "Community Support",
      "Real Projects",
      "Career Guidance",
    ],
    curriculum: [
      {
        title: "Python Fundamentals",
        lessons: 10,
        duration: "3h 15m",
        topics: [
          { title: "Python Basics", duration: "20m", type: "video", free: true },
          { title: "Data Structures", duration: "30m", type: "video", free: true },
          { title: "Working with Libraries", duration: "25m", type: "video", free: false },
        ],
      },
    ],
    requirements: ["Basic programming knowledge", "Computer with Python installed", "Mathematical thinking"],
    whatYouWillLearn: [
      "Python programming for data science",
      "Data analysis with pandas and NumPy",
      "Data visualization with matplotlib and seaborn",
      "Machine learning fundamentals",
      "Statistical analysis techniques",
      "Working with real datasets",
    ],
  },
  "3": {
    id: "3",
    title: "UI/UX Design Fundamentals",
    subtitle: "Learn the principles of user interface and user experience design",
    description: "Master design thinking and create beautiful, user-friendly interfaces that users love.",
    longDescription:
      "Learn the complete UI/UX design process from user research to prototyping to final implementation. This course covers design principles, user psychology, and modern design tools to help you create exceptional user experiences.",
    instructor: {
      name: "Mike Johnson",
      title: "Senior UX Designer",
      company: "Apple",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      students: 25000,
      courses: 6,
    },
    price: 6599, // ₹6,599 (was $79)
    originalPrice: 13199, // ₹13,199 (was $159)
    discount: 50,
    rating: 4.9,
    reviews: [
      {
        id: 1,
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        date: "3 days ago",
        comment:
          "Amazing course! Mike's teaching style is incredible and the projects are so practical. I feel confident in my design skills now.",
      },
    ],
    students: 567,
    duration: "6 weeks",
    level: "Beginner",
    language: "English",
    subtitles: ["English"],
    lastUpdated: "December 2024",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop&crop=center",
    category: "Design",
    tags: ["UI Design", "UX Design", "Figma", "Prototyping"],
    features: ["Design Tools Access", "Portfolio Projects", "Certificate", "1-on-1 Mentorship", "Design Resources"],
    curriculum: [
      {
        title: "Design Principles",
        lessons: 8,
        duration: "2h 45m",
        topics: [
          { title: "Introduction to UI/UX", duration: "18m", type: "video", free: true },
          { title: "Design Thinking Process", duration: "22m", type: "video", free: true },
          { title: "Color Theory", duration: "28m", type: "video", free: false },
        ],
      },
    ],
    requirements: ["No prior experience needed", "Computer with internet", "Creative mindset"],
    whatYouWillLearn: [
      "Design principles and theory",
      "User research and testing",
      "Wireframing and prototyping",
      "Design systems creation",
      "Figma and design tools mastery",
      "Portfolio development",
    ],
  },
  "4": {
    id: "4",
    title: "Advanced React & Next.js",
    subtitle: "Build modern web applications with React and Next.js",
    description:
      "Take your React skills to the next level with advanced patterns, Next.js, and modern development practices.",
    longDescription:
      "Master advanced React concepts and Next.js framework to build production-ready applications. Learn server-side rendering, static site generation, API routes, and deployment strategies.",
    instructor: {
      name: "Sarah Wilson",
      title: "React Core Team Member",
      company: "Meta",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      students: 18000,
      courses: 5,
    },
    price: 10799, // ₹10,799 (was $129)
    originalPrice: 20699, // ₹20,699 (was $249)
    discount: 48,
    rating: 4.8,
    reviews: [],
    students: 432,
    duration: "10 weeks",
    level: "Advanced",
    language: "English",
    subtitles: ["English", "Spanish"],
    lastUpdated: "December 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    category: "Web Development",
    tags: ["React", "Next.js", "TypeScript", "Server-Side Rendering"],
    features: ["Advanced Projects", "Code Reviews", "Certificate", "Job Placement Support"],
    curriculum: [],
    requirements: ["Solid React knowledge", "JavaScript ES6+", "Basic Node.js understanding"],
    whatYouWillLearn: [
      "Advanced React patterns",
      "Next.js framework mastery",
      "Server-side rendering",
      "Performance optimization",
      "TypeScript integration",
      "Production deployment",
    ],
  },
  "5": {
    id: "5",
    title: "Digital Marketing Mastery",
    subtitle: "Learn SEO, social media marketing, and digital advertising strategies",
    description: "Master digital marketing strategies to grow businesses and build your marketing career.",
    longDescription:
      "Comprehensive digital marketing course covering SEO, social media marketing, content marketing, email marketing, and paid advertising across all major platforms.",
    instructor: {
      name: "David Brown",
      title: "Digital Marketing Director",
      company: "HubSpot",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.6,
      students: 28000,
      courses: 9,
    },
    price: 0,
    originalPrice: 16599, // ₹16,599 (was $199)
    discount: 100,
    rating: 4.6,
    reviews: [],
    students: 723,
    duration: "7 weeks",
    level: "Intermediate",
    language: "English",
    subtitles: ["English", "Spanish", "French"],
    lastUpdated: "December 2024",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&crop=center",
    category: "Marketing",
    tags: ["SEO", "Social Media", "Content Marketing", "Google Ads"],
    features: ["Free Course", "Marketing Tools", "Certificate", "Case Studies"],
    curriculum: [],
    requirements: ["Basic computer skills", "Interest in marketing", "Business mindset"],
    whatYouWillLearn: [
      "SEO optimization techniques",
      "Social media strategy",
      "Content marketing",
      "Email marketing campaigns",
      "Paid advertising (Google, Facebook)",
      "Analytics and reporting",
    ],
  },
}

export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const course = courseData[courseId as keyof typeof courseData]
  const [activeTab, setActiveTab] = useState("overview")
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [session, setSession] = useState(null) // Declare session variable

  // Fetch session data on component mount
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession()
      setSession(sessionData)
    }
    fetchSession()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const handleEnrollClick = async () => {
    if (course.price === 0) {
      // Free course - enroll directly
      try {
        const response = await fetch("/api/courses/enroll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: courseId,
            userId: session?.user?.email || "guest@example.com",
          }),
        })

        if (response.ok) {
          setIsEnrolled(true)
          router.push(`/course/${courseId}/learn`)
        } else {
          // If API fails, still allow access to free course
          router.push(`/course/${courseId}/learn`)
        }
      } catch (error) {
        console.error("Enrollment error:", error)
        // Still allow access to free course
        router.push(`/course/${courseId}/learn`)
      }
    } else {
      // Paid course - go to checkout
      router.push(`/checkout/${courseId}`)
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Course Not Found</h1>
          <p className="text-white/60 mb-6">The course you're looking for doesn't exist or has been removed.</p>
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
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/courses">
              <Button variant="ghost" className="text-white hover:bg-white/10 p-2">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Courses
              </Button>
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-2 ${isFavorited ? "text-red-400" : "text-white/60"} hover:bg-white/10`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:bg-white/10 p-2">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div ref={ref} className="pt-20">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02]">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Course Info */}
                <motion.div variants={itemVariants}>
                  <div className="mb-6">
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white mb-4">
                      {course.category}
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6 font-display">{course.title}</h1>
                    <p className="text-xl text-white/70 leading-relaxed mb-8">{course.subtitle}</p>
                  </div>

                  {/* Course Stats */}
                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-white/60 ml-1">({course.reviews.length} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-blue-400 mr-2" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-green-400 mr-2" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Instructor */}
                  <motion.div
                    className="flex items-center mb-8"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{course.instructor.name}</p>
                      <p className="text-sm text-white/60">
                        {course.instructor.title} at {course.instructor.company}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Course Preview & Pricing */}
                <motion.div variants={itemVariants}>
                  <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
                    <div className="relative">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/40"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </motion.button>
                      </motion.div>
                    </div>

                    <CardContent className="p-8">
                      {/* Pricing */}
                      <div className="mb-6">
                        <div className="flex items-center mb-2">
                          <span className="text-3xl font-light text-white">
                            {course.price === 0 ? "Free" : `₹${course.price.toLocaleString()}`}
                          </span>
                          {course.originalPrice > course.price && (
                            <>
                              <span className="text-lg text-white/50 line-through ml-3">
                                ₹{course.originalPrice.toLocaleString()}
                              </span>
                              <Badge className="ml-3 bg-green-500 text-white">{course.discount}% OFF</Badge>
                            </>
                          )}
                        </div>
                        {course.price > 0 && <p className="text-sm text-white/60">Limited time offer</p>}
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-4 mb-6">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            className="w-full bg-white text-black hover:bg-gray-100 py-6 text-lg font-medium rounded-2xl"
                            onClick={handleEnrollClick}
                          >
                            {isEnrolled ? "Continue Learning" : course.price === 0 ? "Enroll Free" : "Enroll Now"}
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            className="w-full border-white/20 text-white hover:bg-white/10 py-6 text-lg rounded-2xl"
                          >
                            Add to Wishlist
                          </Button>
                        </motion.div>
                      </div>

                      {/* Features */}
                      <div className="space-y-3">
                        {course.features.slice(0, 4).map((feature, index) => (
                          <motion.div
                            key={feature}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Check className="w-4 h-4 text-green-400 mr-3" />
                            <span className="text-sm text-white/80">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Course Content */}
          <section className="py-20 bg-black">
            <div className="container mx-auto px-6 lg:px-12">
              <motion.div variants={itemVariants}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-2">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="curriculum"
                      className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
                    >
                      Curriculum
                    </TabsTrigger>
                    <TabsTrigger
                      value="instructor"
                      className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
                    >
                      Instructor
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
                    >
                      Reviews
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div>
                        <h3 className="text-2xl font-light mb-6">What you'll learn</h3>
                        <div className="space-y-4">
                          {course.whatYouWillLearn.map((item, index) => (
                            <motion.div
                              key={index}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-white/80">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-light mb-6">Requirements</h3>
                        <div className="space-y-4">
                          {course.requirements.map((req, index) => (
                            <motion.div
                              key={index}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-white/40 rounded-full mr-3 mt-2 flex-shrink-0" />
                              <span className="text-white/80">{req}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-12">
                      <h3 className="text-2xl font-light mb-6">Course Description</h3>
                      <p className="text-white/70 leading-relaxed text-lg">{course.longDescription}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="curriculum" className="mt-12">
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <h3 className="text-xl font-light text-white/60 mb-2">Curriculum Coming Soon</h3>
                      <p className="text-white/40">Detailed curriculum will be available after enrollment.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="instructor" className="mt-12">
                    <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-6">
                          <Avatar className="w-24 h-24">
                            <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-2xl">{course.instructor.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="text-2xl font-light mb-2">{course.instructor.name}</h3>
                            <p className="text-white/70 mb-4">
                              {course.instructor.title} at {course.instructor.company}
                            </p>
                            <div className="grid grid-cols-3 gap-6 mb-6">
                              <div className="text-center">
                                <div className="text-2xl font-light text-white mb-1">{course.instructor.rating}</div>
                                <div className="text-sm text-white/60">Instructor Rating</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-light text-white mb-1">
                                  {course.instructor.students.toLocaleString()}
                                </div>
                                <div className="text-sm text-white/60">Students</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-light text-white mb-1">{course.instructor.courses}</div>
                                <div className="text-sm text-white/60">Courses</div>
                              </div>
                            </div>
                            <p className="text-white/70 leading-relaxed">
                              {course.instructor.name} is an experienced professional with years of industry experience.
                              They are passionate about teaching and helping students achieve their learning goals.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-12">
                    {course.reviews.length > 0 ? (
                      <div className="space-y-6">
                        {course.reviews.map((review, index) => (
                          <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                              <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                  <Avatar className="w-12 h-12">
                                    <AvatarImage src={review.avatar || "/placeholder.svg"} />
                                    <AvatarFallback>{review.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="font-medium">{review.name}</h4>
                                      <span className="text-sm text-white/60">{review.date}</span>
                                    </div>
                                    <div className="flex items-center mb-3">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < review.rating ? "text-yellow-400 fill-current" : "text-white/20"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <p className="text-white/70 leading-relaxed">{review.comment}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Star className="w-16 h-16 text-white/40 mx-auto mb-4" />
                        <h3 className="text-xl font-light text-white/60 mb-2">No Reviews Yet</h3>
                        <p className="text-white/40">Be the first to review this course!</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
