// Centralized course data management
export interface CourseData {
  _id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  rating: number
  students: number
  price: number
  category: string
  thumbnail: string
  totalLessons: number
  isDemo?: boolean
}

export const demoCourses: CourseData[] = [
  {
    _id: "2",
    title: "Data Science with Python",
    description:
      "Master data analysis, visualization, and machine learning with Python from scratch to advanced level.",
    instructor: "Dr. Jane Smith",
    duration: "16h 35m",
    level: "Beginner",
    rating: 4.7,
    students: 8930,
    price: 0,
    category: "Data Science",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    totalLessons: 18,
    isDemo: true,
  },
  {
    _id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive bootcamp.",
    instructor: "Dr. Angela Yu",
    duration: "65 hours",
    level: "Beginner",
    rating: 4.8,
    students: 12340,
    price: 8299,
    category: "Web Development",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    totalLessons: 45,
    isDemo: true,
  },
]

export const getCourseById = (id: string): CourseData | null => {
  return demoCourses.find((course) => course._id === id) || null
}

export const getAllCourses = (): CourseData[] => {
  return demoCourses
}
