import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import projectRoute from "./routes/project.route.js";
import cookieParser from "cookie-parser";

// Load environment variables (if you still want to use other env vars like PORT or CORS_ORIGIN)
dotenv.config();

const app = express();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure CORS
const corsOptions = {
  origin: "https://projectybykv.netlify.app", // Your frontend URL, replace with the actual URL
  credentials: true, // Allow cookies and credentials
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization", "token"], // Allowed headers
};
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://projectybykv.netlify.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, token"
  );
  res.sendStatus(200); // Indicate successful preflight handling
});

// Hardcoded MongoDB connection URI
const uri =
  "mongodb+srv://mrkishan9151:<your_actual_password>@cluster0.q00hg.mongodb.net/projecty?retryWrites=true&w=majority";

// MongoDB connection using Mongoose
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Routes
app.use("/api/auth", authRoute); // Login, logout, register of user
app.use("/api/user", userRoute); // CRUD operations on users
app.use("/api/project", projectRoute); // CRUD operations on projects

// Start the server
app.listen(process.env.PORT, () => {
  connect(); // Make sure this connects to MongoDB using Mongoose
  console.log(`Backend server is running on port ${process.env.PORT}!`);
});
