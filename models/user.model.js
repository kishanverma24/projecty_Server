import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },

    fullName: {
      type: String,
      required: [true, "FullName is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    linkedIn: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    resume: {
      type: String,
      default: "",
    },
    emailVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
