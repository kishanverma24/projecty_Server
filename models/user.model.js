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
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    linkedIn: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// export default mongoose.model("User", userSchema);
export const User = mongoose.model("User", userSchema);
