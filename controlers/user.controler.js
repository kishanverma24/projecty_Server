import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

// New User Registration
export const register = async (req, res, next) => {
  try {
    console.log("Register Request Body:", req.body);

    // Validate required fields
    if (
      !req.body.userName ||
      !req.body.fullName ||
      !req.body.email ||
      !req.body.password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if the username or email already exists
    const existingUser = await User.findOne({
      $or: [{ userName: req.body.userName }, { email: req.body.email }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email is already in use.",
      });
    }

    // Hash the password
    const hash = await bcrypt.hash(req.body.password, 5);

    // Create and save the new user
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const savedUser = await newUser.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "User has been created.",
      newRegisteredUser: savedUser,
    });
  } catch (err) {
    console.error("Error during registration:", err);

    // Respond with error
    res.status(500).json({
      success: false,
      message: "An error occurred during registration.",
      error: err.message, // Useful for debugging
    });
  }
};
// Get a single user by userName
export const getUserByUserName = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ userName: username });
    if (!user) {
      console.log("User not found:", username);
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, searchedUser: user });
  } catch (error) {
    console.log("Error fetching user:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
};

// Update a user by ID
export const updateUserByUserId = async (req, res) => {
  try {
    const { userid } = req.params;
    if (!(userid == req.userId))
      return next(createError(404, "You are not authenticated!"));
    const updatedUser = await User.findByIdAndUpdate(userid, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", currentUser: updatedUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update user", error: error.message });
  }
};

// DELETE a user by ID
export const deleteUserByUserId = async (req, res) => {
  try {
    const { userid } = req.params;

    if (!(userid == req.userId))
      return next(createError(404, "User not found!"));
    const deletedUser = await User.findByIdAndDelete(userid);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};
// READ all users
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch users", error: error.message });
//   }
// };
