import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "credentials"
      },
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    googleId: {
      type: String,
      sparse: true,
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    completedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    notifications: [
      {
        title: String,
        body: String,
        read: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    profile: {
      avatar: {
        type: String,
        default: "/placeholder-avatar.png",
      },
      bio: String,
      website: String,
      social: {
        twitter: String,
        linkedin: String,
        github: String,
      },
    },
  },
  {
    timestamps: true,
  },
)

export const User = mongoose.models.User || mongoose.model("User", userSchema)
