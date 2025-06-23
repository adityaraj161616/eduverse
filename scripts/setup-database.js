const mongoose = require("mongoose")

async function setupDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/eduverse"
    await mongoose.connect(mongoUri)

    console.log("Connected to MongoDB")

    // Create collections if they don't exist
    const collections = ["users", "courses", "progress", "virtualclasses", "achievements", "payments"]

    for (const collectionName of collections) {
      try {
        await mongoose.connection.db.createCollection(collectionName)
        console.log(`Created collection: ${collectionName}`)
      } catch (error) {
        if (error.code === 48) {
          console.log(`Collection ${collectionName} already exists`)
        } else {
          console.error(`Error creating collection ${collectionName}:`, error.message)
        }
      }
    }

    // Create indexes for better performance
    const db = mongoose.connection.db

    // User indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("users").createIndex({ username: 1 }, { unique: true })

    // Course indexes
    await db.collection("courses").createIndex({ title: 1 })
    await db.collection("courses").createIndex({ category: 1 })
    await db.collection("courses").createIndex({ instructor: 1 })

    // Progress indexes
    await db.collection("progress").createIndex({ userId: 1, courseId: 1 }, { unique: true })

    // Virtual classes indexes
    await db.collection("virtualclasses").createIndex({ date: 1 })
    await db.collection("virtualclasses").createIndex({ instructor: 1 })

    console.log("Database setup completed successfully!")
  } catch (error) {
    console.error("Database setup failed:", error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

setupDatabase()
