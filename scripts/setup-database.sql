-- EduVerse Database Setup Script
-- This script creates the initial database structure for MongoDB equivalent operations

-- Note: This is a reference SQL script for understanding the data structure
-- The actual implementation uses MongoDB with Mongoose ODM

-- Users Collection Structure
-- {
--   _id: ObjectId,
--   name: String,
--   email: String (unique),
--   password: String (hashed),
--   role: String (enum: 'student', 'admin'),
--   enrolledCourses: [ObjectId],
--   completedCourses: [ObjectId],
--   notifications: [{
--     title: String,
--     body: String,
--     read: Boolean,
--     createdAt: Date
--   }],
--   profile: {
--     avatar: String,
--     bio: String,
--     website: String,
--     social: {
--       twitter: String,
--       linkedin: String,
--       github: String
--     }
--   },
--   createdAt: Date,
--   updatedAt: Date
-- }

-- Courses Collection Structure
-- {
--   _id: ObjectId,
--   title: String,
--   description: String,
--   category: String (enum),
--   level: String (enum),
--   thumbnail: String,
--   videoUrl: String,
--   price: Number,
--   isFree: Boolean,
--   featured: Boolean,
--   duration: String,
--   requirements: [String],
--   whatYouWillLearn: [String],
--   lessons: [{
--     _id: ObjectId,
--     title: String,
--     description: String,
--     videoUrl: String,
--     duration: String,
--     order: Number,
--     isPreview: Boolean
--   }],
--   instructor: ObjectId (ref: User),
--   studentsEnrolled: [ObjectId],
--   rating: Number,
--   reviews: [{
--     user: ObjectId (ref: User),
--     rating: Number,
--     comment: String,
--     createdAt: Date
--   }],
--   isPublished: Boolean,
--   createdAt: Date,
--   updatedAt: Date
-- }

-- Progress Collection Structure
-- {
--   _id: ObjectId,
--   user: ObjectId (ref: User),
--   course: ObjectId (ref: Course),
--   completedLessons: [{
--     lesson: ObjectId,
--     completedAt: Date
--   }],
--   progress: Number (0-100),
--   lastAccessed: Date,
--   isCompleted: Boolean,
--   completedAt: Date,
--   watchTime: Number (minutes),
--   createdAt: Date,
--   updatedAt: Date
-- }

-- Indexes for optimal performance
-- db.users.createIndex({ "email": 1 }, { unique: true })
-- db.courses.createIndex({ "category": 1, "level": 1 })
-- db.courses.createIndex({ "featured": 1 })
-- db
