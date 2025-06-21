const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/eduverse"

async function setupDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Create indexes for better performance
    const db = mongoose.connection.db

    // Users collection indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    console.log("Created unique index on users.email")

    // Courses collection indexes
    await db.collection("courses").createIndex({ category: 1, level: 1 })
    await db.collection("courses").createIndex({ featured: 1 })
    await db.collection("courses").createIndex({ instructor: 1 })
    await db.collection("courses").createIndex({ isPublished: 1 })
    console.log("Created indexes on courses collection")

    // Progress collection indexes
    await db.collection("progresses").createIndex({ user: 1, course: 1 }, { unique: true })
    await db.collection("progresses").createIndex({ user: 1 })
    await db.collection("progresses").createIndex({ course: 1 })
    console.log("Created indexes on progress collection")

    console.log("Database setup completed successfully!")
  } catch (error) {
    console.error("Error setting up database:", error)
  } finally {
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  }
}

// Run the setup function
setupDatabase()
