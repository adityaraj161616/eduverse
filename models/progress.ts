import mongoose from "mongoose"

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLessons: [
      {
        lesson: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: Date,
    watchTime: {
      type: Number,
      default: 0, // in minutes
    },
  },
  {
    timestamps: true,
  },
)

// Compound index to ensure one progress record per user per course
progressSchema.index({ user: 1, course: 1 }, { unique: true })

export const Progress = mongoose.models.Progress || mongoose.model("Progress", progressSchema)
