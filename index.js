import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import projectRoute from "./routes/project.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URl);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "token"],
};
app.use(cors(corsOptions));

// login, logout, register of user
app.use("/api/auth", authRoute);
// deleting and getting user by id
app.use("/api/user", userRoute);
// crud on project
app.use("/api/project", projectRoute);
app.listen(process.env.PORT, () => {
  connect();
  console.log("Backend server is running!");
});
