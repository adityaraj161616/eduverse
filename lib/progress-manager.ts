// Progress management system
export interface LessonProgress {
  lessonId: string
  completed: boolean
  completedAt?: string
  timeSpent?: number
}

export interface CourseProgress {
  courseId: string
  currentSection: number
  currentLesson: number
  completedLessons: string[]
  overallProgress: number
  lastAccessed: string
  totalTimeSpent: number
  isEnrolled: boolean
}

export interface EnrolledCourse {
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
  progress: number
  completedLessons: number
  lastAccessed: string
  timeSpent: number
  enrolledAt: string
}

class ProgressManager {
  private static instance: ProgressManager
  private readonly ENROLLED_COURSES_KEY = "enrolled-courses"
  private readonly COURSE_PROGRESS_KEY = "course-progress"

  static getInstance(): ProgressManager {
    if (!ProgressManager.instance) {
      ProgressManager.instance = new ProgressManager()
    }
    return ProgressManager.instance
  }

  // Enroll in a course
  enrollInCourse(courseData: any): boolean {
    try {
      const enrolledCourses = this.getEnrolledCourses()

      // Check if already enrolled
      if (enrolledCourses.some((course) => course._id === courseData._id)) {
        return false // Already enrolled
      }

      const newEnrollment: EnrolledCourse = {
        _id: courseData._id,
        title: courseData.title,
        description: courseData.description,
        instructor: courseData.instructor,
        duration: courseData.duration,
        level: courseData.level,
        rating: courseData.rating,
        students: courseData.students,
        price: courseData.price || 0,
        category: courseData.category,
        thumbnail: courseData.thumbnail,
        totalLessons: courseData.totalLessons,
        progress: 0,
        completedLessons: 0,
        lastAccessed: new Date().toISOString().split("T")[0],
        timeSpent: 0,
        enrolledAt: new Date().toISOString().split("T")[0],
      }

      enrolledCourses.push(newEnrollment)
      localStorage.setItem(this.ENROLLED_COURSES_KEY, JSON.stringify(enrolledCourses))

      // Initialize course progress
      this.initializeCourseProgress(courseData._id)

      // Dispatch event for UI updates
      window.dispatchEvent(new CustomEvent("courseEnrolled", { detail: newEnrollment }))

      return true
    } catch (error) {
      console.error("Error enrolling in course:", error)
      return false
    }
  }

  // Get all enrolled courses
  getEnrolledCourses(): EnrolledCourse[] {
    try {
      const stored = localStorage.getItem(this.ENROLLED_COURSES_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error getting enrolled courses:", error)
      return []
    }
  }

  // Initialize course progress
  private initializeCourseProgress(courseId: string): void {
    const progressKey = `${this.COURSE_PROGRESS_KEY}-${courseId}`
    const existingProgress = localStorage.getItem(progressKey)

    if (!existingProgress) {
      const initialProgress: CourseProgress = {
        courseId,
        currentSection: 0,
        currentLesson: 0,
        completedLessons: [],
        overallProgress: 0,
        lastAccessed: new Date().toISOString(),
        totalTimeSpent: 0,
        isEnrolled: true,
      }
      localStorage.setItem(progressKey, JSON.stringify(initialProgress))
    }
  }

  // Get course progress
  getCourseProgress(courseId: string): CourseProgress | null {
    try {
      const progressKey = `${this.COURSE_PROGRESS_KEY}-${courseId}`
      const stored = localStorage.getItem(progressKey)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error("Error getting course progress:", error)
      return null
    }
  }

  // Update course progress
  updateCourseProgress(courseId: string, updates: Partial<CourseProgress>): void {
    try {
      const progressKey = `${this.COURSE_PROGRESS_KEY}-${courseId}`
      const currentProgress = this.getCourseProgress(courseId)

      if (currentProgress) {
        const updatedProgress = {
          ...currentProgress,
          ...updates,
          lastAccessed: new Date().toISOString(),
        }
        localStorage.setItem(progressKey, JSON.stringify(updatedProgress))

        // Update enrolled courses list
        this.updateEnrolledCourseProgress(courseId, updatedProgress)
      }
    } catch (error) {
      console.error("Error updating course progress:", error)
    }
  }

  // Mark lesson as complete
  markLessonComplete(courseId: string, lessonId: string, totalLessons: number): void {
    const progress = this.getCourseProgress(courseId)
    if (!progress) return

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId)
      progress.overallProgress = Math.round((progress.completedLessons.length / totalLessons) * 100)
      progress.totalTimeSpent += 2.5 // Estimate 2.5 hours per lesson

      this.updateCourseProgress(courseId, progress)
    }
  }

  // Update enrolled course progress
  private updateEnrolledCourseProgress(courseId: string, progress: CourseProgress): void {
    const enrolledCourses = this.getEnrolledCourses()
    const courseIndex = enrolledCourses.findIndex((course) => course._id === courseId)

    if (courseIndex !== -1) {
      enrolledCourses[courseIndex] = {
        ...enrolledCourses[courseIndex],
        progress: progress.overallProgress,
        completedLessons: progress.completedLessons.length,
        lastAccessed: new Date().toISOString().split("T")[0],
        timeSpent: Math.round(progress.totalTimeSpent),
      }
      localStorage.setItem(this.ENROLLED_COURSES_KEY, JSON.stringify(enrolledCourses))
    }
  }

  // Check if enrolled in course
  isEnrolledInCourse(courseId: string): boolean {
    const enrolledCourses = this.getEnrolledCourses()
    return enrolledCourses.some((course) => course._id === courseId)
  }

  // Get learning statistics
  getLearningStats() {
    const enrolledCourses = this.getEnrolledCourses()
    const completedCourses = enrolledCourses.filter((course) => course.progress === 100)
    const totalHours = enrolledCourses.reduce((total, course) => total + course.timeSpent, 0)
    const overallProgress =
      enrolledCourses.length > 0
        ? Math.round(enrolledCourses.reduce((total, course) => total + course.progress, 0) / enrolledCourses.length)
        : 0

    return {
      totalCourses: enrolledCourses.length,
      completedCourses: completedCourses.length,
      totalHours,
      overallProgress,
      currentStreak: Math.min(completedCourses.length * 3, 30),
      achievements: completedCourses.length + Math.floor(totalHours / 10),
    }
  }
}

export const progressManager = ProgressManager.getInstance()
