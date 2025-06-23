const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/eduverse"
    await mongoose.connect(mongoUri)

    console.log("Connected to MongoDB for seeding")

    const db = mongoose.connection.db

    // Clear existing data
    await db.collection("users").deleteMany({})
    await db.collection("courses").deleteMany({})
    await db.collection("virtualclasses").deleteMany({})
    await db.collection("achievements").deleteMany({})

    console.log("Cleared existing data")

    // Seed users
    const hashedPassword = await bcrypt.hash("password123", 12)
    const users = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: "John Doe",
        email: "john@example.com",
        username: "johndoe",
        password: hashedPassword,
        role: "student",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Sarah Johnson",
        email: "sarah@example.com",
        username: "sarahjohnson",
        password: hashedPassword,
        role: "instructor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Admin User",
        email: "admin@example.com",
        username: "admin",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("users").insertMany(users)
    console.log("Seeded users")

    // Seed courses
    const courses = [
      {
        _id: new mongoose.Types.ObjectId(),
        title: "Advanced React Development",
        description: "Master advanced React concepts and patterns",
        instructor: "Sarah Johnson",
        instructorId: users[1]._id,
        price: 99.99,
        duration: "8 weeks",
        level: "Advanced",
        category: "Web Development",
        image: "/placeholder.svg?height=200&width=300",
        lessons: [
          { title: "React Hooks Deep Dive", duration: "45 min", completed: false },
          { title: "Context API and State Management", duration: "60 min", completed: false },
          { title: "Performance Optimization", duration: "50 min", completed: false },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        title: "Machine Learning Fundamentals",
        description: "Introduction to machine learning concepts and algorithms",
        instructor: "Dr. Michael Chen",
        instructorId: users[1]._id,
        price: 149.99,
        duration: "12 weeks",
        level: "Beginner",
        category: "Data Science",
        image: "/placeholder.svg?height=200&width=300",
        lessons: [
          { title: "Introduction to ML", duration: "40 min", completed: false },
          { title: "Linear Regression", duration: "55 min", completed: false },
          { title: "Classification Algorithms", duration: "65 min", completed: false },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("courses").insertMany(courses)
    console.log("Seeded courses")

    // Seed virtual classes
    const virtualClasses = [
      {
        _id: new mongoose.Types.ObjectId(),
        title: "Advanced React Patterns",
        instructor: "Sarah Johnson",
        instructorId: users[1]._id,
        instructorAvatar: "/placeholder-avatar.png",
        date: "2024-01-15",
        time: "10:00 AM",
        duration: 90,
        participants: 24,
        maxParticipants: 50,
        status: "live",
        description: "Deep dive into advanced React patterns and best practices",
        subject: "Web Development",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        title: "Machine Learning Fundamentals",
        instructor: "Dr. Michael Chen",
        instructorId: users[1]._id,
        instructorAvatar: "/placeholder-avatar.png",
        date: "2024-01-16",
        time: "2:00 PM",
        duration: 120,
        participants: 0,
        maxParticipants: 30,
        status: "upcoming",
        description: "Introduction to machine learning concepts and algorithms",
        subject: "Data Science",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("virtualclasses").insertMany(virtualClasses)
    console.log("Seeded virtual classes")

    // Seed achievements
    const achievements = [
      {
        _id: new mongoose.Types.ObjectId(),
        title: "First Course Complete",
        description: "Completed your first course",
        icon: "🎓",
        rarity: "common",
        xpReward: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        title: "Study Streak Master",
        description: "15 days consecutive learning",
        icon: "🔥",
        rarity: "rare",
        xpReward: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        title: "Speed Learner",
        description: "Completed 5 courses in a month",
        icon: "⚡",
        rarity: "epic",
        xpReward: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("achievements").insertMany(achievements)
    console.log("Seeded achievements")

    console.log("Database seeding completed successfully!")
  } catch (error) {
    console.error("Database seeding failed:", error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

seedDatabase()
