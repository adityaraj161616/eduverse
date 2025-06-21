"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Star, Search, Filter, ArrowRight, BookOpen, Play } from "lucide-react"
import Image from "next/image"
import { VideoBackground } from "@/components/video-background"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

interface Course {
  _id: string
  title: string
  description: string
  category: string
  level: string
  thumbnail: string
  price: number
  isFree: boolean
  duration: string
  studentsCount: number
  rating: number
  instructor: string
}

const categories = [
  "All Categories",
  "Web Development",
  "Data Science",
  "Design",
  "Business",
  "Marketing",
  "Programming",
]

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]

const courseImages = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop&crop=center",
]

// Updated course prices to INR
const mockCourses: Course[] = [
  {
    _id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive bootcamp.",
    category: "Web Development",
    level: "Beginner",
    thumbnail: courseImages[0],
    price: 8299, // ₹8,299 (was $99)
    isFree: false,
    duration: "12 weeks",
    studentsCount: 1250,
    rating: 4.8,
    instructor: "John Doe",
  },
  {
    _id: "2",
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning with Python.",
    category: "Data Science",
    level: "Intermediate",
    thumbnail: courseImages[1],
    price: 0,
    isFree: true,
    duration: "8 weeks",
    studentsCount: 890,
    rating: 4.7,
    instructor: "Jane Smith",
  },
  {
    _id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and user experience design.",
    category: "Design",
    level: "Beginner",
    thumbnail: courseImages[2],
    price: 6599, // ₹6,599 (was $79)
    isFree: false,
    duration: "6 weeks",
    studentsCount: 567,
    rating: 4.9,
    instructor: "Mike Johnson",
  },
  {
    _id: "4",
    title: "Advanced React & Next.js",
    description: "Build modern web applications with React and Next.js.",
    category: "Web Development",
    level: "Advanced",
    thumbnail: courseImages[3],
    price: 10799, // ₹10,799 (was $129)
    isFree: false,
    duration: "10 weeks",
    studentsCount: 432,
    rating: 4.8,
    instructor: "Sarah Wilson",
  },
  {
    _id: "5",
    title: "Digital Marketing Mastery",
    description: "Learn SEO, social media marketing, and digital advertising strategies.",
    category: "Marketing",
    level: "Intermediate",
    thumbnail: courseImages[4],
    price: 0,
    isFree: true,
    duration: "7 weeks",
    studentsCount: 723,
    rating: 4.6,
    instructor: "David Brown",
  },
  {
    _id: "6",
    title: "Business Strategy & Leadership",
    description: "Develop strategic thinking and leadership skills for business success.",
    category: "Business",
    level: "Advanced",
    thumbnail: courseImages[5],
    price: 12399, // ₹12,399 (was $149)
    isFree: false,
    duration: "9 weeks",
    studentsCount: 298,
    rating: 4.7,
    instructor: "Lisa Davis",
  },
  {
    _id: "7",
    title: "Python Programming Fundamentals",
    description: "Learn Python programming from scratch with hands-on projects.",
    category: "Programming",
    level: "Beginner",
    thumbnail: courseImages[6],
    price: 4899, // ₹4,899 (was $59)
    isFree: false,
    duration: "8 weeks",
    studentsCount: 1100,
    rating: 4.6,
    instructor: "Alex Chen",
  },
  {
    _id: "8",
    title: "Machine Learning Basics",
    description: "Introduction to machine learning concepts and algorithms.",
    category: "Data Science",
    level: "Intermediate",
    thumbnail: courseImages[7],
    price: 7399, // ₹7,399 (was $89)
    isFree: false,
    duration: "10 weeks",
    studentsCount: 654,
    rating: 4.8,
    instructor: "Dr. Emily Rodriguez",
  },
  {
    _id: "9",
    title: "Graphic Design Essentials",
    description: "Master the fundamentals of graphic design and visual communication.",
    category: "Design",
    level: "Beginner",
    thumbnail: courseImages[8],
    price: 0,
    isFree: true,
    duration: "6 weeks",
    studentsCount: 876,
    rating: 4.5,
    instructor: "Maria Garcia",
  },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [priceFilter, setPriceFilter] = useState("All")

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Get search query from URL params
    const searchQuery = searchParams.get("search")
    if (searchQuery) {
      setSearchTerm(searchQuery)
    }

    fetchCourses()
  }, [searchParams])

  useEffect(() => {
    filterCourses()
  }, [courses, searchTerm, selectedCategory, selectedLevel, priceFilter])

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses")
      if (response.ok) {
        const data = await response.json()
        setCourses(data.courses || mockCourses)
      } else {
        setCourses(mockCourses)
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error)
      setCourses(mockCourses)
    } finally {
      setLoading(false)
    }
  }

  const filterCourses = () => {
    let filtered = courses.length > 0 ? courses : mockCourses

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.category.toLowerCase().includes(searchLower) ||
          course.instructor.toLowerCase().includes(searchLower),
      )
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "All Categories") {
      filtered = filtered.filter((course) => course.category === selectedCategory)
    }

    // Level filter
    if (selectedLevel && selectedLevel !== "All Levels") {
      filtered = filtered.filter((course) => course.level === selectedLevel)
    }

    // Price filter
    if (priceFilter === "Free") {
      filtered = filtered.filter((course) => course.isFree)
    } else if (priceFilter === "Paid") {
      filtered = filtered.filter((course) => !course.isFree)
    }

    setFilteredCourses(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All Categories")
    setSelectedLevel("All Levels")
    setPriceFilter("All")
  }

  const handleCourseClick = (courseId: string) => {
    console.log("Navigating to course:", courseId)
    router.push(`/course/${courseId}`)
  }

  const displayCourses = filteredCourses.length > 0 ? filteredCourses : courses.length > 0 ? courses : mockCourses

  if (loading) {
    return (
      <VideoBackground
        videoSrc={[
          "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139",
          "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        ]}
        fallbackImage="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8 pt-32">
            <div className="h-8 bg-white/20 rounded w-1/4 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-white/10 backdrop-blur-md">
                  <div className="h-48 bg-white/20 rounded-t-lg" />
                  <CardHeader>
                    <div className="h-4 bg-white/20 rounded w-3/4" />
                    <div className="h-3 bg-white/20 rounded w-1/2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </VideoBackground>
    )
  }

  return (
    <VideoBackground
      videoSrc={[
        "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139",
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      ]}
      fallbackImage="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop"
      className="min-h-screen"
    >
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-32"
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
            <BookOpen className="w-5 h-5 mr-2 text-green-400" />
            <span className="text-sm font-semibold text-white">explore our courses</span>
          </div>

          <h1 className="font-display text-large text-white mb-6">
            discover your next
            <br />
            <span className="gradient-text">learning adventure</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            explore our comprehensive collection of courses designed to help you achieve your learning goals.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-green-400"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48 h-12 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-full sm:w-48 h-12 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger className="w-full sm:w-48 h-12 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Prices</SelectItem>
                      <SelectItem value="Free">Free</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                <p className="text-white/80 font-medium">
                  Showing <span className="text-green-400 font-bold">{displayCourses.length}</span> courses
                  {searchTerm && <span className="ml-2 text-white/60">for "{searchTerm}"</span>}
                </p>
                <div className="flex gap-2">
                  {(searchTerm ||
                    selectedCategory !== "All Categories" ||
                    selectedLevel !== "All Levels" ||
                    priceFilter !== "All") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Clear Filters
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* No Results Message */}
        {displayCourses.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="text-white/60 text-lg mb-4">No courses found matching your criteria</div>
            <Button
              onClick={clearFilters}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCourses.map((course, index) => {
            const hoverAnimations = ["hover-slide-reveal", "hover-rotate-lift", "hover-morph"]
            const animationClass = hoverAnimations[index % 3]

            return (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full overflow-hidden bg-white/10 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  <div
                    className={`course-image-container ${animationClass} cursor-pointer`}
                    onClick={() => handleCourseClick(course._id)}
                  >
                    <Image
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      width={400}
                      height={250}
                      className="course-image w-full h-48 object-cover"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 hover:scale-110 transition-transform duration-200 cursor-pointer">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-40">
                    <Badge
                      variant={course.isFree ? "secondary" : "default"}
                      className={`shadow-lg ${course.isFree ? "bg-green-500 text-white" : "bg-blue-500 text-white"}`}
                    >
                      {course.isFree ? "Free" : `₹${course.price.toLocaleString()}`}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 z-40">
                    <Badge variant="outline" className="bg-white/90 shadow-lg border-white/50">
                      {course.level}
                    </Badge>
                  </div>

                  <div onClick={() => handleCourseClick(course._id)} className="cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs bg-white/10 border-green-400/50 text-green-400">
                          {course.category}
                        </Badge>
                        <div className="flex items-center text-sm text-white/80">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2 group-hover:text-green-400 transition-colors duration-300 text-lg leading-tight text-white">
                        {course.title}
                      </CardTitle>
                      <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">{course.description}</p>
                    </CardHeader>

                    <CardContent className="pb-4">
                      <div className="flex items-center justify-between text-sm text-white/70 mb-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-blue-400" />
                          <span className="font-medium">{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-green-400" />
                          <span className="font-medium">{course.studentsCount} students</span>
                        </div>
                      </div>
                      <p className="text-sm text-white/70">
                        By <span className="font-semibold text-green-400">{course.instructor}</span>
                      </p>
                    </CardContent>
                  </div>

                  <CardFooter className="pt-0">
                    <Button
                      className="w-full btn-primary group-hover:scale-105 transition-all duration-300 cursor-pointer hover:cursor-pointer"
                      onClick={() => handleCourseClick(course._id)}
                    >
                      <span className="flex items-center justify-center">
                        View Course
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </VideoBackground>
  )
}
