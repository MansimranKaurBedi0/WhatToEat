import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    // Food preference
    dietPreference: {
      type: String,
      enum: ["veg", "non-veg", "vegan", "jain"],
      default: "veg"
    },

    allergies: [
      {
        type: String
      }
    ],

    // Location
    location: {
      city: String,
      state: String,
      country: String
    },

    // Health Profile
    age: {
      type: Number
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"]
    },

    height: {
      type: Number
    },

    weight: {
      type: Number
    },

    activityLevel: {
      type: String,
      enum: ["low", "moderate", "high"]
    },

    goal: {
      type: String,
      enum: [
        "lose_weight",
        "gain_muscle",
        "maintain"
      ]
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", User);