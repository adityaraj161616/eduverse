const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// Import models (you'll need to adjust paths based on your structure)
const User = require("../models/user")
const Course = require("../models/course")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/eduverse"

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Course.deleteMany({})
    console.log("Cleared existing data")

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 12)
    const admin = await User.create({
      name: "Admin User",
      email: "admin@eduverse.com",
      password: adminPassword,
      role: "admin",
    })

    // Create test students
    const studentPassword = await bcrypt.hash("student123", 12)
    const students = await User.create([
      {
        name: "John Doe",
        email: "john@example.com",
        password: studentPassword,
        role: "student",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: studentPassword,
        role: "student",
      },
      {
        name: "Mike Johnson",
        email: "mike@example.com",
        password: studentPassword,
        role: "student",
      },
    ])

    // Create sample courses
    const courses = await Course.create([
      {
        title: "Complete Web Development Bootcamp",
        description:
          "Learn HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive bootcamp. Build real-world projects and become a full-stack developer.",
        category: "Web Development",
        level: "Beginner",
        thumbnail: "/placeholder.svg?height=200&width=400",
        price: 99,
        isFree: false,
        featured: true,
        duration: "12 weeks",
        requirements: [
          "No prior programming experience required",
          "A computer with internet connection",
          "Willingness to learn and practice",
        ],
        whatYouWillLearn: [
          "Build responsive websites with HTML, CSS, and JavaScript",
          "Create dynamic web applications with React",
          "Develop backend APIs with Node.js",
          "Deploy applications to the cloud",
          "Work with databases and user authentication",
        ],
        lessons: [
          {
            title: "Introduction to Web Development",
            description: "Overview of web development and what you'll learn in this course.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            duration: "15:30",
            order: 1,
            isPreview: true,
          },
          {
            title: "HTML Fundamentals",
            description: "Learn the basics of HTML and how to structure web pages.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            duration: "25:45",
            order: 2,
            isPreview: false,
          },
          {
            title: "CSS Styling",
            description: "Master CSS to style your web pages and make them beautiful.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            duration: "30:20",
            order: 3,
            isPreview: false,
          },
        ],
        instructor: admin._id,
        rating: 4.8,
        isPublished: true,
      },
      {
        title: "Data Science with Python",
        description:
          "Master data analysis, visualization, and machine learning with Python. Learn pandas, numpy, matplotlib, and scikit-learn.",
        category: "Data Science",
        level: "Intermediate",
        thumbnail: "/placeholder.svg?height=200&width=400",
        price: 0,
        isFree: true,
        featured: true,
        duration: "8 weeks",
        requirements: [
          "Basic Python knowledge",
          "Understanding of mathematics and statistics",
          "Jupyter Notebook installed",
        ],
        whatYouWillLearn: [
          "Data manipulation with pandas",
          "Data visualization with matplotlib and seaborn",
          "Statistical analysis and hypothesis testing",
          "Machine learning algorithms",
          "Real-world data science projects",
        ],
        lessons: [
          {
            title: "Introduction to Data Science",
            description: "What is data science and why it matters.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            duration: "20:15",
            order: 1,
            isPreview: true,
          },
          {
            title: "Python for Data Science",
            description: "Essential Python libraries for data science.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            duration: "35:30",
            order: 2,
            isPreview: false,
          },
        ],
        instructor: admin._id,
        rating: 4.7,
        isPublished: true,
      },
      {
        title: "UI/UX Design Fundamentals",
        description:
          "Learn the principles of user interface and user experience design. Create beautiful and functional designs.",
        category: "Design",
        level: "Beginner",
        thumbnail: "/placeholder.svg?height=200&width=400",
        price: 79,
        isFree: false,
        featured: true,
        duration: "6 weeks",
        requirements: [
          "No design experience required",
          "Access to design tools (Figma recommended)",
          "Creative mindset",
        ],
        whatYouWillLearn: [
          "Design thinking process",
          "User research and personas",
          "Wireframing and prototyping",
          "Visual design principles",
          "Usability testing",
        ],
        lessons: [
          {
            title: "Introduction to UI/UX Design",
            description: "Understanding the difference between UI and UX.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            duration: "18:45",
            order: 1,
            isPreview: true,
          },
        ],
        instructor: admin._id,
        rating: 4.9,
        isPublished: true,
      },
      {
        title: "Digital Marketing Mastery",
        description:
          "Learn SEO, social media marketing, and digital advertising strategies to grow your business online.",
        category: "Marketing",
        level: "Intermediate",
        thumbnail: "/placeholder.svg?height=200&width=400",
        price: 0,
        isFree: true,
        featured: false,
        duration: "7 weeks",
        requirements: [
          "Basic understanding of marketing",
          "Access to social media platforms",
          "Google Analytics account",
        ],
        whatYouWillLearn: [
          "Search engine optimization (SEO)",
          "Social media marketing strategies",
          "Google Ads and Facebook Ads",
          "Email marketing campaigns",
          "Analytics and performance tracking",
        ],
        lessons: [
          {
            title: "Digital Marketing Overview",
            description: "Introduction to digital marketing channels.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            duration: "22:30",
            order: 1,
            isPreview: true,
          },
        ],
        instructor: admin._id,
        rating: 4.6,
        isPublished: true,
      },
      {
        title: "Business Strategy & Leadership",
        description: "Develop strategic thinking and leadership skills for business success in the modern world.",
        category: "Business",
        level: "Advanced",
        thumbnail: "/placeholder.svg?height=200&width=400",
        price: 149,
        isFree: false,
        featured: false,
        duration: "9 weeks",
        requirements: ["Business experience preferred", "Leadership role or aspiration", "Strategic thinking mindset"],
        whatYouWillLearn: [
          "Strategic planning and execution",
          "Leadership and team management",
          "Financial analysis and budgeting",
          "Market analysis and competition",
          "Change management",
        ],
        lessons: [
          {
            title: "Strategic Thinking Fundamentals",
            description: "How to think strategically about business challenges.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            duration: "28:15",
            order: 1,
            isPreview: true,
          },
        ],
        instructor: admin._id,
        rating: 4.7,
        isPublished: true,
      },
      {
        title: "Advanced React & Next.js",
        description:
          "Build modern web applications with React and Next.js. Learn advanced patterns and best practices.",
        category: "Web Development",
        level: "Advanced",
        thumbnail: "/placeholder.svg?height=200&width=400",
        price: 129,
        isFree: false,
        featured: true,
        duration: "10 weeks",
        requirements: [
          "Solid JavaScript knowledge",
          "Basic React experience",
          "Understanding of web development concepts",
        ],
        whatYouWillLearn: [
          "Advanced React patterns and hooks",
          "Next.js App Router and Server Components",
          "State management with Zustand/Redux",
          "Performance optimization techniques",
          "Testing React applications",
        ],
        lessons: [
          {
            title: "Advanced React Concepts",
            description: "Deep dive into React hooks and patterns.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            duration: "32:45",
            order: 1,
            isPreview: true,
          },
        ],
        instructor: admin._id,
        rating: 4.8,
        isPublished: true,
      },
    ])

    console.log("Database seeded successfully!")
    console.log(`Created ${courses.length} courses and ${students.length + 1} users`)

    console.log("\n--- Test Accounts ---")
    console.log("Admin: admin@eduverse.com / admin123")
    console.log("Student: john@example.com / student123")
    console.log("Student: jane@example.com / student123")
    console.log("Student: mike@example.com / student123")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  }
}

// Run the seed function
seedDatabase()
