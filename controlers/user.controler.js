import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

// New User Registration
export const register = async (req, res, next) => {
  try {
    if (!req.body.userName) {
      return res.status(400).send("Username is required.");
    }

    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({
        message: "User has been created.",
        newRegisteredUser: savedUser,
      });
  } catch (err) {
    console.error(err);
    next(err.message || err);
  }
};

// Get a single user by ID
export const getUserByUserId = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ searchedUser: user });
  } catch (error) {
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
