// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import userRoute from "./routes/user.route.js";
// import authRoute from "./routes/auth.route.js";
// import projectRoute from "./routes/project.route.js";
// import cookieParser from "cookie-parser";
// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware to parse JSON and cookies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Configure CORS
// const corsOptions = {
//   origin: process.env.CORS_ORIGIN, // Your frontend URL, e.g., https://projectybykv.netlify.app
//   credentials: true, // Allow cookies and credentials
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
//   allowedHeaders: ["Content-Type", "Authorization", "token"], // Allowed headers
// };
// app.use(cors(corsOptions));

// // Handle preflight requests explicitly
// app.options("*", (req, res) => {
//   res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, token"
//   );
//   res.sendStatus(200); // Indicate successful preflight handling
// });

// // // MongoDB connection
// // mongoose.set("strictQuery", true);
// // const connect = async () => {
// //   try {
// //     await mongoose.connect(process.env.MONGODB_URl);
// //     console.log("Connected to MongoDB!");
// //   } catch (error) {
// //     console.error("Error connecting to MongoDB:", error);
// //   }
// // };
// const uri =
//   "mongodb+srv://mrkishan9151:<db_password>@cluster0.q00hg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const client = new mongoose(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// // Routes
// app.use("/api/auth", authRoute); // Login, logout, register of user
// app.use("/api/user", userRoute); // CRUD operations on users
// app.use("/api/project", projectRoute); // CRUD operations on projects

// // Start the server
// app.listen(process.env.PORT, () => {
//   connect();
//   console.log(`Backend server is running on port ${process.env.PORT}!`);
// });

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import projectRoute from "./routes/project.route.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN, // Your frontend URL, e.g., https://projectybykv.netlify.app
  credentials: true, // Allow cookies and credentials
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization", "token"], // Allowed headers
};
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, token"
  );
  res.sendStatus(200); // Indicate successful preflight handling
});
const uri =
  "mongodb+srv://mrkishan9151:<db_password>@cluster0.q00hg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB connection using Mongoose
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
